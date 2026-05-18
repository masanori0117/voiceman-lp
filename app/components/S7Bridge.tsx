import { Fragment } from "react";
import { BarChart2, Mic, UserRound } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Section 7 — Implementation Bridge
 *
 * Three step cards:
 *   01 面接官と業界を選ぶ
 *   02 質問に音声で回答
 *   03 即座に8軸採点とフィードバック
 *
 * Layout:
 *   - md+ : 3 columns side-by-side, accent arrow SVG between cards
 *   - <md : 3 cards stacked vertically with downward arrows between
 *
 * Visual treatment:
 *   - Each card has a giant outline-style step number top-right
 *     (intentional craft, not "AI watermark" feel)
 *   - Icon sits inside a dimensional accent tile
 *   - Estimated time chip ("30秒" etc.) gives a sense of velocity
 *   - Connector arrows use a hand-drawn-like dash + arrowhead
 */

type Step = {
  n: string;
  title: string;
  body: string;
  Icon: typeof UserRound;
  /** Small "duration" label (gives the steps a sense of velocity) */
  duration: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "面接官と業界を選ぶ",
    body: "4 人の面接官 × 業界・職種から、今日鍛えたい組み合わせを 30 秒で選択。",
    Icon: UserRound,
    duration: "30 sec",
  },
  {
    n: "02",
    title: "質問に音声で回答",
    body: "実際の面接と同じく、30〜90 秒で声に出して回答。あなたのペースで何度でも。",
    Icon: Mic,
    duration: "60 sec",
  },
  {
    n: "03",
    title: "即座に 8 軸採点とフィードバック",
    body: "5 秒で文字起こし、15 秒で 8 軸スコア。「次にどう変えるか」が、その場で見える。",
    Icon: BarChart2,
    duration: "20 sec",
  },
];

function HorizontalArrow() {
  return (
    <svg
      viewBox="0 0 56 12"
      width="56"
      height="12"
      fill="none"
      aria-hidden
      style={{ display: "block", color: "var(--accent)" }}
    >
      {/* Dashed shaft for an "in-progress" feel */}
      <path
        d="M2 6h44"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeDasharray="2 5"
        opacity={0.7}
      />
      {/* Solid head */}
      <path
        d="M40 1l8 5-8 5"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerticalArrow() {
  return (
    <svg
      viewBox="0 0 12 36"
      width="12"
      height="36"
      fill="none"
      aria-hidden
      style={{ display: "block", color: "var(--accent)" }}
    >
      <path
        d="M6 2v26"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeDasharray="2 5"
        opacity={0.7}
      />
      <path
        d="M1 24l5 8 5-8"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function S7Bridge() {
  return (
    <section
      id="flow"
      style={{
        background: "var(--bg-soft)",
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
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

      <div className="container-x">
        <Reveal>
          <div className="chip-line">07 / Implementation Bridge</div>
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
            VoiceMen の<span className="hl-mark">3 ステップ</span>。
          </h2>
          <p
            className="ink-soft jp-wrap"
            style={{
              marginTop: 18,
              fontSize: 15,
              lineHeight: 1.85,
              maxWidth: 600,
            }}
          >
            登録から最初のスコアまで、平均 3 分。今日の通勤時間で 1 セッションが終わります。
          </p>
        </Reveal>

        {/* Mobile-first stacked layout. md+ becomes a 3-column row. */}
        <div
          className="bridge-flow"
          style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
          }}
        >
          <style>{`
            @media (min-width: 768px) {
              .bridge-flow {
                flex-direction: row !important;
                align-items: stretch !important;
                gap: 12px !important;
              }
              .bridge-card { flex: 1 1 0 !important; min-width: 0 !important; }
              .bridge-arrow-h { display: inline-flex !important; }
              .bridge-arrow-v { display: none !important; }
            }
            @media (max-width: 767.98px) {
              .bridge-arrow-h { display: none !important; }
              .bridge-arrow-v { display: inline-flex !important; }
              .bridge-card { width: 100% !important; max-width: 480px !important; }
            }
          `}</style>

          {STEPS.map((s, i) => {
            const Icon = s.Icon;
            return (
              <Fragment key={s.n}>
                <Reveal
                  delay={i * 100}
                  className="bridge-card"
                  style={{ display: "flex", width: "100%" }}
                >
                  <div
                    style={{
                      position: "relative",
                      padding: "28px 28px 26px",
                      borderRadius: 14,
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      boxSizing: "border-box",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top accent strip — purely decorative; gives each card a sense of "this section" */}
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background:
                          "linear-gradient(90deg, var(--accent) 0%, color-mix(in oklab, var(--accent) 30%, transparent) 100%)",
                      }}
                    />

                    {/* Step number, top-right — solid muted ink, anchors the card without dominating */}
                    <span
                      aria-hidden
                      className="font-num tick-num"
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 18,
                        fontFamily:
                          'var(--font-num), Inter, system-ui, sans-serif',
                        fontSize: 64,
                        lineHeight: 1,
                        fontWeight: 800,
                        letterSpacing: "-0.05em",
                        color: "var(--ink-mute)",
                        pointerEvents: "none",
                      }}
                    >
                      {s.n}
                    </span>

                    {/* Step chip + duration */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <span
                        className="font-num"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 10px",
                          borderRadius: 999,
                          background:
                            "color-mix(in oklab, var(--accent) 12%, var(--surface))",
                          border:
                            "1px solid color-mix(in oklab, var(--accent) 30%, var(--line))",
                          color: "var(--accent)",
                          fontSize: 10.5,
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                        }}
                      >
                        Step {s.n}
                      </span>
                      <span
                        className="font-num"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 10.5,
                          color: "var(--ink-mute)",
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        ≈ {s.duration}
                      </span>
                    </div>

                    {/* Icon tile */}
                    <span
                      style={{
                        marginTop: 10,
                        width: 64,
                        height: 64,
                        borderRadius: 14,
                        background:
                          "linear-gradient(160deg, color-mix(in oklab, var(--accent) 18%, var(--surface)) 0%, color-mix(in oklab, var(--accent) 6%, var(--surface)) 100%)",
                        border:
                          "1px solid color-mix(in oklab, var(--accent) 25%, var(--line))",
                        color: "var(--accent)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <Icon size={40} strokeWidth={1.8} />
                    </span>

                    {/* Title */}
                    <h3
                      className="font-bold jp-wrap"
                      style={{
                        color: "var(--ink)",
                        fontSize: 19,
                        fontWeight: 700,
                        letterSpacing: "-0.005em",
                        marginTop: 6,
                        marginBottom: 0,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {s.title}
                    </h3>

                    {/* Body */}
                    <p
                      className="ink-soft jp-wrap"
                      style={{
                        fontSize: 14,
                        lineHeight: 1.9,
                        margin: 0,
                        color: "var(--ink-soft)",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                </Reveal>

                {/* Connector arrow between cards (not after the last) */}
                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className="bridge-arrow-h"
                      style={{ display: "none" }}
                    >
                      <HorizontalArrow />
                    </span>
                    <span
                      className="bridge-arrow-v"
                      style={{ display: "inline-flex" }}
                    >
                      <VerticalArrow />
                    </span>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Bottom hairline meta — gives the section a closing chord */}
        <Reveal delay={400}>
          <div
            style={{
              marginTop: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              fontSize: 12,
              color: "var(--ink-mute)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 28,
                height: 1,
                background: "var(--line-strong)",
              }}
            />
            <span
              className="font-num"
              style={{
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              total ≈ 3 min / session
            </span>
            <span
              aria-hidden
              style={{
                width: 28,
                height: 1,
                background: "var(--line-strong)",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
