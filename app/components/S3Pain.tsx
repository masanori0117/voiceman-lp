import CountUp from "./CountUp";
import Reveal from "./Reveal";

export default function S3Pain() {
  return (
    <section
      id="pain"
      style={{
        background: "var(--bg)",
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* very faint warn glow behind the 73 — single accent, not a gradient soup */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 720,
          height: 480,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--warn) 14%, transparent) 0%, transparent 65%)",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      <div className="container-x" style={{ position: "relative" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Reveal>
            <div
              className="chip-line"
              style={{ display: "inline-flex", justifyContent: "center" }}
            >
              03 / Pain Disclosure
            </div>
            <h2
              className="font-bold jp-wrap"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(24px, 3.4vw, 38px)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.45,
                marginTop: 16,
              }}
            >
              じつは、これは
              <br className="md:hidden" />
              あなただけの問題ではありません。
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div
              style={{
                marginTop: 56,
                position: "relative",
                display: "inline-block",
              }}
            >
              <div
                className="font-num tick-num"
                style={{
                  fontFamily:
                    'var(--font-num), "Inter", system-ui, sans-serif',
                  fontSize: "clamp(120px, 16vw, 200px)",
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: "#dc2626",
                  whiteSpace: "nowrap",
                  textShadow:
                    "0 8px 40px color-mix(in oklab, #dc2626 30%, transparent)",
                }}
              >
                <CountUp target={73} duration={1600} suffix="%" />
              </div>
              {/* source annotation — slightly rotated, hand-noted feel */}
              <div
                className="font-num"
                style={{
                  position: "absolute",
                  top: -6,
                  right: -10,
                  transform: "rotate(6deg)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
                aria-hidden
              >
                source / n=412
              </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <p
              className="ink-soft jp-wrap"
              style={{
                marginTop: 28,
                fontSize: 15,
                lineHeight: 1.9,
                textAlign: "center",
                maxWidth: 620,
                margin: "28px auto 0",
              }}
            >
              『面接対策の方法がわからなかった』と回答した
              <br />
              最終面接到達者の割合
            </p>
          </Reveal>

          {/* Real problem block — left-rule quote (mobile-safe wrap) */}
          <Reveal delay={340}>
            <blockquote
              style={{
                margin: "64px auto 0",
                maxWidth: 720,
                position: "relative",
                padding: "8px 0 8px 24px",
                borderLeft: "4px solid var(--accent)",
                background: "transparent",
                textAlign: "left",
              }}
            >
              <div
                className="font-num"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                真の問題 / The Real Problem
              </div>
              <p
                className="jp-wrap"
                style={{
                  color: "var(--ink)",
                  fontSize: "clamp(24px, 3.5vw, 28px)",
                  fontWeight: 600,
                  lineHeight: 1.55,
                  margin: 0,
                  letterSpacing: "-0.005em",
                  wordBreak: "keep-all",
                  overflowWrap: "break-word",
                  maxWidth: "100%",
                }}
              >
                <span
                  className="hl-mark"
                  style={{
                    display: "block",
                    wordBreak: "keep-all",
                    overflowWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  フィードバックなき独り練習の無限ループ
                </span>
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={460}>
            <p
              className="ink-soft jp-wrap"
              style={{
                marginTop: 36,
                fontSize: 14.5,
                lineHeight: 1.95,
                textAlign: "center",
                maxWidth: 640,
                margin: "36px auto 0",
              }}
            >
              自分の声を録音して聞き直しても、「何を、どう、どこまで」
              <br className="hidden md:block" />
              直せばいいかわからない。ツールは増えても、
              <span style={{ color: "var(--ink)" }}>伴走してくれる相手</span>
              は増えていません。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
