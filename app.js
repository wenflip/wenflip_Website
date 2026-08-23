  // ==== TOKEN CONFIG ==== 
  const TOKENS = [
    { sym: 'BTC',   name: 'Bitcoin',   chain: 'major',      pairAddress: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0', dexChain: 'ethereum',   logo: './logos/BTC_logo.png'    },
    { sym: 'GOLD',  name: 'Gold',      chain: 'major',      pairAddress: '0x9c4fe5ffd9a9fc5678cfbd93aa2d4fd684b67c4c', dexChain: 'ethereum',   logo: './logos/GOLD_logo.png'   },
    { sym: 'ETH',   name: 'Ethereum',  chain: 'major',      pairAddress: '0x531febfeb9a61d948c384acfbe6dcc51057aea7e', dexChain: 'bsc',        logo: './logos/ETH_logo.png'    },
    { sym: 'SOL',   name: 'Solana',    chain: 'major',      pairAddress: '0xbffec96e8f3b5058b1817c14e4380758fada01ef', dexChain: 'bsc',        logo: './logos/SOL_logo.png'    },
    { sym: 'BNB',   name: 'BNB',       chain: 'major',      pairAddress: '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae', dexChain: 'bsc',        logo: './logos/BNB_logo.png'    },
    { sym: 'XRP',   name: 'XRP',       chain: 'major',      pairAddress: '0xb90fe999be6869af0afc557dccfbe169ea3403d6', dexChain: 'base',       logo: './logos/XRP_logo.png'    },
    { sym: 'DOGE',  name: 'Dogecoin',  chain: 'major',      pairAddress: '0x89da4102853c6cf3f4e9979cbb1dc4a166f38e84', dexChain: 'bsc',        logo: './logos/DOGE_logo.png'   },
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
  const state = TOKENS.map(t => ({ ...t, price: null, chg: 0, status: 'pending', error: null }));

  // ==== CONTRACT-ADDRESS (CA) RESOLVER CONFIG ====
  const MIN_LIQUIDITY_USD = 10000;
  const MIN_VOLUME_24H = 1000;
  // Mechanism A — wenflip impersonation (plaintext substring/fuzzy). Standalone 'flip' is NOT blocked.
  const WENFLIP_BLOCK = ['wenflip','wen flip','wenflp','w3nflip','weflip','wflip'];
  // Mechanism B — CSAM + hate (hashed, exact-token SHA-256 hex). POPULATED VIA hash-tool.html — leave empty.
  const BLOCKED_HASHES = [];
  const _blockedHashSet = new Set(BLOCKED_HASHES);

 // ==== LADDER ====
const LADDER = [
    { price: 1000000000, name: 'a Powerball jackpot (the advertised one)', tier: 'heavyweight', category: 'status' },
    { price: 300000000, name: "a billionaire's superyacht", tier: 'heavyweight', category: 'status' },
    { price: 100000000, name: 'a single painting at auction', tier: 'heavyweight', category: 'status' },
    { price: 30000000, name: 'a new private jet', tier: 'heavyweight', category: 'status' },
    { price: 8000000, name: 'a 30-second Super Bowl ad', tier: 'heavyweight', category: 'status' },
    { price: 5000000, name: "a billionaire's doomsday bunker", tier: 'heavyweight', category: 'status' },
    { price: 3000000, name: "a nurse's entire working life", tier: 'heavyweight', category: 'extraction' },
    { price: 2600000, name: "a teacher's whole 40-year career", tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 1500000, name: 'a comfortable retirement (the real number)', tier: 'heavyweight', category: 'extraction' },
    { price: 1000000, name: 'a million dollars', tier: 'heavyweight', category: 'status' },
    { price: 600000, name: 'a ticket to space', tier: 'heavyweight', category: 'status' },
    { price: 500000, name: 'your own private island', tier: 'heavyweight', category: 'status' },
    { price: 450000, name: 'a year of full household staff', tier: 'heavyweight', category: 'status' },
    { price: 415000, name: 'a paid-off house, free and clear', tier: 'heavyweight', category: 'extraction' },
    { price: 390000, name: 'a Rolls Royce Ghost (fully optioned)', tier: 'heavyweight', category: 'status' },
    { price: 380000, name: 'a thoroughbred racehorse (Keeneland average yearling)', tier: 'heavyweight', category: 'status' },
    { price: 350000, name: 'a Rolls Royce Ghost (base, new)', tier: 'heavyweight', category: 'status' },
    { price: 315000, name: 'the cost of raising one child to age 18 (USDA estimate)', tier: 'heavyweight', category: 'extraction' },
    { price: 300000, name: 'a used Cessna Citation (entry-level private jet)', tier: 'heavyweight', category: 'status' },
    { price: 280000, name: 'one year of 24/7 personal security detail', tier: 'heavyweight', category: 'status' },
    { price: 258000, name: 'a Lamborghini Urus (base, new)', tier: 'heavyweight', category: 'status' },
    { price: 240000, name: 'a Lamborghini Huracán (entry, new)', tier: 'heavyweight', category: 'status' },
    { price: 220000, name: 'a Ferrari Roma (base, new)', tier: 'heavyweight', category: 'status' },
    { price: 180000, name: 'a gold-plated bathtub (bespoke commission)', tier: 'heavyweight', category: 'status' },
    { price: 170000, name: "a forgettable abstract painting at Christie's", tier: 'heavyweight', category: 'status' },
    { price: 160000, name: 'one year at Phillips Exeter Academy (boarding)', tier: 'heavyweight', category: 'status' },
    { price: 150000, name: 'a full Beverly Hills plastic surgery makeover', tier: 'heavyweight', category: 'status' },
    { price: 140000, name: 'one year of luxury nursing home (private room)', tier: 'heavyweight', category: 'status' },
    { price: 130000, name: 'a full gestational surrogacy in the USA', tier: 'heavyweight', category: 'extraction' },
    { price: 120000, name: 'a live-in nanny (NYC)', tier: 'heavyweight', category: 'extraction' },
    { price: 115000, name: 'a Porsche 911 Carrera (base, new)', tier: 'heavyweight', category: 'status' },
    { price: 110000, name: 'a gold toilet (18-karat, functional)', tier: 'heavyweight', category: 'status' },
    { price: 90000, name: 'full-mouth dental implants (all teeth)', tier: 'heavyweight', category: 'extraction' },
    { price: 87000, name: 'one year at Harvard (full cost of attendance)', tier: 'heavyweight', category: 'status', featured: true },
    { price: 75000, name: 'a full luxury kitchen remodel (high-end suburban)', tier: 'heavyweight', category: 'status' },
    { price: 60000, name: 'a down payment on a house', tier: 'heavyweight', category: 'extraction' },
    { price: 52000, name: 'a used Porsche 911 (decent year)', tier: 'heavyweight', category: 'status' },
    { price: 48000, name: 'an average new car (industry average)', tier: 'heavyweight', category: 'status' },
    { price: 45000, name: 'a full IVF package (3 cycles)', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 43000, name: 'an epic bachelor Vegas weekend (party of 12)', tier: 'heavyweight', category: 'status' },
    { price: 40000, name: 'a Tesla Model 3', tier: 'heavyweight', category: 'status' },
    { price: 35000, name: 'one year of NYC private preschool', tier: 'heavyweight', category: 'status' },
    { price: 30000, name: 'a wedding photographer (high-end with video)', tier: 'heavyweight', category: 'status' },
    { price: 25000, name: 'a new compact car', tier: 'heavyweight', category: 'status' },
    { price: 22000, name: 'an average wedding (small, intimate)', tier: 'heavyweight', category: 'status' },
    { price: 20000, name: 'an engagement ring (nicer)', tier: 'heavyweight', category: 'status' },
    { price: 18000, name: 'a used motorcycle (mid-tier touring)', tier: 'heavyweight', category: 'status' },
    { price: 16000, name: 'one year of average US daycare', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 14000, name: 'two weeks at a luxury all-inclusive resort', tier: 'heavyweight', category: 'status' },
    { price: 13500, name: 'one year of state college tuition (in-state)', tier: 'heavyweight', category: 'extraction' },
    { price: 12000, name: 'a Hermès Birkin bag', tier: 'heavyweight', category: 'status' },
    { price: 10000, name: 'an engagement ring (modest)', tier: 'heavyweight', category: 'status' },
    { price: 8500, name: 'one year of public university tuition (in-state)', tier: 'heavyweight', category: 'extraction' },
    { price: 8300, name: 'one year of federal income tax for a $75K single earner', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 7500, name: 'a rhinoplasty (nose job)', tier: 'heavyweight', category: 'status' },
    { price: 6500, name: 'a BBL (Brazilian butt lift)', tier: 'heavyweight', category: 'status' },
    { price: 6000, name: 'a used car (rough condition)', tier: 'heavyweight', category: 'status' },
    { price: 5800, name: 'a Super Bowl ticket (nosebleeds)', tier: 'heavyweight', category: 'status', featured: true },
    { price: 5738, name: "one year of FICA payroll taxes for a $75K earner (you'll never see it back)", tier: 'heavyweight', category: 'extraction' },
    { price: 5500, name: 'a bottle of Pappy Van Winkle 23', tier: 'heavyweight', category: 'status', featured: true },
    { price: 5000, name: 'a full Invisalign treatment', tier: 'heavyweight', category: 'status' },
    { price: 4800, name: 'a Lambo wheel rim', tier: 'heavyweight', category: 'status' },
    { price: 3500, name: 'a mountain bike', tier: 'heavyweight', category: 'status' },
    { price: 3200, name: 'a C-section copay', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 3000, name: 'one year of US median property tax', tier: 'heavyweight', category: 'extraction' },
    { price: 2800, name: 'one year of advisor fees on $280K (1% AUM)', tier: 'heavyweight', category: 'extraction' },
    { price: 2600, name: 'a coffin (mid-range)', tier: 'heavyweight', category: 'extraction' },
    { price: 2500, name: 'an epidural during birth', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 2400, name: 'a CrossFit annual membership', tier: 'heavyweight', category: 'extraction' },
    { price: 2200, name: 'a LASIK eye (per eye)', tier: 'heavyweight', category: 'status' },
    { price: 2100, name: 'a sterilization procedure (out of pocket)', tier: 'heavyweight', category: 'extraction' },
    { price: 2000, name: 'a decent laptop', tier: 'heavyweight', category: 'status' },
    { price: 1800, name: 'an uninsured ER visit (minor)', tier: 'heavyweight', category: 'extraction' },
    { price: 1650, name: 'a veneer (per tooth)', tier: 'heavyweight', category: 'status' },
    { price: 1500, name: 'annual car insurance (cheap)', tier: 'heavyweight', category: 'extraction' },
    { price: 1400, name: 'a new gaming console', tier: 'heavyweight', category: 'status' },
    { price: 1300, name: 'an IUD insertion (out of pocket)', tier: 'heavyweight', category: 'extraction' },
    { price: 1250, name: 'a root canal', tier: 'heavyweight', category: 'extraction' },
    { price: 1200, name: 'a year of college textbooks', tier: 'heavyweight', category: 'extraction' },
    { price: 1150, name: 'a CoolSculpting session', tier: 'heavyweight', category: 'status' },
    { price: 1100, name: 'a vasectomy', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 1050, name: 'a dental crown', tier: 'heavyweight', category: 'extraction' },
    { price: 1025, name: 'a funeral plot (cheap)', tier: 'heavyweight', category: 'extraction' },
    { price: 1000, name: 'one year of mutual fund expense ratios on $100K (1%)', tier: 'heavyweight', category: 'extraction' },
    { price: 950, name: 'a cremation (basic)', tier: 'snack', category: 'extraction' },
    { price: 900, name: 'a weekend Airbnb', tier: 'snack', category: 'status' },
    { price: 880, name: 'one year of premium pet insurance', tier: 'snack', category: 'extraction' },
    { price: 875, name: "one month's rent (small midwest town)", tier: 'snack', category: 'extraction' },
    { price: 850, name: 'one year of average insurance copays', tier: 'snack', category: 'extraction' },
    { price: 750, name: "a wedding band (men's, plain)", tier: 'snack', category: 'status' },
    { price: 650, name: 'a used iPhone', tier: 'snack', category: 'status' },
    { price: 530, name: 'one month of health insurance (unsubsidized ACA, single adult)', tier: 'snack', category: 'extraction' },
    { price: 500, name: 'one annuity surrender charge (5% on $10K)', tier: 'snack', category: 'extraction' },
    { price: 425, name: 'a round-trip domestic flight', tier: 'snack', category: 'status' },
    { price: 415, name: 'a wisdom tooth removal (per tooth)', tier: 'snack', category: 'extraction' },
    { price: 410, name: 'a bottle of Macallan 18', tier: 'snack', category: 'status' },
    { price: 405, name: 'a Vegas night at the Bellagio', tier: 'snack', category: 'status' },
    { price: 400, name: 'a non-surgical cosmetic session', tier: 'snack', category: 'status' },
    { price: 379, name: 'one iPhone screen repair (out of warranty)', tier: 'snack', category: 'extraction' },
    { price: 349, name: 'an Apple Watch SE (entry model)', tier: 'snack', category: 'status' },
    { price: 275, name: 'a nice dinner for two', tier: 'snack', category: 'status' },
    { price: 260, name: 'a shot of Ozempic (per dose)', tier: 'snack', category: 'extraction', featured: true },
    { price: 255, name: 'an H&R Block in-person filing', tier: 'snack', category: 'extraction' },
    { price: 253, name: 'one year of weekly out-of-network ATM use', tier: 'snack', category: 'extraction' },
    { price: 250, name: 'a Roomba (basic)', tier: 'snack', category: 'status' },
    { price: 240, name: 'one year of ChatGPT Plus', tier: 'snack', category: 'extraction' },
    { price: 230, name: 'one year of Notion AI', tier: 'snack', category: 'extraction' },
    { price: 225, name: 'one year of overdraft fees (typical overdrafting household)', tier: 'snack', category: 'extraction', featured: true },
    { price: 220, name: 'one year of Xbox Game Pass Ultimate', tier: 'snack', category: 'extraction' },
    { price: 215, name: 'one year of Netflix (standard)', tier: 'snack', category: 'extraction' },
    { price: 210, name: 'a bag of designer pre-workout supplement', tier: 'snack', category: 'snack' },
    { price: 205, name: 'one year of LinkedIn Premium', tier: 'snack', category: 'extraction' },
    { price: 204, name: 'one year of Disney+ (no ads)', tier: 'snack', category: 'extraction' },
    { price: 200, name: 'a bottle of Dom Pérignon', tier: 'snack', category: 'status' },
    { price: 198, name: "a Cameo from someone you've heard of", tier: 'snack', category: 'snack' },
    { price: 195, name: 'an IV drip wellness session', tier: 'snack', category: 'status' },
    { price: 190, name: 'an hour with a private chef', tier: 'snack', category: 'status' },
    { price: 188, name: 'a TurboTax Self-Employed filing (federal + state)', tier: 'snack', category: 'extraction' },
    { price: 180, name: 'one year of checking account maintenance fees ($15/mo)', tier: 'snack', category: 'extraction' },
    { price: 179, name: 'AirPods (with ANC)', tier: 'snack', category: 'status' },
    { price: 178, name: 'a Costco run that got out of hand', tier: 'snack', category: 'snack' },
    { price: 175, name: 'one year of Audible', tier: 'snack', category: 'extraction' },
    { price: 170, name: 'a night at a bougie hot pot restaurant', tier: 'snack', category: 'status' },
    { price: 165, name: 'a pair of Lululemon leggings', tier: 'snack', category: 'status' },
    { price: 156, name: 'one Spotify Premium year', tier: 'snack', category: 'extraction' },
    { price: 155, name: 'a therapy session (full cash price)', tier: 'snack', category: 'extraction' },
    { price: 154, name: 'a Substack subscription you regret', tier: 'snack', category: 'extraction' },
    { price: 150, name: 'an emotional support animal certification (online)', tier: 'snack', category: 'snack' },
    { price: 145, name: 'an AI girlfriend monthly subscription', tier: 'snack', category: 'extraction' },
    { price: 135, name: 'a night at a Holiday Inn Express', tier: 'snack', category: 'status' },
    { price: 130, name: 'a paternity test', tier: 'snack', category: 'snack' },
    { price: 125, name: 'a concert nosebleed', tier: 'snack', category: 'status' },
    { price: 120, name: 'one Hulu year', tier: 'snack', category: 'extraction' },
    { price: 118, name: 'one Midjourney year', tier: 'snack', category: 'extraction' },
    { price: 105, name: 'a Global Entry application', tier: 'snack', category: 'extraction' },
    { price: 102, name: 'a Hamilton ticket (cheap)', tier: 'snack', category: 'status' },
    { price: 100, name: 'a DNA test (23andMe)', tier: 'snack', category: 'snack' },
    { price: 98, name: 'a Ring doorbell', tier: 'snack', category: 'status' },
    { price: 90, name: 'a private massage (60 min)', tier: 'snack', category: 'snack' },
    { price: 85, name: 'a pair of jeans', tier: 'snack', category: 'snack' },
    { price: 82, name: 'a TaskRabbit IKEA assembly', tier: 'snack', category: 'extraction' },
    { price: 80, name: 'TSA PreCheck', tier: 'snack', category: 'extraction' },
    { price: 78, name: 'one PlayStation Plus year', tier: 'snack', category: 'extraction' },
    { price: 77, name: 'a Vegas night at a budget hotel', tier: 'snack', category: 'status' },
    { price: 76, name: 'one ChatGPT API top-up (moderate use month)', tier: 'snack', category: 'extraction' },
    { price: 75, name: 'a Hello Fresh meal kit week', tier: 'snack', category: 'extraction' },
    { price: 72, name: 'a Lyft surge ride at 2am', tier: 'snack', category: 'extraction' },
    { price: 71, name: 'an Uber Eats order at 2am', tier: 'snack', category: 'extraction' },
    { price: 70, name: 'a personal trainer session', tier: 'snack', category: 'status' },
    { price: 68, name: 'a sensory deprivation tank float', tier: 'snack', category: 'status' },
    { price: 66, name: 'a bag of premium CBD gummies', tier: 'snack', category: 'snack' },
    { price: 63, name: 'one annual Costco membership', tier: 'snack', category: 'extraction' },
    { price: 60, name: 'one Ticketmaster service fee (pair of tickets)', tier: 'snack', category: 'extraction' },
    { price: 55, name: 'a tank of gas', tier: 'snack', category: 'snack' },
    { price: 52, name: 'an Equinox day pass', tier: 'snack', category: 'status' },
    { price: 50, name: "a Sam's Club membership", tier: 'snack', category: 'extraction' },
    { price: 49, name: 'a Tinder Platinum month', tier: 'snack', category: 'extraction' },
    { price: 48, name: 'one year of Robinhood Gold (paid annually)', tier: 'snack', category: 'extraction' },
    { price: 45, name: 'a cryotherapy session', tier: 'snack', category: 'status' },
    { price: 44, name: 'one Peloton All-Access Membership month', tier: 'snack', category: 'extraction' },
    { price: 42, name: 'one movie night for two (tickets + popcorn)', tier: 'snack', category: 'extraction' },
    { price: 40, name: 'a Steam game', tier: 'snack', category: 'snack' },
    { price: 39, name: 'a Cameo from a C-list celeb', tier: 'snack', category: 'snack' },
    { price: 38, name: 'a SoulCycle class', tier: 'snack', category: 'status' },
    { price: 36, name: 'one airline checked-bag fee (first bag, one way)', tier: 'snack', category: 'extraction' },
    { price: 35, name: 'one month of gym membership (typical chain)', tier: 'snack', category: 'extraction' },
    { price: 34, name: 'a pedicure', tier: 'snack', category: 'snack' },
    { price: 33, name: 'a DoorDash delivery (with all fees)', tier: 'snack', category: 'extraction' },
    { price: 32, name: 'an escape room (per person)', tier: 'snack', category: 'snack' },
    { price: 31, name: 'a Hinge premium month', tier: 'snack', category: 'extraction' },
    { price: 30, name: 'a Tinder Gold month', tier: 'snack', category: 'extraction' },
    { price: 29, name: 'an axe-throwing session', tier: 'snack', category: 'snack' },
    { price: 28, name: 'a wire transfer fee (typical domestic)', tier: 'snack', category: 'extraction' },
    { price: 27, name: 'a large delivery pizza', tier: 'snack', category: 'snack' },
    { price: 26.77, name: 'an overdraft fee (Bankrate 2025 average)', tier: 'snack', category: 'extraction' },
    { price: 26.5, name: 'a CrossFit class drop-in', tier: 'snack', category: 'status' },
    { price: 26, name: 'a Bumble Boost month', tier: 'snack', category: 'extraction' },
    { price: 25, name: 'an Uber ride across town', tier: 'snack', category: 'extraction' },
    { price: 24, name: 'an Erewhon smoothie', tier: 'snack', category: 'status' },
    { price: 23, name: 'a therapy session (typical copay)', tier: 'snack', category: 'extraction' },
    { price: 22, name: 'a Planet Fitness Black Card month', tier: 'snack', category: 'extraction' },
    { price: 21, name: 'a budget haircut (Great Clips tier)', tier: 'snack', category: 'snack' },
    { price: 20, name: 'a full-service car wash', tier: 'snack', category: 'snack' },
    { price: 18.5, name: 'a Claude Pro month', tier: 'snack', category: 'extraction' },
    { price: 18, name: 'a paperback book', tier: 'snack', category: 'snack' },
    { price: 17, name: 'an NSF (non-sufficient funds) fee', tier: 'snack', category: 'extraction' },
    { price: 15, name: 'a movie ticket', tier: 'snack', category: 'snack' },
    { price: 14, name: 'a Twitter Blue verification month', tier: 'snack', category: 'extraction' },
    { price: 13, name: 'a Chipotle burrito', tier: 'snack', category: 'snack' },
    { price: 12, name: 'one stadium beer', tier: 'snack', category: 'extraction' },
    { price: 11.5, name: 'a Botox unit', tier: 'snack', category: 'status', featured: true },
    { price: 11, name: 'a pack of cigarettes', tier: 'snack', category: 'snack' },
    { price: 10.5, name: 'an OnlyFans subscription (avg)', tier: 'snack', category: 'extraction' },
    { price: 9, name: 'one fast-food combo meal', tier: 'snack', category: 'extraction' },
    { price: 8, name: 'a round of mini golf', tier: 'snack', category: 'snack' },
    { price: 7.5, name: 'a Starbucks coffee', tier: 'snack', category: 'snack' },
    { price: 7, name: 'a Tinder profile boost', tier: 'snack', category: 'extraction' },
    { price: 6.5, name: 'an Adderall pill (10mg generic, cash retail without insurance)', tier: 'snack', category: 'extraction' },
    { price: 6, name: 'a Big Mac', tier: 'snack', category: 'snack' },
    { price: 5.5, name: 'a mid-tier scratch-off ticket', tier: 'snack', category: 'snack' },
    { price: 5, name: 'a Postmates delivery fee', tier: 'snack', category: 'extraction' },
    { price: 4.86, name: 'an ATM out-of-network fee (Bankrate 2025 average)', tier: 'snack', category: 'extraction' },
    { price: 4.75, name: 'a cheap cigar', tier: 'snack', category: 'snack' },
    { price: 4.5, name: 'a mechanical bull ride', tier: 'snack', category: 'snack' },
    { price: 4.25, name: 'a penny slot pull at max bet', tier: 'snack', category: 'snack' },
    { price: 4, name: 'a pre-rolled cone', tier: 'snack', category: 'snack' },
    { price: 3.75, name: 'a Four Loko', tier: 'snack', category: 'snack' },
    { price: 3.5, name: 'a greeting card', tier: 'snack', category: 'snack' },
    { price: 3.2, name: 'one gallon of gas', tier: 'snack', category: 'extraction' },
    { price: 3, name: 'one loaf of bread (name brand)', tier: 'snack', category: 'extraction' },
    { price: 2.85, name: 'a mini bottle of liquor (airplane bottle)', tier: 'snack', category: 'snack' },
    { price: 2.75, name: 'a can of Monster', tier: 'snack', category: 'snack' },
    { price: 2.6, name: 'a 5-Hour Energy shot', tier: 'snack', category: 'snack' },
    { price: 2.5, name: 'a Liquid Death', tier: 'snack', category: 'snack' },
    { price: 2.4, name: 'a White Claw', tier: 'snack', category: 'snack' },
    { price: 2.3, name: 'a Truly seltzer', tier: 'snack', category: 'snack' },
    { price: 2, name: 'a Powerball ticket', tier: 'snack', category: 'snack' },
    { price: 1.95, name: 'a scratch-off ticket (entry-tier)', tier: 'snack', category: 'snack' },
    { price: 1.85, name: 'a pickle from 7-Eleven cooler', tier: 'snack', category: 'snack' },
    { price: 1.75, name: 'an apple', tier: 'snack', category: 'snack' },
    { price: 1.65, name: 'a Slim Jim', tier: 'snack', category: 'snack' },
    { price: 1.5, name: 'a roll of toilet paper', tier: 'snack', category: 'snack' },
    { price: 1.45, name: 'a pickle (from a jar)', tier: 'snack', category: 'snack' },
    { price: 1.35, name: 'a Hot Wheels car', tier: 'snack', category: 'snack' },
    { price: 1.25, name: "a Reese's Cup", tier: 'snack', category: 'snack' },
    { price: 1.1, name: 'a Pop Rocks package', tier: 'snack', category: 'snack' },
    { price: 1.05, name: 'a claw machine attempt', tier: 'snack', category: 'snack' },
    { price: 1, name: 'an item from the $1 shop', tier: 'snack', category: 'snack' },
    { price: 0.98, name: 'a single cigarette', tier: 'snack', category: 'snack' },
    { price: 0.9, name: 'an onion', tier: 'snack', category: 'snack' },
    { price: 0.88, name: 'a pear', tier: 'snack', category: 'snack' },
    { price: 0.85, name: 'an AA battery', tier: 'snack', category: 'snack' },
    { price: 0.82, name: 'a potato', tier: 'snack', category: 'snack' },
    { price: 0.78, name: 'a tomato', tier: 'snack', category: 'snack' },
    { price: 0.75, name: 'an orange', tier: 'snack', category: 'snack' },
    { price: 0.73, name: 'a postage stamp', tier: 'snack', category: 'snack' },
    { price: 0.65, name: "a McDonald's chicken nugget", tier: 'snack', category: 'snack' },
    { price: 0.6, name: 'a pack of ramen', tier: 'snack', category: 'snack' },
    { price: 0.52, name: 'a lime', tier: 'snack', category: 'snack' },
    { price: 0.5, name: 'a condom (from a 12-pack)', tier: 'snack', category: 'snack' },
    { price: 0.48, name: 'a lemon', tier: 'snack', category: 'snack' },
    { price: 0.45, name: 'a disposable razor', tier: 'snack', category: 'snack' },
    { price: 0.42, name: 'nicotine gum', tier: 'snack', category: 'snack' },
    { price: 0.4, name: 'an arcade game token', tier: 'snack', category: 'snack' },
    { price: 0.38, name: 'a CBD gummy', tier: 'snack', category: 'snack' },
    { price: 0.35, name: 'an AAA battery', tier: 'snack', category: 'snack' },
    { price: 0.33, name: 'a Capri Sun', tier: 'snack', category: 'snack' },
    { price: 0.3, name: 'a banana', tier: 'snack', category: 'snack' },
    { price: 0.28, name: 'a gumball', tier: 'snack', category: 'snack' },
    { price: 0.25, name: 'a single egg', tier: 'snack', category: 'snack' },
    { price: 0.23, name: 'a nicotine pouch (Zyn)', tier: 'snack', category: 'snack' },
    { price: 0.22, name: 'a Bic pen', tier: 'snack', category: 'snack' },
    { price: 0.2, name: 'a penny slot pull (min bet)', tier: 'snack', category: 'snack' },
    { price: 0.18, name: 'a bowl of cooked rice', tier: 'snack', category: 'snack' },
    { price: 0.16, name: 'a claw machine prize (cost basis)', tier: 'snack', category: 'snack' },
    { price: 0.15, name: 'a single tortilla', tier: 'snack', category: 'snack' },
    { price: 0.14, name: 'a Snickers fun size', tier: 'snack', category: 'snack' },
    { price: 0.13, name: 'the lettuce from a Big Mac', tier: 'snack', category: 'snack' },
    { price: 0.12, name: 'a carrot', tier: 'snack', category: 'snack' },
    { price: 0.11, name: 'a donut hole', tier: 'snack', category: 'snack' },
    { price: 0.095, name: 'a Tootsie Pop', tier: 'snack', category: 'snack' },
    { price: 0.09, name: 'a Dum Dum lollipop', tier: 'snack', category: 'snack' },
    { price: 0.085, name: 'a pair of wooden chopsticks', tier: 'snack', category: 'snack' },
    { price: 0.08, name: 'a slice of bread', tier: 'snack', category: 'snack' },
    { price: 0.075, name: 'a soft pretzel bite', tier: 'snack', category: 'snack' },
    { price: 0.07, name: 'a tea bag', tier: 'snack', category: 'snack' },
    { price: 0.065, name: 'a Tylenol tablet', tier: 'snack', category: 'snack' },
    { price: 0.06, name: 'a melatonin gummy', tier: 'snack', category: 'snack' },
    { price: 0.055, name: 'a Listerine strip', tier: 'snack', category: 'snack' },
    { price: 0.05, name: 'a pencil', tier: 'snack', category: 'snack' },
    { price: 0.048, name: 'a Solo cup', tier: 'snack', category: 'snack' },
    { price: 0.045, name: 'a stick of gum', tier: 'snack', category: 'snack' },
    { price: 0.04, name: 'a paper plate', tier: 'snack', category: 'snack' },
    { price: 0.038, name: 'a plastic fork', tier: 'snack', category: 'snack' },
    { price: 0.035, name: 'a clothes peg', tier: 'snack', category: 'snack' },
    { price: 0.033, name: 'a Bandaid', tier: 'snack', category: 'snack' },
    { price: 0.03, name: 'a ketchup packet', tier: 'snack', category: 'snack' },
    { price: 0.028, name: "a Hershey's Kiss", tier: 'snack', category: 'snack' },
    { price: 0.026, name: 'a single Altoid mint', tier: 'snack', category: 'snack' },
    { price: 0.024, name: 'a Tums tablet', tier: 'snack', category: 'snack' },
    { price: 0.022, name: 'a paper fortune from a fortune cookie', tier: 'snack', category: 'snack', featured: true },
    { price: 0.02, name: 'an Ibuprofen tablet', tier: 'snack', category: 'snack' },
    { price: 0.018, name: 'a single Pringle', tier: 'snack', category: 'snack' },
    { price: 0.016, name: 'a single Dorito', tier: 'snack', category: 'snack' },
    { price: 0.014, name: 'a sugar packet', tier: 'snack', category: 'snack' },
    { price: 0.013, name: 'a plastic spoon', tier: 'snack', category: 'snack' },
    { price: 0.012, name: 'a Popsicle stick', tier: 'snack', category: 'snack' },
    { price: 0.011, name: 'a Tootsie Roll mini', tier: 'snack', category: 'snack' },
    { price: 0.0105, name: 'a bobby pin', tier: 'snack', category: 'snack' },
    { price: 0.01, name: 'a thumbtack', tier: 'snack', category: 'snack' },
    { price: 0.0095, name: 'a plastic straw', tier: 'snack', category: 'snack' },
    { price: 0.009, name: 'a saltine cracker', tier: 'snack', category: 'snack' },
    { price: 0.0085, name: 'a single pretzel stick', tier: 'snack', category: 'snack' },
    { price: 0.008, name: 'a single napkin', tier: 'snack', category: 'snack' },
    { price: 0.0075, name: 'a single coffee filter', tier: 'snack', category: 'snack' },
    { price: 0.007, name: 'a single sheet of rolling paper', tier: 'snack', category: 'snack' },
    { price: 0.0065, name: 'a paperclip', tier: 'snack', category: 'snack' },
    { price: 0.006, name: 'a square of aluminum foil', tier: 'snack', category: 'snack' },
    { price: 0.0055, name: 'a single Cheeto', tier: 'snack', category: 'snack' },
    { price: 0.005, name: 'a Q-tip', tier: 'snack', category: 'snack' },
    { price: 0.0045, name: 'a sheet of printer paper', tier: 'snack', category: 'snack' },
    { price: 0.004, name: 'a Tic Tac', tier: 'snack', category: 'snack' },
    { price: 0.0038, name: 'a single match', tier: 'snack', category: 'snack' },
    { price: 0.0035, name: 'a rubber band', tier: 'snack', category: 'snack' },
    { price: 0.003, name: 'a sheet of toilet paper', tier: 'snack', category: 'snack' },
    { price: 0.0028, name: 'a single Skittle', tier: 'snack', category: 'snack' },
    { price: 0.0025, name: 'a toothpick', tier: 'snack', category: 'snack' },
    { price: 0.0023, name: 'a Goldfish cracker', tier: 'snack', category: 'snack' },
    { price: 0.002, name: 'a single M&M', tier: 'snack', category: 'snack' },
    { price: 0.0018, name: 'a single coffee bean', tier: 'snack', category: 'snack' },
    { price: 0.0016, name: 'a single sprinkle (large)', tier: 'snack', category: 'snack' },
    { price: 0.0014, name: 'a sunflower seed', tier: 'snack', category: 'snack' },
    { price: 0.0012, name: 'a single Cheerio', tier: 'snack', category: 'snack' },
    { price: 0.001, name: 'a single staple', tier: 'snack', category: 'snack' },
    { price: 0.0008, name: 'a Froot Loop', tier: 'absurd_floor', category: 'snack' },
    { price: 0.0007, name: 'a pinch of pepper', tier: 'absurd_floor', category: 'snack' },
    { price: 0.0006, name: 'a single coffee ground', tier: 'absurd_floor', category: 'snack' },
    { price: 0.00055, name: 'a single sprinkle (small)', tier: 'absurd_floor', category: 'snack' },
    { price: 0.0005, name: 'a single eyelash', tier: 'absurd_floor', category: 'snack' },
    { price: 0.00045, name: 'a piece of confetti', tier: 'absurd_floor', category: 'snack' },
    { price: 0.0004, name: 'a grain of sugar', tier: 'absurd_floor', category: 'snack' },
    { price: 0.00035, name: 'a grain of rice', tier: 'absurd_floor', category: 'snack' },
    { price: 0.0003, name: 'a single mustard seed', tier: 'absurd_floor', category: 'snack' },
    { price: 0.00025, name: 'a poppy seed', tier: 'absurd_floor', category: 'snack' },
    { price: 0.0002, name: 'a sesame seed', tier: 'absurd_floor', category: 'snack' },
    { price: 0.00015, name: 'a speck of dust', tier: 'absurd_floor', category: 'snack' },
    { price: 0.00012, name: 'a broken rubber band', tier: 'absurd_floor', category: 'snack' },
    { price: 0.0001, name: 'a grain of fine sand', tier: 'absurd_floor', category: 'snack' },
    { price: 7e-05, name: 'a crumb from the bottom of the bag', tier: 'void', category: 'snack' },
    { price: 5e-05, name: "a dropped McDonald's chip", tier: 'void', category: 'snack' },
    { price: 3.5e-05, name: 'a flake of dandruff', tier: 'void', category: 'snack' },
    { price: 2.5e-05, name: 'a popcorn kernel that didnt pop', tier: 'void', category: 'snack' },
    { price: 2e-05, name: 'a squeezed-out lime wedge', tier: 'void', category: 'snack' },
    { price: 1.5e-05, name: "a fingernail clipping", tier: 'void', category: 'snack' },
    { price: 1e-05, name: 'a popped bubble-wrap bubble', tier: 'void', category: 'snack' },
    { price: 7.5e-06, name: 'a used cotton swab', tier: 'void', category: 'snack' },
    { price: 5e-06, name: 'a single belly button lint', tier: 'void', category: 'snack' },
    { price: 3e-06, name: 'a strand of shed cat hair', tier: 'void', category: 'snack' },
    { price: 2e-06, name: 'a used tooth floss string', tier: 'void', category: 'snack' },
    { price: 1.5e-06, name: 'a burnt match head', tier: 'void', category: 'snack' },
    { price: 1e-06, name: 'a single toothbrush bristle', tier: 'void', category: 'snack' },
];
  // ==== EMOTION DOORS — CONTENT LISTS (verbatim, do not edit inline) ====

  const COPE_LINES = [
    "we knew her.",
    "gravity remains undefeated.",
    "reverting to the mean.",
    "back to the trenches.",
    "the rung was nice while it lasted.",
    "it was real for a while.",
    "the ladder is a two-way street.",
    "down a rung. the ladder remains.",
    "she's not heavy anymore.",
    "it visited. it did not stay.",
    "we're choosing to remember the good times.",
    "this is fine. everything is fine.",
    "hodl, allegedly.",
    "it's not a loss until you sell. it's not a flip until it flips."
  ];

  // Each string is an exact LADDER item name; resolved to LADDER entries at runtime via name match.
  const OUTRAGE_ITEMS = [
    "Full IVF package (3 cycles)",
    "One year of average US daycare",
    "One year of live-in nanny (NYC)",
    "Full gestational surrogacy in the USA",
    "Cost of raising one child to age 18 (USDA estimate)",
    "Epidural during birth",
    "C-section copay",
    "One year of federal income tax for a $75K single earner",
    "One year of FICA payroll taxes for a $75K earner (you'll never see it back)",
    "One year of US median property tax",
    "One year of state college tuition (in-state)",
    "One year at Harvard (full cost of attendance)",
    "One uninsured ER visit (minor)",
    "One shot of Ozempic (per dose)",
    "Full-mouth dental implants (all teeth)",
    "One vasectomy",
    "IUD insertion (out of pocket)",
    "Down payment on a house",
    "One year of overdraft fees (typical overdrafting household)",
    "One year of average insurance copays"
  ];

  const TIER_META = {
    heavyweight:  { cls: 'tier-heavy',  text: '🍔 Heavyweight Tier — $1,000+',        emoji: '💎' },
    snack:        { cls: 'tier-snack',  text: '🏠 Real Life Tier — $0.001 to $1,000', emoji: '🏠' },
    absurd_floor: { cls: 'tier-absurd', text: '🤡 Absurd Floor — $0.0001 to $0.001',  emoji: '🏖️' },
    void:         { cls: 'tier-dust',   text: '🕳 The Gutter — stuff so worthless it fell through the floor',  emoji: '🕳️' },
  };


  // ── Coin price formatter ─────────────────────────────────────────────────
  // Used ONLY for live coin prices (ticker, cards, share cards, calc).
  // Real-world item/ladder prices are passed through fmtItemPrice (identity).
  // All truncation chops toward zero — never rounds up.
  const SUB_DIGITS = ['₀','₁','₂','₃','₄','₅','₆','₇','₈','₉'];
  function fmtCoinPrice(p) {
    if (p == null) return '—';
    if (p <= 0)    return '$0';

    // p ≥ 1000 → integer, thousands sep, no decimals
    if (p >= 1000) {
      return '$' + Math.floor(p).toLocaleString('en-US');
    }

    // 1 ≤ p < 1000 → up to 2 decimals, truncated, strip trailing zeros
    if (p >= 1) {
      const trunc = Math.floor(p * 100) / 100;
      let s = trunc.toFixed(2);            // "152.84"
      s = s.replace(/\.?0+$/, '');         // strip trailing zeros → "152.84" or "2.5"
      // add thousands sep for values ≥ 1000 (can't happen here but safe)
      const [int, dec] = s.split('.');
      const intFmt = parseInt(int,10).toLocaleString('en-US');
      return '$' + (dec ? intFmt + '.' + dec : intFmt);
    }

    // 0.0001 ≤ p < 1 → 4 sig figs, truncated, no trailing zeros
    if (p >= 0.0001) {
      // Find position of first significant digit
      // e.g. 0.001176 → we want first 4 non-zero-leading digits
      // Strategy: multiply up so first sig digit is in units place, floor to 4 sig figs
      const mag = Math.floor(Math.log10(p));  // e.g. -3 for 0.001176
      const factor = Math.pow(10, 3 - mag);    // 10^(3-(-3)) = 10^6
      const truncated = Math.floor(p * factor) / factor;
      // Now format: need enough decimal places
      const decPlaces = -mag + 3;              // e.g. 6 for mag=-3
      let s = truncated.toFixed(decPlaces);
      s = s.replace(/0+$/, '').replace(/\.$/, '');
      return '$' + s;
    }

    // p < 0.0001 → subscript-zero DEX notation, 4 sig figs, truncated
    // Count leading zeros after decimal point (before first non-zero digit)
    // e.g. 0.00000713 → 5 leading zeros, sig digits "713x"
    const mag2 = Math.floor(Math.log10(p));   // e.g. -6 for 0.00000713
    const leadingZeros = -mag2 - 1;            // e.g. 5
    const factor2 = Math.pow(10, 3 - mag2);   // shift 4 sig digits to units+
    const truncSig = Math.floor(p * factor2) / factor2;
    const decPlaces2 = leadingZeros + 4;
    let raw = truncSig.toFixed(decPlaces2);
    // Extract just the significant digits (after the leading zeros)
    const afterDot = raw.split('.')[1] || '';
    let zCount = 0;
    for (let i = 0; i < afterDot.length; i++) {
      if (afterDot[i] === '0') zCount++; else break;
    }
    const sigPart = afterDot.slice(zCount).replace(/0+$/, '');
    const subDigit = SUB_DIGITS[zCount] || String(zCount);
    return '$0.0' + subDigit + sigPart;
  }

  // For coin prices — HTML-safe (subscript digit is Unicode, no tags needed)
  function fmtPrice(p) { return fmtCoinPrice(p); }
  // Alias used in modal token tooltips (plain text context)
  function fmtPriceText(p) { return fmtCoinPrice(p); }

  // Real-world item prices: stored values rendered character-for-character.
  // fmtItemPrice is used wherever a ladder/item price is displayed.
  function fmtItemPrice(p) {
    if (p == null) return '—';
    if (p >= 1000) return '$' + p.toLocaleString('en-US', {maximumFractionDigits: 0});
    if (p >= 1)    return '$' + p.toFixed(2).replace(/\.?0+$/, '');
    // Sub-$1: render with enough decimals to show the stored value exactly
    // Use toPrecision(4) but strip trailing zeros, no subscript, no rounding
    if (p >= 0.0001) {
      const mag = Math.floor(Math.log10(p));
      const dec = Math.max(0, -mag + 3);
      return '$' + p.toFixed(dec).replace(/0+$/, '').replace(/\.$/, '');
    }
    // Very small item prices (absurd floor / time tier)
    return '$' + p.toPrecision(2);
  }

  function findRungIndex(price) {
    if (price == null) return -1;
    for (let i = 0; i < LADDER.length; i++) {
      if (LADDER[i].price <= price) return i;
    }
    return LADDER.length - 1;
  }

  // Honest progress from the rung a coin already cleared to the next rung up.
  // Integer 0–99. Same gap-based math the homepage ladder uses — NOT
  // coinPrice/nextRung (which is always ~90–99% because rungs sit close together).
  function flipProgressPct(coinPrice, clearedRung, nextRung) {
    if (!nextRung) return 100;
    const floor = clearedRung ? clearedRung.price : 0;
    const span = nextRung.price - floor;
    if (span <= 0) return 0;
    return Math.min(99, Math.max(0, Math.round(((coinPrice - floor) / span) * 100)));
  }



  function rungLabelForToken(rung) {
    if (!rung) return null;
    return { name: rung.name, price: fmtItemPrice(rung.price), featured: !!rung.featured };
  }

  function starHtml(featured) {
    if (!featured) return '';
    return '<span class="star" title="Featured flip — these are the bangers">⭐</span>';
  }

  function flipReadiness(t) {
    if (t.price == null) return -1;
    const i = findRungIndex(t.price);
    const nextRung = LADDER[i - 1];
    const prevRung = LADDER[i];
    if (!nextRung) return 1.0;
    const span = nextRung.price - (prevRung ? prevRung.price : 0);
    if (span <= 0) return 0;
    return Math.min(1, Math.max(0, (t.price - (prevRung ? prevRung.price : 0)) / span));
  }

  function renderTicker() {
    const html = state.map(t => `
      <div class="tick">
        <div class="tick-badge"><img src="${t.logo}" alt="${t.sym}" class="logo-img" loading="lazy"/></div>
        <div class="tick-sym">${t.sym}</div>
        <div class="tick-price">${fmtPrice(t.price)}</div>
        <div class="tick-chg ${t.chg < 0 ? 'neg' : ''}">${t.chg >= 0 ? '+' : ''}${(t.chg||0).toFixed(2)}%</div>
      </div>
    `).join('');
    document.getElementById('ticker').innerHTML = html + html;
  }

  function tweetUrl(t, prev) {
    const flipText = prev ? prev.name : 'something';
    const text = encodeURIComponent(`${t.sym} just flipped ${flipText} 👀 wenflip.com/#${t.sym}`);
    return `https://twitter.com/intent/tweet?text=${text}`;
  }

  function chainPillHtml(t) {
    // Pills removed from ladder cards — the All / PulseChain / Majors filter tabs
    // already make chain membership clear. Kept as a no-op so the ${chainPill}
    // slot in renderLadder() renders nothing.
    return '';
  }

  const X_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.746l7.73-8.835L2.42 2.25h6.58l4.26 5.638 5.984-5.638Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>`;

  let showAllCoins = false;
  let chainFilter = 'all';

  function renderLadder() {
    const el = document.getElementById('clusters');
    const ready = state.filter(t => t.price != null && (chainFilter === 'all' || t.chain === chainFilter));
    if (!ready.length) return;

    const ordered = [...ready].sort((a, b) => flipReadiness(b) - flipReadiness(a));

    const cards = ordered.map((t, idx) => {
      const i = findRungIndex(t.price);
      const nextRung = LADDER[i - 1];
      const prevRung = LADDER[i];
      const next = rungLabelForToken(nextRung);
      const prev = rungLabelForToken(prevRung);
      const chgCls = t.chg >= 0 ? 'pos' : 'neg';
      const chgStr = (t.chg >= 0 ? '+' : '') + (t.chg||0).toFixed(2) + '%';
      const chainCls = t.chain === 'pulsechain' ? 'chain-pulsechain' : 'chain-major';
      const chainPill = chainPillHtml(t);

      let pct = 0;
      if (nextRung) {
        // Standard gap formula
        const span = nextRung.price - (prevRung ? prevRung.price : 0);
        pct = span > 0 ? Math.min(100, Math.max(0, ((t.price - (prevRung ? prevRung.price : 0)) / span) * 100)) : 0;
      } else {
        // No next rung (top of ladder): fall back to cheapest rung above coin price
        const fallback = [...LADDER].reverse().find(r => r.price > t.price);
        const targetP = fallback ? fallback.price : 0.0001;
        pct = Math.min(100, Math.max(0, (t.price / targetP) * 100));
      }
      // Minimum visible sliver for any non-zero progress
      const pctDisplay = pct > 0 ? Math.max(3, pct) : 0;

           let caption = '';
      if (!nextRung) {
        caption = `<span class="cap-pct">Top of the ladder 🏆</span>`;
      } else {
        const pctRounded = pct < 1 ? pct.toFixed(1) : Math.round(pct);
        caption = `<span class="cap-pct">${pctRounded}% to</span><span class="cap-sep">·</span><span class="cap-next">${next ? next.name : ''}${next && next.featured ? starHtml(true) : ''}</span><span class="cap-sep">·</span><span class="cap-next">${next ? next.price : ''}</span>`;
        if (prev) caption += `<span class="cap-sep">·</span><span class="cap-prev">flipped ${prev.name}</span>`;
      }

      return `
        ${idx > 0 ? '<div class="cluster-divider"></div>' : ''}
        <div class="cluster ${chainCls}" data-sym="${t.sym}">
          <div class="card-top" data-zoom="${t.sym}" role="button" tabindex="0" aria-label="View ${t.sym} on the full ladder">
            <div class="card-logo"><img src="${t.logo}" alt="${t.sym}" loading="lazy"/></div>
            <div class="card-id">
              <div class="card-sym">${t.sym}</div>
              ${chainPill}
            </div>
            <div class="card-spacer"></div>
            <div class="card-right">
              <span class="card-price">${fmtPrice(t.price)}</span>
              <span class="card-chg ${chgCls}">${chgStr}</span>
              <button class="card-share" type="button" aria-label="Status card for ${t.sym}" data-sc-sym="${t.sym}">${X_ICON}</button>
              <span class="card-chevron" aria-hidden="true">›</span>
            </div>
          </div>
          <div class="card-bar-wrap"><div class="card-bar-track"><div class="card-bar-fill" style="width:${pctDisplay.toFixed(2)}%"></div></div></div>
          <div class="card-identity">${t.identity || ''}</div>
          <div class="card-caption">${caption}</div>
        </div>`;
    });

    const firstFour = cards.slice(0, 4).join('');
    const rest = cards.slice(4).join('');
    el.innerHTML = '<p class="cards-hint">Tap any coin to see its full ladder.</p>' + firstFour + (rest
      ? `<div id="extraClusters" class="extra-clusters" style="${showAllCoins ? '' : 'display:none'}">${rest}</div><div class="show-all-wrap"><button id="showAllBtn" class="show-all-btn">${showAllCoins ? 'Show fewer ↑' : 'Show all coins ↓'}</button></div>`
      : '');

    const showAllBtn = document.getElementById('showAllBtn');
    if (showAllBtn) showAllBtn.addEventListener('click', () => { showAllCoins = !showAllCoins; renderLadder(); });

    el.querySelectorAll('.card-top[data-zoom]').forEach(row => {
      const sym = row.getAttribute('data-zoom');
      row.addEventListener('click', e => { if (e.target.closest('.card-share')) return; openModalZoomedTo(sym); });
      row.addEventListener('keydown', e => { if (e.target.closest('.card-share')) return; if (e.key==='Enter'||e.key===' ') { e.preventDefault(); openModalZoomedTo(sym); } });
    });
    el.querySelectorAll('.card-share[data-sc-sym]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        openStatusCheckModalForCoin(btn.dataset.scSym);
      });
    });
  }

  function renderFullLadder() {
    const body = document.getElementById('modalBody');
    const byRung = {};
    state.forEach(t => {
      if (t.price == null) return;
      const idx = findRungIndex(t.price);
      (byRung[idx] = byRung[idx] || []).push(t);
    });
    const html = ['<div id="modalTop"></div>'];
    let lastTier = null;
    LADDER.forEach((rung, i) => {
      if (rung.tier !== lastTier) {
        const meta = TIER_META[rung.tier];
        if (meta) html.push(`<div class="tier-band ${meta.cls}">${meta.text}</div>`);
        lastTier = rung.tier;
      }
      const placed = byRung[i] || [];
      const meta = TIER_META[rung.tier] || {};
      const tokens = placed.map(t => `<span class="ftok" title="${t.sym} · ${fmtPriceText(t.price)}"><img src="${t.logo}" alt="${t.sym}" class="logo-img" loading="lazy"/></span>`).join('');
      html.push(`
        <div class="frung ${placed.length ? 'has' : ''} ${rung.featured ? 'featured' : ''}" data-rung-index="${i}">
          <div class="fe">${meta.emoji||'•'}</div>
          <div>${rung.name}${starHtml(rung.featured)}</div>
          <div class="fp">${fmtItemPrice(rung.price)}</div>
          <div class="ftokens">${tokens}</div>
        </div>`);
    });
    body.innerHTML = html.join('');
  }

  function openModal() { renderFullLadder(); document.getElementById('modal').classList.add('open'); document.body.style.overflow='hidden'; }
  function openModalZoomedTo(sym) {
    const t = state.find(s => s.sym === sym);
    if (!t || t.price == null) { openModal(); return; }
    renderFullLadder();
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    const idx = findRungIndex(t.price);
    const body = document.getElementById('modalBody');
    const target = body.querySelector(`.frung[data-rung-index="${idx}"]`);
    if (target) requestAnimationFrame(() => { target.scrollIntoView({behavior:'instant',block:'center'}); target.classList.remove('zoom-target'); void target.offsetWidth; target.classList.add('zoom-target'); });
  }
  function closeModal() { document.getElementById('modal').classList.remove('open'); document.body.style.overflow=''; }

  document.querySelectorAll('#chainFilter .chain-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-chain');
      if (next === chainFilter) return;
      chainFilter = next;
      document.querySelectorAll('#chainFilter .chain-filter-btn').forEach(b => {
        const active = b.getAttribute('data-chain') === chainFilter;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderLadder();
    });
  });

  let lastFetch = null;
  function renderUpdated() {
    const el = document.getElementById('updated');
    if (!lastFetch) { el.innerHTML = 'Fetching live prices…'; return; }
    const secs = Math.round((Date.now() - lastFetch) / 1000);
    el.innerHTML = `Live prices · last updated <b>${secs}s ago</b> · refreshes every 60s`;
  }
  setInterval(renderUpdated, 1000);

  async function fetchOne(t) {
    const pairAddr = (t.pairAddress || '').trim();
    const stateIdx = state.findIndex(s => s.sym === t.sym);
    if (!pairAddr) { if (stateIdx>=0){state[stateIdx].status='err';state[stateIdx].error='no pair address';} return; }
    try {
      const url = `https://api.dexscreener.com/latest/dex/pairs/${t.dexChain}/${pairAddr}`;
      const res = await fetch(url);
      if (!res.ok) { if (stateIdx>=0){state[stateIdx].status='err';state[stateIdx].error=`HTTP ${res.status}`;} return; }
      const json = await res.json();
      const pair = json.pair || (Array.isArray(json.pairs) ? json.pairs[0] : null);
      if (!pair || !pair.priceUsd) { if (stateIdx>=0){state[stateIdx].status='err';state[stateIdx].error='no pair data';} return; }
      if (stateIdx >= 0) {
        state[stateIdx].price = parseFloat(pair.priceUsd);
        state[stateIdx].chg = pair.priceChange?.h24 ?? 0;
        state[stateIdx].status = 'ok';
        state[stateIdx].error = null;
      }
    } catch(e) {
      console.warn('fetch failed for', t.sym, e);
      if (stateIdx>=0){state[stateIdx].status='err';state[stateIdx].error=String(e).slice(0,40);}
    }
  }

  async function refreshAll() {
    await Promise.all(TOKENS.map(fetchOne));
    // Only advance lastFetch if at least one coin fetched successfully.
    // If every fetch failed, leave lastFetch at its last good value so
    // "last updated Ns ago" keeps counting up honestly.
    const anyOk = state.some(s => s.status === 'ok');
    if (anyOk) lastFetch = Date.now();
    renderTicker(); renderLadder(); renderUpdated();
  }

  renderTicker();

  function handleDeepLink() {
    const raw = window.location.hash.replace(/^#/,'').trim();
    if (!raw) return;

    // Reserved keyword: #notacoin
    if (raw.toLowerCase()==='notacoin') { openTokenModal(); return; }

    // Reserved keyword: #flip and all #flip=VALUE variants — checked BEFORE coin lookup
    // so 'flip' can never be shadowed by a token symbol.
    if (raw.toLowerCase() === 'flip' || raw.toLowerCase().startsWith('flip=')) {
      const value = raw.toLowerCase() === 'flip' ? '' : raw.slice(5); // everything after 'flip='
      if (!value) {
        // #flip → open picker
        openStatusCheckModal();
        return;
      }
      // #flip=SYMBOL — case-insensitive match against built-in tokens
      const symMatch = TOKENS.find(t => t.sym.toLowerCase() === value.toLowerCase());
      if (symMatch) { openStatusCheckModalForCoin(symMatch.sym); return; }
      // #flip=<contract address> — starts with 0x OR is long enough to be a CA
      if (value.startsWith('0x') || value.length > 30) {
        openStatusCheckModalForCA(value);
        return;
      }
      // #flip=<anything else> → graceful fallback: open picker
      openStatusCheckModal();
      return;
    }

    // Existing: #SYMBOL → zoom the ladder to that coin
    const match = TOKENS.find(t => t.sym.toLowerCase()===raw.toLowerCase());
    if (match) openModalZoomedTo(match.sym);
  }

  refreshAll().then(handleDeepLink);
  setInterval(refreshAll, 60_000);

  // ==== FLIP CALCULATOR ====
  let calcCoin = null, calcTarget = null;
  function openCalcModal() {
    renderCalcCoinBadges(); renderCalcTargetList(''); updateCalcResult();
    document.getElementById('calcModal').classList.add('open'); document.body.style.overflow='hidden';
    const s = document.getElementById('calcSearch'); s.value=''; setTimeout(()=>s.focus(),120);
  }
  function closeCalcModal() { document.getElementById('calcModal').classList.remove('open'); document.body.style.overflow=''; }
  document.getElementById('openCalc').addEventListener('click', openCalcModal);

  function openTokenModal() {
    document.getElementById('tokenModal').classList.add('open'); document.body.style.overflow='hidden';
    if (window.location.hash.replace(/^#/,'')!=='notacoin') history.replaceState(null,'','#notacoin');
  }
  function closeTokenModal() {
    document.getElementById('tokenModal').classList.remove('open'); document.body.style.overflow='';
    if (window.location.hash.replace(/^#/,'').toLowerCase()==='notacoin') history.replaceState(null,'',window.location.pathname+window.location.search);
  }
  document.addEventListener('keydown', e => { if (e.key==='Escape'){closeModal();closeCalcModal();closeTokenModal();} });

  function htmlAttr(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function renderCalcCoinBadges() {
    const wrap = document.getElementById('calcCoinBadges');
    wrap.innerHTML = TOKENS.map(t => {
      const s = state.find(x => x.sym===t.sym);
      const loading = !s || s.price==null;
      return `<button class="coin-badge ${calcCoin===t.sym?'selected':''} ${loading?'loading':''}" data-sym="${t.sym}" title="${t.name}${loading?' (loading…)':''}"><img src="${t.logo}" alt="${t.sym}" loading="lazy"/><span>${t.sym}</span></button>`;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calcCoinBadges').addEventListener('click', function(e) {
      const badge = e.target.closest('.coin-badge');
      if (!badge || badge.classList.contains('loading')) return;
      calcCoin = badge.dataset.sym; renderCalcCoinBadges(); updateCalcResult();
    });
    document.getElementById('calcTargetList').addEventListener('click', function(e) {
      const item = e.target.closest('.target-item');
      if (!item) return;
      calcTarget = { name: item.dataset.name, price: parseFloat(item.dataset.price) };
      renderCalcTargetList(document.getElementById('calcSearch').value); updateCalcResult();
    });
    document.getElementById('calcSearch').addEventListener('input', function() { renderCalcTargetList(this.value); });
  });

  function renderCalcTargetList(filter) {
    const list = document.getElementById('calcTargetList');
    const q = filter.toLowerCase().trim();
    const items = LADDER.filter(r => r.price!=null && (!q || r.name.toLowerCase().includes(q)));
    if (!items.length) { list.innerHTML=`<div class="target-empty">No items match "${htmlAttr(filter)}"</div>`; return; }
    list.innerHTML = items.map(r => `<div class="target-item ${calcTarget&&calcTarget.name===r.name?'selected':''}" data-name="${htmlAttr(r.name)}" data-price="${r.price}"><span class="ti-name">${r.name}</span><span class="ti-price">${fmtItemPrice(r.price)}</span></div>`).join('');
  }

  function fmtMult(mult) {
    if (mult>=1e9) return '1B+';
    if (mult>=1e6) { const v=mult/1e6; return (v>=10?Math.round(v):parseFloat(v.toFixed(1)))+'M'; }
    if (mult>=1000) return Math.round(mult).toLocaleString();
    if (mult>=10) return Math.round(mult).toString();
    if (mult>=2) return parseFloat(mult.toFixed(1)).toString();
    return parseFloat(mult.toFixed(2)).toString();
  }

  const CALC_STATE_COLORS = {
    flipped:     { main: '#22c55e', glow: 'rgba(34,197,94,0.45)' },
    approaching: { main: '#f5f5fa', glow: 'rgba(245,245,250,0.20)' },
  };

  function updateCalcResult() {
    const placeholder=document.getElementById('calcPlaceholder'), card=document.getElementById('calcResultCard'), shareRow=document.getElementById('calcShareRow'), lineMult=document.getElementById('calcLineMult'), line3=document.getElementById('calcLine3');
    if (!calcCoin||!calcTarget) {
      placeholder.style.display=''; card.style.display='none'; shareRow.style.display='none';
      placeholder.textContent = !calcCoin&&!calcTarget ? 'Pick a coin and a target to see the math.' : !calcCoin ? 'Now pick your coin.' : 'Now pick a target item.';
      return;
    }
    const s = state.find(x=>x.sym===calcCoin);
    if (!s||!s.price) { placeholder.style.display=''; placeholder.textContent=`Price unavailable for ${calcCoin}. Try again shortly.`; card.style.display='none'; shareRow.style.display='none'; return; }
    placeholder.style.display='none'; card.style.display=''; shareRow.style.display='';
    const coinPrice=s.price, targetPrice=calcTarget.price, mult=targetPrice/coinPrice;
    const tk=TOKENS.find(t=>t.sym===calcCoin);
    const logoEl=document.getElementById('calcSbLogo');
    if (tk){logoEl.src=tk.logo;logoEl.alt=calcCoin;}
    document.getElementById('calcSbCoinName').textContent=`1 ${calcCoin}`;
    document.getElementById('calcSbCoinPrice').textContent=fmtPrice(coinPrice);
    document.getElementById('calcSbItemName').textContent=calcTarget.name;
    document.getElementById('calcSbItemPrice').textContent=fmtItemPrice(targetPrice);
    document.getElementById('calcDate').textContent=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const stateKey=mult<=1?'flipped':'approaching', col=CALC_STATE_COLORS[stateKey];
    const verdictEl=document.getElementById('calcVerdict');
    let multText;
    if (stateKey==='flipped') { const n=coinPrice/targetPrice; verdictEl.textContent='FLIPPED ✓'; multText=fmtMult(n)+'×'; line3.textContent=`1 ${calcCoin} buys ${multText} ${calcTarget.name}`; line3.removeAttribute('title'); }
    else { verdictEl.textContent='NOT YET'; multText=fmtMult(mult)+'×'; line3.textContent=`${calcCoin} needs ${multText} to reach ${calcTarget.name}`; if (mult>=1e9) line3.setAttribute('title',`Exact: ${Math.round(mult).toLocaleString()}x`); else line3.removeAttribute('title'); }
    lineMult.textContent=multText;
    lineMult.style.fontSize=multText.length>7?'42px':multText.length>5?'52px':'64px';
    verdictEl.style.color='#f5f5fa'; lineMult.style.color=col.main; lineMult.style.filter=`drop-shadow(0 0 16px ${col.glow})`;
  }

  const _isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;
  async function loadHtml2Canvas() {
    if (window.html2canvas) return;
    await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';s.integrity='sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==';s.crossOrigin='anonymous';s.onload=resolve;s.onerror=()=>reject(new Error('html2canvas failed'));document.head.appendChild(s);});
  }
  (function(){if(_isIOS){const icon=document.getElementById('calcShareIcon'),txt=document.getElementById('calcShareText');if(icon)icon.textContent='💾';if(txt)txt.textContent='Save image';}})();
  async function calcCopyImage() {
    const btn=document.getElementById('calcShareBtn'),icon=document.getElementById('calcShareIcon'),txt=document.getElementById('calcShareText');
    btn.disabled=true; icon.textContent='⏳'; txt.textContent='Generating…';
    try {
      await loadHtml2Canvas();
      const card=document.getElementById('calcResultCard');
      const srcCanvas=await window.html2canvas(card,{backgroundColor:null,scale:3,useCORS:true,logging:false});
      const out=document.createElement('canvas'); out.width=1080; out.height=1080;
      const ctx=out.getContext('2d');
      const bg=ctx.createLinearGradient(0,0,0,1080); bg.addColorStop(0,'#0d0d1e'); bg.addColorStop(1,'#0a0a14'); ctx.fillStyle=bg; ctx.fillRect(0,0,1080,1080);
      const glow=ctx.createRadialGradient(540,150,0,540,150,640); glow.addColorStop(0,'rgba(46,224,106,0.10)'); glow.addColorStop(1,'transparent'); ctx.fillStyle=glow; ctx.fillRect(0,0,1080,1080);
      ctx.drawImage(srcCanvas,30,30,1020,1020);
      if (_isIOS) { const link=document.createElement('a'); link.download='wenflip.png'; link.href=out.toDataURL('image/png'); document.body.appendChild(link); link.click(); document.body.removeChild(link); showCalcToast('Saved! Share it on X. 🔥'); }
      else { out.toBlob(async blob=>{try{await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);showCalcToast('Copied! Paste it into X. 🔥');}catch{const link=document.createElement('a');link.download='wenflip.png';link.href=URL.createObjectURL(blob);document.body.appendChild(link);link.click();document.body.removeChild(link);URL.revokeObjectURL(link.href);showCalcToast('Saved! Share it on X. 🔥');}}, 'image/png'); }
    } catch(err) { console.error(err); showCalcToast('Screenshot failed — try again 😬'); }
    finally { btn.disabled=false; icon.textContent=_isIOS?'💾':'📋'; txt.textContent=_isIOS?'Save image':'Copy as image'; }
  }
  function showCalcToast(msg) { const t=document.getElementById('calcToast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),3200); }

  // ==== SHARED IMAGE EXPORT (refactored — both calc and status check use this) ====
  // calcCopyImage now delegates to exportCardAsImage; no behavior change for the calculator.
  const _origCalcCopy = calcCopyImage;
  // Re-bind calcCopyImage to use the shared function
  // (We define exportCardAsImage first, then shadow calcCopyImage below.)

  async function exportCardAsImage(cardEl, shareBtn, iconEl, txtEl, isIOS) {
    shareBtn.disabled=true; iconEl.textContent='⏳'; txtEl.textContent='Generating…';
    try {
      await loadHtml2Canvas();
      const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
      const out=document.createElement('canvas'); out.width=1080; out.height=1080;
      const ctx=out.getContext('2d');
      const bg=ctx.createLinearGradient(0,0,0,1080); bg.addColorStop(0,'#0d0d1e'); bg.addColorStop(1,'#0a0a14'); ctx.fillStyle=bg; ctx.fillRect(0,0,1080,1080);
      const glow=ctx.createRadialGradient(540,150,0,540,150,640); glow.addColorStop(0,'rgba(46,224,106,0.10)'); glow.addColorStop(1,'transparent'); ctx.fillStyle=glow; ctx.fillRect(0,0,1080,1080);
      ctx.drawImage(srcCanvas,30,30,1020,1020);
      if (isIOS) { const link=document.createElement('a'); link.download='wenflip.png'; link.href=out.toDataURL('image/png'); document.body.appendChild(link); link.click(); document.body.removeChild(link); showCalcToast('Saved! Share it on X. 🔥'); }
      else { out.toBlob(async blob=>{try{await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);showCalcToast('Copied! Paste it into X. 🔥');}catch{const link=document.createElement('a');link.download='wenflip.png';link.href=URL.createObjectURL(blob);document.body.appendChild(link);link.click();document.body.removeChild(link);URL.revokeObjectURL(link.href);showCalcToast('Saved! Share it on X. 🔥');}}, 'image/png'); }
    } catch(err) { console.error(err); showCalcToast('Screenshot failed — try again 😬'); }
    finally { shareBtn.disabled=false; iconEl.textContent=isIOS?'💾':'📋'; txtEl.textContent=isIOS?'Save image':'Copy as image'; }
  }

  // ==== STATUS CHECK MODAL ====
  const GAP_BUCKETS = {
    high:   ["Agonizing.", "This close.", "Right there."],
    mid:    ["Getting there.", "Knocking on the door.", "Almost rude how close."],
    low:    ["A journey, not a sprint.", "Work to do.", "We wait."],
    bottom: ["A ways to go.", "Patience.", "Long road."],
  };
  function gapBucket(pct) {
    if (pct >= 95) return GAP_BUCKETS.high;
    if (pct >= 75) return GAP_BUCKETS.mid;
    if (pct >= 40) return GAP_BUCKETS.low;
    return GAP_BUCKETS.bottom;
  }
  function randPick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
  function getGapLine(pct, dollarGap) {
    const tag = randPick(gapBucket(pct));
    return fmtItemPrice(dollarGap) + ' to go.  ' + tag;
  }

  function openStatusCheckModal() {
    renderScCoinList();
    document.getElementById('scCardWrap').style.display = 'none';
    document.getElementById('statusCheckModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function openStatusCheckModalForCoin(sym) {
    renderScCoinList();
    document.getElementById('scCardWrap').style.display = 'none';
    document.getElementById('statusCheckModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    // Pre-render the card for this coin immediately
    renderStatusCard(sym);
  }
  // Helper: open the Status Check modal and invoke the existing CA resolve+render flow for a
  // contract address string. Re-uses resolveContractAddress + renderStatusCardFromData + caShowFail
  // exactly as caSubmit does — no duplicated logic.
  async function openStatusCheckModalForCA(address) {
    openStatusCheckModal();
    // Let the modal paint before kicking off the async fetch
    await new Promise(r => setTimeout(r, 80));
    const caInput = document.getElementById('caInput');
    if (caInput) caInput.value = address;
    caClearFail();
    let result;
    try { result = await resolveContractAddress(address); }
    catch(e) { result = { ok:false, reason:'network' }; }
    if (result.ok) { caClearFail(); renderStatusCardFromData(result.token); }
    else { caShowFail(result.reason); }
  }

  function closeStatusCheckModal() {
    document.getElementById('statusCheckModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderScCoinList() {
    const wrap = document.getElementById('scCoinList');
    wrap.innerHTML = TOKENS.map(t => {
      const s = state.find(x => x.sym===t.sym);
      const loading = !s || s.price==null;
      return `<button class="sc-coin-row${loading?' loading':''}" data-sym="${t.sym}">
        <span class="sc-coin-logo-wrap"><img src="${t.logo}" alt="${t.sym}"/></span>
        <span class="sc-coin-name">${t.name}</span>
        <span class="sc-coin-sym-tag">${t.sym}</span>
      </button>`;
    }).join('');
    wrap.querySelectorAll('.sc-coin-row:not(.loading)').forEach(btn => {
      btn.addEventListener('click', () => renderStatusCard(btn.dataset.sym));
    });
  }

  // ==== PASTE-A-CONTRACT-ADDRESS (CA) TOOL ====
  // Lives ONLY inside the Status Check modal. Resolves an arbitrary token via DexScreener and
  // renders it through renderStatusCardFromData — it never touches `state` or the TOKENS array,
  // so a pasted address can never collide with or duplicate a built-in coin.

  // Inline SVG data-URI fallback logo: dark circle + first letter of the symbol in white. No image files.
  function caFallbackLogo(sym) {
    const ch = ((String(sym||'?').trim()[0] || '?').toUpperCase()).replace(/[<>&"']/g,'') || '?';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#15151f"/><text x="32" y="33" font-family="Inter,Arial,sans-serif" font-size="30" font-weight="800" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${ch}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Normalize for the wenflip plaintext check: lowercase, strip everything but a-z0-9.
  function caNormalize(str) { return String(str||'').toLowerCase().replace(/[^a-z0-9]/g,''); }

  // SHA-256 hex of a string via SubtleCrypto.
  async function caSha256Hex(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
  }

  // Mechanism B: split name+symbol into alphanumeric tokens, SHA-256 each, test membership.
  async function caHasBlockedToken(name, sym) {
    if (_blockedHashSet.size === 0) return false;
    const tokens = (String(name||'') + ' ' + String(sym||'')).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    for (const tok of tokens) {
      if (_blockedHashSet.has(await caSha256Hex(tok))) return true;
    }
    return false;
  }

  // Mechanism A: does the normalized name/symbol CONTAIN a wenflip-impersonation entry?
  // ('flip' / '$flip' alone is NOT blocked — Chainflip is real.)
  function caIsWenflipImpersonation(name, sym) {
    const norm = caNormalize(name) + caNormalize(sym);
    return WENFLIP_BLOCK.some(entry => norm.includes(caNormalize(entry)));
  }

  // Resolver. Gates run in the exact order specified; each failure returns {ok:false, reason}.
  async function resolveContractAddress(rawInput) {
    // 1. Sanity
    const address = String(rawInput||'').trim();
    if (!address || address.length < 30) return { ok:false, reason:'invalid' };

    // 2. Fetch the chain-agnostic TOKEN endpoint with an ~8s timeout
    let json;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      let res;
      try { res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${encodeURIComponent(address)}`, { signal: ctrl.signal }); }
      finally { clearTimeout(timer); }
      if (!res.ok) return { ok:false, reason:'network' };
      json = await res.json();
    } catch(e) { return { ok:false, reason:'network' }; }
    const pairs = Array.isArray(json && json.pairs) ? json.pairs : [];
    if (pairs.length === 0) return { ok:false, reason:'notfound' };

    // 3. Keep only pairs where baseToken.address matches the pasted address; pick deepest liquidity
    const lc = address.toLowerCase();
    const mine = pairs.filter(p => p && p.baseToken && String(p.baseToken.address||'').toLowerCase() === lc);
    if (mine.length === 0) return { ok:false, reason:'notfound' };
    mine.sort((a,b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
    const pair = mine[0];

    // 4. Liquidity floor
    if ((pair.liquidity?.usd || 0) < MIN_LIQUIDITY_USD) return { ok:false, reason:'illiquid' };
    // 5. Volume floor
    if ((pair.volume?.h24 || 0) < MIN_VOLUME_24H) return { ok:false, reason:'novolume' };

    // 6. Blocklist on baseToken.name + baseToken.symbol
    const bName = pair.baseToken.name || '';
    const bSym  = pair.baseToken.symbol || '';
    if (caIsWenflipImpersonation(bName, bSym)) return { ok:false, reason:'wenflip' };
    if (await caHasBlockedToken(bName, bSym))  return { ok:false, reason:'blocked' };

    // 7. Success
    return { ok:true, token: {
      sym:  bSym,
      name: bName,
      price: parseFloat(pair.priceUsd),
      chg:  pair.priceChange?.h24 ?? 0,
      logo: (pair.info && pair.info.imageUrl) ? pair.info.imageUrl : caFallbackLogo(bSym),
    }};
  }

  // ---- CA UI flow: input + button + inline failure message, inside the status modal ----
  const CA_FAIL_MESSAGES = {
    invalid:  "That's not a contract address. Try pasting the actual thing.",
    network:  "DexScreener isn't answering. Try again in a sec.",
    notfound: "Couldn't find that coin. Either it's not trading or you fat-fingered it.",
    illiquid: "Not enough liquidity to call this a price. That's a group chat, not a market.",
    novolume: "Nobody's trading this. The price is a fossil. No card.",
    blocked:  "We're not putting that on a card. The ladder has standards. Barely, but it does.",
  };

  function caShowFail(reason) {
    const box = document.getElementById('caFailMsg');
    if (!box) return;
    document.getElementById('scCardWrap').style.display = 'none';
    if (reason === 'wenflip') {
      box.innerHTML = `There is no wenflip token. Whatever you pasted is a scam and it isn't ours. Don't buy it. <a href="#notacoin" class="ca-fail-link" onclick="event.preventDefault();openTokenModal();">wen token?</a>`;
    } else {
      box.textContent = CA_FAIL_MESSAGES[reason] || CA_FAIL_MESSAGES.notfound;
    }
    box.style.display = 'block';
  }
  function caClearFail() {
    const box = document.getElementById('caFailMsg');
    if (box) { box.style.display = 'none'; box.textContent = ''; }
  }

  let _caBusy = false;
  async function caSubmit() {
    if (_caBusy) return;
    const input = document.getElementById('caInput');
    const btn = document.getElementById('caGoBtn');
    if (!input || !btn) return;
    caClearFail();
    _caBusy = true; btn.disabled = true;
    const prevLabel = btn.textContent;
    btn.textContent = 'Pulling the receipt…';
    const started = Date.now();
    let result;
    try { result = await resolveContractAddress(input.value); }
    catch(e) { result = { ok:false, reason:'network' }; }
    // Guarantee at least a ~1s deadpan beat
    await new Promise(r => setTimeout(r, Math.max(0, 1000 - (Date.now() - started))));
    try {
      if (result.ok) { caClearFail(); renderStatusCardFromData(result.token); }
      else { caShowFail(result.reason); }
    } finally {
      _caBusy = false; btn.disabled = false; btn.textContent = prevLabel;
    }
  }

  // Wire the CA controls (static elements in the status modal; script is deferred so DOM exists).
  (function wireCaTool(){
    const btn = document.getElementById('caGoBtn');
    const input = document.getElementById('caInput');
    if (btn) btn.addEventListener('click', caSubmit);
    if (input) {
      input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); caSubmit(); } });
      input.addEventListener('input', caClearFail);
    }
  })();

  // Thin wrapper: look up a built-in coin by symbol, then delegate to the data-driven renderer.
  // Behavior for built-ins is byte-for-byte identical to before (their names/syms/logos contain
  // no HTML-special characters, so the escaping in renderStatusCardFromData is a no-op on them).
  function renderStatusCard(sym) {
    const s = state.find(x => x.sym===sym);
    const tk = TOKENS.find(t => t.sym===sym);
    if (!s || !s.price || !tk) return;
    renderStatusCardFromData({ sym, name: tk.name, price: s.price, chg: s.chg || 0, logo: tk.logo });
  }

  // Data-driven renderer. Takes {sym, name, price, chg, logo} directly — used by both the
  // built-in picker (via renderStatusCard) and the pasted-CA path (which never touches `state`).
  function renderStatusCardFromData(tokenObj) {
    if (!tokenObj || tokenObj.price == null) return;
    caClearFail();
    const sym  = String(tokenObj.sym  || '');
    const name = String(tokenObj.name || sym);
    const logo = String(tokenObj.logo || '');

    const coinPrice = tokenObj.price;
    const chg = tokenObj.chg || 0;
    const chgSign = chg >= 0 ? '▲' : '▼';
    const chgCls = chg >= 0 ? 'sc-up' : 'sc-down';
    const dateStr = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});

    const clearedIdx = findRungIndex(coinPrice);
    const clearedRung = LADDER[clearedIdx];
    const nextRung = LADDER[clearedIdx - 1];

    let zone3Html = '';
    let zone4Html = '';
    let hasDivider4 = false;

    if (clearedIdx === 0 || !nextRung) {
      // Top of ladder — no next rung
      zone3Html = `<div class="sc-zone sc-zone-top-msg">
        <div class="sc-top-msg-line">There is nothing left to flip.</div>
        <div class="sc-top-msg-sub">It has cleared the entire ladder.</div>
      </div>`;
    } else if (clearedIdx === LADDER.length - 1 && coinPrice < LADDER[clearedIdx].price) {
      // Below the ladder — no cleared rung
      const firstRung = LADDER[LADDER.length - 1];
      const pctRaw = Math.min(99, Math.round((coinPrice / firstRung.price) * 100));
      const dollarGap = firstRung.price - coinPrice;
      zone3Html = `<div class="sc-zone">
        <div class="sc-label">STATUS: not on the board yet</div>
      </div>`;
      zone4Html = `<div class="sc-zone">
        <div class="sc-vector-line">${pctRaw}% of the way to <span class="sc-item-name">${firstRung.name}</span> <span class="sc-item-price">${fmtItemPrice(firstRung.price)}</span></div>
        <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pctRaw)}%"></div></div>
        <div class="sc-gap-line">${getGapLine(pctRaw, dollarGap)}</div>
      </div>`;
      hasDivider4 = true;
    } else {
      // Normal case
      const pctRaw = flipProgressPct(coinPrice, clearedRung, nextRung);
      const dollarGap = nextRung.price - coinPrice;
      zone3Html = `<div class="sc-zone">
        <div class="sc-label">STATUS: FLIPPED</div>
        <div class="sc-cleared-name">${clearedRung.name}</div>
        <div class="sc-cleared-price">${fmtItemPrice(clearedRung.price)}</div>
      </div>`;
      zone4Html = `<div class="sc-zone">
        <div class="sc-vector-line">${pctRaw}% of the way to <span class="sc-item-name">${nextRung.name}</span> <span class="sc-item-price">${fmtItemPrice(nextRung.price)}</span></div>
        <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pctRaw)}%"></div></div>
        <div class="sc-gap-line">${getGapLine(pctRaw, dollarGap)}</div>
      </div>`;
      hasDivider4 = true;
    }

    document.getElementById('scResultCard').innerHTML = `
      <div class="sc-zone sc-zone-identity">
        <div class="sc-id-row">
          <img class="sc-logo" src="${htmlAttr(logo)}" alt="${htmlAttr(sym)}"/>
          <span class="sc-coin-fullname">${htmlAttr(name)}</span>
        </div>
        <div class="sc-price-row">
          <span class="sc-live-price">${fmtPrice(coinPrice)}</span>
          <span class="sc-chg ${chgCls}">${chgSign} ${Math.abs(chg).toFixed(2)}% (24h)</span>
        </div>
      </div>
      <div class="sc-divider"></div>
      ${zone3Html}
      <div class="sc-divider"></div>
      ${zone4Html}
      ${hasDivider4 ? '<div class="sc-divider"></div>' : ''}
      <div class="sc-stamp">
        <span class="sc-date">${dateStr}</span>
        <span class="sc-wm">wenflip.com</span>
      </div>
    `;

    const wrap = document.getElementById('scCardWrap');
    wrap.style.display = '';
    requestAnimationFrame(() => wrap.scrollIntoView({behavior:'smooth',block:'nearest'}));

    const icon = document.getElementById('scShareIcon');
    const txt = document.getElementById('scShareText');
    if (icon) icon.textContent = _isIOS ? '💾' : '📋';
    if (txt) txt.textContent = _isIOS ? 'Save image' : 'Copy as image';
  }

  async function scExport() {
    const btn=document.getElementById('scShareBtn'),icon=document.getElementById('scShareIcon'),txt=document.getElementById('scShareText');
    await exportCardAsImage(document.getElementById('scResultCard'),btn,icon,txt,_isIOS);
  }

  async function scShare() {
    const btn2=document.getElementById('scShareBtn2'),icon2=document.getElementById('scShareIcon2'),txt2=document.getElementById('scShareText2');
    btn2.disabled=true; icon2.textContent='⏳'; txt2.textContent='Preparing…';
    try {
      await loadHtml2Canvas();
      const cardEl=document.getElementById('scResultCard');
      const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
      const out=document.createElement('canvas'); out.width=1080; out.height=1080;
      const ctx=out.getContext('2d');
      const bg=ctx.createLinearGradient(0,0,0,1080); bg.addColorStop(0,'#0d0d1e'); bg.addColorStop(1,'#0a0a14'); ctx.fillStyle=bg; ctx.fillRect(0,0,1080,1080);
      const glow=ctx.createRadialGradient(540,150,0,540,150,640); glow.addColorStop(0,'rgba(46,224,106,0.10)'); glow.addColorStop(1,'transparent'); ctx.fillStyle=glow; ctx.fillRect(0,0,1080,1080);
      ctx.drawImage(srcCanvas,30,30,1020,1020);
      // Attempt native file share (works on mobile with share sheets)
      const canShareFiles = navigator.canShare && navigator.share;
      if (canShareFiles) {
        // Build a File from the canvas blob, then test if the browser can share it
        await new Promise((resolve, reject) => {
          out.toBlob(async blob => {
            try {
              const file = new File([blob], 'wenflip-status.png', {type:'image/png'});
              const shareData = { files:[file], title:'WenFlip Status', text:'Check the status on wenflip.com' };
              if (navigator.canShare(shareData)) {
                await navigator.share(shareData);
                resolve();
              } else {
                // canShare says no — fall through to clipboard+composer
                reject(new Error('canShare false'));
              }
            } catch(e) { reject(e); }
          }, 'image/png');
        });
      } else {
        throw new Error('no share');
      }
    } catch(err) {
      // Fallback: copy image to clipboard + open X compose window
      try {
        const cardEl=document.getElementById('scResultCard');
        const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
        const out2=document.createElement('canvas'); out2.width=1080; out2.height=1080;
        const ctx2=out2.getContext('2d');
        const bg2=ctx2.createLinearGradient(0,0,0,1080); bg2.addColorStop(0,'#0d0d1e'); bg2.addColorStop(1,'#0a0a14'); ctx2.fillStyle=bg2; ctx2.fillRect(0,0,1080,1080);
        const glow2=ctx2.createRadialGradient(540,150,0,540,150,640); glow2.addColorStop(0,'rgba(46,224,106,0.10)'); glow2.addColorStop(1,'transparent'); ctx2.fillStyle=glow2; ctx2.fillRect(0,0,1080,1080);
        ctx2.drawImage(srcCanvas,30,30,1020,1020);
        await new Promise((resolve, reject) => {
          out2.toBlob(async blob => {
            try {
              await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
              window.open('https://x.com/intent/post?text=' + encodeURIComponent('wenflip.com'), '_blank', 'noopener');
              showCalcToast('Image copied — paste it into your post 🔥');
              resolve();
            } catch(e2) {
              // Clipboard also failed — download + open composer
              const link=document.createElement('a'); link.download='wenflip-status.png'; link.href=URL.createObjectURL(blob); document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(link.href);
              window.open('https://x.com/intent/post?text=' + encodeURIComponent('wenflip.com'), '_blank', 'noopener');
              showCalcToast('Saved! Open X and attach the image. 🔥');
              resolve();
            }
          }, 'image/png');
        });
      } catch(e3) { console.error(e3); showCalcToast('Screenshot failed — try again 😬'); }
    } finally {
      btn2.disabled=false; icon2.textContent='𝕏'; txt2.textContent='Share';
    }
  }

  // ==== FLIPPENING MODAL ====
  // flCoinA / flCoinB each hold a full coin object: {sym, name, price, chg, logo}
  // or null. Built-in taps convert via _flObjFromBuiltin(); pasted CAs set directly
  // from resolveContractAddress's returned token. Symbol collisions are impossible
  // because we never key on sym after this point.
  let flCoinA = null, flCoinB = null;

  // Convert a built-in coin (by sym) to the shared object shape.
  function _flObjFromBuiltin(sym) {
    const s  = state.find(x => x.sym === sym);
    const tk = TOKENS.find(t => t.sym === sym);
    if (!s || !tk) return null;
    return { sym: tk.sym, name: tk.name, price: s.price, chg: s.chg || 0, logo: tk.logo };
  }

  function openFlippen() {
    flCoinA = null; flCoinB = null;
    renderFlippenPickers();
    document.getElementById('flCardWrap').style.display = 'none';
    document.getElementById('flippeningModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeFlippen() {
    document.getElementById('flippeningModal').classList.remove('open');
    document.body.style.overflow = '';
  }
  // NOTE: Flippening is opened by the "Dunk on a coin" door button (#doorDunk),
  // wired in the EMOTION DOORS block below. The old #openFlippening element no
  // longer exists in the HTML; the stray listener that referenced it has been
  // removed (it threw on null and halted all of app.js).

  function renderFlippenPickers() {
    ['A','B'].forEach(side => {
      const wrap = document.getElementById('flCoinList' + side);
      const selected = side === 'A' ? flCoinA : flCoinB;
      // A pasted coin won't match any t.sym → no built-in row appears highlighted, which is correct.
      wrap.innerHTML = TOKENS.map(t => {
        const s = state.find(x => x.sym === t.sym);
        const loading = !s || s.price == null;
        const sel = (selected && selected._builtin && selected.sym === t.sym) ? ' fl-selected' : '';
        return `<button class="sc-coin-row fl-coin-row${loading?' loading':''}${sel}" data-sym="${t.sym}" data-side="${side}">
          <span class="sc-coin-logo-wrap"><img src="${t.logo}" alt="${t.sym}"/></span>
          <span class="sc-coin-name">${t.name}</span>
          <span class="sc-coin-sym-tag">${t.sym}</span>
        </button>`;
      }).join('');
      wrap.querySelectorAll('.fl-coin-row:not(.loading)').forEach(btn => {
        btn.addEventListener('click', () => {
          const obj = _flObjFromBuiltin(btn.dataset.sym);
          if (!obj) return;
          obj._builtin = true; // mark so picker highlight works
          // Clear any CA input/fail for this side
          _flCaClear(btn.dataset.side);
          if (btn.dataset.side === 'A') flCoinA = obj;
          else flCoinB = obj;
          renderFlippenPickers();
          if (flCoinA && flCoinB) renderFlippen();
        });
      });
    });
  }

  // ── Per-side CA input helpers ────────────────────────────────────────────────
  // Show/hide inline fail message for a given side (A or B).
  function _flCaShowFail(side, reason) {
    const box = document.getElementById('flCaFail' + side);
    if (!box) return;
    if (reason === 'wenflip') {
      box.innerHTML = `There is no wenflip token. Don't buy it. <a href="#notacoin" class="ca-fail-link" onclick="event.preventDefault();openTokenModal();">wen token?</a>`;
    } else {
      box.textContent = CA_FAIL_MESSAGES[reason] || CA_FAIL_MESSAGES.notfound;
    }
    box.style.display = 'block';
  }
  function _flCaClear(side) {
    const box = document.getElementById('flCaFail' + side);
    if (box) { box.style.display = 'none'; box.textContent = ''; }
    const input = document.getElementById('flCaInput' + side);
    if (input) input.value = '';
  }

  // Busy flags — one per side so the two inputs don't block each other.
  const _flCaBusy = { A: false, B: false };

  async function flCaSubmit(side) {
    if (_flCaBusy[side]) return;
    const input = document.getElementById('flCaInput' + side);
    const btn   = document.getElementById('flCaBtn'   + side);
    if (!input || !btn) return;

    const box = document.getElementById('flCaFail' + side);
    if (box) { box.style.display = 'none'; box.textContent = ''; }

    _flCaBusy[side] = true;
    btn.disabled = true;
    const prevLabel = btn.textContent;
    btn.textContent = 'Pulling…';

    const started = Date.now();
    let result;
    try { result = await resolveContractAddress(input.value); }
    catch(e) { result = { ok: false, reason: 'network' }; }

    // 1-second deadpan beat (same as the status modal)
    await new Promise(r => setTimeout(r, Math.max(0, 1000 - (Date.now() - started))));

    try {
      if (result.ok) {
        // Set this side to the pasted coin object — no _builtin flag, so no built-in row highlights.
        const coinObj = result.token;
        if (side === 'A') flCoinA = coinObj;
        else              flCoinB = coinObj;
        // Refresh pickers to clear any highlight on built-in rows for this side.
        renderFlippenPickers();
        if (flCoinA && flCoinB) renderFlippen();
      } else {
        _flCaShowFail(side, result.reason);
      }
    } finally {
      _flCaBusy[side] = false;
      btn.disabled = false;
      btn.textContent = prevLabel;
    }
  }

  // Wire the per-side CA inputs. Called once after the modal HTML exists (deferred script).
  (function wireFlCaTool() {
    ['A','B'].forEach(side => {
      const btn   = document.getElementById('flCaBtn'   + side);
      const input = document.getElementById('flCaInput' + side);
      if (btn)   btn.addEventListener('click', () => flCaSubmit(side));
      if (input) {
        input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); flCaSubmit(side); } });
        input.addEventListener('input', () => {
          const b = document.getElementById('flCaFail' + side);
          if (b) { b.style.display = 'none'; b.textContent = ''; }
        });
      }
    });
  })();

  // Truncate long strings for the card
  function flTrunc(str, max) {
    if (!str) return '';
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  }

  function renderFlippen() {
    if (!flCoinA || !flCoinB) return;

    // Same-coin guard — compare by sym string (handles built-in vs built-in;
    // two different pasted tokens that happen to share a sym are unlikely but
    // would show as a tie, which is acceptable).
    if (flCoinA.sym === flCoinB.sym) {
      document.getElementById('flCardWrap').style.display = 'none';
      const existing = document.getElementById('flSameWarn');
      if (!existing) {
        const warn = document.createElement('p');
        warn.id = 'flSameWarn';
        warn.className = 'fl-same-warn';
        warn.textContent = 'Pick two different coins to run the comparison.';
        document.getElementById('flPickers').insertAdjacentElement('afterend', warn);
      }
      return;
    }
    const existingWarn = document.getElementById('flSameWarn');
    if (existingWarn) existingWarn.remove();

    // Both sides are now plain coin objects — no symbol lookups needed.
    const coinA = flCoinA;
    const coinB = flCoinB;
    const priceA = coinA.price;
    const priceB = coinB.price;
    const dateStr = new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});

    // Find cleared rung for each coin
    const idxA = priceA != null ? findRungIndex(priceA) : -1;
    const idxB = priceB != null ? findRungIndex(priceB) : -1;
    const rungA = (idxA >= 0 && priceA != null && LADDER[idxA] && LADDER[idxA].price <= priceA) ? LADDER[idxA] : null;
    const rungB = (idxB >= 0 && priceB != null && LADDER[idxB] && LADDER[idxB].price <= priceB) ? LADDER[idxB] : null;

    // Build per-side HTML — coinObj has {sym, name, price, chg, logo}
    function sideSummary(rung) {
      if (!rung) {
        return `<div class="fl-side-item-name fl-item-none">doesn't flip anything yet</div><div class="fl-side-item-price fl-item-none">—</div>`;
      }
      return `<div class="fl-side-item-name">${flTrunc(rung.name, 42)}</div><div class="fl-side-item-price">${fmtItemPrice(rung.price)}</div>`;
    }

    function sideBlock(coinObj, rung, align) {
      const priceDisplay = coinObj.price != null ? fmtPrice(coinObj.price) : '—';
      return `
        <div class="fl-side fl-side-${align}">
          <img class="fl-logo" src="${htmlAttr(coinObj.logo)}" alt="${htmlAttr(coinObj.sym)}"/>
          <div class="fl-coin-name">${flTrunc(coinObj.name, 14)}</div>
          <div class="fl-coin-price">${priceDisplay}</div>
          <div class="fl-flips-lbl">FLIPS</div>
          ${sideSummary(rung)}
        </div>`;
    }

    // Verdict
    let verdictHtml = '';
    let magnitudeHtml = '';
    const objPriceA = rungA ? rungA.price : 0;
    const objPriceB = rungB ? rungB.price : 0;

    if (!rungA && !rungB) {
      verdictHtml = `<div class="fl-verdict fl-verdict-tie">Neither one flips anything. We're all here.</div>`;
    } else if (objPriceA === objPriceB) {
      verdictHtml = `<div class="fl-verdict fl-verdict-tie">Dead heat. Embarrassing for everyone.</div>`;
    } else if (objPriceA > objPriceB) {
      const winnerName = flTrunc(coinA.sym, 10);
      const loserObj   = rungB ? flTrunc(rungB.name, 32) : 'nothing';
      const winnerObj  = flTrunc(rungA.name, 32);
      verdictHtml = `<div class="fl-verdict"><span class="fl-winner">${winnerName}</span> flips ${winnerObj}.<br><span class="fl-loser">${flTrunc(coinB.sym,10)}</span> flips ${loserObj}.</div>`;
      if (rungB && objPriceB > 0) {
        const ratio = objPriceA / objPriceB;
        const ratioFmt = ratio >= 10 ? Math.round(ratio).toLocaleString() : parseFloat(ratio.toFixed(1));
        magnitudeHtml = `<div class="fl-magnitude">${winnerName} flips ${ratioFmt}× more stuff.</div>`;
      } else if (!rungB) {
        magnitudeHtml = `<div class="fl-magnitude">${winnerName} is on the board. ${flTrunc(coinB.sym,10)} is not.</div>`;
      }
    } else {
      const winnerName = flTrunc(coinB.sym, 10);
      const loserObj   = rungA ? flTrunc(rungA.name, 32) : 'nothing';
      const winnerObj  = flTrunc(rungB.name, 32);
      verdictHtml = `<div class="fl-verdict"><span class="fl-winner">${winnerName}</span> flips ${winnerObj}.<br><span class="fl-loser">${flTrunc(coinA.sym,10)}</span> flips ${loserObj}.</div>`;
      if (rungA && objPriceA > 0) {
        const ratio = objPriceB / objPriceA;
        const ratioFmt = ratio >= 10 ? Math.round(ratio).toLocaleString() : parseFloat(ratio.toFixed(1));
        magnitudeHtml = `<div class="fl-magnitude">${winnerName} flips ${ratioFmt}× more stuff.</div>`;
      } else if (!rungA) {
        magnitudeHtml = `<div class="fl-magnitude">${winnerName} is on the board. ${flTrunc(coinA.sym,10)} is not.</div>`;
      }
    }

    document.getElementById('flResultCard').innerHTML = `
      <div class="fl-title-strip">THE FLIPPENING</div>
      <div class="fl-arena">
        ${sideBlock(coinA, rungA, 'left')}
        <div class="fl-vs">VS</div>
        ${sideBlock(coinB, rungB, 'right')}
      </div>
      <div class="fl-verdict-zone">
        ${verdictHtml}
        ${magnitudeHtml}
      </div>
      <div class="fl-stamp">
        <span class="fl-date">${dateStr}</span>
        <span class="fl-wm">wenflip.com</span>
      </div>
    `;

    const wrap = document.getElementById('flCardWrap');
    wrap.style.display = '';
    // Reset share button labels
    const icon = document.getElementById('flShareIcon');
    const txt  = document.getElementById('flShareText');
    if (icon) icon.textContent = _isIOS ? '💾' : '📋';
    if (txt)  txt.textContent  = _isIOS ? 'Save image' : 'Copy as image';
    requestAnimationFrame(() => wrap.scrollIntoView({behavior:'smooth', block:'nearest'}));
  }

  async function flippenExport() {
    const btn=document.getElementById('flShareBtn'),icon=document.getElementById('flShareIcon'),txt=document.getElementById('flShareText');
    await exportCardAsImage(document.getElementById('flResultCard'),btn,icon,txt,_isIOS);
  }

  async function flippenShare() {
    const btn2=document.getElementById('flShareBtn2'),icon2=document.getElementById('flShareIcon2'),txt2=document.getElementById('flShareText2');
    btn2.disabled=true; icon2.textContent='⏳'; txt2.textContent='Preparing…';
    try {
      await loadHtml2Canvas();
      const cardEl=document.getElementById('flResultCard');
      const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
      const out=document.createElement('canvas'); out.width=1080; out.height=1080;
      const ctx=out.getContext('2d');
      const bg=ctx.createLinearGradient(0,0,0,1080); bg.addColorStop(0,'#0d0d1e'); bg.addColorStop(1,'#0a0a14'); ctx.fillStyle=bg; ctx.fillRect(0,0,1080,1080);
      const glow=ctx.createRadialGradient(540,150,0,540,150,640); glow.addColorStop(0,'rgba(46,224,106,0.10)'); glow.addColorStop(1,'transparent'); ctx.fillStyle=glow; ctx.fillRect(0,0,1080,1080);
      ctx.drawImage(srcCanvas,30,30,1020,1020);
      const canShareFiles = navigator.canShare && navigator.share;
      if (canShareFiles) {
        await new Promise((resolve, reject) => {
          out.toBlob(async blob => {
            try {
              const file = new File([blob], 'wenflip-flippening.png', {type:'image/png'});
              const shareData = { files:[file], title:'The Flippening', text:'wenflip.com' };
              if (navigator.canShare(shareData)) { await navigator.share(shareData); resolve(); }
              else { reject(new Error('canShare false')); }
            } catch(e) { reject(e); }
          }, 'image/png');
        });
      } else { throw new Error('no share'); }
    } catch(err) {
      try {
        const cardEl=document.getElementById('flResultCard');
        const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
        const out2=document.createElement('canvas'); out2.width=1080; out2.height=1080;
        const ctx2=out2.getContext('2d');
        const bg2=ctx2.createLinearGradient(0,0,0,1080); bg2.addColorStop(0,'#0d0d1e'); bg2.addColorStop(1,'#0a0a14'); ctx2.fillStyle=bg2; ctx2.fillRect(0,0,1080,1080);
        const glow2=ctx2.createRadialGradient(540,150,0,540,150,640); glow2.addColorStop(0,'rgba(46,224,106,0.10)'); glow2.addColorStop(1,'transparent'); ctx2.fillStyle=glow2; ctx2.fillRect(0,0,1080,1080);
        ctx2.drawImage(srcCanvas,30,30,1020,1020);
        await new Promise((resolve, reject) => {
          out2.toBlob(async blob => {
            try {
              await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
              window.open('https://x.com/intent/post?text=' + encodeURIComponent('wenflip.com'), '_blank', 'noopener');
              showCalcToast('Image copied — paste it into your post 🔥');
              resolve();
            } catch(e2) {
              const link=document.createElement('a'); link.download='wenflip-flippening.png'; link.href=URL.createObjectURL(blob); document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(link.href);
              window.open('https://x.com/intent/post?text=' + encodeURIComponent('wenflip.com'), '_blank', 'noopener');
              showCalcToast('Saved! Open X and attach the image. 🔥');
              resolve();
            }
          }, 'image/png');
        });
      } catch(e3) { console.error(e3); showCalcToast('Screenshot failed — try again 😬'); }
    } finally {
      btn2.disabled=false; icon2.textContent='𝕏'; txt2.textContent='Share';
    }
  }

  // ==== PUMP MODAL ====
  let pumpCoin = null;
  let pumpActiveQuick = null; // tracks the active quick-pick mult string, e.g. '10'

  function openPump() {
    pumpCoin = null; pumpActiveQuick = null;
    renderPumpCoinBadges();
    document.getElementById('pumpInput').value = '';
    document.getElementById('pumpInputHint').textContent = '';
    document.getElementById('pumpResultCard').style.display = 'none';
    document.getElementById('pumpShareRow').style.display = 'none';
    document.getElementById('pumpPlaceholder').style.display = '';
    document.getElementById('pumpPlaceholder').textContent = 'Pick a coin and enter a price or multiple.';
    updatePumpQuickRow();
    document.getElementById('pumpModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closePump() {
    document.getElementById('pumpModal').classList.remove('open');
    document.body.style.overflow = '';
  }
  // NOTE: Pump is opened by the "Pump your bag" door button (#doorPump), wired
  // in the EMOTION DOORS block below. The old #openPump element no longer exists
  // in the HTML; the stray listener that referenced it has been removed.

  function renderPumpCoinBadges() {
    const wrap = document.getElementById('pumpCoinBadges');
    wrap.innerHTML = TOKENS.map(t => {
      const s = state.find(x => x.sym === t.sym);
      const loading = !s || s.price == null;
      return `<button class="coin-badge ${pumpCoin === t.sym ? 'selected' : ''} ${loading ? 'loading' : ''}"
        data-sym="${t.sym}" title="${t.name}${loading ? ' (loading…)' : ''}">
        <img src="${t.logo}" alt="${t.sym}" loading="lazy"/><span>${t.sym}</span>
      </button>`;
    }).join('');
    wrap.querySelectorAll('.coin-badge:not(.loading)').forEach(btn => {
      btn.addEventListener('click', () => {
        pumpCoin = btn.dataset.sym;
        renderPumpCoinBadges();
        updatePumpResult();
      });
    });
  }

  function updatePumpQuickRow() {
    document.querySelectorAll('.pump-quick-btn').forEach(btn => {
      btn.classList.toggle('pump-quick-active', btn.dataset.mult === pumpActiveQuick);
    });
  }

  // Parse the input field into { mode: 'multiple'|'price', value: number } or null
  function parsePumpInput(raw) {
    if (!raw) return null;
    const s = raw.trim().replace(/,/g, '');
    // Multiple: ends with x/X, or is a plain number >= 1 with no $ and no decimal that looks like a small price
    const multMatch = s.match(/^([0-9.]+)[xX]$/);
    if (multMatch) {
      const v = parseFloat(multMatch[1]);
      return isFinite(v) && v > 0 ? { mode: 'multiple', value: v } : null;
    }
    // Price: starts with $ or contains a decimal and no x
    const priceMatch = s.match(/^\$?([0-9.]+)$/);
    if (priceMatch) {
      const v = parseFloat(priceMatch[1]);
      return isFinite(v) && v > 0 ? { mode: 'price', value: v } : null;
    }
    return null;
  }

  function computePumpHypPrice(coinPrice, parsed) {
    if (!parsed) return null;
    if (parsed.mode === 'multiple') return coinPrice * parsed.value;
    return parsed.value; // direct price
  }

  // Truncate helper (reuses same logic as flTrunc but pump-scoped for clarity)
  function pumpTrunc(str, max) {
    if (!str) return '';
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  }

  function updatePumpResult() {
    const placeholder = document.getElementById('pumpPlaceholder');
    const card = document.getElementById('pumpResultCard');
    const shareRow = document.getElementById('pumpShareRow');
    const hint = document.getElementById('pumpInputHint');

    const rawInput = document.getElementById('pumpInput').value;
    const parsed = parsePumpInput(rawInput);

    // Guard: need both a coin and a valid input
    if (!pumpCoin) {
      card.style.display = 'none'; shareRow.style.display = 'none';
      placeholder.style.display = '';
      placeholder.textContent = 'Pick a coin first.';
      hint.textContent = '';
      return;
    }
    const s = state.find(x => x.sym === pumpCoin);
    if (!s || !s.price) {
      card.style.display = 'none'; shareRow.style.display = 'none';
      placeholder.style.display = '';
      placeholder.textContent = `Price unavailable for ${pumpCoin}. Try again shortly.`;
      hint.textContent = '';
      return;
    }
    if (!rawInput.trim()) {
      card.style.display = 'none'; shareRow.style.display = 'none';
      placeholder.style.display = '';
      placeholder.textContent = 'Enter a target price (e.g. $1.00) or a multiple (e.g. 10x).';
      hint.textContent = '';
      return;
    }
    if (!parsed) {
      card.style.display = 'none'; shareRow.style.display = 'none';
      placeholder.style.display = '';
      placeholder.textContent = '';
      hint.textContent = 'Try "10x" for a multiple, or "$1.00" for a price.';
      hint.style.color = 'var(--red)';
      return;
    }

    hint.textContent = '';
    const coinPrice = s.price;
    const hypPrice = computePumpHypPrice(coinPrice, parsed);
    if (!hypPrice || hypPrice <= 0) {
      card.style.display = 'none'; shareRow.style.display = 'none';
      placeholder.style.display = '';
      placeholder.textContent = 'Price must be greater than zero.';
      return;
    }

    const tk = TOKENS.find(t => t.sym === pumpCoin);
    const dateStr = new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});

    // What does it flip TODAY?
    const todayIdx = findRungIndex(coinPrice);
    const todayRung = (todayIdx >= 0 && LADDER[todayIdx] && LADDER[todayIdx].price <= coinPrice) ? LADDER[todayIdx] : null;

    // What would it flip at hypPrice?
    const hypIdx = findRungIndex(hypPrice);
    const hypRung = (hypIdx >= 0 && LADDER[hypIdx] && LADDER[hypIdx].price <= hypPrice) ? LADDER[hypIdx] : null;

    // Build the "at $X" hero line
    const hypPriceStr = fmtPrice(hypPrice);

    // Multiple descriptor for the header
    let multLabel = '';
    if (parsed.mode === 'multiple') {
      const mStr = parsed.value >= 1000 ? Math.round(parsed.value).toLocaleString() : (Number.isInteger(parsed.value) ? parsed.value : parseFloat(parsed.value.toFixed(2)));
      multLabel = `${mStr}×`;
    }

    // Dream object block
    let dreamHtml = '';
    if (hypIdx === 0 || (hypRung && hypIdx === 0)) {
      // Top of ladder / clears entire ladder
      dreamHtml = `
        <div class="pump-dream-obj pump-dream-obj-top">
          <div class="pump-flips-lbl">FLIPS</div>
          <div class="pump-dream-name">the entire ladder.</div>
          <div class="pump-dream-sub">Nothing left to buy.</div>
        </div>`;
    } else if (!hypRung) {
      // Below ladder
      dreamHtml = `
        <div class="pump-dream-obj pump-dream-obj-none">
          <div class="pump-flips-lbl">FLIPS</div>
          <div class="pump-dream-name pump-dream-none">nothing on the ladder yet.</div>
          <div class="pump-dream-sub">Needs more pump.</div>
        </div>`;
    } else {
      dreamHtml = `
        <div class="pump-dream-obj">
          <div class="pump-flips-lbl">FLIPS</div>
          <div class="pump-dream-name">${pumpTrunc(hypRung.name, 52)}</div>
          <div class="pump-dream-price">${fmtItemPrice(hypRung.price)}</div>
        </div>`;
    }

    // Grounding line — what it flips today
    let groundHtml = '';
    if (!todayRung) {
      groundHtml = `<div class="pump-ground">Today: ${fmtPrice(coinPrice)} · doesn't flip anything yet</div>`;
    } else {
      groundHtml = `<div class="pump-ground">Today: ${fmtPrice(coinPrice)} · flips ${pumpTrunc(todayRung.name, 36)}</div>`;
    }

    // Observational footer line — strictly conditional, no prediction
    const disclaimerLines = [
      'Math, not a promise.',
      'Hypothetical. The coin decides.',
      'At $X. Not a prediction.',
      'If the math works out.',
    ];
    const disclaim = disclaimerLines[Math.floor(Math.random() * disclaimerLines.length)];

     card.innerHTML = `
      <div class="pump-top">
        <div class="pump-header-row">
          <img class="pump-logo" src="${tk.logo}" alt="${tk.sym}"/>
          <div class="pump-coin-id">
            <div class="pump-coin-sym">${tk.sym}</div>
            <div class="pump-coin-name-sm">${pumpTrunc(tk.name, 18)}</div>
          </div>
          ${multLabel ? `<div class="pump-mult-badge">${multLabel}</div>` : ''}
        </div>
        <div class="pump-at-line">At&nbsp;<span class="pump-at-price">${hypPriceStr}</span></div>
        ${dreamHtml}
      </div>
      <div class="pump-bottom">
        <div class="pump-divider"></div>
        ${groundHtml}
        <div class="pump-disclaim">${disclaim}</div>
      </div>
      <div class="pump-stamp">
        <span class="pump-date">${dateStr}</span>
        <span class="pump-wm">wenflip.com</span>
      </div>
    `;

    placeholder.style.display = 'none';
    card.style.display = '';
    shareRow.style.display = '';

    // Reset share icon labels
    const icon = document.getElementById('pumpShareIcon');
    const txt = document.getElementById('pumpShareText');
    if (icon) icon.textContent = _isIOS ? '💾' : '📋';
    if (txt) txt.textContent = _isIOS ? 'Save image' : 'Copy as image';

    requestAnimationFrame(() => card.scrollIntoView({behavior:'smooth', block:'nearest'}));
  }

  // Wire quick-pick buttons
  document.getElementById('pumpQuickRow').addEventListener('click', function(e) {
    const btn = e.target.closest('.pump-quick-btn');
    if (!btn) return;
    const mult = btn.dataset.mult;
    pumpActiveQuick = mult;
    updatePumpQuickRow();
    document.getElementById('pumpInput').value = mult + 'x';
    document.getElementById('pumpInputHint').textContent = '';
    updatePumpResult();
  });

  // Wire free input — Go button and Enter key
  document.getElementById('pumpGoBtn').addEventListener('click', function() {
    pumpActiveQuick = null; updatePumpQuickRow(); updatePumpResult();
  });
  document.getElementById('pumpInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { pumpActiveQuick = null; updatePumpQuickRow(); updatePumpResult(); }
  });
  // Live-update as user types (debounced slightly so it doesn't thrash)
  (function() {
    let pumpDebounce = null;
    document.getElementById('pumpInput').addEventListener('input', function() {
      clearTimeout(pumpDebounce);
      pumpDebounce = setTimeout(() => { pumpActiveQuick = null; updatePumpQuickRow(); updatePumpResult(); }, 320);
    });
  })();

  async function pumpExport() {
    const btn=document.getElementById('pumpShareBtn'),icon=document.getElementById('pumpShareIcon'),txt=document.getElementById('pumpShareText');
    await exportCardAsImage(document.getElementById('pumpResultCard'),btn,icon,txt,_isIOS);
  }

  async function pumpShare() {
    const btn2=document.getElementById('pumpShareBtn2'),icon2=document.getElementById('pumpShareIcon2'),txt2=document.getElementById('pumpShareText2');
    btn2.disabled=true; icon2.textContent='⏳'; txt2.textContent='Preparing…';
    try {
      await loadHtml2Canvas();
      const cardEl=document.getElementById('pumpResultCard');
      const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
      const out=document.createElement('canvas'); out.width=1080; out.height=1080;
      const ctx=out.getContext('2d');
      const bg=ctx.createLinearGradient(0,0,0,1080); bg.addColorStop(0,'#0d0d1e'); bg.addColorStop(1,'#0a0a14'); ctx.fillStyle=bg; ctx.fillRect(0,0,1080,1080);
      const glow=ctx.createRadialGradient(540,150,0,540,150,640); glow.addColorStop(0,'rgba(46,224,106,0.10)'); glow.addColorStop(1,'transparent'); ctx.fillStyle=glow; ctx.fillRect(0,0,1080,1080);
      ctx.drawImage(srcCanvas,30,30,1020,1020);
      const canShareFiles = navigator.canShare && navigator.share;
      if (canShareFiles) {
        await new Promise((resolve, reject) => {
          out.toBlob(async blob => {
            try {
              const file = new File([blob], 'wenflip-pump.png', {type:'image/png'});
              const shareData = { files:[file], title:'Pump', text:'wenflip.com' };
              if (navigator.canShare(shareData)) { await navigator.share(shareData); resolve(); }
              else { reject(new Error('canShare false')); }
            } catch(e) { reject(e); }
          }, 'image/png');
        });
      } else { throw new Error('no share'); }
    } catch(err) {
      try {
        const cardEl=document.getElementById('pumpResultCard');
        const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
        const out2=document.createElement('canvas'); out2.width=1080; out2.height=1080;
        const ctx2=out2.getContext('2d');
        const bg2=ctx2.createLinearGradient(0,0,0,1080); bg2.addColorStop(0,'#0d0d1e'); bg2.addColorStop(1,'#0a0a14'); ctx2.fillStyle=bg2; ctx2.fillRect(0,0,1080,1080);
        const glow2=ctx2.createRadialGradient(540,150,0,540,150,640); glow2.addColorStop(0,'rgba(46,224,106,0.10)'); glow2.addColorStop(1,'transparent'); ctx2.fillStyle=glow2; ctx2.fillRect(0,0,1080,1080);
        ctx2.drawImage(srcCanvas,30,30,1020,1020);
        await new Promise((resolve, reject) => {
          out2.toBlob(async blob => {
            try {
              await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
              window.open('https://x.com/intent/post?text=' + encodeURIComponent('wenflip.com'), '_blank', 'noopener');
              showCalcToast('Image copied — paste it into your post 🔥');
              resolve();
            } catch(e2) {
              const link=document.createElement('a'); link.download='wenflip-pump.png'; link.href=URL.createObjectURL(blob); document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(link.href);
              window.open('https://x.com/intent/post?text=' + encodeURIComponent('wenflip.com'), '_blank', 'noopener');
              showCalcToast('Saved! Open X and attach the image. 🔥');
              resolve();
            }
          }, 'image/png');
        });
      } catch(e3) { console.error(e3); showCalcToast('Screenshot failed — try again 😬'); }
    } finally {
      btn2.disabled=false; icon2.textContent='𝕏'; txt2.textContent='Share';
    }
  }

  // ==== EMOTION DOORS — WIRING ====

  // Door 1: Dunk → existing Flippening modal
  document.getElementById('doorDunk').addEventListener('click', openFlippen);

  // Door 2: Pump → existing Pump modal
  document.getElementById('doorPump').addEventListener('click', openPump);

  // Door 3: Cope → new Cope modal
  document.getElementById('doorCope').addEventListener('click', openCope);

 

  // Door 5: Wonder → zero-input: open modal + immediately render a random coin
  document.getElementById('doorWonder').addEventListener('click', openWonder);

  // ==== COPE ====
  let _copeLastLine = null;

  function openCope() {
    renderCopeCoinList();
    document.getElementById('copeCardWrap').style.display = 'none';
    document.getElementById('copeLineDisplay').textContent = '';
    document.getElementById('copeModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCope() {
    document.getElementById('copeModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderCopeCoinList() {
    const wrap = document.getElementById('copeCoinList');
    wrap.innerHTML = TOKENS.map(t => {
      const s = state.find(x => x.sym === t.sym);
      const loading = !s || s.price == null;
      return `<button class="sc-coin-row${loading ? ' loading' : ''}" data-sym="${t.sym}">
        <span class="sc-coin-logo-wrap"><img src="${t.logo}" alt="${t.sym}"/></span>
        <span class="sc-coin-name">${t.name}</span>
        <span class="sc-coin-sym-tag">${t.sym}</span>
      </button>`;
    }).join('');
    wrap.querySelectorAll('.sc-coin-row:not(.loading)').forEach(btn => {
      btn.addEventListener('click', () => renderCopeCard(btn.dataset.sym));
    });
  }

  function pickCopeLine() {
    // No immediate repeat: filter out the last line, then pick randomly
    const pool = COPE_LINES.filter(l => l !== _copeLastLine);
    const line = pool[Math.floor(Math.random() * pool.length)];
    _copeLastLine = line;
    return line;
  }

  function renderCopeCard(sym) {
    const s = state.find(x => x.sym === sym);
    const tk = TOKENS.find(t => t.sym === sym);
    if (!s || !s.price || !tk) return;

    const copeLine = pickCopeLine();

    const coinPrice = s.price;
    const chg = s.chg || 0;
    const chgSign = chg >= 0 ? '▲' : '▼';
    const chgCls = chg >= 0 ? 'sc-up' : 'sc-down';
    const dateStr = new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});

    const clearedIdx = findRungIndex(coinPrice);
    const clearedRung = LADDER[clearedIdx];
    const nextRung = LADDER[clearedIdx - 1];

    let zone3Html = '', zone4Html = '', hasDivider4 = false;

    if (clearedIdx === 0 || !nextRung) {
      zone3Html = `<div class="sc-zone sc-zone-top-msg">
        <div class="sc-top-msg-line">There is nothing left to flip.</div>
        <div class="sc-top-msg-sub">It has cleared the entire ladder.</div>
      </div>`;
    } else if (clearedIdx === LADDER.length - 1 && coinPrice < LADDER[clearedIdx].price) {
      const firstRung = LADDER[LADDER.length - 1];
      const pctRaw = Math.min(99, Math.round((coinPrice / firstRung.price) * 100));
      const dollarGap = firstRung.price - coinPrice;
      zone3Html = `<div class="sc-zone"><div class="sc-label">STATUS: not on the board yet</div></div>`;
      zone4Html = `<div class="sc-zone">
        <div class="sc-vector-line">${pctRaw}% of the way to <span class="sc-item-name">${firstRung.name}</span> <span class="sc-item-price">${fmtItemPrice(firstRung.price)}</span></div>
        <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pctRaw)}%"></div></div>
        <div class="sc-gap-line">${getGapLine(pctRaw, dollarGap)}</div>
      </div>`;
      hasDivider4 = true;
    } else {
      const pctRaw = flipProgressPct(coinPrice, clearedRung, nextRung);
      const dollarGap = nextRung.price - coinPrice;
      zone3Html = `<div class="sc-zone">
        <div class="sc-label">STATUS: FLIPPED</div>
        <div class="sc-cleared-name">${clearedRung.name}</div>
        <div class="sc-cleared-price">${fmtItemPrice(clearedRung.price)}</div>
      </div>`;
      zone4Html = `<div class="sc-zone">
        <div class="sc-vector-line">${pctRaw}% of the way to <span class="sc-item-name">${nextRung.name}</span> <span class="sc-item-price">${fmtItemPrice(nextRung.price)}</span></div>
        <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pctRaw)}%"></div></div>
        <div class="sc-gap-line">${getGapLine(pctRaw, dollarGap)}</div>
      </div>`;
      hasDivider4 = true;
    }

    document.getElementById('copeResultCard').innerHTML = `
      <div class="sc-zone sc-zone-identity">
        <div class="sc-id-row">
          <img class="sc-logo" src="${tk.logo}" alt="${sym}"/>
          <span class="sc-coin-fullname">${tk.name}</span>
        </div>
        <div class="sc-price-row">
          <span class="sc-live-price">${fmtPrice(coinPrice)}</span>
          <span class="sc-chg ${chgCls}">${chgSign} ${Math.abs(chg).toFixed(2)}% (24h)</span>
        </div>
      </div>
      <div class="sc-divider"></div>
      ${zone3Html}
      <div class="sc-divider"></div>
      ${zone4Html}
      ${hasDivider4 ? '<div class="sc-divider"></div>' : ''}
      <div class="cope-card-line">${copeLine}</div>
      <div class="sc-stamp">
        <span class="sc-date">${dateStr}</span>
        <span class="sc-wm">wenflip.com</span>
      </div>
    `;

    document.getElementById('copeLineDisplay').textContent = copeLine;

    const wrap = document.getElementById('copeCardWrap');
    wrap.style.display = '';
    const icon = document.getElementById('copeShareIcon');
    const txt = document.getElementById('copeShareText');
    if (icon) icon.textContent = _isIOS ? '💾' : '📋';
    if (txt) txt.textContent = _isIOS ? 'Save image' : 'Copy as image';
    requestAnimationFrame(() => wrap.scrollIntoView({behavior:'smooth', block:'nearest'}));
  }

  async function copeExport() {
    const btn=document.getElementById('copeShareBtn'),icon=document.getElementById('copeShareIcon'),txt=document.getElementById('copeShareText');
    await exportCardAsImage(document.getElementById('copeResultCard'),btn,icon,txt,_isIOS);
  }
  async function copeShare() {
    const btn2=document.getElementById('copeShareBtn2'),icon2=document.getElementById('copeShareIcon2'),txt2=document.getElementById('copeShareText2');
    await _shareCardFile(document.getElementById('copeResultCard'),'wenflip-cope.png',btn2,icon2,txt2);
  }

  // ==== OUTRAGE ====

  function openOutrage() {
    renderOutrageItemList();
    document.getElementById('outrageCardWrap').style.display = 'none';
    document.getElementById('outrageModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeOutrage() {
    document.getElementById('outrageModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderOutrageItemList() {
    const wrap = document.getElementById('outrageItemList');
    wrap.innerHTML = OUTRAGE_ITEMS.map(itemName => {
      const ladderEntry = LADDER.find(r => r.name === itemName);
      if (!ladderEntry) return ''; // safety — should never happen given verbatim match
      return `<button class="outrage-item-row" data-name="${itemName.replace(/"/g,'&quot;')}">
        <span class="outrage-item-name">${itemName}</span>
        <span class="outrage-item-price">${fmtItemPrice(ladderEntry.price)}</span>
      </button>`;
    }).join('');
    wrap.querySelectorAll('.outrage-item-row').forEach(btn => {
      btn.addEventListener('click', () => renderOutrageCard(btn.dataset.name));
    });
  }

  function renderOutrageCard(itemName) {
    const ladderEntry = LADDER.find(r => r.name === itemName);
    if (!ladderEntry) return;

    const objPrice = ladderEntry.price;
    const dateStr = new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});

    // Cheapest coin that still clears the object — maximum "even THIS coin flips your X" effect.
    // If none clear it, show the highest-priced coin with the gap.
    const readyCoins = state.filter(s => s.price != null);
    const clearingCoins = readyCoins.filter(s => s.price >= objPrice);
    const showGap = clearingCoins.length === 0;

    let chosenState;
    if (!showGap) {
      chosenState = clearingCoins.reduce((a, b) => a.price < b.price ? a : b);
    } else {
      chosenState = readyCoins.reduce((a, b) => (a.price > b.price ? a : b));
    }

    const tk = TOKENS.find(t => t.sym === chosenState.sym);
    const coinPrice = chosenState.price;

    let zone3Html, zone4Html = '', hasDivider4 = false;

    zone3Html = `<div class="sc-zone">
      <div class="sc-label outrage-lead-lbl">CRYPTO FLIPPED THIS</div>
      <div class="sc-cleared-name">${itemName}</div>
      <div class="sc-cleared-price">${fmtItemPrice(objPrice)}</div>
    </div>`;

    if (!showGap) {
      const idxAbove = findRungIndex(coinPrice);
      const clearedRung = LADDER[idxAbove];
      const nextRung = LADDER[idxAbove - 1];
      const pctRaw = flipProgressPct(coinPrice, clearedRung, nextRung);
      zone4Html = `<div class="sc-zone">
        <div class="sc-label">COIN THAT FLIPS IT</div>
        <div class="sc-id-row" style="margin-bottom:4px;">
          <img class="sc-logo" src="${tk.logo}" alt="${chosenState.sym}"/>
          <span class="sc-coin-fullname">${tk.name}</span>
          <span class="sc-chg" style="font-size:12px;margin-left:8px;">${fmtPrice(coinPrice)}</span>
        </div>
        ${nextRung ? `<div class="sc-vector-line" style="margin-top:4px;">${pctRaw}% to <span class="sc-item-name">${nextRung.name}</span></div>
        <div class="sc-bar-track" style="margin-top:4px;"><div class="sc-bar-fill" style="width:${Math.max(1,pctRaw)}%"></div></div>` : ''}
      </div>`;
      hasDivider4 = true;
    } else {
      const pctRaw = Math.min(99, Math.round((coinPrice / objPrice) * 100));
      const dollarGap = objPrice - coinPrice;
      zone4Html = `<div class="sc-zone">
        <div class="sc-label">CLOSEST COIN</div>
        <div class="sc-id-row" style="margin-bottom:4px;">
          <img class="sc-logo" src="${tk.logo}" alt="${chosenState.sym}"/>
          <span class="sc-coin-fullname">${tk.name}</span>
          <span class="sc-chg" style="font-size:12px;margin-left:8px;">${fmtPrice(coinPrice)}</span>
        </div>
        <div class="sc-vector-line" style="margin-top:4px;">${pctRaw}% of the way there</div>
        <div class="sc-bar-track" style="margin-top:4px;"><div class="sc-bar-fill" style="width:${Math.max(1,pctRaw)}%"></div></div>
        <div class="sc-gap-line">${fmtItemPrice(dollarGap)} to go.</div>
      </div>`;
      hasDivider4 = true;
    }

    document.getElementById('outrageResultCard').innerHTML = `
      <div class="sc-zone sc-zone-identity" style="padding-bottom:8px;">
        <div class="sc-price-row" style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);font-weight:800;margin-bottom:2px;">What did crypto flip?</div>
      </div>
      <div class="sc-divider"></div>
      ${zone3Html}
      <div class="sc-divider"></div>
      ${zone4Html}
      ${hasDivider4 ? '<div class="sc-divider"></div>' : ''}
      <div class="sc-stamp">
        <span class="sc-date">${dateStr}</span>
        <span class="sc-wm">wenflip.com</span>
      </div>
    `;

    const wrap = document.getElementById('outrageCardWrap');
    wrap.style.display = '';
    const icon = document.getElementById('outrageShareIcon');
    const txt = document.getElementById('outrageShareText');
    if (icon) icon.textContent = _isIOS ? '💾' : '📋';
    if (txt) txt.textContent = _isIOS ? 'Save image' : 'Copy as image';
    requestAnimationFrame(() => wrap.scrollIntoView({behavior:'smooth', block:'nearest'}));
  }

  async function outrageExport() {
    const btn=document.getElementById('outrageShareBtn'),icon=document.getElementById('outrageShareIcon'),txt=document.getElementById('outrageShareText');
    await exportCardAsImage(document.getElementById('outrageResultCard'),btn,icon,txt,_isIOS);
  }
  async function outrageShare() {
    const btn2=document.getElementById('outrageShareBtn2'),icon2=document.getElementById('outrageShareIcon2'),txt2=document.getElementById('outrageShareText2');
    await _shareCardFile(document.getElementById('outrageResultCard'),'wenflip-outrage.png',btn2,icon2,txt2);
  }

  // ==== WONDER ====

  let _wonderLastSym = null;

  function openWonder() {
    document.getElementById('wonderModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    wonderReroll();
  }
  function closeWonder() {
    document.getElementById('wonderModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function wonderReroll() {
    const ready = state.filter(s => s.price != null);
    if (!ready.length) return;
    const pool = ready.length > 1 ? ready.filter(s => s.sym !== _wonderLastSym) : ready;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    _wonderLastSym = picked.sym;
    renderWonderCard(picked.sym);
  }

  function renderWonderCard(sym) {
    const s = state.find(x => x.sym === sym);
    const tk = TOKENS.find(t => t.sym === sym);
    if (!s || !s.price || !tk) return;

    const coinPrice = s.price;
    const chg = s.chg || 0;
    const chgSign = chg >= 0 ? '▲' : '▼';
    const chgCls = chg >= 0 ? 'sc-up' : 'sc-down';
    const dateStr = new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});

    const clearedIdx = findRungIndex(coinPrice);
    const clearedRung = LADDER[clearedIdx];
    const nextRung = LADDER[clearedIdx - 1];

    let zone3Html = '', zone4Html = '', hasDivider4 = false;

    if (clearedIdx === 0 || !nextRung) {
      zone3Html = `<div class="sc-zone sc-zone-top-msg">
        <div class="sc-top-msg-line">There is nothing left to flip.</div>
        <div class="sc-top-msg-sub">It has cleared the entire ladder.</div>
      </div>`;
    } else if (clearedIdx === LADDER.length - 1 && coinPrice < LADDER[clearedIdx].price) {
      const firstRung = LADDER[LADDER.length - 1];
      const pctRaw = Math.min(99, Math.round((coinPrice / firstRung.price) * 100));
      const dollarGap = firstRung.price - coinPrice;
      zone3Html = `<div class="sc-zone"><div class="sc-label">STATUS: not on the board yet</div></div>`;
      zone4Html = `<div class="sc-zone">
        <div class="sc-vector-line">${pctRaw}% of the way to <span class="sc-item-name">${firstRung.name}</span> <span class="sc-item-price">${fmtItemPrice(firstRung.price)}</span></div>
        <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pctRaw)}%"></div></div>
        <div class="sc-gap-line">${getGapLine(pctRaw, dollarGap)}</div>
      </div>`;
      hasDivider4 = true;
    } else {
      const pctRaw = flipProgressPct(coinPrice, clearedRung, nextRung);
      const dollarGap = nextRung.price - coinPrice;
      zone3Html = `<div class="sc-zone">
        <div class="sc-label">STATUS: FLIPPED</div>
        <div class="sc-cleared-name">${clearedRung.name}</div>
        <div class="sc-cleared-price">${fmtItemPrice(clearedRung.price)}</div>
      </div>`;
      zone4Html = `<div class="sc-zone">
        <div class="sc-vector-line">${pctRaw}% of the way to <span class="sc-item-name">${nextRung.name}</span> <span class="sc-item-price">${fmtItemPrice(nextRung.price)}</span></div>
        <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pctRaw)}%"></div></div>
        <div class="sc-gap-line">${getGapLine(pctRaw, dollarGap)}</div>
      </div>`;
      hasDivider4 = true;
    }

    document.getElementById('wonderResultCard').innerHTML = `
      <div class="sc-zone sc-zone-identity">
        <div class="sc-id-row">
          <img class="sc-logo" src="${tk.logo}" alt="${sym}"/>
          <span class="sc-coin-fullname">${tk.name}</span>
        </div>
        <div class="sc-price-row">
          <span class="sc-live-price">${fmtPrice(coinPrice)}</span>
          <span class="sc-chg ${chgCls}">${chgSign} ${Math.abs(chg).toFixed(2)}% (24h)</span>
        </div>
      </div>
      <div class="sc-divider"></div>
      ${zone3Html}
      <div class="sc-divider"></div>
      ${zone4Html}
      ${hasDivider4 ? '<div class="sc-divider"></div>' : ''}
      <div class="sc-stamp">
        <span class="sc-date">${dateStr}</span>
        <span class="sc-wm">wenflip.com</span>
      </div>
    `;

    const icon = document.getElementById('wonderShareIcon');
    const txt = document.getElementById('wonderShareText');
    if (icon) icon.textContent = _isIOS ? '💾' : '📋';
    if (txt) txt.textContent = _isIOS ? 'Save image' : 'Copy as image';
  }

  async function wonderExport() {
    const btn=document.getElementById('wonderShareBtn'),icon=document.getElementById('wonderShareIcon'),txt=document.getElementById('wonderShareText');
    await exportCardAsImage(document.getElementById('wonderResultCard'),btn,icon,txt,_isIOS);
  }
  async function wonderShare() {
    const btn2=document.getElementById('wonderShareBtn2'),icon2=document.getElementById('wonderShareIcon2'),txt2=document.getElementById('wonderShareText2');
    await _shareCardFile(document.getElementById('wonderResultCard'),'wenflip-wonder.png',btn2,icon2,txt2);
  }

  // ==== SHARED NATIVE SHARE HELPER ====
  // Reuses exportCardAsImage pipeline for the canvas; same navigator.share + clipboard fallback.
  async function _shareCardFile(cardEl, filename, btn2, icon2, txt2) {
    btn2.disabled=true; icon2.textContent='⏳'; txt2.textContent='Preparing…';
    try {
      await loadHtml2Canvas();
      const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
      const out=document.createElement('canvas'); out.width=1080; out.height=1080;
      const ctx=out.getContext('2d');
      const bg=ctx.createLinearGradient(0,0,0,1080); bg.addColorStop(0,'#0d0d1e'); bg.addColorStop(1,'#0a0a14'); ctx.fillStyle=bg; ctx.fillRect(0,0,1080,1080);
      const glow=ctx.createRadialGradient(540,150,0,540,150,640); glow.addColorStop(0,'rgba(46,224,106,0.10)'); glow.addColorStop(1,'transparent'); ctx.fillStyle=glow; ctx.fillRect(0,0,1080,1080);
      ctx.drawImage(srcCanvas,30,30,1020,1020);
      const canShareFiles = navigator.canShare && navigator.share;
      if (canShareFiles) {
        await new Promise((resolve, reject) => {
          out.toBlob(async blob => {
            try {
              const file = new File([blob], filename, {type:'image/png'});
              const shareData = { files:[file], title:'WenFlip', text:'wenflip.com' };
              if (navigator.canShare(shareData)) { await navigator.share(shareData); resolve(); }
              else { reject(new Error('canShare false')); }
            } catch(e) { reject(e); }
          }, 'image/png');
        });
      } else { throw new Error('no share'); }
    } catch(err) {
      try {
        const srcCanvas2=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
        const out2=document.createElement('canvas'); out2.width=1080; out2.height=1080;
        const ctx2=out2.getContext('2d');
        const bg2=ctx2.createLinearGradient(0,0,0,1080); bg2.addColorStop(0,'#0d0d1e'); bg2.addColorStop(1,'#0a0a14'); ctx2.fillStyle=bg2; ctx2.fillRect(0,0,1080,1080);
        const glow2=ctx2.createRadialGradient(540,150,0,540,150,640); glow2.addColorStop(0,'rgba(46,224,106,0.10)'); glow2.addColorStop(1,'transparent'); ctx2.fillStyle=glow2; ctx2.fillRect(0,0,1080,1080);
        ctx2.drawImage(srcCanvas2,30,30,1020,1020);
        await new Promise((resolve, reject) => {
          out2.toBlob(async blob => {
            try {
              await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
              window.open('https://x.com/intent/post?text='+encodeURIComponent('wenflip.com'),'_blank','noopener');
              showCalcToast('Image copied — paste it into your post 🔥'); resolve();
            } catch(e2) {
              const link=document.createElement('a'); link.download=filename; link.href=URL.createObjectURL(blob); document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(link.href);
              window.open('https://x.com/intent/post?text='+encodeURIComponent('wenflip.com'),'_blank','noopener');
              showCalcToast('Saved! Open X and attach the image. 🔥'); resolve();
            }
          }, 'image/png');
        });
      } catch(e3) { console.error(e3); showCalcToast('Screenshot failed — try again 😬'); }
    } finally {
      btn2.disabled=false; icon2.textContent='𝕏'; txt2.textContent='Share';
    }
  }

  // Patch Escape key to close all modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeStatusCheckModal(); closeFlippen(); closePump();
      closeCope(); closeOutrage(); closeWonder();
    }
  }, true);

  // ==== HERO FLIP GRID ====
  // 6 core coins, each showing what it flips at the active multiplier.
  // Click a box → opens the existing Pump modal pre-loaded to that coin + multiplier.
  const HERO_COINS = ['PLS','PLSX','INC','HEX','eHEX','PRVX','pDAI','pWBTC','DWB'];  let heroMult = 2;               // default: 2× (Today = 1×)
  let _heroLastSig = '';          // change-guard so the interval doesn't reset hover/focus

  // Coin price × multiplier → ladder item name (or null if below the board).
  function heroFlipItem(coinPrice, mult) {
    const hyp = coinPrice * mult;
    const idx = findRungIndex(hyp);
    const rung = (idx >= 0 && LADDER[idx] && LADDER[idx].price <= hyp) ? LADDER[idx] : null;
    return rung ? rung.name : null;
  }

  function renderHeroGrid() {
    const el = document.getElementById('heroGrid');
    if (!el) return;

    // Only rebuild the DOM if the rendered content would actually change.
    const sig = heroMult + '|' + HERO_COINS.map(sym => {
      const s = state.find(x => x.sym === sym);
      if (!s || s.price == null) return sym + ':loading';
      return sym + ':' + (heroFlipItem(s.price, heroMult) || 'none') + ':' + (s.chg || 0).toFixed(2);
    }).join('|');
    if (sig === _heroLastSig) return;
    _heroLastSig = sig;

       el.innerHTML = HERO_COINS.map(sym => {
      const tk = TOKENS.find(t => t.sym === sym);
      const s  = state.find(x => x.sym === sym);
      if (!tk) return '';
      const loading = !s || s.price == null;

      if (loading) {
        // No % shown while loading — chg is 0 until real data lands; showing it would mislead.
        return `<div class="hero-box loading" data-sym="${sym}">
          <div class="hero-box-head">
            <img class="hero-box-logo" src="${tk.logo}" alt="${sym}"/>
            <span class="hero-box-sym">${sym}</span>
          </div>
          <div class="hero-box-flips-lbl">flips</div>
          <div class="hero-box-item none">loading…</div>
        </div>`;
      }

      // 24h change — green up / red down, arrow, no "(24h)" label. Reuses live state.chg.
      const chg = s.chg || 0;
      const chgCls = chg >= 0 ? 'hero-box-chg up' : 'hero-box-chg down';
      const chgArrow = chg >= 0 ? '▲' : '▼';
      const chgHtml = `<span class="${chgCls}">${chgArrow} ${Math.abs(chg).toFixed(2)}%</span>`;

      const itemName = heroFlipItem(s.price, heroMult);
      const multLine = heroMult > 1 ? `<div class="hero-box-mult">at a ${heroMult}×</div>` : '';
      const itemHtml = itemName
        ? `<div class="hero-box-item">${itemName}</div>`
        : `<div class="hero-box-item none">nothing yet</div>`;

      return `<div class="hero-box" data-sym="${sym}" role="button" tabindex="0" aria-label="Open ${sym} in Pump">
        <div class="hero-box-head">
          <img class="hero-box-logo" src="${tk.logo}" alt="${sym}"/>
          <span class="hero-box-sym">${sym}</span>
          ${chgHtml}
        </div>
        ${multLine}
        <div class="hero-box-flips-lbl">flips</div>
        ${itemHtml}
      </div>`;
    }).join('');
    
    el.querySelectorAll('.hero-box:not(.loading)').forEach(box => {
      const sym = box.getAttribute('data-sym');
      box.addEventListener('click', () => openHeroPump(sym, heroMult));
      box.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openHeroPump(sym, heroMult); }
      });
    });
  }

  // Open the existing Pump modal, pre-loaded to a coin at the given multiplier.
  function openHeroPump(sym, mult) {
    openPump();                         // reset + open (defined in the PUMP MODAL section above)
    pumpCoin = sym;
    renderPumpCoinBadges();             // reflect the pre-selected coin
    const multStr = String(mult);
    const input = document.getElementById('pumpInput');
    if (input) input.value = multStr + 'x';
    // Highlight a matching quick-pick if one exists (2/5/10/100); Today (1×) has none.
    pumpActiveQuick = document.querySelector('.pump-quick-btn[data-mult="' + multStr + '"]') ? multStr : null;
    updatePumpQuickRow();
    updatePumpResult();
  }

  // Toggle wiring — Today / 2× / 5× / 10×
  (function wireHeroMult() {
    const wrap = document.getElementById('heroMult');
    if (!wrap) return;
    wrap.addEventListener('click', e => {
      const btn = e.target.closest('.hero-mult-btn');
      if (!btn) return;
      const m = parseFloat(btn.getAttribute('data-mult'));
      if (!isFinite(m) || m === heroMult) return;
      heroMult = m;
      wrap.querySelectorAll('.hero-mult-btn').forEach(b => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderHeroGrid();
    });
  })();

  renderHeroGrid();                     // initial paint (loading until first prices land)
  setInterval(renderHeroGrid, 4000);    // fills in + stays live; no-op when nothing changed

  // ==== JUST FLIPPED FEED ====
  // Live feed of recent upward flips. Fully self-contained: own fetch + 60s poll,
  // client-side relative timestamps, graceful logo fallback. Fails silently — it must
  // never throw into the page or leave a broken layout if the endpoint hiccups.
  (function initJustFlipped(){
    const FEED_URL = 'https://wenflip-bot-worker.wenflip-ops.workers.dev/api/recent-flips?dir=up';
    const MAX_ROWS = 10;
    const feedEl = document.getElementById('jfFeed');
    if (!feedEl) return; // markup missing — nothing to do

    let latestFlips = [];    // last good payload, capped to MAX_ROWS
    let hasLoaded   = false;  // first fetch (success or fail) has resolved

    // Resolve a logo by symbol against the existing TOKENS table (same source the
    // ticker/ladder use). Case-insensitive. Falls back to the neutral lettered
    // circle used elsewhere on the site — never a broken image.
    function logoForSym(sym) {
      const key = String(sym || '').toLowerCase();
      const tk = TOKENS.find(t => t.sym.toLowerCase() === key);
      return tk ? tk.logo : caFallbackLogo(sym);
    }

    // Minimal HTML-escape for endpoint-supplied text (item / kicker / sym).
    function jfEsc(str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Relative timestamp from a ms epoch: "just now", "3m ago", "2h ago", "1d ago".
    function relTime(ts) {
      const diff = Date.now() - Number(ts);
      if (!isFinite(diff) || diff < 0) return 'just now';
      const s = Math.floor(diff / 1000);
      if (s < 45) return 'just now';
      const m = Math.floor(s / 60);
      if (m < 60) return m + 'm ago';
      const h = Math.floor(m / 60);
      if (h < 24) return h + 'h ago';
      return Math.floor(h / 24) + 'd ago';
    }

    function rowHtml(f) {
      const sym  = jfEsc(f.sym);
      const item = jfEsc(f.item);
      const star = f.featured ? '⭐ ' : '';
      const primaryLogo  = jfEsc(logoForSym(f.sym));
      const fallbackLogo = caFallbackLogo(f.sym); // data-URI: encodeURIComponent output is quote-safe
      return `
        <div class="jf-row">
          <div class="jf-logo"><img src="${primaryLogo}" alt="${sym}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackLogo}'"/></div>
          <div class="jf-body">
            <div class="jf-headline"><span class="jf-sym">${sym}</span> flipped ${star}${item}</div>
            <div class="jf-kicker">${jfEsc(f.kicker)}</div>
          </div>
          <div class="jf-time" data-ts="${Number(f.ts) || 0}">${relTime(f.ts)}</div>
        </div>`;
    }

    function render() {
      if (!hasLoaded) {
        feedEl.innerHTML = '<div class="jf-loading"><span class="skel-dot"></span><span>Loading flips…</span></div>';
        return;
      }
      if (!latestFlips.length) {
        feedEl.innerHTML = '<div class="jf-empty">No flips yet — check back soon.</div>';
        return;
      }
      feedEl.innerHTML = latestFlips.map(rowHtml).join('');
    }

    // Re-age the relative-time labels in place between polls, so "2m ago" stays honest.
    function tickTimes() {
      feedEl.querySelectorAll('.jf-time[data-ts]').forEach(el => {
        const ts = Number(el.getAttribute('data-ts'));
        if (ts) el.textContent = relTime(ts);
      });
    }

    async function refreshFeed() {
      try {
        const res = await fetch(FEED_URL);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const json = await res.json();
        if (!json || json.ok === false || !Array.isArray(json.flips)) throw new Error('bad payload');
        latestFlips = json.flips.slice(0, MAX_ROWS);
        hasLoaded = true;
        render();
      } catch (e) {
        console.warn('just-flipped feed failed', e);
        // Fail silently. Keep showing prior good data if we have it; otherwise fall
        // back to the quiet empty line rather than a broken box or a JS error.
        if (!hasLoaded) { hasLoaded = true; latestFlips = []; render(); }
      }
    }

    render();                          // initial loading state
    refreshFeed();                     // first fetch on load
    setInterval(refreshFeed, 60_000);  // poll, matching the price-ticker cadence
    setInterval(tickTimes, 30_000);    // age timestamps between polls
  })();
