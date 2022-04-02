---
title: '30 個值得你嘗試的 CSS 最佳實踐'
image: 'https://picsum.photos/id/118/900/1200'
excerpt: '原文中，提了 30 個 CSS 的 best practice，我節錄了我目前尚未應用的問題，也補充了少少的資訊，不管你是初學的人還是已經有一定經驗，都應該要讀過這篇文章，讓你的 css 寫得更精簡、漂亮！'
date: '2021-07-28T00:00:00.000Z'
author:
  name: Tod Sung
labels: [
  "Front End", "Web", "CSS"
]
---

# 30 CSS best practice

有能力看懂英文的人，建議左轉文章 <br>
https://code.tutsplus.com/tutorials/30-css-best-practices-for-beginners--net-6741

### 1. Organize the Stylesheet With a Top-Down Structure

建議可以根據 source code 去排序 CSS 的撰寫順序，<br>
補充:
有文章建議以 class 做為選擇器無論是效能還是 套用的 order 都會比較好辨識

```
.header {

}
.nav-menu {

}
.main-content{

}
```
### 2. utility base or components base CSS

Tailwind CSS 的模式是 utility base 的 CSS
改動可以更簡單

目前我使用的 bem 命名方式是 components base 的 CSS
缺點是會寫重複的 CSS 相應的打包時也會有更大的大小

### 3. Use the Right Doctype

![](https://i.imgur.com/dKqXBK7.png)
使用 html5 時添加這個，向瀏覽器宣告這份文件是 html5

### 4. Understand the Difference Between Block and Inline Elements

常見的 inline 跟 block 元素如下，基本規則是不要換成另外一個<br>

inline 元素
```
span, a, strong, em, img, br, input, abbr, acronym
```

block 元素
```
div, h1...h6, p, ul, li, table, blockquote, pre, form
```

### 5. Use Absolute Positioning Sparingly

謹慎使用絕對定位，太多的絕對定位會使得網頁布局太亂<br>
補充: 太多的 z-index，也會讓你在維護上難以調整

### 6. Avoid Extra Selectors

使用過多的 selector，除了 code 的複雜度更高，瀏覽器搜尋的效率也會更差