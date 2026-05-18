"use client";

import { ArrowRight, Check, Mic, X } from "lucide-react";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { useInView } from "./useInView";

/**
 * Section 10 — Plans + Final CTA
 *
 * Two stacked sub-sections, both rendered inside one component:
 *
 *   1. Plan comparison (Free / Standard / Premium):
 *      - 3-up grid on ≥ 768px, stacked on mobile.
 *      - Standard is the recommended plan: it gets a "人気" badge, a 2px
 *        accent border, and is lifted by `translateY(-8px)` so it physically
 *        floats above its neighbours on desktop.
 *      - Premium gets a gold "最も多機能" badge and a gold-gradient CTA.
 *      - All feature rows render with a green check or a muted ✗.
 *      - Each card's CTA matches the plan's tone: accent / secondary / gold.
 *
 *   2. Final CTA (dark-inverted block):
 *      - Solid `#06080f` background with a top accent radial glow.
 *      - 32 vertical bars animated with the existing `wave-bar` keyframes,
 *        same logic as the hero mockup so behaviour matches Section 1.
 *      - A live "累計練習回数" counter that counts up from 0 → 12,847 the
 *        first time the block enters the viewport.
 *      - One large 64px CTA — accent on hover deep + 1px lift, accessible
 *        focus ring via `.cta-final-button:focus-visible`.
 */

type Feature = {
  /** Feature label shown to the user. */
  label: string;
  /** Display text for this plan (e.g. "5回/月", "✓", "—"). When `included`
   *  is `false` this is what renders in the muted `✗` row. */
  value: string;
  /** Whether the row should render as "included" (check) or "excluded" (×). */
  included: boolean;
};

type Plan = {
  key: "free" | "standard" | "premium";
  name: string;
  /** Localised tagline above the plan name. */
  jp: string;
  /** Numeric monthly price in JPY (formatted with `.toLocaleString`). */
  price: number;
  /** One-line value proposition under the price. */
  desc: string;
  features: Feature[];
  /** Visible CTA label. */
  cta: string;
  /** Optional badge (鎖 above the card). */
  badge?: { label: string; tone: "popular" | "premium" };
};

const PLANS: Plan[] = [
  {
    key: "free",
    name: "Free",
    jp: "まず試す",
    price: 0,
    desc: "クレジットカード不要。今日から始める。",
    features: [
      { label: "練習回数", value: "5回/月", included: true },
      { label: "面接官", value: "4人すべて", included: true },
      { label: "採点", value: "基本", included: true },
      { label: "履歴書連携", value: "✗", included: false },
      { label: "業界別質問DB", value: "✗", included: false },
      { label: "1on1コーチセッション", value: "✗", included: false },
      { label: "録音保存", value: "7日", included: true },
    ],
    cta: "無料で始める",
  },
  {
    key: "standard",
    name: "Standard",
    jp: "本気で内定を取る",
    price: 780,
    desc: "転職活動の3〜6ヶ月、毎日回すための主力プラン。",
    features: [
      { label: "練習回数", value: "無制限", included: true },
      { label: "面接官", value: "4人すべて", included: true },
      { label: "採点", value: "8軸スコア", included: true },
      { label: "履歴書連携", value: "✓", included: true },
      { label: "業界別質問DB", value: "✗", included: false },
      { label: "1on1コーチセッション", value: "✗", included: false },
      { label: "録音保存", value: "90日", included: true },
    ],
    cta: "Standard を試す",
    badge: { label: "人気", tone: "popular" },
  },
  {
    key: "premium",
    name: "Premium",
    jp: "本命の最終面接まで",
    price: 1480,
    desc: "人間のコーチ + AI で、本命1社の内定まで伴走。",
    features: [
      { label: "練習回数", value: "無制限", included: true },
      { label: "面接官", value: "4人すべて + 業界別", included: true },
      { label: "採点", value: "8軸スコア + 詳細レポート", included: true },
      { label: "履歴書連携", value: "✓", included: true },
      { label: "業界別質問DB", value: "✓", included: true },
      { label: "1on1コーチセッション", value: "月1回", included: true },
      { label: "録音保存", value: "永久", included: true },
    ],
    cta: "Premium を試す",
    badge: { label: "最も多機能", tone: "premium" },
  },
];

/* ---------- Final-CTA waveform: 32 bars, same envelope as hero ---------- */

const WAVE_BAR_COUNT = 32;
const WAVE_HEIGHTS = Array.from({ length: WAVE_BAR_COUNT }, (_, i) => {
  const t = (i + 0.5) / WAVE_BAR_COUNT;
  const env =
    Math.sin(t * Math.PI) * 0.7 +
    Math.sin(t * Math.PI * 3) * 0.18 +
    0.18;
  return Math.max(0.22, Math.min(1, env));
});

