import {
  CIRCUIT_HEIGHT,
  RAIL_VIEWBOX,
  RAIL_LINE_X,
  SPINE_VIEWBOX,
  SPINE_TRUNK_X,
  TRUNK_DASH_LENGTH,
  decorConfig,
  pathData,
  railTraces,
  spineTraces,
  type CircuitTrace,
} from "@/config/decor";

const H = CIRCUIT_HEIGHT;
const trunkDash = `${(TRUNK_DASH_LENGTH / H).toFixed(6)} ${(1 - TRUNK_DASH_LENGTH / H).toFixed(6)}`;
const trunkCycle = `${(H / 100).toFixed(1)}s`;

function TraceMark({ t }: { t: CircuitTrace }) {
  const start = t.pts[0];
  const end = t.pts[t.pts.length - 1];
  return (
    <>
      {t.mini ? null : (
        <path
          className="zc-a zc-mv"
          d={pathData(t.pts)}
          pathLength={1}
          style={{ animationDuration: `${t.dur.toFixed(3)}s`, animationDelay: `${t.delay.toFixed(3)}s` }}
        />
      )}
      <circle className="zc-b" cx={start[0]} cy={start[1]} r={3.4} />
      <circle
        className="zc-d zc-pu"
        cx={end[0]}
        cy={end[1]}
        r={2.4}
        style={{ animationDelay: `${t.delay.toFixed(3)}s` }}
      />
    </>
  );
}

function TrunkLine({ d }: { d: string }) {
  return (
    <>
      <path className="zc-c" d={d} />
      <path
        className="zc-a zc-mv"
        d={d}
        pathLength={1}
        strokeDasharray={trunkDash}
        style={{ animationDuration: trunkCycle }}
      />
      <path
        className="zc-a zc-mv"
        d={d}
        pathLength={1}
        strokeDasharray={trunkDash}
        style={{ animationDuration: trunkCycle, animationDelay: `-${(H / 200).toFixed(1)}s` }}
      />
    </>
  );
}

function SideRail() {
  const traces = railTraces(H);
  return (
    <div className="zc-side zc-left">
      <div className="zc-fade zc-fade-right">
        <svg
          viewBox={`0 0 ${RAIL_VIEWBOX} ${H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", height: "auto" }}
        >
          <path className="zc-c" d={`M${RAIL_LINE_X} 0V${H}`} />
          <path
            className="zc-a zc-mv"
            d={`M${RAIL_LINE_X} 0V${H}`}
            pathLength={1}
            strokeDasharray={trunkDash}
            style={{ animationDuration: trunkCycle }}
          />
          <path
            className="zc-a zc-mv"
            d={`M${RAIL_LINE_X} 0V${H}`}
            pathLength={1}
            strokeDasharray={trunkDash}
            style={{ animationDuration: trunkCycle, animationDelay: `-${(H / 200).toFixed(1)}s` }}
          />
          <path className="zc-c" d={traces.map((t) => pathData(t.pts)).join("")} />
          {traces.map((t, i) => (
            <TraceMark key={`rail-${i}`} t={t} />
          ))}
        </svg>
      </div>
    </div>
  );
}

function SideSpine() {
  const traces = spineTraces(H);
  return (
    <div className="zc-side zc-right">
      <div className="zc-fade zc-fade-left">
        <svg
          viewBox={`0 0 ${SPINE_VIEWBOX} ${H}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", height: "auto" }}
        >
          <TrunkLine d={`M${SPINE_TRUNK_X} 0V${H}`} />
          <path className="zc-c" d={traces.map((t) => pathData(t.pts)).join("")} />
          {traces.map((t, i) => (
            <TraceMark key={`spine-${i}`} t={t} />
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function SideCircuits() {
  return (
    <div className="zc-fixed" aria-hidden="true">
      {decorConfig.left === "rail" ? <SideRail /> : null}
      {decorConfig.left === "spine" ? <SideSpine /> : null}
      {decorConfig.right === "rail" ? <SideRail /> : null}
      {decorConfig.right === "spine" ? <SideSpine /> : null}
    </div>
  );
}
