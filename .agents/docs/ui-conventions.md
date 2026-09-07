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

   家族主元件是唯一例外：它的 `index.ts` 在這兩行後面，先把子元件的 default 逐一具名轉出（`export { default as DropdownMenuItem } from './DropdownMenuItem';`），再逐一轉出它們的 props 型別（`export type { DropdownMenuItemProps } from './DropdownMenuItem';`），兩段各自依元件名 a-z 排序。複合元件本來就整組使用，這個 barrel 不影響 tree-shaking；需要單獨拿一個子元件時也可以走它自己的 subpath（`@tod-workspace/ui/components/DropdownMenu/DropdownMenuItem`），`package.json` 的 `./components/*` 樣式已涵蓋巢狀路徑。

4. 禁止套件層級的單一 barrel（spec §7）：每個元件各自是一個 subpath，tree-shaking 才不會被破壞。
5. 跨資料夾匯入走套件名 subpath，寫到元件名即可：`import Button from '@tod-workspace/ui/components/Button';`。`package.json` 的 exports 已對應這個結構，不必再接一次檔名。
6. 每個匯出元件都有一個測試檔與一個 story 檔，家族子元件由主元件的那一份一起涵蓋；沒有畫面的 provider 類元件不寫 story。兩者的規則見第五節。
7. 函式、hook 與常數要不要獨立成檔，看呼叫點數，不看「這段邏輯能不能取名字」。只在一個檔案裡用到的東西就寫在那個檔案裡，不匯出、不另開檔案；有第二個檔案要用才搬出來。想單獨測它也不是搬出來的理由：測試走元件的介面，能從外面觀察到的行為才需要測。判斷方法是刪除測試：把這個抽象刪掉，內容是回到一個呼叫點，還是散到好幾個檔案重複？回到一個呼叫點就不該抽。
8. 達到門檻才搬出來的東西放在該元件資料夾底下，不塞進共用的 `src/lib`：常數是單一檔 `constants.ts`，工具函式與 hook 各自一個資料夾（`utils/`、`useColorTheme/`，各配一個 `index.ts`），`utils/` 裡一個函式一個檔、檔名同函式名，context 跟著讀它的那個 hook 走。這些檔案彼此用相對路徑匯入；要給別的元件用的，由元件的 `index.ts` 在原本兩行後面另起一段一併轉出，只給元件內部用的不轉。
9. 不為了拆檔另立只給內部用的私有子元件或 hook。provider 元件自己持有 state、effect 與 context value，一個元件一段 JSX；對外只匯出讀 context 的那個 hook。

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

   純轉發、沒有自己欄位的子元件照樣寫，只 `extends` 不帶成員的空介面就是它的完整宣告。props 介面一律就地 `export`，消費端包裝或轉發時才有型別可以 `extends`（`IconButton` 就是 `extends ButtonProps`）。
6. props 一律 a-z 排序，事件處理器（`on` 開頭）排在其後、彼此再 a-z；`key` 與 `ref` 排最前。型別宣告、解構參數、JSX 傳值三處都照同一個順序，`data-*` 與 `aria-*` 一起參與排序，不另外提前。

## 三、shadcn CLI 的後處理步驟

