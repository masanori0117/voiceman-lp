import { JapaneseYen, Waves, Mail, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Section 8 — Future Projection
 *
 * Three side-by-side outcome cards (≥ md) / stacked (mobile):
 *   - 経済 (Economic)   — yen icon  / `.future-card-eco`
 *   - 精神 (Mental)     — wave icon / `.future-card-calm`
 *   - 行動 (Behavioral) — mail icon / `.future-card-env`
 *
 * Each card carries a `FUTURE / NN` label, an icon tile, a coloured tag,
 * a 20–24px headline and 14px body copy. A closing line under the cards
 * reframes the projection as "necessary outcome, not prediction".
 */

type Future = {
  /** Card variant class — controls the per-card gradient background. */
  cls: string;
  /** Per-card hue used for the icon tile and the metric ribbon. */
  hue: "eco" | "calm" | "env";
  /** Tag shown above the headline (経済 / 精神 / 行動). */
  tag: string;
  /** Single-word KPI shown at the bottom of the card (e.g. "+¥1,200,000"). */
  metric: string;
  /** Sub-label under the metric — what the number represents. */
  metricLabel: string;
  /** Card headline, 20–24px / weight 700 / `var(--ink)`. */
  heading: string;
  /** Body copy, 14px / `var(--ink-soft)` / line-height 1.9. */
  body: string;
  /** Lucide icon component shown in the top-right tile. */
  Icon: LucideIcon;
  /** Aria label for the icon tile. */
  iconLabel: string;
};

const FUTURES: Future[] = [
  {
    cls: "future-card-eco",
    hue: "eco",
    tag: "経済",
    heading: "年収+100万円のオファー",
    body:
      "本命企業の最終面接を通過し、提示年収は現職+100万円。週末の30分の練習が、年間を通して数百万円のリターンに変わる。",
    metric: "+¥1,200,000",
    metricLabel: "想定年収アップ / 年",
    Icon: JapaneseYen,
    iconLabel: "経済的アウトカム",
  },
  {
    cls: "future-card-calm",
    hue: "calm",
    tag: "精神",
    heading: "「面接で話せる」という静かな自信",
    body:
      "想定外の質問が来ても、結論から30秒で組み立てられる。震えるのではなく、「面白い質問だ」と思える側に立っている。",
    metric: "30 sec",
    metricLabel: "想定外質問への即応",
    Icon: Waves,
    iconLabel: "精神的アウトカム",
  },
  {
    cls: "future-card-env",
    hue: "env",
    tag: "行動",
    heading: "本命企業の内定通知",
    body:
      "「お祈り」メールではない、内定承諾の連絡を、自分から送る側になる。次のキャリアの選択肢を、自分で選べる立場にいる。",
    metric: "承諾",
    metricLabel: "次のキャリアを選ぶ側に",
    Icon: Mail,
    iconLabel: "行動的アウトカム",
  },
];

export default function S8Future() {
  return (
    <section
      id="future"
      style={{
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
        background: "var(--bg)",
      }}
    >
      <div className="container-x">
        <Reveal>
          <div className="chip-line">08 / Future Projection</div>
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
            90日後、あなたは<br className="md:hidden" />こうなっています。
          </h2>
          <p
            className="ink-soft jp-wrap"
            style={{
              marginTop: 18,
              fontSize: 15,
              lineHeight: 1.85,
              maxWidth: 640,
            }}
          >
            VoiceMen を 90 日続けると、転職活動の景色は静かに変わります。これは精神論ではなく、毎日の練習が積み重なった先の、必然です。
          </p>
        </Reveal>

        <style>{`
          .future-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
            margin-top: 56px;
          }
          @media (min-width: 768px) {
            .future-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 24px;
            }
          }
        `}</style>

        <div className="future-grid">
          {FUTURES.map((f, i) => {
            const Icon = f.Icon;
            return (
              <Reveal
                key={f.tag}
                delay={i * 100}
                style={{ display: "flex", height: "100%" }}
              >
                <article
                  className={`future-card ${f.cls}`}
                  data-hue={f.hue}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: "30px 28px 28px",
                    borderRadius: 14,
                    border: "1px solid var(--line)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Top label + icon tile */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <span
                      className="font-num"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--ink-mute)",
                      }}
                    >
                      FUTURE / {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-label={f.iconLabel}
                      className="future-icon-tile"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                  </div>

                  {/* Tag */}
                  <div
                    className="future-tag"
                    style={{
                      marginTop: 28,
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      alignSelf: "flex-start",
                      padding: "4px 10px",
                      borderRadius: 999,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: "currentColor",
                      }}
                    />
                    {f.tag}
                  </div>

                  {/* Heading */}
                  <h3
                    className="jp-wrap"
                    style={{
                      marginTop: 12,
                      color: "var(--ink)",
                      fontSize: "clamp(20px, 2.2vw, 24px)",
                      fontWeight: 700,
                      lineHeight: 1.45,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {f.heading}
                  </h3>

                  {/* Body */}
                  <p
                    className="jp-wrap"
                    style={{
                      marginTop: 14,
                      fontSize: 14,
                      lineHeight: 1.9,
                      color: "var(--ink-soft)",
                      flex: 1,
                    }}
                  >
                    {f.body}
                  </p>

                  {/* Metric ribbon */}
                  <div
                    className="future-metric"
                    style={{
                      marginTop: 24,
                      paddingTop: 20,
                      borderTop: "1px dashed var(--line-strong)",
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <span
                      className="font-num tick-num"
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {f.metric}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--ink-mute)",
                        textAlign: "right",
                        lineHeight: 1.4,
                        maxWidth: 140,
                      }}
                    >
                      {f.metricLabel}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300}>
          <p
            className="jp-wrap"
            style={{
              marginTop: 56,
              textAlign: "center",
              color: "var(--ink-soft)",
              fontSize: 15,
              lineHeight: 1.9,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            これは予測ではありません。あなたが正しく、毎日10分動いた時の、
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>必然</span>
            です。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
