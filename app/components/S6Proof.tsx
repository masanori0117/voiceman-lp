import {
  CheckCircle2,
  Cpu,
  FileText,
  Lock,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import Reveal from "./Reveal";

/**
 * Section 6 — Proof Cascade
 *
 * Five proof cards in a 2-column grid (md+).
 * The 8-axis score card is "wide" (spans both columns) and includes a
 * radar chart SVG.
 *
 * Order:
 *   row 1: 技術スタック | 4人の面接官
 *   row 2: 履歴書連携 | セキュリティ
 *   row 3: 8軸スコア (full width)
 *
 * Visual strategy:
 *   - Each card has a distinct "personality" (chip/tile/file/badge)
 *     to avoid AI-slop uniform card grids.
 *   - Headers reuse the same chrome (sub label + title + icon chip),
 *     but the body visual differs per card.
 */

// 8-axis labels in spec order
const AXES = [
  "Logic",
  "Structure",
  "Specificity",
  "Voice",
  "Pace",
  "Filler",
  "Conclusion",
  "Enthusiasm",
] as const;

// Static demo scores (0–1)
const SCORES = [0.82, 0.74, 0.68, 0.7, 0.6, 0.55, 0.78, 0.86];

// Card chrome reused across all cards (per spec).
const CARD_STYLE = {
  padding: 28,
  borderRadius: 12,
  background: "var(--surface)",
  border: "1px solid var(--line)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 16,
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
} as const;

function CardHeader({
  sub,
  title,
  Icon,
}: {
  sub: string;
  title: string;
  Icon: typeof Cpu;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div>
        <div
          className="font-num"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
            fontWeight: 600,
          }}
        >
          {sub}
        </div>
        <h3
          className="font-bold jp-wrap"
          style={{
            color: "var(--ink)",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "-0.005em",
            marginTop: 6,
            marginBottom: 0,
          }}
        >
          {title}
        </h3>
      </div>
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "color-mix(in oklab, var(--accent) 12%, var(--surface))",
          color: "var(--accent)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: "1px solid color-mix(in oklab, var(--accent) 25%, var(--line))",
        }}
      >
        <Icon size={20} strokeWidth={1.8} />
      </span>
    </div>
  );
}

