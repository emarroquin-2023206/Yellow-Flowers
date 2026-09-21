// Construye el jardín: 4 girasoles + ramitas verdes de relleno.
// Todo es SVG; los trazos se "dibujan" con CSS (ver css/style.css).

var SVG_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs, parent) {
  var node = document.createElementNS(SVG_NS, tag);
  for (var k in attrs) node.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(node);
  return node;
}

function delay(node, seconds, duration) {
  node.style.setProperty("--d", seconds.toFixed(2) + "s");
  if (duration) node.style.setProperty("--t", duration.toFixed(2) + "s");
}

// Punto de una curva de Bézier cúbica (para pegar las hojas al tallo)
function bezier(p, t) {
  var u = 1 - t;
  return {
    x: u*u*u*p[0].x + 3*u*u*t*p[1].x + 3*u*t*t*p[2].x + t*t*t*p[3].x,
    y: u*u*u*p[0].y + 3*u*u*t*p[1].y + 3*u*t*t*p[2].y + t*t*t*p[3].y,
  };
}

// Hoja apuntando hacia +x desde el origen
var LEAF_PATH = "M0 0 C 10 -30, 55 -34, 88 -2 C 58 28, 14 24, 0 0 Z";
var LEAF_VEIN = "M4 0 C 30 -3, 55 -5, 82 -2";

function addLeaf(svg, x, y, angle, scale, flip, when, fill, stroke) {
  var g = svgEl("g", {
    transform: "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") rotate(" + angle + ") scale(" + scale + " " + (flip ? -1 : 1) + ")",
  }, svg);
  var leaf = svgEl("path", { d: LEAF_PATH, pathLength: 1, fill: fill, stroke: stroke, "stroke-width": 2.2, "stroke-linejoin": "round", class: "draw" }, g);
  delay(leaf, when, 0.9);
  var vein = svgEl("path", { d: LEAF_VEIN, pathLength: 1, fill: "none", stroke: stroke, "stroke-width": 1.6, "stroke-linecap": "round", class: "draw" }, g);
  delay(vein, when + 0.5, 0.5);
}

function petalPath(len, width, base) {
  return "M0 " + (-base) + " C " + (-width) + " " + (-base - len * 0.28) + ", " + (-width) + " " + (-base - len * 0.62) + ", 0 " + (-base - len) +
         " C " + width + " " + (-base - len * 0.62) + ", " + width + " " + (-base - len * 0.28) + ", 0 " + (-base) + " Z";
}

// ---------- Girasol ----------
// viewBox 200 x 520 -> cabeza arriba (centro en 100,100), tallo hacia abajo.
function sunflower(host, idx, start, bend) {
  var svg = svgEl("svg", { viewBox: "0 0 200 520", class: "sunflower__svg" }, host);
  var defs = svgEl("defs", {}, svg);
  var grad = svgEl("radialGradient", { id: "disc" + idx, cx: "50%", cy: "50%", r: "55%" }, defs);
  svgEl("stop", { offset: "0%", "stop-color": "#8c5a2b" }, grad);
  svgEl("stop", { offset: "70%", "stop-color": "#5b3316" }, grad);
  svgEl("stop", { offset: "100%", "stop-color": "#3d200c" }, grad);

  // Tallo
  var p = [{ x: 100, y: 522 }, { x: 100 + bend, y: 400 }, { x: 100 - bend, y: 270 }, { x: 100, y: 128 }];
  var stem = svgEl("path", {
    d: "M" + p[0].x + " " + p[0].y + " C " + p[1].x + " " + p[1].y + ", " + p[2].x + " " + p[2].y + ", " + p[3].x + " " + p[3].y,
    pathLength: 1, fill: "none", stroke: "#3f9142", "stroke-width": 8, class: "draw",
  }, svg);
  delay(stem, start, 1.8);

  // Hojas grandes sobre el tallo
  var leafSpots = [
    { t: 0.22, side: -1, s: 1.15 },
    { t: 0.40, side: 1, s: 1.0 },
    { t: 0.58, side: -1, s: 0.85 },
    { t: 0.72, side: 1, s: 0.7 },
  ];
  leafSpots.forEach(function (l, i) {
    var pt = bezier(p, l.t);
    var ang = l.side === 1 ? -28 : -152;
    addLeaf(svg, pt.x, pt.y, ang, l.s, l.side === -1, start + 0.5 + l.t * 1.6, i % 2 ? "#58b25a" : "#4aa14e", "#2e7d32");
  });

  // Cabeza
  var head = svgEl("g", { transform: "translate(100 100)" }, svg);
  var N = 18;
  var t0 = start + 1.7;
  var i, a, pet;

  for (i = 0; i < N; i++) {              // pétalos de atrás
    a = (360 / N) * i;
    pet = svgEl("path", { d: petalPath(72, 17, 26), transform: "rotate(" + a + ")", pathLength: 1, fill: "#f6a30a", stroke: "#c57900", "stroke-width": 1.6, "stroke-linejoin": "round", class: "draw" }, head);
    delay(pet, t0 + i * 0.045, 0.5);
  }
  for (i = 0; i < N; i++) {              // pétalos de adelante
    a = (360 / N) * i + 360 / N / 2;
    pet = svgEl("path", { d: petalPath(64, 15, 26), transform: "rotate(" + a + ")", pathLength: 1, fill: "#ffd23a", stroke: "#e0a000", "stroke-width": 1.6, "stroke-linejoin": "round", class: "draw" }, head);
    delay(pet, t0 + 0.4 + i * 0.045, 0.5);
  }

  var disc = svgEl("circle", { r: 36, pathLength: 1, fill: "url(#disc" + idx + ")", stroke: "#3d200c", "stroke-width": 2.5, class: "draw" }, head);
  delay(disc, t0 + 1.3, 0.7);

  // Semillas en espiral (ángulo áureo)
  var seeds = 95, golden = Math.PI * (3 - Math.sqrt(5));
  for (i = 1; i <= seeds; i++) {
    var r = 3.3 * Math.sqrt(i), th = i * golden;
    var seed = svgEl("circle", {
      cx: (Math.cos(th) * r).toFixed(2), cy: (Math.sin(th) * r).toFixed(2), r: (1.1 + r / 32).toFixed(2),
      fill: i % 3 === 0 ? "#c98a3d" : "#2c1707", class: "seed",
    }, head);
    delay(seed, t0 + 1.9 + i * 0.012);
  }

  return svg;
}

