import Reveal from "./Reveal";

const ITEMS = [
  "想定問答を書き出して暗記しても、本番では言葉が出てこない",
  "模擬面接サービスは1回1万円。気軽に何度も練習できない",
  "自分の話し方の何が悪いのか、客観的に教えてくれる人がいない",
  "YouTubeの面接対策動画を観ても、自分の問題に対するフィードバックではない",
  "本命の最終面接が近づくほど、練習する場所がなくて焦る",
];

export default function S2Identity() {
  return (
    <section
      id="identity"
      style={{
        background: "var(--bg-soft)",
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section divider hairline at top */}
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

      {/* Mobile (<=480px): hide the trailing index number so the card fits
          inside a 375px viewport without horizontal overflow. */}
      <style>{`
        @media (max-width: 480px) {
          #identity .s2-card-number { display: none !important; }
        }
      `}</style>

      <div className="container-x">
        <Reveal>
          <div className="chip-line">02 / Identity Mirror</div>
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
            心当たり、ありませんか。
          </h2>
          {/* short accent rule — replaces empty space below H2 with a rhythm cue */}
          <div
            aria-hidden
            style={{
              marginTop: 20,
              width: 48,
              height: 2,
              background: "var(--accent)",
              borderRadius: 1,
            }}
          />
          <p
            className="ink-mute jp-wrap"
            style={{
              marginTop: 18,
              fontSize: 13,
              lineHeight: 1.8,
              maxWidth: 560,
            }}
          >
            5つのうち、ひとつでも頷いたなら——あなたは「正しい場所」に来ています。
          </p>
        </Reveal>

        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: "56px auto 0",
            maxWidth: 920,
            display: "grid",
            gap: 14,
          }}
        >
          {ITEMS.map((text, i) => (
            <Reveal key={i} delay={i * 100} style={{ minWidth: 0 }}>
              <li
                className="card"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 22,
                  padding: "26px 28px 26px 26px",
                  borderLeft: "1px solid var(--line)",
                  borderTop: "1px solid var(--line)",
                  borderBottom: "1px solid var(--line)",
                  borderRight: "1px solid var(--line)",
                  transition: "border-color .25s ease, transform .25s ease",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  minWidth: 0,
                }}
              >
                {/* accent diamond */}
                <span
                  aria-hidden
                  style={{
                    color: "var(--accent)",
                    fontSize: 20,
                    lineHeight: 1,
                    marginTop: 6,
                    userSelect: "none",
                    flexShrink: 0,
                    transform: "rotate(0deg)",
                  }}
                >
                  ◆
                </span>

                <p
                  className="ink-soft jp-wrap"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.9,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {text}
                </p>

                {/* index number — quiet but adds rhythm against AI-slop "uniform card grid".
                   Hidden on mobile (<=480px) via the inline <style> rule above
                   to prevent horizontal overflow at 375px width. */}
                <span
                  className="font-num s2-card-number"
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    alignSelf: "center",
                    color: "var(--ink-mute)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    opacity: 0.7,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
