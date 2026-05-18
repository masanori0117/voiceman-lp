"use client";

import { useState } from "react";
import Reveal from "./Reveal";

/**
 * Section 9 — FAQ
 *
 * Seven question/answer pairs as accordion items.
 *
 * Behaviour:
 *   - State is a `Set<number>` so multiple items can be open at once.
 *   - Initial state: only Q1 (index 0) open.
 *   - Click on a row toggles that index.
 *   - The expanded panel uses a `max-height` + `opacity` CSS transition
 *     (`.faq-panel.is-open` / 280ms ease in `globals.css`).
 *   - The trigger icon `+` rotates 45° (becomes `×`-like / `−` semantically)
 *     over 200ms.
 *
 * Accessibility:
 *   - Each trigger is a real `<button>` with `aria-expanded` + `aria-controls`.
 *   - The panel has a stable `id` and `role="region"` with an `aria-labelledby`.
 *   - Focus ring uses the `--accent` colour via `.faq-trigger:focus-visible`.
 */

type QA = {
  q: string;
  a: string;
};

const QA_LIST: QA[] = [
  {
    q: "VoiceMen はどんな人に向いていますか？",
    a: "キャリアアップの転職を控えている 30 代前後のビジネスパーソン、特に「想定問答を覚えても本番で頭が真っ白になる」「気軽に練習相手が見つからない」と感じている方に向いています。新卒就活生・第二新卒の方にもご利用いただけます。",
  },
  {
    q: "音声認識の精度はどのくらいですか？",
    a: "OpenAI Whisper を音声認識のコアに使っており、静かな環境であれば日本語の文字起こし精度は 95% 以上を目安に想定しています。マイク許可を一度行えば、スマートフォンの内蔵マイクでも実用十分な精度が出ます。",
  },
  {
    q: "面接官のキャラクターはどのように使い分けますか？",
    a: "「人事部長」は基礎質問、「現場マネージャー」は職務経験の深掘り、「役員」は志望動機・キャリア観、「圧迫面接官」は想定外質問への即応力、というように 4 人を本番想定の練習にローテーションする使い方を推奨しています。",
  },
  {
    q: "無料プランではどこまで使えますか？",
    a: "Free プランでは月 5 回まで面接練習が可能で、4 人すべての面接官にアクセスでき、基本フィードバック（3 軸）が受け取れます。クレジットカード登録は不要で、登録から 3 分で 1 セッション目を開始できます。",
  },
  {
    q: "個人情報はどのように管理されていますか？",
    a: "音声・テキストはエンドツーエンドで暗号化保存し、運用チームも個別音声を聴く権限を持ちません。AI 学習への利用は明示同意制（オプトイン）で、退会時はアカウントデータを完全削除します。第三者への共有は行いません。",
  },
  {
    q: "スマートフォンでも使えますか？",
    a: "はい。iOS / Android のブラウザでそのまま動作します。マイクの許可を一度していただくだけで、通勤中・カフェ・自宅と、場所を選ばず練習できます。専用アプリのインストールは不要です。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい。マイページからワンクリックで解約できます。日割り返金には対応していませんが、解約後も契約期間の終了日までは全機能をご利用いただけます。Free プランは契約期間がないため、いつでも完全に停止できます。",
  },
];

export default function S9FAQ() {
  // Multiple items can be expanded simultaneously, per spec.
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <section
      id="faq"
      style={{
        background: "var(--bg-soft)",
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 920, marginLeft: "auto", marginRight: "auto" }}
      >
        <Reveal>
          <div className="chip-line">09 / FAQ</div>
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
            よくいただくご質問
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
            登録前によくいただく質問をまとめました。ここに無い疑問は、ヘルプセンターまたはお問い合わせから。
          </p>
        </Reveal>

        <div style={{ marginTop: 48 }}>
          {QA_LIST.map((item, i) => {
            const isOpen = open.has(i);
            const triggerId = `faq-trigger-${i}`;
            const panelId = `faq-panel-${i}`;
            return (
              <Reveal key={i} delay={i * 40}>
                <div className={`faq-item${isOpen ? " is-open-row" : ""}`}>
                  <button
                    id={triggerId}
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                  >
                    <span
                      aria-hidden
                      className="font-num"
                      style={{
                        color: "var(--accent)",
                        fontWeight: 700,
                        fontSize: 16,
                        letterSpacing: "0.04em",
                        marginTop: 4,
                        flexShrink: 0,
                        minWidth: 22,
                      }}
                    >
                      Q.
                    </span>
                    <span
                      className="jp-wrap"
                      style={{
                        flex: 1,
                        minWidth: 0,
                        color: "var(--ink)",
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: 1.6,
                        paddingRight: 8,
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`faq-icon${isOpen ? " is-open" : ""}`}
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={`faq-panel${isOpen ? " is-open" : ""}`}
                  >
                    <div className="faq-panel-inner jp-wrap">{item.a}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p
            className="ink-soft jp-wrap"
            style={{
              marginTop: 40,
              textAlign: "center",
              fontSize: 13.5,
              lineHeight: 1.9,
            }}
          >
            不安な点はすべて解消されたでしょうか。<br />
            まずは無料で 1 セッションだけ、試してみてください。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
