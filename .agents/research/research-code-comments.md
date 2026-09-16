# 減少 agent 產出多餘註解：調查與實施方案

研究日期 2026-09-04。問題：agent 寫程式碼時預設替每段加解釋，owner 要的是只有 workaround 與看程式碼看不出來的特殊處理才留註解，官方 API 的正常用法一律不寫，寫了也要一行讀完。規則本體在 [code-comments.md](code-comments.md)，本檔記調查證據與還沒接上的機械防線。

## 一、結論

規則要分三層放，缺一層就漏：

1. 給 agent 讀的規則（`code-comments.md` 加 AGENTS.md 路由）。Anthropic 的 Claude Code 官方最佳實務把 CLAUDE.md 定位為 advisory：「Code style rules that differ from defaults」該寫進去，但它不保證執行。
2. 機械防線（root `eslint.config.mjs`）。能擋的只有三類：沒理由的 `eslint-disable` 與 `@ts-expect-error`、重述型別與名字的 JSDoc、`TODO` 類待辦。ESLint 沒有任何規則能判斷一則自由文字註解是不是多餘，也沒有官方規則能抓註解掉的程式碼。
3. 審查防線（`code-review` skill 的 Standards 軸）。自由文字註解的取捨只能靠人或模型判斷，所以規則文件要寫成審查者能逐條套的自查題。

Google 的 code review 指南把界線講得最短：註解通常只在解釋為什麼這段程式碼存在時有用，不該解釋它在做什麼；程式碼不夠清楚就該把程式碼改簡單，例外是正規表示式與複雜演算法。這與 owner 的要求一致，規則文件直接沿用這條當總則。

## 二、調查範圍與篩選

只看 GitHub 星數高、或由官方組織維護的工具與指引。星數是 2026-09-04 透過 `api.github.com/repos/<owner>/<repo>` 實測。

| 來源 | 星數 | 類型 | 能做什麼 |
| --- | --- | --- | --- |
| `eslint/eslint` | 27,495 | 工具 | 核心規則 `no-warning-comments`；`linterOptions.reportUnusedDisableDirectives` 預設 `warn` 可改 `error`；`noInlineConfig` 可整個禁掉行內指令 |
| `typescript-eslint/typescript-eslint` | 16,380 | 工具 | `ban-ts-comment` 已在 recommended：`@ts-ignore` 禁用，`@ts-expect-error` 要有描述，`minimumDescriptionLength` 預設 3 |
| `gajus/eslint-plugin-jsdoc` | 1,229 | 工具 | `no-types` 擋 `@param {number}`；`informative-docs` 擋只重述名稱的 JSDoc；`no-blank-blocks` 擋空 JSDoc；`require-jsdoc` 是反方向的規則，不開 |
| `eslint-community/eslint-plugin-eslint-comments` | 98 | 工具（ESLint 官方社群組織） | `require-description` 要求 `eslint-disable` 後面接 `-- 原因`；`no-unlimited-disable` 擋不指定規則的整檔 disable |
| `biomejs/biome` | 25,711 | 工具 | 抑制註解語法本身就帶理由欄（`biome-ignore lint/<rule>: reason`），未用到的抑制會報 `suppression/unused`；沒找到判斷註解內容的規則。本 repo 用 ESLint，不引入 |
| `google/styleguide` | 39,568 | 指引 | TypeScript 指南：JSDoc 給使用者讀、行註解給實作者讀；JSDoc 不重複型別系統已有的資訊 |
| Google eng-practices | 同上 | 指引 | 審查者指南「Comments」段：解釋為什麼，不解釋是什麼 |
| `anthropics/claude-code` 官方文件 | 144,041 | 指引 | CLAUDE.md 只放與預設不同的風格規則、要短；「必須每次都發生」的事用 hook，hook 是 deterministic、CLAUDE.md 是 advisory |
| `airbnb/javascript` | 148,146 | 指引 | 只規定註解格式（`/** */` 與 `//` 的擺放），沒有取捨規則，不採用 |

