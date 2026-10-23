import type { CSSProperties } from "react";
import {
  renderCircuit,
  type CircuitVariant,
} from "@/config/decor";

type CircuitProps = {
  variant: CircuitVariant;
  /** Unique per placement — namespaces mask/gradient ids on the page. */
  uid: string;
  seed?: number;
  walls?: number[];
  /** Aspect-fit override (default: the variant's meta preserve). */
  preserve?: "xMidYMid meet" | "xMidYMid slice";
  /** Positioning/cropping classes come from the placement wrapper. */
  className?: string;
  style?: CSSProperties;
  /** Island-driven reveal (default). Off for always-visible static art. */
  io?: boolean;
  /** Dash draw-in on first reveal. */
  draw?: boolean;
  /** Fade to 0.12 while the host is off-screen. */
  fade?: boolean;
};

export default function Circuit({
  variant,
  uid,
  seed,
  walls,
  preserve,
  className = "",
  style,
  io = true,
  draw,
  fade,
}: CircuitProps) {
  const { svg } = renderCircuit(variant, uid, { seed, walls, preserve });
  const cls = [
    "z-host",
    io ? "z-io" : "",
    draw ? "z-draw" : "",
    fade ? "z-fade" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      aria-hidden="true"
      className={cls}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
