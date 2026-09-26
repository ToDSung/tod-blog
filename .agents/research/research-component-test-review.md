# 研究：成熟 React 元件庫如何讓測試精準且不重複

調查對象：Radix Primitives、React Aria / React Spectrum、MUI、Chakra UI、Mantine、GitHub Primer React、shadcn/ui 的官方原始碼與文件。目的：給 `packages/ui` 的 AI「測試審查」子代理人一份可引用的判準。

## TL;DR

1. 成熟函式庫把元件測試分兩層：共用的 conformance / interaction 測試涵蓋「跨元件都一樣」的東西（ref、className、props 展開、標準互動），元件專屬測試只寫這個元件真正加的行為；涵蓋範圍與方式因架構不同而不同（見比較表）。
2. 包裝別人 primitive 的函式庫，觀察到的共同分工是：只測自己那一層加了什麼（自己的預設值、自己的 `data-*`/樣式、自己沒吞掉的 prop），互動、焦點管理、鍵盤導覽留給底層函式庫自己的測試——Chakra 對 Ark/Zag 是這樣、shadcn 對 Radix 目前不是（見第二節）。
3. `shadcn/ui` 官方 registry 本身零測試（`apps/v4/registry/new-york-v4/ui/*.tsx` 找不到任何 `.test.*`），因為它是複製貼上樣板，不是它自己維護升級的套件。
4. 機械化檢查目前最可行的是手動 mutation probe（改一行、看哪支測試變紅）；`@stryker-mutator/vitest-runner`(10.0.0,2026-08-14 發布）雖宣稱支援 `vitest >=2.0.0`，但官方文件明講不支援 browser mode，也還不能只鎖定 `vitest.config.ts` 裡的單一 project(`stryker-js#6215`,2026-09-06 開的 issue，對應 PR 尚未合併）。
5. 沒有找到任何一家把「測試判定規則」寫成可以直接餵給審查者的明文清單；React Aria 的 `test-utils-guidance.md` 最接近，但那是教怎麼用測試工具，不是教怎麼審查既有測試的品質。

## 一、比較表

| 函式庫 | 共用 conformance / 測試輔助 | 包裝層測試什麼、信任底層什麼 | browser / 視覺測試 |
| --- | --- | --- | --- |
| Radix Primitives | 沒有跨元件的 conformance helper；有一支通用回歸探針 `internal/test-utils/ref-stability.tsx`，專門偵測「組合 ref 不穩定導致無限重render」 | 不適用（自己是最底層）；薄 primitive 如 `Label.Root` 的測試只驗證「消化了自己不認得的 props」「ref 轉發」「`asChild` 分支」三件事，不驗證 click-to-focus 這種原生 `<label>` 本來就有的行為 | 沒有獨立 browser/視覺層；全部在 jsdom 跑，搭配 `vitest-axe` 做無障礙檢查（`dialog.test.tsx` 900 行） |
| React Aria / React Spectrum | `@react-aria/test-utils` 提供每個 ARIA pattern 一個 tester(`Select`、`Menu`、`Table`、`ComboBox`…），不是斷言 className/ref，而是「模擬使用者互動 + 查詢狀態」的高階 API；另有 `packages/dev/test-utils` 放 `StrictModeWrapper`、SSR 測試工具 | 官方文件明講何時不要用 tester:精確 focus 順序、修飾鍵、outside-click 這類要自己手寫 `fireEvent`/`userEvent`，tester 只覆蓋「常見流程」 | `packages/dev/test-utils` 內建 SSR 測試工具（`ssrSetup.js` 等）；未查到獨立視覺回歸層 |
| MUI | `describeConformance`（現住在 `mui-public` repo 的 `packages/test-utils/src/describeConformance.tsx`），拆成 13 支獨立函式：`testComponentProp`、`testClassName`、`testPropsSpread`、`describeRef`、`testRootClass`、四支 slots API、四支 theme(`testThemeDefaultProps` 等），用 `only`/`skip` 選要跑哪些 | 元件測試檔呼叫 `describeConformance` 打包基礎契約，自己的 `.test.tsx` 只補元件邏輯 | 沒有官方視覺回歸層，靠第三方（如 Argos）整合 |
| Chakra UI(v3，建於 Ark UI / Zag.js) | 沒有 `describeConformance` 等級的共用 helper;`packages/react/__tests__/` 只有 35 個測試檔，且集中在樣式系統本身（`css.test.ts`、`recipe.test.ts`、`cva.test.ts`、`factory-merge.test.tsx`），個別元件測試檔屈指可數（`dialog.test.tsx`、`drawer.test.tsx`、`tag.test.tsx` 等） | 觀察到的規則：只測 Chakra 自己加的東西——`dialog.test.tsx` 只有兩支測試，分別驗證「`ActionTrigger` 預設 `type="button"`」與「使用者的 `onClick` 沒被吞掉」，完全不測開關/焦點/Escape，那是 Ark/Zag 自己的責任 | 官方測試文件（`chakra-ui.com/docs/components/concepts/testing`）只講消費端怎麼裝 Vitest，沒提視覺回歸 |
| Mantine | `@mantine-tests/core` 是全樣本裡最大的共用測試包：聚合函式 `itSupportsSystemProps` 底下組合近 20 個 `it-supports-*`(ref、className、style、polymorphic、size、variant、styles API、`mod`、`others`…），每個元件測試檔開頭固定呼叫一次 | 不適用（自己是最底層）；另有 `it-connects-label-and-input`、`it-handles-switch-checkbox-state` 這類「輸入類元件專屬」的共用斷言 | 用 `tests.axe(...)` 內建無障礙檢查；是否有獨立視覺回歸（如 Chromatic)——未找到，見第五節 |
| GitHub Primer React | 共用 helper 很薄，只有 `implementsClassName`（驗證 className 落到正確 DOM 節點，含 portal 情境）加兩個 console-spy 包裝（`withExpectedConsoleError`/`withExpectedConsoleWarning`），沒有共用的 ref/props-spread helper | 官方 `component-lifecycle` 文件明訂：元件到 alpha 階段就要有「關鍵路徑與分支的 unit test」「互動狀態的 e2e / open-box test」「預設與互動態的視覺回歸」「無 axe 違規」四項，不分是否包裝了別的 primitive | 官方要求視覺回歸（轉正前必備），另有獨立 `e2e/` 目錄跑真瀏覽器測試 |
| shadcn/ui | 完全沒有；`apps/v4/registry/new-york-v4/ui/*.tsx`(`button.tsx`、`dialog.tsx`、`select.tsx` 等）在整個倉庫零 `.test.*` 命中 | 沒有官方明文規則；社群整理（非官方，見第五節）的說法是「測使用者互動與自己的組合，不測 Radix 內部 state，不斷言 `data-state`」 | 無 |

## 二、共同模式

1. **共用測試只覆蓋「跨元件都一樣」的契約**，元件自己的測試檔只寫這個元件的差異行為。MUI 的 13 支函式與 Mantine 的 20 支 `it-supports-*` 都是同一個形狀：ref 一支、className 一支、props 展開一支，元件測試檔用一行呼叫涵蓋，不必每個元件重寫斷言（`mui-public/packages/test-utils/src/describeConformance.tsx:962-976`;`mantinedev/mantine/packages/@mantine-tests/core/src/it-supports-system-props.tsx`）。
2. **包裝別人 primitive 時，只測自己加的那一層**。Chakra 的 `dialog.test.tsx` 只有兩支測試，兩支都是 Chakra 自己加的行為（預設 `type`、prop 沒被吞），完全不重測 Radix/Ark 已經測過的開關與焦點（`chakra-ui/chakra-ui/packages/react/__tests__/dialog.test.tsx`）。React Aria test-utils 的官方指南也明講「Menu 或 Dialog 沒有 trigger 時」「精確 focus 順序」這類要自己手寫，不要靠共用 tester(`adobe/react-spectrum/packages/dev/s2-docs/skills/react-aria/test-utils-guidance.md`）。
3. **越底層的函式庫，單元測試涵蓋的行為越深；越上層的包裝，單元測試涵蓋的行為越淺**。Radix 自己的 `dialog.test.tsx` 有 900 行，含完整的開關、focus trap、Escape、outside click 與 axe 檢查；Label 這種薄 primitive 反而只測三件事（props 消化、ref、`asChild`），因為 Label 本身邏輯薄（`radix-ui/primitives/packages/react/dialog/src/dialog.test.tsx`;`.../label/src/label.test.tsx`）。
4. **官方文件很少把「這層不用測」寫成明文**。查了 Chakra 官方測試文件與 `chakra-ui/ark` 的維護者討論，兩處都沒有一句話明講「Ark/Zag 負責行為，Chakra 只測自己」——這條規則是從測試檔案的實際分布反推出來的，不是宣告出來的（`chakra-ui.com/docs/components/concepts/testing`;`github.com/chakra-ui/ark/discussions/2795`）。目前唯一把測試涵蓋範圍寫成正式驗收條件的是 Primer 的元件生命週期文件（`primer.github.io/contribute/component-lifecycle/`）。
5. **shadcn/ui 不寫測試，因為測試成本落在使用者身上**。shadcn/ui 的定位是程式碼樣板，一旦 `shadcn add` 複製進使用者專案，官方就不再對那份程式碼負責，所以官方倉庫的 registry 元件本身沒有測試——這與 `packages/ui` 的處境不同：本專案把 shadcn 產出的程式碼當成自己長期維護的套件，測試責任因此落回自己身上。

## 三、每個測試的判定規則

以下規則可以逐支測試套用，給出 keep / delete / rewrite / missing 其中一個判定。

### 規則 1——移除法（把元件換成裸元素或刪掉抽象，重跑測試）

把受測元件換成語意最接近的裸 HTML 元素或直接刪掉這層抽象，測試若還是全綠，代表這支測試沒測到「這個元件」，只測到瀏覽器或 React 本來就有的行為。

- keep:Radix `label.test.tsx` 的「forwards props to the child element when asChild is set」——`asChild` 是 `Label.Root` 自己的能力，換成裸 `<label>` 這個 prop 根本不存在，測試會直接失敗（`radix-ui/primitives/packages/react/label/src/label.test.tsx`）。
- delete:本專案 `AlertDialog.test.tsx:240-258`「renders media inside the header」——把 `AlertDialogMedia` 換成 `<div>{children}</div>`,`toContainElement` 斷言照樣通過，因為它只驗證子元素出現在父層節點裡，完全沒碰到 `AlertDialogMedia.tsx:11` 真正加的響應式排版（`sm:group-data-[size=md]/alert-dialog-content:row-span-2`）與 svg 自動置中。這支該刪；真正該補的測試見規則 3 的 missing 例子。

### 規則 2——拿掉被包裝的 primitive，至少要有一條測試會變紅

包裝第三方 primitive 時，測試至少要有一條在把該 primitive 降級成裸元素後會失敗，否則測試只是在證明原生瀏覽器行為，沒有測到包裝本身的價值。寫測試理由或委派 prompt 之前，先讀該套件的 dist 原始碼確認「這是不是它真的多做的事」。

- keep:本專案 `Label.test.tsx:45-56`「suppresses the text selection a double click would otherwise make」——這是 Radix `Label` 用 `onMouseDown` 搭配 `event.detail > 1` 才 `preventDefault()` 的行為（`node_modules/.pnpm/@radix-ui+react-label@2.1.1_*/node_modules/@radix-ui/react-label/dist/index.mjs:14-17`，引自 `.agents/docs/lessons.md:66-69`），裸 `<label>` 沒有這段邏輯，降級後立刻變紅。
- rewrite（判定對象是委派 prompt，不是測試本身）：同一份 lessons 記錄裡，原始委派 prompt 把「點擊聚焦」寫成「Radix 相對於原生 `<label>` 多做的事」——這句話錯，點擊聚焦是原生 `for` 屬性與 jsdom 本來就有的語意。`Label.test.tsx:30-43` 這支測試留著沒問題（它證明包裝沒有弄壞原生語意，是合理的迴歸網），但描述它的理由要重寫，不能再說這是 Radix 的貢獻（`.agents/docs/lessons.md:66-70`）。

### 規則 3——只斷言「這個元件自己決定」的 CSS，不斷言 Tailwind 或瀏覽器本來就會算的值

一支 browser 測試該不該留，看它會不會因為元件自己的邏輯出錯而變紅；如果只會因為 Tailwind 的間距或字型換算方式改變才變紅，那是在測 Tailwind，不是在測元件。

- keep:`Checkbox.browser.test.tsx:53-70`「fills the box the same way when checked and when indeterminate」——斷言的是這個元件自己的 cva 決策（`indeterminate` 該不該套用跟 `checked` 一樣的背景色/文字色），如果哪天有人把 `data-[state=indeterminate]` 的樣式規則寫錯，這支測試會抓到。
- delete:任務描述裡提到、owner 已刪除的那支斷言 `min-w-45` 算出 `180px` 的 browser 測試——`min-w-45` 這個 class 從 `Input`(2026-09-04,commit `a504ef9`）沿用到 `InputGroup`(2026-09-23,commit `4fe8e5e`）一直存在，但它是不是等於 180px 只取決於 Tailwind 的 spacing scale 怎麼定義，元件自己沒有任何分支可能讓這個換算錯誤，所以這支測試唯一會紅的情境是升級 Tailwind 版本，而不是元件壞掉。
- missing（規則 1 delete 例子的後續）：`AlertDialogMedia` 目前只有 className 轉發被斷言（`AlertDialog.test.tsx:289`,`slot('media')).toHaveClass('media-class', 'bg-muted')`），但它真正的邏輯——`size='md'` 時觸發 `row-span-2`、沒有自帶 `size-*` class 的 svg 會被撐到 `size-6`——完全沒有 browser 測試覆蓋（`AlertDialog.browser.test.tsx` 全文搜尋 `Media` 零命中）。這是一個「missing」判定：先刪規則 1 那支假陽性，再補一支斷言這兩個真實分支的 browser 測試。

### 規則 4——懷疑的失敗情境要先寫一支會紅的測試證明存在，不能只靠推理去修

審查者（不論人類或 AI）指出的「可能失敗情境」，在動手修之前先寫一支預期會紅的測試。修完之後，把修正拿掉重跑一次那支測試；如果拿掉修正測試依然是綠的，代表那個失敗情境不存在，不該為它加程式碼或測試。

- keep（對照組）：`.agents/docs/lessons.md:48-52` 記錄的例子——審查者推理「`useSyncExternalStore` 的 snapshot 函式每次 render 都會重跑，跨分頁寫入 localStorage 會讓無關的 re-render 把 `colorTheme` 掀成新值」，實作前先寫了一支要證明這個情境的測試，結果拿掉為此加的模組層快取，測試照樣通過；換一個方向的斷言（檢查 `localStorage.getItem` 呼叫次數）也證明 React 19 根本沒有在無關 re-render 上重讀 snapshot。正確判定是把快取與那支證明不了任何事的測試一起刪除，而不是保留一段沒有測試撐得住的防禦性程式碼。
- delete 的判準就是這條規則本身：如果一支測試是為了撐住某段「推理出來但沒有實跑證據」的防禦性程式碼而寫，而且拿掉那段程式碼測試依然會紅，才有資格留下；兩個版本行為相同時，少的那個版本才是對的（`.agents/docs/lessons.md:51`）。

### 規則 5——conformance 類斷言（ref/className/props 展開）一個元件只需驗一次，不必每個 variant 各測一次

ref 轉發、className 合併、`data-*`/`aria-*` 透傳這類「跟這個元件哪個 variant 無關」的契約，只要在該元件測試檔驗證一次；如果每個 variant 各自重複斷言同一件事，應該合併。

- keep:Mantine `itSupportsRef`——單獨一支只斷言 `ref.current instanceof options.refType`，不管元件有幾個 variant 都只呼叫一次（`mantinedev/mantine/packages/@mantine-tests/core/src/shared/it-supports-ref.tsx`）。
- 現況判定（不是刪除，是基礎設施缺口）：本專案目前的模式是每個元件測試檔手寫一支「forwards a caller-supplied className alongside the base classes」（`Dialog.test.tsx:210-242`、`Select.test.tsx:237-261`），各自重新斷言 ref/className 這類共用契約。元件數量還少（約 30 個測試檔）時這個成本可以接受；如果元件數量持續成長，這裡適合抽成本專案自己的 `itSupportsClassName`/`itSupportsRef` 共用 helper——目前沒有這麼做，判定為「missing infrastructure」而非某一支測試寫錯。

### 規則 6——單純轉發給 Radix 的行為，測試的價值是「wiring 斷了會抓到」，不是「測到新行為」

如果元件只是把 props 原封不動轉給 Radix，沒有加自己的邏輯，重複測試 Radix 已經測過的行為（開關、Escape、焦點陷阱）不會抓到新 bug，但可以當低成本迴歸網——只要說清楚這支測試留著的理由是「wiring」，不是「行為驗證」。

- keep（測的是自己加的行為）：`Dialog.test.tsx:154-162`「omits the close button when showCloseButton is false」——`showCloseButton` 是 shadcn 自己加的 prop,Radix 不知道它存在，Radix 自己的測試檔不會覆蓋。
- 灰色地帶，仍判 keep 但理由要寫清楚：`Dialog.test.tsx:124-132`「closes on Escape」——Radix 自己的 `dialog.test.tsx` 已經測過 Escape 關閉（900 行測試檔的一部分），這裡重測等於在測「shadcn 的組合有沒有不小心弄壞 Radix 的 wiring」，不是在測新行為；留著的理由要寫成「wiring 迴歸網」而不是「驗證 Escape 行為」，避免下一個人誤以為這是本元件的差異化貢獻。

## 四、可機械化的檢查

### 1. StrykerJS + `@stryker-mutator/vitest-runner`

- 版本與相容性：`@stryker-mutator/vitest-runner@10.0.0`(npm 登記，2026-08-14 發布）peerDependencies 為 `vitest: ">=2.0.0"`、`@stryker-mutator/core: "10.0.0"`，語意上涵蓋本專案的 `vitest@4.1.10`(`registry.npmjs.org/@stryker-mutator/vitest-runner`）。
- 已知限制（官方文件，`stryker-mutator.io/docs/stryker-js/vitest-runner/`）：
  1. 只支援 `threads: true` 執行緒模式；
  2. 目前不支援 browser mode——本專案的 `browser` project(Checkbox 等）完全排除在外；
  3. 一律強制 `coverageAnalysis: "perTest"`，不吃使用者自訂值。
- 多 project 限制：本專案 `vitest.config.ts` 用 `test.projects` 定義了 `unit`/`dom`/`browser` 三個具名 project(`packages/ui/vitest.config.ts:16-63`）。Stryker vitest-runner 目前沒有辦法只選其中一個 project 執行——`stryker-js#6215`(2026-09-06 開的 issue）明確記錄「指向 workspace/多 project 的 configFile 會讓 Stryker 插樁並執行所有 project，不是只跑目標 project」，對應的 PR #6216 截至查證時仍是 open 狀態。因此要用 Stryker，現階段得另外維護一份只含 `dom` project 的 `vitest.config.mutation.ts` 再指給 `vitest.configFile`。
- 指令形狀（官方 `mutate` 選項，`stryker-mutator.io/docs/stryker-js/configuration/`）：
  ```
  npx stryker run --mutate "packages/ui/src/components/Dialog/Dialog.tsx"
  ```
  或在 `stryker.config.mjs` 裡設 `mutate: ['packages/ui/src/components/<Name>/**/*.tsx', '!packages/ui/src/components/<Name>/**/*.test.tsx']`，把範圍鎖在單一元件資料夾。效能選項：`--concurrency`（預設 n-1 核心）、`--incremental`（跨次執行重用結果）、`--ignoreStatic`（跳過只在檔案載入時執行的 mutant）。
- 單一元件資料夾的預期執行時間：未找到針對 React + Testing Library 元件的公開實測數字（見第五節）。社群文章給的是其他專案規模的籠統數字——`loiane.com` 的 Angular 案例提到「完整跑 5 到 30 分鐘（中型 codebase）」「per-test coverage 加 incremental 加平行化可壓到 1 到 5 分鐘」，這些數字來自不同語言/框架與專案規模，不能直接套用。

### 2. Stryker 不支援時的替代方案：人工 mutation probe（可用於 browser project)

`alexop.dev` 記錄的具體流程（2026，標題為「Mutation Testing with AI Agents When Stryker Doesn't Work」，作者情境正是 vitest browser mode 元件——Stryker 的插樁假設 Node.js 執行，browser mode 是 Playwright 起真實 Chromium，兩者不相容）：

1. 讀原始碼，記下原始內容。
2. 依優先順序做單一改動：邊界（`<` 換 `<=`）、布林邏輯（`&&` 換 `||`、反轉條件）、回傳值（`return x` 改 `return null`）、刪掉一行有副作用的敘述（如 `array.push(x)`）。
3. 跑 `pnpm -F @tod-workspace/ui test <component>`。
4. 記錄 KILLED（測試變紅）或 SURVIVED（全綠）。
5. 立刻還原原始碼，再做下一個改動。
6. 對每個 SURVIVED 的 mutant 寫出建議補的斷言。

該作者實測的一個案例（settings 功能，13 處 mutation）：5 killed、8 survived,mutation score 38%,survived 的例子包括「音量下限從 0.5 改成 0.4 全部測試仍通過」「反轉 `===`/`!==` 的主題判斷仍通過，因為斷言只查內部 state 沒查真實 DOM class」。作者明白指出這個做法適合分支開發時人工跑一次（驗證測試品質），不建議放進 CI pipeline——每個 mutation 都要一次 agent 呼叫，時間與成本比 deterministic 工具高。

### 3. Testing Library 的靜態判準

- 查詢優先序（官方文件，`testing-library.com/docs/queries/about/#priority`）：`getByRole` 等「所有人都能用的查詢」最優先，其次是 `getByAltText`/`getByTitle`,`getByTestId` 敬陪末座、只在其他方法都不適用時才用——`packages/ui` 的 ui-conventions 已經把「查詢走 role 與可及名稱，不加 test id」寫進規範（`.agents/docs/ui-conventions.md:75`），方向一致。
- 重構測試試金石（Kent C. Dodds,`kentcdodds.com/blog/testing-implementation-details`,2020-08-17，至今仍是 Testing Library 官方引用的文章）：把元件內部一個跟外部行為無關的名字改掉（state 變數改名、抽一個私有 helper），測試應該不受影響；如果因此變紅，代表測到了 implementation detail。這條沒有現成的 lint 規則，只能靠審查者人工套用。
- 可以機械化的部分：`eslint-plugin-testing-library` 的 `prefer-screen-queries`、`no-container`、`no-node-access` 等規則能抓「用 CSS selector/`container.querySelector` 而不是 role/label 查詢」——查過 root `eslint.config.mjs` 與 `packages/ui/eslint.config.mjs`，目前都沒有裝這個 plugin，這是一個可以補的機械化缺口（本專案的 `Dialog.test.tsx`/`Select.test.tsx` 已經大量用 `document.querySelector('[data-slot=...]')` 讀取 slot，這類查詢目前完全沒有 lint 防線）。

### 4. Vitest 內建的 coverage-diff

官方 `--changed` 旗標（`vitest.dev/guide/cli`）：`--changed [since]` 只跑受影響的測試，`coverage.changed` 繼承 `--changed` 的範圍，只對 diff 到的檔案收 coverage。指令形狀：

```
pnpm -F @tod-workspace/ui test -- --changed=origin/main --coverage
```

這只回答「diff 動到的程式碼有沒有被跑到」，不回答「斷言夠不夠嚴謹」——跟 mutation testing 是互補而非替代關係，這也是 `loiane.com` 那篇文章的核心論點：一行進了 coverage 只代表「沒有反證」，不代表「有證據」。

## 五、未找到

- Mantine 是否有獨立的視覺回歸工具鏈（如 Chromatic）官方採用的證據：搜尋「mantinedev chromatic storybook CI」只找到 Chromatic 的一般介紹，沒有 Mantine 官方文件或倉庫設定直接確認這件事，已知的只有 `tests.axe(...)` 這個無障礙檢查。
- StrykerJS vitest-runner 在單一 React 元件資料夾（jsdom + RTL）的實測執行時間：官方文件與社群文章都沒有針對這個場景的公開數字，本專案也還沒有實際跑過 Stryker，需要實測才能確認。
- Chakra UI 官方文件是否有一句明文寫「Ark/Zag 負責行為、Chakra 只測自己」：查過 `chakra-ui.com/docs/components/concepts/testing` 與 `github.com/chakra-ui/ark/discussions/2795`，兩處都沒有這句明文，第二節的結論是從 35 個測試檔的實際分布反推出來的，不是宣告出來的。
- Primer React 是否有 ref 轉發或 props 展開的共用測試 helper（對照 MUI/Mantine 的等級）：`packages/react/src/utils/testing.tsx` 只找到 `implementsClassName` 與兩個 console spy，沒有找到 ref/props-spread 的共用函式，也沒有找到官方文件解釋為何沒有做到這一層。
- 是否有專門針對「shadcn 包 Radix」這個場景、由官方或有信譽的團隊發表的測試品質檢查清單：只找到 `qaskills.sh` 這類課程/SEO 網站的整理，非官方文件，可信度低於本報告其他來源，列在來源清單但需要讀者自行斟酌權重。
- 是否有已發表、專門針對「LLM 審查既有測試並給 keep/delete/rewrite 判定」（而非生成新測試或審查生產程式碼）的案例：找到的兩篇論文（`arxiv.org/abs/2504.07277`、`arxiv.org/abs/2506.07594`）都是評測 LLM「偵測/重構已知測試異味分類」的能力，不是「審查測試是否重複或與元件無關」這個更寬的問題；`dr2madre/invisible-ui#318` 是形狀最接近的真實案例，但查證結果顯示那是人工做的，沒有 AI 參與的證據。

## 六、來源

- MUI `describeConformance`：https://github.com/mui/mui-public/blob/master/packages/test-utils/src/describeConformance.tsx
- MUI 元件測試檔引用範例：https://github.com/mui/material-ui/blob/master/packages/mui-material/test/describeConformance.ts
- Mantine `@mantine-tests/core` 聚合函式：https://github.com/mantinedev/mantine/blob/master/packages/@mantine-tests/core/src/it-supports-system-props.tsx
- Mantine 共用 helper 目錄（`it-supports-ref`/`it-supports-others` 等）：https://github.com/mantinedev/mantine/tree/master/packages/@mantine-tests/core/src/shared
- Mantine `Button.test.tsx` 使用範例：https://github.com/mantinedev/mantine/blob/master/packages/@mantine/core/src/components/Button/Button.test.tsx
- GitHub Primer React 共用測試 helper:https://github.com/primer/react/blob/main/packages/react/src/utils/testing.tsx
- GitHub Primer React `Button.test.tsx`：https://github.com/primer/react/blob/main/packages/react/src/Button/__tests__/Button.test.tsx
- Primer 元件生命週期文件（測試涵蓋率驗收條件）：https://primer.github.io/contribute/component-lifecycle/
- Radix Primitives ref 穩定性探針：https://github.com/radix-ui/primitives/blob/main/internal/test-utils/ref-stability.tsx
- Radix Primitives `label.test.tsx`：https://github.com/radix-ui/primitives/blob/main/packages/react/label/src/label.test.tsx
- Radix Primitives `dialog.test.tsx`：https://github.com/radix-ui/primitives/blob/main/packages/react/dialog/src/dialog.test.tsx
- React Aria `@react-aria/test-utils` README:https://github.com/adobe/react-spectrum/blob/main/packages/@react-aria/test-utils/README.md
- React Aria test-utils 使用指引（含「何時不要用」清單）：https://github.com/adobe/react-spectrum/blob/main/packages/dev/s2-docs/skills/react-aria/test-utils-guidance.md
- Chakra UI 官方測試文件：https://chakra-ui.com/docs/components/concepts/testing
- Chakra UI `dialog.test.tsx`：https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/__tests__/dialog.test.tsx
- Ark UI 與 Zag.js 關係（維護者說明）：https://github.com/chakra-ui/ark/discussions/2795
- shadcn/ui 倉庫（registry 元件零測試，以 `apps/v4/registry/new-york-v4/ui` 為證）：https://github.com/shadcn-ui/ui
- shadcn 包 Radix 測試建議（社群課程網站，非官方，信任度低於其他來源）：https://qaskills.sh/skills/thetestingacademy/shadcn-component-testing
- StrykerJS vitest runner 官方文件：https://stryker-mutator.io/docs/stryker-js/vitest-runner/
- StrykerJS 設定文件（`mutate` 選項、效能選項）：https://stryker-mutator.io/docs/stryker-js/configuration/
- `@stryker-mutator/vitest-runner` npm 登記（版本、peerDependencies）：https://registry.npmjs.org/@stryker-mutator/vitest-runner
- StrykerJS 多 project 支援缺口：https://github.com/stryker-mutator/stryker-js/issues/6215
- 人工 mutation probe 於 vitest browser mode 的實例：https://alexop.dev/posts/mutation-testing-ai-agents-vitest-browser-mode/
- Coverage 與 mutation score 落差的實例（Angular/Stryker）：https://loiane.com/2026/08/mutation-testing-angular-stryker/
- 手動 mutation 稽核既有測試的真實案例：https://github.com/dr2madre/invisible-ui/issues/318
- Agentic LLM 偵測測試異味（IEEE Software,2025）：https://arxiv.org/abs/2504.07277
- LLM 偵測/修正測試異味的實證研究（2025）：https://arxiv.org/abs/2506.07594
- Testing Library 指導原則：https://testing-library.com/docs/guiding-principles/
- Testing Library 查詢優先序：https://testing-library.com/docs/queries/about/#priority
- Kent C. Dodds，《Testing Implementation Details》（2020-08-17）：https://kentcdodds.com/blog/testing-implementation-details
- Vitest Browser Mode 官方說明：https://vitest.dev/guide/browser/why
- Vitest 視覺回歸測試（`toMatchScreenshot`，vitest 4 起可用）：https://main.vitest.dev/guide/browser/visual-regression-testing
- Vitest CLI `--changed`/`coverage.changed`：https://vitest.dev/guide/cli
