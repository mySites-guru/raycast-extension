import {
  ActionPanel,
  Action,
  List,
  Cache,
  Icon,
  Image,
  showToast,
  Toast,
  getPreferenceValues,
} from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useEffect } from "react";

function faviconUrl(siteUrl: string): string {
  try {
    const domain = new URL(siteUrl).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "";
  }
}

interface AlfredItem {
  uid: string;
  type: string;
  title: string;
  subtitle: string;
  arg: string;
}

interface Site {
  uid: string;
  name: string;
  url: string;
  manageUrl: string;
}

const cache = new Cache();
const CACHE_KEY = "mysites-guru-sites";
const CACHE_TTL = 5 * 60 * 1000;

function getCachedSites(): Site[] | null {
  const raw = cache.get(CACHE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as { timestamp: number; sites: Site[] };
    if (Date.now() - data.timestamp < CACHE_TTL) {
      return data.sites;
    }
  } catch {
    // Invalid cache
  }
  return null;
}

function parseSite(item: AlfredItem): Site {
  const match = item.title.match(/^Manage Site: (.+?) - (https?:\/\/.+)$/);
  return {
    uid: item.uid,
    name: match?.[1] ?? item.title,
    url: match?.[2] ?? "",
    manageUrl: item.arg,
  };
}

async function fetchSites(): Promise<Site[]> {
  const cached = getCachedSites();
  if (cached) return cached;

  const { token } = getPreferenceValues<{ token: string }>();
  const response = await fetch(
    `https://manage.mysites.guru/public/alfred?token=${encodeURIComponent(token)}`,
  );

  if (!response.ok) {
    throw new Error(
      `mySites.guru API error: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as { items: AlfredItem[] };

  if (!data.items || data.items.length === 0) {
    throw new Error("No sites returned. Check your API token is correct.");
  }

  const sites = data.items.map(parseSite);
  sites.sort((a, b) => a.name.localeCompare(b.name));
  cache.set(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), sites }));
  return sites;
}

export default function Command() {
  const { data: sites, isLoading, error, revalidate } = usePromise(fetchSites);

  useEffect(() => {
    if (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to fetch sites",
        message: error.message,
      });
    }
  }, [error]);

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search your mySites.guru sites..."
    >
      <List.EmptyView
        icon={{ source: "icon.png" }}
        title={error ? "Failed to Load Sites" : "No Sites Found"}
        description={error ? error.message : "No sites found for this account"}
      />
      {sites?.map((site) => (
        <List.Item
          key={site.uid}
          icon={{ source: faviconUrl(site.url), fallback: Icon.Globe, mask: Image.Mask.RoundedRectangle }}
          title={site.name}
          subtitle={site.url}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Manage Site" url={site.manageUrl} />
              <Action.OpenInBrowser
                title="Visit Site"
                url={site.url}
                icon={Icon.Link}
              />
              <Action.CopyToClipboard
                title="Copy Site URL"
                content={site.url}
                shortcut={{ modifiers: ["cmd"], key: "." }}
              />
              <Action.CopyToClipboard
                title="Copy Management URL"
                content={site.manageUrl}
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
              />
              <Action
                title="Refresh"
                icon={Icon.ArrowClockwise}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
                onAction={() => {
                  cache.remove(CACHE_KEY);
                  revalidate();
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
