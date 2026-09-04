# 執行計畫: `packages/ui`

對應 spec：[spec.md](spec.md)。派工規則依 [.agents/docs/model-dispatch.md](../../.agents/docs/model-dispatch.md)、prompt 模板依 [.agents/docs/delegation-templates.md](../../.agents/docs/delegation-templates.md)。

難度定義：**低** = 機械性、有現成範本可照抄；**中** = 需要組裝與局部判斷、單一套件範圍；**高** = 跨套件接線或無現成範本、錯了會連鎖返工。

執行紀律（每個任務皆適用）：

- 委派 prompt 必含目標動機、機械可查驗收、報告格式（模板照抄）。
- 每個 Phase 結束跑一次**新 context 審查**（model-dispatch §5）：審查者只拿驗收標準與產出位置。
- 驗證底線：`npx eslint .` 乾淨、相關 build/測試通過、Storybook story 可渲染；Phase 1.4 之後一律加 `pnpm -F @tod-workspace/ui test` 全綠。
- **測試紀律（spec D11）**：新增匯出元件的 commit 必同時帶 `<元件名>.test.tsx`（vitest + Testing Library）；story 只做 variant 展示，不寫 play function。委派 prompt 必須把「測試通過」寫進驗收，不接受「元件完成、測試待補」的回報。
- 產碼 skills 已安裝供所有 agent 使用（2026-07-14）：`vercel-react-best-practices`、`vercel-composition-patterns`（React/Next 模式）、`shadcn`（官方，讀 components.json 注入專案 context）。委派實作任務時在 prompt 中提示 agent 觸發對應 skill。
- 每個 Phase 的 .R 審查**必附迴歸快檢**：`pnpm -F @tod-workspace/leetcode test` 與 `pnpm -F articles build` 不退步 — 不要等到 Phase 6 才發現根層設定（tsconfig/eslint）壞了其他套件。
- commit 用 Conventional Commits，每個 Phase 至少一個 commit；不可 `--no-verify`。

## Phase 0 — 套件安全更新 ✅（2026-07-13 完成）

- 全 workspace 同 major 升到最新（React 19.2.7、Tailwind 4.3.2、Docusaurus 3.10.2、typescript-eslint 8.63、eslint 9.39、ts-jest 29.4、cypress 13 latest、lint-staged 15 latest、commitlint 19 latest、lodash 4.18 等）。
- 順帶修復 root `eslint.config.mjs` 既有問題（out/.docusaurus 未 ignore、disableTypeChecked 被 languageOptions 覆蓋、spec/test 檔 type-aware 解析失敗）。
- 驗證：eslint 乾淨、leetcode 72/72、tod-blog build + sitemap、articles build 全過。

## Phase 1 — 腳手架與跨套件接線（難度：高）

> 高難度原因：tsconfig 專案參照、Tailwind `@source`、transpilePackages、兩份 components.json 的一致性 — 跨 3+ 檔案/套件的一致推理（judgment-rubrics §1a）。**由主對話親自執行**（或 Plan/opus 先出施工圖再交 sonnet）。

| # | 任務 | 驗收 |
| --- | --- | --- |
| 1.1 | 建 `packages/ui` 骨架：package.json（name、subpath exports、**`typecheck` script = `tsc --noEmit`**）、tsconfig（**明確 `composite: false`**）、**root `tsconfig.base.json` references 加入 `packages/ui`**、eslint.config.mjs（比照 leetcode 模式，**含 `.storybook/**`/vitest setup 的 `disableTypeChecked` carve-out**）、`shadcn init -b radix`（或手動 components.json）、globals.css theme、`cn()`、安裝 spec §3 依賴 | `pnpm install` 成功；`pnpm -F @tod-workspace/ui typecheck` 過；`npx eslint .` 乾淨 |
| 1.2 | tod-blog 接線：transpilePackages、app 端 components.json、`@source` 接線、首個 Button import 進一個頁面 | `pnpm -F tod-blog build` 成功且頁面 HTML 含 button 樣式 |
| 1.3 | Storybook 進駐 `packages/ui`：react-vite、preview 載入 globals.css、**`storybook:build` script**、Button story | `pnpm -F @tod-workspace/ui storybook:build` 成功；Button story 渲染；`npx eslint .` 乾淨（`.storybook/*.ts` 落在 carve-out 內） |
| 1.4 | **主題系統 + 測試地基**（spec D9/D10/D11）：globals.css 依 spec §4.1 token 層結構建 `professional`（預設，tweakcn 中性 preset 起點）與對照主題 × 亮/暗；`ThemeProvider`/`ThemeToggle`（`src/theme/`）；Storybook globalTypes toolbar（theme + mode 兩個切換器，decorator 掛到 preview）；vitest 三個 project（unit/dom/browser）與 Testing Library 地基、**`test` script**；`ThemeToggle.test.tsx` 與 `theme-tokens.browser.test.tsx` | `pnpm -F @tod-workspace/ui test` 全綠；theme × mode 四種組合下 primary token 的 computed color 各不相同；vitest 版本相容結論回寫 spec §3/§10 |
| 1.5 | **CI workflow**（spec D12）：`.github/workflows/ci.yml` — push/PR 觸發，跑 `npx eslint .`、ui typecheck、ui test（含 Playwright chromium 安裝）、`storybook:build`、`pnpm -F tod-blog build`、leetcode test、articles build；pnpm + Playwright 快取 | 分支上 CI 全綠；故意弄壞一個 story 驗證 CI 會紅（驗證閘門真的有牙齒後還原） |
| 1.6 | **元件規範落地**（spec D13）：寫 `.agents/docs/ui-conventions.md` + AGENTS.md 路由列；`packages/ui/eslint.config.mjs` 加 `react/function-component-definition`；既有 Button/DropdownMenu/ThemeProvider/ThemeToggle 遷成資料夾結構並改 arrow + `export default`；package.json exports 改指 `*/index.ts` | `npx eslint .` 乾淨；ui typecheck 過；`pnpm -F @tod-workspace/ui test` 全綠；`pnpm -F tod-blog build` 成功 |
| 1.R | 審查（general-purpose/sonnet，新 context）：逐條驗收 1.1–1.6 | 每條附實跑證據 |

