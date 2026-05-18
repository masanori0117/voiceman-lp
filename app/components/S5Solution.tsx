import { HelpCircle, Mic, Sparkles, Star, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Section 5 — Solution Reframing
 *
 * - Tone shifts from "pain" to "solution".
 * - Centerpiece: SVG cycle diagram with 4 nodes
 *   (質問 → 答える → 採点 → 改善 → 質問) arranged on a circle,
 *   accent-colored arrows between nodes, and the VoiceMen logo
 *   (mic icon + wordmark) at the dead center.
 * - Description copy below the diagram explains the loop.
 *
 * The diagram is rendered with viewBox so it scales fluidly down to
 * 375px viewports without horizontal scroll.
 */

type CycleNode = {
  /** Display label (Japanese) */
  label: string;
  /** Position on the circle in degrees (0 = top, clockwise) */
  angle: number;
  /** Lucide icon component */
  Icon: typeof HelpCircle;
};

const NODES: CycleNode[] = [
  { label: "質問", angle: 0, Icon: HelpCircle },
  { label: "答える", angle: 90, Icon: Mic },
  { label: "採点", angle: 180, Icon: Star },
  { label: "改善", angle: 270, Icon: TrendingUp },
];

// SVG canvas constants
const VB = 560; // viewBox size (square) — sized to leave room for outer labels (Japanese + sub-EN) without clipping at any angle
const CENTER = VB / 2;
const RADIUS = 170; // node circle radius
const NODE_R = 30; // node icon-circle radius (=60px diameter visual)

function polar(angleDeg: number, r: number) {
  // Convert: 0deg = top, clockwise
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  };
}

/**
 * Returns SVG path "M start ... A ... end" for a curved arc that
 * starts at the edge of node `from` and ends just before the edge
 * of node `to`, along the cycle circle.
 */
function arcPath(fromAngle: number, toAngle: number) {
  // Pull endpoints in by NODE_R + small gap so the arrow doesn't overlap nodes.
  const gap = NODE_R + 10;
  const angularGap = (gap / RADIUS) * (180 / Math.PI);
  const startAngle = fromAngle + angularGap;
  const endAngle = toAngle - angularGap;

  const start = polar(startAngle, RADIUS);
  const end = polar(endAngle, RADIUS);

  return {
    d: `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`,
    end,
    tangentDeg: endAngle,
  };
}