// ---------- Ramita verde de relleno ----------
function sprig(host, start, curve, leafCount) {
  var svg = svgEl("svg", { viewBox: "0 0 160 340", class: "sprig__svg" }, host);
  var p = [{ x: 80, y: 342 }, { x: 80 - curve, y: 250 }, { x: 80 + curve, y: 130 }, { x: 82, y: 8 }];
  var stem = svgEl("path", {
    d: "M" + p[0].x + " " + p[0].y + " C " + p[1].x + " " + p[1].y + ", " + p[2].x + " " + p[2].y + ", " + p[3].x + " " + p[3].y,
    pathLength: 1, fill: "none", stroke: "#3f8f45", "stroke-width": 4, class: "draw",
  }, svg);
  delay(stem, start, 1.6);

  var greens = ["#6cc56b", "#4fae57", "#84d174", "#3f9d4d"];
  for (var i = 0; i < leafCount; i++) {
    var t = 0.1 + (0.82 * i) / (leafCount - 1);
    var pt = bezier(p, t);
    var side = i % 2 ? 1 : -1;
    var size = 0.62 - t * 0.28;
    addLeaf(svg, pt.x, pt.y, side === 1 ? -35 : -145, size, side === -1, start + 0.3 + t * 1.5, greens[i % greens.length], "#2f7a3b");
  }
  // hojita en la punta
  var tip = bezier(p, 1);
  addLeaf(svg, tip.x, tip.y, -92, 0.3, false, start + 1.9, "#84d174", "#2f7a3b");
  return svg;
}

// ---------- Jardín completo ----------
function buildGarden(garden) {
  // Ramitas de relleno (detrás de los girasoles)
  var sprigs = [
    // clase de posición, inicio, curva, hojas
    ["sprig--bl",   0.0, 26, 8],
    ["sprig--br",   0.3, -26, 8],
    ["sprig--ml",   0.9, 20, 6],
    ["sprig--mr",   1.1, -20, 6],
    ["sprig--tl",   1.8, 18, 6],
    ["sprig--tr",   2.0, -18, 6],
    ["sprig--low1", 1.4, 16, 5],
    ["sprig--low2", 1.7, -16, 5],
  ];
  sprigs.forEach(function (s) {
    var host = document.createElement("div");
    host.className = "sprig " + s[0];
    garden.appendChild(host);
    sprig(host, s[1], s[2], s[3]);
  });

  // 4 girasoles
  var flowers = [
    ["sunflower--1", 0.2, 34],
    ["sunflower--2", 0.9, -26],
    ["sunflower--3", 1.6, 28],
    ["sunflower--4", 2.3, -32],
  ];
  flowers.forEach(function (f, i) {
    var host = document.createElement("div");
    host.className = "sunflower " + f[0];
    host.style.setProperty("--start", f[1] + "s");
    garden.appendChild(host);
    sunflower(host, i, f[1], f[2]);
  });
}
