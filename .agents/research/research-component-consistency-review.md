# 元件一致性 review 調查：跨元件 sizing 共用、強制工具與 API 極簡化準則

調查目的：為 `packages/ui` 設計一個 AI「第一輪 review」子代理，找出主流元件庫怎麼定義並守住跨元件的 sizing/spacing 一致性、怎麼用工具強制執行、怎麼決定要不要新增子元件或 prop，以及 2025－2026 年有沒有拿 LLM 當第一輪審查者的實例。

## TL;DR

- 成熟元件庫多半把 `sm`/`md`/`lg` 的高度、padding、圓角收進同一組共用 token（Mantine、Chakra UI v3、IBM Carbon、Radix Themes、Adobe Spectrum 皆如此）；shadcn/ui 與 Vercel Geist 相反，每個元件檔案各自寫死數值，跨元件一致性完全靠人工比對——這正是本專案踩過的坑的根源。
- 能機械檢查的只有「同一類數值跨檔案是否唯一」這種比對：focus ring 寬度、`min-width`、icon 尺寸、overlay/shadow 數值、footer 排列方向，寫成 grep 或 `@shadcn/lint` 的 contracts 規則就能擋下來。
- 專用的 design-token lint（`stylelint-plugin-carbon-tokens`、`@atlaskit/eslint-plugin-design-system`）都綁死在各自的 CSS-in-JS／SCSS 系統；唯一針對「`.tsx` 裡的原始 Tailwind class 字串」設計、不需要建置步驟的是 2026 年才出現的 `@shadcn/lint`，跟本專案的實際情況最貼近。
- 要不要新增 prop／子元件，各家共識是「先看能不能用 `children`／組合做到」；只有 Carbon、Primer 把它寫成正式貢獻流程（分級模型、PR 審查標準），多數庫（含本專案）是直接在決策記錄裡定案，沒有 RFC 模板。
- 「LLM 當第一輪審查者」這題 2025－2026 年才剛起步，查到的具體案例只有 Vercel 內部的 `product-design` 系統與 `@shadcn/lint`／`web-design-guidelines` 這兩三個；學術上的 Adobe DRS 論文關注的是平面設計整體，不是元件庫一致性，覆蓋率偏薄。

## 比較表

