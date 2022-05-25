---
title: '[Note] CSS style 指南，搭配 stylelint 套件'
image: 'https://picsum.photos/id/119/900/1200'
excerpt: '記錄了數篇文章的內容，如何撰寫乾淨的 css 程式碼，另外補充了 stylelint 的安裝方式(for vue)'
date: '2021-07-25T00:00:00.000Z'
author:
  name: Tod Sung
labels: [
  "Front End", "Web", "CSS", "Dev Tool"
]
---

# [Note] CSS style 指南，搭配 stylelint 套件

## 出處

此文章用於與辦公室的同事分享，是我自行整理及簡單白話翻譯的筆記，為了尊重原作者亦或是需要更詳盡的內容，建議以連結內容為優先。

* [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)
  
* [Airbnb CSS / Sass 指南](https://github.com/ArvinH/css-style-guide)

* [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)

* [CSS - 運用 Stylelint 養成好習慣](https://dotblogs.com.tw/explooosion/2018/09/30/141005)

# Airbnb CSS / Sass 指南

*用更合理的方式寫 CSS 和 Sass*

翻譯自 [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)

<a name="terminology"></a>
## 術語

<a name="rule-declaration"></a>
### 規則宣告

我們把包含一組屬性的一個（或多個組合的）選擇器稱之為 “規則宣告”。舉個例子：

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

<a name="selectors"></a>
### 選擇器

在規則宣告中，“選擇器” 決定了 DOM 樹中的哪些元素將被定義的屬性所修飾。選擇器可以配對 HTML 元素，也可以配對一个元素的類別名稱、ID, 或者元素擁有的屬性。以下是選擇器的例子：

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

<a name="properties"></a>
### 屬性

最後，屬性決定了規則宣告裡面被選擇的元素將會得到何種樣式。屬性以 key-value pairs 形式存在，一個規則宣告可以包含一或多個屬性宣告。屬性宣告如下：

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

<a name="css"></a>
## CSS

<a name="formatting"></a>
### 格式

* 使用 soft tabs (兩個空格）作為縮排。(我自己是四格，覺得影響不大，但是 stylelint 要調整) 
* 類別名稱建議使用 dashes 代替 camelCasing。如果你使用 BEM，也可以使用底線或 PascalCasing（參考下面的 [OOCSS 和 BEM](#oocss-and-bem)）。
* 不要使用 ID 選擇器。<br>
(ID 選擇器會影響 CSS 套用的優先權，在 HTML 的準則中，每個 ID 應該獨一無二)
* 在一個規則宣告中，若同時使用多個選擇器時，讓每個選擇器各佔一行。
* 在規則宣告的左大括弧 `{` 前加上一個空格。
* 在屬性設定的冒號 `:` 後面加上一個空格，前面不要加空格。
* 讓規則宣告的結束右大括弧 `}` 獨自一行。
* 每個規則宣告之間用空白行隔開。

**Bad**

```css
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```

**Good**

```css
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```

<a name="comments"></a>
### 註解

* 建議使用單行註解 (在 Sass 中是 `//`) 代替區塊註解。
* 建議讓註解獨自一行，避免行末註解。
* 為沒有文件紀錄的程式碼寫上詳細註解，比如：
  - z-index 的使用情境
  - 兼容性處理或是針對特定瀏覽器的特殊寫法

<a name="oocss-and-bem"></a>
### OOCSS 和 BEM

由於以下原因，我們鼓勵使用 OOCSS 和 BEM 的某些組合：

  * 可使 CSS 與 HTML 之間的關係更清晰且嚴謹。
  * 可幫助我們創建出可重用、可重組的元件。
  * 可以減少巢狀宣告，並降低特定性。
  * 可以幫助我們創建出可擴展的樣式。

**OOCSS**，也就是 “Object Oriented CSS（物件導向的CSS）”，是一種寫 CSS 的方法，中心哲學就是鼓勵你把樣式表看成“物件”的集合：利用擁有可重用、可重組特性的程式碼，使你可以在整個網站中多次使用。

参考資料：

  * Nicole Sullivan 的 [OOCSS wiki](https://github.com/stubbornella/oocss/wiki)
  * Smashing Magazine 的 [Introduction to OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

**BEM**，也就是 “Block-Element-Modifier”，是一種用於 HTML 和 CSS 類別名稱的_命名约定_。BEM 最初由 Yandex 所提出，他們擁有大量的程式庫以及延展性。可以作為一套遵循 OOCSS 的實作參考規範。

  * CSS Trick 的 [BEM 101](https://css-tricks.com/bem-101/)
  * Harry Roberts 的 [introduction to BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

建議使用搭配 PascalCased "區塊"的變形 BEM，在與元件結合操作時特別適用 (e.g. React)。底線與破折號依然用在修飾符與子元件。

**範例**

```html
<article class="listing-card listing-card--featured">

  <h1 class="listing-card__title">Adorable 2BR in the sunny Mission</h1>

  <div class="listing-card__content">
    <p>Vestibulum id ligula porta felis euismod semper.</p>
  </div>

</article>
```

```css
.listing-card { }
.listing-card--featured { }
.listing-card__title { }
.listing-card__content { }
```

  * `.listing-card` 是一個區塊（block），代表高層次的元件。
  * `.listing-card__title` 是一個元素（element），它屬於 `.listing-card` 的一部份，因此區塊是由元素所組成。
  * `.listing-card--featured` 是一個修飾符（modifier），表示這個區塊與 `.listing-card` 有不同的狀態或變化。

<a name="id-selectors"></a>
### ID 選擇器

雖然在 CSS 中，你可以透過 ID 選擇元素，但這種作法應該列為 anti-pattern。ID 選擇器為你的規則宣告帶來了不必要的高[優先權級](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)，而且 ID 選擇器不可重用。

想要了解更多關於這個主題的內容，請參考 [CSS Wizardry 的文章](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)，內有關於如何處理優先權級的文章。

<a name="javascript-hooks"></a>
### JavaScript 掛鉤

避免在 CSS 和 Javascript 中綁定相同的類別。否則開發者在進行重構時容易出現問題，輕則浪費時間在相互對照尋找要修改的類別名稱，嚴重則因為害怕破壞功能而不敢進行更動。

我們推薦在創建用於 JavaScript 的類別名稱時，添加 `.js-` 前綴：

```html
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

<a name="border"></a>
### 邊框

在定義無邊框樣式時，使用 `0` 代替 `none`。

**Bad**

```css
.foo {
  border: none;
}
```

**Good**

```css
.foo {
  border: 0;
}
```

<a name="sass"></a>
## Sass

<a name="syntax"></a>
### 語法

* 使用 `.scss` 的語法，不使用 `.sass` 原本的語法。
* CSS 和 `@include` 宣告依照以下邏輯排序（詳見下文）

<a name="ordering-of-property-declarations"></a>
### 屬性宣告的排序

1. 屬性宣告

    列出除了 `@include` 與 巢狀選擇器之外的所有屬性宣告。

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      // ...
    }
    ```

2. `@include` 宣告

    接著再放入 `@include`，這樣可以提高整個選擇器的可讀性。

    ```scss
    .btn-green {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);
      // ...
    }
    ```

3. 巢狀選擇器

    _如果有必要_用到巢狀選擇器，把它們放到最後。此外，規則宣告與巢狀選擇器之間要加上空白行。而巢狀選擇器中的內容也要遵循上述指引。

    ```scss
    .btn {
      background: green;
      font-weight: bold;
      @include transition(background 0.5s ease);

      .icon {
        margin-right: 10px;
      }
    }
    ```

<a name="variables"></a>
### 變數

變數名稱建議使用破折號（例如 `$my-variable`）代替 camelCased 和 snake_cased 風格。可以在變數名稱之前添加底線前綴符，用以代表此變數只使用於當前文件。（例如 `$_my-variable`）。

<a name="mixins"></a>
### Mixins

Mixins 可幫助你的代碼遵循 DRY 原則（Don't Repeat Yourself）、增加清晰度或抽象畫複雜度。這與使用良好命名的函數有異曲同工之妙。Mixins 可以不接收參數，但要注意的是，如果你不壓縮 payload（e.g. gzip），可能會導致最終的樣式表包含不必要的重複程式碼。

<a name="extend-directive"></a>
### 擴展指令

應避免使用 `@extend` 指令，因為他並不直觀，且具有潛在風險，特別是用在巢狀選擇器時。即使是針對在最上層的佔位符選擇器使用擴展，如果選擇器的順序最終會改變，也可能會導致問題。（比如，擴展的選擇器存在於別份文件，而其加載順序發生變化）。使用 `@extend` 所獲得的大部分優化效果，透過 gzip 縮就已經幫你做到了，而你可以再透過 mixin 來讓你的樣式表更符合 DRY 原則。

<a name="nested-selectors"></a>
### 巢狀選擇器

**請不要讓巢狀選擇器超過三層！**

```scss
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```

當上述情況發生時，你也許是這樣寫 CSS 的：

* 與 HTML 強耦合的（也是脆弱）*—或者—*
* 過於針對與具體（強大）*—或者—*
* 沒有重複使用程式碼


再說一遍: **永遠不要巢狀 ID 選擇器！**

如果你真的必須使用 ID 選擇器（你真的不應該...），那他們也不該是巢狀的。如果你發現你正在這樣做，那你可能需要重新檢查你的 markup，或是說明這樣做的原因。如果你想要寫出良好風格的 HTML 和 CSS，你絕對**不**應該這麼做。

（越多層的選擇器，會影響越多的效能）
# Google CSS Style Guide

## Type Selectors

由於效能考量，不要在 CSS 選擇器中使用 element 名稱，[reference](https://www.stevesouders.com/blog/2009/06/18/simplifying-css-selectors/)

**Bad**

```css
div.error {

}
```

**Good**

```css
.error {

}
```
## Shorthand Properties
盡可能使用縮寫的屬性，可以增進效能，且更易讀

**Bad**

```css=
.example {
    border-top-style: none;
    font-family: palatino, georgia, serif;
    font-size: 100%;
    line-height: 1.6;
    padding-bottom: 2em;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0;
}
```

**Good**

```css=
.example {
    border-top: 0;
    font: 100%/1.6 palatino, georgia, serif;
    padding: 0 1em 2em;
}
```

## Declaration Order

照字幕順序排列 CSS 屬性，除了為了 browser 兼容所使用的屬性

**Good**

```css=
.example {
    background: fuchsia;
    border: 1px solid;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    color: black;
    text-align: center;
    text-indent: 2em;
}
```

或是根據以下規則排列(我個人覺得這種方式更好)
**Good**

1. 間距位置容器設定
2. 背景顏色字體設定
3. 邊框圓角陰影設定
4. 動畫變形設定



## CSS Quotation Marks

使用 '' 而非 "" 包住字串
不要在 url 中使用 ''

**Bad**

```css=
@import url("https://www.google.com/css/maia.css");

html {
  font-family: "open sans", arial, sans-serif;
}
```

**Good**

```css=
@import url(https://www.google.com/css/maia.css);

html {
  font-family: 'open sans', arial, sans-serif;
}
```

# stylelint

## 安裝套件
```
npm install -D stylelint 
npm install -D stylelint-config-standard 
npm install -D stylelint-config-sass-guidelines
npm install -D stylelint-order
```

個人非常建議套用，雖然剛 import 的時候會有點痛苦，但長久習慣以後會更好<br>
eslint 以及 vscode extension 也非常推薦

## 設定檔

**.stylelintrc.json**
```json=
{
    "extends": [
        "stylelint-config-standard",
        "stylelint-config-sass-guidelines"
    ],
    "plugins": [
        "stylelint-scss",
        "stylelint-order"
    ],
    "rules": {
        "indentation": [
            4,
            {
                "baseIndentLevel": 1
            }
        ],
        "order/properties-alphabetical-order": null,
        "order/properties-order": [
            "position",
            "top",
            "bottom",
            "right",
            "left",
            "display",
            "align-items",
            "justify-content",
            "float",
            "clear",
            "overflow",
            "overflow-x",
            "overflow-y",
            "margin",
            "margin-top",
            "margin-right",
            "margin-bogttom",
            "margin-left",
            "padding",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left",
            "width",
            "min-width",
            "max-width",
            "height",
            "min-height",
            "max-height",
            "font-size",
            "font-family",
            "font-weight",
            "text-align",
            "text-justify",
            "text-indent",
            "text-overflow",
            "text-decoration",
            "white-space",
            "color",
            "background",
            "background-position",
            "background-repeat",
            "background-size",
            "background-color",
            "background-clip",
            "border",
            "border-style",
            "border-width",
            "border-color",
            "border-top-style",
            "border-top-width",
            "border-top-color",
            "border-right-style",
            "border-right-width",
            "border-right-color",
            "border-bottom-style",
            "border-bottom-width",
            "border-bottom-color",
            "border-left-style",
            "border-left-width",
            "border-left-color",
            "border-radius",
            "opacity",
            "filter",
            "list-style",
            "outline",
            "visibility",
            "z-index",
            "box-shadow",
            "text-shadow",
            "resize",
            "transition"
        ]
    }
}
```