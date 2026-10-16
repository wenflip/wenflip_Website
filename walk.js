/* ============================================================================
   walk.js  —  the "long walk" chart engine behind /pdai and /hex
   ----------------------------------------------------------------------------
   A real price chart (GeckoTerminal candles, DexScreener live price) on a log
   scale, with every ladder rung between cfg.rungMin and cfg.rungMax drawn on it.
   One coin (/pdai) or two coins sharing one chart (/hex).

   LOAD ORDER: coins.js → ladder.js → shared.js → lightweight-charts → walk.js,
   then the page calls startWalk({...}). Plain classic scripts, no module.

   A page supplies the static markup (header, controls, chart box, share row,
   CTAs) and a config. The engine fills #walkHead, #rungsLeft and #srcNote.

   cfg = {
     slug:      'hex',               // page path, PNG filename, share-card stamp
     coins:     [{ sym, token, color, badge }],
                                     // sym must be in TOKENS (coins.js).
                                     // token = the coin's token address on its chain, so
                                     // GeckoTerminal prices the right side of the pool.
                                     // color/badge only matter on two-coin pages.
     rungMin:   0.0001,              // rungs drawn: LADDER prices in [rungMin, rungMax]
     rungMax:   1,                   // also the goal ("to one US dollar")
     goal:      { name: 'one US dollar', short: '$1' },
     walkFloor: 0.001 | 'auto',      // bottom of "the whole walk". 'auto' = the rung just
                                     // under the lowest price either coin has shown.
   }

   Two-coin pages get a "both | A | B" toggle (#coinSeg). "both" draws each coin as a
   line in its colour; picking one coin shows its candles. The other coin's candles load
   only when it's picked, to stay inside GeckoTerminal's free rate limit.
   ========================================================================== */

