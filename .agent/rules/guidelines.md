---
globs: '**/*'
Always Apply: true
---

# 專案通用開發規範

## 1. 核心技術棧 (Core Tech Stack)

- **Framework**:
  - 使用 TypeScript 與 React。
  - **Form Validation**: 使用 **React Hook Form** 與 **Zod**。
    - 表單邏輯定義於 `useXXXForm.ts`。
    - 表單資料型別命名為 `XXXFormData`。
    - 驗證 Schema 必須使用 `satisfies z.ZodType<T>` 確保型別安全。
  - **Styling**: 使用 **Linaria**。
    - 樣式必須定義在 `*.styles.ts` 檔案中。

## 2. 程式風格與命名 (Code Style & Naming)

- **型別定義**：
  - 組件 Props 使用 `interface`；其餘情境使用 `type`。
  - 嚴禁將 **Type Assertion (as)** 作為解決型別問題的首選。
- **常數與列舉**：
  - `enum` 鍵名與 `const` 常數必須使用 `SCREAMING_SNAKE_CASE`。
  - 常數必須定義在 `constants.ts`。
- **組織結構**：
  - 遵循 **Barrel File Pattern** (使用 `index.ts` 進行匯出)。
  - 共用型別定義於 `types.ts`。
  - 無需任何程式碼註釋於 ai 撰寫的程式碼，除非有特殊要求。

## 3. 路由與組件組織 (Routing & Components)

- **路由**：
  - 路由依功能模組（如 Auth, ClientMgmt）組織。
- **組件**：
  - 複雜組件拆分至目錄下的 `components/`。
  - 組件專屬 Hook 置於 `hooks/`，專屬常數置於 `constants.ts`。
  - 全域共用組件置於根目錄下的 `components/`。

## 4. 目檔案構 (Directory Structure)

- **每個組件必須擁有獨立的目錄，並包含以下標準檔案**：
  - `[ComponentName].tsx`: 組件主體邏輯。
  - `index.ts`: 進入點 (Barrel file)，僅負責匯出組件以及型別。
  - `constants.ts`: (選填) 組件私有常數。
  - `types.ts`: (選填) 若 Props 需要共用可獨立拆分。
