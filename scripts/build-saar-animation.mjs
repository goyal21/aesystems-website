// Generates design/saar-architecture-loop.html — a single self-contained
// animated SVG diagram of the SAAR AI-BMS control loop. Run with:
//   node scripts/build-saar-animation.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const poppins400 = fs
  .readFileSync(
    path.join(root, "node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff2"),
  )
  .toString("base64");
const poppins600 = fs
  .readFileSync(
    path.join(root, "node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff2"),
  )
  .toString("base64");

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------
const W = 1920;
const H = 864; // 1080 * 0.8 — 20% shorter, wider landscape framing

const cloud = { cx: 960, cy: 160, r: 108 };
const ctrl = { x: 830, y: 362, w: 260, h: 120 };
const busY = 530;
const equipTopY = 614;
const equipH = 170;
const equipW = 230;

const equip = [
  { key: "chiller", label: "Chiller", cx: 300, proto: "RS485" },
  { key: "pumps", label: "Pump", cx: 745, proto: "Modbus" },
  { key: "tower", label: "Cooling Tower", cx: 1180, proto: "Modbus" },
  { key: "ahu", label: "AHU / VFD", cx: 1620, proto: "BACnet" },
];

const dash = { x: 1560, y: 95, w: 300, h: 210 };
const result = { x: 1560, y: 345, w: 300, h: 160 };

// Result figure is static — always "30%", no count-up.
const RESULT_VALUE = 30;

// ---------------------------------------------------------------------------
// Path helpers — orthogonal polylines with rounded corners
// ---------------------------------------------------------------------------
function sign(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}

function roundedPath(points, r = 8) {
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const next = points[i + 1];
    const inX = sign(cur.x - prev.x);
    const inY = sign(cur.y - prev.y);
    const outX = sign(next.x - cur.x);
    const outY = sign(next.y - cur.y);
    const p1 = { x: cur.x - inX * r, y: cur.y - inY * r };
    const p2 = { x: cur.x + outX * r, y: cur.y + outY * r };
    d += `L ${p1.x} ${p1.y} Q ${cur.x} ${cur.y} ${p2.x} ${p2.y} `;
  }
  const last = points[points.length - 1];
  d += `L ${last.x} ${last.y}`;
  return d;
}

// Equipment <-> controller path, ordered equipment -> controller (the
// "sense" direction). Reversing offset-distance 100%->0% gives "act".
function equipPath(e) {
  return roundedPath([
    { x: e.cx, y: equipTopY },
    { x: e.cx, y: busY },
    { x: 960, y: busY },
    { x: 960, y: ctrl.y + ctrl.h },
  ]);
}

// Trunk path, ordered controller -> cloud (the "sense" direction).
const trunkPoints = [
  { x: 960, y: ctrl.y },
  { x: 960, y: cloud.cy + cloud.r - 4 },
];
const trunkPath = roundedPath(trunkPoints, 0);

const cloudDashPath = roundedPath(
  [
    { x: cloud.cx + cloud.r - 2, y: cloud.cy },
    { x: 1320, y: cloud.cy },
    { x: 1320, y: dash.y + 46 },
    { x: dash.x, y: dash.y + 46 },
  ],
  8,
);

// ---------------------------------------------------------------------------
// Icons — simple line-art per equipment type
// ---------------------------------------------------------------------------

// AC/chiller unit: cabinet with two top vent caps, a grille on the left,
// and three stage-indicator bars on the right (the middle one dims later).
function chillerIcon(e) {
  const cx = e.cx;
  const bx = cx - 45;
  const by = equipTopY + 32;
  const bw = 90;
  const bh = 54;
  const grille = [0, 1, 2, 3]
    .map(
      (i) =>
        `<line x1="${bx + 10 + i * 8}" y1="${by + 10}" x2="${bx + 10 + i * 8}" y2="${by + bh - 10}" stroke="var(--silver)" stroke-width="1.2"/>`,
    )
    .join("");
  return `
  <g class="icon icon-chiller">
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="6" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
    <rect x="${bx + 10}" y="${by - 8}" width="20" height="9" rx="3" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
    <rect x="${bx + bw - 30}" y="${by - 8}" width="20" height="9" rx="3" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
    ${grille}
    <rect class="stage-bar sb-0" x="${bx + bw - 34}" y="${by + 9}" width="24" height="7" rx="2" fill="var(--silver)"/>
    <rect class="stage-bar sb-1" x="${bx + bw - 34}" y="${by + 23}" width="24" height="7" rx="2" fill="var(--silver)"/>
    <rect class="stage-bar sb-2" x="${bx + bw - 34}" y="${by + 37}" width="24" height="7" rx="2" fill="var(--silver)"/>
  </g>`;
}