`cn` 用官方套件：npm 上的 [`cn`](https://github.com/shadcn-ui/cn)，shadcn 本人維護，定位是 `clsx` + `tailwind-merge` 的替代品。元件比照上游 registry 寫 `import { cn } from 'cn';`，本專案不自建 wrapper。`src/lib/` 目前沒有 util，components.json 的 `aliases.utils` 是 CLI schema 的必填欄位（`components` 與 `utils` required，`ui`/`lib`/`hooks` optional），留著佔位。

CLI 一律只用 `--dry-run` 與 `--view` 跑，拿它印出的原始碼當範本，自己把檔案寫進去。不加這兩個旗標直接跑 `shadcn add`，檔案會落成 CLI 自己的佈局與寫法（見下），相依也會不經審視地寫進 `packages/ui/package.json` 與 `pnpm-lock.yaml`。

`--view` 印出的是 `src/components/<kebab-case>.tsx`，內容是宣告式 `function`。CLI 不認得本檔的規範，所以每次抄進來之後必做：

1. 建 `src/components/<PascalCase>/`，把內容寫成 `<PascalCase>.tsx`。
2. 套用第二節：改成 arrow function、拆掉 React 命名空間、刪檔尾匯出區塊、把行內 props 型別抽成 `interface`、重排 props 順序。
3. 複合元件（CLI 一個檔塞十幾個子元件）按第一節第二條拆開：每個子元件一個巢狀資料夾，`'use client'` 與該子元件真正用到的 import 逐檔補齊，主元件的 `index.ts` 當家族 barrel。
4. 補 `index.ts`、`<PascalCase>.test.tsx` 與 `<PascalCase>.stories.tsx`。

驗收前用 `git status --porcelain` 確認只有新元件資料夾底下的檔案，`packages/ui/package.json` 與 `pnpm-lock.yaml` 沒被動到。`npx eslint . --fix` 會修掉第二節裡機械可修的部分（見第四節），其餘手動改。驗收：`npx eslint .` 無輸出，`pnpm -F @tod-workspace/ui typecheck` 與 `pnpm -F @tod-workspace/ui test` 全綠。

## 四、強制力現況

有 lint 防線的規則全部設在 root [eslint.config.mjs](../../eslint.config.mjs) 針對 `packages/ui/src/**` 的區塊：`func-style` 與 `react/function-component-definition` 管 arrow function，`no-restricted-syntax` 的四個 selector 擋 `import * as React`、`React.` 前綴與檔尾匯出區塊，`react/jsx-sort-props`（`callbacksLast`、`ignoreCase`、`reservedFirst: ['key', 'ref']`）管 JSX 上的 props 順序。同區塊把 `@typescript-eslint/no-empty-object-type` 放寬為 `allowInterfaces: 'with-single-extends'`，讓純轉發的空 props 介面合法。

同一個區塊還掛了 `eslint-plugin-react` 的 recommended 與 jsx-runtime、`eslint-plugin-react-hooks` 的 `recommended-latest`：`rules-of-hooks` 與 `exhaustive-deps` 之外，也含 React Compiler 那組（`set-state-in-effect`、`purity`、`immutability`、`refs` 等）。`exhaustive-deps` 在 preset 裡是 warning，這裡另外覆寫成 error，因為 `npx eslint .` 不會因為 warning 非零退出。條件式呼叫 hook、依賴陣列漏寫、在 effect 裡同步 setState，都會讓 lint 非零退出。要把外部狀態（localStorage、DOM 屬性）讀進元件時用 `useSyncExternalStore`，不要用 effect 把它抄進 state — 範例見 [ThemeProvider.tsx](../../packages/ui/src/theme/ThemeProvider/ThemeProvider.tsx)。

規則必須放在 root 而不是 `packages/ui/eslint.config.mjs`：flat config 只讀取 cwd 的那一份設定檔，而 `npx eslint .`、lint-staged 與 CI 都從 repo 根目錄跑，放在套件層的規則對它們形同不存在（`npx eslint --print-config` 實測，2026-09-02）。`packages/ui/eslint.config.mjs` 因此只留從套件目錄跑時才用得到的 parser 接線，不放任何規則。更不要從 `packages/ui` 目錄跑 `npx eslint --fix`：那份設定把 `@tod-workspace/ui/*` 判成不同的 import 群組，一次 `--fix` 就會把整棵 `src/` 的 import 順序改成 root 設定不接受的樣子，連你沒碰過的檔案一起改。lint 一律從 repo 根目錄跑。

只靠本檔與 review 把關的有五處：第一節的檔案佈局、第一節第七條的呼叫點門檻、第二節第五條的 `interface` 命名與位置、型別宣告與解構參數的排序（`react/jsx-sort-props` 只看 JSX），以及第五節的測試檔是否存在。介面成員排序要機械化得裝 `eslint-plugin-perfectionist`，目前不加這個相依。檔案佈局若日後漏網次數變多，升級選項是 `eslint-plugin-check-file` 的 `filename-naming-convention` 與 `folder-naming-convention`。呼叫點門檻沒有 lint 可接：`knip` 只抓零使用的匯出，ESLint 沒有「只被呼叫一次」的規則，所以這條由 `code-review` skill 的 Speculative Generality 與 Middle Man 兩個 smell 把關。

## 五、測試

決策見 spec D11：斷言一律寫在 vitest 測試檔，Storybook 只做展示。

1. 元件測試放 `<PascalCase>.test.tsx`，與元件同資料夾，用 React Testing Library 跑 jsdom。查詢走 role 與可及名稱（`getByRole`），不加 test id。家族子元件不各自建測試檔，斷言寫在主元件的測試檔裡，用真實組合渲染。
2. 需要真實 CSS 的測試（讀 computed style、驗 token 落點）改名 `<名稱>.browser.test.tsx`，會被分到 browser project 用 Playwright 跑；純邏輯模組用 `<名稱>.test.ts`，跑 node 環境。三種檔名對應 `vitest.config.ts` 的三個 project，`pnpm -F @tod-workspace/ui test` 一次跑完。
3. 每個元件都有 `<PascalCase>.stories.tsx`，與元件同資料夾，家族子元件由主元件的那一份涵蓋，至少要有一個 `Default`。story 不寫 play function、不放斷言，展示的是這個元件自己的 props：一個 variant、一個狀態各一個 story，沒有 variant 的元件就只有 `Default`。不為了讓某段樣式看得見而硬湊跟別的元件的組合，那種組合展示留給真正的組合元件。沒有畫面的 provider 類元件不寫 story。
4. jsdom 缺的瀏覽器 API（Pointer Events、`matchMedia`、`ResizeObserver`）集中補在 `vitest.setup.dom.ts`，不要在個別測試檔重複 stub。
5. Radix 的選單在同一個測試裡重開之前，先等前一個選單從 DOM 卸載，否則下一次點擊會被吞掉。範例見 [ThemeToggle.test.tsx](../../packages/ui/src/theme/ThemeToggle/ThemeToggle.test.tsx) 的 `selectItem`。
6. 本階段不做自動化 a11y 檢查（D11e），`@storybook/addon-a11y` 已移除，不要再裝回來。

## 六、元件 API 慣例

1. 尺寸一律 `sm` / `md` / `lg` 三階，預設值 `md`，不再有 `xs`。cva 的 `defaultVariants` 與解構參數的預設值要寫同一個值。
2. 只有圖示、沒有文字的按鈕用 `IconButton`，不要拿 `Button` 自己補方形 className。`IconButton` 內部就是 `Button` 加一組 `size-*` 與 `p-0`，variant 沿用 `buttonVariants`，所以按鈕外觀只有一個來源。
3. `IconButton` 的 `aria-label` 是必填 prop（型別上就要求），因為它沒有可見文字可以當可及名稱。
