import { ArrowRight, Mic } from "lucide-react";
import InterviewMockup from "./InterviewMockup";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        minHeight: "90vh",
        paddingTop: 128,
        paddingBottom: 96,
      }}
    >
      {/* Restrained accent glow — single light source, no rainbow */}
      <div className="hero-glow" aria-hidden />

      {/* Edge-faded dot grid: present without enclosing the page in a box */}
      <div
        className="absolute inset-0 dotgrid-fade pointer-events-none"
        style={{ opacity: 0.6 }}
        aria-hidden
      />

      <div className="container-x relative">
        <div
          className="grid items-center"
          style={{
            // Generous gap so the right-hand mockup never crowds the headline
            rowGap: 48,
            columnGap: 56,
            gridTemplateColumns: "minmax(0, 1fr)",
          }}
        >
          <style>{`
            @media (min-width: 768px) {
              .hero-grid { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr) !important; column-gap: 40px !important; }
            }
            @media (min-width: 1024px) {
              .hero-grid { grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr) !important; column-gap: 64px !important; }
            }
            @media (min-width: 1280px) {
              .hero-grid { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) !important; column-gap: 80px !important; }
            }
          `}</style>
          <div className="hero-grid grid items-center" style={{ gridTemplateColumns: "minmax(0, 1fr)", rowGap: 56, columnGap: 48 }}>
            {/* Left column — copy */}
            <div>
              {/* chip */}
              <div
                className="font-num inline-flex items-center gap-2"
                style={{
                  fontSize: 12,
                  color: "var(--accent)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 28,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 18,
                    height: 1,
                    background: "var(--accent)",
                    display: "inline-block",
                  }}
                />
                面接練習を、フィードバック付きで。
              </div>

              {/* headline */}
              <h1
                className="font-bold jp-wrap"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(48px, 7vw, 80px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                }}
              >
                <span style={{ display: "block" }}>
                  <span className="hl-mark">3社連続でお見送り？</span>
                </span>
                <span style={{ display: "block", marginTop: 8 }}>
                  面接練習を一人で
                </span>
                <span style={{ display: "block" }}>
                  続ける時代は、
                </span>
                <span style={{ display: "block" }}>
                  終わりました。
                </span>
              </h1>

              {/* subcopy */}
              <p
                className="ink-soft jp-wrap"
                style={{
                  marginTop: 32,
                  fontSize: 16,
                  lineHeight: 1.95,
                  maxWidth: 560,
                }}
              >
                想定問答を書き出して、鏡の前で練習する。それでも本番では、最初の3秒で頭が真っ白になる。
                これはあなたの能力の問題ではありません。
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                  {" "}AI音声面接練習コーチが、あなたの回答を8軸で採点し、その場で改善点を伝えます。
                </span>
              </p>

              {/* CTA */}
              <div
                className="flex flex-wrap items-center"
                style={{ marginTop: 40, gap: 14 }}
              >
                <a
                  href="https://voiceman.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center font-semibold"
                  style={{
                    height: 56,
                    paddingLeft: 32,
                    paddingRight: 32,
                    borderRadius: 8,
                    fontSize: 15,
                    color: "#fff",
                    gap: 12,
                    letterSpacing: "0.02em",
                  }}
                >
                  <Mic size={18} strokeWidth={2.2} />
                  無料で面接練習を始める
                  <ArrowRight size={18} strokeWidth={2.2} />
                </a>
                <a
                  href="#features"
                  className="btn-ghost inline-flex items-center"
                  style={{
                    height: 56,
                    paddingLeft: 24,
                    paddingRight: 24,
                    borderRadius: 10,
                    fontSize: 14,
                    gap: 8,
                  }}
                >
                  機能を見る
                </a>
              </div>

              {/* CTA fineprint */}
              <div
                className="font-num"
                style={{
                  marginTop: 16,
                  fontSize: 12.5,
                  color: "var(--ink-soft)",
                  letterSpacing: "0.06em",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span
                    aria-hidden
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "var(--accent)",
                      boxShadow: "0 0 8px color-mix(in oklab, var(--accent) 60%, transparent)",
                    }}
                  />
                  クレジットカード不要
                </span>
                <span aria-hidden style={{ color: "var(--ink-mute)" }}>·</span>
                <span>3分で開始</span>
                <span aria-hidden style={{ color: "var(--ink-mute)" }}>·</span>
                <span>Whisper × Claude</span>
              </div>
            </div>

            {/* Right column — mockup */}
            <div className="w-full" style={{ maxWidth: 520, marginLeft: "auto" }}>
              <InterviewMockup />
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{
          bottom: 28,
          gap: 10,
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
        }}
        aria-hidden
      >
        <span className="font-num">SCROLL</span>
        <span
          className="block scroll-hint"
          style={{
            width: 1,
            height: 28,
            background: "linear-gradient(180deg, var(--ink-mute), transparent)",
          }}
        />
      </div>
    </section>
  );
}
