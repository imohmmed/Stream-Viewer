# Another IPTV Player — Apple native apps (iOS / macOS / tvOS)

Vendored from the open-source project **another-iptv-player**
(https://github.com/bsogulcan/another-iptv-player), stripped down to just the
Swift native Apple targets per your request (no Android, no Flutter, no
Windows). This folder is NOT part of the pnpm workspace — it's a separate
Xcode codebase meant to be opened directly on a Mac.

## What's here

```
native-apple-app/
├── ios/      Xcode project — iPhone/iPad app (bundle id: dev.ogos.another-iptv-player)
├── macos/    Xcode project (XcodeGen-based, see project.yml) — Mac app
├── tvos/     Xcode project (XcodeGen-based, see project.yml) — Apple TV app
├── shared/
│   ├── design/    Shared brand assets, icons, color palette notes
│   ├── docs/      Xtream Codes / M3U / XMLTV (EPG) API contracts & data model docs
│   └── fixtures/  Sample M3U/XMLTV/Xtream Codes JSON fixtures used by tests
├── LICENSE
└── PRIVACY_POLICY.md
```

Each of `ios/`, `macos/`, `tvos/` is a fully independent app target — no
shared Swift package between them. Playback uses `libmpv` (vendored binaries
under each target's `Vendor/` folder — that's why the folder is ~230MB).

## Requirements to continue on your Mac

- **Xcode** (recent stable version; project uses Swift 5, `MainActor` default
  isolation, deployment target macOS 14 / matching iOS & tvOS SDKs)
- For `macos/` and `tvos/`: **XcodeGen** (`brew install xcodegen`) — these two
  ship a `project.yml` instead of a committed `.xcodeproj`-from-source-of-truth
  workflow. If the included `.xcodeproj` doesn't open cleanly, regenerate it
  with `xcodegen generate` inside that folder.
- Swift Package dependencies resolve automatically on first build via Swift
  Package Manager (GRDB, GRDBQuery, Nuke for macOS/tvOS). No CocoaPods needed.
- `ios/Gemfile` includes `fastlane` — only needed if you want to use the
  included Fastlane screenshot/release lanes; not required to just build and
  run.

## Known gap

- `tvos/` was reconstructed by the upstream maintainer from a recovered git
  stash after accidental deletion. Its own README (kept at
  `tvos/README.md`) says the `.xcodeproj` was missing at recovery time — but
  a `project.pbxproj` is present in this checkout. **Verify it opens and
  builds first**; if not, regenerate via `xcodegen generate` using the
  provided `project.yml`.

## Getting started

1. Open `ios/another-iptv-player.xcworkspace` (or `.xcodeproj`) in Xcode, pick
   your team for code signing, and run on a simulator or device.
2. For macOS/tvOS, run `xcodegen generate` in each folder first if the
   project doesn't open, then build normally.
3. On first launch, add a playlist via **Xtream Codes** (server URL +
   username + password) or an **M3U/M3U8** URL/file — same login pattern
   you saw in the reference app.

## Where to take it from here

This is your starting point, not a finished rebrand. Natural next steps once
it builds on your machine:
- Swap app name, icon, and accent color across `Assets.xcassets` in each
  target (design notes in `shared/design/`).
- Layer in the "liquid glass" look (`.glassEffect`/`Material` + blur, subtle
  depth, translucency) on top of the existing SwiftUI views in
  `*/another-iptv-player/Views/`.
- Add transition/motion polish (matched geometry effects, spring animations)
  around navigation between Live/Movies/Series.

Only use this with an IPTV service you're actually authorized to access —
the app itself doesn't host or provide any content, it's a generic client.
