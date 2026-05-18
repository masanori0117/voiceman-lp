"use client";

import { useEffect, useState } from "react";

const INTERVIEWERS = [
  { initial: "新", role: "人事部長" },
  { initial: "佐", role: "現場マネージャー" },
  { initial: "高", role: "役員" },
  { initial: "黒", role: "圧迫面接官" },
];

const AXES = [
  { ja: "論理", en: "Logic", base: 78 },
  { ja: "構造", en: "Structure", base: 72 },
  { ja: "具体性", en: "Specificity", base: 65 },
  { ja: "声量", en: "Voice", base: 81 },
  { ja: "ペース", en: "Pace", base: 70 },
  { ja: "間投詞", en: "Filler", base: 58 },
  { ja: "結論先出し", en: "Conclusion", base: 88 },
  { ja: "熱量", en: "Enthusiasm", base: 76 },
];

const WAVE_BAR_COUNT = 32;

// pre-compute waveform heights once (deterministic, but visually varied)
const WAVE_HEIGHTS = Array.from({ length: WAVE_BAR_COUNT }, (_, i) => {
  // smooth bell-ish envelope, peak in the centre, with two side ridges
  const t = (i + 0.5) / WAVE_BAR_COUNT;
  const env =
    Math.sin(t * Math.PI) * 0.7 +
    Math.sin(t * Math.PI * 3) * 0.18 +
    0.18;
  return Math.max(0.22, Math.min(1, env));
});

