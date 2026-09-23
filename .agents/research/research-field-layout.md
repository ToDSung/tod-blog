# 主流元件庫 Field 版面配置調查(label / input / helper / error)

調查目的:為 `packages/ui` 的 `Field` / `TextField` 挑選具體的間距、字級、對齊數值。範圍涵蓋 label、input、helper(description)、error 四個插槽的排版規則。

## TL;DR

- helper/error 文字幾乎都比 label 小(常見差 2px,如 Chakra、Mantine),或至少不比 label 大;唯有 Ant Design、shadcn 走「helper 與 label 同級、只用顏色區分」這條少數路線。使用者反映「helper 太大」,代表應往「helper 比 label 小」這個多數陣營靠,而不是維持同級。
- label→input 的間距普遍落在 4-8px,input→helper 的間距通常更緊(IBM Carbon 只有 2px),多數庫用「間距差異」來暗示 helper 是附屬於上面那個 input,而不是把所有間距都設成同一個值。
- helper 與 error 多半共用同一插槽、互斥顯示、不預留高度(內容不存在時不佔位),只有 Ant Design(extra + 驗證訊息分開插槽)與 shadcn(Description + Error 都是獨立元件)允許兩者並存,我們目前的 TextField 正是照 shadcn 這個並存模式做的。
- 有數據的元件庫大多讓 label、input 外框、helper/error 共用同一左邊線；唯一例外是 MUI outlined，刻意把 helper 縮排 12px，但沒有精準對齊 input 內 14px 的文字起點。
- 照 shadcn 上游時，label、input（桌機）、helper 三者都是 14px 同級，又用同一個 `gap-2`（8px）套在所有間距上，沒有常見的「字級分層 + 間距分層」，這是「看起來不整齊、helper 太大」的根源。採用的修正見「給我們的建議」。

## 比較表