function startWalk(cfg) {
  const DUO = cfg.coins.length > 1;
  const GOAL = cfg.rungMax;
  const NEAR_GREEN = 'rgba(46,224,106,0.85)';
  const LINE_DIM = 'rgba(255,255,255,0.13)';
  const RUNGS = LADDER.filter(r => r.price >= cfg.rungMin && r.price <= cfg.rungMax); // price-descending
  const GECKO_NET = { ethereum: 'eth', bsc: 'bsc', base: 'base', pulsechain: 'pulsechain' };
  const TF = {
    '15m': { unit: 'minute', agg: 15 },
    '1h':  { unit: 'hour',   agg: 1 },
    '4h':  { unit: 'hour',   agg: 4 },
    '1d':  { unit: 'day',    agg: 1 },
  };
  const PAGE = 1000;           // GeckoTerminal max candles per request
  const LIVE_MS = 60000;

  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  // multiplier, the way CT says it: 613x, 18.4x, 1.10x
  function fmtX(m) { return (m >= 100 ? Math.round(m).toLocaleString('en-US') : m >= 10 ? m.toFixed(1) : m.toFixed(2)) + 'x'; }
  // Price axis and crosshair labels. Axis ticks are round numbers, so this rounds to 4 significant
  // figures instead of truncating like fmtCoinPrice does (truncating prints a $0.014 tick as $0.01399).
  function fmtAxisPrice(p) {
    if (p == null || !isFinite(p)) return '—';
    if (p >= 1000)   return '$' + Math.round(p).toLocaleString('en-US');
    if (p >= 0.0001) return '$' + Number(p.toPrecision(4));
    return fmtCoinPrice(p);
  }

  const box = $('chartBox');
  const msgEl = $('chartMsg');
  function showMsg(html) { msgEl.innerHTML = html; msgEl.hidden = false; }
  function hideMsg() { msgEl.hidden = true; }

  // ===== coins =====
  const coins = cfg.coins.map((c, i) => ({
    ...c, i, t: TOKENS.find(x => x.sym === c.sym),
    bars: [],               // ascending by time
    tokenParam: c.token,
    exhausted: false, busy: false,
    live: null, lastClose: null,
    hold: null, next: null, // rung objects
    candle: null, line: null, el: null,
  }));
  const priceOf = c => (c.live != null ? c.live : c.lastClose);
  const nameOf = c => c.t ? c.t.sym : c.sym;

  const LC = window.LightweightCharts;
  if (!LC || coins.some(c => !c.t)) {
    showMsg('<span>the chart didn\'t load. refresh and try again.</span>');
    return;
  }

  // "both" (two-coin pages) or a coin's sym. Single-coin pages are always on their coin.
  let show = DUO ? 'both' : coins[0].sym;
  const isVis = c => show === 'both' || show === c.sym;
  const visCoins = () => coins.filter(isVis);

  // ===== header =====
  function flipstripHTML() {
    return `<div class="flipstrip">
        <div class="fs-ends">
          <div class="fs-end"><div class="k">holding</div><div class="n" data-k="hold">—</div><div class="p" data-k="holdP">&nbsp;</div></div>
          <div class="fs-end next"><div class="k">next flip</div><div class="n" data-k="next">—</div><div class="p" data-k="nextP">&nbsp;</div></div>
        </div>
        <div class="fs-bar"><div class="fs-fill" data-k="fill"></div></div>
        <div class="fs-cap"><span data-k="pct">&nbsp;</span><span data-k="fx">&nbsp;</span></div>
      </div>`;
  }
  const head = $('walkHead');
  if (!DUO) {
    const c = coins[0];
    head.innerHTML = `
      <div class="walk-top">
        <div class="walk-id">
          <img class="walk-logo" src="${c.t.logo}" alt="${esc(c.sym)}" width="40" height="40">
          <div>
            <div class="walk-price" data-k="price">—</div>
            <div class="walk-worth" data-k="worth">loading the walk…</div>
          </div>
        </div>
        <div class="walk-x">
          <div class="big" data-k="x">—</div>
          <div class="lbl">to ${esc(cfg.goal.name)}</div>
        </div>
      </div>
      ${flipstripHTML()}`;
    c.el = head;
  } else {
    head.innerHTML = `<div class="duo-cards">${coins.map(c => `
      <div class="duo-card" data-sym="${esc(c.sym)}" style="--coin:${c.color}">
        <div class="walk-top">
          <div class="walk-id">
            <span class="duo-logo"><img class="walk-logo" src="${c.t.logo}" alt="${esc(c.sym)}" width="36" height="36">${c.badge ? `<span class="duo-badge">${esc(c.badge)}</span>` : ''}</span>
            <div>
              <div class="duo-sym">${esc(c.sym)}</div>
              <div class="walk-price" data-k="price">—</div>
            </div>
          </div>
          <div class="walk-x">
            <div class="big" data-k="x">—</div>
            <div class="lbl">to ${esc(cfg.goal.short)}</div>
          </div>
        </div>
        <div class="walk-worth" data-k="worth">loading the walk…</div>
        ${flipstripHTML()}
      </div>`).join('')}</div>
      <div class="duo-gap" id="duoGap">&nbsp;</div>`;
    coins.forEach(c => { c.el = head.querySelector(`.duo-card[data-sym="${c.sym}"]`); });
  }
  const k = (c, key) => c.el.querySelector(`[data-k="${key}"]`);

  // chart source note
  const geckoUrl = c => `https://www.geckoterminal.com/${GECKO_NET[c.t.dexChain] || c.t.dexChain}/pools/${c.t.pairAddress}`;
  $('srcNote').innerHTML = DUO
    ? `chart: GeckoTerminal (${coins.map(c => `<a href="${geckoUrl(c)}" target="_blank" rel="noopener">${esc(c.sym)}</a>`).join(' · ')}) · live price: DexScreener`
    : `chart: <a href="${geckoUrl(coins[0])}" target="_blank" rel="noopener" id="srcLink">GeckoTerminal</a> · live price: DexScreener`;

  // ===== chart =====
  const chart = LC.createChart($('chart'), {
    autoSize: true,
    layout: {
      background: { type: 'solid', color: 'transparent' },
      textColor: '#8a8aa8',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 11,
    },
    grid: {
      vertLines: { color: 'rgba(255,255,255,0.03)' },
      horzLines: { visible: false },
    },
    rightPriceScale: {
      mode: LC.PriceScaleMode.Logarithmic,
      borderColor: 'rgba(255,255,255,0.08)',
      scaleMargins: { top: 0.06, bottom: 0.06 },
    },
    timeScale: { borderColor: 'rgba(255,255,255,0.08)', timeVisible: false, rightOffset: 6 },
    crosshair: { mode: LC.CrosshairMode.Normal },
  });

  // "the whole walk" pins the price axis to floor → goal; "fit to price" autoscales to what's shown.
  let view = 'fit';
  let lowSeen = Infinity;      // lowest price any coin has shown (for walkFloor: 'auto')
  function walkMin() {
    if (cfg.walkFloor !== 'auto') return cfg.walkFloor;
    if (!isFinite(lowSeen)) return 0.001;
    const r = RUNGS.find(r => r.price <= lowSeen);  // first rung at or under the low
    return r ? r.price : cfg.rungMin;
  }
  const walkRange = () => ({ priceRange: { minValue: walkMin() * 0.92, maxValue: GOAL * 1.08 } });
  const priceFormat = { type: 'custom', formatter: fmtAxisPrice, minMove: 1e-8 };

  for (const c of coins) {
    const candleOn = () => !DUO || show === c.sym;
    c.candle = chart.addSeries(LC.CandlestickSeries, {
      upColor: '#2ee06a', downColor: '#c9655c',
      wickUpColor: '#2ee06a', wickDownColor: '#c9655c',
      borderVisible: false,
      visible: candleOn(),
      priceFormat,
      autoscaleInfoProvider: (orig) => {
        if (!candleOn()) return null;
        if (view === 'walk') return walkRange();
        return orig();
      },
    });
    if (DUO) {
      const lineOn = () => show === 'both';
      c.line = chart.addSeries(LC.LineSeries, {
        color: c.color, lineWidth: 2,
        priceLineVisible: false, lastValueVisible: true,
        crosshairMarkerRadius: 3,
        visible: lineOn(),
        priceFormat,
        autoscaleInfoProvider: (orig) => {
          if (!lineOn()) return null;
          if (view === 'walk') return walkRange();
          return orig();
        },
      });
    }
  }

  // Rung lines hang off one series. One coin: its candles. Two coins: an invisible "anchor"
  // line that's always on, so the rungs stay put whichever coin is showing. It carries a copy
  // of one coin's closes only so the price scale can place lines; it never draws and never
  // drives autoscale (except in "the whole walk", where every series asks for the same range).
  const anchor = DUO
    ? chart.addSeries(LC.LineSeries, {
        color: 'rgba(0,0,0,0)', lineVisible: false, pointMarkersVisible: false,
        lastValueVisible: false, priceLineVisible: false, crosshairMarkerVisible: false,
        priceFormat,
        autoscaleInfoProvider: () => (view === 'walk' ? walkRange() : null),
      })
    : coins[0].candle;

  // ===== rung lines + labels =====
  const labelsEl = $('rungLabels');
  const rungs = RUNGS.map(r => {
    const line = anchor.createPriceLine({
      price: r.price, lineWidth: 1, lineStyle: LC.LineStyle.Dashed,
      color: LINE_DIM,
      axisLabelVisible: false, title: '',
    });
    const el = document.createElement('div');
    el.className = 'rl';
    el.textContent = r.name + ' · ' + fmtItemPrice(r.price);
    labelsEl.appendChild(el);
    return { r, line, el, near: null, shown: false, y: null };   // near = highlight colour or null
  });

  // the rungs hugging a price: [next rung up, rung it's holding]
  function rungsAround(price) {
    let up = null, hold = null;
    for (const g of rungs) {             // rungs are price-descending
      if (g.r.price > price) up = g;
      else { hold = g; break; }
    }
    return [up, hold];
  }

  // Highlight the two rungs around each visible coin's price, in that coin's colour
  // (green on single-coin pages).
  function refreshNear() {
    const want = new Map();
    for (const c of visCoins()) {
      const p = priceOf(c);
      if (p == null) continue;
      for (const g of rungsAround(p)) if (g && !want.has(g)) want.set(g, DUO ? c.color : NEAR_GREEN);
    }
    for (const g of rungs) {
      const col = want.get(g) || null;
      if (col === g.near) continue;
      g.near = col;
      g.el.classList.toggle('near', !!col);
      g.el.style.color = DUO && col ? col : '';
      g.line.applyOptions({
        color: col || LINE_DIM,
        lineStyle: col ? LC.LineStyle.Solid : LC.LineStyle.Dashed,
      });
    }
  }

  // Label culling: every rung keeps its line; names only show where they fit.
  // Priority: the rungs hugging a price, then whatever's closest to a price.
  const LABEL_GAP = 15;
  function layoutLabels() {
    const paneH = box.clientHeight - chart.timeScale().height();
    const refs = visCoins().map(priceOf).filter(p => p != null);
    if (!refs.length) refs.push(0.003);
    const cand = [];
    for (const g of rungs) {
      const y = anchor.priceToCoordinate(g.r.price);
      g.y = y;
      if (y == null || y < 14 || y > paneH - 2) continue;
      if (y > paneH - 34 && !g.near) continue; // keep clear of the TradingView logo, bottom-left
      let d = Infinity;
      for (const p of refs) d = Math.min(d, Math.abs(Math.log10(g.r.price / p)));
      cand.push({ g, y, prio: (g.near ? 0 : 1) * 1000 + d });
    }
    cand.sort((a, b) => a.prio - b.prio);
    const placed = [];
    const on = new Set();
    for (const c of cand) {
      if (placed.some(y => Math.abs(y - c.y) < LABEL_GAP)) continue;
      placed.push(c.y); on.add(c.g);
    }
    for (const g of rungs) {
      const s = on.has(g);
      if (s) g.el.style.transform = `translateY(${Math.round(g.y) - 1}px) translateY(-100%)`;
      if (s !== g.shown) { g.el.style.display = s ? 'block' : 'none'; g.shown = s; }
    }
  }
  // Price-axis drags don't fire an event, so re-lay labels every frame (cheap).
  (function tick(){ layoutLabels(); requestAnimationFrame(tick); })();

  // ===== candles from GeckoTerminal, paged backwards as you scroll left =====
  let tf = '1d';
  let loadSeq = 0;

  async function fetchCandles(c, beforeTs) {
    const t = TF[tf];
    const net = GECKO_NET[c.t.dexChain] || c.t.dexChain;
    const q = new URLSearchParams({ aggregate: t.agg, limit: PAGE, currency: 'usd', token: c.tokenParam });
    if (beforeTs) q.set('before_timestamp', beforeTs);
    const url = `https://api.geckoterminal.com/api/v2/networks/${net}/pools/${c.t.pairAddress}/ohlcv/${t.unit}?${q}`;
    const res = await fetch(url);
    if (res.status === 429) throw new Error('rate');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const list = json?.data?.attributes?.ohlcv_list || [];
    return list
      .map(([ts, o, h, l, c]) => ({ time: ts, open: +o, high: +h, low: +l, close: +c }))
      .filter(b => b.close > 0)
      .sort((a, b) => a.time - b.time);
  }

  // If GeckoTerminal priced the wrong side of the pool, the close will be miles off DexScreener's live price.
  function looksInverted(c, list) {
    if (!c.live || !list.length) return false;
    const ratio = list[list.length - 1].close / c.live;
    return ratio > 20 || ratio < 0.05;
  }

  function noteLow(p) { if (p > 0 && p < lowSeen) lowSeen = p; }

  // push a coin's bars into its series (and the anchor, if it's the anchor's source)
  let anchorSrc = null;
  function pushData(c) {
    c.candle.setData(c.bars);
    if (c.line) c.line.setData(c.bars.map(b => ({ time: b.time, value: b.close })));
    if (DUO && (anchorSrc === null || anchorSrc === c || !anchorSrc.bars.length)) {
      anchorSrc = c;
      anchor.setData(c.bars.map(b => ({ time: b.time, value: b.close })));
    }
    for (const b of c.bars) noteLow(b.low);
  }

  async function firstPage(c) {
    let list;
    try { list = await fetchCandles(c); }
    catch (e) {
      if (c.tokenParam !== 'base' && /HTTP 4/.test(e.message)) { c.tokenParam = 'base'; list = await fetchCandles(c); }
      else throw e;
    }
    if (looksInverted(c, list)) {
      c.tokenParam = c.tokenParam === 'quote' ? 'base' : 'quote';
      list = await fetchCandles(c);
    }
    return list;
  }

  // Load the first page for every visible coin that doesn't have one yet for this timeframe.
  // One at a time, so two coins don't double up on GeckoTerminal's rate limit.
  // fresh = new timeframe (or first load): also open on the most recent stretch.
  async function loadVisible(fresh) {
    const seq = loadSeq;
    const todo = visCoins().filter(c => !c.bars.length && !c.busy);
    if (!todo.length) return;
    showMsg('<span>loading the chart…</span>');
    let err = null, anyEmpty = false;
    for (const c of todo) {
      c.busy = true;
      try {
        const list = await firstPage(c);
        if (seq !== loadSeq) return;
        if (!list.length) { anyEmpty = true; continue; }
        c.bars = list;
        c.exhausted = list.length < PAGE;
        c.lastClose = list[list.length - 1].close;
        pushData(c);
        if (c.live == null) updateCoin(c);
        else applyLiveToLastBar(c);
      } catch (e) {
        if (seq !== loadSeq) return;
        err = err || e;
      } finally {
        c.busy = false;
      }
    }
    if (seq !== loadSeq) return;
    chart.timeScale().applyOptions({ timeVisible: tf !== '1d' });
    const loaded = visCoins().filter(c => c.bars.length);
    if (!loaded.length) {
      if (err) {
        showMsg(`<span>${err.message === 'rate' ? 'too many requests. give it a few seconds.' : 'couldn\'t load the chart history.'}</span><button type="button" id="retryBtn">try again</button>`);
        $('retryBtn').onclick = () => loadVisible(fresh);
      } else if (anyEmpty) {
        showMsg('<span>no candles for this timeframe yet.</span>');
      }
      return;
    }
    if (fresh) {
      // open on the most recent stretch, like DexScreener; drag left for older history
      const SHOW = { '15m': 192, '1h': 168, '4h': 180, '1d': 180 }[tf];
      const n = new Set(loaded.flatMap(c => c.bars.map(b => b.time))).size;
      chart.timeScale().setVisibleLogicalRange({ from: Math.max(0, n - SHOW), to: n + 5 });
    }
    hideMsg();
    refreshAll();
    if (err) showToast(`couldn't load ${todo.filter(c => !c.bars.length).map(nameOf).join(' + ')} history. try again in a bit.`);
  }

  function newTimeframe() {
    ++loadSeq;
    for (const c of coins) {
      c.bars = []; c.exhausted = false; c.busy = false;
      c.candle.setData([]);
      if (c.line) c.line.setData([]);
    }
    if (DUO) { anchorSrc = null; anchor.setData([]); }
    loadVisible(true);
  }

  const moreEl = $('loadingMore');
  let olderBusy = false;
  async function loadOlder() {
    if (olderBusy) return;
    const todo = visCoins().filter(c => c.bars.length && !c.exhausted && !c.busy);
    if (!todo.length) return;
    const seq = loadSeq;
    olderBusy = true; moreEl.hidden = false;
    try {
      const got = [];
      for (const c of todo) {
        const older = (await fetchCandles(c, c.bars[0].time)).filter(b => b.time < c.bars[0].time);
        if (seq !== loadSeq) return;
        got.push([c, older]);
      }
      // Keep the view still while history slides in on the left: measure how far a known
      // bar's logical index moves and shift the visible range by the same amount.
      const ts = chart.timeScale();
      const lr = ts.getVisibleLogicalRange();
      const pin = todo[0].bars[todo[0].bars.length - 1].time;
      const canPin = typeof ts.timeToIndex === 'function';
      const before = canPin ? ts.timeToIndex(pin, true) : null;
      const newTimes = new Set();
      const known = new Set(coins.flatMap(c => c.bars.map(b => b.time)));
      for (const [c, older] of got) {
        if (!older.length) { c.exhausted = true; continue; }
        if (older.length < PAGE - 1) c.exhausted = true;
        for (const b of older) if (!known.has(b.time)) newTimes.add(b.time);
        c.bars = older.concat(c.bars);
        pushData(c);
      }
      const after = canPin ? ts.timeToIndex(pin, true) : null;
      const shift = (before != null && after != null) ? after - before : newTimes.size;
      if (lr && shift) ts.setVisibleLogicalRange({ from: lr.from + shift, to: lr.to + shift });
    } catch (e) {
      // rate limited or network blip: wait, then let the next scroll try again
      await new Promise(r => setTimeout(r, e.message === 'rate' ? 10000 : 3000));
    } finally {
      olderBusy = false;
      moreEl.hidden = true;
    }
  }
  chart.timeScale().subscribeVisibleLogicalRangeChange(lr => {
    if (lr && lr.from < 30) loadOlder();
  });

  // ===== live price from DexScreener (same source as the rest of the site) =====
  // Both coins in one request when they share a chain.
  async function fetchLive() {
    const byChain = {};
    for (const c of coins) (byChain[c.t.dexChain] = byChain[c.t.dexChain] || []).push(c);
    await Promise.all(Object.entries(byChain).map(async ([chain, cs]) => {
      try {
        const pairs = await fetchDexPairs(chain, cs.map(c => c.t.pairAddress), 10000);
        for (const c of cs) {
          const pr = pairs[c.t.pairAddress.toLowerCase()];
          const p = pr && parseFloat(pr.priceUsd);
          if (p > 0) { c.live = p; noteLow(p); applyLiveToLastBar(c); }
        }
      } catch (e) { /* keep the last good price */ }
    }));
    refreshAll();
    setTimeout(fetchLive, LIVE_MS);
  }
  function applyLiveToLastBar(c) {
    if (!c.bars.length || c.live == null) return;
    const b = c.bars[c.bars.length - 1];
    // only nudge the newest candle if the live price is plausibly the same series
    if (c.live / b.close > 3 || c.live / b.close < 0.33) return;
    const nb = { ...b, close: c.live, high: Math.max(b.high, c.live), low: Math.min(b.low, c.live) };
    c.bars[c.bars.length - 1] = nb;
    c.candle.update(nb);
    if (c.line) c.line.update({ time: nb.time, value: nb.close });
  }

  // ===== header, flip strip, footer =====
  function updateCoin(c) {
    const p = priceOf(c);
    if (p == null) return;
    k(c, 'price').textContent = fmtCoinPrice(p);
    // findRungIndex returns the cheapest rung for anything below the floor, so check the floor here
    const worth = p >= LADDER[LADDER.length - 1].price ? LADDER[findRungIndex(p)] : null;
    k(c, 'worth').innerHTML = worth ? `worth <b>${esc(worth.name)}</b>` : 'worth less than a toothbrush bristle';
    k(c, 'x').textContent = p >= GOAL ? 'flipped' : fmtX(GOAL / p);
    const [up, hold] = rungsAround(p);
    c.next = up; c.hold = hold;
    const H = hold && hold.r, N = up && up.r;
    k(c, 'hold').textContent = H ? H.name : 'nothing on this stretch';
    k(c, 'holdP').textContent = H ? fmtItemPrice(H.price) : `below ${fmtItemPrice(cfg.rungMin)}`;
    k(c, 'next').textContent = N ? N.name : `${cfg.goal.name}. flipped.`;
    k(c, 'nextP').textContent = N ? fmtItemPrice(N.price) : '';
    const fill = k(c, 'fill'), pctEl = k(c, 'pct'), xEl = k(c, 'fx');
    if (H && N) {
      // same gap math as the homepage card (flipProgressPct), so the page, the share card
      // and the homepage always show the same %
      const pct = flipProgressPct(p, H, N);
      fill.style.width = pct + '%';
      pctEl.innerHTML = `<b>${pct}%</b> of the way`;
      xEl.innerHTML = `<b>${fmtX(N.price / p)}</b> to flip`;
    } else if (N) {
      fill.style.width = '0%'; pctEl.innerHTML = '&nbsp;'; xEl.innerHTML = `<b>${fmtX(N.price / p)}</b> to flip`;
    } else {
      fill.style.width = '100%'; pctEl.innerHTML = 'the walk is over.'; xEl.innerHTML = '&nbsp;';
    }
  }

  const rungsLeftTo = p => RUNGS.filter(r => r.price > p).length;
  function updateFooter() {
    const el = $('rungsLeft');
    const shown = visCoins().filter(c => priceOf(c) != null);
    if (!shown.length) return;
    if (shown.length === 1) {
      const c = shown[0], left = rungsLeftTo(priceOf(c));
      el.innerHTML = left
        ? `<b>${left}</b> rung${left === 1 ? '' : 's'} left to ${esc(cfg.goal.name)}`
        : `${esc(c.sym)} flipped ${esc(cfg.goal.name)}.`;
    } else {
      el.innerHTML = shown.map(c => `${esc(c.sym)} <b>${rungsLeftTo(priceOf(c))}</b>`).join(' · ')
        + ` rungs left to ${esc(cfg.goal.name)}`;
    }
  }

  // "eHEX is 1.84x HEX. same coin. 3 rungs apart."
  function gapInfo() {
    const [a, b] = coins;
    const pa = priceOf(a), pb = priceOf(b);
    if (pa == null || pb == null) return null;
    const [hi, lo] = pa >= pb ? [a, b] : [b, a];
    const ph = priceOf(hi), pl = priceOf(lo);
    const ratio = ph / pl;
    const apart = RUNGS.filter(r => r.price > pl && r.price <= ph).length;
    return { hi, lo, ratio, apart, even: ratio < 1.005 };
  }
  function updateGap() {
    const el = $('duoGap');
    if (!el) return;
    const g = gapInfo();
    if (!g) return;
    if (g.even) { el.innerHTML = `${esc(coins[0].sym)} and ${esc(coins[1].sym)} are dead even. same coin. same price.`; return; }
    const apart = g.apart === 0 ? 'same rung.' : `<b>${g.apart}</b> rung${g.apart === 1 ? '' : 's'} apart.`;
    el.innerHTML = `<b>${esc(g.hi.sym)}</b> is <b>${fmtX(g.ratio)}</b> ${esc(g.lo.sym)}. same coin. ${apart}`;
  }

  function refreshAll() {
    coins.forEach(updateCoin);
    refreshNear();
    updateFooter();
    if (DUO) updateGap();
  }

  // ===== share card =====
  // The homepage flip card, with two walk-page touches: the pill shows the walk to the goal
  // (instead of the 24h %), and the stamp points at this page. On two-coin pages the card
  // follows the toggle: one coin → the normal card; "both" → one row per coin.
  const pill = p => p >= GOAL ? `past ${cfg.goal.short}` : `${fmtX(GOAL / p)} to ${cfg.goal.short}`;
  const stamp = () => {
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `<div class="wf-stamp"><span>${dateStr}</span><span>@wenflips</span><span>wenflip.com/${esc(cfg.slug)}</span></div>`;
  };

  function renderShareCard(c) {
    const p = priceOf(c);
    const idx = findRungIndex(p);
    const cleared = LADDER[idx], next = LADDER[idx - 1];
    const belowFloor = p < LADDER[LADDER.length - 1].price;
    let hero, foot = '';
    if (belowFloor) {
      const pct = Math.min(99, Math.round((p / cleared.price) * 100));
      hero = `<div class="pump-flips-lbl wf-chase">CHASING</div><div class="pump-dream-name">${esc(cleared.name)}</div>`;
      foot = `<div class="pump-divider"></div>
        <div class="wf-receipt">not on the board yet · <b>${pct}%</b> of the way there</div>
        <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1, pct)}%"></div></div>`;
    } else if (!next) {
      hero = `<div class="pump-flips-lbl">CLEARED EVERYTHING ✓</div><div class="pump-dream-name">the entire ladder</div>`;
    } else {
      const pct = flipProgressPct(p, cleared, next);
      hero = `<div class="pump-flips-lbl">FLIPPED ✓</div><div class="pump-dream-name">${esc(cleared.name)}</div>`;
      foot = `<div class="pump-divider"></div>
        <div class="wf-receipt">${pct}% to <span class="wf-to">${esc(next.name)}</span></div>
        <div class="sc-bar-track"><div class="sc-bar-fill" style="width:${Math.max(1, pct)}%"></div></div>`;
    }
    const card = $('shotCard');
    card.innerHTML = `
      <div class="wf-head">
        <img class="pump-logo" src="${c.t.logo}" alt="${esc(c.sym)}"/>
        <div class="pump-coin-id">
          <div class="pump-coin-sym">${esc(c.sym)}</div>
          <div class="pump-coin-name-sm"><span class="wf-coin-name">${esc(c.t.name)} · </span>${fmtCoinPrice(p)}</div>
        </div>
        <div class="wf-chg-pill up">${pill(p)}</div>
      </div>
      <div class="pump-dream-obj">${hero}</div>
      <div class="wf-foot">${foot}${stamp()}</div>`;
    fitHeroName(card);
    return card;
  }

  function renderDuoCard() {
    const g = gapInfo();
    const rows = coins.map(c => {
      const p = priceOf(c);
      const belowFloor = p < LADDER[LADDER.length - 1].price;
      const r = LADDER[findRungIndex(p)];
      const lbl = belowFloor ? '<div class="duo-row-lbl wf-chase">CHASING</div>' : '<div class="duo-row-lbl">FLIPPED ✓</div>';
      return `<div class="duo-row" style="--coin:${c.color}">
          <div class="duo-row-k">${esc(c.sym)} · ${fmtCoinPrice(p)} · ${pill(p)}</div>
          ${lbl}<div class="duo-row-name">${esc(r.name)}</div>
        </div>`;
    }).join('');
    const card = $('shotCard');
    card.innerHTML = `
      <div class="wf-head">
        <img class="pump-logo" src="${coins[0].t.logo}" alt="${esc(coins[0].sym)}"/>
        <div class="pump-coin-id">
          <div class="pump-coin-sym">${coins.map(c => esc(c.sym)).join(' vs ')}</div>
          <div class="pump-coin-name-sm">same coin. two prices.</div>
        </div>
        <div class="wf-chg-pill up">${g.even ? 'dead even' : fmtX(g.ratio) + ' apart'}</div>
      </div>
      <div class="pump-dream-obj duo-hero">${rows}</div>
      <div class="wf-foot">${stamp()}</div>`;
    return card;
  }

  const pngBtn = $('pngBtn'), pngIcon = $('pngIcon'), pngText = $('pngText');
  function resetPngBtn() {
    pngBtn.disabled = false;
    pngIcon.className = _isIOS ? 'ico ico-download' : 'ico ico-clipboard';
    pngText.textContent = _isIOS ? 'Save image' : 'Copy as image';
  }
  pngBtn.addEventListener('click', async () => {
    const cardCoins = visCoins();
    if (cardCoins.some(c => c.live == null)) { showToast('No price yet — give it a second 😬'); return; }
    pngBtn.disabled = true; pngIcon.className = 'ico ico-spin'; pngText.textContent = 'Generating…';
    try {
      await loadHtml2Canvas();
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      const card = cardCoins.length > 1 ? renderDuoCard() : renderShareCard(cardCoins[0]);
      const src = await window.html2canvas(card, { backgroundColor: null, scale: 3, useCORS: true, logging: false });
      deliverImage(brandCanvas(src, 0), `wenflip-${cfg.slug}.png`);
    } catch (err) { console.error(err); showToast('Screenshot failed — try again 😬'); }
    finally { resetPngBtn(); }
  });
  $('linkBtn').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.origin + '/' + cfg.slug); showToast('Link copied 🔗'); }
    catch { showToast('Copy failed — grab it from the address bar'); }
  });
  resetPngBtn();

  // ===== controls =====
  function wireSeg(id, attr, onPick) {
    document.querySelectorAll(`#${id} button`).forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll(`#${id} button`).forEach(b => b.classList.toggle('active', b === btn));
        onPick(btn.getAttribute(attr));
      });
    });
  }
  wireSeg('tfSeg', 'data-tf', v => { if (v !== tf) { tf = v; newTimeframe(); } });
  wireSeg('viewSeg', 'data-view', v => {
    view = v;
    // re-enable autoscale in case someone dragged the axis by hand
    chart.priceScale('right').applyOptions({ autoScale: true });
  });
  if (DUO && $('coinSeg')) {
    // the dots in the toggle double as the chart legend
    document.querySelectorAll('#coinSeg button[data-coin]').forEach(btn => {
      const c = coins.find(c => c.sym === btn.getAttribute('data-coin'));
      if (c) btn.insertAdjacentHTML('afterbegin', `<span class="dot" style="background:${c.color}"></span>`);
    });
    wireSeg('coinSeg', 'data-coin', v => {
      if (v === show) return;
      show = v;
      for (const c of coins) {
        c.candle.applyOptions({ visible: show === c.sym });
        c.line.applyOptions({ visible: show === 'both' });
      }
      chart.priceScale('right').applyOptions({ autoScale: true });
      refreshAll();
      loadVisible(!coins.some(c => c.bars.length));
    });
  }

  // ===== kickoff =====
  fetchLive();
  loadVisible(true);
}
