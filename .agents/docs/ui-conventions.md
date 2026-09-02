# packages/ui 元件撰寫規範

新增或修改 `packages/ui` 的元件前先讀這份。適用 `packages/ui/src/` 底下的元件目錄（`components/`、`composed/`、`motion/`、`theme/`）；`lib/` 與 `hooks/` 是模組不是元件，維持平鋪檔案，不受第一節約束。

決策本身記在 [specs/ui-library/spec.md](../../specs/ui-library/spec.md) 的 D13；本檔寫怎麼做。規範由 owner 持續增補，新規則往對應章節加。

## 一、檔案佈局

一個元件一個資料夾，資料夾名、檔名、元件名三者同名且 PascalCase：

```
src/components/Button/
├── Button.tsx          # 元件本體
├── Button.stories.tsx  # story（spec FR2：每個匯出元件至少一個）
└── index.ts            # re-export，兩行
```

1. 多字元件寫 `DropdownMenu`，不寫 `dropdown-menu`，也不寫 `Dropdown-Menu`。
2. 一個資料夾只服務一個元件。同一家族的子元件（`DropdownMenuItem`、`DropdownMenuLabel` 等十五個）同屬 `DropdownMenu`，全部留在 `DropdownMenu.tsx` 裡，不各自開資料夾。
3. `index.ts` 固定兩行，把 default 與具名匯出都轉出去，不放實作、不聚合別的元件：

```ts
export { default } from './Button';
export * from './Button';
```

   套件層級的單一 barrel 仍然禁止（spec §7）：每個元件各自是一個 subpath，tree-shaking 才不會被破壞。
4. 跨資料夾匯入一律走套件名 subpath，不用相對路徑：`import Button from '@tod-workspace/ui/components/Button';`。

`packages/ui/package.json` 的 exports 已對應這個結構（`"./components/*": "./src/components/*/index.ts"`），所以匯入路徑寫到元件名即可，不必再接一次檔名。

## 二、撰寫格式

1. 元件一律用 arrow function 寫，不用 `function` 宣告式：

```tsx
const Button = ({ className, ...props }: ButtonProps) => {
  return <button className={cn(className)} {...props} />;
};
```

2. hook 與模組層工具函式同樣用 arrow function，一個檔案不混兩種風格。`cn()` 也照這條寫。
3. React 的 API 一條一條具名匯入，禁止命名空間：不寫 `import * as React from 'react'`，也不寫 `React.ComponentProps<'button'>`：

```tsx
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;
```

4. 匯出一律就地寫，禁止檔尾的 `export { … };` 區塊。主元件用 `export default`（檔案最後一行），其他東西在宣告處直接 `export const`：

```tsx
export const buttonVariants = cva(/* … */);

const Button = ({ /* … */ }: ButtonProps) => {
  /* … */
};

export default Button;
```

   `index.ts` 的 `export … from './X'` 是 re-export，不受這條限制。
5. 同家族的子元件不各自開檔案，也不集中到匯出區塊：`DropdownMenu.tsx` 裡 `DropdownMenu` 是 default，`DropdownMenuItem` 等十四個子元件各自 `export const`。一個檔案只有一個 default。
6. 型別匯入用 `import type`（root ESLint 已強制）。

## 三、shadcn CLI 的後處理步驟

`shadcn add -c packages/ui <name>` 產出的是 `src/components/<kebab-case>.tsx`，內容是宣告式 `function`。CLI 不認得本檔的規範，所以每次 add 之後必做：

1. 建 `src/components/<PascalCase>/`，把產出的檔案搬進去並改名為 `<PascalCase>.tsx`。
2. 把檔案裡所有 `function X({ … }: T) {` 改成 `const X = ({ … }: T) => {`，對應的結尾 `}` 改成 `};`。
3. 把 `import * as React from 'react'` 換成用到什麼就具名匯入什麼（通常只有 `import type { ComponentProps } from 'react';`），並把所有 `React.ComponentProps<…>` 去掉命名空間前綴。
4. 刪掉檔尾的 `export { … };` 區塊：主元件改成檔尾 `export default X;`，其餘每一項在宣告處補 `export`。
5. 補 `index.ts`（兩行 re-export）。
6. 補 `<PascalCase>.stories.tsx`；互動元件同時補 play test（spec D11b）。

驗收照舊：`npx eslint .` 無輸出、`pnpm -F @tod-workspace/ui test` 全綠。

## 四、強制力現況

第二節的四條格式規則都有機械防線，全部設在 root [eslint.config.mjs](../../eslint.config.mjs) 針對 `packages/ui/src/**` 的區塊：`func-style` 與 `react/function-component-definition` 管 arrow function，`no-restricted-syntax` 的三個 selector 分別擋 `import * as React`、`React.` 前綴、以及檔尾的 `export { … };` 區塊。

規則必須放在 root 而不是 `packages/ui/eslint.config.mjs`：flat config 只讀取 cwd 的那一份設定檔，而 `npx eslint .`、lint-staged 與 CI 都從 repo 根目錄跑，放在套件層的規則對它們形同不存在（`npx eslint --print-config` 實測，2026-09-02）。

檔案佈局（第一節）目前沒有 lint 規則，只靠本檔與 review（owner 決定，2026-09-02）。若日後漏網次數變多，升級選項是 `eslint-plugin-check-file` 的 `filename-naming-convention` 與 `folder-naming-convention`。

## 五、已知缺口

`ThemeProvider` 沒有 story，與 spec FR2「每個匯出元件至少一個 story」有落差。它是不可視的 context 包裝，story 要怎麼寫（或是否列為例外）尚未決定。
