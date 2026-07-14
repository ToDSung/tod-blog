# Spec: `packages/ui` — 共用 UI Library（@tod-workspace/ui）

Status: **Draft v2**（2026-07-14，納入 owner 三項強化需求：主題切換、專業預設主題、測試防線；待 owner 核准後進入實作）
研究依據：[.agents/docs/research-ui-stack.md](../../.agents/docs/research-ui-stack.md)、[.agents/docs/research-ui-tooling.md](../../.agents/docs/research-ui-tooling.md)
執行計畫：[plan.md](plan.md)

## 1. 目標與定位

建立一個 shadcn/ui + Tailwind v4 + motion 的共用元件庫，作為此 monorepo 未來擴展的基礎設施。這是一個**技術展示**專案：每個元件都必須能在 Storybook 中被逐一檢視與驗收。

長期方向（影響設計優先序）：

1. **Docusaurus (`packages/articles`) 的內容將遷回 tod-blog** — 因此 `MarkdownRenderer` 不只是展示元件，而是未來內容遷移的基礎設施，必須完整支援中文內容與 articles 現有的 Markdown 慣例（GFM 表格、程式碼區塊、標題錨點）。
2. 服務對象：**Next.js apps**（tod-blog 與未來新增的 app）。articles (Docusaurus) 不是消費者。
3. **品質防線是自動化測試，不是人工 review** — owner 明確表示不會深度 review 此專案的程式碼。因此每個元件的正確性必須由機器可跑的測試證明（render、互動、a11y），review 只看驗收證據。這影響所有 Phase 的驗收設計（見 D11/D12）。

## 2. 已定案決策（Decision Log）

| # | 決策 | 理由 | 日期 |
| --- | --- | --- | --- |
| D1 | 套件升級採「安全更新」：同 major 升到最新（已完成）；major 升級列入獨立任務（見 plan.md Phase D） | 降低與 UI library 主線互相干擾的風險 | 2026-07-13 |
| D2 | Primitive 底層用 **Radix**（shadcn CLI `-b radix`；統一包 `radix-ui`，非舊式 `@radix-ui/react-*`） | motion 官方有 Radix 整合指南；生態與範例最成熟；React 19 相容已驗證 | 2026-07-13 |
| D3 | Storybook **放在 `packages/ui` 內**（`.storybook/` + stories 與元件同目錄） | 單一元件庫不需要獨立殼；官方無「獨立 package」建議 | 2026-07-13 |
| D4 | Markdown 範圍：**GFM + Shiki 語法高亮 + 複製按鈕 + 標題錨點 + Callout**；KaTeX / mermaid 列為未來擴充 | 先做核心、用現成套件組裝 | 2026-07-13 |
| D5 | 套件名 `@tod-workspace/ui`，跟隨 `@tod-workspace/leetcode` 慣例 | monorepo 命名一致性 | 2026-07-13 |
| D6 | 樣式基準：`new-york` style、`cssVariables: true`、OKLCH、`tw-animate-css` | shadcn Tailwind v4 現行預設 | 2026-07-13 |
| D7 | 動畫所有權規則：每個元件**只選一種**進出場機制 —— 一般 overlay（tooltip/popover/dropdown）用 `tw-animate-css` 的 `data-state` CSS；展示型元件（MotionDialog/MotionTabs/MotionToast）用 motion 的 `AnimatePresence` + `forceMount`。禁止同一元素雙軌動畫 | 研究確認兩機制無官方共用指南，混用會雙重動畫 | 2026-07-13 |
| D8 | **Auth 元件本階段取消**（LoginForm/RegisterForm/OtpForm/AuthCard/PasswordInput、input-otp，及其依賴 react-hook-form/zod/resolvers/TanStack Query 一併延後） | Owner 決定此 phase 不做登入功能；研究結論（research-ui-tooling.md §2/§4）保留，復啟時直接沿用 | 2026-07-13 |
| D9 | **主題系統**：token 全走 CSS variables 單一機制；多主題以 `[data-theme="<name>"]` 屬性選擇器覆蓋 `:root` token 區塊；dark mode 維持 `.dark` class，與主題**正交**（theme × mode 矩陣，任一主題皆有亮暗兩態）。App 端用 `next-themes`（attribute 模式）掛切換；ui 匯出 `ThemeProvider` 薄包裝 + `ThemeToggle`。Storybook 用 globalTypes toolbar 切換 theme 與 mode | shadcn 官方 theming 模式（cssVariables: true）天然支援多主題覆蓋；next-themes 是 shadcn 官方 dark mode 建議且支援任意 attribute 值、無 FOUC | 2026-07-14 |
| D10 | **預設主題 = `professional`**：低飽和中性色（graphite/slate 系）、OKLCH、克制的 radius 與陰影、明確 foreground/background 對比。以 tweakcn 的中性系 preset（如 Graphite）為起點微調；另附至少一個對照主題（名稱實作時定）證明切換機制成立 | Owner 指定專業風格為預設；tweakcn 產出即為 :root/.dark 變數塊，與 D9 架構零轉換成本 | 2026-07-14 |
| D11 | **測試是主要品質防線**（owner 不深度 review）：(a) addon-vitest（browser mode, Playwright）把**每個 story 自動變 render 測試**；(b) 所有互動元件必有 play function 互動測試；(c) a11y 檢查跑在 vitest 內、violation = 測試失敗（不只是 addon 面板警告）；(d) 純邏輯（`cn()`、markdown 元件映射等）用 vitest 單元測試；(e) 統一入口 `pnpm -F @tod-workspace/ui test`。視覺回歸（Chromatic / storybook-addon-vis）**本階段不做**，列未來擴充（§9） | 「story 即測試」讓覆蓋率跟元件數自動同步，agent 不能只寫元件不寫測試；a11y 升級為 fail 條件才有強制力；VRT 需要 baseline 管理與外部服務，對單人專案先緩 | 2026-07-14 |
| D12 | **CI 品質閘門**：GitHub Actions workflow（push + PR）跑 eslint / ui typecheck / ui test / storybook build / tod-blog build / leetcode test。CI 是**獨立於產碼 agent 的確定性驗證**，與 plan 的新 context 審查（.R）互補 | 2026 業界對 agent 產碼的共識：驗證者必須與產碼者分離、閘門必須確定性；目前 repo 只有 local hooks，agent 可繞過的面太大 | 2026-07-14 |