| 元件庫(版本) | Label(字級/字重/行高) | Label→Input 間距 | Input(高度/水平 padding/字級) | Input→Helper 間距;error 是否取代 helper;是否預留高度 | Helper/Error(字級/行高/顏色;相對 label) | 水平對齊 |
| --- | --- | --- | --- | --- | --- | --- |
| MUI v6 TextField(outlined) | 靜止態 16px / 400 / line-height 1.5(body1);FormLabel 另覆寫 line-height 為 1.4375em。浮動態用 `transform: scale(0.75)` 視覺縮小,不是真的改字級。 | 無獨立 gap token——outlined 用浮動標籤,靜止時 label 疊在 input 文字位置上,聚焦/有值時浮到邊框上,屬於「重疊」架構,不是「上方留白」架構。 | 無固定 height token,由 padding 撐出;padding `16.5px 14px`;字級繼承 body1 16px。 | outlined/filled 用「contained」樣式:`margin-top: 8px`、`margin-inline: 12px`。helper 與 error 共用同一個 `helperText` 插槽,由開發者自行擇一傳入字串,互斥顯示,不預留高度。 | caption 變體 12px / 400 / line-height 1.66;helper 顏色 `text.secondary`、error 顏色 `error.main`。相對靜止態 label(16px)是 label-4px;相對浮動後 label(視覺上也是 12px)則相等。 | helper `margin-inline: 12px` vs input `padding-inline: 14px`,兩者「幾乎但沒對準」,官方已知落差(issue #17147),屬於刻意妥協非精確對齊。 |
| Chakra UI v3(Field) | `textStyle: 'sm'` = 14px,`fontWeight: 'medium'`。 | Field.Root 是單一 flex column,recipe root `gap: '1.5'` = 6px,label/input/helper 共用同一個 6px 間距(不分層)。 | md:`height: sizes.10` = 40px,`paddingInline: 3` = 12px,`textStyle: 'sm'` = 14px(與 label 同級)。 | 同上 6px(單一 gap 套用在整組垂直堆疊)。`Field.HelperText`/`Field.ErrorText` 依 `invalid` 狀態二擇一渲染,官方文件模式是互斥,未見預留高度機制。 | `textStyle: 'xs'` = 12px;helper 顏色 `fg.muted`、error 顏色 `fg.error`。相對 label(14px)為 label-2px。 | Field.Root 單純垂直堆疊,原始碼未見水平 padding 差異,推定共用同一左邊界。 |
| Mantine v7(TextInput) | `font-size: var(--input-label-size, var(--mantine-font-size-sm))` = 14px,固定用 sm,不隨 input 自己選的 size(xs/sm/md/lg/xl)變大;字重本次未在原始碼中確認,標記「未找到」。 | `Input.module.css` 本身未定義 label/input 之間的 margin 或 gap(檔案內註記無此定義,可能在別處或由外層 flex 處理),標記「未找到精確值」。 | md:`--input-height-md: 42px`,`--input-padding-y-md: 8px`,水平 padding 用 `calc(var(--input-height) / 3)` ≈ 14px,字級 `var(--input-fz, var(--mantine-font-size-md))` = 16px。 | 同樣未找到明確 margin token。`inputWrapperOrder` 可自訂 label/input/error/description 順序,一般用法是 description、error 二擇一顯示。 | `font-size: var(--input-description-size, calc(var(--mantine-font-size-sm) - 2px))` = 12px,error 同規則;description 顏色 `dimmed`、error 顏色 `error`。相對 label(14px)為 label-2px;相對 input 字級(16px)為 input-4px。 | CSS 檔未見水平 padding 差異,推定共用同一左邊界,未找到明確反證。 |
| Ant Design v5 Form.Item(`layout="vertical"`) | `token.fontSize` = 14px,與 input、helper 同級,沒有獨立縮小;字重一般(未加粗)。 | `verticalLabelPadding: "0 0 {paddingXS}px"` = label 下方 padding 8px,即 label→input 間距 8px。 | Input 元件 md:`controlHeight` 32px,`paddingInline` 11px,`paddingBlock` 4px,字級 14px。 | Form.Item 整體之間的間距是 `itemMarginBottom = marginLG` = 24px(這是「下一個欄位」之間的間距,不是 input→helper),input→explain 文字的精確 margin-top 本次未能在原始碼鎖定,標記「未找到精確值」。**Ant Design 的 helper 模式特殊**:`extra`(說明文字)一律顯示,與 `help`/驗證訊息是分開插槽,兩者可以同時出現,不是互斥替換。 | 同樣是 `token.fontSize` = 14px,與 label、input 同級,只用顏色區分(`colorTextDescription` / `colorError` / `colorWarning`)。本次唯一「完全不縮小」helper 字級的庫。 | `verticalLabelPadding` 左右為 0,推定 label 與 input 共用同一左邊界,explain 文字同樣無縮排證據。 |
| IBM Carbon Design System v11(TextInput) | `label-01` token:12px / line-height 16px / weight 400 / letter-spacing 0.32px(IBM Plex Sans)。 | scss 中確認 spacing 系統有 `spacing-02` = 4px 這個小間距候選,但未能在 TextInput 的 scss 中直接鎖定它套用在 label 的哪一行,標記「未找到精確引用」。 | md 40px(sm 32px / lg 48px);字級 `body-compact-01`(14px / line-height 18px);水平 padding 由 `layout.density('padding-inline')` mixin 產生,精確 px 本次未解出,標記「未找到」。 | scss 直接確認:helper 文字 `margin-block-start: convert.to-rem(2px)` = 2px,是本次調查中最緊的 input→helper 間距。helper 與 invalid/warn 訊息是同一插槽、互斥替換(標準 Carbon 用法)。 | `helper-text-01` token 與 `label-01` 規格完全相同(12px / 16px / 400 / 0.32px)。即 label = helper,兩者都比 input 文字(14px)小 2px。 | 單欄滿版堆疊,label/input/helper 共用同一左邊界,未見縮排證據。 |
| GitHub Primer(FormControl,Primer React) | 字重確認為 `var(--base-text-weight-normal)`(normal);字級本次未能在原始碼中鎖定,標記「未找到」。 | `FormControl.module.css` 有一條通用堆疊規則 `margin-top: var(--base-size-4)` = 4px,套用在有 label 時的子層元素之間,可視為 label→input ≈4px(來源是通用 stack 規則而非 label 專屬選擇器,信心中等)。 | 本次未取得 Primer TextInput 的 height/padding/font-size 原始碼,標記「未找到」。 | 同一條通用規則 `margin-top: var(--base-size-4)` = 4px,適用於 input 與 Caption 之間。Caption(hint)與 `FormControl-inlineValidation`(錯誤)是分開插槽,依元件結構描述兩者可分別出現,傾向與 Ant Design 接近(可並存),但本次未取得並存與否的明確文件佐證,標記「推測,非確認」。 | Caption 精確字級本次未鎖定;只確認 Primer Primitives 字級尺度中最小是 12px,合理推測 Caption 用該尺度,但非直接引用,標記「推測,信心中等」。 | 未找到明確證據,標記「未找到」。 |
| shadcn/ui Field(v4 registry,new-york 樣式,上游基準) | `FieldLabel`/`FieldTitle`:`text-sm leading-snug font-medium` = 14px;基礎 `Label` 元件本身是 `text-sm leading-none font-medium`(leading 略有不同)。 | new-york-v4 樣式的 `Field` 根層是 `flex flex-col gap-3`(12px);本 repo 使用的 `radix-nova` 樣式是 `gap-2`(8px),label、input、description、error 都是同一層 flex column 的直接子層,共用同一個間距——`FieldContent` 的 `gap-1.5`(6px)只用在「控制項與說明文字綁在同一個 FieldLabel 內」的特殊組合(例如 Checkbox + 說明文字),不是一般 TextField 的路徑。 | `Input`:`h-9`(36px)、`px-3`(12px)、`py-1`,字級 `text-base`(16px,< md 斷點)/ `md:text-sm`(14px,≥ md 斷點)。 | 同樣是 Field 根層的 `gap-3`(12px);但 `FieldDescription` 有特別的 margin 修飾:`last:mt-0`(它是最後一個子層時去掉多餘上邊距,只靠 gap-3 撐開)、`nth-last-2:-mt-1`(它是倒數第二個、後面接著 FieldError 時往上收 4px,讓 description 與 error 更靠近)。Description 與 Error 是各自獨立元件,**兩者可以同時渲染**,不是互斥替換。 | `FieldDescription`/`FieldError` 都是 `text-sm leading-normal font-normal`(14px),跟 label 同級字體大小,只用顏色區分(`muted-foreground` / `destructive`)。本次第二個「helper 不縮小、只變色」的庫。 | Field 是單純 flex column,label、input、description、error 之間沒有額外的水平 padding 差異;input 自己的內側文字 padding(`px-3`)不會讓 description/error 對齊到 input 的文字起點,helper 文字對齊的是 input 的外框左邊。 |
| Adobe React Spectrum / Spectrum 2 TextField | 未找到(官方原始碼連結多次 404、文件頁多次被截斷)。 | 未找到精確 px,但官方文件明確指出:「text-to-control」(label 與 input 之間的預設間距)**會隨字級縮放**,不是固定 px——這是與其他庫「用固定 token/px 定死間距」明顯不同的設計原則,本身就是值得記錄的發現。 | 未找到。 | 未找到。 | 未找到。 | 未找到。 |
| Atlassian Design System(Textfield) | 未找到。 | 未找到精確 token,只確認 Atlassian 的間距系統以 8px 為基礎單位(`space.100` = 8px,其餘 token 為其倍數),無法鎖定 Textfield/HelperMessage 實際套用了哪一個 token。 | 未找到。 | 未找到。 | 未找到;只確認 `font.body.UNSAFE_small` 已被標記為不建議使用的實驗性 token,建議改用 `font.body` 系列,但沒有取得對應的 px 對照表。 | 未找到。 |

## 共同模式

多數庫一致的地方:

1. **helper/error ≤ label,且通常明顯小於 input 文字**:Chakra(14→12)、Mantine(用 token 直接定義 `label - 2px`)、IBM Carbon(label = helper,兩者都是 input - 2px)都指向「helper 比 label 小一階、或至少不大於 label」是共識;MUI 的靜止態 label(16px)雖然比 helper(12px)大 4px,但那是因為靜止態 label 借用的是 input 本身的字級(body1),它「浮動後」的視覺尺寸其實跟 helper 一樣是 12px——也就是說 MUI 真正拿來跟 helper 比較的「標籤」尺寸,同樣落在 12px。
2. **label→input 的間距不比 input→helper 的間距更緊**:Ant Design(label→input 8px)、IBM Carbon(input→helper 只有 2px)都暗示 input→helper 應該比 label→input 更緊,讓使用者一眼看出 helper 是附屬於上面那個 input,而不是漂浮的獨立文字。
3. **helper 與 error 多半共用同一插槽、互斥顯示、不預留高度**:MUI(單一 `helperText` prop)、IBM Carbon(helper 與驗證訊息互斥)、Chakra(依 `invalid` 狀態二擇一渲染)都是這個模式,內容不存在時該行不佔位,版面隨錯誤出現/消失而輕微跳動是普遍現象,不是我們獨有的問題。
4. **helper 多半不縮排**:input 的 `padding-inline` 是 input 自己框內的事,label、input(外框)、helper/error 全都靠左對齊同一條線。例外是 MUI outlined,它刻意縮排但沒有精準對齊(`margin-inline: 12px` vs `padding-inline: 14px`,官方已知落差,issue #17147)。

分歧的地方:

1. **helper 是否要縮字級**:MUI、Chakra、Mantine、IBM Carbon 縮小;Ant Design、shadcn 不縮小,只變色——這是唯二用「同級只變色」策略的庫。
2. **label 是否跟著 input 的 size 變大**:Mantine 明確「不跟」(label 固定用 sm,不管 input 選什麼 size);其餘庫未見明確反例或未確認。
3. **間距是固定 token 還是隨字級縮放**:Spectrum 特別聲明用「隨字級縮放」的間距;其餘查到數值的庫都是固定 token/px。
4. **helper 與 error 是否可並存**:多數互斥;Ant Design(`extra` + 驗證訊息)與 shadcn(Description + Error 都是獨立元件)允許並存——我們目前的 TextField 正是照 shadcn 這個並存模式做的。

## 給我們的建議(Tailwind 具體值)

字級沿用 shadcn 上游：label 與 input（桌機）都是 14px。被調查的元件庫輸入文字最小 14px、helper 最小 12px，把整套字級再降一階會低於所有樣本，所以只調 helper 與間距。以下是 `packages/ui` 採用的值，`Field.browser.test.tsx` 以實際渲染量測驗證。

| 項目 | 採用值 | 理由 |
| --- | --- | --- |
| Label | `text-sm font-medium`（14px），`FieldLabel` 用上游的 `leading-snug` | 與 Chakra、Mantine、Ant Design 的 label 同為 14px |
| Label→Input 間距 | 8px（`Field` 的 `gap-1` 加 `FieldLabel` 的 `mb-1`） | Ant Design 為 8px，也是 shadcn `radix-nova` 樣式 `Field` 的 `gap-2` |
| Input→Helper、Helper→Error 間距 | 4px（`Field` 的 `gap-1`） | 比 label→input 緊，讓 helper 讀起來附屬於上方的 input；Primer 為 4px、Carbon 為 2px |
| Helper/Error 字級與行高 | `text-xs leading-4`（12px / 16px） | label − 2px 與 Chakra、Mantine 相同；12px / 16px 與 Carbon 的 `helper-text-01` 相同 |
| 水平對齊 | label、input 外框、helper 共用同一左邊線 | Chakra、Carbon、Ant Design、shadcn 都如此；MUI outlined 是刻意把 helper 縮排 12px 的例外 |
| 水平排列（Checkbox 加 label） | 8px（`gap-2`），label 不加 `mb-1` | 沿用上游間距 |
| Required 星號等標記 | 若未來要加,直接接在 label 文字後面(inline),不額外佔一行或改變垂直間距 | Carbon(用「(optional)」文字)、Ant Design(冒號用水平 margin token)、Mantine(星號只變色)三家做法一致:必填/選填標記都不改變垂直排版節奏。 |

## 未找到 / 待確認事項

- Mantine `InputWrapper` 的 label→input、input→helper 確切 margin/gap 數值(本次只確認字級關係 `label - 2px`,沒能在原始碼中確認間距 token,可能定義在未取得的 `InputWrapper.module.css`)。
- IBM Carbon TextInput 的 label→input 確切 margin-bottom 數值(只確認 `spacing-02` = 4px 是候選,未能在 scss 中直接鎖定套用的那一行)、以及 input 的水平 padding 精確 px(由 `layout.density()` mixin 產生,本次未解出實際值)。
- GitHub Primer FormControl 的 label 字級、TextInput 本身的 height/padding/font-size,以及 Caption 與 InlineValidation 是否可並存,本次都未能在原始碼中確認,只能標記為「推測、信心中等」或「未找到」。
- Adobe React Spectrum(Spectrum 2)與 Atlassian Design System 的絕大多數具體數值本次未取得(官方原始碼連結多次 404、文件頁多次被截斷),只確認了各自的一條設計原則或間距基礎單位(Spectrum 的「間距隨字級縮放」、Atlassian 的 8px 基礎單位),沒有能引用到 helper/label/input 精確 px 的來源。

## 來源

- MUI `FormHelperText` 原始碼:https://github.com/mui/material-ui/blob/master/packages/mui-material/src/FormHelperText/FormHelperText.js
- MUI `FormLabel` 原始碼:https://github.com/mui/material-ui/blob/master/packages/mui-material/src/FormLabel/FormLabel.js
- MUI `OutlinedInput` 原始碼:https://github.com/mui/material-ui/blob/master/packages/mui-material/src/OutlinedInput/OutlinedInput.js
- MUI `createTypography.js`(body1/caption 預設值):https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/createTypography.js
- MUI helper text 縮排落差已知 issue:https://github.com/mui/material-ui/issues/17147 、 https://github.com/mui/material-ui/issues/19359
- Chakra UI v3 Field 文件:https://chakra-ui.com/docs/components/field
- Chakra UI v3 field 樣式(recipe)原始碼:https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/src/theme/recipes/field.ts
- Chakra UI v3 input 樣式(recipe)原始碼:https://github.com/chakra-ui/chakra-ui/blob/main/packages/react/src/theme/recipes/input.ts
- Mantine `TextInput` 文件:https://mantine.dev/core/text-input/
- Mantine `Input.module.css` 原始碼:https://github.com/mantinedev/mantine/blob/master/packages/@mantine/core/src/components/Input/Input.module.css
- Ant Design `Form` 文件:https://ant.design/components/form/
- Ant Design `Input` 元件 Design Token 表:https://ant.design/components/input/
- Ant Design 全域 Seed Token 表:https://ant.design/docs/react/customize-theme
- IBM Carbon `Text input` 使用文件:https://carbondesignsystem.com/components/text-input/usage/
- IBM Carbon `_text-input.scss` 原始碼:https://github.com/carbon-design-system/carbon/blob/main/packages/styles/scss/components/text-input/_text-input.scss
- GitHub Primer `FormControl` 文件:https://www.primer.style/product/components/form-control/
- GitHub Primer `FormControl.module.css` 原始碼:https://github.com/primer/react/blob/main/packages/react/src/FormControl/FormControl.module.css
- Primer Primitives Typography:https://primer.style/primitives/typography/
- shadcn/ui `Field` 文件:https://ui.shadcn.com/docs/components/base/field
- shadcn/ui `field.tsx` 原始碼:https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/field.tsx
- shadcn/ui `input.tsx` 原始碼:https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/input.tsx
- shadcn/ui `label.tsx` 原始碼:https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/label.tsx
- React Spectrum Styling 文件(text-to-control 隨字級縮放):https://react-spectrum.adobe.com/react-spectrum/styling.html
- Atlassian Design System Spacing 基礎:https://atlassian.design/foundations/spacing
- Atlassian Design System Tokens 總覽:https://atlassian.design/foundations/tokens/design-tokens
