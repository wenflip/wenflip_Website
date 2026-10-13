
    const state = TOKENS.map(t => ({ ...t, price: null, chg: 0, status: 'pending', error: null, lastGood: null }));
    var flipCoin = null;   // hoisted guard: renderScCoinList() reads this during the first fetch, before the later declaration executes

  // ==== CONTRACT-ADDRESS (CA) RESOLVER CONFIG ====
  const MIN_LIQUIDITY_USD = 10000;
  const MIN_VOLUME_24H = 1000;
  // Mechanism A — wenflip impersonation (plaintext substring/fuzzy). Standalone 'flip' is NOT blocked.
  const WENFLIP_BLOCK = ['wenflip','wen flip','wenflp','w3nflip','weflip','wflip'];
  // Mechanism B — CSAM + hate (hashed, exact-token SHA-256 hex). Empty on purpose: add lowercase SHA-256 hex digests
  // of blocked tokens here to switch it on (no hashing tool lives in this repo).
  const BLOCKED_HASHES = [];
  const _blockedHashSet = new Set(BLOCKED_HASHES);


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


 


  let lastFetch = null;
  function renderUpdated() {
    const el = document.getElementById('updated');
    if (!lastFetch) { el.innerHTML = 'Fetching live prices…'; return; }
    const secs = Math.round((Date.now() - lastFetch) / 1000);
    el.innerHTML = `Live prices · last updated <b>${secs}s ago</b> · refreshes every 60s`;
  }
  setInterval(renderUpdated, 1000);

  // ==== LIVE PRICE FETCH — batched by chain, timed out, keeps last good price ====
  const FETCH_TIMEOUT_MS = 5000;    // give up on any one chain's request after 5s
  const BASE_REFRESH_MS  = 60000;   // normal refresh cadence (same 60s as before)
  const MAX_REFRESH_MS   = 240000;  // slowest we'll poll during a total outage

  let _refreshTimer   = null;
  let _refreshDelayMs = BASE_REFRESH_MS;

  const renderAll = () => { renderScCoinList(); renderUpdated(); tryPrefillMafc(); };

  // Fill the inline MAFC hero with BTC once its price lands — but only once, and
  // never over a card the user already made or a deep link the page is honoring.
  let _mafcPrefilled = false;
  function tryPrefillMafc() {
    if (_mafcPrefilled || flipCoin) return;                 // already filled, or user/deeplink got there first
    const hash = (window.location.hash || '').replace(/^#/, '').toLowerCase();
    if (hash === 'notacoin' || hash === 'flip' || hash.startsWith('flip=')) return; // let the deep link win
    const btc = state.find(s => s.sym === 'BTC' && s.price != null);
    if (!btc) return;                                       // BTC price not in yet — try again next refresh
    _mafcPrefilled = true;
    renderCardForCoin('BTC');
  }

  // Group coins by their DexScreener chain (pulsechain / ethereum / bsc / base).
  function tokensByChain() {
    const groups = {};
    for (const t of TOKENS) {
      const chain = (t.dexChain || '').trim();
      const addr  = (t.pairAddress || '').trim();
      if (!chain || !addr) {
        const i = state.findIndex(s => s.sym === t.sym);
        if (i >= 0) { state[i].status = 'err'; state[i].error = 'no pair address'; }
        continue;
      }
      (groups[chain] = groups[chain] || []).push(t);
    }
    return groups;
  }

  // Apply one live pair to a coin. Missing pair => keep the old price (don't blank it).
  function _applyPair(t, pair) {
    const i = state.findIndex(s => s.sym === t.sym);
    if (i < 0) return false;
    if (!pair || pair.priceUsd == null) {
      state[i].status = 'err';
      state[i].error  = 'no pair data';
      return false;                       // price left as-is (last good value)
    }
    state[i].price    = parseFloat(pair.priceUsd);
    state[i].chg      = pair.priceChange?.h24 ?? 0;
    state[i].status   = 'ok';
    state[i].error    = null;
    state[i].lastGood = Date.now();
    return true;
  }

  // A whole chain failed/timed out: keep those coins' last prices, just mark them errored.
  function _markChainStale(tokens, reason) {
    for (const t of tokens) {
      const i = state.findIndex(s => s.sym === t.sym);
      if (i >= 0) { state[i].status = 'err'; state[i].error = String(reason).slice(0, 60); }
    }
  }

  // Fetch ONE chain's coins in a single request, with a hard 5s timeout.
  async function fetchChainBatch(chain, tokens) {
    const byAddr = await fetchDexPairs(chain, tokens.map(t => t.pairAddress.trim()), FETCH_TIMEOUT_MS);
    let ok = 0;
    for (const t of tokens) {
      if (_applyPair(t, byAddr[t.pairAddress.trim().toLowerCase()])) ok++;
    }
    return ok;
  }

  async function refreshAll() {
    const groups = tokensByChain();
    const chains = Object.keys(groups);

    // Fire every chain at once. Each chain paints THE MOMENT it returns, so fast
    // chains (PulseChain) show immediately even while a slow chain is still hanging.
    const jobs = chains.map(chain =>
      fetchChainBatch(chain, groups[chain])
        .then(ok => { renderAll(); return ok; })
        .catch(err => { _markChainStale(groups[chain], err); renderAll(); throw err; })
    );

    const results = await Promise.allSettled(jobs);

    const anyOk = state.some(s => s.status === 'ok');
    if (anyOk) lastFetch = Date.now();

    // Back off ONLY if every chain failed; any success snaps back to the normal 60s.
    const totalOutage = results.length > 0 && results.every(r => r.status === 'rejected');
    _refreshDelayMs = totalOutage ? Math.min(MAX_REFRESH_MS, _refreshDelayMs * 2) : BASE_REFRESH_MS;

    clearTimeout(_refreshTimer);
    _refreshTimer = setTimeout(refreshAll, _refreshDelayMs);

    renderAll();
  }

  renderScCoinList();   // paint the inline MAFC picker on load (loading rows until prices land)

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
        resetCardMaker();
        return;
      }
      // #flip=SYMBOL — case-insensitive match against built-in tokens
      const symMatch = TOKENS.find(t => t.sym.toLowerCase() === value.toLowerCase());
      if (symMatch) { showCardForCoin(symMatch.sym); return; }
      // #flip=<contract address> — starts with 0x OR is long enough to be a CA
      if (value.startsWith('0x') || value.length > 30) {
        showCardForCA(value);
        return;
      }
      // #flip=<anything else> → graceful fallback: open picker
      resetCardMaker();
      return;
    }


  }

  refreshAll().then(handleDeepLink).then(() => { _mafcPrefilled = true; });


  // ==== POP-UP FOCUS ====
  // Opening a pop-up moves keyboard focus onto its close button and makes the page
  // behind it inert (Tab can't wander underneath). Closing undoes that and returns
  // focus to whatever opened it. Safe to call when the pop-up isn't open.
  let _modalReturnFocus = null;
  function _modalFocusIn(backdropId) {
    const bd = document.getElementById(backdropId); if (!bd) return;
    _modalReturnFocus = document.activeElement;
    Array.from(document.body.children).forEach(el => { if (el !== bd && el.tagName !== 'SCRIPT') el.inert = true; });
    const c = bd.querySelector('.modal-close'); if (c) c.focus({ preventScroll: true });
  }
  function _modalFocusOut() {
    Array.from(document.body.children).forEach(el => { el.inert = false; });
    const r = _modalReturnFocus; _modalReturnFocus = null;
    if (r && typeof r.focus === 'function' && document.contains(r)) r.focus({ preventScroll: true });
  }

  function openTokenModal() {
    document.getElementById('tokenModal').classList.add('open'); document.body.style.overflow='hidden';
    if (window.location.hash.replace(/^#/,'')!=='notacoin') history.replaceState(null,'','#notacoin');
    _modalFocusIn('tokenModal');
  }
  function closeTokenModal() {
    const m = document.getElementById('tokenModal'); const wasOpen = m.classList.contains('open');
    m.classList.remove('open'); document.body.style.overflow='';
    if (wasOpen) _modalFocusOut();
    if (window.location.hash.replace(/^#/,'').toLowerCase()==='notacoin') history.replaceState(null,'',window.location.pathname+window.location.search);
  }
  document.addEventListener('keydown', e => { if (e.key==='Escape'){closeTokenModal();} });

  function htmlAttr(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }


  function fmtMult(mult) {
    if (mult>=1e9) return '1B+';
    if (mult>=1e6) { const v=mult/1e6; return (v>=10?Math.round(v):parseFloat(v.toFixed(1)))+'M'; }
    if (mult>=1000) return Math.round(mult).toLocaleString();
    if (mult>=10) return Math.round(mult).toString();
    if (mult>=2) return parseFloat(mult.toFixed(1)).toString();
    return parseFloat(mult.toFixed(2)).toString();
  }


  // _isIOS, loadHtml2Canvas, showToast, brandCanvas, deliverImage live in shared.js.


  async function exportCardAsImage(cardEl, shareBtn, iconEl, txtEl, isIOS) {
    shareBtn.disabled=true; iconEl.className='ico ico-spin'; iconEl.textContent=''; txtEl.textContent='Generating…';
    try {
      await loadHtml2Canvas();
      const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
      deliverImage(brandCanvas(srcCanvas, 0), 'wenflip.png');
    } catch(err) { console.error(err); showToast('Screenshot failed — try again 😬'); }
    finally { shareBtn.disabled=false; iconEl.className = isIOS ? 'ico ico-download' : 'ico ico-clipboard'; txtEl.textContent=isIOS?'Save image':'Copy as image'; }
  }


  // The card maker is the homepage hero. These reset it and scroll to it.
   function _scrollToCardMaker() {
    const el = document.getElementById('mafcHero');
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
   function resetCardMaker() {
    _flipResetAll();
    renderScCoinList();
    const w = document.getElementById('scCardWrap');
    if (w) w.style.display = 'none';
    _scrollToCardMaker();
  }
  function showCardForCoin(sym) {
    _flipResetAll();
    renderScCoinList();
    const w = document.getElementById('scCardWrap');
    if (w) w.style.display = 'none';
    // Pre-render the card for this coin immediately (Today / next rung / straight)
    renderCardForCoin(sym);
    _scrollToCardMaker();
  }
  // Reset the card maker, then run the contract-address resolve + render flow for a pasted
  // address. Re-uses resolveContractAddress + renderCardFromData + caShowFail exactly as caSubmit does.
  async function showCardForCA(address) {
    resetCardMaker();
    // Let the reset paint before kicking off the async fetch
    await new Promise(r => setTimeout(r, 80));
    const caInput = document.getElementById('caInput');
    if (caInput) caInput.value = address;
    caClearFail();
    let result;
    try { result = await resolveContractAddress(address); }
    catch(e) { result = { ok:false, reason:'network' }; }
    if (result.ok) { caClearFail(); renderCardFromData(result.token); }
    else { caShowFail(result.reason); }
  }


  function renderScCoinList() {
    const wrap = document.getElementById('scCoinList');
    if (!wrap) return;
    const selSym = flipCoin ? flipCoin.sym : null;
    wrap.innerHTML = TOKENS.map(t => {
      const s = state.find(x => x.sym===t.sym);
      const loading = !s || s.price==null;
      return `<button class="coin-badge ${selSym===t.sym?'selected':''} ${loading?'loading':''}" data-sym="${t.sym}" title="${t.name}${loading?' (loading…)':''}"><img src="${t.logo}" alt="${t.sym}" loading="lazy"/><span>${t.sym}</span></button>`;
    }).join('');
    wrap.querySelectorAll('.coin-badge:not(.loading)').forEach(btn => {
      btn.addEventListener('click', () => renderCardForCoin(btn.dataset.sym));
    });
  }

  // ==== PASTE-A-CONTRACT-ADDRESS (CA) TOOL ====
  // Lives ONLY in the homepage card maker. Resolves an arbitrary token via DexScreener and
  // renders it through renderCardFromData — it never touches `state` or the TOKENS array,
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

  // ---- CA UI flow: input + button + inline failure message, inside the card maker ----
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
      if (result.ok) { caClearFail(); renderCardFromData(result.token); }
      else { caShowFail(result.reason); }
    } finally {
      _caBusy = false; btn.disabled = false; btn.textContent = prevLabel;
    }
  }

  // Wire the CA controls (static elements in the card maker; script is deferred so DOM exists).
  (function wireCaTool(){
    const btn = document.getElementById('caGoBtn');
    const input = document.getElementById('caInput');
    if (btn) btn.addEventListener('click', caSubmit);
    if (input) {
      input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); caSubmit(); } });
      input.addEventListener('input', caClearFail);
    }
  })();

  // ===================================================================
  // FLIP CARD ENGINE
  // One renderer for every ladder-read card. Returns an HTML string; the
  // caller injects it into a `.wf-flip-card.flip-card` container.
  //
  //   renderFlipCard({ coin, mult, item })
  //     coin  : { sym, name, price, chg, logo }   (required)
  //     mult  : number × coin.price               (default 1 → "Today")
  //     item  : { name, price } → item-versus body (default null; set by "Pick an item")
  //
  // Reuses: findRungIndex, flipProgressPct, fmtItemPrice, fmtPrice, fmtMult,
  //         objSizeClass, htmlAttr, LADDER.
  // ===================================================================
  function renderFlipCard(opts) {
    opts = opts || {};
    const coin  = opts.coin || {};
    const mult  = (opts.mult != null) ? opts.mult : 1;
    const item  = opts.item || null;

    const sym    = String(coin.sym  || '');
    const name   = String(coin.name || sym);
    const logo   = String(coin.logo || '');
    const chg    = coin.chg || 0;
    const price  = coin.price;
    const pumped = mult > 1;
    const dateStr = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});

    // identity row — 24h pill at Today, mult badge when pumped
    const chgSign = chg >= 0 ? '▲' : '▼';
    const chgCls  = chg >= 0 ? 'up' : 'down';
    const badge = pumped
      ? `<div class="pump-mult-badge">${fmtMult(mult)}×</div>`
      : `<div class="wf-chg-pill ${chgCls}">${chgSign} ${Math.abs(chg).toFixed(2)}%</div>`;

    const head = `
      <div class="wf-head">
        <img class="pump-logo" src="${htmlAttr(logo)}" alt="${htmlAttr(sym)}"/>
        <div class="pump-coin-id">
          <div class="pump-coin-sym">${htmlAttr(sym)}</div>
          <div class="pump-coin-name-sm"><span class="wf-coin-name">${htmlAttr(name)} · </span>${fmtPrice(price)}</div>
        </div>
        ${badge}
      </div>`;

    let hero = '', foot = '';

    if (item) {
      // ---------- BODY 2: item-versus ("Pick an item") ----------
      const tPrice  = item.price;
      const flipped = price >= tPrice;
      const eyeCls  = flipped ? '' : ' wf-chase';
      hero = `
        <div class="pump-dream-obj ${objSizeClass(item.name)}">
          <div class="pump-flips-lbl${eyeCls}">${flipped ? 'FLIPS ✓' : 'CHASING'}</div>
          <div class="pump-dream-name">${htmlAttr(item.name)}</div>
        </div>`;
      if (flipped) {
        const n = price / tPrice;
        foot = `
          <div class="pump-divider"></div>
          <div class="wf-receipt">1 ${htmlAttr(sym)} buys <span class="wf-to">${fmtMult(n)}× ${htmlAttr(item.name)}</span></div>`;
      } else {
        const pct = Math.min(99, Math.round((price / tPrice) * 100));
        const gap = tPrice - price;
        foot = `
          <div class="pump-divider"></div>
          <div class="wf-receipt"><b>${fmtMult(tPrice / price)}×</b> to reach <span class="wf-to">${htmlAttr(item.name)}</span></div>
          <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pct)}%"></div></div>`;
      }
    } else {
      // ---------- BODY 1: ladder-read (next rung) ----------
      const eff = price * mult;
      const idx = findRungIndex(eff);
      const cleared = LADDER[idx];
      const next = LADDER[idx - 1];

      if (idx === 0 || !next) {
        hero = `
          <div class="pump-dream-obj pump-obj-md pump-dream-obj-top">
            <div class="pump-flips-lbl">CLEARED EVERYTHING ✓</div>
            <div class="pump-dream-name">the entire ladder</div>
            <div class="pump-dream-sub">There is nothing left to flip.</div>
          </div>`;
      } else if (idx === LADDER.length - 1 && eff < LADDER[idx].price) {
        const first = LADDER[LADDER.length - 1];
        const pct = Math.min(99, Math.round((eff / first.price) * 100));
        const gap = first.price - eff;
        hero = `
          <div class="pump-dream-obj ${objSizeClass(first.name)}">
            <div class="pump-flips-lbl wf-chase">CHASING</div>
            <div class="pump-dream-name">${htmlAttr(first.name)}</div>
          </div>`;
        foot = `
          <div class="pump-divider"></div>
          <div class="wf-receipt">not on the board yet · <b>${pct}%</b> of the way there</div>
          <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pct)}%"></div></div>`;
      } else {
        const pct = flipProgressPct(eff, cleared, next);
        const gap = next.price - eff;
        hero = `
          <div class="pump-dream-obj ${objSizeClass(cleared.name)}">
            <div class="pump-flips-lbl">${pumped ? 'WOULD FLIP' : 'FLIPPED ✓'}</div>
            <div class="pump-dream-name">${htmlAttr(cleared.name)}</div>
          </div>`;
        foot = `
          <div class="pump-divider"></div>
          <div class="wf-receipt">${pct}% to <span class="wf-to">${htmlAttr(next.name)}</span></div>
          <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1,pct)}%"></div></div>`;
      }
    }

    const stamp = `<div class="wf-stamp"><span>${dateStr}</span><span>wenflip.com · @wenflips</span></div>`;

    return head + hero + `<div class="wf-foot">${foot}${stamp}</div>`;
  }

  // Thin wrapper: look up a built-in coin by symbol, then delegate to the data-driven renderer.
  // Behavior for built-ins is byte-for-byte identical to before (their names/syms/logos contain
  // no HTML-special characters, so the escaping in renderCardFromData is a no-op on them).
  function renderCardForCoin(sym) {
    const s = state.find(x => x.sym===sym);
    const tk = TOKENS.find(t => t.sym===sym);
    if (!s || !s.price || !tk) return;
    renderCardFromData({ sym, name: tk.name, price: s.price, chg: s.chg || 0, logo: tk.logo });
  }

  // Data-driven entry point into renderFlipCard(). Both the built-in picker
  // (renderCardForCoin) and the pasted-CA path call this.
  function renderCardFromData(tokenObj) {
    if (!tokenObj || tokenObj.price == null) return;
    caClearFail();
    flipCoin = {
      sym:   String(tokenObj.sym  || ''),
      name:  String(tokenObj.name || tokenObj.sym || ''),
      price: tokenObj.price,
      chg:   tokenObj.chg || 0,
      logo:  String(tokenObj.logo || ''),
    };
    renderScCoinList();   // repaint picker so the selected chip highlights immediately
    renderMakerCard();
  }
  async function scExport() {
    const btn=document.getElementById('scShareBtn'),icon=document.getElementById('scShareIcon'),txt=document.getElementById('scShareText');
    await exportCardAsImage(document.getElementById('scResultCard'),btn,icon,txt,_isIOS);
  }


  // ===================================================================
  // MAKE A FLIP CARD — card maker controller
  // State = which coin / price mode / target. Every control mutates
  // state then calls renderMakerCard(), which feeds renderFlipCard().
  // ===================================================================
  flipCoin          = null;         // {sym,name,price,chg,logo} or null (hoisted via var at top)
  let flipMult      = 1;            // 1|2|5|10|100 or 'custom'
  let flipCustomRaw = '';           // raw custom input ("25x" / "$1.00")
  let flipTarget    = null;         // null (next rung) | {name, price}

  // Reset every control to defaults + resync the control UI.
  function _flipResetAll() {
    flipCoin = null; flipMult = 1; flipCustomRaw = '';
    flipTarget = null;

    const pr = document.getElementById('flipPriceRow');
    if (pr) { pr.classList.remove('flip-dim'); pr.querySelectorAll('.flip-chip').forEach(b => b.classList.toggle('active', b.dataset.mult === '1')); }
    const tr = document.getElementById('flipTargetRow');
    if (tr) tr.querySelectorAll('.flip-chip').forEach(b => b.classList.toggle('active', b.dataset.target === 'next'));

    const cw = document.getElementById('flipCustomWrap'); if (cw) { cw.style.display = 'none'; cw.classList.remove('flip-dim'); }
    const iw = document.getElementById('flipItemWrap');   if (iw) iw.style.display = 'none';
    const ci = document.getElementById('flipCustomInput'); if (ci) ci.value = '';
    const is = document.getElementById('flipItemSearch');  if (is) is.value = '';
    const ch = document.getElementById('flipCustomHint');   if (ch) ch.textContent = '';
  }

  function _flipSetActive(row, btn) {
    if (!row) return;
    row.querySelectorAll('.flip-chip').forEach(b => b.classList.toggle('active', b === btn));
  }

  function _flipDimPrice(on) {
    const pr = document.getElementById('flipPriceRow');
    const cw = document.getElementById('flipCustomWrap');
    if (pr) pr.classList.toggle('flip-dim', on);
    if (cw) cw.classList.toggle('flip-dim', on);
  }

  // Resolve the effective multiplier. Returns a number, or null when 'custom'
  // is selected but the input isn't a valid multiple/price yet.
  function _flipEffectiveMult() {
    if (flipMult !== 'custom') return flipMult;
    if (!flipCoin) return null;
    const parsed = parseCustomPrice(flipCustomRaw);
    if (!parsed) return null;
    const hyp = customTargetPrice(flipCoin.price, parsed);
    if (!hyp || hyp <= 0) return null;
    return hyp / flipCoin.price;
  }

  // When true, renders skip the auto-scroll below. The hero rotation controller
  // sets this around its own renders so attract mode never yanks the viewport
  // every 4s; user-initiated renders leave it false and still scroll into view.
  let _heroSuppressScroll = false;

  // The single render path for the card maker. Reads state → renderFlipCard().
  function renderMakerCard() {
    const wrap = document.getElementById('scCardWrap');
    if (!flipCoin) { if (wrap) wrap.style.display = 'none'; return; }

    const item = flipTarget ? { name: flipTarget.name, price: flipTarget.price } : null;

    let mult = 1;
    const hint = document.getElementById('flipCustomHint');
    if (!item) {
      const m = _flipEffectiveMult();
      if (m === null) { if (hint) hint.textContent = 'Try "25x" for a multiple, or "$1.00" for a price.'; return; }
      if (hint) hint.textContent = '';
      mult = m;
    } else if (hint) { hint.textContent = ''; }

    const card = document.getElementById('scResultCard');
    card.className = 'wf-flip-card flip-card';
    card.innerHTML = renderFlipCard({ coin: flipCoin, mult: mult, item: item });

    if (wrap) {
      wrap.style.display = '';
      const _suppress = _heroSuppressScroll;
      requestAnimationFrame(() => {
        fitHeroName(card);
        if (!_suppress) wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    } else {
      requestAnimationFrame(() => fitHeroName(card));
    }
    const icon = document.getElementById('scShareIcon');
    const txt  = document.getElementById('scShareText');
    if (icon) icon.className = _isIOS ? 'ico ico-download' : 'ico ico-clipboard';
    if (txt)  txt.textContent  = _isIOS ? 'Save image' : 'Copy as image';
  }

  // Ladder search list for "Pick an item" target mode (reuses LADDER + .target-item styling).
  function renderFlipItemList(filter) {
    const list = document.getElementById('flipItemList');
    if (!list) return;
    const q = (filter || '').toLowerCase().trim();
    const items = LADDER.filter(r => r.price != null && (!q || r.name.toLowerCase().includes(q)));
    if (!items.length) { list.innerHTML = `<div class="target-empty">No items match "${htmlAttr(filter)}"</div>`; return; }
    list.innerHTML = items.map(r =>
      `<div class="target-item ${flipTarget && flipTarget.name === r.name ? 'selected' : ''}" data-name="${htmlAttr(r.name)}" data-price="${r.price}"><span class="ti-name">${r.name}</span><span class="ti-price">${fmtItemPrice(r.price)}</span></div>`
    ).join('');
  }

  // Wire the card maker controls once (static elements; deferred script → DOM exists).
  (function wireFlipControls() {
    const priceRow = document.getElementById('flipPriceRow');
    if (priceRow) priceRow.addEventListener('click', e => {
      const b = e.target.closest('.flip-chip'); if (!b) return;
      const m = b.dataset.mult;
      _flipSetActive(priceRow, b);
      const cw = document.getElementById('flipCustomWrap');
      if (m === 'custom') {
        flipMult = 'custom';
        if (cw) cw.style.display = '';
        const ci = document.getElementById('flipCustomInput'); if (ci) setTimeout(() => ci.focus(), 60);
      } else {
        flipMult = parseFloat(m);
        if (cw) cw.style.display = 'none';
        renderMakerCard();
      }
    });

    const customInput = document.getElementById('flipCustomInput');
    const customGo    = document.getElementById('flipCustomGo');
    function applyCustom() { flipMult = 'custom'; flipCustomRaw = customInput ? customInput.value : ''; renderMakerCard(); }
    if (customGo)    customGo.addEventListener('click', applyCustom);
    if (customInput) {
      customInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); applyCustom(); } });
      let deb = null;
      customInput.addEventListener('input', () => { clearTimeout(deb); deb = setTimeout(applyCustom, 300); });
    }

    const targetRow = document.getElementById('flipTargetRow');
    if (targetRow) targetRow.addEventListener('click', e => {
      const b = e.target.closest('.flip-chip'); if (!b) return;
      _flipSetActive(targetRow, b);
      const iw = document.getElementById('flipItemWrap');
      if (b.dataset.target === 'item') {
        if (iw) iw.style.display = '';
        _flipDimPrice(true);
        renderFlipItemList('');
        if (flipTarget) renderMakerCard();
      } else {
        flipTarget = null;
        if (iw) iw.style.display = 'none';
        _flipDimPrice(false);
        renderMakerCard();
      }
    });

    const itemList = document.getElementById('flipItemList');
    if (itemList) itemList.addEventListener('click', e => {
      const it = e.target.closest('.target-item'); if (!it) return;
      flipTarget = { name: it.dataset.name, price: parseFloat(it.dataset.price) };
      const is = document.getElementById('flipItemSearch');
      renderFlipItemList(is ? is.value : '');
      renderMakerCard();
    });
    const itemSearch = document.getElementById('flipItemSearch');
    if (itemSearch) itemSearch.addEventListener('input', function () { renderFlipItemList(this.value); });

    const randomBtn = document.getElementById('flipRandomBtn');
    if (randomBtn) randomBtn.addEventListener('click', () => {
      const ready = state.filter(s => s.price != null);
      if (!ready.length) return;
      const pool = (ready.length > 1 && flipCoin) ? ready.filter(s => s.sym !== flipCoin.sym) : ready;
      const picked = pool[Math.floor(Math.random() * pool.length)];
      renderCardForCoin(picked.sym);   // sets flipCoin + renders at current controls
    });
  })();

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
    _modalFocusIn('flippeningModal');
  }
  function closeFlippen() {
    const m = document.getElementById('flippeningModal'); const wasOpen = m.classList.contains('open');
    m.classList.remove('open');
    document.body.style.overflow = '';
    if (wasOpen) _modalFocusOut();
  }
  // Opened by the "Dunk on a coin" pill (#doorDunk), wired further down.

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

    // 1-second deadpan beat (same as the card maker's CA lookup)
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
      <div class="fl-title-strip">DUNK ON A COIN</div>
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
        <span class="fl-wm">wenflip.com · @wenflips</span>
      </div>
    `;

    const wrap = document.getElementById('flCardWrap');
    wrap.style.display = '';
    // Reset share button labels
    const icon = document.getElementById('flShareIcon');
    const txt  = document.getElementById('flShareText');
    if (icon) icon.className = _isIOS ? 'ico ico-download' : 'ico ico-clipboard';
    if (txt)  txt.textContent  = _isIOS ? 'Save image' : 'Copy as image';
    requestAnimationFrame(() => wrap.scrollIntoView({behavior:'smooth', block:'nearest'}));
  }

  async function flippenExport() {
    const btn=document.getElementById('flShareBtn'),icon=document.getElementById('flShareIcon'),txt=document.getElementById('flShareText');
    await exportCardAsImage(document.getElementById('flResultCard'),btn,icon,txt,_isIOS);
  }

  async function flippenShare() {
    const btn2=document.getElementById('flShareBtn2'),icon2=document.getElementById('flShareIcon2'),txt2=document.getElementById('flShareText2');
    btn2.disabled=true; icon2.className='ico ico-spin'; icon2.textContent=''; txt2.textContent='Preparing…';
    try {
      await loadHtml2Canvas();
      const cardEl=document.getElementById('flResultCard');
      const srcCanvas=await window.html2canvas(cardEl,{backgroundColor:null,scale:3,useCORS:true,logging:false});
      const out=brandCanvas(srcCanvas, 0);
      const canShareFiles = navigator.canShare && navigator.share;
      if (canShareFiles) {
        await new Promise((resolve, reject) => {
          out.toBlob(async blob => {
            try {
              const file = new File([blob], 'wenflip-dunk.png', {type:'image/png'});
              const shareData = { files:[file], title:'Dunk on a coin', text:'wenflip.com' };
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
        const out2=brandCanvas(srcCanvas, 0);
        await new Promise((resolve, reject) => {
          out2.toBlob(async blob => {
            try {
              await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
              window.open('https://x.com/intent/post?text=' + encodeURIComponent('wenflip.com'), '_blank', 'noopener');
              showToast('copied. paste it in your post.');
              resolve();
            } catch(e2) {
              const link=document.createElement('a'); link.download='wenflip-dunk.png'; link.href=URL.createObjectURL(blob); document.body.appendChild(link); link.click(); document.body.removeChild(link); URL.revokeObjectURL(link.href);
              window.open('https://x.com/intent/post?text=' + encodeURIComponent('wenflip.com'), '_blank', 'noopener');
              showToast('saved. attach it to your post.');
              resolve();
            }
          }, 'image/png');
        });
      } catch(e3) { console.error(e3); showToast('Screenshot failed — try again 😬'); }
    } finally {
      btn2.disabled=false; icon2.className=''; icon2.textContent='𝕏'; txt2.textContent='Share';
    }
  }


  // Parse the input field into { mode: 'multiple'|'price', value: number } or null
  function parseCustomPrice(raw) {
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

  function customTargetPrice(coinPrice, parsed) {
    if (!parsed) return null;
    if (parsed.mode === 'multiple') return coinPrice * parsed.value;
    return parsed.value; // direct price
  }


  // Object-size bucket for the pump card hero. Length-based (never measure-and-reflow,
  // so the on-screen card and the html2canvas export always agree). pump-obj-sm is the
  // hard floor — still visually heavier than the today-price / stamp lines.
  function objSizeClass(name) {
    const n = (name || '').length;
    if (n <= 18) return 'pump-obj-xl';
    if (n <= 32) return 'pump-obj-lg';
    if (n <= 48) return 'pump-obj-md';
    return 'pump-obj-sm';
  }
  // Shrink a hero card's item name until it fits its box on BOTH axes — replaces
  // the old length-bucket guess that let long names clip. Fails safe: if the card
  // is measured while hidden (0 height), it stays at MAX rather than shrinking to
  // the floor. Runs on every render + once after the webfont loads (see below).
  function fitHeroName(cardEl) {
    if (!cardEl) return;
    const obj  = cardEl.querySelector('.pump-dream-obj');
    const name = cardEl.querySelector('.pump-dream-name');
    if (!obj || !name) return;
    const MAX = 64, MIN = 15;            // px — raised so short object names dominate the frame
    let size = MAX;
    name.style.lineHeight = '1.15';      // room for descenders (y, g, p)
    name.style.fontSize = size + 'px';
    // Step down until the name + its price line fit the hero box (height and width).
    while (size > MIN &&
           (obj.scrollHeight > obj.clientHeight + 1 ||
            name.scrollWidth  > name.clientWidth  + 1)) {
      size -= 1;
      name.style.fontSize = size + 'px';
    }
  }


  // ==== DUNK PILL — WIRING ====

  // "Dunk on a coin" pill → Flippening modal
  document.getElementById('doorDunk').addEventListener('click', openFlippen);


  // ==== OUTRAGE ====


  // ==== WONDER ====


  // Escape closes the Dunk modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeFlippen();
  }, true);

  // ==== HERO FLIP GRID ====
  // 6 core coins, each showing what it flips at the active multiplier.
  // Click a box → opens the existing Pump modal pre-loaded to that coin + multiplier.
  // Three rosters for the chain toggle (All / PulseChain / Majors).
  // Every symbol here already exists in TOKENS (coins.js) — no new coins.
  const HERO_SETS = {
    all:        ['BTC','ETH','SOL','XRP','DOGE','GOLD','PLS','PLSX','HEX'],
    pulsechain: ['PLS','PLSX','INC','HEX','eHEX','PRVX','pDAI','pWBTC','DWB'],
    major:      ['BTC','ETH','SOL','BNB','XRP','DOGE','ADA','SHIB','GOLD'],
  };
  let heroChain = 'all';                  // active chain tab; 'major' = "Majors"
  let HERO_COINS = HERO_SETS[heroChain];  // re-pointed by wireHeroChain() on tab click
  let heroMult = 1;               // default: Today (1×)
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
    const sig = heroChain + '|' + heroMult + '|' + HERO_COINS.map(sym => {
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

      return `<div class="hero-box" data-sym="${sym}" role="button" tabindex="0" aria-label="Make a flip card for ${sym}">
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
      box.addEventListener('click', () => openCardAt(sym, heroMult));
      box.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCardAt(sym, heroMult); }
      });
    });
  }

  // Load the card maker with a coin at the given multiplier (board tap).
  function openCardAt(sym, mult) {
    resetCardMaker();             // resets controls + scrolls to the card maker
    const m = parseFloat(mult);
    // Reflect the incoming multiplier on the Price row (1/2/5/10/100 map to chips).
    const priceRow = document.getElementById('flipPriceRow');
    const chip = priceRow ? priceRow.querySelector('.flip-chip[data-mult="' + m + '"]') : null;
    if (chip) { _flipSetActive(priceRow, chip); flipMult = m; }
    else      { flipMult = (isFinite(m) && m > 0) ? m : 1; }  // non-chip mult still honored
    // Select the coin + render at the resolved multiplier.
    renderCardForCoin(sym);
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
  // Toggle wiring — All / PulseChain / Majors. Mirrors wireHeroMult():
  // sets heroChain, re-points HERO_COINS at the chosen set, re-renders.
  (function wireHeroChain() {
    const wrap = document.getElementById('heroChain');
    if (!wrap) return;
    wrap.addEventListener('click', e => {
      const btn = e.target.closest('.hero-mult-btn');
      if (!btn) return;
      const c = btn.getAttribute('data-chain');
      if (!HERO_SETS[c] || c === heroChain) return;
      heroChain = c;
      HERO_COINS = HERO_SETS[heroChain];
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
    const MAX_ROWS = 6;
    const feedEl = document.getElementById('jfFeed');
    if (!feedEl) return; // markup missing — nothing to do

    let latestFlips = [];    // last good payload, capped to MAX_ROWS
    let hasLoaded   = false;  // first fetch (success or fail) has resolved

    // Resolve a logo by symbol against the existing TOKENS table (same source the
    // board/ladder use). Case-insensitive. Falls back to the neutral lettered
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
        // Same coin flipping the same item again (bouncing across one rung) adds
        // nothing and reads as a glitch — keep only the newest of each coin+item.
        const seen = new Set();
        latestFlips = json.flips.filter(f => {
          const key = String(f.sym).toLowerCase() + '|' + String(f.item).toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key); return true;
        }).slice(0, MAX_ROWS);
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
    setInterval(refreshFeed, 60_000);  // poll, matching the price refresh cadence
    setInterval(tickTimes, 30_000);    // age timestamps between polls
  })();
  // Re-fit the visible flip-card once the webfont finishes loading, so the first
  // render (which may have measured the fallback font) corrects to real metrics.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      const card = document.getElementById('scResultCard');
      if (card && flipCoin) fitHeroName(card);
    });
  }

  // ===================================================================
  // HERO ATTRACT-MODE ROTATION CONTROLLER
  // Owns the single hero card in State 1. Auto-rotates coin+item combos
  // through the EXISTING renderCardForCoin() path (no new renderer), leans
  // PulseChain for the opening rolls, never repeats the current coin, and
  // suppresses the render's auto-scroll so the page never jumps every 4s.
  // Respects prefers-reduced-motion (one static card, no rotation) and
  // pauses while the tab is backgrounded. The freeze (next edit) flips
  // _heroFrozen + clears the timer permanently on first interaction.
  // ===================================================================
  let _heroFrozen  = false;   // set true by the freeze listeners (next edit)
  let _heroTimer   = null;
  let _heroLastSym = null;    // no-immediate-repeat guard

  const _heroCueEl      = document.getElementById('mafcCue');
  const _heroReduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const _HERO_ROTATE_MS = 4000;

  // Fresh-load attract order — a FIXED playlist, not random. Deterministic so every
  // cold visitor sees the same opening: BTC anchor first, PulseChain threaded in
  // early (PLS by card 3), majors and cores braided, DWB deep-cut as the closer.
  // ⟳ Surprise me stays random (its own handler). Loops back to BTC after the last.
  // Symbols must match coins.js exactly (case-sensitive).
  const _HERO_PLAYLIST = [
    'BTC','ETH','PLS','GOLD','HEX','DOGE','PLSX','SOL','INC',
    'pWBTC','XRP','pDAI','BNB','eHEX','ADA','PRVX','SHIB','DWB'
  ];
  let _heroPlaylistIdx = 0;   // next playlist slot to show

  // Cue: dot-timer while playing → quiet "tap ⟳" hint once held/frozen.
  // Shared by the freeze listener in the next edit (calls _heroSetCue('held')).
  function _heroSetCue(mode) {
    if (!_heroCueEl) return;
    if (mode === 'playing') {
      _heroCueEl.className = 'mafc-cue is-playing';
      _heroCueEl.innerHTML = '<span class="cue-dots"><span class="cue-dot"></span><span class="cue-dot"></span><span class="cue-dot"></span></span>';
    } else if (mode === 'held') {
      _heroCueEl.className = 'mafc-cue is-held';
      _heroCueEl.innerHTML = 'tap <span class="ico ico-shuffle" aria-hidden="true"></span><span class="sr-only">surprise me</span> for another';
    } else {
      _heroCueEl.className = 'mafc-cue';
      _heroCueEl.textContent = '';
    }
  }

  // Next playlist symbol whose price is actually in. Walks forward from the
  // current slot, skipping not-yet-loaded coins, and wraps back to BTC after
  // the last. Returns null only if NO coin has a price yet (nothing to show).
  // Scans at most the full list once, so a fully-unloaded roster can't loop forever.
  function _heroNextSym() {
    const n = _HERO_PLAYLIST.length;
    for (let i = 0; i < n; i++) {
      const sym = _HERO_PLAYLIST[_heroPlaylistIdx % n];
      _heroPlaylistIdx = (_heroPlaylistIdx + 1) % n;
      const s = state.find(x => x.sym === sym && x.price != null);
      if (s) return sym;
    }
    return null;   // no prices in yet — caller does nothing, tries again next tick
  }

  // One auto-roll: advance the playlist, render through the existing path with
  // scroll suppressed. Deterministic order; no randomness here (that's ⟳ only).
  function _heroRoll() {
    if (_heroFrozen) return;
    const sym = _heroNextSym();
    if (!sym) return;
    _heroLastSym = sym;
    _heroSuppressScroll = true;
    renderCardForCoin(sym);   // sets flipCoin + renders (edit 1 gates the scroll)
    _heroSuppressScroll = false;
  }

  // Permanent stop on first interaction. Idempotent. Called by the next edit's
  // listeners; defined here so the whole machine lives in one place.
  function _heroFreeze() {
    if (_heroFrozen) return;
    _heroFrozen = true;
    if (_heroTimer) { clearInterval(_heroTimer); _heroTimer = null; }
    _heroSetCue('held');
  }

  function _heroStartRotation() {
    _heroRoll();                    // first joke immediately, no 4s wait
    _heroSetCue('playing');
    _heroTimer = setInterval(() => {
      if (document.hidden || _heroFrozen) return;   // pause while backgrounded
      _heroRoll();
    }, _HERO_ROTATE_MS);
  }

  // Take the card off the BTC auto-prefill — the controller owns first paint,
  // so there's no "BTC flashes then jumps" double-init.
  _mafcPrefilled = true;

  // Wait briefly for the first live price, then start (or, under reduced-motion,
  // paint one static card and let ⟳ drive).
  (function _heroBegin(tries){
    tries = tries || 0;
    if (_heroFrozen) return;                       // user touched something during the wait
    if (state.some(s => s.price != null)) {
      if (_heroReduceMotion) { _heroRoll(); _heroSetCue('off'); _heroFrozen = true; }
      else _heroStartRotation();
      return;
    }
    if (tries > 40) return;                        // ~10s with no prices: leave the loading state
    setTimeout(() => _heroBegin(tries + 1), 250);
  })();

  // ===================================================================
  // HERO FREEZE + BUILDER DISCLOSURE — the interaction layer.
  // First interaction of ANY kind (tap/click the card, desktop hover onto
  // the card, tap any control, open the builder) calls _heroFreeze() from
  // the previous edit: rotation stops permanently on the shown card, the
  // cue swaps to the "tap ⟳" hint. ⟳ Surprise me then becomes the resume
  // gesture (it re-rolls once via its existing handler and holds, because
  // _heroFrozen short-circuits the interval). The card never wakes on its
  // own — frozen is permanent (your call in Phase 1).
  // ===================================================================
  (function _heroWireFreeze() {
    const card    = document.getElementById('scResultCard');
    const hero     = document.getElementById('mafcHero');
    const actions  = document.querySelector('.mafc-actions');
    const builder  = document.getElementById('mafcBuilder');

    // One-shot: first qualifying interaction freezes, then this unbinds itself.
    function freezeOnce() {
      _heroFreeze();
      if (card)    card.removeEventListener('click', freezeOnce);
      if (card)    card.removeEventListener('mouseenter', freezeOnce);
      if (actions) actions.removeEventListener('click', freezeOnce, true);
      if (builder) builder.removeEventListener('click', freezeOnce, true);
    }

    // Card: tap (all devices) + hover-onto (desktop only — scoped to the card
    // element, so a mouse crossing to the scrollbar elsewhere doesn't trip it).
    if (card) {
      card.addEventListener('click', freezeOnce);
      card.addEventListener('mouseenter', freezeOnce);
    }
    // Controls: capture-phase so the freeze fires BEFORE the control's own
    // handler runs — but freezeOnce never preventDefaults, so ⟳/chips/toggle
    // still do their real jobs on this same click.
    if (actions) actions.addEventListener('click', freezeOnce, true);
    if (builder) builder.addEventListener('click', freezeOnce, true);
  })();

  // "↓ make your own" — in-place disclosure. Reveals the existing controls
  // beneath the card (no scroll, no navigation, no second card). The controls
  // drive the same #scResultCard. Opening also freezes (via the builder-scoped
  // capture listener above), so by the time the builder can touch the card,
  // rotation is already dead — no timer-vs-builder conflict to manage.
  (function _heroWireBuilderToggle() {
    const toggle   = document.getElementById('mafcBuilderToggle');
    const controls = document.getElementById('mafcControls');
    if (!toggle || !controls) return;
    toggle.addEventListener('click', () => {
      const open = controls.hasAttribute('hidden');
      if (open) controls.removeAttribute('hidden');
      else      controls.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  })();