## 3. 技術棧與版本（研究驗證，2026-07-13）

| 類別 | 套件 | 版本 | 備註 |
| --- | --- | --- | --- |
| 樣式 | `tailwindcss`（含 `@tailwindcss/node`、`@tailwindcss/postcss`） | ^4.3.2 | CSS-first，無 tailwind.config |
| 元件 | `shadcn`（CLI） | 4.13.0 | `init -b radix` 需可偵測的 framework，bare source package 會失敗（實測 2026-07-14）→ 手動寫 components.json 後 `add` 正常。CLI 4.x style 改為 preset 制（`radix-nova`，取代 new-york）；`shadcn` 須列 **runtime dependency**（元件 CSS import `shadcn/tailwind.css`） |
| Primitive | `radix-ui` | ^1.6.2 | 統一包；React 19 OK |
| 動畫 | `motion` | ^12.42.2 | import 自 `motion/react`；client-only |
| 動畫(CSS) | `tw-animate-css` | ^1.4.0 | 取代 tailwindcss-animate |
| 展示 | `storybook` + `@storybook/react-vite` | 10.5.x | essentials/docs/interactions 已內建 core，勿另裝 |
| 展示 addon | `@storybook/addon-a11y`、`@storybook/addon-vitest` | 隨 SB 10.5 | **非 core 內建，需另裝**（`npx storybook add`）；a11y 驗收 + 互動測試 |
| Markdown | `react-markdown` | ^10.1.0 | 用 `MarkdownHooks`（支援 async plugin） |
| Markdown | `remark-gfm` | ^4.0.1 | 表格/任務清單/刪除線/footnotes |
| Markdown | `rehype-slug` + `rehype-autolink-headings` | latest | 標題錨點 |
| 高亮 | `shiki` + `@shikijs/rehype` | shiki ^4.3.1；`@shikijs/rehype` 版本獨立，取與 shiki 同 major 的最新（安裝時以 registry 為準） | **必須用 fine-grained import**（`shiki/core` + JS engine + 個別語言/主題），否則 bundle 過大 |
| 排版 | `@tailwindcss/typography` | ^0.5.20 | peerDeps 支援 v4；備選：shadcn `typeset`（實作時比較後擇一） |
| Icons | `lucide-react` | ^1.24.0 | CLI 4.13 nova preset 實際產出（實測回寫 2026-07-14；注意已進 1.x，非舊 0.x 系列） |
| 主題 | `next-themes` | ^0.4.6 | attribute 模式掛 `data-theme` + class 模式掛 `.dark`；無 FOUC script；client-only |
| 測試 | `vitest` + `@vitest/browser` + `@vitest/browser-playwright` + `playwright` | vitest ^4.1.10（實測相容：addon-vitest 10.5 peer 宣告 `^3 \|\| ^4`，vitest 4 需新 provider 套件 `@vitest/browser-playwright`，config 用 `provider: playwright()`） | browser mode 跑 story 測試；Windows 上 Playwright 需 `npx playwright install chromium` |