## Phase 2 — Tier 1 primitives 批次進場（難度：低）

> 模式已被 Phase 1 驗證後，屬「已解模式批次複製」→ **general-purpose/sonnet 批次執行**（model-dispatch §4 de-escalate）。每批一個 subagent、一個 commit。

| 批次 | 元件 | 驗收（每批相同） |
| --- | --- | --- |
| 2.a 表單 | button* input label textarea checkbox radio-group select switch slider field input-group | CLI 加入成功；**檔案佈局與匯出形式符合 D13（見 ui-conventions.md §三 後處理步驟）**；每元件 1 個 `<元件名>.test.tsx`（互動元件另測互動行為）；有 variant 的元件補展示用 story；`pnpm -F @tod-workspace/ui test` 全綠；eslint 乾淨；storybook build 過 |
| 2.b Overlay | dialog sheet popover tooltip dropdown-menu alert-dialog | 同上 |
| 2.c 展示 | card badge avatar alert separator skeleton table accordion tabs progress scroll-area | 同上 |
| 2.d 回饋/導航 | sonner breadcrumb pagination command spinner | 同上 |
| 2.R | 審查（sonnet，新 context）：抽查 stories 實際渲染與測試涵蓋的行為；**抽 2 元件在對照主題 × dark 下目視/測試檢查 token 覆蓋完整**（新主題最常漏 chart/sidebar 類次要 token） | 附測試輸出 + 主題抽查證據 |

*button 已在 1.2 進場，此處補齊 variant 展示。

## Phase 3 — Markdown 管線（難度：高，本專案核心）

| # | 任務 | 執行者 | 驗收 |
| --- | --- | --- | --- |
| 3.1 | `CopyButton`（中） | sonnet | `CopyButton.test.tsx`：點擊後 clipboard 內容正確、視覺回饋出現 |
| 3.2 | `CodeBlock`：Shiki fine-grained（`shiki/core` + JS engine + 常用語言：ts/tsx/js/css/html/json/bash/python + 主題亮暗各一）+ CopyButton + 語言標籤（高） | sonnet，失敗兩次升 opus | story 含各語言範例；bundle 檢查（Git Bash）：`storybook:build` 後 `ls storybook-static/assets \| grep -i onig` 無結果（未拖入 WASM/Oniguruma），並記錄 `du -sh storybook-static/assets` 於報告 |
| 3.3 | `Callout`：Alert 基底 4 variants（中） | sonnet | story 含 4 variants；`Callout.test.tsx` 斷言每個 variant 的角色與樣式落點 |
| 3.4 | `MarkdownRenderer`：`MarkdownHooks` + remark-gfm + rehype-slug/autolink + `@shikijs/rehype`（fallback 狀態）+ prose 樣式（typography vs typeset 各出一 story 比較，回寫 spec §10）+ code→CodeBlock 映射（高） | **opus** | `MarkdownRenderer.test.tsx` 對固定測試文件斷言：`<table>` 存在且列數正確、任務清單 checkbox 數量正確、中文標題元素有 `id` 且錨點 `<a>` 存在、每個 code fence 產生含 Shiki class 的 `<pre>`、高亮前 fallback 先渲染；grep 確認源碼無未消毒的 `dangerouslySetInnerHTML` |
| 3.5 | 遷移煙霧測試：取 `packages/articles/blog/` 一篇實際中文文章原文餵入 MarkdownRenderer story | sonnet | 渲染無錯、錨點/表格/程式碼正確（為未來 Docusaurus 遷移鋪路） |
| 3.R | 審查（sonnet，新 context）+ 實際 `pnpm -F tod-blog build` | 逐條附證據 |

