// shared.js — helpers used by the homepage (app.js) and /bag, /standings, /parity, /pdai.
// Classic script (no modules, no exports): everything here is a global.
// Load order on every page: coins.js → ladder.js → shared.js → the page's own script.
// Anything defined here must NOT be declared again by a page that loads this file.

// ── Coin price formatter ─────────────────────────────────────────────────
// Used ONLY for live coin prices (board, cards, share cards).
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


// ── Flip card helpers (homepage card + /pdai card) ──────────────────────────

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

// Shrink a hero card's item name until it fits its box on BOTH axes — replaces
// the old length-bucket guess that let long names clip. Fails safe: if the card
// is measured while hidden (0 height), it stays at MAX rather than shrinking to
// the floor. app.js runs it on every render + once after the webfont loads;
// /pdai runs it on its off-screen share card before capturing.
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

// ── DexScreener ─────────────────────────────────────────────────────────────

// Several pairs on one chain in one request, aborted after timeoutMs.
// Returns the pairs keyed by lower-case pair address (DexScreener doesn't keep order).
async function fetchDexPairs(chain, addrs, timeoutMs) {
  const url   = `https://api.dexscreener.com/latest/dex/pairs/${chain}/${addrs.join(',')}`;
  const ctrl  = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  let json;
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    json = await res.json();
  } finally {
    clearTimeout(timer);
  }
  const pairs  = Array.isArray(json.pairs) ? json.pairs : (json.pair ? [json.pair] : []);
  const byAddr = {};
  for (const p of pairs) { if (p && p.pairAddress) byAddr[p.pairAddress.toLowerCase()] = p; }
  return byAddr;
}

// One pair's USD price. Throws if the pair isn't there.
async function fetchPairPrice(dexChain, pair) {
  const url = `https://api.dexscreener.com/latest/dex/pairs/${dexChain}/${pair}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const json = await res.json();
  const pr = json.pair || (Array.isArray(json.pairs) ? json.pairs[0] : null);
  if (!pr || !pr.priceUsd) throw new Error('no pair data');
  return parseFloat(pr.priceUsd);
}


// ── Copy as image ───────────────────────────────────────────────────────────

const _isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

async function loadHtml2Canvas() {
  if (window.html2canvas) return;
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.integrity = 'sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==';
    s.crossOrigin = 'anonymous';
    s.onload = resolve;
    s.onerror = () => reject(new Error('html2canvas failed'));
    document.head.appendChild(s);
  });
}

// Needs a <div class="toast" id="toast"></div> on the page.
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// Put a captured card on the 1080×1080 brand background.
// inset = gap around the card in px (0 = card fills the square).
function brandCanvas(src, inset) {
  const out = document.createElement('canvas'); out.width = 1080; out.height = 1080;
  const ctx = out.getContext('2d');
  const bg = ctx.createLinearGradient(0, 0, 0, 1080); bg.addColorStop(0, '#0d0d1e'); bg.addColorStop(1, '#0a0a14');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 1080, 1080);
  const glow = ctx.createRadialGradient(540, 150, 0, 540, 150, 640); glow.addColorStop(0, 'rgba(46,224,106,0.10)'); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 1080, 1080);
  ctx.drawImage(src, inset, inset, 1080 - 2 * inset, 1080 - 2 * inset);
  return out;
}

function _downloadHref(href, filename) {
  const link = document.createElement('a'); link.download = filename; link.href = href;
  document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

// Hand a finished image to the user: saved as a file on iOS, copied to the
// clipboard everywhere else (saved as a file if the clipboard is refused).
function deliverImage(canvas, filename) {
  if (_isIOS) {
    _downloadHref(canvas.toDataURL('image/png'), filename);
    showToast('saved. attach it to your post.');
    return;
  }
  canvas.toBlob(async blob => {
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      showToast('copied. paste it in your post.');
    } catch {
      const href = URL.createObjectURL(blob);
      _downloadHref(href, filename);
      URL.revokeObjectURL(href);
      showToast('saved. attach it to your post.');
    }
  }, 'image/png');
}