// Chunky rounded paddle blades — an ellipse offset from and stretching away
// from the hub reads as a proper fan silhouette even at small render sizes,
// unlike a thin bezier lens which collapses into a plus-sign at this scale.
function fanBlades(count, length, width, color = "var(--silver)") {
  const step = 360 / count;
  const half = (length / 2).toFixed(1);
  return Array.from({ length: count }, (_, i) => i * step)
    .map(
      (a) =>
        `<ellipse cx="${half}" cy="0" rx="${half}" ry="${width}" transform="rotate(${a})" fill="${color}"/>`,
    )
    .join("");
}

function polarPoint(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// A 270° speedometer-style arc (gap at the bottom) using pathLength="100" so
// stroke-dasharray/dashoffset can work directly in percent units.
function gaugeArcPath(cx, cy, r) {
  const start = polarPoint(cx, cy, r, -135);
  const end = polarPoint(cx, cy, r, 135);
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 1 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function speedGauge(cx, cy, fromPct, toPct) {
  const r = 23;
  const d = gaugeArcPath(cx, cy, r);
  const fromOffset = 100 - fromPct;
  const toOffset = 100 - toPct;
  return `
  <g>
    <path d="${d}" fill="none" stroke="var(--line)" stroke-width="6" stroke-linecap="round" pathLength="100"/>
    <path class="speed-dial" d="${d}" fill="none" stroke="var(--teal)" stroke-width="6" stroke-linecap="round"
      pathLength="100" stroke-dasharray="100" style="--dial-from:${fromOffset}; --dial-to:${toOffset}"/>
  </g>
  <text class="speed-label speed-label-from" x="${cx}" y="${cy + 42}" text-anchor="middle" fill="var(--ghost)" font-size="14" font-weight="600">${fromPct}%</text>
  <text class="speed-label speed-label-to" x="${cx}" y="${cy + 42}" text-anchor="middle" fill="var(--ghost)" font-size="14" font-weight="600">${toPct}%</text>`;
}

// Small glyphs for the dashboard KPI tiles.
function tileGlyph(kind, cx, cy) {
  if (kind === "bolt") {
    return `<path d="M${cx + 2},${cy - 6} l-6,7 h4 l-2,6 l6,-7 h-4 Z" fill="var(--teal)"/>`;
  }
  if (kind === "chart") {
    return `<polyline points="${cx - 6},${cy + 4} ${cx - 2},${cy - 2} ${cx + 2},${cy + 1} ${cx + 6},${cy - 6}"
      fill="none" stroke="var(--teal)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${cx + 6}" cy="${cy - 6}" r="1.6" fill="var(--teal)"/>`;
  }
  // "activity" — sun-like burst
  const spokes = [0, 45, 90, 135]
    .map((a) => `<line x1="0" y1="-8" x2="0" y2="-5.5" transform="rotate(${a})" stroke="var(--teal)" stroke-width="1.4"/>`)
    .join("");
  return `<g transform="translate(${cx},${cy})"><circle r="3.4" fill="none" stroke="var(--teal)" stroke-width="1.4"/>${spokes}</g>`;
}

function dashTile(x, y, w, h, icon, value, caption) {
  const iconCx = x + 14;
  const iconCy = y + 16;
  return `
  <rect class="tile" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="var(--teal)" stroke-width="1.5"/>
  ${tileGlyph(icon, iconCx, iconCy)}
  <text x="${iconCx + 12}" y="${iconCy + 5}" font-family="'Poppins'" font-weight="600" font-size="15" fill="var(--ghost)">${value}</text>
  <text x="${x + 8}" y="${y + 36}" font-family="'Poppins'" font-size="8" letter-spacing="1" fill="var(--dim)">${caption}</text>`;
}

// Standard P&ID centrifugal-pump symbol: circular volute casing with a
// rotating impeller (drawn as a triangle — the conventional flow-direction
// arrow used in engineering schematics), a motor block on top, and a
// discharge nozzle — far more recognisable as "pump" than fan blades.
function pumpIcon(e) {
  const cx = e.cx;
  const cy = equipTopY + 58;
  const bodyCx = cx - 32;
  const r = 15;
  return `
  <g class="icon icon-pump">
    <rect x="${bodyCx - 10}" y="${cy - r - 16}" width="20" height="12" rx="3" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
    <line x1="${bodyCx}" y1="${cy - r - 4}" x2="${bodyCx}" y2="${cy - r}" stroke="var(--silver)" stroke-width="1.5"/>
    <circle cx="${bodyCx}" cy="${cy}" r="${r}" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
    <rect x="${bodyCx + r - 3}" y="${cy - 5}" width="13" height="10" rx="2" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
    <g transform="translate(${bodyCx},${cy})">
      <g class="impeller-spin">
        <path d="M0,0 L${(r * 0.6).toFixed(1)},${(-r * 0.4).toFixed(1)} L${(r * 0.6).toFixed(1)},${(r * 0.4).toFixed(1)} Z" fill="var(--teal)"/>
      </g>
    </g>
  </g>
  ${speedGauge(cx + 34, cy, 100, 65)}`;
}

function towerIcon(e) {
  const cx = e.cx;
  const cy = equipTopY + 58;
  const bodyCx = cx - 32;
  const bw = 32;
  const bh = 40;
  const bodyTop = cy - bh / 2 + 10;
  const louvre = [0, 1, 2]
    .map(
      (i) =>
        `<line x1="${bodyCx - bw / 2 + 4}" y1="${bodyTop + 8 + i * 10}" x2="${bodyCx + bw / 2 - 4}" y2="${bodyTop + 8 + i * 10}" stroke="var(--silver)" stroke-width="1"/>`,
    )
    .join("");
  const waves = [0, 1]
    .map(
      (i) =>
        `<path d="M${bodyCx - 9 + i * 9},${bodyTop - 12 - i * 5} q4,-6 8,0" fill="none" stroke="var(--silver)" stroke-width="1.2" opacity="${(0.65 - i * 0.2).toFixed(2)}"/>`,
    )
    .join("");
  return `
  <g class="icon icon-tower">
    <rect x="${bodyCx - bw / 2}" y="${bodyTop}" width="${bw}" height="${bh}" rx="4" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
    ${louvre}
    ${waves}
    <g transform="translate(${bodyCx},${bodyTop - 2})">
      <g class="fan">
        <circle r="15" fill="none" stroke="var(--teal)" stroke-width="1.5"/>
        ${fanBlades(4, 12, 5, "var(--teal)")}
      </g>
    </g>
  </g>
  ${speedGauge(cx + 34, cy, 100, 60)}`;
}

// Motor (ribbed barrel on a base) + VFD control box with a status bolt.
function ahuIcon(e) {
  const cx = e.cx;
  const cy = equipTopY + 58;
  const motorCx = cx - 36;
  const ribs = [0, 1, 2, 3]
    .map((i) => `<line x1="${motorCx - 15}" y1="${cy - 9 + i * 6}" x2="${motorCx + 15}" y2="${cy - 9 + i * 6}" stroke="var(--silver)" stroke-width="1"/>`)
    .join("");
  const vfdX = cx + 4;
  return `
  <g class="icon icon-ahu">
    <g>
      <rect x="${motorCx - 15}" y="${cy - 15}" width="30" height="28" rx="6" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
      ${ribs}
      <rect x="${motorCx - 9}" y="${cy + 13}" width="18" height="5" rx="1" fill="none" stroke="var(--silver)" stroke-width="1.2"/>
    </g>
    <g>
      <rect x="${vfdX}" y="${cy - 24}" width="32" height="46" rx="5" fill="none" stroke="var(--silver)" stroke-width="1.5"/>
      <path class="vfd-bolt" d="M${vfdX + 20},${cy - 14} l-10,12 h6 l-3,10 l10,-12 h-6 Z" fill="var(--teal)"/>
      <circle cx="${vfdX + 9}" cy="${cy + 14}" r="2" fill="var(--silver)"/>
      <circle cx="${vfdX + 23}" cy="${cy + 14}" r="2" fill="var(--silver)"/>
    </g>
  </g>`;
}

const iconFns = { chiller: chillerIcon, pumps: pumpIcon, tower: towerIcon, ahu: ahuIcon };

// ---------------------------------------------------------------------------
// Pulse dots along a path
// ---------------------------------------------------------------------------
function pulseDotsInline({ d, color, count, dotDelayMs, groupClass }) {
  let out = "";
  for (let i = 0; i < count; i++) {
    out += `<circle class="pulse ${groupClass}" r="6" fill="${color}" filter="url(#glow)"
      style="offset-path:path('${d}'); animation-delay:${dotDelayMs * i}ms;"/>\n`;
  }
  return out;
}

// Dim label -> three quick colour blinks -> hold bright -> fade back to dim.
function blinkKeyframes(name, color, start, end, dimColor = "var(--silver)", dimOpacity = 0.35) {
  const blinkSpan = Math.max((end - start) * 0.35, 3);
  const b1 = start + blinkSpan * 0.22;
  const b2 = start + blinkSpan * 0.48;
  const b3 = start + blinkSpan * 0.74;
  const holdStart = start + blinkSpan;
  const fadeStart = end - 1.5;
  return `
  @keyframes ${name}{
    0%,${start.toFixed(2)}%{ opacity:${dimOpacity}; fill:${dimColor}; }
    ${(start + 0.3).toFixed(2)}%{ opacity:1; fill:${color}; }
    ${b1.toFixed(2)}%{ opacity:.15; fill:${color}; }
    ${b2.toFixed(2)}%{ opacity:1; fill:${color}; }
    ${b3.toFixed(2)}%{ opacity:.15; fill:${color}; }
    ${holdStart.toFixed(2)}%,${fadeStart.toFixed(2)}%{ opacity:1; fill:${color}; }
    ${end.toFixed(2)}%,100%{ opacity:${dimOpacity}; fill:${dimColor}; }
  }`;
}

// ---------------------------------------------------------------------------
// Assemble equipment groups + per-node CSS (stagger)
// ---------------------------------------------------------------------------
const equipMarkup = equip
  .map((e) => {
    // No per-node delay here: the node's own fade-in/stroke state must be
    // perfectly in sync across all four so they read as one beat. Only the
    // traveling pulses (below) are staggered.
    return `
  <g class="equip-node equip-${e.key}">
    <rect class="equip-box" x="${e.cx - equipW / 2}" y="${equipTopY}" width="${equipW}" height="${equipH}" rx="14"
      fill="#0D1526" stroke="var(--silver)" stroke-width="1.5"/>
    ${iconFns[e.key](e)}
    <text x="${e.cx}" y="${equipTopY + equipH + 34}" text-anchor="middle" class="node-label">${e.label}</text>
  </g>`;
  })
  .join("\n");

const equipLines = equip
  .map((e) => `<path id="line-${e.key}" class="conn" d="${equipPath(e)}"/>`)
  .join("\n");

// All four equipment lines travel together (no per-box stagger) so the
// information flow reads as one continuous motion, not box-by-box.
const upPulses = equip
  .map(
    (e) => `
  <g class="up-pulse-group">
    ${pulseDotsInline({ d: equipPath(e), color: "var(--teal)", count: 3, dotDelayMs: 110, groupClass: `up-pulse up-${e.key}` })}
  </g>`,
  )
  .join("\n");

const downPulses = equip
  .map(
    (e) => `
  <g class="down-pulse-group">
    ${pulseDotsInline({ d: equipPath(e), color: "var(--cyan)", count: 3, dotDelayMs: 110, groupClass: `down-pulse down-${e.key}` })}
  </g>`,
  )
  .join("\n");

const protoLabels = equip
  .map(
    (e) =>
      `<text x="${e.cx + 26}" y="${busY - 10}" class="proto-label">${e.proto}</text>`,
  )
  .join("\n");

// ---------------------------------------------------------------------------
// Cloud neural lattice
// ---------------------------------------------------------------------------
const latticeNodes = [
  [0, -46],
  [40, -18],
  [40, 24],
  [0, 46],
  [-40, 24],
  [-40, -18],
  [0, 0],
];
const latticeLines = [
  [6, 0],
  [6, 1],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
]
  .map(
    ([a, b]) =>
      `<line x1="${latticeNodes[a][0]}" y1="${latticeNodes[a][1]}" x2="${latticeNodes[b][0]}" y2="${latticeNodes[b][1]}" stroke="var(--teal)" stroke-width="1" opacity="0.55"/>`,
  )
  .join("\n");
const latticeDots = latticeNodes
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="var(--teal)"/>`)
  .join("\n");

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SAAR AI-BMS — Architecture Loop</title>
<style>
  @font-face {
    font-family: 'Poppins';
    src: url(data:font/woff2;base64,${poppins400}) format('woff2');
    font-weight: 400; font-style: normal;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(data:font/woff2;base64,${poppins600}) format('woff2');
    font-weight: 600; font-style: normal;
  }

  :root{
    --bg:#0A0F1E;
    --silver:#A8BDD0;
    --teal:#00E5C3;
    --cyan:#00C2FF;
    --red:#FF5470;
    --ghost:#EAF2F8;
    --line:#1E2E42;
    --dim:#3C4A60;
  }

  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:transparent;}
  .stage{
    width:${W}px;height:${H}px;position:relative;
    background:radial-gradient(circle at 50% 40%, #101C34 0%, #0A0F1E 52%, #05070D 100%);
    font-family:'Poppins',sans-serif;
    overflow:hidden;
  }

  svg{width:100%;height:100%;display:block}

  .node-label{
    font-family:'Poppins',sans-serif; font-weight:500; font-size:20px;
    fill:var(--silver); letter-spacing:.02em;
  }
  .proto-label{
    font-family:'Poppins',sans-serif; font-weight:400; font-size:14px;
    fill:var(--dim); letter-spacing:.06em;
  }
  .beat-label{
    font-family:'Poppins',sans-serif; font-weight:600; font-size:22px;
    fill:var(--ghost); letter-spacing:.14em; text-transform:uppercase;
  }

  .conn{ fill:none; stroke:var(--line); stroke-width:1.5; }

  /* ---------- ambient (independent of the 5s loop) ---------- */
  .ctrl-glow{
    animation: ambientGlow 3.6s ease-in-out infinite alternate;
    transform-origin: ${ctrl.x + ctrl.w / 2}px ${ctrl.y + ctrl.h / 2}px;
  }
  @keyframes ambientGlow{
    0%{ opacity:.35; transform:scale(1); }
    100%{ opacity:.75; transform:scale(1.05); }
  }

  /* ---------- pulses ---------- */
  .pulse{ opacity:0; offset-distance:0%; offset-rotate:0deg; }

  .up-pulse-group .up-pulse{
    animation: upTravel 5s linear infinite;
  }
  @keyframes upTravel{
    0%,7.9%{ opacity:0; offset-distance:0%; }
    8%{ opacity:1; }
    20%{ offset-distance:100%; opacity:1; }
    21%,100%{ opacity:0; offset-distance:100%; }
  }

  .down-pulse-group .down-pulse{
    animation: downTravel 5s linear infinite;
  }
  @keyframes downTravel{
    0%,67.9%{ opacity:0; offset-distance:100%; }
    68%{ opacity:1; }
    80%{ offset-distance:0%; opacity:1; }
    80.1%,100%{ opacity:0; offset-distance:0%; }
  }

  .trunk-up{ animation: trunkUp 5s linear infinite; offset-rotate:0deg; }
  @keyframes trunkUp{
    0%,31.9%{ opacity:0; offset-distance:0%; }
    32%{ opacity:1; }
    44%{ offset-distance:100%; opacity:1; }
    44.1%,100%{ opacity:0; offset-distance:100%; }
  }
  .trunk-down{ animation: trunkDown 5s linear infinite; offset-rotate:0deg; }
  @keyframes trunkDown{
    0%,57.9%{ opacity:0; offset-distance:100%; }
    58%{ opacity:1; }
    68%{ offset-distance:0%; opacity:1; }
    68.1%,100%{ opacity:0; offset-distance:0%; }
  }

  /* ---------- controller LEDs ---------- */
  .led{ fill:var(--dim); animation: ledBlink 5s ease-in-out infinite; }
  .led-1{ animation-delay:.08s }
  .led-2{ animation-delay:.16s }
  @keyframes ledBlink{
    0%,30%{ fill:var(--dim); }
    32%,42%{ fill:var(--teal); }
    44%,56%{ fill:var(--dim); }
    58%,78%{ fill:var(--cyan); }
    80%,100%{ fill:var(--dim); }
  }

  /* ---------- equipment node state ---------- */
  .equip-node{ animation: equipState 5s linear infinite; }
  .equip-box{ animation: equipStroke 5s linear infinite; }
  @keyframes equipState{
    0%{ opacity:0; }
    3%{ opacity:1; }
    100%{ opacity:1; }
  }
  @keyframes equipStroke{
    0%{ stroke:var(--dim); }
    3%{ stroke:var(--ghost); }
    7%{ stroke:var(--dim); }
    9%{ stroke:var(--silver); }
    66%{ stroke:var(--silver); }
    80%{ stroke:var(--teal); }
    96%{ stroke:var(--teal); }
    100%{ stroke:var(--dim); }
  }
  /* :where(...) pins this selector's specificity to zero, so ANY other
     single-class rule (.fan, .impeller-spin, .vfd-bolt, .sb-1's barDim...)
     always wins regardless of source order. Without :where, stacking up
     :not() exclusions here would keep raising this rule's own specificity
     and eventually re-break exactly the elements it's meant to exclude —
     "animation" is a shorthand, so whichever rule wins takes it entirely,
     silently deleting the other's motion rather than merging with it. */
  :where(.icon *:not(.vfd-bolt):not(.fan):not(.impeller-spin)){ animation: iconStroke 5s linear infinite; }
  @keyframes iconStroke{
    0%,8%{ stroke:var(--dim); }
    9%,78%{ stroke:var(--silver); }
    80%,96%{ stroke:var(--teal); }
    100%{ stroke:var(--dim); }
  }

  /* chiller stage bars — one dims on command arrival */
  .stage-bar{ animation: none; transform-box: fill-box; transform-origin: center; }
  .equip-chiller .sb-1{ animation: barDim 5s linear infinite; }
  @keyframes barDim{
    0%,78%{ opacity:1; fill:var(--silver); }
    82%,100%{ opacity:.25; fill:var(--dim); }
  }

  /* speed gauges — each dial carries its own --dial-from/--dial-to (percent
     units, since the arc paths use pathLength="100"), so pump and tower can
     sweep to different final percentages on one shared timeline. */
  .speed-dial{
    animation: dialSweep 5s linear infinite;
  }
  @keyframes dialSweep{
    0%,78%{ stroke-dashoffset:var(--dial-from, 0); stroke:var(--silver); }
    92%,100%{ stroke-dashoffset:var(--dial-to, 35); stroke:var(--teal); }
  }
  .speed-label-from{ animation: speedFromOut 5s linear infinite; }
  .speed-label-to{ animation: speedToIn 5s linear infinite; }
  @keyframes speedFromOut{
    0%,84%{ opacity:1; }
    88%,100%{ opacity:0; }
  }
  @keyframes speedToIn{
    0%,84%{ opacity:0; }
    88%,100%{ opacity:1; }
  }

  /* cooling tower fan + pump impeller: continuous spin, visibly slows once
     the command lands. 0->80%: 1300deg (fast). 80->100%: +140deg (slow).
     Total 1440deg = 4 full turns, so it wraps with no visible snap. The
     tower fan is symmetric around its own centre so fill-box works; the
     pump's impeller triangle is not, so it rotates around its own <g>
     origin instead (already positioned at the pump's centre via translate). */
  .fan{ transform-origin:center; transform-box: fill-box; animation: fanSpinSlow 5s linear infinite; }
  .impeller-spin{ animation: fanSpinSlow 5s linear infinite; }
  @keyframes fanSpinSlow{
    0%{ transform:rotate(0deg); }
    80%{ transform:rotate(1300deg); }
    100%{ transform:rotate(1440deg); }
  }

  /* AHU/VFD status bolt dims once the command lands */
  .vfd-bolt{ animation: boltDim 5s linear infinite; }
  @keyframes boltDim{
    0%,78%{ opacity:1; fill:var(--teal); }
    88%,100%{ opacity:.5; fill:var(--dim); }
  }

  /* ---------- cloud ---------- */
  .lattice{ transform-box: fill-box; transform-origin:center; animation: latticeSpin 5s linear infinite; }
  @keyframes latticeSpin{
    0%,42%{ transform:rotate(0deg); }
    58%{ transform:rotate(90deg); }
    100%{ transform:rotate(90deg); }
  }
  .cloud-flash{ animation: cloudFlash 5s linear infinite; }
  @keyframes cloudFlash{
    0%,42%{ opacity:0; }
    46%{ opacity:.9; }
    54%{ opacity:0; }
    100%{ opacity:0; }
  }

  /* ---------- dashboard (static — always fully shown) ---------- */

  /* ---------- result counter (static — always shown) ---------- */
  .result-glow{ opacity:.6; }

  .beat-sense{ animation: beatBlinkSense 5s linear infinite; }
  .beat-decide{ animation: beatBlinkDecide 5s linear infinite; }
  .beat-act{ animation: beatBlinkAct 5s linear infinite; }
  ${blinkKeyframes("beatBlinkSense", "var(--red)", 8, 34)}
  ${blinkKeyframes("beatBlinkDecide", "var(--teal)", 40, 60)}
  ${blinkKeyframes("beatBlinkAct", "var(--cyan)", 62, 88)}
</style>
</head>
<body>
<div class="stage">
  <svg viewBox="0 0 ${W} ${H}">
    <defs>
      <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="14"/>
      </filter>
    </defs>

    <!-- connection lines -->
    ${equipLines}
    <path id="line-trunk" class="conn" d="${trunkPath}"/>
    <path id="line-dash" class="conn" d="${cloudDashPath}"/>
    <line x1="${equip[0].cx}" y1="${busY}" x2="${equip[3].cx}" y2="${busY}" class="conn"/>
    <line x1="960" y1="${ctrl.y + ctrl.h}" x2="960" y2="${busY}" class="conn"/>

    ${protoLabels}

    <!-- beat labels -->
    <text x="852" y="348" text-anchor="end" class="beat-label beat-sense">Sense</text>
    <text x="1092" y="145" class="beat-label beat-decide">Decide</text>
    <text x="1068" y="348" class="beat-label beat-act">Act</text>

    <!-- pulses -->
    ${upPulses}
    ${downPulses}
    <circle class="pulse trunk-up" r="7" fill="var(--teal)" filter="url(#glow)" style="offset-path:path('${trunkPath}')"/>
    <circle class="pulse trunk-down" r="7" fill="var(--cyan)" filter="url(#glow)" style="offset-path:path('${trunkPath}')"/>

    <!-- equipment -->
    ${equipMarkup}

    <!-- controller -->
    <g>
      <rect class="ctrl-glow" x="${ctrl.x - 14}" y="${ctrl.y - 14}" width="${ctrl.w + 28}" height="${ctrl.h + 28}" rx="24"
        fill="none" stroke="var(--teal)" stroke-width="3" filter="url(#softGlow)"/>
      <rect x="${ctrl.x}" y="${ctrl.y}" width="${ctrl.w}" height="${ctrl.h}" rx="16"
        fill="#0B1220" stroke="var(--silver)" stroke-width="2"/>
      <circle class="led led-0" cx="${ctrl.x + 30}" cy="${ctrl.y + 26}" r="6"/>
      <circle class="led led-1" cx="${ctrl.x + 52}" cy="${ctrl.y + 26}" r="6"/>
      <circle class="led led-2" cx="${ctrl.x + 74}" cy="${ctrl.y + 26}" r="6"/>
      <text x="${ctrl.x + ctrl.w / 2}" y="${ctrl.y + 70}" text-anchor="middle" class="node-label" style="font-weight:600;font-size:22px;fill:var(--ghost)">SAAR Controller</text>
      <text x="${ctrl.x + ctrl.w / 2}" y="${ctrl.y + 96}" text-anchor="middle" class="proto-label">Gateway</text>
    </g>

    <!-- cloud -->
    <g transform="translate(${cloud.cx},${cloud.cy})">
      <circle r="${cloud.r}" fill="#0B1220" stroke="var(--silver)" stroke-width="2"/>
      <circle class="cloud-flash" r="${cloud.r - 8}" fill="var(--teal)" opacity="0"/>
      <g class="lattice">
        ${latticeLines}
        ${latticeDots}
      </g>
      <text y="${cloud.r + 40}" text-anchor="middle" class="node-label" style="font-weight:600;font-size:24px;fill:var(--ghost)">Cloud — AI Optimisation Engine</text>
    </g>

    <!-- dashboard -->
    <g>
      <rect x="${dash.x}" y="${dash.y}" width="${dash.w}" height="${dash.h}" rx="14"
        fill="#0D1526" stroke="var(--silver)" stroke-width="1.5"/>
      <text x="${dash.x + 20}" y="${dash.y + 32}" class="node-label" style="font-size:17px">Dashboard / Digital Twin</text>
      ${[
        { icon: "activity", value: "24", caption: "ZONES" },
        { icon: "bolt", value: `${RESULT_VALUE}%`, caption: "SAVED" },
        { icon: "chart", value: "98%", caption: "UPTIME" },
      ]
        .map((tile, i) => dashTile(dash.x + 20 + i * 92, dash.y + 50, 76, 46, tile.icon, tile.value, tile.caption))
        .join("\n")}
      ${(() => {
        const baseline = dash.y + 182; // common bottom edge — bars rise from here
        const maxH = 70;
        const bars = [36, 58, 46, 70, 30];
        const days = ["M", "T", "W", "T", "F"];
        const gridlines = [0, 0.5, 1]
          .map((f) => {
            const y = baseline - maxH * f;
            return `
          <line x1="${dash.x + 20}" y1="${y}" x2="${dash.x + dash.w - 16}" y2="${y}" stroke="var(--line)" stroke-width="1"/>
          <text x="${dash.x + 16}" y="${y + 3}" text-anchor="end" font-size="8" fill="var(--dim)" font-family="'Poppins'">${Math.round(100 * f)}</text>`;
          })
          .join("");
        const barEls = bars
          .map(
            (h, i) =>
              `<rect class="bar" x="${dash.x + 22 + i * 52}" y="${baseline - h}" width="34" height="${h}" fill="var(--cyan)" opacity=".85"/>`,
          )
          .join("\n");
        const labels = bars
          .map(
            (_, i) =>
              `<text x="${dash.x + 22 + i * 52 + 17}" y="${baseline + 12}" text-anchor="middle" font-size="8" fill="var(--dim)" font-family="'Poppins'">${days[i]}</text>`,
          )
          .join("\n");
        return `${gridlines}\n${barEls}\n${labels}`;
      })()}
    </g>

    <!-- result -->
    <g>
      <rect class="result-glow" x="${result.x - 10}" y="${result.y - 10}" width="${result.w + 20}" height="${result.h + 20}" rx="20"
        fill="none" stroke="var(--teal)" stroke-width="3" filter="url(#softGlow)"/>
      <rect x="${result.x}" y="${result.y}" width="${result.w}" height="${result.h}" rx="14"
        fill="#0D1526" stroke="var(--teal)" stroke-width="1.5"/>
      <text x="${result.x + result.w / 2}" y="${result.y + 92}" text-anchor="middle"
        style="font-family:'Poppins';font-weight:600;font-size:56px;fill:var(--teal)">${RESULT_VALUE}%</text>
      <text x="${result.x + result.w / 2}" y="${result.y + 130}" text-anchor="middle" class="proto-label" style="font-size:16px;letter-spacing:.08em">ENERGY SAVED</text>
    </g>
  </svg>
</div>
</body>
</html>
`;

const outPath = path.join(root, "design", "saar-architecture-loop.html");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, html);
console.log("Wrote", outPath, `(${(html.length / 1024).toFixed(1)} KB)`);