沒採用的小套件：`eslint-plugin-no-comments`、`eslint-plugin-no-commented-code`、`eslint-plugin-llm-core`。共同問題是星數低、單人維護，且判斷「註解掉的程式碼」全靠字樣猜測，誤判率沒有數據。這條由審查把關。

## 三、現況盤點（2026-09-04 實測）

| 範圍 | 程式碼行數 | 註解行數 | 觀察 |
| --- | --- | --- | --- |
| `packages/ui/src` | 1,387 | 22 | 全部是「為什麼」型，但其中約三分之一在解釋 `useSyncExternalStore`、next-themes 的官方用法；逐段判定見 `code-comments.md` 第五節 |
| `packages/tod-blog/app` 與 `components` | 733 | 0 | 無 |
| `packages/leetcode/src` | 2,386 | 305 | 34 個檔案有 `@param {number}` 這類重複型別的 JSDoc；以字樣估計約 49 行是註解掉的程式碼；7 處 `eslint-disable` 全部沒有理由 |

`eslint-disable` 清單（不含 `storybook-static/` 建置產物）：`packages/leetcode/jest.config.ts:1` 是不指定規則的整檔 disable，其餘 6 處是 `no-explicit-any` 與 `no-useless-escape` 的單行 disable；`packages/tod-blog/index.d.ts:1` 整檔 disable `no-explicit-any`。

## 四、agent 為什麼會這樣寫

1. 規則只存在 Claude 的個人記憶（`code-comment-minimalism`），Codex 與 Antigravity 讀不到，repo 裡沒有任何文件可以讓 `code-review` 引用。
2. `ui-conventions.md` 管檔案佈局、匯出、props 排序，完全沒提註解，agent 於是照預設習慣補。
3. 現有 lint 對註解零約束：`ban-ts-comment` 在 recommended 裡但 leetcode 沒有 `@ts-` 指令可抓；`reportUnusedDisableDirectives` 停在預設 `warn`，而 `npx eslint .` 不會因 warning 非零退出。

## 五、已接上的機械防線

設定內容與驗證結果見 [code-comments.md](code-comments.md) 第六節。接線時處理掉的既有違規：leetcode 的 5 處單行 `eslint-disable` 補上 `-- 原因`；`get.ts` 的 `no-useless-escape` 改成修正規表示式，不再 disable；`jest.config.ts` 與 `tod-blog/index.d.ts` 的整檔 disable 改成指定規則並附理由。相依套件版本：`@eslint-community/eslint-plugin-eslint-comments` 4.7.2、`eslint-plugin-jsdoc` 64.3.5（`pnpm add -Dw`，2026-09-04）。

沒做的：自訂 ESLint 規則用 `getAllComments()` 掃「重述型」字樣。這是 heuristic，等 review 漏網次數變多再評估。

## 六、來源

- ESLint 規則索引與 `linterOptions`：https://eslint.org/docs/latest/rules/ 、https://eslint.org/docs/latest/use/configure/rules
- `no-warning-comments`：https://eslint.org/docs/latest/rules/no-warning-comments
- 自訂規則存取註解的 API（`getAllComments`）：https://eslint.org/docs/latest/extend/custom-rules
- typescript-eslint `ban-ts-comment`：https://typescript-eslint.io/rules/ban-ts-comment/
- eslint-comments `require-description`：https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/require-description.html
- eslint-plugin-jsdoc 規則表與 `informative-docs`：https://github.com/gajus/eslint-plugin-jsdoc 、https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/informative-docs.md
- Biome suppressions：https://biomejs.dev/analyzer/suppressions/
- Google TypeScript Style Guide：https://google.github.io/styleguide/tsguide.html
- Google 審查者指南 Comments 段：https://google.github.io/eng-practices/review/reviewer/looking-for.html
- Claude Code 最佳實務與 hooks：https://code.claude.com/docs/en/best-practices 、https://code.claude.com/docs/en/hooks