## 4. 架構

### 4.1 目錄結構

```
packages/ui/                        # @tod-workspace/ui
├── package.json                    # subpath exports（無 barrel，利 tree-shaking）
├── tsconfig.json                   # extends ../../tsconfig.base.json
├── eslint.config.mjs               # extends root（比照 leetcode 模式）
├── components.json                 # style: new-york, cssVariables: true, base: radix
├── .storybook/                     # main.ts (react-vite), preview.ts (載入 globals.css)
└── src/
    ├── components/                 # shadcn 產生的 primitives（button.tsx…）+ story 同目錄
    ├── composed/                   # 自組元件（markdown/、auth/、code-block…）
    ├── motion/                     # motion 展示元件（MotionDialog…）
    ├── theme/                      # ThemeProvider（next-themes 薄包裝）、ThemeToggle
    ├── lib/                        # cn() 等 utils
    └── styles/globals.css          # @import "tailwindcss"; @import "tw-animate-css"; @theme inline; token 層（見下）
```

Token 層結構（D9/D10，全部集中在 `globals.css`，單一來源）：

```css
:root { --background: …; }              /* professional 主題（預設）亮色 */
.dark { --background: …; }              /* professional 暗色 */
[data-theme='<alt>'] { … }              /* 對照主題亮色（覆蓋同名 tokens） */
[data-theme='<alt>'].dark { … }         /* 對照主題暗色 */
@theme inline { --color-background: var(--background); … }
```

### 4.2 跨套件接線（關鍵約束）

- **原始碼直接消費**：ui 不做 build，tod-blog 以 `transpilePackages: ['@tod-workspace/ui']` 直接吃 TS 原始碼（shadcn monorepo 官方模式）。
- **Tailwind 掃描**：tod-blog 的 `globals.css` 加 `@source "../../ui/src";`（相對路徑以實作時驗證為準）並 import ui 的共用 stylesheet — theme tokens 單一來源在 ui。
- **兩份 `components.json`**：ui 與 tod-blog 各一份，`style`/`baseColor`/`iconLibrary` 必須一致；app 端 alias 指向 `@tod-workspace/ui/components`。
- **TypeScript**：ui 的 tsconfig extends base 後需**明確覆寫 `"composite": false`**（`tsconfig.base.json` 預設 `true`，不覆寫就會與本條設計矛盾）；root `tsconfig.base.json` 的 `references` 陣列需加入 `packages/ui` — eslint 的 `packages/*/tsconfig.json` glob 與 TS 專案參照圖是兩套機制，都要接上。驗證用 `tsc --noEmit`（包成 `typecheck` script，見 §8.2）。
- **ESLint**：ui 的 `eslint.config.mjs` 比照 leetcode 模式 extends root，且**必須**為 tsconfig include 之外的檔案（`.storybook/*.ts`、vitest setup 等）加 `disableTypeChecked` carve-out — Phase 0 已在 leetcode 的 `jest.config.ts` 修過同類 bug；缺這條會從 Phase 1.3 起讓 `npx eslint .` 與 pre-commit hook 全數卡死。
- **Workspace 解析**：以 `pnpm-workspace.yaml` 為準；root `package.json` 的 `workspaces` 欄位是 npm 式遺留欄位，pnpm 會忽略，勿以它為依據。
- **static export 安全**：禁用 Server Actions / Route Handlers / next/image 預設 loader；互動元件一律 `'use client'`。研究已確認 shadcn + motion 在 `output: 'export'` 下天然安全。

