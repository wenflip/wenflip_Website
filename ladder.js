/* ============================================================================
   ladder.js  —  THE MASTER LADDER (single source of truth for the site)
   ----------------------------------------------------------------------------
   This file declares two globals used across the site:
     • LADDER      — every rung, price-descending. The whole flip mechanic.
     • TIER_META   — tier → {css class, band label, emoji} display map.

   LOAD ORDER (in index.html): coins.js → ladder.js → app.js  (all `defer`).
   These are plain classic-script `const`s, so they are visible to app.js as
   long as this file executes BEFORE app.js. Do NOT add `export` / `type=module`.

   HARD RULES (do not break — see Flipper List rules):
     RULE 1 — UNIQUE PRICES. No two rungs may share a price. A flip fires when a
              coin crosses a price; duplicates collapse the flip event. Before
              adding a rung, check its price against the whole list.
     — Prices are strictly DESCENDING, top to bottom.
     — `tier` must be one of: heavyweight | snack | absurd_floor | void
       (these keys must exist in TIER_META below).
     — `featured: true` marks a ⭐ banger flip.

   NOTE: `tier: 'snack'` is the internal key for the "Real Life" tier
   (label lives in TIER_META). Legacy name; don't rename without touching
   every `tier` value below and the TIER_META key together.

   `// cite:` comments keep an item's real-world price defensible (Rule 2)
   after the sourcing qualifier is stripped off the display name to keep the
   card clean. The card shows the short name; the citation lives here.
   ========================================================================== */

