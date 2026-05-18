import { Mic, FileText } from "lucide-react";

// Brand icons (lucide-react v1 dropped brand icons; ship our own minimal SVGs)
function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-soft)",
        paddingTop: 48,
        paddingBottom: 48,
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Col 1 — 運営者情報 */}
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="rounded-full text-white flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  background:
                    "linear-gradient(180deg, var(--accent) 0%, var(--accent-deep) 100%)",
                  boxShadow:
                    "0 0 0 1px color-mix(in oklab, var(--accent) 70%, white) inset",
                }}
                aria-hidden
              >
                <Mic size={14} strokeWidth={2.2} />
              </span>
              <span
                className="font-bold tracking-tight"
                style={{ fontSize: 17, color: "var(--ink)", letterSpacing: "-0.01em" }}
              >
                VoiceMen
              </span>
            </div>
            <p className="mt-4 ink-soft" style={{ fontSize: 13, lineHeight: "26px" }}>
              AI音声面接練習コーチ。
              <br />
              Whisper × Claude による8軸採点と、4人の面接官キャラクターで、
              「フィードバックなき独り練習」を終わらせます。
            </p>
            <div className="mt-4 ink-mute" style={{ fontSize: 12 }}>
              VoiceMen Inc. / Tokyo, Japan
            </div>
          </div>

          {/* Col 2 — リーガル */}
          <div>
            <div
              className="ink-mute"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              Legal
            </div>
            <ul className="mt-4 space-y-2.5" style={{ fontSize: 13, color: "var(--ink-soft)" }}>

              <li>
                <a href="https://voiceman.app/privacy" target="_blank" rel="noopener noreferrer" className="footer-link">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="https://voiceman.app/terms" target="_blank" rel="noopener noreferrer" className="footer-link">
                  利用規約
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 — サポート */}
          <div>
            <div
              className="ink-mute"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              Support
            </div>
            <ul className="mt-4 space-y-2.5" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
              <li>
                <a href="#" className="footer-link">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  ヘルプセンター
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  セキュリティ
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — SNS */}
          <div>
            <div
              className="ink-mute"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              Follow
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://x.com/voiceman_ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="social-icon rounded-md flex items-center justify-center"
              >
                <XIcon size={14} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="social-icon rounded-md flex items-center justify-center"
              >
                <YouTubeIcon size={15} />
              </a>
              <a
                href="#"
                aria-label="note"
                className="social-icon rounded-md flex items-center justify-center"
              >
                <FileText size={15} strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>

        {/* bottom copyright */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row gap-2 items-start md:items-center justify-between"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <div className="font-num" style={{ fontSize: 11, color: "var(--ink-mute)" }}>
            © 2026 VoiceMen
          </div>
          <div className="font-num" style={{ fontSize: 11, color: "var(--ink-mute)" }}>
            Built with Whisper · Claude
          </div>
        </div>
      </div>
    </footer>
  );
}