export default function InterviewMockup() {
  const [tick, setTick] = useState(0);
  const liveSpeaker = 1; // index of the currently-speaking interviewer

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const scores = AXES.map((ax, i) =>
    Math.max(0, Math.min(100, Math.round(ax.base + Math.sin((tick + i) * 0.7) * 3)))
  );

  return (
    <div
      className="card glow-card relative overflow-hidden"
      style={{
        aspectRatio: "1 / 1.05",
        borderRadius: 16,
        border: "1px solid var(--line)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--surface) 92%, var(--accent) 8%) 0%, var(--surface) 35%, var(--surface-2) 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar — REC indicator + session label + timer */}
      <div
        className="flex items-center justify-between relative z-[1]"
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--line)",
          background: "color-mix(in oklab, var(--surface-2) 88%, transparent)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="flex items-center" style={{ gap: 10 }}>
          <span
            className="rec-dot rounded-full"
            style={{
              width: 8,
              height: 8,
              background: "#ef4444",
              boxShadow:
                "0 0 0 3px rgba(239, 68, 68, 0.18), 0 0 12px rgba(239, 68, 68, 0.55)",
            }}
            aria-label="recording"
          />
          <span
            className="font-num"
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--ink-soft)",
              textTransform: "uppercase",
            }}
          >
            REC
          </span>
          <span
            aria-hidden
            style={{
              width: 1,
              height: 12,
              background: "var(--line-strong)",
            }}
          />
          <span
            style={{
              fontSize: 11.5,
              color: "var(--ink-soft)",
            }}
          >
            Session 03 · 想定問答 / 営業
          </span>
        </div>
        <span
          className="font-num tick-num"
          style={{
            fontSize: 12,
            color: "var(--ink)",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          02:14
        </span>
      </div>

      {/* Body */}
      <div
        className="flex-1 flex flex-col relative z-[1]"
        style={{ padding: 18, gap: 16 }}
      >
        {/* Interviewers 2x2 */}
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <span
              className="chip-line"
              style={{ fontSize: 10 }}
            >
              Interviewers
            </span>
            <span
              className="font-num"
              style={{
                fontSize: 9.5,
                color: "var(--ink-mute)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              4 panel
            </span>
          </div>
          <div className="grid grid-cols-2" style={{ gap: 8 }}>
            {INTERVIEWERS.map((p, i) => {
              const isLive = i === liveSpeaker;
              return (
                <div
                  key={p.initial}
                  className="flex items-center"
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    gap: 10,
                    border: isLive
                      ? "1px solid color-mix(in oklab, var(--accent) 55%, var(--line-strong))"
                      : "1px solid var(--line)",
                    background: isLive
                      ? "color-mix(in oklab, var(--accent) 10%, var(--surface-2))"
                      : "color-mix(in oklab, var(--surface) 70%, transparent)",
                    boxShadow: isLive
                      ? "0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent), 0 8px 20px -12px color-mix(in oklab, var(--accent) 60%, transparent)"
                      : "none",
                    transition: "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  <div
                    className="rounded-full flex items-center justify-center font-bold relative"
                    style={{
                      width: 32,
                      height: 32,
                      fontSize: 13,
                      background: isLive
                        ? "linear-gradient(180deg, var(--accent) 0%, var(--accent-deep) 100%)"
                        : "color-mix(in oklab, var(--ink) 12%, var(--surface))",
                      color: isLive ? "#fff" : "var(--ink)",
                      border: isLive
                        ? "1px solid color-mix(in oklab, var(--accent) 70%, white)"
                        : "1px solid var(--line-strong)",
                      flex: "0 0 auto",
                    }}
                  >
                    {p.initial}
                  </div>
                  <div className="min-w-0" style={{ flex: 1 }}>
                    <div
                      className="ink"
                      style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {p.role}
                    </div>
                    <div
                      className="font-num"
                      style={{
                        fontSize: 9.5,
                        color: isLive ? "var(--accent)" : "var(--ink-mute)",
                        letterSpacing: "0.16em",
                        marginTop: 3,
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {isLive ? (
                        <>
                          <span
                            className="rec-dot"
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: 999,
                              background: "var(--accent)",
                              display: "inline-block",
                            }}
                          />
                          LIVE
                        </>
                      ) : (
                        "STANDBY"
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question */}
        <div
          style={{
            position: "relative",
            padding: "14px 16px 14px 18px",
            borderRadius: 10,
            background: "color-mix(in oklab, var(--ink) 5%, var(--surface))",
            border: "1px solid var(--line)",
            borderLeft: "2px solid var(--accent)",
          }}
        >
          <div
            className="chip-line"
            style={{ fontSize: 10, marginBottom: 6 }}
          >
            Q.07 / 12
          </div>
          <p
            className="ink jp-wrap"
            style={{ fontSize: 13, lineHeight: 1.7, fontWeight: 500 }}
          >
            これまでのキャリアで、最も困難だった意思決定について聞かせてください。
          </p>
        </div>

        {/* 8-axis scores */}
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <span
              className="chip-line"
              style={{ fontSize: 10 }}
            >
              Live Score
            </span>
            <span
              className="font-num"
              style={{
                fontSize: 10,
                color: "var(--accent)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              8軸 · リアルタイム
            </span>
          </div>
          <div className="grid grid-cols-2" style={{ columnGap: 16, rowGap: 7 }}>
            {AXES.map((ax, i) => {
              const v = scores[i];
              const tier = v >= 80 ? "high" : v >= 65 ? "mid" : "low";
              const color =
                tier === "high"
                  ? "var(--accent)"
                  : tier === "mid"
                    ? "var(--ink-soft)"
                    : "var(--warn)";
              return (
                <div key={ax.en}>
                  <div
                    className="flex items-center justify-between"
                    style={{ fontSize: 10 }}
                  >
                    <span style={{ color: "var(--ink-soft)" }}>{ax.en}</span>
                    <span
                      className="font-num tabular-nums"
                      style={{ color, fontWeight: 600 }}
                    >
                      {v}
                    </span>
                  </div>
                  <div
                    className="rounded-full overflow-hidden"
                    style={{
                      height: 4,
                      marginTop: 3,
                      background: "color-mix(in oklab, var(--ink) 12%, transparent)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${v}%`,
                        background:
                          tier === "high"
                            ? "linear-gradient(90deg, var(--accent-deep), var(--accent))"
                            : color,
                        transition: "width 0.7s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom — live waveform 32 bars */}
      <div
        className="relative z-[1] flex items-center"
        style={{
          padding: "14px 18px 18px",
          borderTop: "1px solid var(--line)",
          background: "color-mix(in oklab, var(--surface-2) 92%, transparent)",
          gap: 10,
        }}
      >
        <span
          className="font-num"
          aria-hidden
          style={{
            fontSize: 10,
            color: "var(--ink-mute)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            flex: "0 0 auto",
          }}
        >
          IN
        </span>
        <div
          className="flex items-center justify-between"
          style={{ flex: 1, gap: 3, height: 32 }}
          aria-hidden
        >
          {WAVE_HEIGHTS.map((h, i) => {
            // colour ramp: outer cool → centre accent. Keeps the pulse readable
            // without screaming "AI rainbow".
            const dist = Math.abs(i - WAVE_BAR_COUNT / 2) / (WAVE_BAR_COUNT / 2);
            const bg =
              dist < 0.35
                ? "var(--accent)"
                : dist < 0.7
                  ? "color-mix(in oklab, var(--accent) 55%, var(--ink-soft))"
                  : "var(--ink-mute)";
            return (
              <span
                key={i}
                className="wave-bar block rounded-sm"
                style={{
                  flex: 1,
                  minWidth: 2,
                  height: `${Math.round(h * 100)}%`,
                  background: bg,
                  opacity: dist < 0.35 ? 1 : 0.85,
                  animationDelay: `${i * 60}ms`,
                  animationDuration: `${0.8 + (i % 3) * 0.2}s`,
                }}
              />
            );
          })}
        </div>
        <span
          className="font-num tabular-nums"
          aria-hidden
          style={{
            fontSize: 10,
            color: "var(--accent)",
            letterSpacing: "0.12em",
            fontWeight: 600,
            flex: "0 0 auto",
          }}
        >
          −12 dB
        </span>
      </div>
    </div>
  );
}