export default function S5Solution() {
  return (
    <section
      id="solution"
      style={{
        // Base background uses the canonical --bg-grad token so the section sits
        // consistently with the rest of the page; an accent halo radial gradient
        // is layered on top to communicate the "pain → solution" tonal shift.
        background:
          "radial-gradient(120% 60% at 50% 0%, color-mix(in oklab, var(--accent) 14%, transparent) 0%, transparent 55%), var(--bg-grad)",
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft hairline divider top */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, var(--line-strong) 50%, transparent 100%)",
        }}
      />

      {/* Decorative dot grid, faded — adds depth so the bright surface doesn't feel flat */}
      <div
        aria-hidden
        className="dotgrid-fade"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      <div className="container-x" style={{ position: "relative" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div
              className="chip-line"
              style={{
                display: "inline-flex",
                justifyContent: "center",
                color: "var(--accent)",
              }}
            >
              <Sparkles
                size={14}
                strokeWidth={1.8}
                style={{ marginRight: 4, opacity: 0.9 }}
              />
              05 / Solution Reframing
            </div>
            <h2
              className="font-bold jp-wrap"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
                marginTop: 16,
              }}
            >
              じつは、解決策は
              <br className="md:hidden" />
              <span className="hl-mark">全く違う場所</span>にあります。
            </h2>
            <p
              className="ink-soft jp-wrap"
              style={{
                marginTop: 18,
                fontSize: 15,
                lineHeight: 1.95,
                maxWidth: 560,
                margin: "18px auto 0",
              }}
            >
              想定問答を増やしても、面接力は上がりません。
              本当に必要なのは、声で答え・採点され・直す、その
              <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                ループ
              </span>
              を毎日回せる場所です。
            </p>
          </Reveal>
        </div>

        {/* Cycle diagram */}
        <Reveal delay={120}>
          <div
            style={{
              marginTop: 56,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 540,
                position: "relative",
              }}
            >
              <svg
                viewBox={`0 0 ${VB} ${VB}`}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                }}
                role="img"
                aria-label="VoiceMen のフィードバックサイクル：質問、答える、採点、改善"
              >
                <defs>
                  {/* Arrowhead marker (accent color) */}
                  <marker
                    id="cycle-arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
                  </marker>

                  {/* Soft halo behind center */}
                  <radialGradient id="cycle-halo" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.18"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0"
                    />
                  </radialGradient>

                  {/* Node fill gradient — gives nodes a subtle dimensional feel */}
                  <radialGradient id="node-fill" cx="35%" cy="30%" r="80%">
                    <stop offset="0%" stopColor="var(--surface)" />
                    <stop
                      offset="100%"
                      stopColor="color-mix(in oklab, var(--accent) 18%, var(--surface))"
                    />
                  </radialGradient>
                </defs>

                {/* Center halo */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={108}
                  fill="url(#cycle-halo)"
                />

                {/* Faint outer guide circle */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  opacity={0.7}
                />

                {/* 4 connecting arcs with accent color + arrowhead */}
                {NODES.map((n, i) => {
                  const next = NODES[(i + 1) % NODES.length];
                  const { d } = arcPath(n.angle, next.angle);
                  return (
                    <path
                      key={`arc-${i}`}
                      d={d}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      markerEnd="url(#cycle-arrow)"
                      opacity={0.95}
                    />
                  );
                })}

                {/* Center logo group (mic icon + wordmark) — vertically stacked, both centered */}
                <g>
                  {/* Soft inner card behind logo */}
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={72}
                    fill="var(--surface)"
                    stroke="var(--line-strong)"
                    strokeWidth="1"
                    opacity={0.97}
                  />
                  {/* Mic glyph (Lucide Mic) — scaled to 24px and centered horizontally above the wordmark.
                      The icon's native viewBox is 24x24; we translate so its center sits at (CENTER, CENTER - 22). */}
                  <g transform={`translate(${CENTER - 12} ${CENTER - 34})`}>
                    {/* Soft accent disc behind the mic for visual weight */}
                    <circle
                      cx={12}
                      cy={12}
                      r={16}
                      fill="color-mix(in oklab, var(--accent) 14%, var(--surface))"
                    />
                    <g
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <path d="M12 19v3" />
                      <path d="M8 22h8" />
                    </g>
                  </g>
                  {/* Wordmark — centered under the mic glyph */}
                  <text
                    x={CENTER}
                    y={CENTER + 18}
                    textAnchor="middle"
                    fill="var(--ink)"
                    fontSize="30"
                    fontWeight={800}
                    fontFamily='var(--font-num), Inter, system-ui, sans-serif'
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    VoiceMen
                  </text>
                  <text
                    x={CENTER}
                    y={CENTER + 38}
                    textAnchor="middle"
                    fill="var(--ink-mute)"
                    fontSize="9"
                    fontWeight={600}
                    fontFamily='var(--font-num), Inter, system-ui, sans-serif'
                    style={{ letterSpacing: "0.32em" }}
                  >
                    LOOP ENGINE
                  </text>
                </g>

                {/* 4 nodes */}
                {NODES.map((n, i) => {
                  const p = polar(n.angle, RADIUS);
                  // Push label outward away from center
                  const labelP = polar(n.angle, RADIUS + 56);
                  return (
                    <g key={`node-${i}`}>
                      {/* Outer halo (gives the node a soft glow on dark BG) */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={NODE_R + 8}
                        fill="color-mix(in oklab, var(--accent) 8%, transparent)"
                      />
                      {/* Node circle (56px diameter visual: r=28) */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={NODE_R}
                        fill="url(#node-fill)"
                        stroke="var(--accent)"
                        strokeWidth="2"
                      />
                      {/* Step number badge — small chip floating outside the node */}
                      <g transform={`translate(${p.x + (n.angle === 90 ? 24 : n.angle === 270 ? -24 : 0)} ${p.y + (n.angle === 0 ? -24 : n.angle === 180 ? 24 : 0)})`}>
                        <circle
                          cx={0}
                          cy={0}
                          r={11}
                          fill="var(--accent)"
                          stroke="var(--surface)"
                          strokeWidth={2}
                        />
                        <text
                          x={0}
                          y={3.5}
                          textAnchor="middle"
                          fill="#fff"
                          fontSize="10"
                          fontWeight={800}
                          fontFamily='var(--font-num), Inter, system-ui, sans-serif'
                        >
                          {String(i + 1).padStart(2, "0")}
                        </text>
                      </g>
                      {/* Label outside the node — JP label only; the EN sub label
                          would clip at the SVG edges on small viewports (375px) */}
                      <text
                        x={labelP.x}
                        y={labelP.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="var(--ink)"
                        fontSize="18"
                        fontWeight={700}
                        fontFamily='var(--font-body), "Noto Sans JP", system-ui, sans-serif'
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Foreground icon overlay layer (to render Lucide icons inside node circles).
                  We absolutely position these on top of the SVG using percentages so they
                  scale with the SVG. */}
              <div
                aria-hidden
                style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              >
                {NODES.map((n, i) => {
                  const p = polar(n.angle, RADIUS);
                  const Icon = n.Icon;
                  // Convert SVG coords to percentages of the viewBox
                  const leftPct = (p.x / VB) * 100;
                  const topPct = (p.y / VB) * 100;
                  return (
                    <span
                      key={`icon-${i}`}
                      style={{
                        position: "absolute",
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        transform: "translate(-50%, -50%)",
                        color: "var(--accent)",
                        display: "inline-flex",
                      }}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Description copy */}
        <Reveal delay={240}>
          <p
            className="ink-soft jp-wrap"
            style={{
              maxWidth: 720,
              margin: "48px auto 0",
              textAlign: "center",
              fontSize: 15.5,
              lineHeight: 1.95,
            }}
          >
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>VoiceMen</span>
            が、AI 面接官・8 軸採点・即時フィードバックで、
            <br className="hidden md:block" />
            独り練習を
            <span className="hl-mark">フィードバック付き練習</span>
            に変えます。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