## 5. 元件清單（三層）

### Tier 1 — shadcn primitives（CLI 直接加，低難度）

表單類：`button` `input` `label` `textarea` `checkbox` `radio-group` `select` `switch` `slider` `field` `input-group`
Overlay 類：`dialog` `sheet` `popover` `tooltip` `dropdown-menu` `alert-dialog`
展示類：`card` `badge` `avatar` `alert` `separator` `skeleton` `table` `accordion` `tabs` `progress` `scroll-area`
回饋/導航：`sonner`（toast）`breadcrumb` `pagination` `command` `spinner`

### Tier 2 — 自組元件（中～高難度）

| 元件 | 組裝方式 | 難度 |
| --- | --- | --- |
| `CopyButton` | Button + `navigator.clipboard` + 成功狀態回饋 | 中 |
| `CodeBlock` | Shiki（fine-grained）輸出 + CopyButton + 語言標籤 | 高 |
| `Callout` | Alert 為基底，info/warning/danger/tip variants | 中 |
| `MarkdownRenderer` | `MarkdownHooks` + remark-gfm + rehype-slug/autolink + `@shikijs/rehype` + prose 樣式 + 元件映射（code→CodeBlock、blockquote→Callout 語法擴充） | **高（本專案核心）** |
| `ThemeProvider` | next-themes 薄包裝（attribute=`data-theme` + class=`.dark` 雙軌設定收斂於此） | 中 |
| `ThemeToggle` | DropdownMenu/Switch 組合：切 theme 與 light/dark/system | 中 |

（Auth 相關元件 — PasswordInput / LoginForm / RegisterForm / OtpForm / AuthCard — 依 D8 取消，見 §9。）

### Tier 3 — motion 展示元件（高難度）

`MotionDialog`、`MotionTabs`、`MotionToast`：依 motion.dev Radix 指南（`asChild` + 受控 open state + `AnimatePresence` + `forceMount`）。共用 `FadeIn` / `Stagger` 輔助元件。遵守 D7 動畫所有權規則。

## 6. 功能需求

- **FR1 Markdown**：給任意 Markdown 字串（含中文），client-side 渲染出 GFM 完整結果；程式碼區塊有 Shiki 高亮（載入中顯示 fallback）與複製按鈕；標題自動 id + 錨點連結；不使用 `dangerouslySetInnerHTML` 注入未消毒 HTML。
- **FR2 Storybook**：每個匯出元件至少一個 story；CopyButton 與互動元件有 play function 互動測試；a11y addon 無 violations；`storybook build` 可產出靜態站供 owner 驗收。
- **FR3 消費驗證**：tod-blog 建立 `/ui-showcase` 頁（或等值展示頁）實際 import 使用，`pnpm -F tod-blog build` 通過即為整合驗證。
- **FR4 主題切換**：ui 匯出 `ThemeProvider`/`ThemeToggle`；切換 `data-theme` 後所有元件的顏色 token 即時生效（無需 re-render hack）；任一主題皆支援亮/暗；static export 下無 FOUC（next-themes 注入 script）；Storybook toolbar 可獨立切換 theme 與 mode，所有 story 在 theme × mode 矩陣下皆可渲染。
- **FR5 測試防線**（D11）：`pnpm -F @tod-workspace/ui test` 單一指令跑完全部 story render 測試 + play 互動測試 + a11y 斷言 + 單元測試；任何 a11y violation、互動斷言失敗、story render 錯誤都讓該指令非零退出。

## 7. 非功能需求

- TS strict（承襲 tsconfig.base.json）、`npx eslint .` 全倉乾淨（含 import/order、consistent-type-imports）。
- Bundle 紀律：Shiki 一律 fine-grained import；motion 元件集中在 `src/motion/` 讓未使用者可被 tree-shake；subpath exports、無 barrel file。
- a11y：Radix 語意 + a11y 檢查全綠為驗收線，且以測試失敗強制（D11c）。
- 測試紀律：**元件沒有測試 = 元件不存在** — 任何新增匯出元件的 commit 必須同時帶 story（自動成為 render 測試）；互動元件必須同 commit 帶 play test。
- Conventional Commits、husky hooks 照舊，不得 `--no-verify`；CI（D12）為最終閘門。

## 8. 驗收標準（機械可查）

