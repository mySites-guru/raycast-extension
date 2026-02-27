/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** API Token - Your mySites.guru token from https://manage.mysites.guru/en/sites/screenshots */
  "token": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-sites` command */
  export type SearchSites = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-sites` command */
  export type SearchSites = {}
}

