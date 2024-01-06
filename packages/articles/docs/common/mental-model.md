---

---

# 心智模型與寫程式的互動關係

「心智模型」是我們用於解釋「為什麼一個人會這麼想」背後的流程、黑盒子、處理器。舉例來說，當我們看見紅燈就會想著不能過馬路，這個思考過程是一個心智模型。

在一個人也許一百年的生命中，我們可能會希望心智模型越複雜越好，為什麼呢?
因為我們希望我們看待事情能夠更全面，更能夠以不同的角度去看事情，如果一個生命殺害了另一個生命，也許是因為保家衛國，也許是因為正當防衛，所以心智模型越加複雜，越可以對事情有更透徹的解析能力，也就越能夠做出更好的判斷。

但寫程式與你如何看待事情有何不同呢?

以下開始我們從閱讀程式碼的角度出發，
要理解一段程式碼需要花費的心智模型，不同於前段所述，我們會希望 simple is the best，能夠讀的越輕鬆，就越好，我想這件事情我們應該是有共識的，也就是說，我們會希望將程式碼轉為實際運作的程式時，這個理解過程的心智模型，越簡單越好。

那麼該如何做才能減少閱讀程式碼的心智模型複雜度呢?

1. 使用重整程式碼風格的工具

  以 Javascript 來說，通常我們一定會使用到的工具是 eslint, prettier，根據你們團隊所使用的工具不同也可加入 stylelint ，或者是更多的 eslint plugin， 舉例來說我認為 eslint 中有一個幫忙排序 import library 的 plugin，那個工具透過排序專案的程式碼引入，其實也能夠有效讓閱讀的速度提升。

2. follow 更多 clean code 的準則

  我想只要在程式界打混個幾年的工程師都聽說一本無暇的程式碼，那本書提供了非常多個項目的 guide，我這邊也就不野人獻曝了，如果你們團隊現在還沒有建立屬於你們的風格，可以考慮盡量不要牴觸那本書所提到的原則，並且參考也許 airbnb 等等大公司所提供的他們公司內部的準則即可，筆者認為天下程式一大抄，能夠理解其中的含意更為重要，試著去理解為何大公司制定這樣的規矩，比起在小組織中爭辯，更為來得有效率。

3. 程式碼的細節訂製

  這也是在以往的工作經驗之中鮮少，但運氣很好曾經有人指導過我的一部份，那便是替程式碼的檔案位置、命名，程式碼的參數設計、排序，放更多的心力在其中，因為在網路上的分享，通常會是更大方向的引導，但小細節中，就會更需要團隊內部的討論，甚至哪怕團隊內部的想法與前述的大公司有牴觸，也可以試著使用內部人習慣的方式，畢竟在小組織中，只要大家能夠有共識，過於嚴苛的強制力可能還使人難以適從。

以上三種方式我認為是讓程式碼能夠"守秩序"的幾種方式，在 code review 的時候，多試著去標準化程式碼，並且在實作上以類似的方式處理，讓工程師可以降低閱讀程式碼的心智複雜度，將更多心力放在功能實踐上，相信會更能夠增進效率的，希望這次的分享能幫助到你，也歡迎你透過 linkedin 分享你的看法。