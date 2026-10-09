# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

wenflip.com — a static site (no build step, no package manager, no bundler, no framework). Pages are hand-written HTML/CSS/vanilla JS served as-is. Deployed to Cloudflare Pages (see Cloudflare Insights beacon in `index.html`, and the "case-sensitive on Cloudflare" note in `coins.js` re: logo paths) with a companion Cloudflare Worker (`wenflip-bot-worker.wenflip-ops.workers.dev`, not in this repo) that backs the "Just Flipped" feed.

The site's premise: compare crypto coin prices against real-world prices ("what your coin is worth, in real stuff") via a "ladder" of real-world items and a set of interactive toys built around it.

## Working in this repo

- There is no `npm install`, no build, no lint command, and no test suite. To check work: open the HTML files directly in a browser, or serve the directory with any static file server (e.g. `npx serve .`) and click through.
- Because there's no bundler, path/script-order/case mistakes are silent failures in the browser, not build errors — double-check `<script>` order and file-path casing by hand.
- All internal links/asset paths are root-relative (`/logos/...`, `/styles.css`), matching Cloudflare Pages routing where each subdirectory's `index.html` serves a clean URL (`/bag`, `/ladder`, `/parity`, `/standings`).

## Architecture

### Shared data files (classic scripts, no modules)

- **`coins.js`** — declares global `TOKENS`, the master coin roster (symbol, chain, DexScreener pair address, logo path). This is the file to fix when a price is wrong or stale — usually a `pairAddress` pointing at a migrated/dead LP.
- **`ladder.js`** — declares global `LADDER` (every real-world price rung, strictly price-descending, no duplicate prices) and `TIER_META` (tier → display info). Adding a rung means checking it doesn't collide with an existing price — a "flip" fires when a coin crosses a rung, and duplicate prices collapse that event.
- Both files use plain `const` with **no `export`/`type="module"`** — they rely on classic-script global scope and script load order. Anything depending on them must load *after* them: `coins.js` → `ladder.js` → `app.js`, all `defer`.

### Root page vs. subpages — data is NOT uniformly shared

- **`index.html`** (homepage) loads `coins.js`, `ladder.js`, and `app.js` and is the full interactive app: live coin grid, ladder clusters, ticker, "Just Flipped" feed, and all the toy modals.
- **`bag/`, `ladder/`, `parity/`, `standings/`** are separate standalone pages, each its own `index.html` with an inline `<style>` block (a re-declared copy of the same design tokens: `--bg`, `--accent`, etc. — not shared via `styles.css`, except `ladder/` and `standings/` which additionally link `/styles.css`) and an inline `<script>`.
- Of these, `ladder/` and `standings/` load the real `/ladder.js` (and `standings/` uses it directly). **`bag/index.html` does not load `coins.js`** — it hand-maintains its own inlined copy of the `TOKENS` array in its own script block (comment: "pulled from the site's TOKENS array"). **`parity/index.html`** doesn't use `TOKENS`/`LADDER` at all — it defines its own separate `PAIRS` array for coin-vs-copy comparisons (e.g. pWBTC vs BTC).
- **Practical consequence:** editing `coins.js` or `ladder.js` does not automatically update `bag/` or `parity/`. When changing the coin roster or a pair address, check whether `bag/index.html` and `parity/index.html` need the same edit applied manually.

### Live price fetching

- All four pages fetch prices client-side, directly from the DexScreener HTTP API (`api.dexscreener.com`) — there is no backend proxy for prices. Requests are batched per `dexChain` (`fetchChainBatch` in `app.js` groups tokens by chain and hits `/latest/dex/pairs/{chain}/{addrs}`).
- The "Just Flipped" feed is the one exception: it's fetched from the external Cloudflare Worker (`FEED_URL` in `app.js`), polled every 60s.
- Contract-address lookups (the "Status Check" tool) hit DexScreener's `/latest/dex/tokens/{address}` endpoint and run through a moderation gate before rendering: a plaintext wenflip-impersonation blocklist (`WENFLIP_BLOCK`) plus a SHA-256-hashed exact-match blocklist (`BLOCKED_HASHES`, populated externally via a `hash-tool.html` not in this repo — it ships empty here).

### `app.js` — one file, many independent "toy" modals

`app.js` is a large monolithic script organized as a flat sequence of independent features, each following the same shape: `open<Feature>` / `close<Feature>` / `render<Feature>` / `<feature>Export` / `<feature>Share`. Current toys: the calculator (`calc`), Status Check (CA resolver), Flippen (head-to-head coin comparison), Pump (hypothetical price simulator), Cope, Outrage, and Wonder. Export/share flows lazily load `html2canvas` from a CDN (`loadHtml2Canvas`) to rasterize a DOM card into a shareable image — this pattern is duplicated (not shared) in `bag/`, `parity/`, and `standings/`, each of which has its own inline copy of the export/share logic.

When adding a new toy, match this existing open/close/render/export/share pattern rather than introducing a new one.

### Voice & casing (do not "fix")

- The site's copy is deliberately lowercase and deadpan — headings, labels, taglines, footers, links. That casing is the joke, not a typo.
- Never change lowercase text to uppercase or Title Case. If unsure, leave the casing exactly as it is.
- The brand is always `wenflip` — one word, lowercase. "wen flip?" (two words) is only the in-world meme question.

### Content notes

Some HTML sections are intentionally commented out rather than deleted (e.g. the live-pill and hero copy in `index.html`, marked `switched OFF`) — treat these as deliberate, reversible toggles, not dead code to clean up, unless asked to remove them.
