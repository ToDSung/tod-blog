---
title: ' 2020 Frontend Developer Roadmap'
image: 'https://picsum.photos/id/1010/900/1200'
excerpt: '分享 Web developer 2020 技術學習知識庫，閱讀後可以了解什麼技術該優先學習，希望能夠幫助到初學者，看完以後記得記得連到 github 給原作者點個 star！'
date: '2021-07-28T00:00:00.000Z'
author:
  name: Tod Sung
labels: [
  "Front End", "Web"
]
---

# 2020 Frontend Developer Roadmap <!-- 你猜得沒錯這是去年的東西 -->

此文章用於與辦公室的同事分享，
看英文沒有問題的朋友，可以直接左轉看原文，當然我也寫了很多我自己淺薄的知識與經驗，2021 甚至 2022 的部分，後續會努力補上

閱讀文章的各位，先進去給個 star !! https://github.com/kamranahmedse/developer-roadmap

## 完整的大圖，大家自己點進去

<!-- 對，這是去年的東西 -->
今天想分享的是 Web developer 2020 技術學習知識庫，今年的出來以後有看到再貼給大家
<!-- 對，這是去年的東西 -->

### basic

![](https://i.imgur.com/cDh3b0u.png)

* Semantic Versioning
  語意化版本：https://semver.org/lang/zh-TW/，
  套用這個可以比較好的建立每次版本的迭代
* Design Patterns
  蠻困難，有很多深度的事情，
  學這個主要目的是讓你的程式好維護一點。
  有很多設計模式去應用，ex:工廠模式、觀察者模式<br>
  白話來說，針對平常開發的工作，先要做的是不同功能的東西要分開成不同 function ，而且盡量易讀，且不要寫得過於難擴充
* Character Encoding
  編碼相關的知識


### Internet

![](https://i.imgur.com/ZuVM29f.png)
* Q: How does the internet work? <br>
  A: OSI TCP UDP 
* Q: What is HTTP? <br>
  A: 是一個協定、
  * 請求方法: GET、POST，常見到的是 Restful Api 串接，當然本身參數放的位置會不同，還有 CORS 的特性也有一些差別
  * Headers: Cache 、 Cookie 、 content-type 等等設定都夾帶在這邊，有時需要在送 ajax 前做一些設定，在開啟 dev tool Network 分頁檢查 request 有沒有符合預期。
  ![](https://i.imgur.com/ZL2Y4cm.png)
* Q: Browser and how they work? <br>
  A: <br>
  https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/<br>
  https://developers.google.com/web/fundamentals/performance/critical-rendering-path<br>
  告訴你運作機制，也會稍微跟你講怎樣寫程式，效率會更好，畫面會更平滑之類的
* Q: DNS and how it works? <br>
  A: Domain Name System，網址如何對應到 host 的機制
* Q: What is Domain Name?<br>
  A: 域名，舉例來說 https://hackmd.io/aiPD7iqeSTK1JQ_ccLoYBQ => hackmd.io 是他的 domain name
* Q: What is hosting (不確定)
  A: 好像是如何上架網頁，前端工程師可以用 github 作為簡單的網頁


### HTML

![](https://i.imgur.com/ICW6U6A.png)

* Semantic HTML 語意化 HTML
  用一些 HTML5 的新 tag，好處是可以增加 SEO
  例如 
  ```html
  <nav></nav> 
  <article></article>
  ```
* Convection and Best Practices，下面是舉例
  1. Use Meaningful Title Tags
  2. Use Descriptive Meta Tags => 搜尋引擎會看，可以幫助搜尋
    ![](https://i.imgur.com/DLIi1Jk.png)
  3. Use Alt Attributes with Images => 平常撰寫時稍微注意一下就好，補充一下圖片資訊

### CSS
* Accessibility <br>
    mozilla 提到，盡量讓 html tag 在添加完以後也貼近本來的目的，不要寫一個 btn 不是用作 btn
* SEO Basic <br>
    提高 SEO 就是讓你的網站更容易被搜尋引擎搜到
* Making Layout <br>
    切版，基本工作，flex 跟 grid 在該使用的時候用他們可以讓你的排版相對輕鬆
* Responsive design and Media Queries <br>
    RWD，讓你的網頁在平板跟手機也好棒棒，有時候也會面對到 iOS 跟 Android 各自瀏覽器的問題

### JAVASCRIPT

![](https://i.imgur.com/YHYdzwu.png)

* Syntax and Basic Constructs <br>
  不贅述，在正確的時候用正確的語法去寫，記得隨時努力保持程式碼整潔
* Learn Dom Manipulations <br>
  使用 vanillaJS 或是 jQuery 可以操作 dom，在使用三大框架的時候，一些基本的語法還是可以稍微了解
* Learn Fetch API / Ajax(XHR) <br>
  非同步取得資料，我們使用 axios，也可以使用 fetch API，比較常見的問題是當同時呼叫多個 request 記得用 Promise.all 而非 forEach
* ES6+ and modular JavaScript <br>
  語法學一下，行數可以降低，程式碼可以更簡潔 <br>
  async await <br>
  樣板字面值 Template literals \`${}` <br>
  解構賦值 Destructuring assignment obj.a const { a } = obj <br>
  可選串連 Optional chaining ?. <br>
  展開運算子 Spread syntax ... <br>
  
  
  
### Version Control Systems 
 ![](https://i.imgur.com/4fKZAS4.png)
 
 版控，
 稍微深入一點的東西像是 rebase, git flow ，多學一點，實務上嘗試應用起來<br>
 語意話版本 => 非常推薦這篇文章
 https://wadehuang1993.github.io/blog/git_commit_message_best_practice/
 
### Web Security Knowledge
![](https://i.imgur.com/bpHQMf9.png)

* HTTPS
  有這個協定，封包可以避免竊聽
* CORS
  跨來源資源共享，當你要跨站取資源時，瀏覽器會自動 block 一些東西(為了安全性)，這時候要做相應的處理才能拿到資源
* Content Security Policy
  瀏覽器的實作標準，弱掃時需要處理一些前端安全性問題例如: XSS
* OWASP Security Risks
  每年會公布十大危險的資安問題，我們常聽到的是 XSS
  
### Package Managers
![](https://i.imgur.com/aTtJaJg.png)
讓你可以裝套件的，每個專案各自裝，才不會有套件衝突問題，偶爾會遇到版本問題，當遇到問題時，記得跟夥伴互相檢查彼此的不管是 node 或是 npm 版本

### CSS Architecture and CSS preprocessor (CSS預處理器)

![](https://i.imgur.com/z4uOxLy.png)

* BEM
一種 CSS 命名方式，主要就是讓你好維護，而且不容易出現 CSS 汙染用的，實務上的應用經驗，這種多層的 CSS 命名，要聰明的分層有時候不太容易，而且還是會有蠻多重複的 CSS 程式碼，現在有提倡另外一種 utility base 的寫法(詳情可見 TailWind)
* CSS預處理器
讓你可以寫 CSS 像在寫 CODE 一樣，我現在是用 SCSS，把變數拉出來，然後嵌套減少重複相似的命名，也有 mixin 什麼的，要使用的話 webpack.config 跟 \<style> 那邊改一下就行了。

### Build Tools

![](https://i.imgur.com/jRaB5mW.png)

#### Task Runners

* npm scripts <br>
package.json 裡面寫 npm run XXXX 的指令，可以 run dev server，也能 run test

#### Module Bundlers

* Webpack: 打包工具，調整 webpack.config 搭配 entry point (我們是設定在 script.js) 一直往下 import，最後才能合在一起輸出，通常也會搭配到 babel, 各式各樣 loader，或者優化打包，讓你的單一檔案不至於太大，而影響效能。
* vite: 另一個打包工具，vue 的相關產業鏈，新專案很推薦這個，開發的反應很快，但打包的時候還是傳統的模式。
  
#### Linters and Foramtters

* Prettier
  一鍵幫你把 code 排好的套件(我自己沒有使用)，在按下這個快捷鍵時，最重要的是要先配合團隊。
* ESLint
  必裝，亂寫就噴你，遵守他做 best practice 吧，npm 裝完以後，vscode 也裝就可以從 vscode 即時看到錯誤。<br>
  因為我們是開發 vue，也可以裝 vue 的擴充包
* Stylelint
  必裝，給 class property 合理的順序，可以讓程式碼有一致性

### Framework
![](https://i.imgur.com/M5lOhkC.png)

* React.js <br>
  主打不用寫 CSS html，全部都是撰寫 JavaScript 程式碼 
* Angular (我完全沒碰過 <br>
  網路上看聽影片的感想(可以看保哥)，像是主打 Typescript，強制你要寫型別，對團隊來說可能爛 code 機率降低，但也增進了開發的複雜度，這個各有利弊。
* Vue.js <br>
  主打簡單好學，漸進式引入Router Vuex Nuxt.js<br>
  Vue3 <br>
  1. 底層做了改動，避免以前 array 跟 object 寫不好時會沒有辦法監聽到變動的問題
  2. 同時新增 composition api ，最主要解決 object base 的舊寫法，同樣功能可能會相隔很遠地方的問題

### Modern CSS

![](https://i.imgur.com/x8qoVwO.png)

CSS in JS 可以參考 Summer。桑莫。夏天 的這篇文章<br>
https://cythilya.github.io/2020/02/25/start-your-app-the-better-way-with-styled-system/
![](https://i.imgur.com/zTA3DM2.png)

* Styled Component<br>
  直接幫你把 style 放進 component 中，不過這是 react 的範例就是了
![](https://i.imgur.com/viC77PP.png)

* CSS Module
  可以用 style.className 的方式專門引入一個 class，然後會幫你 hash 讓你不會被干擾<br>
  (使用 Vue 的 css scope 做的事情看起來就是這樣子了
![](https://i.imgur.com/qoTFbHC.png)

### Web Components

![](https://i.imgur.com/TlSZjnW.png)

* HTML Templates
 https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/template <br>
 範例說，可以先建立好 html，但不會 render 等到用 JS 觸發再把畫面畫出來 <br>
 平常使用的 slot 的觀念跟這個也有相關
* Custom Elements
 自製 html tag 的概念 => vue 幫我們做爆的事情
* Shadow DOM
 跟 Custom Elements 很像的東西，他是指這個 input range 下面由很多東西組成
 那些東西叫做 Shadow DOM
 ![](https://i.imgur.com/jND2ueX.png)
 ![](https://i.imgur.com/9yWVi90.png)


### CSS Frameworks

![](https://i.imgur.com/XzV0jMG.png)

讓你不用一直重複刻 component 的工具們 <br>
比較常聽到的是 <br>
Material UI (經典) => 這個是類似 vuetify 的東西 <br>
Tailwind CSS (今年最熱門) => 這給妳很多預先寫好的 class 讓你去套用

### Test
![](https://i.imgur.com/ErFSIbD.png)

我曾用過的工具有這兩個
* Jest (經典
  做單元測試的工具
* nightwatch
  這個會開瀏覽器跑，用來做 E2E 測試
  
個人經驗是，在與前端框架配合上，要盡量找相容性高的，開發起來才輕鬆一點
例如開發 vue 想辦法去找哪一種單元測試框架最適合 vue

### Type Checkers
![](https://i.imgur.com/o0E0S8M.png)

* TypeScript
  就讓你的程式碼加上型別，記得不要一直 :any ，這樣子有用跟沒用一樣<br>
  有一派認為會加大開發成本，不過很多套件現在都全面改成 TypeScript 了(例如 vuetify)，所以也許在不遠的將來我們每個人都得應用

### PWA
![](https://i.imgur.com/XmLH25L.png)

一句話講，長得像 app 的 web，可以被下載到手機上做 APP

* 漸進式：用戶無需擔心使用哪個瀏覽器，也可以正常使用PWA。因為這些PWA以漸進增強作為核心信條。
* 響應式：PWA適應包括電腦、手機、平板等其他常用設備在內的多種瀏覽環境。
* 連接獨立性：利用服務工作執行緒，PWA可以離線或網絡情況較差的環境下工作。
* 接近原生應用：為用戶提供更接近原生應用的交互體驗與導航。
* 保持新版：歸功於服務工作執行緒的更新機制，PWA可以保證用戶永遠使用最新版本。
* 安全：通過HTTPS，PWA可以阻止通訊竊聽，而且能保證內容不被篡改。
* 可被發現：歸功於W3C提供的清單文件[6]，以及服務工作執行緒的註冊範圍機制，PWA可被標識為「應用」，且搜尋引擎可以正常地索引PWA。
* 可被組裝：類似推送通知這樣的功能在PWA上都可以輕鬆地被組裝。
* 可被安裝：允許用戶直接「保留」PWA到他們的系統桌面，無需到應用商店完成麻煩的步驟。
* 可被連結：只需輕鬆地分享URL便可連結至PWA中，無需複雜的安裝步驟。

### Server Side Rendering(SSR)

![](https://i.imgur.com/x377W9q.png)

Server Side Rendering 伺服器端渲染 <br>
目的就是要讓你的網站更容易被 google 到，增加 SEO， <br>
因為 client side render ，比較弱的爬蟲爬不出東西，就不容易讓你的網站被搜尋到。 <br>

<span style="color: gray">這部分我還需要多調查<br>
以 Nuxt.js 為例，建立一個中介 server 先拿完 api 資料組合完放進 template 中， <br>
而後顯示，其實我覺得跟 Django template 很像，只是多了一層</span>

### GraphQL

![](https://i.imgur.com/e3kvhRQ.png)

後端建立好 server 後，不像傳統的 Restful，前端工程師可以用嵌套的方式拿到資料 
* Apollo 是用來建立 GraphQL 的框架，很常見 <br>
我覺得資料量越大網站越大時，才嘗試引入。
```javascript=
{
    title
    author {
       name
       account
    }
}
```

### Static Site Generators

![](https://i.imgur.com/DlbeVPA.png)

稍微查一下，網站中寫 markdown，可以直接幫你轉成程式碼的那種框架 <br>
用框架不用像我現在的部落格有點土法煉鋼的成分

### Mobile Applications

![](https://i.imgur.com/IcOsAsF.png)

用網頁語法寫 app <!-- 對，我們來搶工作的 --> Flutter 是這一年最常聽到的吧。

### Desktop Applications

![](https://i.imgur.com/9RSHyYV.png)

* Electron 這個滿常見，例如 slack vscode，都是用這個開發的
<!-- 沒有錯啦，前端又有工作可以做囉 -->

![](https://i.imgur.com/WfkU3uG.png)

### Web Assembly

目標是效能更好的網頁語言，有機會讓大家換個語言開發的東東。
