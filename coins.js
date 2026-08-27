/* ============================================================================
   coins.js  —  THE TRACKED COINS (single source of truth for the roster)
   ----------------------------------------------------------------------------
   Declares one global: TOKENS — every coin the site tracks, in display order.

   LOAD ORDER (in index.html): coins.js → ladder.js → app.js  (all `defer`).
   Plain classic-script `const`, visible to app.js because this runs first.
   Do NOT add `export` / `type=module`.

   `const state = TOKENS.map(...)` stays in app.js — that's runtime state,
   not data, and it depends on TOKENS existing (which it will, since this
   file loads first).

   FIELD NOTES (this is the file you open at 2am when a price reads wrong):
     • sym          — ticker shown on the site. Must be unique.
     • name         — full display name.
     • chain        — 'major' | 'pulsechain'. Drives the All / PulseChain /
                      The Rest filter. NOT the same as dexChain below.
     • pairAddress  — the DexScreener PAIR (LP) address. THIS is the usual
                      culprit when one coin's price is wrong/stale: pools
                      migrate. Fix = paste the coin's current top pair addr.
     • dexChain     — DexScreener's chain slug for the fetch URL
                      (ethereum | bsc | base | pulsechain). Must match the
                      chain the pairAddress actually lives on.
     • logo         — path under ./logos/ (case-sensitive on Cloudflare).
     • identity     — optional one-liner, PulseChain coins only.
   ========================================================================== */

const TOKENS = [
    { sym: 'BTC',   name: 'Bitcoin',   chain: 'major',      pairAddress: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0', dexChain: 'ethereum',   logo: './logos/BTC_logo.png'    },
    { sym: 'GOLD',  name: 'Gold',      chain: 'major',      pairAddress: '0x9c4fe5ffd9a9fc5678cfbd93aa2d4fd684b67c4c', dexChain: 'ethereum',   logo: './logos/GOLD_logo.png'   },
    { sym: 'ETH',   name: 'Ethereum',  chain: 'major',      pairAddress: '0x531febfeb9a61d948c384acfbe6dcc51057aea7e', dexChain: 'bsc',        logo: './logos/ETH_logo.png'    },
    { sym: 'SOL',   name: 'Solana',    chain: 'major',      pairAddress: '0xbffec96e8f3b5058b1817c14e4380758fada01ef', dexChain: 'bsc',        logo: './logos/SOL_logo.png'    },
    { sym: 'BNB',   name: 'BNB',       chain: 'major',      pairAddress: '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae', dexChain: 'bsc',        logo: './logos/BNB_logo.png'    },
    { sym: 'XRP',   name: 'XRP',       chain: 'major',      pairAddress: '0xb90fe999be6869af0afc557dccfbe169ea3403d6', dexChain: 'base',       logo: './logos/XRP_logo.png'    },
    { sym: 'DOGE',  name: 'Dogecoin',  chain: 'major',      pairAddress: '0x89da4102853c6cf3f4e9979cbb1dc4a166f38e84', dexChain: 'bsc',        logo: './logos/DOGE_logo.png'   },
    { sym: 'ADA',   name: 'Cardano',   chain: 'major',      pairAddress: '0x28415ff2c35b65b9e5c7de82126b4015ab9d031f', dexChain: 'bsc',        logo: './logos/ADA_logo.png'    },
    { sym: 'SHIB',  name: 'Shiba Inu', chain: 'major',      pairAddress: '0x811beed0119b4afce20d2583eb608c6f7af1954f', dexChain: 'ethereum',   logo: './logos/SHIB_logo.png'   },
    { sym: 'DAI',   name: 'Dai',       chain: 'major',      pairAddress: '0x48da0965ab2d2cbf1c17c09cfb5cbe67ad5b1406', dexChain: 'ethereum',   logo: './logos/DAI_logo.png'    },
    { sym: 'pWBTC', name: 'pWBTC',     chain: 'pulsechain', pairAddress: '0x46E27Ea3A035FfC9e6d6D56702CE3D208FF1e58c', dexChain: 'pulsechain', logo: './logos/pwBTC_Logo.png',  identity: 'Bargain-bin Bitcoin copy.'         },
    { sym: 'INC',   name: 'Incentive', chain: 'pulsechain', pairAddress: '0xf808bb6265e9ca27002c0a04562bf50d4fe37eaa', dexChain: 'pulsechain', logo: './logos/INC_logo.png',    identity: 'Earned for providing liquidity on PulseX.'                   },
    { sym: 'pDAI',  name: 'pDAI',      chain: 'pulsechain', pairAddress: '0xfc64556faa683e6087f425819c7ca3c558e13ac1', dexChain: 'pulsechain', logo: './logos/pDAI_logo.png',   identity: 'An unbacked copy of DAI. Betting it reaches $1.'             },
    { sym: 'HEX',   name: 'HEX',       chain: 'pulsechain', pairAddress: '0xf1f4ee610b2babb05c635f726ef8b0c568c8dc65', dexChain: 'pulsechain', logo: './logos/HEX_Logo.png',    identity: 'Lock it up, earn back more HEX.'                            },
    { sym: 'eHEX',  name: 'eHEX',      chain: 'pulsechain', pairAddress: '0xf0ea3efe42c11c8819948ec2d3179f4084863d3f', dexChain: 'pulsechain', logo: './logos/HEX_Logo.png',   identity: 'Lock it up, earn back more HEX (from Ethereum).'  },
    { sym: 'PLSX',  name: 'PulseX',    chain: 'pulsechain', pairAddress: '0x1b45b9148791d3a104184cd5dfe5ce57193a3ee9', dexChain: 'pulsechain', logo: './logos/PulseX_logo.png', identity: "PulseChain's main exchange. Its Uniswap."                    },
    { sym: 'PLS',   name: 'Pulse',     chain: 'pulsechain', pairAddress: '0xe56043671df55de5cdf8459710433c10324de0ae', dexChain: 'pulsechain', logo: './logos/PLS_Logo.png',    identity: "PulseChain's native coin. Cheaper, faster Ethereum."         },
    { sym: 'PRVX',  name: 'PRVX',      chain: 'pulsechain', pairAddress: '0x7f681a5ad615238357ba148c281e2eaefd2de55a', dexChain: 'pulsechain', logo: './logos/PRVX_logo.png',   identity: 'A long-shot bet on killing centralized exchanges.'           },
    { sym: 'DWB',   name: 'dickwifbutt',       chain: 'pulsechain', pairAddress: '0xe644f9b23375d07f5fe11cc223716c6db7ea356b', dexChain: 'pulsechain', logo: './logos/DWB_logo.png',    identity: 'A butt with a dick. That is all.'   },
];
