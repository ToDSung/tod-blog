# 程式碼註解規範

適用所有套件的原始碼、測試與設定檔（`.ts`、`.tsx`、`.js`、`.mjs`）。Markdown 文件不歸本檔管，那是 [writing-standards.md](writing-standards.md) 的範圍。

一句話版本：預設不寫註解；只有程式碼本身講不出來的事才寫，而且一行寫完。

背景是 owner 主要以 agent 開發，而 agent 預設會替每段程式碼加解釋。這些註解重述程式碼、重述官方文件、很快過期，讀的成本高於寫的成本。調查依據與 lint 方案見 [research-code-comments.md](research-code-comments.md)。

## 一、可以寫的五種情況

每一則註解都要先通過刪除測試：把它刪掉，讀者會不會做錯事或誤解程式碼？不會就不要寫。通過的通常落在這五種：

1. Workaround：繞過某個套件、瀏覽器或測試環境的缺陷或限制。寫出繞的是什麼、不繞會發生什麼。例：Radix 選單重開前要等前一個卸載，否則點擊被吞。
2. 看程式碼看不出來的取捨：兩種寫法都對，選這種有不明顯的原因。例：預設主題等於移除 `data-theme` 屬性，因為 `:root` 的 token 區塊就是預設值。
3. 刻意不做的事：空的 `catch`、故意不訂閱的事件、故意不處理的分支，一行說為什麼不做。例：另一個分頁的寫入不會改本頁樣式，所以不訂閱 `storage` 事件。
4. 外部規格的出處：演算法、正規表示式、magic number 來自哪份規格或哪個 issue，給名稱或連結。
5. 安全邊界：注入字串、`dangerouslySetInnerHTML`、跳過跳脫的地方，說明為什麼安全。

## 二、不能寫的八種情況

1. 重述程式碼在做什麼：「取得使用者」「迴圈跑每個項目」「匯入元件」「回傳結果」。
2. 解釋官方 API 的正常用法。`useSyncExternalStore` 的第三個參數在 server 端回傳預設值、next-themes 用 class 切換深色，這些去官方文件就有。判準：這句話能不能在該套件的官方文件找到？能就刪。
3. 說明專案架構或決策。那是 spec 的 Decision Log 或 `ui-conventions.md` 的內容，程式碼裡不重複；真的要指路就寫一行 `see ui-conventions.md §4`。
4. 區段標題：`// ---- helpers ----`、`// State`、`// Handlers`。要分段就拆檔案或拆函式。
5. 註解掉的程式碼。要保留就靠 git，不留在檔案裡。
6. 沒有理由的 `eslint-disable` 與 `@ts-expect-error`；`@ts-ignore` 一律不用，改用 `@ts-expect-error` 加理由。
7. 重述名字或型別的 JSDoc：TypeScript 已有型別就不寫 `@param {number}`；`/** The user id. */` 這種只重複名稱的不寫。JSDoc 只給公開 API、而且型別講不清楚的行為（副作用、順序要求、單位）時才寫。
8. 把 commit 訊息寫進程式碼：「這次重構把 X 改成 Y」「原本是 Z」。沿革查 git。

## 三、寫法

1. 一則註解一行；最多兩行。超過兩行代表該改名字、拆函式，或那段內容該去 spec。
2. 只寫「為什麼」。句型是「這樣做（或不做）是因為 …」，不是「這段在做 …」。
3. 放在它解釋的那一行正上方，不寫行尾註解。
4. 用英文，與既有程式碼一致；不寫作者、日期、emoji。
5. `eslint-disable` 一律接 `-- 原因`；`@ts-expect-error` 後面直接接原因。
6. 不用 `TODO`、`FIXME` 留待辦。要做的事寫進 `specs/<主題>/plan.md` 或開 issue。

## 四、寫之前的自查

1. 刪掉之後，讀者會誤解嗎？
2. 這句話官方文件找得到嗎？
3. 改個名字或抽個函式，能不能讓這則註解變多餘？
4. 一行寫得完嗎？

四題有任何一題答錯，就不寫。

## 五、範例：`ThemeProvider.tsx` 的六段註解怎麼判

以 [ThemeProvider.tsx](../../packages/ui/src/theme/ThemeProvider/ThemeProvider.tsx) 清理前的 16 行註解為例，逐段套第一、二節：