function FinalWave() {
  return (
    <div className="cta-wave" aria-hidden>
      {WAVE_HEIGHTS.map((h, i) => {
        // Outer = cool / centre = accent. Mirrors InterviewMockup so
        // the closing block visually rhymes with Section 1.
        const dist = Math.abs(i - WAVE_BAR_COUNT / 2) / (WAVE_BAR_COUNT / 2);
        const bg =
          dist < 0.35
            ? "var(--accent)"
            : dist < 0.7
              ? "color-mix(in oklab, var(--accent) 55%, rgba(255,255,255,0.6))"
              : "rgba(255, 255, 255, 0.42)";
        return (
          <span
            key={i}
            className="wave-bar"
            style={{
              height: `${Math.round(h * 100)}%`,
              background: bg,
              opacity: dist < 0.35 ? 1 : 0.9,
              animationDelay: `${i * 60}ms`,
              animationDuration: `${0.8 + (i % 3) * 0.2}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Locale-formatted count-up (12,847 with comma) ---------- */

function FormattedCount({
  target,
  duration = 1800,
  start,
}: {
  target: number;
  duration?: number;
  /** When `true`, runs the rAF animation. Used to defer until in-view. */
  start: boolean;
}) {
  const [value, setValue] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let rafId = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const elapsed = now - t0;
      const p = Math.min(1, elapsed / duration);
      // ease-out cubic — matches CountUp.tsx
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, reduced, target, duration]);

  return <>{value.toLocaleString("en-US")}</>;
}

/* ---------- Plan card ---------- */

function PlanCard({ plan }: { plan: Plan }) {
  const cardClass =
    "plan-card" +
    (plan.key === "standard" ? " plan-card-standard" : "") +
    (plan.key === "premium" ? " plan-card-premium" : "");

  const ctaClass =
    "plan-cta" +
    (plan.key === "free" ? " plan-cta-free" : "") +
    (plan.key === "standard" ? " plan-cta-standard" : "") +
    (plan.key === "premium" ? " plan-cta-premium" : "");

  return (
    <article className={cardClass}>
      {plan.badge && (
        <span
          className={
            "plan-badge " +
            (plan.badge.tone === "premium"
              ? "plan-badge-premium"
              : "plan-badge-popular")
          }
        >
          {plan.badge.label}
        </span>
      )}

      <div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
            fontWeight: 600,
          }}
        >
          {plan.jp}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 22,
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "-0.005em",
          }}
        >
          {plan.name}
        </div>
        <p
          className="jp-wrap"
          style={{
            marginTop: 8,
            color: "var(--ink-soft)",
            fontSize: 13,
            lineHeight: 1.75,
            minHeight: 44,
          }}
        >
          {plan.desc}
        </p>
      </div>

      {/* Price */}
      <div
        style={{
          marginTop: 24,
          paddingBottom: 22,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
          <span
            className="font-num tick-num"
            style={{
              fontFamily: 'var(--font-num), Inter, system-ui, sans-serif',
              fontSize: "clamp(40px, 5vw, 56px)",
              fontWeight: 900,
              lineHeight: 1,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            ¥{plan.price.toLocaleString()}
          </span>
          <span
            style={{
              marginBottom: 6,
              fontSize: 13,
              color: "var(--ink-mute)",
            }}
          >
            / 月（税込）
          </span>
        </div>
        <div
          className="font-num"
          style={{
            marginTop: 8,
            fontSize: 12,
            color:
              plan.key === "free" ? "var(--accent)" : "var(--ink-mute)",
            letterSpacing: "0.04em",
          }}
        >
          {plan.key === "free"
            ? "クレジットカード不要"
            : "月額・いつでも解約可"}
        </div>
      </div>

      {/* Features — two-column row: label left, value right.
           A monospace value column lets your eye scan vertically across
           plans, which is the whole point of a comparison table. */}
      <ul
        style={{
          marginTop: 22,
          marginBottom: 24,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        {plan.features.map((f) => (
          <li
            key={f.label}
            className="plan-feature-row"
            data-included={f.included ? "true" : "false"}
          >
            <span
              aria-hidden
              className="plan-feature-mark"
              data-included={f.included ? "true" : "false"}
            >
              {f.included ? (
                <Check size={12} strokeWidth={3} />
              ) : (
                <X size={11} strokeWidth={3} />
              )}
            </span>
            <span className="jp-wrap plan-feature-label">{f.label}</span>
            <span className="font-num plan-feature-value">
              {f.value === "✗" || f.value === "—" ? "—" : f.value}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="https://voiceman.app"
        target="_blank"
        rel="noopener noreferrer"
        className={ctaClass}
      >
        {plan.cta}
        <ArrowRight size={16} strokeWidth={2.2} />
      </a>
    </article>
  );
}

/* ---------- Section 10 root ---------- */

export default function S10Plans() {
  // Trigger the CountUp only when the final-CTA block scrolls into view.
  const [ctaRef, ctaInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [armCounter, setArmCounter] = useState(false);
  useEffect(() => {
    if (ctaInView) setArmCounter(true);
  }, [ctaInView]);

  return (
    <section
      id="plans"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
      }}
    >
      <div className="container-x">
        {/* ----- Heading ----- */}
        <Reveal>
          <div className="chip-line">10 / Plans</div>
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
            3 つのプラン。<br className="md:hidden" />
            まずは <span className="hl-mark">Free</span> から。
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
            いきなり有料プランを契約する必要はありません。Free で 5 回、自分の癖を可視化してから、Standard で本気を出してください。
          </p>
        </Reveal>

        {/* ----- Plan grid ----- */}
        <div
          className="plan-grid"
          style={{ marginTop: 64 }}
        >
          {PLANS.map((p, i) => (
            <Reveal
              key={p.key}
              delay={i * 100}
              style={{ display: "flex", height: "100%" }}
            >
              <div style={{ width: "100%", display: "flex" }}>
                <PlanCard plan={p} />
              </div>
            </Reveal>
          ))}
        </div>

        {/* ----- Helper line under the table ----- */}
        <Reveal delay={300}>
          <p
            className="jp-wrap"
            style={{
              marginTop: 36,
              textAlign: "center",
              color: "var(--ink-soft)",
              fontSize: 15,
              lineHeight: 1.85,
            }}
          >
            迷ったら Free から。 いつでもアップグレードできます。
          </p>
        </Reveal>

        {/* ----- Final dark-inverted CTA ----- */}
        <Reveal delay={200} style={{ marginTop: 96 }}>
          <div
            id="cta-final"
            ref={ctaRef}
            className="cta-final"
            style={{
              padding: "clamp(48px, 6vw, 80px) clamp(28px, 5vw, 64px)",
            }}
          >
            <div
              style={{
                maxWidth: 920,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <div
                className="font-num"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 600,
                }}
              >
                FINAL · GET STARTED
              </div>

              <h2
                className="jp-wrap"
                style={{
                  marginTop: 18,
                  color: "#ffffff",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                次の面接の前に、<br className="md:hidden" />
                もう独りで悩まない。
              </h2>

              <p
                className="jp-wrap"
                style={{
                  marginTop: 24,
                  color: "rgba(255,255,255,0.72)",
                  fontSize: 16,
                  lineHeight: 1.9,
                  maxWidth: 620,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                クレジットカード不要、3 分で開始。最初の 1 セッションで、自分の癖が見える場所を、今日から手に入れる。
              </p>

              {/* Live waveform — always animating, mirrors Section 1 */}
              <div
                className="cta-live-card"
                style={{
                  marginTop: 36,
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: 580,
                  padding: "20px 24px",
                  borderRadius: 16,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 60px -30px rgba(0,0,0,0.6)",
                }}
              >
                <FinalWave />
                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div
                      className="font-num"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 600,
                      }}
                    >
                      累計練習回数
                    </div>
                    <div
                      className="font-num tick-num"
                      style={{
                        marginTop: 4,
                        fontSize: 36,
                        fontWeight: 900,
                        color: "#ffffff",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        textShadow: "0 0 24px rgba(79,124,255,0.35)",
                      }}
                    >
                      <FormattedCount target={12847} start={armCounter} />

                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 13,
                          color: "rgba(255,255,255,0.55)",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                        }}
                      >
                        sessions
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      className="font-num"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 600,
                      }}
                    >
                      live now
                    </div>
                    <div
                      className="font-num"
                      style={{
                        marginTop: 4,
                        fontSize: 14,
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: 600,
                      }}
                    >
                      <span
                        aria-hidden
                        className="rec-dot"
                        style={{
                          display: "inline-block",
                          width: 7,
                          height: 7,
                          borderRadius: 999,
                          background: "var(--accent)",
                          marginRight: 8,
                          verticalAlign: "middle",
                        }}
                      />
                      recording
                    </div>
                  </div>
                </div>
              </div>

              {/* Big CTA */}
              <div
                style={{
                  marginTop: 40,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <a
                  href="https://voiceman.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-final-button"
                >
                  <Mic size={20} strokeWidth={2.2} />
                  無料で面接練習を始める
                  <ArrowRight size={18} strokeWidth={2.2} />
                </a>
                <div
                  className="font-num"
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.06em",
                  }}
                >
                  クレジットカード不要 · 3 分で開始 · いつでも解約可
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