1. `pnpm install` 後 workspace 解析無誤；`npx eslint .` 乾淨。
2. `pnpm -F @tod-workspace/ui typecheck`（`tsc --noEmit`）通過（`typecheck` script 於 plan Phase 1.1 建立）。
3. `pnpm -F @tod-workspace/ui storybook:build` 成功，所有 story 可渲染（`storybook:build` script 於 plan Phase 1.3 建立）。
4. `pnpm -F @tod-workspace/ui test` 全綠（story render + play tests + a11y 斷言 + 單元測試；`test` script 於 plan Phase 1.4 建立）。
5. 主題矩陣：預設 `professional` 與對照主題 × 亮/暗 四種組合下，全部 story 渲染無錯；`ThemeToggle` 有 play test 證明切換後 document 上的 `data-theme`/`.dark` 正確變化。
6. `pnpm -F tod-blog build` 成功且 showcase 頁包含 ui 元件輸出與 ThemeToggle。
7. 既有驗證不退步：leetcode 72 tests、articles build。
8. CI workflow（D12）在分支上全綠。

## 9. 範圍外（Out of Scope）

- KaTeX / mermaid（未來擴充：`remark-math` + `rehype-katex`，屆時需重驗 rehype-katex 維護狀態）。
- **視覺回歸測試（VRT）**：D11 明確延後。復啟選項：Chromatic（官方、hosted、免費額度）或 `storybook-addon-vis`（本地 snapshot，跨機器字型渲染差異風險，Windows 上尤甚）。等元件面穩定後再評估。
- 第三個以上的主題、主題編輯器/使用者自訂主題 — 架構（D9）已預留 `[data-theme]` 擴充點，本階段只出貨 2 個主題。
- **Auth 元件全系列（D8 取消）**：PasswordInput、LoginForm、RegisterForm、OtpForm、AuthCard，及 `react-hook-form@^7.81` / `zod@^4.4` / `@hookform/resolvers@^5.4` / `@tanstack/react-query@^5.101` / `input-otp@^1.4` 等依賴。復啟時直接沿用 research-ui-tooling.md §2（版本）與 §4（RHF+zod+useMutation 組合模式），不必重新研究。
- 實際 auth 後端、token 儲存策略（見 backend-roadmap.md）。
- Docusaurus 消費 ui 元件（articles 內容未來直接遷回 tod-blog）。
- major 版本升級（Next 16、ESLint 10、Jest 30、TS 7、Cypress 15 等 — plan.md Phase D 列管）。

## 10. 未決事項（實作時決定並回寫此文件）

- `@tailwindcss/typography` vs shadcn `typeset`：Phase 3 實作 MarkdownRenderer 時兩者各出一個 story 比較後定案。
- ~~shadcn CLI 在非 Turborepo workspace 的 `--monorepo` 行為~~（已定案 2026-07-14）：`--monorepo` 只用於腳手架全新專案；在既有 bare package 內 `init` 因 framework 偵測失敗不可用 → 手動配置兩份 components.json。之後 `shadcn add -c packages/ui` 正常，aliases 用套件名（`@tod-workspace/ui/*`）配 tsconfig paths 解析，產出直接落在 `src/components/`。
- ~~`@source` 相對路徑基準~~（已定案 2026-07-14）：相對於**宣告它的 stylesheet**。tod-blog 的 `styles/globals.css` 用 `@source "../../ui/src"`，`pnpm -F tod-blog build` 實測輸出含 ui 元件 utilities。
- professional 主題的具體 token 值：graphite/slate 起點已於 Phase 1.4 落地（對照主題定名 **`ocean`**）；owner 目視簽核微調方向仍待 Phase 6。注意：`--destructive` 亮色已因 a11y 對比門檻（4.5:1，destructive button 的 /10 tint 底）壓到 `oklch(0.5 0.19 25)`，微調時勿回淺。
- ~~vitest 4.x 與 addon-vitest（SB 10.5）相容性~~（已定案 2026-07-14）：相容。vitest 4.1.10 + `@vitest/browser` + vitest 4 新拆的 `@vitest/browser-playwright`（config `provider: playwright()`）；addon-vitest peer 宣告 `^3 || ^4`。已回寫 §3。
- CI runner 上 Playwright browser 的安裝與快取策略：Phase 1.5 實作時定（`npx playwright install --with-deps chromium`）。
