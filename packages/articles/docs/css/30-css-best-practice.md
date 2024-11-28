---
title: '30 個值得你嘗試的 CSS 最佳實踐節錄'
tags: ['Frontend', 'CSS']
---

# 30 個值得你嘗試的 CSS 最佳實踐節錄

有能力看懂英文的人，建議左轉文章 [30 CSS Best Practices for Beginners](https://code.tutsplus.com/tutorials/30-css-best-practices-for-beginners--net-6741)

### 1. Organize the Stylesheet With a Top-Down Structure

盡量根據 source code 去排序 CSS 的撰寫順序

_補充: 以 class 做為選擇器無論是效能還是套用的 order 都會比較好辨識_

```css
.header {
}

.nav-menu {
}

.main-content {
}
```

### 2. utility base or components base CSS

Tailwind CSS 的模式是 utility base 的 CSS 對程式碼的開發能更快速、簡單。

而我目前我使用的 bem 命名方式是 components base 的 CSS 缺點是會寫重複的 CSS 而且打包時也會有產生更大的 size。

### 3. Use the Right Doctype

```html
<!DOCTYPE html>
```

添加該行，向瀏覽器宣告這份文件是 html5。

### 4. Understand the Difference Between Block and Inline Elements

常見的 inline 跟 block 元素如下，建議不要換成利用 css 變更成另外一種元素，避免混淆。

inline 元素

```
span, a, strong, em, img, br, input, abbr, acronym
```

block 元素

```
div, h1...h6, p, ul, li, table, blockquote, pre, form
```

### 5. Use Absolute Positioning Sparingly

謹慎使用絕對定位，太多的絕對定位會使得網頁布局太亂

_補充: 太多的 z-index，也會讓你在維護上難以調整_

### 6. Avoid Extra Selectors

使用過多的 selector，除了 code 的複雜度更高，瀏覽器搜尋的效率也會更差