/* ---------- Card: 技術スタック ---------- */
function StackCard() {
  return (
    <div className="proof-card" style={CARD_STYLE}>
      <CardHeader sub="Tech Stack" title="技術スタック" Icon={Cpu} />
      <p
        className="ink-soft jp-wrap"
        style={{ fontSize: 14, lineHeight: 1.9, margin: 0 }}
      >
        音声認識は OpenAI Whisper、評価は Anthropic Claude。研究機関レベルの土台に、面接ドメインのプロンプトを重ねています。
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: "auto",
          paddingTop: 8,
        }}
      >
        {[
          { icon: Cpu, name: "OpenAI Whisper", role: "speech → text" },
          { icon: Zap, name: "Anthropic Claude", role: "rubric scoring" },
        ].map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid var(--line)",
                background: "var(--surface-2)",
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "color-mix(in oklab, var(--accent) 14%, var(--surface))",
                  color: "var(--accent)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} strokeWidth={2} />
              </span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--ink)",
                    fontWeight: 700,
                  }}
                >
                  {row.name}
                </div>
                <div
                  className="font-num"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ink-mute)",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {row.role}
                </div>
              </div>
              <CheckCircle2
                size={16}
                strokeWidth={2}
                color="var(--accent)"
                style={{ flexShrink: 0 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Card: 4人の面接官 ---------- */
const INTERVIEWERS = [
  { initial: "新", role: "人事部長", tone: "穏やか" },
  { initial: "佐", role: "現場マネージャー", tone: "実務" },
  { initial: "高", role: "役員", tone: "経営" },
  { initial: "黒", role: "圧迫面接官", tone: "詰め" },
];

function InterviewersCard() {
  return (
    <div className="proof-card" style={CARD_STYLE}>
      <CardHeader sub="4 Interviewers" title="4人の面接官" Icon={Users} />
      <p
        className="ink-soft jp-wrap"
        style={{ fontSize: 14, lineHeight: 1.9, margin: 0 }}
      >
        穏やかな部長から圧迫官まで。質問の文脈と詰め方が変わるので、本命前に「未知の質問への即応力」が育ちます。
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: "auto",
          paddingTop: 8,
        }}
      >
        {INTERVIEWERS.map((p) => (
          <div
            key={p.role}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 12px",
              borderRadius: 10,
              border: "1px solid var(--line)",
              background: "var(--surface-2)",
              minWidth: 0,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--surface)",
                border: "1.5px solid var(--accent)",
                color: "var(--accent)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {p.initial}
            </span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--ink)",
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {p.role}
              </div>
              <div
                className="font-num"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                  marginTop: 2,
                  fontWeight: 600,
                }}
              >
                {p.tone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Card: 履歴書連携 ---------- */
function ResumeCard() {
  return (
    <div className="proof-card" style={CARD_STYLE}>
      <CardHeader sub="Resume Sync" title="履歴書連携" Icon={FileText} />
      <p
        className="ink-soft jp-wrap"
        style={{ fontSize: 14, lineHeight: 1.9, margin: 0 }}
      >
        PDF の履歴書をアップロードすると、職務経歴・志望業界に沿った深掘り質問を自動生成。汎用質問だけの練習を終わらせます。
      </p>

      {/* File "card" with parsed status, then a sample Q line for richness */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 8,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid var(--line)",
            background: "var(--surface-2)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 36,
              height: 44,
              borderRadius: 4,
              border: "1px solid var(--line-strong)",
              background: "var(--surface)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.04em",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 3,
                right: 3,
                width: 0,
                height: 0,
                borderTop: "6px solid var(--line-strong)",
                borderLeft: "6px solid transparent",
              }}
            />
            PDF
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--ink)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              resume_2026.pdf
            </div>
            <div
              className="font-num"
              style={{
                fontSize: 10,
                color: "var(--ink-mute)",
                marginTop: 3,
                letterSpacing: "0.08em",
              }}
            >
              12 jobs · 8 yrs
            </div>
          </div>
          <span
            className="font-num"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            <CheckCircle2 size={12} strokeWidth={2.4} />
            parsed
          </span>
        </div>
        <div
          className="jp-wrap"
          style={{
            display: "flex",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px dashed var(--line-strong)",
            background: "transparent",
            fontSize: 12.5,
            lineHeight: 1.7,
            color: "var(--ink-soft)",
          }}
        >
          <span
            className="font-num"
            style={{
              color: "var(--accent)",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            Q.
          </span>
          <span>
            SaaS の PM 経験で、最も売上に寄与した意思決定を一つ挙げてください。
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Card: セキュリティ ---------- */
function SecurityCard() {
  const items: { label: string; sub: string }[] = [
    { label: "AES-256", sub: "音声・テキスト暗号化" },
    { label: "明示同意制", sub: "学習利用はオプトイン" },
    { label: "完全削除", sub: "退会即時 / 監査ログ" },
  ];
  return (
    <div className="proof-card" style={CARD_STYLE}>
      <CardHeader sub="Security" title="セキュリティ" Icon={Lock} />
      <p
        className="ink-soft jp-wrap"
        style={{ fontSize: 14, lineHeight: 1.9, margin: 0 }}
      >
        音声・文字起こしはエンドツーエンドで保護。学習データへの利用は明示同意制。退会時は完全削除されます。
      </p>

      {/* Three small "spec rows" — replaces the generic gradient lock block. */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 8,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items.map((it) => (
          <div
            key={it.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid var(--line)",
              background: "var(--surface-2)",
            }}
          >
            <ShieldCheck
              size={16}
              strokeWidth={2}
              color="var(--accent)"
              style={{ flexShrink: 0 }}
            />
            <div
              className="font-num"
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "0.02em",
              }}
            >
              {it.label}
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontSize: 11.5,
                color: "var(--ink-mute)",
                textAlign: "right",
              }}
            >
              {it.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Card: 8軸スコア (wide / full width) ---------- */

const RADAR_VB = 400;
const RADAR_C = RADAR_VB / 2;
const RADAR_R = 130;

function radarPoint(axisIndex: number, ratio: number) {
  const angleDeg = -90 + axisIndex * (360 / AXES.length);
  const rad = (angleDeg * Math.PI) / 180;
  const r = RADAR_R * ratio;
  return {
    x: RADAR_C + r * Math.cos(rad),
    y: RADAR_C + r * Math.sin(rad),
  };
}

function ScoreCard() {
  // Build the data polygon points
  const polyPoints = SCORES.map((s, i) => {
    const p = radarPoint(i, s);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");

  // Background polygons at 0.25 / 0.5 / 0.75 / 1.0
  const bgRings = [0.25, 0.5, 0.75, 1].map((ratio) =>
    AXES.map((_, i) => {
      const p = radarPoint(i, ratio);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(" "),
  );

  // Compose an overall score number for prominence
  const overall = Math.round(
    (SCORES.reduce((a, b) => a + b, 0) / SCORES.length) * 100,
  );

  return (
    <div
      className="proof-card"
      style={{
        ...CARD_STYLE,
        gap: 20,
        // Subtle accent halo on the wide hero card
        background:
          "radial-gradient(70% 100% at 0% 0%, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 60%), var(--surface)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            className="font-num"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
              fontWeight: 600,
            }}
          >
            8-Axis Score
          </div>
          <h3
            className="font-bold jp-wrap"
            style={{
              color: "var(--ink)",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              marginTop: 6,
              marginBottom: 0,
            }}
          >
            8 軸スコアで、感想を数値に。
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            paddingLeft: 14,
            borderLeft: "1px solid var(--line)",
          }}
        >
          <div
            className="font-num"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-mute)",
              fontWeight: 600,
              marginRight: 10,
              alignSelf: "center",
            }}
          >
            Overall
          </div>
          <div
            className="font-num"
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "var(--accent)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {overall}
          </div>
          <div
            className="font-num"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--ink-mute)",
              marginLeft: 2,
            }}
          >
            / 100
          </div>
        </div>
      </div>

      <p
        className="ink-soft jp-wrap"
        style={{ fontSize: 14, lineHeight: 1.9, margin: 0 }}
      >
        論理性 / 構造 / 具体性 / 声量 / ペース / 間投詞 / 結論先出し / 熱量。
        「なんとなく良い」を数値で言語化します。
      </p>

      <div
        className="proof-radar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .proof-radar-grid {
              grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr) !important;
            }
          }
        `}</style>

        {/* SVG radar */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg
            viewBox={`0 0 ${RADAR_VB} ${RADAR_VB}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              maxWidth: 420,
              width: "100%",
              display: "block",
              height: "auto",
            }}
            role="img"
            aria-label="8 軸レーダーチャート"
          >
            <defs>
              <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="var(--accent)"
                  stopOpacity="0.32"
                />
                <stop
                  offset="100%"
                  stopColor="var(--accent)"
                  stopOpacity="0.08"
                />
              </radialGradient>
            </defs>

            {/* Concentric octagons */}
            {bgRings.map((pts, idx) => (
              <polygon
                key={`ring-${idx}`}
                points={pts}
                fill="none"
                stroke="var(--line-strong)"
                strokeWidth={idx === bgRings.length - 1 ? 1.4 : 1}
                opacity={idx === bgRings.length - 1 ? 0.95 : 0.45}
              />
            ))}

            {/* Axis spokes */}
            {AXES.map((_, i) => {
              const p = radarPoint(i, 1);
              return (
                <line
                  key={`spoke-${i}`}
                  x1={RADAR_C}
                  y1={RADAR_C}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--line-strong)"
                  strokeWidth={1}
                  opacity={0.45}
                />
              );
            })}

            {/* Score polygon (filled) */}
            <polygon
              points={polyPoints}
              fill="url(#radar-fill)"
              stroke="var(--accent)"
              strokeWidth={2.5}
              strokeLinejoin="round"
            />

            {/* Score vertices */}
            {SCORES.map((s, i) => {
              const p = radarPoint(i, s);
              return (
                <g key={`pt-${i}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={5.5}
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth={2}
                  />
                </g>
              );
            })}

            {/* Axis labels (slightly offset outward) */}
            {AXES.map((label, i) => {
              const p = radarPoint(i, 1.18);
              return (
                <text
                  key={`label-${i}`}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--ink)"
                  fontSize="12"
                  fontWeight={700}
                  fontFamily='var(--font-num), Inter, system-ui, sans-serif'
                  style={{ letterSpacing: "0.04em" }}
                >
                  {label}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Legend / value list — each row has a mini progress bar for richness */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 10,
          }}
        >
          {AXES.map((label, i) => {
            const pct = Math.round(SCORES[i] * 100);
            return (
              <li
                key={label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 12,
                  minWidth: 0,
                }}
              >
                <span
                  className="font-num"
                  style={{
                    color: "var(--ink)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    minWidth: 78,
                  }}
                >
                  {label}
                </span>
                <span
                  aria-hidden
                  style={{
                    position: "relative",
                    height: 6,
                    borderRadius: 999,
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: `${pct}%`,
                      background:
                        "linear-gradient(90deg, color-mix(in oklab, var(--accent) 60%, transparent) 0%, var(--accent) 100%)",
                      borderRadius: 999,
                    }}
                  />
                </span>
                <span
                  className="font-num"
                  style={{
                    color: "var(--ink-mute)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    minWidth: 26,
                    textAlign: "right",
                  }}
                >
                  {pct}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================ */

export default function S6Proof() {
  return (
    <section
      id="features"
      style={{
        background: "var(--bg)",
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
          <div className="chip-line">06 / Proof Cascade</div>
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
            ただの理論ではありません。
            <br className="md:hidden" />
            証拠があります。
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
            VoiceMen が「もう一度練習する場所」になる、5 つの理由。
          </p>
        </Reveal>

        {/* Grid: mobile single col, md+ 2-col with the score card spanning both. */}
        <div
          className="proof-grid"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 20,
          }}
        >
          <style>{`
            @media (min-width: 768px) {
              .proof-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
              .proof-grid > .proof-wide {
                grid-column: 1 / -1 !important;
              }
            }
          `}</style>

          <Reveal delay={0}>
            <StackCard />
          </Reveal>
          <Reveal delay={100}>
            <InterviewersCard />
          </Reveal>
          <Reveal delay={200}>
            <ResumeCard />
          </Reveal>
          <Reveal delay={300}>
            <SecurityCard />
          </Reveal>
          <Reveal delay={400} className="proof-wide">
            <ScoreCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
