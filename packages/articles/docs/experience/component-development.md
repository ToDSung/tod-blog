---
title: '手刻元件心得，with vanilla react, react-aria, linaria'
date: '2024-01-31'
tags: ['Frontend', 'Component']
---

# 手刻元件心得，with vanilla react, react-aria, linaria

2023 冬季公司開始推動了公司內部元件庫的計畫，目標是做出一套公司自己的 design system，我在製作的過程裡主要參與了 Popper, Tooltip, Dropdown, Dialog, Select 這幾個元件，中間有一些崎嶇的地方，希望有相同目標的你，也能避免踩雷．

首先，團隊內部在建立專案時，有選定了要使用 react-aria 以及 linaria 作為 base，老實說我個人無論是起初還是直到參與了大概兩個月都並不是很支持 react-aria 以及後續的解決方案，主要是時間成本過高，從公司經營的角度來說成本跟效益不成正比，不過我還是會提出 react-aria 以及 linaria 各自能幫我們解決專案上的什麼問題．

react-aria 本身是 adobe 所推出的一個基於 react 的 hook library，與傳統的元件庫不同的是，他提供的是各式各樣的元件"行為"，透過傳入每個 hook 所需要的 parameter ，而後將所得到的 props 包含 event 及 a11y property 提供給自己能夠自由建立結構的 JSX 裡，就能夠製作出有包含各種行為的 component, 舉例來說 tooltip, react-aria 能夠給元件帶來 window size change 時也不會跑版的效果，而如果是 dialog 就能夠同時提供 keyboard esc close 以及 close callback 的介面接口．

react-aria 是團隊一起選定的，我就提出我自己認為的 react-aria 的優點，它能夠幫工程師省去重造輪子的麻煩，每個 hook 的回傳根據不同情境會同時給予各種需要的 mouse event 跟 keyboard event，例如 select 除了基本的點擊，也可以用 keyboard 的 up and down 去控制現在 focus 的 item，另外他還能夠幫忙處理 a11y，這部分也是屬於平常一般專案比較沒有注意到的地方，缺點則是他的 type 以及 props 在現在這個版本(2024 年初)定義的有些混亂，甚至我連去看他的 source code 都覺得有些地雷，畢竟他也還算是一個非常新的 library，或許後續無論是文件還是 api 介面都會做得更好，但以目前來說其實在使用及修改上會造成極大的麻煩．

於是乎我們就幾乎棄用了他，然後團隊內部的決議是先做出所有元件的 prototype 版本就好，使用者體驗就先不管，所以在 component 的邏輯處理上，我們目前轉於使用純 react 進行處理，我想，這最大的問題莫過於是重造輪子，我一直覺得致力於商業邏輯的開發，以及產品本身到底有沒有能夠解決客戶的問題，客戶到底能不能為 feature 買單，產品的營運穩定等等，才是在一般公司工程團隊中所更需要在意的，因此也不是很能夠擁抱這項決議，不過畢竟是眾人最終的決議，還是正向些吧，至少透過研究這些 component ，我們做為前端工程師的技術能力又 level up 了！

另外談談 Linaria ，它是做為我們 UI 元件庫的 css 解決方案， 使用 css in JS 的方式撰寫，好處是 typesafe，而且也能跟 stylelint 協同，並且在 bundle 後會轉為原生的 css，他解決了傳統上用 Js 在 runtime 時才渲染 css 的速度問題，但又仍然維持了原本我們團隊習慣的寫法，筆者自己本身沒有使用 tailwind 這個社群熱門的 css 框架做多人開發的經驗，所以也不太好比較兩者寫法的差異，而近期 meta 也推了 styleX 這套 lib ，筆者乍看之下覺得 Linaria 所解決的問題 styleX 似乎也都有解決，所以似乎也可以考慮使用 styleX，總體而言 Linaria 的學習成本不大，同時也額外有蠻多功能的，唯一的問題是設置上也有遇到一些地雷，狀況是 stylelint 搭配 Linaria 會錯誤的把正確的語法給轉換成無法編譯的語法，這問題我們的資深工程師發了一個 pr 去更正，不過也沒有到非常完美，因為 stylelint 的 extension 在顯示上就沒能夠好好顯示正確的語法了，不過總體來說我覺得 Linaria 是個值得推薦的 library！

本來想再談更多關於實作 component 的細節，不過就留待下次好了，先給自己來點 hint 做記憶，有些什麼好談的呢？ dialog 的 underlay，dropdown 及 dialog 的內部 scrollbar，tooltip 的位置計算，select 的事件傳遞，如何開放接口讓 react-hook-form 能順利串接，設計 props 的講究，controlled 以及 uncontrolled component．

希望這篇文章能給予你幫助，有興趣的話歡迎加我的 linkedin，如果有任何想法想交流都非常歡迎～
