import Reveal from "./Reveal";

type TimelineItem = {
  time: string;
  body: string;
  warn: boolean;
};

const TIMELINE: TimelineItem[] = [
  {
    time: "1ヶ月後",
    body: "次の二次面接でも、また同じ質問で詰まる。「結論から」と頭ではわかっているのに、口は3分も話し続けている。手応えのない週末が、また一つ過ぎていく。",
    warn: false,
  },
  {
    time: "半年後",
    body: "第二志望にも届かず、現職に残るしかなくなる。同期は転職して年収を80万円上げた。あなたは月曜の朝、いつもの席に座っている。",
    warn: false,
  },
  {
    time: "1年後",
    body: "キャリアアップの「窓」が静かに閉じる。35歳という市場価値のピークを逃し、次の機会は「マネジメント経験5年以上」が前提になる。",
    warn: true,
  },
];

function ClockIcon({ warn }: { warn: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke={warn ? "#dc2626" : "currentColor"}
      strokeWidth={1.6}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function S4Wound() {
  return (
    <section
      id="wound"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section divider hairline at top to clearly separate from S3 */}
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

      {/* Mobile (<=480px): trim the icon-reserve padding so the card body
          stays inside the 375px viewport. The clock icon (40px) still fits
          comfortably inside the 48px paddingLeft. */}
      <style>{`
        @media (max-width: 480px) {
          #wound .s4-timeline-item { padding-left: 48px !important; }
        }
      `}</style>

      <div className="container-x">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <div className="chip-line">04 / Wound Opening</div>
            <h2
              className="font-bold jp-wrap"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
                marginTop: 16,
              }}
            >
              このまま「独り練習」を続けたら、
              <br className="md:hidden" />
              何が起きるか。
            </h2>
            <p
              className="ink-mute jp-wrap"
              style={{
                marginTop: 18,
                fontSize: 13,
                lineHeight: 1.85,
              }}
            >
              一ヶ月後、半年後、一年後——時間は、必ず未来を連れてきます。
            </p>
          </Reveal>

          {/* Timeline */}
          <div style={{ position: "relative", marginTop: 64 }}>
            {/* Vertical connector line — sits behind the icon circles */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 19,
                top: 8,
                bottom: 24,
                width: 1,
                background:
                  "linear-gradient(180deg, var(--line-strong) 0%, var(--line-strong) 60%, color-mix(in oklab, var(--warn) 50%, transparent) 100%)",
                zIndex: 0,
              }}
            />

            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 28,
                position: "relative",
                zIndex: 1,
              }}
            >
              {TIMELINE.map((item, i) => (
                <Reveal key={item.time} delay={i * 120}>
                  <li
                    className="s4-timeline-item"
                    style={{
                      position: "relative",
                      paddingLeft: 64,
                    }}
                  >
                    {/* Clock icon (40px circle) */}
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 4,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: `1px solid ${
                          item.warn ? "rgba(220, 38, 38, 0.6)" : "var(--line)"
                        }`,
                        background: item.warn
                          ? "color-mix(in oklab, #dc2626 8%, var(--surface))"
                          : "var(--surface)",
                        color: item.warn ? "#dc2626" : "var(--ink)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: item.warn
                          ? "0 0 0 4px color-mix(in oklab, #dc2626 12%, transparent)"
                          : "none",
                      }}
                    >
                      <ClockIcon warn={item.warn} />
                    </span>

                    {/* Card */}
                    <div
                      className="card"
                      style={{
                        padding: "26px 28px",
                        borderColor: item.warn
                          ? "rgba(220, 38, 38, 0.6)"
                          : "var(--line)",
                        background: item.warn
                          ? "color-mix(in oklab, #dc2626 4%, var(--surface))"
                          : "var(--surface)",
                        boxShadow: item.warn
                          ? "0 0 0 1px color-mix(in oklab, #dc2626 18%, transparent) inset, 0 14px 30px -20px color-mix(in oklab, #dc2626 35%, transparent)"
                          : undefined,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 10,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          className="font-num"
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: item.warn
                              ? "var(--warn)"
                              : "var(--ink-mute)",
                          }}
                        >
                          T + {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden
                          style={{
                            width: 16,
                            height: 1,
                            background: item.warn
                              ? "var(--warn-border)"
                              : "var(--line-strong)",
                          }}
                        />
                        <h3
                          className="font-bold jp-wrap"
                          style={{
                            color: item.warn ? "var(--warn)" : "var(--ink)",
                            fontSize: 22,
                            fontWeight: 700,
                            letterSpacing: "-0.005em",
                            margin: 0,
                          }}
                        >
                          {item.time}
                        </h3>
                        {item.warn && (
                          <span
                            className="font-num"
                            style={{
                              marginLeft: "auto",
                              fontSize: 10.5,
                              fontWeight: 700,
                              letterSpacing: "0.22em",
                              textTransform: "uppercase",
                              color: "var(--warn)",
                              border: "1px solid var(--warn-border)",
                              padding: "4px 9px",
                              borderRadius: 4,
                              background:
                                "color-mix(in oklab, var(--warn) 12%, transparent)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <span aria-hidden style={{ fontSize: 10 }}>
                              ⚠
                            </span>
                            Caution
                          </span>
                        )}
                      </div>
                      <p
                        className="ink-soft jp-wrap"
                        style={{
                          fontSize: 14.5,
                          lineHeight: 1.95,
                          margin: 0,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Closing block — dramatic, red-emphasized, two-tier copy */}
          <Reveal delay={200}>
            <div
              style={{
                marginTop: 72,
                position: "relative",
                padding: "36px 36px 36px 40px",
                borderLeft: "3px solid var(--warn)",
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--warn) 6%, var(--surface)) 0%, var(--surface) 100%)",
                borderTop: "1px solid var(--warn-border)",
                borderRight: "1px solid var(--warn-border)",
                borderBottom: "1px solid var(--warn-border)",
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                boxShadow:
                  "0 24px 60px -32px color-mix(in oklab, var(--warn) 40%, transparent)",
              }}
            >
              <div
                className="font-num"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--warn)",
                  fontWeight: 600,
                  marginBottom: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--warn)",
                  }}
                />
                The worst case / 最も怖いこと
              </div>
              <p
                className="jp-wrap"
                style={{
                  color: "var(--ink)",
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                そして、最も怖いのは——
              </p>
              <p
                className="jp-wrap"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(28px, 4vw, 32px)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.55,
                  marginTop: 14,
                  marginBottom: 0,
                }}
              >
                『あの時、
                <span className="hl-mark">もっと練習しておけば</span>
                』という
                <br className="hidden md:block" />
                取り戻せない
                <span style={{ color: "var(--warn)" }}>後悔</span>
                です
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