const LADDER = [
    { price: 1000000000, name: 'a Powerball jackpot', tier: 'heavyweight', category: 'status' }, // cite: advertised jackpot, not the cash value
    { price: 300000000, name: "a billionaire's superyacht", tier: 'heavyweight', category: 'status' },
    { price: 100000000, name: 'a single painting at auction', tier: 'heavyweight', category: 'status' },
    { price: 30000000, name: 'a new private jet', tier: 'heavyweight', category: 'status' },
    { price: 8000000, name: 'a 30-second Super Bowl ad', tier: 'heavyweight', category: 'status' },
    { price: 5000000, name: "a billionaire's doomsday bunker", tier: 'heavyweight', category: 'status' },
    { price: 4000000, name: 'a Bugatti', tier: 'heavyweight', category: 'status' }, // cite: Chiron base ~$3.3M / new Tourbillon ~$4.1M (2024–26)
    { price: 3000000, name: "a nurse's entire working life", tier: 'heavyweight', category: 'extraction' },
    { price: 2600000, name: "a teacher's whole 40-year career", tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 1500000, name: 'a comfortable retirement', tier: 'heavyweight', category: 'extraction' },
    { price: 1000000, name: 'a million dollars', tier: 'heavyweight', category: 'status' },
    { price: 600000, name: 'a ticket to space', tier: 'heavyweight', category: 'status' },
    { price: 500000, name: 'your own private island', tier: 'heavyweight', category: 'status' },
    { price: 450000, name: 'a year of full household staff', tier: 'heavyweight', category: 'status' },
    { price: 415000, name: 'a paid-off house, free and clear', tier: 'heavyweight', category: 'extraction' },
    { price: 400000, name: 'a Lamborghini Aventador', tier: 'heavyweight', category: 'status' }, // cite: used-market ~$400K; new production ended 2022
    { price: 390000, name: 'a Rolls Royce Ghost', tier: 'heavyweight', category: 'status' },
    { price: 380000, name: 'a thoroughbred racehorse', tier: 'heavyweight', category: 'status' }, // cite: Keeneland average yearling
    { price: 350000, name: 'a Richard Mille watch', tier: 'heavyweight', category: 'status' }, // cite: RM models commonly $200K–$1M+
    { price: 315000, name: 'raising one kid to 18', tier: 'heavyweight', category: 'extraction' }, // cite: USDA est., birth to age 18
    { price: 300000, name: 'a used private jet', tier: 'heavyweight', category: 'status' }, // cite: entry-level used Cessna Citation
    { price: 280000, name: 'a year of 24/7 security', tier: 'heavyweight', category: 'status' },
    { price: 250000, name: 'a private college degree', tier: 'heavyweight', category: 'extraction' }, // cite: ~4yr private, total cost of attendance
    { price: 220000, name: 'a used Ferrari Roma', tier: 'heavyweight', category: 'status' }, // coupé discontinued 2024, used-market price
    { price: 180000, name: 'a gold-plated bathtub', tier: 'heavyweight', category: 'status' }, // cite: bespoke commission
    { price: 170000, name: "a forgettable Christie's painting", tier: 'heavyweight', category: 'status' },
    { price: 160000, name: 'a year at Phillips Exeter', tier: 'heavyweight', category: 'status' }, // cite: one year, boarding
    { price: 150000, name: 'a full Beverly Hills makeover', tier: 'heavyweight', category: 'status' }, // cite: full plastic-surgery makeover
    { price: 140000, name: 'a year of luxury nursing home', tier: 'heavyweight', category: 'status' }, // cite: one year, private room
    { price: 130000, name: 'a full surrogacy in the USA', tier: 'heavyweight', category: 'extraction' },
    { price: 120000, name: 'a live-in nanny (NYC)', tier: 'heavyweight', category: 'extraction' },
    { price: 115000, name: 'a Porsche 911 Carrera', tier: 'heavyweight', category: 'status' }, // cite: base, new
    { price: 110000, name: 'a solid-gold toilet', tier: 'heavyweight', category: 'status' }, // cite: 18-karat, functional (cf. Cattelan "America")
    { price: 90000, name: 'full-mouth dental implants', tier: 'heavyweight', category: 'extraction' },
    { price: 87000, name: 'a year at Harvard', tier: 'heavyweight', category: 'status', featured: true }, // cite: full cost of attendance
    { price: 75000, name: 'a full luxury kitchen remodel', tier: 'heavyweight', category: 'status' }, // cite: high-end suburban
    { price: 60000, name: 'a down payment on a house', tier: 'heavyweight', category: 'extraction' },
    { price: 52000, name: 'a used Porsche 911', tier: 'heavyweight', category: 'status' },
    { price: 48000, name: 'an average new car', tier: 'heavyweight', category: 'status' }, // cite: industry average new-car price
    { price: 45000, name: 'a full IVF package (3 cycles)', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 43000, name: 'an epic Vegas bachelor weekend', tier: 'heavyweight', category: 'status' }, // cite: party of 12
    { price: 40000, name: 'a Tesla Model 3', tier: 'heavyweight', category: 'status' },
    { price: 35000, name: 'one year of NYC private preschool', tier: 'heavyweight', category: 'status' },
    { price: 30000, name: 'a wedding photographer', tier: 'heavyweight', category: 'status' }, // cite: high-end with video
    { price: 25000, name: 'a new compact car', tier: 'heavyweight', category: 'status' },
    { price: 22000, name: 'a small wedding', tier: 'heavyweight', category: 'status' },
    { price: 20000, name: 'a nicer engagement ring', tier: 'heavyweight', category: 'status' },
    { price: 18000, name: 'a used motorcycle', tier: 'heavyweight', category: 'status' }, // cite: mid-tier touring
    { price: 16000, name: 'one year of average US daycare', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 14000, name: 'two weeks at a resort', tier: 'heavyweight', category: 'status' }, // cite: luxury all-inclusive
    { price: 13500, name: 'a year of state college', tier: 'heavyweight', category: 'extraction' }, // cite: in-state tuition
    { price: 12000, name: 'a Hermès Birkin bag', tier: 'heavyweight', category: 'status' },
    { price: 10000, name: 'a modest engagement ring', tier: 'heavyweight', category: 'status' },
    { price: 8500, name: 'a year of public university', tier: 'heavyweight', category: 'extraction' }, // cite: in-state tuition
    { price: 8300, name: 'a year of federal income tax', tier: 'heavyweight', category: 'extraction', featured: true }, // cite: $75K single earner
    { price: 7500, name: 'a rhinoplasty (nose job)', tier: 'heavyweight', category: 'status' },
    { price: 6500, name: 'a BBL (Brazilian butt lift)', tier: 'heavyweight', category: 'status' },
    { price: 6000, name: 'a used car', tier: 'heavyweight', category: 'status' }, // cite: rough condition
    { price: 5800, name: 'a Super Bowl ticket (nosebleeds)', tier: 'heavyweight', category: 'status', featured: true },
    { price: 5738, name: 'a year of FICA payroll taxes', tier: 'heavyweight', category: 'extraction' }, // cite: $75K earner; broadcast kicker: "you'll never see it back"
    { price: 5500, name: 'a bottle of Pappy Van Winkle 23', tier: 'heavyweight', category: 'status', featured: true },
    { price: 5000, name: 'a full Invisalign treatment', tier: 'heavyweight', category: 'status' },
    { price: 4800, name: 'a Lambo wheel rim', tier: 'heavyweight', category: 'status' },
    { price: 3500, name: 'a mountain bike', tier: 'heavyweight', category: 'status' },
    { price: 3200, name: 'a C-section copay', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 3000, name: 'one year of US median property tax', tier: 'heavyweight', category: 'extraction' },
    { price: 2800, name: 'a year of advisor fees', tier: 'heavyweight', category: 'extraction' }, // cite: 1% AUM on $280K
    { price: 2600, name: 'a coffin (mid-range)', tier: 'heavyweight', category: 'extraction' },
    { price: 2500, name: 'an epidural during birth', tier: 'heavyweight', category: 'extraction', featured: true },
    { price: 2400, name: 'a CrossFit annual membership', tier: 'heavyweight', category: 'extraction' },
    { price: 2200, name: 'a LASIK eye (per eye)', tier: 'heavyweight', category: 'status' },
    { price: 2100, name: 'a sterilization procedure', tier: 'heavyweight', category: 'extraction' }, // cite: out of pocket
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
    { price: 1000, name: 'a year of mutual fund fees', tier: 'heavyweight', category: 'extraction' }, // cite: 1% expense ratio on $100K
    { price: 950, name: 'a cremation (basic)', tier: 'snack', category: 'extraction' },
    { price: 900, name: 'a weekend Airbnb', tier: 'snack', category: 'status' },
    { price: 880, name: 'one year of premium pet insurance', tier: 'snack', category: 'extraction' },
    { price: 875, name: "one month's rent", tier: 'snack', category: 'extraction' }, // cite: small midwest town
    { price: 850, name: 'a year of insurance copays', tier: 'snack', category: 'extraction' },
    { price: 750, name: "a wedding band (men's, plain)", tier: 'snack', category: 'status' },
    { price: 650, name: 'a used iPhone', tier: 'snack', category: 'status' },
    { price: 530, name: 'one month of health insurance', tier: 'snack', category: 'extraction' }, // cite: unsubsidized ACA, single adult
    { price: 500, name: 'an annuity surrender charge', tier: 'snack', category: 'extraction' }, // cite: 5% on $10K
    { price: 425, name: 'a round-trip domestic flight', tier: 'snack', category: 'status' },
    { price: 415, name: 'a wisdom tooth removal (per tooth)', tier: 'snack', category: 'extraction' },
    { price: 410, name: 'a bottle of Macallan 18', tier: 'snack', category: 'status' },
    { price: 405, name: 'a Vegas night at the Bellagio', tier: 'snack', category: 'status' },
    { price: 400, name: 'a non-surgical cosmetic session', tier: 'snack', category: 'status' },
    { price: 379, name: 'an iPhone screen repair', tier: 'snack', category: 'extraction' }, // cite: out of warranty
    { price: 349, name: 'an Apple Watch SE (entry model)', tier: 'snack', category: 'status' },
    { price: 275, name: 'a nice dinner for two', tier: 'snack', category: 'status' },
    { price: 260, name: 'a shot of Ozempic (per dose)', tier: 'snack', category: 'extraction', featured: true },
    { price: 255, name: 'an H&R Block in-person filing', tier: 'snack', category: 'extraction' },
    { price: 253, name: 'a year of ATM fees', tier: 'snack', category: 'extraction' }, // cite: weekly out-of-network use
    { price: 250, name: 'a Roomba (basic)', tier: 'snack', category: 'status' },
    { price: 240, name: 'one year of ChatGPT Plus', tier: 'snack', category: 'extraction' },
    { price: 230, name: 'one year of Notion AI', tier: 'snack', category: 'extraction' },
    { price: 225, name: 'a year of overdraft fees', tier: 'snack', category: 'extraction', featured: true }, // cite: typical overdrafting household
    { price: 220, name: 'a year of Xbox Game Pass', tier: 'snack', category: 'extraction' }, // cite: Ultimate tier
    { price: 215, name: 'one year of Netflix (standard)', tier: 'snack', category: 'extraction' },
    { price: 210, name: 'a tub of fancy pre-workout', tier: 'snack', category: 'snack' },
    { price: 205, name: 'one year of LinkedIn Premium', tier: 'snack', category: 'extraction' },
    { price: 204, name: 'one year of Disney+ (no ads)', tier: 'snack', category: 'extraction' },
    { price: 200, name: 'a bottle of Dom Pérignon', tier: 'snack', category: 'status' },
    { price: 198, name: 'a Cameo from a B-lister', tier: 'snack', category: 'snack' },
    { price: 195, name: 'an IV drip wellness session', tier: 'snack', category: 'status' },
    { price: 190, name: 'an hour with a private chef', tier: 'snack', category: 'status' },
    { price: 188, name: 'a TurboTax filing', tier: 'snack', category: 'extraction' }, // cite: Self-Employed, federal + state
    { price: 180, name: 'a year of checking fees', tier: 'snack', category: 'extraction' }, // cite: ~$15/mo checking maintenance
    { price: 179, name: 'AirPods (with ANC)', tier: 'snack', category: 'status' },
    { price: 178, name: 'a wild Costco run', tier: 'snack', category: 'snack' },
    { price: 175, name: 'one year of Audible', tier: 'snack', category: 'extraction' },
    { price: 170, name: 'a bougie hot-pot dinner', tier: 'snack', category: 'status' },
    { price: 165, name: 'a pair of Lululemon leggings', tier: 'snack', category: 'status' },
    { price: 156, name: 'one Spotify Premium year', tier: 'snack', category: 'extraction' },
    { price: 155, name: 'a therapy session, cash', tier: 'snack', category: 'extraction' }, // cite: full cash price
    { price: 154, name: 'a Substack subscription', tier: 'snack', category: 'extraction' },
    { price: 150, name: 'a fake ESA certificate', tier: 'snack', category: 'snack' },
    { price: 145, name: 'a month of AI girlfriend', tier: 'snack', category: 'extraction' },
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
    { price: 76, name: 'a ChatGPT API top-up', tier: 'snack', category: 'extraction' }, // cite: moderate-use month
    { price: 75, name: 'a Hello Fresh meal kit week', tier: 'snack', category: 'extraction' },
    { price: 72, name: 'a Lyft surge ride at 2am', tier: 'snack', category: 'extraction' },
    { price: 71, name: 'an Uber Eats order at 2am', tier: 'snack', category: 'extraction' },
    { price: 70, name: 'a personal trainer session', tier: 'snack', category: 'status' },
    { price: 68, name: 'a sensory deprivation tank float', tier: 'snack', category: 'status' },
    { price: 66, name: 'a bag of premium CBD gummies', tier: 'snack', category: 'snack' },
    { price: 63, name: 'one annual Costco membership', tier: 'snack', category: 'extraction' },
    { price: 60, name: 'a Ticketmaster service fee', tier: 'snack', category: 'extraction' }, // cite: pair of tickets
    { price: 55, name: 'a tank of gas', tier: 'snack', category: 'snack' },
    { price: 52, name: 'an Equinox day pass', tier: 'snack', category: 'status' },
    { price: 50, name: "a Sam's Club membership", tier: 'snack', category: 'extraction' },
    { price: 49, name: 'a Tinder Platinum month', tier: 'snack', category: 'extraction' },
    { price: 48, name: 'a year of Robinhood Gold', tier: 'snack', category: 'extraction' }, // cite: paid annually
    { price: 45, name: 'a cryotherapy session', tier: 'snack', category: 'status' },
    { price: 44, name: 'a month of Peloton', tier: 'snack', category: 'extraction' },
    { price: 42, name: 'a movie night for two', tier: 'snack', category: 'extraction' },
    { price: 40, name: 'a Steam game', tier: 'snack', category: 'snack' },
    { price: 39, name: 'a Cameo from a C-lister', tier: 'snack', category: 'snack' },
    { price: 38, name: 'a SoulCycle class', tier: 'snack', category: 'status' },
    { price: 36, name: 'an airline checked-bag fee', tier: 'snack', category: 'extraction' }, // cite: first bag, one way
    { price: 35, name: 'a month at the gym', tier: 'snack', category: 'extraction' }, // cite: typical chain, one month
    { price: 34, name: 'a pedicure', tier: 'snack', category: 'snack' },
    { price: 33, name: 'a DoorDash delivery', tier: 'snack', category: 'extraction' }, // cite: with all fees
    { price: 32, name: 'an escape room (per person)', tier: 'snack', category: 'snack' },
    { price: 31, name: 'a Hinge premium month', tier: 'snack', category: 'extraction' },
    { price: 30, name: 'a Tinder Gold month', tier: 'snack', category: 'extraction' },
    { price: 29, name: 'an axe-throwing session', tier: 'snack', category: 'snack' },
    { price: 28, name: 'a wire transfer fee', tier: 'snack', category: 'extraction' }, // cite: typical domestic
    { price: 27, name: 'a large delivery pizza', tier: 'snack', category: 'snack' },
    { price: 26.77, name: 'an overdraft fee', tier: 'snack', category: 'extraction' }, // cite: Bankrate 2025 average
    { price: 26.5, name: 'a CrossFit class drop-in', tier: 'snack', category: 'status' },
    { price: 26, name: 'a Bumble Boost month', tier: 'snack', category: 'extraction' },
    { price: 25, name: 'an Uber ride across town', tier: 'snack', category: 'extraction' },
    { price: 24, name: 'an Erewhon smoothie', tier: 'snack', category: 'status' },
    { price: 23, name: 'a therapy-session copay', tier: 'snack', category: 'extraction' }, // cite: typical copay
    { price: 22, name: 'a Planet Fitness Black Card month', tier: 'snack', category: 'extraction' },
    { price: 21, name: 'a Great Clips haircut', tier: 'snack', category: 'snack' },
    { price: 20, name: 'a full-service car wash', tier: 'snack', category: 'snack' },
    { price: 18.5, name: 'a Claude Pro month', tier: 'snack', category: 'extraction' },
    { price: 18, name: 'a paperback book', tier: 'snack', category: 'snack' },
    { price: 17, name: 'a bounced-check fee', tier: 'snack', category: 'extraction' }, // cite: NSF (non-sufficient funds) fee
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
    { price: 6.5, name: 'an Adderall pill', tier: 'snack', category: 'extraction' }, // cite: 10mg generic, cash retail without insurance
    { price: 6, name: 'a Big Mac', tier: 'snack', category: 'snack' },
    { price: 5.5, name: 'a mid-tier scratch-off ticket', tier: 'snack', category: 'snack' },
    { price: 5, name: 'a Postmates delivery fee', tier: 'snack', category: 'extraction' },
    { price: 4.86, name: 'an out-of-network ATM fee', tier: 'snack', category: 'extraction' }, // cite: Bankrate 2025 average
    { price: 4.75, name: 'a cheap cigar', tier: 'snack', category: 'snack' },
    { price: 4.5, name: 'a mechanical bull ride', tier: 'snack', category: 'snack' },
    { price: 4.25, name: 'a penny slot pull at max bet', tier: 'snack', category: 'snack' },
    { price: 4, name: 'a pre-rolled cone', tier: 'snack', category: 'snack' },
    { price: 3.75, name: 'a Four Loko', tier: 'snack', category: 'snack' },
    { price: 3.5, name: 'a greeting card', tier: 'snack', category: 'snack' },
    { price: 3.2, name: 'one gallon of gas', tier: 'snack', category: 'extraction' },
    { price: 3, name: 'one loaf of bread (name brand)', tier: 'snack', category: 'extraction' },
    { price: 2.85, name: 'a mini liquor bottle', tier: 'snack', category: 'snack' },
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
    { price: 2.5e-05, name: "a popcorn kernel that didn't pop", tier: 'void', category: 'snack' },
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

const TIER_META = {
    heavyweight:  { cls: 'tier-heavy',  text: '🍔 Heavyweight Tier — $1,000+',        emoji: '💎' },
    snack:        { cls: 'tier-snack',  text: '🏠 Real Life Tier — $0.001 to $1,000', emoji: '🏠' },
    absurd_floor: { cls: 'tier-absurd', text: '🤡 Absurd Floor — $0.0001 to $0.001',  emoji: '🏖️' },
    void:         { cls: 'tier-dust',   text: '🕳 The Gutter — stuff so cheap it fell through the price floor',  emoji: '🕳️' },
};
