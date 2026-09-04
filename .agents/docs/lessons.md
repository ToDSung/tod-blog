# Lessons (record of past mistakes)

Format and pruning rules are in [maintenance.md](maintenance.md) §3–§4. New entries are appended at the end of the file.

## 2026-07-11 .claude/skills are copies, not junctions
- Context: auditing the cross-agent skills-sharing mechanism.
- Mistake: both AGENTS.md and the memory file claimed `.claude/skills/` consists of NTFS junctions; measurement (`fsutil reparsepoint query` reported "not a reparse point") showed they are full directory copies instead; also, `vercel-react-best-practices` had only been deleted from the `.claude` side — `.agents/skills/` still had a leftover copy that git was still tracking.
- Fix: established `.agents/skills/` as the single source of truth + manual sync after edits + run `diff -rq .agents/skills .claude/skills` before starting work.
- Codified?: written into AGENTS.md's "Cross-agent skills" section.

## 2026-07-11 garbled git output under Chinese locale
- Context: running `git log` in a Git Bash pipeline.
- Mistake: Chinese commit messages and cmd output came out garbled (`���~ 4390`), which is easily misread as a command failure and triggers pointless retries.
- Fix: check the exit code first; use `git log --oneline` or `--format=%s` to inspect commits; avoid piping Chinese output through `cmd /c` again.
- Codified?: written into AGENTS.md's "Windows environment gotchas" section.

## 2026-07-11 pnpm/gh not on agent-shell PATH; pnpm lives in the fnm install dir
- Context: committing from an agent session; the husky commit-msg hook runs `pnpm dlx commitlint` and failed with exit 127 (`pnpm: command not found`).
- Mistake: agent shells don't inherit the user's fnm-activated PATH; pnpm is not globally installed. `gh` is not installed at all, so PRs cannot be created via CLI (and no HTTPS GitHub credential is stored — remote is SSH).
- Fix: prepend the fnm installation dir before committing:
  `export PATH="/c/Users/user/AppData/Roaming/fnm/node-versions/v24.11.1/installation:$PATH"` (contains pnpm/pnpm.CMD; the version segment changes when Node is upgraded — `ls /c/Users/user/AppData/Roaming/fnm/node-versions` to find the current one). For PRs, push the branch and give the user a prefilled `https://github.com/ToDSung/tod-blog/compare/main...<branch>?quick_pull=1&title=...&body=...` link instead.
- Codified?: written into AGENTS.md §Windows environment gotchas.

## 2026-09-02 flat config only loads the cwd config file, so package-level rules never run in CI
- Context: adding the arrow-function rule for `packages/ui` (spec D13) into `packages/ui/eslint.config.mjs`, the way AGENTS.md describes per-package configs.
- Mistake: the rule looked installed but never fired. A deliberately broken `Button.tsx` (function declaration) passed `npx eslint .` with exit 0. `npx eslint --print-config packages/ui/src/components/Button/Button.tsx` from the repo root reported `react/function-component-definition: None` — ESLint 9 flat config resolves exactly one config file, the one at the cwd, so `packages/*/eslint.config.mjs` is dead weight for `npx eslint .`, lint-staged and CI, which all run from the repo root.
- Fix: put any rule that must gate commits/CI in the root `eslint.config.mjs` under a `files: ['packages/<pkg>/**']` block, then prove it bites with a throwaway probe file (`npx eslint <probe>` must exit 1) before deleting the probe. Package-level configs still work when eslint is run from inside that package (`pnpm -F tod-blog eslint:fix`).
- Codified?: written into .agents/docs/ui-conventions.md §4.

## 2026-09-04 從套件目錄跑 eslint --fix 改寫了 19 個沒要動的檔案
- Context: 重構 `packages/ui` 的 `ThemeProvider`，在 `packages/ui` 目錄下跑 `npx eslint src --fix` 想順手修 import 順序。
- Mistake: 套件層設定把 `@tod-workspace/ui/*` 判成跟 root 設定不同的 import 群組，`--fix` 於是把整棵 `src/` 的 import 重排，`git status` 冒出 19 個我沒編輯過的檔案；回到根目錄再 lint 就變成 57 個 `import/order` 錯誤。這是 2026-09-02「flat config 只讀 cwd 設定」那條的第二次踩坑，這次會實際改壞檔案。
- Fix: `git checkout -- <那些檔案>` 還原，只留自己編輯的檔案，再從 repo 根目錄跑 `npx eslint . --fix`。lint 與 fix 一律從根目錄跑。
- Codified?: written into .agents/docs/ui-conventions.md §四.

## 2026-09-04 規範把單一呼叫點的抽象寫成範例，等於替過早抽象背書
- Context: 重構 `ThemeProvider` 時把 state 邏輯抽成 `useColorThemeState`、四個 localStorage 與 DOM 操作各自拆成 `utils/` 一函式一檔，再把這個佈局寫進 ui-conventions 第一節當規則與範例。
- Mistake: `useColorThemeState` 與四個 util 都只有一個呼叫點（`grep -rn useColorThemeState packages` 只命中 `ThemeProvider.tsx:17`）。規範只寫了「放哪裡」沒寫「幾個呼叫點才值得拆」，於是 `code-review` skill 的 Speculative Generality 與 Middle Man 兩個 smell 被「repo 規範優先」壓掉，review 抓不到。
- Fix: 規範改成先講門檻再講佈局：一個檔案用到的就留在那個檔案、不匯出；第二個檔案要用才搬出來；判斷用刪除測試。`code-review` 的兩個 smell 補上「單一呼叫點」的具體形式。程式碼另外修。
- Codified?: written into .agents/docs/ui-conventions.md §一 第 7 至 9 條、.agents/skills/code-review/SKILL.md 步驟 3.