| 元件庫 | 跨元件共用 sizing/spacing 的方式 | 如何強制執行 | 如何把關新增子元件/prop |
| --- | --- | --- | --- |
| shadcn/ui | 沒有共用 token；每個元件檔案各自把高度、padding、圓角寫成字面 Tailwind class，複製到專案後彼此獨立 | 官方本身不帶 lint；2026 年推出 `@shadcn/lint`，讀取 `.tsx` 內的 Tailwind class 字串做規則檢查 | 沒有正式流程，"open code" 立場是複製後就是使用者自己的程式碼，加不加子元件/prop 自行決定 |
| Vercel Geist | 官方文件沒有揭露單一的跨元件 sizing token 頁；各元件頁各自用具名尺寸（small/medium/large/tiny），不標實際 px 也不連到共用 scale | 未找到公開的 design-token lint；內部有 `product-design` agent 系統做審查，但不是公開工具 | 未找到公開的新元件/prop 貢獻流程（非開放貢獻的設計系統） |
| Vercel Web Interface Guidelines（含 `vercel-labs/agent-skills` 的 `web-design-guidelines`） | 不是元件庫，是一份跨網站互動/可及性/效能規則清單，含少數尺寸相關規則（如「hit target ≥24px」） | 規則清單本身就是拿來 enforce 的；`web-design-guidelines` skill 抓遠端規則檔逐條核對程式碼，用 `file:line` 回報 | 不涉及元件 API 設計，不適用 |
| Radix Themes | 有明確 `size` 數字 prop（多數元件 1–3，部分到 9），另有共用的 spacing（1–9）、radius（1–6）scale，三份文件互相參照 | 未找到官方 lint plugin；主要靠 TypeScript 型別與文件約束 | Radix Primitives 的 composition philosophy（`asChild`、拆分 part）是新增底層元件的準則，未找到正式「加不加 prop」RFC 模板 |
| MUI | `size`（small/medium/large）是跨元件的命名慣例，但各元件實際 px 各自定義，不共用同一份數值；可用 `theme.components.MuiXxx.defaultProps` 一次套用到多個元件 | 未找到官方 design-token 專用 lint plugin | 未找到正式 RFC 流程；新元件走一般 GitHub PR，未查到公開檢查清單 |
| Chakra UI v3 | 有明確的集中式 token 頁（`sizes`），元件透過 recipe／slot recipe 讀同一組 token | 未找到官方 lint；靠 recipe 系統把樣式收斂在 theme 檔案裡，屬架構性防呆而非 lint | 未找到正式流程 |
| Mantine | 有集中式 theme 物件（`spacing`、`radius`、`fontSizes`），文件明載「用在所有支援的元件」 | 未找到官方 lint plugin | 未找到正式流程 |
| GitHub Primer | Primer Primitives 有 spacing/typography token；但多數元件實際 height/padding 原始碼本次未能鎖定（承 research-field-layout.md 的調查） | `eslint-plugin-primer-react`，20 條規則，但多數是元件用法規則（deprecated props、a11y、禁止萬用匯入），只有一兩條碰到 CSS 值 | `primer/react` `CONTRIBUTING.md` 有明確 PR 審查標準（是否用 theme values、是否符合 GitHub 既有模式），一兩天內回覆 |
| IBM Carbon | 有完整 spacing/layout token 系統（`@carbon/layout`），research-field-layout.md 已確認 `spacing-02`=4px 等數值 | 官方 `stylelint-plugin-carbon-tokens`，專門檢查 SCSS/CSS 有沒有用 token 而非寫死值，涵蓋 layout/motion/theme/type 四面向 | `carbon-contribution` repo 定義 Light/Medium/Heavy 三級貢獻模型，新元件走 Heavy，需先開 issue 說明「為什麼整個系統都用得到」 |
| Adobe Spectrum | t-shirt sizing（S/M/L/XL），官方文件承認桌機每階差 8px 是通用規則 | 未找到專用 design-token lint；`spectrum-css` 用一般 formatter/lint-staged | 未找到公開的新元件 RFC 流程細節 |
| Atlassian Design System（atlaskit） | `space.100`=8px 基礎單位（research-field-layout.md 已確認），但本次同樣沒查到跨元件 control height 的單一頁面 | `@atlaskit/eslint-plugin-design-system`，含 `no-unsafe-design-token-usage`、`no-deprecated-design-token-usage`、`no-deprecated-apis` 等規則，專門擋沒用 design token 的寫法 | 官方自陳新元件貢獻流程還不成熟（"larger contributions such as new components ... are currently difficult to contribute"） |

資料來源對照（表格數值/敘述的出處，逐條列於「來源」章節，此處先標示對應關係）：shadcn/ui 見 `ui.shadcn.com/docs`、`button.tsx`/`checkbox.tsx` 原始碼、`github.com/shadcn-ui/lint`；Vercel Geist 見 `vercel.com/geist/introduction`、`vercel.com/geist/button`；Web Interface Guidelines 見 `github.com/vercel-labs/web-interface-guidelines`、`vercel-labs/agent-skills` 的 `web-design-guidelines` skill；Radix Themes 見 `radix-ui.com/themes/docs/theme/overview`、`/theme/spacing`、`/theme/radius`；MUI 見 `mui.com/material-ui/customization/density`；Chakra 見 `chakra-ui.com/docs/theming/sizes`；Mantine 見 `mantine.dev/theming/theme-object`；Primer 見 `github.com/primer/eslint-plugin-primer-react`、`primer/react` `CONTRIBUTING.md`；Carbon 見 `stylelint-plugin-carbon-tokens`、`carbon-design-system/carbon-contribution`；Spectrum 見 `github.com/adobe/spectrum-css/wiki/How-to:-T-shirt-sizing-in-Spectrum-CSS`；Atlassian 見 `atlassian.design/components/eslint-plugin-design-system`、`atlassian.design/contribution`。

