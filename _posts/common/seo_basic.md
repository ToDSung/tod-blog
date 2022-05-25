---
title: '[SEO] 給前端工程師的 SEO 基礎知識惡補'
image: 'https://picsum.photos/id/1073/900/1200'
excerpt: '分享由於面試被問到 SEO 相關問題，於是高速給自己惡補的一段 SEO 相關知識。'
date: '2021-07-28T00:00:00.000Z'
author:
  name: Tod Sung
labels: [
  "Front End", "Web", "SEO"
]
---

# [SEO] 給前端工程師的 SEO 基礎知識惡補

### Origin

筆者最近開始尋找工作，才僅僅第一間面試的公司，就問了我 SEO 的相關問題，因為自己本身在現職的工作上，沒有相關的經驗，充其量就是只知道，使用 SPA 框架製作的網頁，沒辦法被爬蟲輕易爬到，以 Vue 作為例子的話，可以嘗試去使用 nuxt.js 作為 server side render 的工具來解決這問題，不過其實還是有很多基礎知識值得去探究，所以這篇文章，希望能夠做個基礎知識整理，至少純理論的知識不要完全無所見聞。

#### 名詞解釋

* On-Page SEO 頁面內容 SEO

    On-Page SEO 或是 On-Site SEO，指的是頁面內所有為了讓搜尋引擎或是使用者更容易發現你的網站的所有處理方式，以下會附上幾點重要的資訊。

* 關鍵字
    可以針對網站的功能性，或是文章的主題，在前一百字時就說明清楚功能性為何，Google 本身對於網站優先顯示的內容本身會給予較高的權重。
    頻率也相當重要，如果持續的使用相同的文字， 搜尋引擎更可以清楚文章的主題為何。

* Semantic HTML tag 語意化 html 
    
    從 HTML5 開始，我們不再只是僅能使用 div 或是 span 這種不具語意的 tag，反之當你使用帶有語意的 html，可以更容易的讓 Google 解析器了解你的網站、文章架構。

    For Example

    標題可以使用 h1 並且循序漸進的往下使用 h2 h3 作為副標題的 tag 
    用 nav 表示分頁選單，或是目前頁面是哪個分類，
    用 header footer 表示頁首頁尾

* 外部連結 
    如果你的網站或是文章，有相對應重要的外部連結資訊，也可以有效提升 SEO

* 具意義的網址 

    這點可以搭配 Breadcrumbs (原諒我不知道他的中文)來說明，使用 Breadcrumbs 能夠有效的讓使用者知道自己目前在網站中所處的位置以及分類，而網址的部分，如果也可以代入類似 Breadcrumbs 的架構的話，給予其關鍵字，也可以增加 SEO。

* 內容 
    切記內容必須有深度，有關鍵字容易搜尋，不要抄襲，


#### Meta Tag 標題與敘述

meta tag 是用來描述這份 html 的目的為何的 tag，他不會讓使用者直接接觸到，不過可以讓搜尋引擎更容易了解的網站或是文章的目的性為何。

```htmlembedded=
<meta charset="UTF-8">
<meta name="description" content="Free Web tutorials">
<meta name="author" content="John Doe">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

*  description
用來描述頁面的資訊

* canonical
網站可能有相同功能的頁面，使用這個 meta 屬性，讓搜尋引擎知道，這些也許只是 queryString 不同的頁面，就是同一個頁面。

* viewport
使搜尋引擎知道最佳的網頁讀取寬高為何

* hreflang
能夠告知搜尋引擎，這個頁面的語言為何

* og
讓你的網頁被分享到各種社群網站時，顯示不一樣的標題、描述、縮圖等等

#### Google Lighthouse 

可以針對以下五個要素去評分
* Performance 效能
    下載速度、顯示速度
* Accessibility 網頁無障礙
    網頁使用任何裝置都可以使用，甚至提供給身障人士有效的體驗
* Best Practices 最佳實踐
    合理的使用 api 或是 cache，有沒有使用不合理的用戶權限
* SEO
    給上述的所說的項目評分
* Progressive Web App (PWA)
        PWA 指的是讓網頁像 APP 一樣使用的技術


#### 網頁讀取速度

眾所周知，網頁讀取的速度越慢，使用者越容易直接斷掉網頁，所以想辦法加速網站的效能也是很重要的，不過如何增進網頁效能的學問，是非常博大精深的，所以今天就先暫且不討論。

## conclusion

作為工程師技術能力雖然重要，但另一方面，哪怕是程式寫的架構非常好，程式碼邏輯非常乾淨，但其實根本上最重要的是你的網站、你的產品，必須有使用者使用這才是最重要的事情。

因此增進 SEO，讓你的產品的觸擊率提升其實非常重要，希望這篇文章，能夠幫助到與我一樣也許工作了一兩年，但都沒有什麼相關經驗的人，能快速了解 SEO 在前端工程需要做的事情有哪一些。

## reference

[SEO 2022 入門指南 - 5 分鐘搞懂 SEO 怎麼做 + 進階操作課程](https://seo.whoops.com.tw/what-is-seo/)

[ON-PAGE SEO: The Definitive Guide](https://backlinko.com/on-page-seo)

[充分認識這 8 個 meta tag，讓你的網站 SEO 更勝一籌！](https://ysnweb.net/2020/01/seo-guide/html-meta-tag-seo/)

[Chrome 推出 Lighthouse 前端稽核功能 – 為了更好的 SEO 與使用者體驗](https://www.astralweb.com.tw/google-lighthouse-for-front-end-audits-to-imporve-better-seo-and-user-experience/)