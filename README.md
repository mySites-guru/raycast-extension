# mySites.guru for Raycast

Search and jump to any of your [mySites.guru](https://mysites.guru) managed sites directly from Raycast.

## What is Raycast?

[Raycast](https://www.raycast.com/) is a fast, extendable launcher for macOS that replaces Spotlight. It's basically your command center — search files, run scripts, manage clipboard history, control apps, all from a single keyboard shortcut.

Why developers love it:

- **Speed** — launches instantly, stays out of your way
- **Extensions** — community-built extensions (like this one) plug right into the launcher
- **Built-in tools** — clipboard history, window management, snippets, a calculator that actually works
- **Developer-friendly** — script commands, API integrations, React-based extension SDK
- **Free** — the core app is free, with an optional Pro plan for AI and cloud sync

[Download Raycast](https://www.raycast.com/) (macOS only)

## Install

<a href="https://github.com/mySites-guru/raycast-extension/releases/latest"><img src="https://img.shields.io/badge/Install_for_Raycast-black?style=for-the-badge&logo=raycast&logoColor=FF6363" alt="Install for Raycast" /></a>

1. Download the [latest release](https://github.com/mySites-guru/raycast-extension/releases/latest)
2. Clone or extract, then run:
   ```bash
   npm install && npm run dev
   ```
3. Get your API token from [manage.mysites.guru/en/sites/screenshots](https://manage.mysites.guru/en/sites/screenshots) (enable "Public Site Screenshots" first)
4. Paste the token when prompted on first launch

## Features

- Search all your connected sites by name
- Open the mySites.guru management page for any site
- Visit the site directly in your browser
- Copy site or management URLs to clipboard
- Real favicons for each site
- Results cached for 5 minutes (refresh with ⌘R)

## Commands

| Command | Description |
|---------|-------------|
| mySites.guru Site Search | Search your sites and open management pages |