## 共同模式

1. **有專職團隊維運的庫，sizing 一定收斂成共用 token，由 variant 系統讀取，而不是每個元件各自寫死數值。** Mantine 的 `spacing`／`radius`／`fontSizes` 明文「用在所有支援的元件」（https://mantine.dev/theming/theme-object/)；Chakra UI v3 有獨立的 `sizes` token 頁供 recipe／slot recipe 引用（https://chakra-ui.com/docs/theming/sizes)；IBM Carbon 的 `@carbon/layout` 搭配官方 `stylelint-plugin-carbon-tokens` 強制檢查（https://github.com/carbon-design-system/stylelint-plugin-carbon-tokens)；Radix Themes 有獨立的 spacing、radius 文件頁供所有元件的 `size` prop 參照（https://www.radix-ui.com/themes/docs/theme/spacing、https://www.radix-ui.com/themes/docs/theme/radius)。
2. **shadcn/ui 與 Vercel Geist 走相反路線：查證過的原始碼與官方頁面都沒有共用數值來源。** 直接讀取上游 `button.tsx` 與 `checkbox.tsx` 原始碼（https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx、.../checkbox.tsx)，兩者的 focus ring 都各自寫 `focus-visible:ring-[3px]`——上游本身其實是一致的；Vercel Geist 的 `vercel.com/geist/introduction` 與 `vercel.com/geist/button` 都只給 small/medium/large/tiny 這種具名尺寸，沒有標 px 也沒連到共用 token 頁。
3. **本專案目前的 focus ring 不一致，正是「客製化沒有傳播完」而不是「上游不一致」。** `packages/ui/src/components/Button/Button.tsx:9` 與 `Input.tsx:8` 把 focus ring 從上游的 3px 改成 `focus-visible:ring-2`（2px），但後續複製上游的 `Checkbox.tsx:12`、`Switch.tsx:11`、`RadioGroup/RadioGroupItem/RadioGroupItem.tsx:11`、`Slider/Slider.tsx:39` 仍是 `ring-3`（3px）——這是 2026-09-25 讀取原始碼時的現況，不是歷史問題，代表這條檢查現在就該加。
4. **`min-width` 的一致性目前守住了，可以當機械檢查的正向對照組。** `Input.tsx:8`、`Textarea/Textarea.tsx:11`、`Select/SelectTrigger/SelectTrigger.tsx:12`、`InputGroup/InputGroup.tsx:8` 四個檔案的 `min-w-45`（180px）數值完全一致，證明「跨檔案 grep 同一類 class、比對數值集合是否唯一」這個做法對這一類問題有效。
5. **真正給「原始 Tailwind class 字串」用的 design-token lint 是 2026 年才出現的東西，且明講不需要建置步驟。** `@shadcn/lint` 的 README 寫明「works with Tailwind v4 projects (shadcn/ui not required）」「reads Tailwind class strings directly from source files」，支援 ESLint 9.30+／Oxlint 1.80+(https://github.com/shadcn-ui/lint)；相對地，Carbon 與 Atlassian 的 lint 都綁在各自的 SCSS 變數或 CSS-in-JS token API 上，換到 raw Tailwind class 字串的專案裡完全用不上。
6. **API 極簡化的判準三方一致：先問「能不能用 `children`／組合做到」，能就不要加新 prop。** React 官方文件把 `children` 稱為元件的「洞」（"You can think of a component with a `children` prop as having a 'hole' that can be 'filled in'"），並提醒「如果 spread props 用在每個元件上，代表該拆元件、改用 children」（https://react.dev/learn/passing-props-to-a-component)；Radix Primitives 的 composition 文件用 `asChild` 把行為與外觀拆開，讓使用者不必靠新增 prop 客製化（https://www.radix-ui.com/primitives/docs/guides/composition)；本地 `vercel-composition-patterns` skill 的核心規則同樣是「不要加 boolean prop 來切換行為，改用組合」與「用 explicit variant 元件取代 boolean 模式」與「用 children 取代 renderX props」（`.agents/skills/vercel-composition-patterns/SKILL.md:45-46`、`:60-61`、`:62-63`）。三者的差異只在於誰把它寫成可執行的檢查——`@shadcn/lint` 的 `no-restyle` contracts 可以機械擋掉「用 `className` 硬改 padding 而不是用 `size` prop」這類退化寫法。
7. **正式的新元件 RFC／貢獻流程只出現在對外開放貢獻、有專職團隊的庫。** IBM Carbon 的 `carbon-contribution` repo 把貢獻分成 Light／Medium／Heavy 三級，新元件走 Heavy，要求先開 issue 說明「為什麼整個系統都用得到」（https://github.com/carbon-design-system/carbon-contribution)；`primer/react` 的 `CONTRIBUTING.md` 要求 PR 審查是否用了 theme values、是否符合 GitHub 既有模式，一兩天內回覆（https://github.com/primer/react/blob/main/contributor-docs/CONTRIBUTING.md)；Atlassian 官方在 `atlassian.design/contribution` 自陳「大型貢獻（如新元件）目前仍難以貢獻」，代表這條路在 Atlassian 內部也還沒有寫成可執行流程。本專案 `specs/ui-library/spec.md:114` 的做法（`field` 只收 4 個上游子元件、`FieldError` 只吃 `children` 不收 `errors` 陣列）在精神上與 Carbon／Primer 的准入邏輯一致，只是直接寫進決策記錄，沒有走 RFC 模板。
8. **helper/label/間距這類版面數值已經有專門調查，本報告不重複、只沿用其結論。** `research-field-layout.md` 已確認 helper 文字多半比 label 小一階、input→helper 間距比 label→input 更緊，且本專案已依該調查採用 `text-xs leading-4`（12px/16px）與 `gap-1`（4px）等具體值；本報告的機械檢查第 3 條直接引用這些既有結論做核對基準，不重新推導。
9. **2025－2026 年拿 LLM 當第一輪 UI 審查者的公開案例仍集中在少數幾家。** Vercel 的內部 `product-design` 系統把檢查分成「code 能可靠檢查的」（如 nested modal、缺 accessible name、超出 spacing scale 的任意值）與「需要 product/程式碼脈絡判斷的」兩類，回報格式固定為 P0–P3 嚴重度加上 `file/line`、驗證狀態、使用者後果、最小修法（https://vercel.com/blog/teaching-agents-product-design-at-vercel)；`vercel-labs/agent-skills` 的 `web-design-guidelines` skill 則是抓遠端規則檔、逐條核對、用 `file:line` 回報（https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md)。學術界唯一查到的相關論文是 Adobe 的 Agentic Design Review System（AAAI 2026），但它評的是平面設計整體（對齊、構圖、美感、配色），不是元件庫一致性（https://research.adobe.com/publication/agentic-design-review-system)。Storybook 團隊也有相關 RFC 討論，但目前只是雛型、還沒有明確的「元件一致性審查」角色（https://github.com/storybookjs/storybook/discussions/32466)。

## 可機械化的檢查

- **focus ring 寬度一致性**：對 `packages/ui/src/components/**/*.tsx` grep `focus-visible:ring-(\d+|\[[^\]]+\])` 與 `aria-invalid:ring-(\d+|\[[^\]]+\])`，把所有互動元件（Button、Input、Textarea、Select、InputGroup、Checkbox、RadioGroup、Switch、Slider）比出的數值收集成一個集合，集合裡出現一個以上不同數值就是違規。現有違規：`Button.tsx:9`／`Input.tsx:8`／`Textarea.tsx:11`／`SelectTrigger.tsx:12`／`InputGroup.tsx:8` 都是 `ring-2`，但 `Checkbox.tsx:12`／`Switch.tsx:11`／`RadioGroupItem.tsx:11`／`Slider.tsx:39` 都是 `ring-3`——這是本次調查讀原始碼時查到的現況，不是假設案例。
- **表單控制項最小寬度一致性**：對同一批表單元件檔案 grep `min-w-\S+`，確認數值唯一。目前 `Input.tsx:8`、`Textarea.tsx:11`、`SelectTrigger.tsx:12`、`InputGroup.tsx:8` 都是 `min-w-45`（180px），符合規則；這條檢查主要防的是未來新增表單元件時漏掉這個數值（歷史問題：180px 規則曾需要人工從 Input 逐一補到 Textarea/Select）。
- **helper/label 字級與間距**：grep `FieldDescription`、`FieldError` 元件檔的 class 字串，確認含 `text-xs leading-4`；grep `Field` 根層 class，確認垂直間距用 `gap-1`（4px）而非跟 label→input 同一個間距值。核對基準直接沿用 `research-field-layout.md`「給我們的建議」表列出的採用值，不重新推導。
- **icon 尺寸與 addon padding**：grep 各元件檔裡 `[&_svg:not([class*='size-'])]:size-\d` 或 `InputGroupIconButton`/`IconButton` 內的 `size-\d`，同一個尺寸階層（`sm`/`md`/`lg`）的不同元件應該落在同一個數值；另外 grep `InputGroupAddon` 的 class 字串，確認含左右 padding（如 `px-\d`），避免歷史上「icon 太大、addon 沒有 padding」重演。
- **modal 類 overlay／陰影／邊框一致性**：對 `Dialog`、`AlertDialog`、`Sheet` 三個家族的 `*Overlay.tsx` grep `bg-black/\d+`，對 `*Content.tsx` grep `shadow-\S+` 與 `ring-\d+\s+ring-foreground/\d+`，三個家族的數值應該完全相同（spec.md D16 定案為 `bg-black/50` 加 `shadow-lg` 加 `ring-1 ring-foreground/10`）。歷史違規：nova preset 預設遮罩是 `bg-black/10` 且內容框沒有陰影，跟 D16 的定案值不同。
- **Footer 底色與排列方向**：grep `DialogFooter.tsx`、`AlertDialogFooter.tsx`、`SheetFooter.tsx` 的 class 字串，確認都不含 `bg-muted` 之類的底色 class，且都不含 `flex-col`（或含 `flex-col` 就必須同時含 `sm:flex-row` 之外的固定橫排寫法）。歷史違規：`Sheet` 的 footer 按鈕曾直排，跟 `Dialog` footer 的橫排不一致。
- **家族子元件的匯出數量對照 spec 允許清單**：grep 家族主元件 `index.ts` 裡 `export { default as` 的具名數量，對照 `specs/ui-library/spec.md` §5 明列的允許子元件清單（例如 `field` 只收 `Field`／`FieldLabel`／`FieldDescription`／`FieldError` 四個）。多出清單以外的名字就是違規。歷史違規：`field` 上游有 10 個子元件，但只有 4 個在本專案有實際使用情境。
- **禁止陣列型 props 混進單值語意的欄位**：grep 元件 `interface <元件名>Props` 區塊，找 `errors?:` 或 `errors:` 這類複數/陣列命名的 prop，若對應元件的用途是顯示單一錯誤訊息（如 `FieldError`），陣列型 prop 就是違規訊號。歷史違規：`FieldError` 曾直接照抄上游的 `errors` 陣列 prop。
- **`@shadcn/lint` 的 `no-arbitrary-values`／`no-restyle`**：可以直接掛進 `packages/ui` 的 ESLint 設定，擋掉 `ring-[3px]`、`p-[13px]` 這類跳過 Tailwind scale 的寫法，並用 `contracts` 規則鎖住「哪個元件的 `className` 只能加 layout/margin，不能加 spacing」，機械擋掉「用 `className` 硬改元件內距」這類會導致外觀來源不唯一的寫法（詳見 `github.com/shadcn-ui/lint`）。這條擋不住 `ring-2` vs `ring-3` 這種「兩個值都合法、只是選擇不同」的問題，仍需搭配前面的跨檔案數值比對。

## 需要判斷的檢查

- 這個 story 有沒有展示一個跟同資料夾其他 story 不一樣的 prop 或狀態，還是只是換了外層包裝、實質內容重複？
- 這個新增的 prop 能不能改用 `children`／組合既有元件做到同樣效果？
- 如果把這個子元件或這段抽象刪掉，程式碼會回到一個呼叫點，還是散在多個檔案重複？
- Modal／overlay 類元件在這個主題的亮色模式下，是否讓人一眼看出「現在只能操作這個框」，而不是被背景吃掉？
- 這個元件的 invalid／disabled／loading 視覺是否跟同類型的其他表單元件（Input／Select／Textarea）看起來像同一家出的？
- 這個 prop 是不是布林值，但實際上在描述「哪一種」而不是「有沒有」（該用 explicit variant 取代 boolean）？
- 同一個尺寸階層（`sm`/`md`/`lg`）下，這個元件跟同層級的其他表單元件排在同一列時，高度看起來是否對齊？
- 這份 PR／commit 新增的匯出元件，`<元件名>.test.tsx` 與 `<元件名>.stories.tsx` 是否都存在、且測試斷言真的涵蓋新加的行為，而不是只是複製既有測試？
- 這個元件的 focus 樣式、invalid 樣式是不是抄自上游卻沒有比對本專案已經客製化過的同類元件？

## 未找到

- Vercel Geist 官方文件是否有一頁列出所有元件共用的 control height／spacing scale：查了 `vercel.com/geist/introduction` 與 `vercel.com/geist/button`，都只給具名尺寸（small/medium/large/tiny），沒有標實際 px 也沒連到共用 token 頁。坊間有第三方逆向分析網站（`designmd.cc`、`getdesign.md`）宣稱抓到 4/8/12/16/24/32/48/64px 的間距尺度與只允許 4px/6px/9999px 的圓角規則，但這不是 Vercel 官方一手來源，本報告不採信其精確數值。
- MUI、Chakra UI v3、Mantine 是否有官方維護的「design-token 專用」ESLint／Stylelint 插件（類似 Carbon、Primer、Atlassian 的做法）：多次搜尋都沒有找到對應結果，只查到 Carbon、Primer、Atlassian 三家有這類工具。
- `@atlaskit/eslint-plugin-design-system` 的完整規則清單與逐條描述：`atlassian.design` 的規則頁多次回傳空白或 403，只能從搜尋結果標題與 npm 頁確認 `ensure-design-token-usage`、`no-unsafe-design-token-usage`、`no-deprecated-design-token-usage`、`no-deprecated-apis` 這幾個規則名稱，沒能逐條核對規則內容與範例。
- Radix Themes、Adobe Spectrum、Atlassian Design System 是否有公開的「新增子元件」RFC 模板：沒有查到公開模板，只有 Carbon 的 Light/Medium/Heavy 分級與 Primer 的 PR 審查標準是寫成文件的正式流程。
- Adobe Spectrum、Atlassian Design System 各元件的精確 focus ring 寬度數值：`research-field-layout.md` 先前調查同一批庫時就已標記官方原始碼連結多次 404、文件頁被截斷；本次針對 focus ring 寬度另外查證，仍得到相同結果。
- 2025－2026 年是否有專門針對「元件庫一致性」（而非整體平面設計或網頁互動準則）的 LLM 審查基準或大規模案例研究：只查到 Vercel 內部 blog、`@shadcn/lint`、`storybookjs` 的 RFC 討論與 Adobe 的 DRS 學術論文；DRS 關注的是平面設計整體，不是元件庫一致性，這個子題的覆蓋率確實偏薄。

## 來源

- shadcn/ui 文件（open code 定位）：https://ui.shadcn.com/docs
- shadcn/ui `button.tsx` 上游原始碼：https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx
- shadcn/ui `checkbox.tsx` 上游原始碼：https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/checkbox.tsx
- `@shadcn/lint`（agent-first Tailwind design-system linter）：https://github.com/shadcn-ui/lint
- Vercel Geist：https://vercel.com/geist/introduction 、 https://vercel.com/geist/button
- Vercel「教 agent 做 product design」內部系統：https://vercel.com/blog/teaching-agents-product-design-at-vercel
- `vercel-labs/web-interface-guidelines`：https://github.com/vercel-labs/web-interface-guidelines
- `vercel-labs/agent-skills` 的 `web-design-guidelines` skill：https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md
- Vercel Agent Skills 官方索引（含 `web-design-guidelines`、`building-components` 說明）：https://vercel.com/docs/agent-resources/skills
- `vercel/components.build` 的 `building-components` skill：https://github.com/vercel/components.build/blob/main/skills/building-components/SKILL.md
- Radix Themes theme 總覽／spacing／radius：https://www.radix-ui.com/themes/docs/theme/overview 、 https://www.radix-ui.com/themes/docs/theme/spacing 、 https://www.radix-ui.com/themes/docs/theme/radius
- Radix Primitives composition 文件：https://www.radix-ui.com/primitives/docs/guides/composition
- MUI Density 文件：https://mui.com/material-ui/customization/density/
- Chakra UI v3 Sizes 文件：https://chakra-ui.com/docs/theming/sizes
- Chakra UI v3 Slot Recipes 文件：https://chakra-ui.com/docs/theming/slot-recipes
- Mantine theme object 文件：https://mantine.dev/theming/theme-object/
- `eslint-plugin-primer-react`：https://github.com/primer/eslint-plugin-primer-react
- `primer/react` 貢獻指南：https://github.com/primer/react/blob/main/contributor-docs/CONTRIBUTING.md
- `stylelint-plugin-carbon-tokens`：https://github.com/carbon-design-system/stylelint-plugin-carbon-tokens
- Carbon 貢獻流程（Light/Medium/Heavy 分級）：https://github.com/carbon-design-system/carbon-contribution
- Adobe Spectrum T-shirt sizing：https://github.com/adobe/spectrum-css/wiki/How-to:-T-shirt-sizing-in-Spectrum-CSS
- Atlassian Design System ESLint plugin 總覽：https://atlassian.design/components/eslint-plugin-design-system
- Atlassian Design System 貢獻總覽：https://atlassian.design/contribution
- `stylelint-declaration-strict-value`：https://github.com/AndyOGo/stylelint-declaration-strict-value
- `eslint-plugin-tailwindcss`（Tailwind v4 支援狀態）：https://github.com/francoismassart/eslint-plugin-tailwindcss
- React 官方文件（children 作為「洞」、spread props 警告）：https://react.dev/learn/passing-props-to-a-component
- Adobe Research「Agentic Design Review System」（AAAI 2026）：https://research.adobe.com/publication/agentic-design-review-system
- Storybook 團隊 agentic workflow RFC 討論：https://github.com/storybookjs/storybook/discussions/32466
- 本地檔案：`D:\code\tod-blog\.agents\docs\ui-conventions.md`
- 本地檔案：`D:\code\tod-blog\specs\ui-library\spec.md`（§2 決策記錄、§5 元件清單）
- 本地檔案：`D:\code\tod-blog\.agents\research\research-field-layout.md`
- 本地檔案：`D:\code\tod-blog\.agents\skills\vercel-composition-patterns\SKILL.md`
- 本地檔案：`D:\code\tod-blog\.agents\docs\writing-standards.md`
- 本地原始碼（focus ring／min-width 現況查證）：`packages/ui/src/components/Button/Button.tsx`、`Input/Input.tsx`、`Textarea/Textarea.tsx`、`Select/SelectTrigger/SelectTrigger.tsx`、`InputGroup/InputGroup.tsx`、`Checkbox/Checkbox.tsx`、`Switch/Switch.tsx`、`RadioGroup/RadioGroupItem/RadioGroupItem.tsx`、`Slider/Slider.tsx`
