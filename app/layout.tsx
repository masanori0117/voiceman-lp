import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VoiceMen — AI音声面接練習コーチ",
  description:
    "想定問答の暗記から、フィードバックの運動へ。Whisper × Claude による8軸採点と、4人の面接官キャラクターで、独り練習を終わらせる。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`dark ${notoSansJp.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
