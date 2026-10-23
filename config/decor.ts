/**
 * Circuit decor geometry.
 *
 * Phase 1 (fixed side rail/spine) was retired in favor of section-scoped
 * circuit placements — see PLAN.md §0. What stays here:
 *  - shared deterministic geometry helpers (seeded RNG, iso projection,
 *    random walk) used by the circuit family port below;
 *  - the section-scoped variant generators (PLAN.md §2 placement map).
 */
const ISO_COS = 0.866;

const project = (x: number, y: number, z: number, u: number): [number, number] => [
  (x - y) * ISO_COS * u,
  ((x + y) * 0.5 - z) * u,
];

const round1 = (n: number) => Math.round(n * 10) / 10;

export type Pt2 = [number, number];
export const pathData = (pts: Pt2[], close = false): string =>
  "M" + pts.map((q) => round1(q[0]) + " " + round1(q[1])).join("L") + (close ? "Z" : "");

const createRng = (seed: number) => {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

type Point3 = [number, number, number];

const makeMapper = (ox: number, oy: number, u: number) => (
  a: number,
  b: number,
  c: number
): [number, number] => {
  const q = project(a, b, c, u);
  return [q[0] + ox, q[1] + oy];
};

type Step = [number, number];

const walk = (
  r: () => number,
  Q: (...p: number[]) => [number, number],
  n: number,
  p: Point3,
  ok: (q: Pt2) => boolean,
  dirs: Step[]
): Pt2[] => {
  const pts = [Q(...p)];
  let last = -1;
  for (let k = 0; k < n; k++) {
    let d: Step = [0, 0];
    let np: Point3 = [0, 0, 0];
    let t = 0;
    do {
      d = dirs[Math.floor(r() * dirs.length)];
      np = p.slice() as Point3;
      np[d[0]] += d[1] * (1 + Math.floor(r() * 2));
      t++;
    } while ((d[0] === last || !ok(Q(...np))) && t < 24);
    if (t >= 24) break;
    p = np;
    last = d[0];
    pts.push(Q(...p));
  }
  return pts;
};

/* ------------------------------------------------------------------ *
 * Circuit traces family — section-scoped variants.                    *
 * Faithful port of the reference generators (g2 g5 g6 g7 g9 g10 g11)  *
 * plus two derived variants (cornerMicro, gapRail). Everything is     *
 * deterministic (createRng), computed at build time, emitted as SVG   *
 * strings by renderCircuit(). Mask ids are namespaced by `uid` so     *
 * several instances can coexist on one page.                          *
 * ------------------------------------------------------------------ */

export type CircuitVariant =
  | "headerRoots" // g02 — hangs under a header, fades down        (1200×220)
  | "corner" //     g05 — section corner, fades from the corner   (400×400)
  | "cornerMicro" //  derived — card-hover micro corner             (200×200)
  | "rhombi" //       g06 — nested rhombi rings with spokes         (400×300)
  | "chip" //         g07 — chip core with child circuits           (400×400)
  | "routing" //      g09 — routing field background                (400×300)
  | "pipeline" //     g10 — chip-to-chip pulse strip                (1200×130)
  | "crown" //        g11 — mirror crown ornament                   (1200×200)
  | "gapRail" //      derived — sticky column-gap rail              (64×600)
  | "stub"; //        derived — per-card short stub with branch     (10×96)

type SvgTrace = { b: string; m: string; e: string };

const fmt = (q: Pt2): string => round1(q[0]) + " " + round1(q[1]);
const pdAll = (qs: Pt2[]): string => qs.map(fmt).join("L");
const delayAttr = (r: () => number, d: number): string =>
  `style="animation-delay:-${round1(r() * d)}s"`;
const dotEl = (
  q: Pt2,
  rad: number,
  cls: string,
  extra: string
): string =>
  `<circle class="z-d ${cls}" r="${rad}" cx="${round1(q[0])}" cy="${round1(q[1])}" ${extra}/>`;

const mkCube = (
  i: number,
  j: number,
  k: number,
  u: number,
  ox: number,
  oy: number,
  h = 1
) => {
  const p = (a: number, b: number, c: number): Pt2 => {
    const q = project(i + a, j + b, k + c, u);
    return [q[0] + ox, q[1] + oy];
  };
  const t = [p(0, 0, h), p(1, 0, h), p(1, 1, h), p(0, 1, h)];
  const b = [p(0, 0, 0), p(1, 0, 0), p(1, 1, 0), p(0, 1, 0)];
  return {
    t,
    b,
    v: pathData(t, true) + pathData([t[1], b[1], b[2], b[3], t[3]]) + pathData([t[2], b[2]]),
    h: pathData([t[0], b[0]]) + pathData([b[1], b[0], b[3]]),
  };
};

const trace = (
  r: () => number,
  pts: Pt2[],
  o: { d?: number; dl?: number | string } = {}
): SvgTrace => {
  const d = pathData(pts);
  return {
    b: d,
    m:
      `<path class="z-a z-mv" pathLength="1" ` +
      `style="animation-duration:${round1(o.d || 4 + r() * 4)}s;` +
      `animation-delay:${o.dl != null ? o.dl : "-" + round1(r() * 6)}s" d="${d}"/>`,
    e:
      `<circle class="z-b" r="3.4" cx="${round1(pts[0][0])}" cy="${round1(pts[0][1])}"/>` +
      dotEl(pts[pts.length - 1], 2.4, "z-pu", delayAttr(r, 4)),
  };
};

const asm = (l: SvgTrace[]): string =>
  `<path class="z-c" pathLength="1" d="${l.map((t) => t.b).join("")}"/>` +
  l.map((t) => t.m + t.e).join("");

const lin = (id: string, x1: number, y1: number, x2: number, y2: number): string =>
  `<linearGradient id="${id}g" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>`;

const rad = (id: string, cx: number, cy: number, rr: number): string =>
  `<radialGradient id="${id}g" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${rr}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>`;

const defs = (id: string, W: number, H: number, g: string): string =>
  `<defs>${g}<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#${id}g)"/></mask></defs>`;

type Gen = (r: () => number, uid: string, walls: number[]) => string;

/* g02 — header roots */
const genHeaderRoots: Gen = (r, uid, walls) => {
  const [w, h] = walls;
  const l: SvgTrace[] = [];
  for (let t = 0; t < Math.max(6, Math.floor(w / 100)); t++) {
    l.push(
      trace(
        r,
        walk(
          r,
          makeMapper(t * 100 + 30 + r() * 40, 6, 24),
          6,
          [0, 0, 0],
          (q) => q[1] < h - 10 && q[0] > 8 && q[0] < w - 8,
          [[2, -1], [0, 1], [1, 1], [2, -1]]
        )
      )
    );
  }
  return (
    defs("f2" + uid, w, h, lin("f2" + uid, 0, 20, 0, h - 5)) +
    `<g mask="url(#f2${uid})">${asm(l)}</g>`
  );
};

/* g05 — corner (+ cornerMicro via walls/step) */
const genCorner: Gen = (r, uid, walls) => {
  const [w, h, step] = walls;
  const ok = (q: Pt2) => q[0] > 2 && q[0] < w - 4 && q[1] > 2 && q[1] < h - 4 && q[0] + q[1] < (w + h) / 2 + step * 5;
  const n = Math.max(4, Math.round((w + h) / 100));
  const spread = step * 2 - 2;
  const l: SvgTrace[] = [];
  for (let t = 0; t < n; t++) {
    const left = t % 2 === 0;
    const x = left ? 4 : 30 + (t >> 1) * spread;
    const y = left ? 30 + (t >> 1) * spread : 4;
    l.push(
      trace(
        r,
        walk(
          r,
          makeMapper(x, y, step * 2 - 2),
          6,
          [0, 0, 0],
          ok,
          left ? [[0, 1], [1, -1], [2, -1], [2, 1]] : [[0, 1], [1, 1], [2, -1]]
        )
      )
    );
  }
  const br = [150, 118, 86]
    .map((nn, i) => `M${4 + i * 18} ${nn + i * 18}V${4 + i * 18}H${nn + i * 18}`)
    .join("");
  return (
    defs("f5" + uid, w, h, rad("f5" + uid, 0, 0, (w + h) / 2 + 30)) +
    `<g mask="url(#f5${uid})"><path class="z-b" pathLength="1" d="${br}"/>${asm(l)}</g>`
  );
};

/* g06 — nested rhombi */
const genRhombi: Gen = (r, _uid, walls) => {
  const [w, h] = walls;
  const u = 14;
  const Q = (a: number, b: number): Pt2 => {
    const q = project(a, b, 0, u);
    return [q[0] + w / 2, q[1] + h / 2];
  };
  const sq = (k: number) => pathData([Q(-k, -k), Q(k, -k), Q(k, k), Q(-k, k)], true);
  let s = "";
  for (let k = 1; k <= 7; k++) {
    const d = sq(k);
    s +=
      `<path class="z-c" pathLength="1" d="${d}"/>` +
      `<path class="z-a z-mv ${k % 2 ? "" : "z-rv"}" pathLength="1" style="animation-duration:${round1(5 + k * 0.9)}s" d="${d}"/>`;
    if (k < 7)
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach((c) => {
        if (r() < 0.55) {
          const B = Q(c[0] * (k + 1), c[1] * (k + 1));
          s +=
            `<path class="z-b" pathLength="1" d="${pathData([Q(c[0] * k, c[1] * k), B])}"/>` +
            dotEl(B, 2, "z-pu", delayAttr(r, 4));
        }
      });
  }
  const m = mkCube(-0.5, -0.5, 0, 9, w / 2, h / 2 + 5);
  return s + `<path class="z-a" pathLength="1" d="${m.v}"/>`;
};

/* g07 — chip core */
const genChip: Gen = (r, _uid, walls) => {
  const [w, h] = walls;
  const cx = w / 2;
  const cy = h / 2 + 15;
  const c = mkCube(-0.5, -0.5, 0, 30, cx, cy);
  const l: SvgTrace[] = [];
  const ok = (q: Pt2) => Math.hypot(q[0] - cx, q[1] - cy) < h / 2 - 15;
  const any: Step[] = [[0, 1], [0, -1], [1, 1], [1, -1], [2, 1], [2, -1]];
  let s =
    `<path class="z-c" pathLength="1" d="${c.h}"/>` +
    `<path class="z-a" pathLength="1" d="${c.v}"/>` +
    `<path class="z-pad z-pu" d="${pathData(c.t, true)}"/>`;
  c.t
    .concat([c.b[1], c.b[2], c.b[3]])
    .forEach((v) => {
      const dx = v[0] - cx;
      const D: Step[] =
        Math.abs(dx) > 5
          ? dx < 0
            ? [[0, -1], [1, 1], [2, 1], [2, -1]]
            : [[1, -1], [0, 1], [2, 1], [2, -1]]
          : v[1] < cy - 30
          ? [[0, -1], [1, -1], [2, 1]]
          : [[0, 1], [1, 1], [2, -1]];
      const p = walk(r, makeMapper(v[0], v[1], 18), 5, [0, 0, 0], ok, D);
      const e = p[p.length - 1];
      const m = mkCube(-0.5, -0.5, 0, 8, e[0], e[1] + 4);
      l.push(trace(r, p));
      s += `<path class="z-b" pathLength="1" d="${m.v}"/>`;
      l.push(trace(r, walk(r, makeMapper(e[0], e[1], 9), 2, [0, 0, 0], ok, any), { d: 3 }));
    });
  return s + asm(l);
};

/* g09 — routing field */
const genRouting: Gen = (r, _uid, walls) => {
  const [w, h, step] = walls;
  const u = 22;
  const Q = makeMapper(w / 2, h / 2, u);
  const ok = (q: Pt2) => q[0] > 12 && q[0] < w - 12 && q[1] > 12 && q[1] < h - 12;
  const l: SvgTrace[] = [];
  let d = "";
  for (let a = -9; a <= 9; a++)
    for (let b = -9; b <= 9; b++) {
      const q = Q(a, b, 0);
      if (q[0] > 8 && q[0] < w - 8 && q[1] > 8 && q[1] < h - 8) d += `M${fmt(q)}h0`;
    }
  for (let t = 0; t < step; t++)
    l.push(
      trace(
        r,
        walk(
          r,
          Q,
          7,
          [Math.floor(r() * 7) - 3, Math.floor(r() * 7) - 3, 0],
          ok,
          [[0, 1], [0, -1], [1, 1], [1, -1]]
        )
      )
    );
  return (
    `<path class="z-c" pathLength="1" style="stroke-width:2.2;stroke-opacity:.3" d="${d}"/>` +
    asm(l)
  );
};

/* g10 — pipeline strip */
const genPipeline: Gen = (r, _uid, walls) => {
  const [w, h, step] = walls;
  const n = step;
  const pitch = w / n;
  const l: SvgTrace[] = [];
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = pitch / 2 + i * pitch;
    const c = mkCube(-0.5, -0.5, 0, 16, x, h - 58);
    s +=
      `<path class="z-c" pathLength="1" d="${c.h}"/>` +
      `<path class="z-a" pathLength="1" d="${c.v}"/>` +
      `<path class="z-pad z-pu" style="animation-delay:-${round1(4.5 - i * 0.75)}s;animation-duration:4.5s" d="${pathData(c.t, true)}"/>`;
    if (i < n - 1) {
      const y0 = h - 72;
      const mid = h - 57;
      l.push(
        trace(
          r,
          [
            [pitch * 0.07, y0],
            [pitch * 0.35, y0],
            [pitch * 0.48, mid],
            [pitch * 0.52, mid],
            [pitch * 0.65, y0],
            [pitch * 0.93, y0],
          ].map((p) => [x + p[0], p[1]]),
          { d: 4.5, dl: -(4.5 - i * 0.75) }
        )
      );
    }
  }
  return asm(l) + s;
};