## 2026-09-04 套件層設定裡的 react-hooks 規則從未生效，Phase 1 全程沒有 hook 防線
- Context: Phase 1.R 審查用 `npx eslint --print-config packages/ui/src/components/Button/Button.tsx` 從 repo 根目錄核對 D13 規則是否真的擋得住。
- Mistake: D13 那五類規則確實在 root 設定裡，但 `packages/ui/eslint.config.mjs` 透過 FlatCompat 掛的 `plugin:react/recommended` 與 `plugin:react-hooks/recommended` 在 print-config 輸出裡零命中 — 這是「flat config 只讀 cwd 設定」的第三次踩坑，前兩次分別是規則沒生效與 `--fix` 改壞 19 個檔案。這次的形態是：Phase 1 從頭到尾沒有任何 hook 誤用防線，而唯一會生效的跑法（從套件目錄跑 eslint）正好是 ui-conventions 明令禁止的那條。
- Fix: 把 react 與 react-hooks 的 recommended 併進 root `eslint.config.mjs` 的 `packages/ui/src/**` 區塊，套件層設定只留 parser 接線；用一支故意寫壞的探針檔（條件式 `useState` + 空依賴陣列）驗證 `npx eslint <probe>` 退出碼為 1、訊息含 `react-hooks/rules-of-hooks` 與 `react-hooks/exhaustive-deps`，確認會咬之後刪掉探針。開啟後唯一的既有違規是 `ThemeProvider` 在 effect 裡同步 setState，改用 `useSyncExternalStore` 讀 localStorage/DOM 屬性後 25 個測試全綠。
- Codified?: written into .agents/docs/ui-conventions.md §四。往後在套件層 eslint 設定加規則前，一律先用 `npx eslint --print-config <該套件的一個檔案>` 從 repo 根目錄確認解析得到。

## 2026-09-04 照著審查者的推理改，加了一段沒有東西能證明的快取
- Context: F1/F2 的審查回報一條 high finding —— `useSyncExternalStore` 的 snapshot 函式每次 render 都會重跑，所以別的分頁寫了 localStorage 之後，任何一次無關的 re-render 都會把這一頁的 `colorTheme` 掀成新值，但樣式不動。
- Mistake: 我直接照著改，加了模組層快取加「最後一個訂閱者卸載才清掉」的生命週期，共八行。寫回歸測試要證明它時才發現：拿掉快取，測試照樣過。再用相反的斷言驗一次，畫面顯示的是 `professional 1` 而不是 `ocean 1`，連 `localStorage.getItem` 的呼叫次數都沒增加 —— React 19 在無關的 re-render 上根本沒有重讀 snapshot。那個失敗情境不存在，我為它加的防禦是純粹的過早抽象。
- Fix: 把快取與那支證明不了東西的測試一起刪掉，註解改成只講程式碼真的保證的事（不訂閱 `storage` 事件的理由）。審查者的 finding 若是「推理出來的失敗情境」而非實跑證據，先寫一支會紅的測試證明它存在，證不出來就不要改 —— 兩種版本行為相同時，少的那個版本才是對的。
- Codified?: no（判斷原則，暫不升級成規則）。

## 2026-09-04 agent 註解重述官方 API 用法，而「只寫 why」的規則只存在 Claude 個人記憶
- Context: owner 反映 AI 註解過多。盤點 `packages/ui/src/theme/ThemeProvider/ThemeProvider.tsx` 的六段共 16 行註解，以及 `packages/leetcode/src` 的 305 行註解與 7 處沒理由的 `eslint-disable`。
- Mistake: 六段裡有三段在解釋 `useSyncExternalStore` 第三個參數、`getServerSnapshot` 與 next-themes 的正常用法，官方文件就有。規則只寫在 Claude 的記憶檔 `code-comment-minimalism`，Codex 與 Antigravity 讀不到，repo 內沒有任何文件能讓 `code-review` 的 Standards 軸引用，`ui-conventions.md` 也完全沒提註解。
- Fix: 規則寫進 `.agents/docs/code-comments.md`（刪除測試、可寫的五種與不能寫的八種、ThemeProvider 逐段判定），AGENTS.md 加路由；調查證據記在 `.agents/docs/research-code-comments.md`。lint 防線接進 root `eslint.config.mjs`（disable 要理由、`@ts-expect-error` 描述至少 10 字、擋 `TODO`、ui 套件擋重述型 JSDoc），用探針檔證明七條規則各命中一次後刪掉探針；`code-review` 加 Redundant Comment smell；`.claude/hooks/lint-edited-file.mjs` 在每次 Edit/Write 後對該檔跑 eslint。
- Codified?: written into .agents/docs/code-comments.md
