# packages/ui 元件撰寫規範

新增或修改 `packages/ui` 的元件前先讀這份。適用 `packages/ui/src/` 底下的元件目錄（`components/`、`composed/`、`motion/`、`theme/`）；`lib/` 與 `hooks/` 是模組不是元件，維持平鋪檔案，不受第一節約束。

決策本身記在 [specs/ui-library/spec.md](../../specs/ui-library/spec.md) 的 D13，本檔寫怎麼做。新規則直接加進對應章節；能用一句話講完的就不附範例。

## 一、檔案佈局

1. 一個元件一個資料夾，資料夾名、檔名、元件名三者同名且 PascalCase：`src/components/Button/` 放 `Button.tsx`、`Button.test.tsx`、`Button.stories.tsx`、`index.ts`。多字元件寫 `DropdownMenu`，不寫 `dropdown-menu`。
2. 一個資料夾只服務一個元件，同家族的子元件也一樣：`DropdownMenuItem` 有自己的 `DropdownMenu/DropdownMenuItem/DropdownMenuItem.tsx` 與 `index.ts`，巢狀在家族主元件資料夾底下。子元件不各自寫 story 與測試，整個家族共用主元件資料夾裡的 `DropdownMenu.stories.tsx` 與 `DropdownMenu.test.tsx`。
3. `index.ts` 固定兩行，default 與具名匯出都轉出去，不放實作、不聚合別的元件：

```ts
export { default } from './Button';
export * from './Button';
```

   家族主元件是唯一例外：它的 `index.ts` 在這兩行後面，把子元件的 default 逐一具名轉出（`export { default as DropdownMenuItem } from './DropdownMenuItem';`），依元件名 a-z 排序。複合元件本來就整組使用，這個 barrel 不影響 tree-shaking；需要單獨拿一個子元件時也可以走它自己的 subpath（`@tod-workspace/ui/components/DropdownMenu/DropdownMenuItem`），`package.json` 的 `./components/*` 樣式已涵蓋巢狀路徑。

4. 禁止套件層級的單一 barrel（spec §7）：每個元件各自是一個 subpath，tree-shaking 才不會被破壞。
5. 跨資料夾匯入走套件名 subpath，寫到元件名即可：`import Button from '@tod-workspace/ui/components/Button';`。`package.json` 的 exports 已對應這個結構，不必再接一次檔名。
6. 每個匯出元件至少一個測試檔（家族子元件由主元件的測試檔一起涵蓋）；story 只在有 variant 值得展示時才寫。兩者的規則見第五節。

## 二、撰寫格式

1. 元件、hook、模組層工具函式一律 arrow function，不用 `function` 宣告式；一個檔案不混兩種風格。
2. React 的 API 一條一條具名匯入，禁止命名空間：不寫 `import * as React from 'react'`，也不寫 `React.ComponentProps<'button'>`。型別匯入用 `import type`。
3. 匯出一律就地寫：主元件 `export default` 放檔案最後一行，其餘在宣告處 `export const`，禁止檔尾的 `export { … };` 區塊。`index.ts` 的 re-export 不受此限。
4. 一個檔案只有一個 default。
5. props 型別用 `interface <元件名>Props` 宣告，放在該元件正上方；不在參數位置寫行內型別，也不用 `type`。包裝既有元素或 primitive 時用 `extends` 串接：