/* g11 — mirror crown */
const genCrown: Gen = (r, _uid, walls) => {
  const [w, h] = walls;
  const l: SvgTrace[] = [];
  for (let t = 0; t < 6; t++)
    l.push(
      trace(
        r,
        walk(
          r,
          makeMapper(w / 2 - t * 16, h - 4, 22),
          9,
          [0, 0, 0],
          (q) => q[1] > 16 && q[1] < h - 2 && q[0] > 16,
          [[0, -1], [1, 1], [2, 1], [0, -1]]
        )
      )
    );
  const half = asm(l);
  return (
    half +
    `<g transform="translate(${w} 0) scale(-1 1)">${half}</g>`
  );
};

/* derived — gap rail (About sticky signature) */
const genGapRail: Gen = (r, uid, walls) => {
  const [w, h, step] = walls;
  const l: SvgTrace[] = [];
  for (let t = 0; t < Math.floor((h - 30) / step); t++)
    l.push(
      trace(
        r,
        walk(
          r,
          makeMapper(4, 24 + t * step, 22),
          4,
          [0, 0, 0],
          (q) => q[0] < w - 6 && q[1] > 6 && q[1] < h - 6,
          [[0, 1], [1, -1], [2, -1], [2, 1]]
        )
      )
    );
  return (
    defs("f3" + uid, w, h, lin("f3" + uid, 0, 0, w, 0)) +
    `<g mask="url(#f3${uid})">` +
    `<path class="z-b" pathLength="1" d="M4 0V${h}"/>` +
    `<path class="z-a z-mv" pathLength="1" style="animation-duration:9s" d="M4 0V${h}"/>` +
    asm(l) +
    `</g>`
  );
};

