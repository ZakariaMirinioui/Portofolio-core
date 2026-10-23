export type DecorSide = "rail" | "spine" | "none";

export type DecorConfig = {
  left: DecorSide;
  right: DecorSide;
  hiddenRoutes: string[];
};

/**
 * Swap sides or switch any side to "none" later. hiddenRoutes takes
 * locale-less paths (e.g. "/dossera") that should not show the decor.
 */
export const decorConfig: DecorConfig = {
  left: "rail",
  right: "spine",
  hiddenRoutes: [],
};

export const CIRCUIT_HEIGHT = 1800;
export const RAIL_VIEWBOX = 180;
export const SPINE_VIEWBOX = 240;
export const RAIL_LINE_X = 4;
export const SPINE_TRUNK_X = 120;
export const TRUNK_DASH_LENGTH = 120;
export const CONTENT_MAX_PX = 1280;
export const GUTTER_MIN_PX = 120;
export const MIN_VIEWPORT_PX = CONTENT_MAX_PX + GUTTER_MIN_PX * 2;

const ISO_COS = 0.866;

const project = (x: number, y: number, z: number, u: number): [number, number] => [
  (x - y) * ISO_COS * u,
  ((x + y) * 0.5 - z) * u,
];

const round1 = (n: number) => Math.round(n * 10) / 10;

export type Pt2 = [number, number];

export const pathData = (pts: Pt2[]): string =>
  "M" + pts.map((q) => round1(q[0]) + " " + round1(q[1])).join("L");

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

export type CircuitTrace = {
  pts: Pt2[];
  dur: number;
  delay: number;
  mini?: boolean;
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

const makeTrace = (r: () => number, pts: [number, number][], dur?: number, mini?: boolean): CircuitTrace => ({
  pts,
  dur: dur || 4 + r() * 4,
  delay: -r() * 6,
  mini,
});

export const railTraces = (H: number, seed = 13): CircuitTrace[] => {
  const r = createRng(seed);
  const o: CircuitTrace[] = [];
  for (let t = 0; t < Math.floor((H - 30) / 80); t++) {
    o.push(
      makeTrace(
        r,
        walk(
          r,
          makeMapper(RAIL_LINE_X, 24 + t * 80, 22),
          5,
          [0, 0, 0],
          (q) => q[0] < 172 && q[1] > 6 && q[1] < H - 6,
          [[0, 1], [1, -1], [2, -1], [2, 1]]
        )
      )
    );
  }
  return o;
};

export const spineTraces = (H: number, seed = 6): CircuitTrace[] => {
  const r = createRng(seed);
  const o: CircuitTrace[] = [];
  for (let i = 0; 50 + i * 78 < H - 60; i++) {
    const side = i % 2 ? -1 : 1;
    const A = side > 0 ? 1 : 0;
    const B = 1 - A;
    const Q = makeMapper(SPINE_TRUNK_X, 50 + i * 78, 22);
    const p = [0, 0, 0] as Point3;
    p[A] -= 1 + Math.floor(r() * 2);
    const q = p.slice() as Point3;
    q[2] += (r() < 0.5 ? -1 : 1) * (1 + Math.floor(r() * 2));
    const s = q.slice() as Point3;
    s[B] += 1 + Math.floor(r() * 2);
    const pts: [number, number][] = [Q(0, 0, 0), Q(...p), Q(...q), Q(...s)];
    o.push(makeTrace(r, pts, undefined, false));
    const e = pts[3];
    o.push(
      makeTrace(
        r,
        walk(
          r,
          makeMapper(e[0], e[1], 10),
          2,
          [0, 0, 0],
          () => true,
          [[2, 1], [2, -1], [A, -1], [B, 1]]
        ),
        3,
        true
      )
    );
  }
  return o;
};