```tsx
interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

   純轉發、沒有自己欄位的子元件照樣寫，只 `extends` 不帶成員的空介面就是它的完整宣告。介面預設不匯出；要被別的元件 `extends` 時就地 `export`（`ButtonProps` 被 `IconButton` 沿用即是此例）。
6. props 一律 a-z 排序，事件處理器（`on` 開頭）排在其後、彼此再 a-z；`key` 與 `ref` 排最前。型別宣告、解構參數、JSX 傳值三處都照同一個順序，`data-*` 與 `aria-*` 一起參與排序，不另外提前。

## 三、shadcn CLI 的後處理步驟

`shadcn add -c packages/ui <name>` 產出的是 `src/components/<kebab-case>.tsx`，內容是宣告式 `function`。CLI 不認得本檔的規範，所以每次 add 之後必做：

1. 建 `src/components/<PascalCase>/`，把產出的檔案搬進去並改名為 `<PascalCase>.tsx`。
2. 套用第二節：改成 arrow function、拆掉 React 命名空間、刪檔尾匯出區塊、把行內 props 型別抽成 `interface`、重排 props 順序。
3. 複合元件（CLI 一個檔塞十幾個子元件）按第一節第二條拆開：每個子元件一個巢狀資料夾，`'use client'` 與該子元件真正用到的 import 逐檔補齊，主元件的 `index.ts` 當家族 barrel。
4. 補 `index.ts` 與 `<PascalCase>.test.tsx`；元件有 variant 時再補 `<PascalCase>.stories.tsx`。

`npx eslint . --fix` 會修掉第二節裡機械可修的部分（見第四節），其餘手動改。驗收：`npx eslint .` 無輸出，`pnpm -F @tod-workspace/ui typecheck` 與 `pnpm -F @tod-workspace/ui test` 全綠。

## 四、強制力現況

有 lint 防線的規則全部設在 root [eslint.config.mjs](../../eslint.config.mjs) 針對 `packages/ui/src/**` 的區塊：`func-style` 與 `react/function-component-definition` 管 arrow function，`no-restricted-syntax` 的四個 selector 擋 `import * as React`、`React.` 前綴與檔尾匯出區塊，`react/jsx-sort-props`（`callbacksLast`、`ignoreCase`、`reservedFirst: ['key', 'ref']`）管 JSX 上的 props 順序。同區塊把 `@typescript-eslint/no-empty-object-type` 放寬為 `allowInterfaces: 'with-single-extends'`，讓純轉發的空 props 介面合法。

規則必須放在 root 而不是 `packages/ui/eslint.config.mjs`：flat config 只讀取 cwd 的那一份設定檔，而 `npx eslint .`、lint-staged 與 CI 都從 repo 根目錄跑，放在套件層的規則對它們形同不存在（`npx eslint --print-config` 實測，2026-09-02）。

只靠本檔與 review 把關的有四處：第一節的檔案佈局、第二節第五條的 `interface` 命名與位置、型別宣告與解構參數的排序（`react/jsx-sort-props` 只看 JSX），以及第五節的測試檔是否存在。介面成員排序要機械化得裝 `eslint-plugin-perfectionist`，目前不加這個相依。檔案佈局若日後漏網次數變多，升級選項是 `eslint-plugin-check-file` 的 `filename-naming-convention` 與 `folder-naming-convention`。

## 五、測試

決策見 spec D11：斷言一律寫在 vitest 測試檔，Storybook 只做展示。

1. 元件測試放 `<PascalCase>.test.tsx`，與元件同資料夾，用 React Testing Library 跑 jsdom。查詢走 role 與可及名稱（`getByRole`），不加 test id。家族子元件不各自建測試檔，斷言寫在主元件的測試檔裡，用真實組合渲染。
2. 需要真實 CSS 的測試（讀 computed style、驗 token 落點）改名 `<名稱>.browser.test.tsx`，會被分到 browser project 用 Playwright 跑；純邏輯模組用 `<名稱>.test.ts`，跑 node 環境。三種檔名對應 `vitest.config.ts` 的三個 project，`pnpm -F @tod-workspace/ui test` 一次跑完。
3. story 不寫 play function、不放斷言。有 variant、狀態或組合值得目視比較時才寫 `<PascalCase>.stories.tsx`，一個 variant 一個 story；沒有 variant 的元件可以不寫。
4. jsdom 缺的瀏覽器 API（Pointer Events、`matchMedia`、`ResizeObserver`）集中補在 `vitest.setup.dom.ts`，不要在個別測試檔重複 stub。
5. Radix 的選單在同一個測試裡重開之前，先等前一個選單從 DOM 卸載，否則下一次點擊會被吞掉。範例見 [ThemeToggle.test.tsx](../../packages/ui/src/theme/ThemeToggle/ThemeToggle.test.tsx) 的 `selectItem`。
6. 本階段不做自動化 a11y 檢查（D11e），`@storybook/addon-a11y` 已移除，不要再裝回來。

## 六、元件 API 慣例

1. 尺寸一律 `sm` / `md` / `lg` 三階，預設值 `md`，不再有 `xs`。cva 的 `defaultVariants` 與解構參數的預設值要寫同一個值。
2. 只有圖示、沒有文字的按鈕用 `IconButton`，不要拿 `Button` 自己補方形 className。`IconButton` 內部就是 `Button` 加一組 `size-*` 與 `p-0`，variant 沿用 `buttonVariants`，所以按鈕外觀只有一個來源。
3. `IconButton` 的 `aria-label` 是必填 prop（型別上就要求），因為它沒有可見文字可以當可及名稱。

## 七、已知缺口

`ThemeProvider` 沒有自己的測試檔，目前只被 `ThemeToggle.test.tsx` 間接覆蓋。它是不可視的 context 包裝，`useColorTheme` 的錯誤路徑與 localStorage 還原邏輯還沒有直接測試。
