---
title: '逐一說明我的 NextJs With Vercel blog 如何才能被 Google 爬蟲偵測到。'
image: 'https://picsum.photos/id/1041/900/1200'
excerpt: '撰寫技術文章是個相當務實的方法來提升技術能力，為了給自己最高的自由度，我選擇了利用 NextJs 及 Vecel 自架部落格，與實際工作不同，從功能的思考、介面的設計、技術的挑選、程式的實作，全部都要靠自己獨自完成，就讓我一一細數為了達到標題的目的，我做了什麼處理！'
date: '2022-04-29T00:00:00.000Z'
author:
  name: Tod Sung
labels: [
  "Front End", "Web", "NextJs", "Vercel"
]
---

# 逐一說明我的 NextJs With Vercel blog 如何才能被 Google 爬蟲偵測到。

![](https://i.imgur.com/iicPj2B.png)

撰寫技術文章是個相當務實的方法來提升技術能力，為了給自己最高的自由度，我選擇了利用 NextJs 及 Vecel 自架部落格，與實際工作不同，從功能的思考、介面的設計、技術的挑選、程式的實作，全部都要靠自己獨自完成，就讓我一一細數為了達到標題的目的，我做了什麼處理！

話說從頭，就在我好不容易將網站部屬到 Vercel 後，興高采烈的以為需求已經完成時，可怕的問題來了，實際作為陌生 user 嘗試搜尋，竟完全搜尋不到網站，這樣的狀況下，我的部落格不就全泡湯了嗎，所以我開始了以下的嘗試，來復活我那尚未出世的幼小部落格。


### [增進 SEO](https://tod-blog-wlunareve.vercel.app/posts/common/seo_basic)

第一直覺一定是 SEO，好吧來看看我能做哪些修改
(不要永遠只是相信你的第一直覺)

之前為了面試少少的做了一些筆記，有興趣可以點進去看，一言以蔽之，我在部落格的 header 中加上了 Meta Tag，Meta Tag 的目的是用來讓搜尋引擎能夠理解該頁面撰寫的內容，從而讓使用者搜尋的關鍵字能夠與其目標的網頁更相符，如果你能夠給你的網頁帶入合理的 Meta Tag ，對於增進 SEO 就能得到不小的幫助。

```jsx=
<title>Tod's personal blog from TW</title>
<meta charSet='UTF-8' />
<meta
  name='description'
  content='I am ToD 努力嘗試分享的小小前端，希望這邊有任何一篇文章能夠幫助到你！'
/>
<meta name='author' content='Tod Sung' />
<meta property='og:type' content='website' />
<meta property='og:title' content={title} />
<meta property='og:url' content='https://tod-blog.vercel.app/' />
<meta property='og:site_name' content={title} />
<meta property='og:locale' content='zh-tw' />
```

* description：用來描述頁面的資訊，值得注意的是它變成了顯示在搜尋結果頁面中的資訊了！
* canonical：網站可能有相同功能的頁面，使用這個 meta 屬性，讓搜尋引擎知道，這些根據帶入不同的參數從而略顯不同的相同頁面
* viewport：使搜尋引擎知道最佳的網頁讀取寬高為何
* hreflang：能夠告知搜尋引擎，這個頁面的語言為何
* og：讓你的網頁被分享到各種社群網站時，顯示不一樣的標題、描述、縮圖等等

另外一部分與 SEO 有關值得提及的便是網站內容，搜尋引擎的演算法一定時不時就有所改變，但有件事情絕對是亙久不變的，只有用心撰寫的內容才值得被欣賞，越是有價值的內容，才更有可能被搜尋到，所以永遠記得這件事情，寫出優良文章有助於提升 SEO。

### [Google Search Console](https://search.google.com/search-console/about)

就算添加上了 Meta Tag，我的網站還是沒有出現在搜尋結果之中，於是我開始大海撈針，最後發現了一個方法，使用「 Google Search Console」 工具。

進入到 console 以後，將網站網址填入表單中

![](https://i.imgur.com/gO0fzU3.png)
Google 會提供以下幾個方式驗證你是否為網站擁有者

* HTML 標記
* HTML 檔案
* Google Analytics (分析)
* Google 代碼管理工具
* 網域名稱供應商

我選擇了 HTML 標記，你也可以選擇你覺得比較簡單的辦法進行驗證。

如果驗證成功了，接著便可以利用畫面上方的搜尋列，確認你的網站有沒有被 Google 加入索引
![](https://i.imgur.com/mUuRDHS.png)

失敗的樣式如下
![](https://i.imgur.com/zwoPo2g.png)

終於！至少我知道自己目前的嘗試是失敗的了，而 Google 的[說明](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap?hl=zh-tw)中也提到了，可以使用 Sitemap 來讓搜尋引擎能夠快速的將網站加入到索引中。


### [sitemap](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap?hl=zh-tw)

「Sitemap」是一種用來提供網站資訊的檔案，您可以在其中列出網頁、影片和其他檔案的資訊，並呈現這些內容彼此間的關係。Google 等搜尋引擎都會讀取網站的 Sitemap 檔案，藉此以更有效率的方式檢索網站。Sitemap 不僅會將網站上有哪些重要網頁和檔案告訴 Google，還會針對這類檔案提供有價值的資訊，例如網頁上次更新的時間，以及是否有其他語言版本。(節錄自 Google sitemap 說明)

恰如其分的，有這麼一個開源的函式庫「next-sitemap」 能夠自動 build 出 sitemap.xml 檔案，如同官方說明，先安裝。

```
yarn add next-sitemap
```

在專案根目錄下建立 next-sitemap.js，值得注意的是這邊有個小地雷， changefreq 這個屬性在自動 parse 的情況下會 parse 在 xml 內容中比較靠前的位置，而這樣方式製作出來的 sitemap.xml 不能被讀取成功，後來發現只要調整順序就可以了，就在 config 中添加了 transform callback 即可。

```
/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://tod-blog.vercel.app/',
  generateRobotsTxt: true,

  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      changefreq: config.changefreq,
      priority: config.priority,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
```

完成 sitemap 以後，到 Google Search Console 中上傳網站的 sitemap 網址

![](https://i.imgur.com/4GUQQtZ.png)

如果成功可以看到以下內容(有可能需要等待一段時間)

![](https://i.imgur.com/2XrnpNW.png)

成功以後的隔天我重新使用上面提到的搜尋網址，看到以下的內容，而且也開啟無痕式搜尋我的網站，也確實看到了結果，所以到此為止，我的處理終於能夠告一段落了！

![](https://i.imgur.com/TYSoRD0.png)

### 結論

其實我由於有自行製作 loading 動畫的緣故，所以 SSR build 出來的 html 內容看起來不太理想，而且每一頁的 title description 也應該根據文章內容去製作，這是我目前還欠缺的方向，我會在試著去修改好這些項目，並且分享給各位，期待你有在文章中得到些許收穫，如果你有想分享給我的資訊可以參考右上方的我的個人連結，祝福大家都能從鑽研技術中找到成就感，我們下次見！


## reference

[next-sitemap](https://github.com/iamvishnusankar/next-sitemap)

[Google sitemap overview](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=zh-tw)

[Google sitemap build](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap?hl=zh-tw)