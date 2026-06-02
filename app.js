  // ==== TOKEN CONFIG ====
  const TOKENS = [
    { sym: 'BTC',   name: 'Bitcoin',   chain: 'major',      pairAddress: '0x4585fe77225b41b697c938b018e2ac67ac5a20c0', dexChain: 'ethereum',   logo: './logos/BTC_logo.png'    },
    { sym: 'ETH',   name: 'Ethereum',  chain: 'major',      pairAddress: '0x531febfeb9a61d948c384acfbe6dcc51057aea7e', dexChain: 'bsc',        logo: './logos/ETH_logo.png'    },
    { sym: 'SOL',   name: 'Solana',    chain: 'major',      pairAddress: '0xbffec96e8f3b5058b1817c14e4380758fada01ef', dexChain: 'bsc',        logo: './logos/SOL_logo.png'    },
    { sym: 'BNB',   name: 'BNB',       chain: 'major',      pairAddress: '0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae', dexChain: 'bsc',        logo: './logos/BNB_logo.png'    },
    { sym: 'XRP',   name: 'XRP',       chain: 'major',      pairAddress: '0xb90fe999be6869af0afc557dccfbe169ea3403d6', dexChain: 'base',       logo: './logos/XRP_logo.png'    },
    { sym: 'DOGE',  name: 'Dogecoin',  chain: 'major',      pairAddress: '0x353d328efbef48b79a570cbc2fde20f40e9f2063', dexChain: 'bsc',        logo: './logos/DOGE_logo.png'   },
    { sym: 'pWBTC', name: 'pWBTC',     chain: 'pulsechain', pairAddress: '0x46E27Ea3A035FfC9e6d6D56702CE3D208FF1e58c', dexChain: 'pulsechain', logo: './logos/pwBTC_Logo.png',  identity: 'Bargain-bin Bitcoin copy. Way below the real thing.'         },
    { sym: 'INC',   name: 'Incentive', chain: 'pulsechain', pairAddress: '0xf808bb6265e9ca27002c0a04562bf50d4fe37eaa', dexChain: 'pulsechain', logo: './logos/INC_logo.png',    identity: 'Earned for providing liquidity on PulseX.'                   },
    { sym: 'pDAI',  name: 'pDAI',      chain: 'pulsechain', pairAddress: '0xfc64556faa683e6087f425819c7ca3c558e13ac1', dexChain: 'pulsechain', logo: './logos/pDAI_logo.png',   identity: 'An unbacked copy of DAI. Betting it reaches $1.'             },
    { sym: 'HEX',   name: 'HEX',       chain: 'pulsechain', pairAddress: '0xf1f4ee610b2babb05c635f726ef8b0c568c8dc65', dexChain: 'pulsechain', logo: './logos/HEX_Logo.png',    identity: 'Lock it up, earn back more HEX.'                            },
    { sym: 'PLSX',  name: 'PulseX',    chain: 'pulsechain', pairAddress: '0x1b45b9148791d3a104184cd5dfe5ce57193a3ee9', dexChain: 'pulsechain', logo: './logos/PulseX_logo.png', identity: "PulseChain's main exchange. Its Uniswap."                    },
    { sym: 'PLS',   name: 'Pulse',     chain: 'pulsechain', pairAddress: '0xe56043671df55de5cdf8459710433c10324de0ae', dexChain: 'pulsechain', logo: './logos/PLS_Logo.png',    identity: "PulseChain's native coin. Cheaper, faster Ethereum."         },
    { sym: 'PRVX',  name: 'PRVX',      chain: 'pulsechain', pairAddress: '0x7f681a5ad615238357ba148c281e2eaefd2de55a', dexChain: 'pulsechain', logo: './logos/PRVX_logo.png',   identity: 'A long-shot bet on killing centralized exchanges.'           },
  ];
  const state = TOKENS.map(t => ({ ...t, price: null, chg: 0, status: 'pending', error: null }));

  // ==== LADDER ====
  const LADDER = [
    { price: 390000, name: "Rolls Royce Ghost (fully optioned)", tier: "heavyweight", category: "status" },
    { price: 380000, name: "Thoroughbred racehorse (Keeneland average yearling)", tier: "heavyweight", category: "status" },
    { price: 350000, name: "Rolls Royce Ghost (base, new)", tier: "heavyweight", category: "status" },
    { price: 315000, name: "Cost of raising one child to age 18 (USDA estimate)", tier: "heavyweight", category: "extraction" },
    { price: 300000, name: "Used Cessna Citation (entry-level private jet)", tier: "heavyweight", category: "status" },
    { price: 280000, name: "One year of 24/7 personal security detail", tier: "heavyweight", category: "status" },
    { price: 258000, name: "Lamborghini Urus (base, new)", tier: "heavyweight", category: "status" },
    { price: 240000, name: "Lamborghini Huracán (entry, new)", tier: "heavyweight", category: "status" },
    { price: 220000, name: "Ferrari Roma (base, new)", tier: "heavyweight", category: "status" },
    { price: 180000, name: "Gold-plated bathtub (bespoke commission)", tier: "heavyweight", category: "status" },
    { price: 170000, name: "A forgettable abstract painting at Christie\'s", tier: "heavyweight", category: "status" },
    { price: 160000, name: "One year at Phillips Exeter Academy (boarding)", tier: "heavyweight", category: "status" },
    { price: 150000, name: "Full Beverly Hills plastic surgery makeover", tier: "heavyweight", category: "status" },
    { price: 140000, name: "One year of luxury nursing home (private room)", tier: "heavyweight", category: "status" },
    { price: 130000, name: "Full gestational surrogacy in the USA", tier: "heavyweight", category: "extraction" },
    { price: 120000, name: "One year of live-in nanny (NYC)", tier: "heavyweight", category: "extraction" },
    { price: 115000, name: "Porsche 911 Carrera (base, new)", tier: "heavyweight", category: "status" },
    { price: 110000, name: "Gold toilet (18-karat, functional)", tier: "heavyweight", category: "status" },
    { price: 90000, name: "Full-mouth dental implants (all teeth)", tier: "heavyweight", category: "extraction" },
    { price: 87000, name: "One year at Harvard (full cost of attendance)", tier: "heavyweight", category: "status", featured: true },
    { price: 75000, name: "One full luxury kitchen remodel (high-end suburban)", tier: "heavyweight", category: "status" },
    { price: 60000, name: "Down payment on a house", tier: "heavyweight", category: "extraction" },
    { price: 52000, name: "Used Porsche 911 (decent year)", tier: "heavyweight", category: "status" },
    { price: 48000, name: "Average new car (industry average)", tier: "heavyweight", category: "status" },
    { price: 45000, name: "Full IVF package (3 cycles)", tier: "heavyweight", category: "extraction", featured: true },
    { price: 43000, name: "One epic bachelor Vegas weekend (party of 12)", tier: "heavyweight", category: "status" },
    { price: 40000, name: "Tesla Model 3", tier: "heavyweight", category: "status" },
    { price: 35000, name: "One year of NYC private preschool", tier: "heavyweight", category: "status" },
    { price: 30000, name: "Wedding photographer (high-end with video)", tier: "heavyweight", category: "status" },
    { price: 25000, name: "New compact car", tier: "heavyweight", category: "status" },
    { price: 22000, name: "Average wedding (small, intimate)", tier: "heavyweight", category: "status" },
    { price: 20000, name: "Engagement ring (nicer)", tier: "heavyweight", category: "status" },
    { price: 18000, name: "Used motorcycle (mid-tier touring)", tier: "heavyweight", category: "status" },
    { price: 16000, name: "One year of average US daycare", tier: "heavyweight", category: "extraction", featured: true },
    { price: 14000, name: "Two weeks at a luxury all-inclusive resort", tier: "heavyweight", category: "status" },
    { price: 13500, name: "One year of state college tuition (in-state)", tier: "heavyweight", category: "extraction" },
    { price: 12000, name: "Hermès Birkin bag", tier: "heavyweight", category: "status" },
    { price: 10000, name: "Engagement ring (modest)", tier: "heavyweight", category: "status" },
    { price: 8500, name: "One year of public university tuition (in-state)", tier: "heavyweight", category: "extraction" },
    { price: 8300, name: "One year of federal income tax for a $75K single earner", tier: "heavyweight", category: "extraction", featured: true },
    { price: 7500, name: "Rhinoplasty (nose job)", tier: "heavyweight", category: "status" },
    { price: 6500, name: "One BBL (Brazilian Butt Lift)", tier: "heavyweight", category: "status" },
    { price: 6000, name: "Used car (rough condition)", tier: "heavyweight", category: "status" },
    { price: 5800, name: "Super Bowl ticket (nosebleeds)", tier: "heavyweight", category: "status", featured: true },
    { price: 5738, name: "One year of FICA payroll taxes for a $75K earner (you\'ll never see it back)", tier: "heavyweight", category: "extraction" },
    { price: 5500, name: "Bottle of Pappy Van Winkle 23", tier: "heavyweight", category: "status", featured: true },
    { price: 5000, name: "Invisalign treatment (full)", tier: "heavyweight", category: "status" },
    { price: 4800, name: "One Lambo wheel rim", tier: "heavyweight", category: "status" },
    { price: 3500, name: "Mountain bike", tier: "heavyweight", category: "status" },
    { price: 3200, name: "C-section copay", tier: "heavyweight", category: "extraction", featured: true },
    { price: 3000, name: "One year of US median property tax", tier: "heavyweight", category: "extraction" },
    { price: 2800, name: "One year of advisor fees on $280K (1% AUM)", tier: "heavyweight", category: "extraction" },
    { price: 2600, name: "One coffin (mid-range)", tier: "heavyweight", category: "extraction" },
    { price: 2500, name: "Epidural during birth", tier: "heavyweight", category: "extraction", featured: true },
    { price: 2400, name: "CrossFit annual membership", tier: "heavyweight", category: "extraction" },
    { price: 2200, name: "One LASIK eye (per eye)", tier: "heavyweight", category: "status" },
    { price: 2100, name: "One sterilization procedure (out of pocket)", tier: "heavyweight", category: "extraction" },
    { price: 2000, name: "Decent laptop", tier: "heavyweight", category: "status" },
    { price: 1800, name: "One uninsured ER visit (minor)", tier: "heavyweight", category: "extraction" },
    { price: 1650, name: "One veneer (per tooth)", tier: "heavyweight", category: "status" },
    { price: 1500, name: "Annual car insurance (cheap)", tier: "heavyweight", category: "extraction" },
    { price: 1400, name: "New gaming console", tier: "heavyweight", category: "status" },
    { price: 1300, name: "IUD insertion (out of pocket)", tier: "heavyweight", category: "extraction" },
    { price: 1250, name: "One root canal", tier: "heavyweight", category: "extraction" },
    { price: 1200, name: "Year of college textbooks", tier: "heavyweight", category: "extraction" },
    { price: 1150, name: "One CoolSculpting session", tier: "heavyweight", category: "status" },
    { price: 1100, name: "One vasectomy", tier: "heavyweight", category: "extraction", featured: true },
    { price: 1050, name: "One dental crown", tier: "heavyweight", category: "extraction" },
    { price: 1025, name: "Funeral plot (cheap)", tier: "heavyweight", category: "extraction" },
    { price: 1000, name: "One year of mutual fund expense ratios on $100K (1%)", tier: "heavyweight", category: "extraction" },
    { price: 950, name: "Cremation (basic)", tier: "snack", category: "extraction" },
    { price: 900, name: "Weekend Airbnb", tier: "snack", category: "status" },
    { price: 880, name: "One year of premium pet insurance", tier: "snack", category: "extraction" },
    { price: 875, name: "One month\'s rent (small midwest town)", tier: "snack", category: "extraction" },
    { price: 850, name: "One year of average insurance copays", tier: "snack", category: "extraction" },
    { price: 750, name: "Wedding band (men\'s, plain)", tier: "snack", category: "status" },
    { price: 650, name: "Used iPhone", tier: "snack", category: "status" },
    { price: 530, name: "One year of MetaMask gas fees (casual DeFi user)", tier: "snack", category: "extraction" },
    { price: 500, name: "One annuity surrender charge (5% on $10K)", tier: "snack", category: "extraction" },
    { price: 425, name: "Round-trip domestic flight", tier: "snack", category: "status" },
    { price: 415, name: "Wisdom tooth removal (per tooth)", tier: "snack", category: "extraction" },
    { price: 410, name: "Bottle of Macallan 18", tier: "snack", category: "status" },
    { price: 405, name: "Vegas night at the Bellagio", tier: "snack", category: "status" },
    { price: 400, name: "One non-surgical cosmetic session", tier: "snack", category: "status" },
    { price: 395, name: "One NFT mint gas war loss (peak 2021)", tier: "snack", category: "extraction" },
    { price: 349, name: "One Apple Watch SE (entry model)", tier: "snack", category: "status" },
    { price: 275, name: "Nice dinner for two", tier: "snack", category: "status" },
    { price: 260, name: "One shot of Ozempic (per dose)", tier: "snack", category: "extraction", featured: true },
    { price: 255, name: "One H&R Block in-person filing", tier: "snack", category: "extraction" },
    { price: 253, name: "One year of weekly out-of-network ATM use", tier: "snack", category: "extraction" },
    { price: 250, name: "Roomba (basic)", tier: "snack", category: "status" },
    { price: 240, name: "One year of ChatGPT Plus", tier: "snack", category: "extraction" },
    { price: 230, name: "One year of Notion AI", tier: "snack", category: "extraction" },
    { price: 225, name: "One year of overdraft fees (typical overdrafting household)", tier: "snack", category: "extraction", featured: true },
    { price: 220, name: "One year of Xbox Game Pass Ultimate", tier: "snack", category: "extraction" },
    { price: 215, name: "One year of Netflix (standard)", tier: "snack", category: "extraction" },
    { price: 210, name: "One bag of designer pre-workout supplement", tier: "snack", category: "snack" },
    { price: 205, name: "One year of LinkedIn Premium", tier: "snack", category: "extraction" },
    { price: 204, name: "One year of Disney+ (no ads)", tier: "snack", category: "extraction" },
    { price: 200, name: "Bottle of Dom Pérignon", tier: "snack", category: "status" },
    { price: 198, name: "Cameo from someone you\'ve heard of", tier: "snack", category: "snack" },
    { price: 195, name: "IV drip wellness session", tier: "snack", category: "status" },
    { price: 190, name: "One hour with a private chef", tier: "snack", category: "status" },
    { price: 188, name: "One TurboTax Self-Employed filing (federal + state)", tier: "snack", category: "extraction" },
    { price: 180, name: "One year of checking account maintenance fees ($15/mo)", tier: "snack", category: "extraction" },
    { price: 179, name: "AirPods (with ANC)", tier: "snack", category: "status" },
    { price: 178, name: "One Costco run that got out of hand", tier: "snack", category: "snack" },
    { price: 175, name: "One year of Audible", tier: "snack", category: "extraction" },
    { price: 170, name: "One night at a bougie hot pot restaurant", tier: "snack", category: "status" },
    { price: 165, name: "One pair of Lululemon leggings", tier: "snack", category: "status" },
    { price: 156, name: "One Spotify Premium year", tier: "snack", category: "extraction" },
    { price: 155, name: "Therapy session (full cash price)", tier: "snack", category: "extraction" },
    { price: 154, name: "One Substack subscription you regret", tier: "snack", category: "extraction" },
    { price: 150, name: "Emotional support animal certification (online)", tier: "snack", category: "snack" },
    { price: 145, name: "One AI girlfriend monthly subscription", tier: "snack", category: "extraction" },
    { price: 135, name: "One night at a Holiday Inn Express", tier: "snack", category: "status" },
    { price: 130, name: "One paternity test", tier: "snack", category: "snack" },
    { price: 125, name: "Concert nosebleeds", tier: "snack", category: "status" },
    { price: 120, name: "One Hulu year", tier: "snack", category: "extraction" },
    { price: 118, name: "One Midjourney year", tier: "snack", category: "extraction" },
    { price: 105, name: "Global Entry application", tier: "snack", category: "extraction" },
    { price: 102, name: "Hamilton ticket (cheap)", tier: "snack", category: "status" },
    { price: 100, name: "DNA test (23andMe)", tier: "snack", category: "snack" },
    { price: 98, name: "Ring doorbell", tier: "snack", category: "status" },
    { price: 90, name: "Private massage (60 min)", tier: "snack", category: "snack" },
    { price: 85, name: "Pair of jeans", tier: "snack", category: "snack" },
    { price: 82, name: "TaskRabbit IKEA assembly", tier: "snack", category: "extraction" },
    { price: 80, name: "TSA PreCheck", tier: "snack", category: "extraction" },
    { price: 78, name: "One PlayStation Plus year", tier: "snack", category: "extraction" },
    { price: 77, name: "Vegas night at a budget hotel", tier: "snack", category: "status" },
    { price: 76, name: "One ChatGPT API top-up (moderate use month)", tier: "snack", category: "extraction" },
    { price: 75, name: "Hello Fresh meal kit week", tier: "snack", category: "extraction" },
    { price: 72, name: "Lyft surge ride at 2am", tier: "snack", category: "extraction" },
    { price: 71, name: "One Uber Eats order at 2am", tier: "snack", category: "extraction" },
    { price: 70, name: "Personal trainer session", tier: "snack", category: "status" },
    { price: 68, name: "Sensory deprivation tank float", tier: "snack", category: "status" },
    { price: 66, name: "One bag of premium CBD gummies", tier: "snack", category: "snack" },
    { price: 63, name: "One annual Costco membership", tier: "snack", category: "extraction" },
    { price: 60, name: "One Coinbase taker fee on a $5K trade", tier: "snack", category: "extraction" },
    { price: 55, name: "Tank of gas", tier: "snack", category: "snack" },
    { price: 52, name: "One Equinox day pass", tier: "snack", category: "status" },
    { price: 50, name: "Sam\'s Club membership", tier: "snack", category: "extraction" },
    { price: 49, name: "One Tinder Platinum month", tier: "snack", category: "extraction" },
    { price: 48, name: "One year of Robinhood Gold (paid annually)", tier: "snack", category: "extraction" },
    { price: 45, name: "Cryotherapy session", tier: "snack", category: "status" },
    { price: 44, name: "One Peloton All-Access Membership month", tier: "snack", category: "extraction" },
    { price: 42, name: "One failed Uniswap transaction (gas eaten anyway)", tier: "snack", category: "extraction" },
    { price: 40, name: "Steam game", tier: "snack", category: "snack" },
    { price: 39, name: "Cameo from a C-list celeb", tier: "snack", category: "snack" },
    { price: 38, name: "SoulCycle class", tier: "snack", category: "status" },
    { price: 36, name: "One Ethereum L2 bridge exit back to L1", tier: "snack", category: "extraction" },
    { price: 35, name: "One month of gym membership (typical chain)", tier: "snack", category: "extraction" },
    { price: 34, name: "Pedicure", tier: "snack", category: "snack" },
    { price: 33, name: "DoorDash delivery (with all fees)", tier: "snack", category: "extraction" },
    { price: 32, name: "Escape room (per person)", tier: "snack", category: "snack" },
    { price: 31, name: "Hinge premium month", tier: "snack", category: "extraction" },
    { price: 30, name: "Tinder Gold month", tier: "snack", category: "extraction" },
    { price: 29, name: "Axe-throwing session", tier: "snack", category: "snack" },
    { price: 28, name: "One wire transfer fee (typical domestic)", tier: "snack", category: "extraction" },
    { price: 27, name: "Large delivery pizza", tier: "snack", category: "snack" },
    { price: 26.77, name: "One overdraft fee (Bankrate 2025 average)", tier: "snack", category: "extraction" },
    { price: 26.5, name: "CrossFit class drop-in", tier: "snack", category: "status" },
    { price: 26, name: "Bumble Boost month", tier: "snack", category: "extraction" },
    { price: 25, name: "Uber ride across town", tier: "snack", category: "extraction" },
    { price: 24, name: "One Erewhon smoothie", tier: "snack", category: "status" },
    { price: 23, name: "Therapy session (typical copay)", tier: "snack", category: "extraction" },
    { price: 22, name: "Planet Fitness Black Card month", tier: "snack", category: "extraction" },
    { price: 21, name: "Budget haircut (Great Clips tier)", tier: "snack", category: "snack" },
    { price: 20, name: "Full-service car wash", tier: "snack", category: "snack" },
    { price: 18.5, name: "One Claude Pro month", tier: "snack", category: "extraction" },
    { price: 18, name: "Paperback book", tier: "snack", category: "snack" },
    { price: 17, name: "One NSF (non-sufficient funds) fee", tier: "snack", category: "extraction" },
    { price: 15, name: "Movie ticket", tier: "snack", category: "snack" },
    { price: 14, name: "One Twitter Blue verification month", tier: "snack", category: "extraction" },
    { price: 13, name: "Chipotle burrito", tier: "snack", category: "snack" },
    { price: 12, name: "Uniswap gas fee during peak (ETH)", tier: "snack", category: "extraction" },
    { price: 11.5, name: "One Botox unit", tier: "snack", category: "status", featured: true },
    { price: 11, name: "Pack of cigarettes", tier: "snack", category: "snack" },
    { price: 10.5, name: "OnlyFans subscription (avg)", tier: "snack", category: "extraction" },
    { price: 9, name: "One Coinbase ETH withdrawal fee", tier: "snack", category: "extraction" },
    { price: 8, name: "Round of mini golf", tier: "snack", category: "snack" },
    { price: 7.5, name: "Starbucks coffee", tier: "snack", category: "snack" },
    { price: 7, name: "Tinder profile boost", tier: "snack", category: "extraction" },
    { price: 6.5, name: "One Adderall pill (10mg generic, cash retail without insurance)", tier: "snack", category: "extraction" },
    { price: 6, name: "Big Mac", tier: "snack", category: "snack" },
    { price: 5.5, name: "Mid-tier scratch-off ticket", tier: "snack", category: "snack" },
    { price: 5, name: "Postmates delivery fee", tier: "snack", category: "extraction" },
    { price: 4.86, name: "One ATM out-of-network fee (Bankrate 2025 average)", tier: "snack", category: "extraction" },
    { price: 4.75, name: "Cheap cigar", tier: "snack", category: "snack" },
    { price: 4.5, name: "Mechanical bull ride", tier: "snack", category: "snack" },
    { price: 4.25, name: "Penny slot pull at max bet", tier: "snack", category: "snack" },
    { price: 4, name: "Pre-rolled cone", tier: "snack", category: "snack" },
    { price: 3.75, name: "Four Loko", tier: "snack", category: "snack" },
    { price: 3.5, name: "Greeting card", tier: "snack", category: "snack" },
    { price: 3.2, name: "One ETH bridge transaction (L1→L2)", tier: "snack", category: "extraction" },
    { price: 3, name: "MetaMask swap fee on ETH", tier: "snack", category: "extraction" },
    { price: 2.85, name: "Mini bottle of liquor (airplane bottle)", tier: "snack", category: "snack" },
    { price: 2.75, name: "Can of Monster", tier: "snack", category: "snack" },
    { price: 2.6, name: "5-Hour Energy shot", tier: "snack", category: "snack" },
    { price: 2.5, name: "Liquid Death", tier: "snack", category: "snack" },
    { price: 2.4, name: "White Claw", tier: "snack", category: "snack" },
    { price: 2.3, name: "Truly seltzer", tier: "snack", category: "snack" },
    { price: 2, name: "Powerball ticket", tier: "snack", category: "snack" },
    { price: 1.95, name: "Scratch-off ticket (entry-tier)", tier: "snack", category: "snack" },
    { price: 1.85, name: "Pickle from 7-Eleven cooler", tier: "snack", category: "snack" },
    { price: 1.75, name: "Apple", tier: "snack", category: "snack" },
    { price: 1.65, name: "Slim Jim", tier: "snack", category: "snack" },
    { price: 1.5, name: "Roll of toilet paper", tier: "snack", category: "snack" },
    { price: 1.45, name: "Pickle (from a jar)", tier: "snack", category: "snack" },
    { price: 1.35, name: "Hot Wheels car", tier: "snack", category: "snack" },
    { price: 1.25, name: "Reese\'s Cup", tier: "snack", category: "snack" },
    { price: 1.1, name: "Pop Rocks package", tier: "snack", category: "snack" },
    { price: 1.05, name: "Claw machine attempt", tier: "snack", category: "snack" },
    { price: 1, name: "Karaoke song credit", tier: "snack", category: "snack" },
    { price: 0.98, name: "Single cigarette", tier: "snack", category: "snack" },
    { price: 0.9, name: "Onion", tier: "snack", category: "snack" },
    { price: 0.88, name: "Pear", tier: "snack", category: "snack" },
    { price: 0.85, name: "AA battery", tier: "snack", category: "snack" },
    { price: 0.82, name: "Potato", tier: "snack", category: "snack" },
    { price: 0.78, name: "Tomato", tier: "snack", category: "snack" },
    { price: 0.75, name: "Orange", tier: "snack", category: "snack" },
    { price: 0.73, name: "Postage stamp", tier: "snack", category: "snack" },
    { price: 0.65, name: "Juice box", tier: "snack", category: "snack" },
    { price: 0.6, name: "Pack of ramen", tier: "snack", category: "snack" },
    { price: 0.52, name: "Lime", tier: "snack", category: "snack" },
    { price: 0.5, name: "Condom (from a 12-pack)", tier: "snack", category: "snack" },
    { price: 0.48, name: "Lemon", tier: "snack", category: "snack" },
    { price: 0.45, name: "Disposable razor", tier: "snack", category: "snack" },
    { price: 0.42, name: "Nicotine gum", tier: "snack", category: "snack" },
    { price: 0.4, name: "Arcade game token", tier: "snack", category: "snack" },
    { price: 0.38, name: "CBD gummy", tier: "snack", category: "snack" },
    { price: 0.35, name: "AAA Battery", tier: "snack", category: "snack" },
    { price: 0.33, name: "Capri Sun", tier: "snack", category: "snack" },
    { price: 0.3, name: "Banana", tier: "snack", category: "snack" },
    { price: 0.28, name: "Gumball", tier: "snack", category: "snack" },
    { price: 0.25, name: "Single egg", tier: "snack", category: "snack" },
    { price: 0.23, name: "Nicotine pouch (Zyn)", tier: "snack", category: "snack" },
    { price: 0.22, name: "Bic pen", tier: "snack", category: "snack" },
    { price: 0.2, name: "Penny slot pull (min bet)", tier: "snack", category: "snack" },
    { price: 0.18, name: "Coin-op horse ride outside Walmart", tier: "snack", category: "snack" },
    { price: 0.16, name: "Claw machine prize (cost basis)", tier: "snack", category: "snack" },
    { price: 0.15, name: "Single tortilla", tier: "snack", category: "snack" },
    { price: 0.14, name: "Snickers fun size", tier: "snack", category: "snack" },
    { price: 0.13, name: "Single Oreo", tier: "snack", category: "snack" },
    { price: 0.12, name: "Carrot", tier: "snack", category: "snack" },
    { price: 0.11, name: "Donut hole", tier: "snack", category: "snack" },
    { price: 0.095, name: "Tootsie Pop", tier: "snack", category: "snack" },
    { price: 0.09, name: "Dum Dum lollipop", tier: "snack", category: "snack" },
    { price: 0.085, name: "Stick of incense", tier: "snack", category: "snack" },
    { price: 0.08, name: "Slice of bread", tier: "snack", category: "snack" },
    { price: 0.075, name: "Soft pretzel bite", tier: "snack", category: "snack" },
    { price: 0.07, name: "Tea bag", tier: "snack", category: "snack" },
    { price: 0.065, name: "Tylenol tablet", tier: "snack", category: "snack" },
    { price: 0.06, name: "Melatonin gummy", tier: "snack", category: "snack" },
    { price: 0.055, name: "Listerine strip", tier: "snack", category: "snack" },
    { price: 0.05, name: "Pencil", tier: "snack", category: "snack" },
    { price: 0.048, name: "Solo cup", tier: "snack", category: "snack" },
    { price: 0.045, name: "Stick of gum", tier: "snack", category: "snack" },
    { price: 0.04, name: "Paper plate", tier: "snack", category: "snack" },
    { price: 0.038, name: "Plastic fork", tier: "snack", category: "snack" },
    { price: 0.035, name: "Vanilla wafer", tier: "snack", category: "snack" },
    { price: 0.033, name: "Bandaid", tier: "snack", category: "snack" },
    { price: 0.03, name: "Ketchup packet", tier: "snack", category: "snack" },
    { price: 0.028, name: "Hershey\'s Kiss", tier: "snack", category: "snack" },
    { price: 0.026, name: "Single Altoid mint", tier: "snack", category: "snack" },
    { price: 0.024, name: "Tums tablet", tier: "snack", category: "snack" },
    { price: 0.022, name: "Paper fortune from a fortune cookie", tier: "snack", category: "snack", featured: true },
    { price: 0.02, name: "Ibuprofen tablet", tier: "snack", category: "snack" },
    { price: 0.018, name: "Single Pringle", tier: "snack", category: "snack" },
    { price: 0.016, name: "Single Dorito", tier: "snack", category: "snack" },
    { price: 0.014, name: "Sugar packet", tier: "snack", category: "snack" },
    { price: 0.013, name: "Plastic spoon", tier: "snack", category: "snack" },
    { price: 0.012, name: "Popsicle stick", tier: "snack", category: "snack" },
    { price: 0.011, name: "Tootsie Roll mini", tier: "snack", category: "snack" },
    { price: 0.0105, name: "Bobby pin", tier: "snack", category: "snack" },
    { price: 0.01, name: "Thumbtack", tier: "snack", category: "snack" },
    { price: 0.0095, name: "Plastic straw", tier: "snack", category: "snack" },
    { price: 0.009, name: "Saltine cracker", tier: "snack", category: "snack" },
    { price: 0.0085, name: "Single pretzel stick", tier: "snack", category: "snack" },
    { price: 0.008, name: "Single napkin", tier: "snack", category: "snack" },
    { price: 0.0075, name: "Single coffee filter", tier: "snack", category: "snack" },
    { price: 0.007, name: "Single sheet of rolling paper", tier: "snack", category: "snack" },
    { price: 0.0065, name: "Paperclip", tier: "snack", category: "snack" },
    { price: 0.006, name: "Square of aluminum foil", tier: "snack", category: "snack" },
    { price: 0.0055, name: "Single Cheeto", tier: "snack", category: "snack" },
    { price: 0.005, name: "Q-tip", tier: "snack", category: "snack" },
    { price: 0.0045, name: "Sheet of printer paper", tier: "snack", category: "snack" },
    { price: 0.004, name: "Tic Tac", tier: "snack", category: "snack" },
    { price: 0.0038, name: "Single match", tier: "snack", category: "snack" },
    { price: 0.0035, name: "Rubber band", tier: "snack", category: "snack" },
    { price: 0.003, name: "Sheet of toilet paper", tier: "snack", category: "snack" },
    { price: 0.0028, name: "Single Skittle", tier: "snack", category: "snack" },
    { price: 0.0025, name: "Toothpick", tier: "snack", category: "snack" },
    { price: 0.0023, name: "Goldfish cracker", tier: "snack", category: "snack" },
    { price: 0.002, name: "Single M&M", tier: "snack", category: "snack" },
    { price: 0.0018, name: "Single coffee bean", tier: "snack", category: "snack" },
    { price: 0.0016, name: "Single sprinkle (large)", tier: "snack", category: "snack" },
    { price: 0.0014, name: "Sunflower seed", tier: "snack", category: "snack" },
    { price: 0.0012, name: "Single Cheerio", tier: "snack", category: "snack" },
    { price: 0.001, name: "Single staple", tier: "snack", category: "snack" },
    { price: 0.0008, name: "Froot Loop", tier: "absurd_floor", category: "snack" },
    { price: 0.0007, name: "Pinch of pepper", tier: "absurd_floor", category: "snack" },
    { price: 0.0006, name: "Single coffee ground", tier: "absurd_floor", category: "snack" },
    { price: 0.00055, name: "Single sprinkle (small)", tier: "absurd_floor", category: "snack" },
    { price: 0.0005, name: "Single eyelash", tier: "absurd_floor", category: "snack" },
    { price: 0.00045, name: "Piece of confetti", tier: "absurd_floor", category: "snack" },
    { price: 0.0004, name: "Grain of sugar", tier: "absurd_floor", category: "snack" },
    { price: 0.00035, name: "Grain of rice", tier: "absurd_floor", category: "snack" },
    { price: 0.0003, name: "Single mustard seed", tier: "absurd_floor", category: "snack" },
    { price: 0.00025, name: "Poppy seed", tier: "absurd_floor", category: "snack" },
    { price: 0.0002, name: "Sesame seed", tier: "absurd_floor", category: "snack" },
    { price: 0.00015, name: "Speck of dust", tier: "absurd_floor", category: "snack" },
    { price: 0.00012, name: "One PulseChain transaction", tier: "absurd_floor", category: "snack" },
    { price: 0.0001, name: "Grain of fine sand", tier: "absurd_floor", category: "snack" },
    { price: 5e-05, name: "≈ 25 seconds of US minimum-wage work", tier: "time", category: "snack" },
    { price: 2e-05, name: "≈ 10 seconds (a camera shutter click)", tier: "time", category: "snack" },
    { price: 1e-05, name: "≈ 5 seconds (a finger snap)", tier: "time", category: "snack" },
    { price: 5e-06, name: "≈ 2.5 seconds (reading one word)", tier: "time", category: "snack" },
    { price: 2e-06, name: "≈ 1 second (saying \'Bitcoin\')", tier: "time", category: "snack" },
    { price: 1e-06, name: "≈ 0.5 seconds (a single breath)", tier: "time", category: "snack" },
  ];

  const TIER_META = {
    heavyweight:  { cls: 'tier-heavy',  text: '🍔 Heavyweight Tier — $1,000+',        emoji: '💎' },
    snack:        { cls: 'tier-snack',  text: '🏠 Real Life Tier — $0.001 to $1,000', emoji: '🏠' },
    absurd_floor: { cls: 'tier-absurd', text: '🤡 Absurd Floor — $0.0001 to $0.001',  emoji: '🏖️' },
    time:         { cls: 'tier-dust',   text: '⏱ Sub-Dust Tier — time, not things',  emoji: '⏱️' },
  };

  const MIN_WAGE_PER_SEC = 7.25 / 3600;

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

  function fmtTime(seconds) {
    if (!isFinite(seconds) || seconds <= 0) return '—';
    const ms = seconds * 1000;
    if (ms < 1) return parseFloat(ms.toPrecision(2)) + 'ms';
    if (seconds < 1) {
      let v = ms >= 10 ? Math.round(ms) : parseFloat(ms.toFixed(1));
      return v + (v === 1 ? ' millisecond' : ' milliseconds');
    }
    if (seconds < 60) {
      let v = seconds >= 10 ? Math.round(seconds) : parseFloat(seconds.toFixed(1));
      return v + (v === 1 ? ' second' : ' seconds');
    }
    if (seconds < 3600) { const v = Math.round(seconds/60); return v + (v===1?' minute':' minutes'); }
    const v = Math.round(seconds/3600); return v + (v===1?' hour':' hours');
  }
  function secsOfWork(price) { return price / MIN_WAGE_PER_SEC; }
  function timePhrase(price) { return fmtTime(secsOfWork(price)) + ' of minimum-wage work'; }
  function isTimeMode(t) { return t.price != null && t.price < 0.0001; }

  function rungLabelForToken(rung, timeMode) {
    if (!rung) return null;
    if (timeMode) return { name: timePhrase(rung.price), price: fmtItemPrice(rung.price), featured: !!rung.featured };
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
    const isPulse = t.chain === 'pulsechain';
    const cls = isPulse ? 'pulsechain' : 'major';
    const label = isPulse ? 'PulseChain' : 'Major';
    return `<span class="chain-pill ${cls}"><span class="chain-pill-dot"></span>${label}</span>`;
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
      const timeMode = isTimeMode(t);
      const next = rungLabelForToken(nextRung, timeMode);
      const prev = rungLabelForToken(prevRung, timeMode);
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
        // No next rung (sub-dust / time-mode): fall back to cheapest rung above coin price
        const fallback = [...LADDER].reverse().find(r => r.price > t.price);
        const targetP = fallback ? fallback.price : 0.0001;
        pct = Math.min(100, Math.max(0, (t.price / targetP) * 100));
      }
      // Minimum visible sliver for any non-zero progress
      const pctDisplay = pct > 0 ? Math.max(3, pct) : 0;

      let caption = '';
      if (!nextRung) {
        caption = `<span class="cap-pct">Top of the ladder 🏆</span>`;
      } else if (timeMode) {
        caption = `<span class="cap-next">${timePhrase(t.price)}</span>`;
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
              <a class="card-share" href="${tweetUrl(t, prev)}" target="_blank" rel="noopener" aria-label="Share ${t.sym} on X">${X_ICON}</a>
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
    if (raw.toLowerCase()==='notacoin') { openTokenModal(); return; }
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
    approaching: { main: '#ec4899', glow: 'rgba(236,72,153,0.40)' },
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
    verdictEl.style.color=col.main; lineMult.style.color=col.main; lineMult.style.filter=`drop-shadow(0 0 16px ${col.glow})`;
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
      const glow=ctx.createRadialGradient(540,150,0,540,150,640); glow.addColorStop(0,'rgba(236,72,153,0.12)'); glow.addColorStop(1,'transparent'); ctx.fillStyle=glow; ctx.fillRect(0,0,1080,1080);
      ctx.drawImage(srcCanvas,30,30,1020,1020);
      if (_isIOS) { const link=document.createElement('a'); link.download='wenflip.png'; link.href=out.toDataURL('image/png'); document.body.appendChild(link); link.click(); document.body.removeChild(link); showCalcToast('Saved! Share it on X. 🔥'); }
      else { out.toBlob(async blob=>{try{await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);showCalcToast('Copied! Paste it into X. 🔥');}catch{const link=document.createElement('a');link.download='wenflip.png';link.href=URL.createObjectURL(blob);document.body.appendChild(link);link.click();document.body.removeChild(link);URL.revokeObjectURL(link.href);showCalcToast('Saved! Share it on X. 🔥');}}, 'image/png'); }
    } catch(err) { console.error(err); showCalcToast('Screenshot failed — try again 😬'); }
    finally { btn.disabled=false; icon.textContent=_isIOS?'💾':'📋'; txt.textContent=_isIOS?'Save image':'Copy as image'; }
  }
  function showCalcToast(msg) { const t=document.getElementById('calcToast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),3200); }