## Phase 4 — 已取消（原 Auth 元件，spec D8）

本階段不做登入功能。原任務內容（zod schemas、PasswordInput、Login/Register/Otp 表單、AuthCard）與 RHF+zod+useMutation 模式保留在 research-ui-tooling.md §2/§4，復啟時以該研究 + spec §9 的版本標註直接開新 Phase，毋須重新研究。編號保留不重排，避免既有引用失效。

## Phase 5 — Motion 展示元件（難度：高）

| # | 任務 | 執行者 | 驗收 |
| --- | --- | --- | --- |
| 5.1 | `FadeIn` / `Stagger` 輔助 + LazyMotion 評估 | sonnet | story 渲染；`'use client'` 邊界正確 |
| 5.2 | `MotionTabs`（motion.dev 指南有完整範例） | sonnet | `MotionTabs.test.tsx`：鍵盤方向鍵切換後 `data-state="active"` 落在正確 tab、focus 不丟失、console 無錯誤；動畫視覺品質由 owner 於 Storybook 驗收（主觀項不由 agent 自評） |
| 5.3 | `MotionDialog` / `MotionToast`：受控 open + `AnimatePresence` + `forceMount`；確認未與 tw-animate-css 雙軌（D7） | sonnet，失敗兩次升 opus | 測試斷言關閉後元素**延遲卸載**（exit 動畫生效的機械證據：close 觸發後元素仍在 DOM，動畫結束後移除）；D7 檢查 = 該元素 className 無 `animate-in/out` 系列 |
| 5.R | 審查（sonnet，新 context）：重點查雙軌動畫與 focus 管理 | 逐條附證據 |

## Phase 6 — 整合驗收（難度：中）

1. `/ui-showcase` 頁完整化：分區展示 Tier 1/2/3，**頁首掛 ThemeToggle**（sonnet）。驗收：頁面包含 spec §5 三個 Tier 各至少 3 個元件實例；`pnpm -F tod-blog build` 過且輸出 HTML 含對應區塊；靜態輸出頁上實際切換主題無 FOUC、token 生效（FR4）。
2. `storybook:build` 產物供 owner 逐元件驗收；owner 簽核清單 = spec §5 全元件 + **professional 主題觀感簽核（D10 微調在此收斂）**（主觀視覺品質在此關把守）。
3. 全套驗證：spec §8 八條全跑（主對話執行），含 CI 綠。
4. 收尾：`/code-review`（standards + spec 雙軸）跑本分支；更新 AGENTS.md 路由表加入 specs/ 一行（**需 owner 同意**，maintenance.md §1）。

## Phase D — 延後的 major 升級（獨立任務池，與主線解耦）

依風險由低到高，每項獨立 branch + 獨立驗證：

| 項目 | 現況 → 目標 | 風險備註 |
| --- | --- | --- |
| react-icons 4→5、typed.js 2→3、dedent、next-sitemap 2→4 | tod-blog 局部 | 低；改 import 與 config 即可 |
| lint-staged 15→17、commitlint 19→21 | hooks | 低 |
| eslint-plugin 生態（cypress 6、jest 29、tailwindcss 4、import-resolver 4） | root flat config | 中 |
| Jest 29→30（含 @types/jest、babel-jest、jsdom） | leetcode 測試 | 中 |
| ESLint 9→10 + @eslint/js 10 | config lookup 行為變更（from-file 成預設） | 中 |
| Cypress 13→15 | 目前無 e2e spec 實際在跑，先確認是否直接移除 | 中 |
| Next 15→16 + eslint-config-next | static export 行為需全驗 | 高 |
| TypeScript 5.7→7（Go 原生） | 等生態（ts-jest/typescript-eslint）宣告支援後再動 | 高 |
| @types/node 20→26 | 跟 Node 版本策略一起定 | 低 |

## 里程碑與依賴

```
Phase 1 ──> Phase 2 ──> Phase 3 ──┬──> Phase 6
                       Phase 5 ──┘        Phase D（隨時可插隊，獨立 branch）
```

Phase 3/5 在 Phase 2 完成後可**平行**派給不同 subagent（各自獨立目錄，衝突面小；merge 順序 3→5）。Phase 4（Auth）已取消。
