---
title: '<作伙讀 code> 簡單閱讀 dayjs'
image: 'https://picsum.photos/id/225/900/1200'
excerpt: '分享閱讀 dayjs 原始碼的小心得，希望可以從中學習一些比較優質的模組程式撰寫方法。'
date: '2021-08-12T00:00:00.000Z'
author:
  name: Tod Sung
labels: [
  "OpenSource", "JavaScript", "dayjs"
]
---

# <作伙讀 code> 簡單閱讀 dayjs
### 筆者小牢騷

這是我第一次的閱讀公開原始碼文章，如果有寫得不好的地方都歡迎來信告知！

### 起源
JavaScript 的 Date API 應是眾所皆知的難用，筆者平常在上班時候，因為覺得簡單的程式碼，不太需要安裝套件，所以就沒有安裝任何時間套件，最近因為同事們專案中都自己偷偷使用時間函式庫，所以也受不了，一用之下才發現驚為天人，寫起來也太輕鬆了吧！

不過回過頭來反思，雖然自己用的愉快，但重要的是了解這些 library 做了哪些事情，才不會陷入只會使用工具的境地，因此這篇文章主要是想看看 dayjs 做了哪些事情，以及學習現代 open source library 開發該注意的事情。

### 為什麼選擇 dayjs

1. dayjs 有個 slogan 說他們是最小的函式庫
2. dayjs 的 github stars 數量算蠻多的
3. moment.js 已經停止維護了

### 進入正題

既然選擇了 dayjs ， 發揮一點 geek 精神，來看一下，程式碼到底做了些什麼吧！

```javascript=
/dayjs/src/index.js
```
這支檔案是整個 dayjs 專案的進入點，整支檔案的目的是用來 init dayjs

### dayjs function

當我們執行 dayjs() 時，會建立一個擁有很多操作時間方法的大物件，我們先討論 5~9 行的內容，而實際使用 dayjs() 時，
* 第一個 arg： <b>date</b> 是被 parse 的時間格式變數
* 第二個 arg： <b>c</b> 則做為一個 準備承接物件 config 參數的變數使用
* <b>arguments</b> 表示這個 function 的所有輸入參數

```javascript=
const dayjs = function (date, c) {
  if (isDayjs(date)) {
    return date.clone()
  }
  // eslint-disable-next-line no-nested-ternary
  const cfg = typeof c === 'object' ? c : {}
  cfg.date = date
  cfg.args = arguments// eslint-disable-line prefer-rest-params
  return new Dayjs(cfg) // eslint-disable-line no-use-before-define
}
```

### parse function
第九行利用 class 建立的物件，將 cfg 帶入 parse 函式，之後執行 <b>parseDate</b> 函式 

```javascript=
class Dayjs {
  constructor(cfg) {
    this.$L = parseLocale(cfg.locale, null, true)
    this.parse(cfg) // for plugin
  }
  
  parse(cfg) {
    this.$d = parseDate(cfg)
    this.$x = cfg.x || {}
    this.init()
  }
}
```

重頭戲來了！在經歷了說短不短的 init 過程以後，我們終於看到 new Date 函式了，仔細來看看　parseDate 函式做了些什麼工作吧！

```javascript=
/dayjs/src/index.js
const parseDate = (cfg) => {
  const { date, utc } = cfg
  if (date === null) return new Date(NaN) // null is invalid
  if (Utils.u(date)) return new Date() // today
  if (date instanceof Date) return new Date(date)
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    const d = date.match(C.REGEX_PARSE)
    if (d) {
      const m = d[2] - 1 || 0
      const ms = (d[7] || '0').substring(0, 3)
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3]
          || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms))
      }
      return new Date(d[1], m, d[3]
          || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
  }

  return new Date(date) // everything else
}
```

1. 如果 date 傳入的是 null ， function 會執行 new Date(NaN)，這在 chrome 得到的結果是 Invalid Date
![](https://i.imgur.com/y6w0VE3.png)

2. Utils.u 是從 utils 會確認傳入的 date === undefined，如果是 true 會執行 new Date()，這樣得到的是現在的時間實例
    ```javascript=
    /dayjs/src/utils.js
    const isUndefined = s => s === undefined
    export default {
      u: isUndefined
    }
    ```
    ![](https://i.imgur.com/yQQDSTE.png)

3. 如果傳入的是 Date 的實例，可以直接將 date 帶入 new Date(date)
    ![](https://i.imgur.com/kVp4Rch.png)

4. 重頭戲來囉，如果 date 型別是 string 而且 string 中不含 Z 的話，
    1. 執行 dayjs 的 regex 檢查來把 date parse 好，
    2. m (月份)，因為 JS 的月份是從 0~11 開始，第 4 行透過 -1 的方式計算月份 value 要注意的是值會轉型成 number 變數，
    3. ms (毫秒) 僅留前三位，完成以後就能根據 new Date 的丟數個參數的方式，得到最終的 Date 實例。
    ```javascript=
    export const REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
    
    if (d) {
      const m = d[2] - 1 || 0 // month 
      const ms = (d[7] || '0').substring(0, 3) 
      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3]
          || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms))
      }
      return new Date(d[1], m, d[3]
          || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms)
    }
    ```
    ![](https://i.imgur.com/GNg47En.png)


### init function
parse function 執行完成以後，緊隨著執行的是 <b>init</b>，這邊的 $date 已經被轉成 JS Date 的實例，因此可以呼叫 Date 的任意 function，到這邊為止，我們終於得到了全部日期時間的變數！！
```javascript=
class Dayjs {
  init() {
    const { $d } = this
    this.$y = $d.getFullYear()
    this.$M = $d.getMonth()
    this.$D = $d.getDate()
    this.$W = $d.getDay()
    this.$H = $d.getHours()
    this.$m = $d.getMinutes()
    this.$s = $d.getSeconds()
    this.$ms = $d.getMilliseconds()
  }
```

## 結論

在經過了一整段的 class 實例化過程以後，我們目前可以知道 dayjs 所做的事情是提供 new Date 一個新的包裝，他提供了更多的 pasre New Date 的方式，下一篇文章我們會開始討論，得到了這些所有的日期時間變數以後， dayjs 又是怎麼完成一個個其它方便好用的 function！！