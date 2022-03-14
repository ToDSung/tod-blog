# css in js 全面解析 筆記

https://css-tricks.com/a-thorough-analysis-of-css-in-js/

## Common CSS-in-JS features

### Scoped CSS

CSS modules 首創
能夠給 class 獨特的名字，
好處是可以很好的避免 css 汙染，或是不用思考獨特的名字
命名不要把 css 的屬性加進去，這樣未來要改時，才不會發生奇怪的矛盾

### SSR (Server-Side Rendering)

現代的 css 套件，都提供 server side rendenring

### Automatic vendor prefixes

不同的瀏覽器針對非標準 css spec 會有各自的名稱
這些新的現代框架，可以讓你寫最基本的 css，打包完成後就自動補上支援各瀏覽器的 css

![](https://i.imgur.com/rz07trV.png)


### No inline styles

目前不建議使用 style 的方式加入 css
主要是會有效能的考量

### Full CSS support

所有的 css 框架，都提供包含
*  (偽元素) pseudo classes and elements;
*  (RWD) media queries;
*  (動畫) keyframe animations.

## Differentiating features

### Styles/Component co-location

選擇框架時，需要考量當 css 寫在與 html js 相同的檔案時，
有沒有能夠解析的能力

### Styles definition syntax

不是每個框架都能夠支援多種的撰寫方式，需要思考哪種思考方式更適合，通常可以考慮

* 編輯器的補充語法解析能力
* 編輯器的語法顯示，是不是能夠幫助成刺馬更易讀

#### template literal base

```javascript=
const heading = css`
  font-size: 2em;
  color: ${myTheme.color};
`;
```

#### object base

```javascript=
const heading = css({
  fontSize: "2em",
  color: myTheme.color,
});
```

### Styles output

#### `<style>`
輸出是包在同個檔案之中以 `<style>` 的方式
好處是可以減少讀取的速度，render 的速度會更快

#### css output

輸出以獨立檔案 css 包的方式
SSR 可以選擇這個，可以更方便的套用快取

### Atomic CSS

可以把重複的 css style 都包裝成單一的 class
缺點是在看網頁時的 dev tool 不好觀察
優點是大大降低 css 的大小

## conclusion

要思考選擇的 css in js 框架我們可以考慮以下幾點

### 我們是否使用 REACT 或是任何其他框架? 

當然有使用網頁框架的話，必須選擇能夠支援的 css in js 框架

### 我們是否是一個有高度互動， SPA APP? 

是的話就做好 lazy loading 的工作，不需要將 css 變成單一檔案

### 我們是否是一個 SSR 網站?

把程式變成 css 檔案，可以更好的套用快取功能

### 我們是否經常更新 style? 

常更新的話，提供快取功能的功能需求就較小了。

### 我們是否重複使用了很多樣式和組件？

使用 Atomic css 可以非常好的解決問題
筆者駐我認為像 Tailwind css 就是以這種方式進行處理的