/* derived — per-card stub: short vertical route with one branch */
const genStub: Gen = (r, _uid, walls) => {
  const [w, h] = walls;
  const bendY = h * 0.55;
  const bx = w * 0.55;
  return (
    dotEl([1, 2], 1.6, "", "") +
    `<path class="z-b" pathLength="1" d="M1 2V${h}"/>` +
    `<path class="z-a z-mv" pathLength="1" style="animation-duration:6s;animation-delay:-${round1(r() * 3)}s" d="M1 0V${bendY}L${round1(bx)} ${round1(bendY - 4)}V${round1(bendY - 8)}"/>` +
    dotEl([bx, bendY - 10], 1.8, "z-pu", delayAttr(r, 3)) +
    dotEl([1, h - 2], 1.6, "z-pu", delayAttr(r, 4))
  );
};

type VariantMeta = {
  w: number;
  h: number;
  seed: number;
  walls: number[];
  gen: Gen;
  preserve?: "xMidYMid meet" | "xMidYMid slice";
};

export const circuitVariants: Record<CircuitVariant, VariantMeta> = {
  headerRoots: { w: 1200, h: 220, seed: 8, walls: [1200, 220], gen: genHeaderRoots, preserve: "xMidYMid slice" },
  corner: { w: 400, h: 400, seed: 12, walls: [400, 400, 20], gen: genCorner },
  cornerMicro: { w: 200, h: 200, seed: 12, walls: [200, 200, 10], gen: genCorner },
  rhombi: { w: 400, h: 300, seed: 3, walls: [400, 300], gen: genRhombi },
  chip: { w: 400, h: 400, seed: 15, walls: [400, 400], gen: genChip },
  routing: { w: 400, h: 300, seed: 18, walls: [400, 300, 7], gen: genRouting, preserve: "xMidYMid slice" },
  pipeline: { w: 1200, h: 130, seed: 1, walls: [1200, 130, 6], gen: genPipeline, preserve: "xMidYMid slice" },
  crown: { w: 1200, h: 200, seed: 10, walls: [1200, 200], gen: genCrown, preserve: "xMidYMid slice" },
  gapRail: { w: 64, h: 600, seed: 22, walls: [64, 600, 54], gen: genGapRail },
  stub: { w: 10, h: 96, seed: 5, walls: [10, 96], gen: genStub },
};

export const renderCircuit = (
  variant: CircuitVariant,
  uid: string,
  overrides: { seed?: number; walls?: number[]; preserve?: "xMidYMid meet" | "xMidYMid slice" } = {}
): { svg: string; w: number; h: number } => {
  const meta = circuitVariants[variant];
  const walls = overrides.walls || meta.walls;
  const r = createRng(overrides.seed ?? meta.seed);
  const inner = meta.gen(r, uid, walls);
  const svg =
    `<svg class="z-root" xmlns="http://www.w3.org/2000/svg"` +
    ` viewBox="0 0 ${walls[0]} ${walls[1]}" fill="none"` +
    ` preserveAspectRatio="${overrides.preserve || meta.preserve || "xMidYMid meet"}"` +
    ` aria-hidden="true" focusable="false">${inner}</svg>`;
  return { svg, w: walls[0], h: walls[1] };
};
