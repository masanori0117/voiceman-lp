"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Mic } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const mq = window.matchMedia("(max-width: 639px)");
    const onMq = () => setIsMobile(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        height: 64,
        background: scrolled
          ? "color-mix(in oklab, var(--bg) 78%, transparent)"
          : "linear-gradient(180deg, color-mix(in oklab, var(--bg) 60%, transparent) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "blur(2px)",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : "blur(2px)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition:
          "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div
        className="flex items-center justify-between h-full mx-auto"
        style={{
          maxWidth: 1200,
          paddingLeft: "clamp(20px, 4vw, 56px)",
          paddingRight: "clamp(20px, 4vw, 56px)",
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2.5 ink"
          style={{ borderRadius: 8, padding: "4px 6px", marginLeft: -6 }}
        >
          <span
            className="rounded-full flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              background:
                "linear-gradient(180deg, var(--accent) 0%, var(--accent-deep) 100%)",
              color: "#fff",
              boxShadow:
                "0 0 0 1px color-mix(in oklab, var(--accent) 70%, white) inset, 0 6px 14px -6px color-mix(in oklab, var(--accent) 60%, transparent)",
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
          <span
            className="font-num"
            aria-hidden
            style={{
              fontSize: 9.5,
              letterSpacing: "0.18em",
              color: "var(--ink-mute)",
              border: "1px solid var(--line-strong)",
              padding: "2px 6px",
              borderRadius: 4,
              marginLeft: 4,
              textTransform: "uppercase",
            }}
          >
            β
          </span>
        </a>

        {/* Right buttons */}
        <div className="flex items-center" style={{ gap: 6 }}>
          <a
            href="https://voiceman.app/login"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hidden sm:inline-flex"
            style={{
              fontSize: 13,
              padding: "9px 14px",
              borderRadius: 6,
              fontWeight: 500,
            }}
          >
            ログイン
          </a>
          <a
            href="https://voiceman.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center font-semibold"
            style={{
              fontSize: 13,
              padding: isMobile ? "12px 14px 12px 16px" : "16px 20px 16px 22px",
              borderRadius: 8,
              gap: isMobile ? 6 : 8,
              minHeight: isMobile ? 44 : 56,
              boxSizing: "border-box",
            }}
          >
            無料で始める
            <ArrowRight size={14} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </header>
  );
}