| 註解（摘要） | 判定 | 理由 |
| --- | --- | --- |
| `BOOTSTRAP_SCRIPT` 上方三行：hydration 前套用主題、只插常數所以沒有注入 | 留，縮成兩行 | 時序與安全邊界從程式碼看不出來（第一節 5） |
| `storeListeners` 上方四行：主題存在 React 外所以用 external store；不訂閱 `storage` 事件 | 只留最後一句 | 前半是 `useSyncExternalStore` 的官方用法（第二節 2）；不訂閱是刻意不做的事（第一節 3） |
| `catch` 裡「storage 可能被擋」 | 留，一行 | 空 `catch` 要有理由（第一節 3） |
| `readDefaultTheme` 上方「server 沒有 storage 與 document」 | 刪 | `getServerSnapshot` 的官方語意（第二節 2） |
| `ThemeProvider` 上方「next-themes 管 light/dark，color theme 另開 context」 | 刪 | 架構決策屬於 spec（第二節 3），兩個 provider 並列在 JSX 裡已經看得到 |
| `setColorTheme` 裡「預設主題等於移除屬性」 | 留，一行 | 取捨看不出來（第一節 2） |
| 第二個 `catch` 裡「偏好遺失不值得丟例外」 | 留，一行 | 空 `catch` 要有理由（第一節 3） |

結果是 16 行變 6 行，該檔已照這份判定清完。`packages/ui` 其餘檔案也已逐則套過第四節，留下的都落在第一節五種情況；`packages/leetcode` 的既有註解不另開清理任務，改到該檔時順手清。

## 六、強制力現況

lint 防線設在 root [eslint.config.mjs](../../eslint.config.mjs)，全 repo 生效的有四條：`linterOptions.reportUnusedDisableDirectives` 設 `error`，多餘的 `eslint-disable` 會擋；`@eslint-community/eslint-comments` 的 `require-description` 要求每個 `eslint-disable` 接 `-- 原因`，`no-unlimited-disable` 擋不指定規則的 disable，`disable-enable-pair` 放行檔案開頭的整檔 disable（`allowWholeFile`）；`@typescript-eslint/ban-ts-comment` 把 `@ts-expect-error` 的描述下限提到 10 個字元，`@ts-ignore` 維持禁用；`no-warning-comments` 擋 `TODO`、`FIXME`、`XXX`。只在 `packages/ui/src/**` 生效的是 `eslint-plugin-jsdoc` 的 `informative-docs`、`no-types`、`no-blank-blocks`；leetcode 既有的 `@param {number}` 先不納入，改到時順手清，清完再把 `files` 擴到全 repo。驗證方式與 ui-conventions 第四節相同：探針檔 `npx eslint <probe>` 退出碼 1 且七條規則各命中一次（2026-09-04 實測），`npx eslint --print-config packages/ui/src/components/Button/Button.tsx` 從 repo 根目錄跑，每條都解析為 `error`。

編輯當下的回饋走 Claude Code 的 `PostToolUse` hook：[.claude/hooks/lint-edited-file.mjs](../../.claude/hooks/lint-edited-file.mjs) 讀 stdin 的 `tool_input.file_path`，對 `.ts`、`.tsx`、`.js`、`.jsx`、`.mjs`、`.cjs` 跑 root 的 eslint，失敗時以 exit code 2 把 lint 輸出回饋給 agent。接線在 `.claude/settings.json`，matcher `Edit|Write`，command `node .claude/hooks/lint-edited-file.mjs`。這只對 Claude Code 有效，Codex 與 Antigravity 仍靠 lint-staged 在 commit 時擋。

自由文字註解是不是多餘，lint 判斷不了，由 `code-review` skill 的 Redundant Comment smell 把關：對 diff 裡每一則註解套第四節的四題。

量測方式（2026-09-04 實測）：

```sh
grep -rhE --include='*.ts' --include='*.tsx' '^\s*(//|/\*|\*)' packages/ui/src | wc -l
```

`packages/ui/src` 註解 11 行、程式碼 1387 行；`packages/leetcode/src` 註解 305 行、程式碼 2386 行。這個數字只是趨勢指標，不是門檻：一則必要的 workaround 註解比十則重述都有價值。
