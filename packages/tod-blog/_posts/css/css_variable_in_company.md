---
title: '<不嚴謹 Note> 公司專案的 CSS variable 寫法'
image: 'https://picsum.photos/id/139/900/1200'
excerpt: '此文的目的是提供公司的 UIUX 幾個將 CSS 變數提出的範例，如果你還是個初出茅廬的工程師，記得一件事情：我們永遠有很多的方法可以解決技術問題，但要根據情境找到盡量優秀的方式來解決。'
date: '2021-07-28T00:00:00.000Z'
author:
  name: Tod Sung
labels: [
  "Front End", "Web", "CSS"
]
---

# <不嚴謹 Note> 公司專案的 CSS variable 寫法

此文的目的是提供公司的 UIUX 幾個將 CSS 變數提出的範例，如果你還是個初出茅廬的工程師，記得一件事情：我們永遠有很多的方法可以解決技術問題，但要根據情境找到盡量優秀的方式來解決。

### 套件

* vue2 
* vuetify2 
* scss 
* webpack5

### scss (recommend)

優點：搭配 .vue scoped 不容易汙染，import 也相對簡單

缺點：暫時沒想到什麼缺點(方法相對單純)

用法：使用 $ 號宣告

```scss
$grey: #a2a2a2;
$orange: #f39800;

h2 {
  font-size: 1rem;
  color: $grey;
  border-left: 5px solid $orange;
  padding-left: 10px;
  letter-spacing: 2px;
  margin: 30px 0 15px;
  line-height: 1rem;
}
```

效果：

![](https://i.imgur.com/V8DzrU4.png)

### 搭配 vue 用 JS 傳遞 css

優點：適合用來處理搭配 JS 的邏輯運算

缺點：子元件會一直繼承下去，所以要小心汙染

用法：分別寫在 .vue 中三個區塊

```html=
<template>
    <main id="main" :style="css_props">
    </main>
</tempate>
```

```javascript=
computed: {
    css_props() {
        return {
            '--container-background-color': this.last_selected_main_menu === 'emap' ? '#000000' : '#ffffff',
            '--app-height': `${this.app_height}px`,
        } 
    },
}
```

```scss=
.main-block-options {
    &__background {
        height: 100vh;
        background: var(--container-background-color);
        touch-action: none;
    }
}
```

### 傳統作法

優點&&缺點：

整個網頁都會吃到這些 CSS 變數，好處就是大家都能用，壞處就是可能會重複命名導致汙染
建議可以擁有一個自己的命名模式

用法：

寫一個 CSS or scss 檔案
```css=
:root {
    --grey-pipe: #b3b7c4;
    --white-bg: #e8ecf7;
    --white-border: #e9edf1;
    --grey-border: #e8ecf7;
    --grey-border-darken: #b3b7c4;
    --linear-gradient-color: linear-gradient(47deg, #304476 7%, #319da9 92%);
    --linear-gradient-color-1: linear-gradient(83deg, #304476 20%, #319da9 83%);
    --base-dark-blue: #191f35;
    --base-blue: #2366f8;
    --base-blue-lighten: #4f85fa;
    --base-red: #ee3934;
    --base-orange: #eda12f;
    --base-yellow: #f1d94a;
    --base-gray: #454d66;
    --base-gray-darken: #353b4e;
    --aqua-active: #2cfde1;
    --base_black: #121624;
    --signs-green: #039d78;
    --signs-blue: #2366f8;
}
```

從 script.js import 就行，放在 .vue 檔也 ok
```java=
import '../css/root.scss'
```

使用的時候，就寫 var(variable-name)
```scss
&__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    color: var(--grey-pipe);

    &--active {
        color: var(--aqua-active);
    }
}
```

### 搭配 vuetify

優點：能夠快速啟用幾個相近的顏色，做好不錯的風格

缺點：被使用的框架限制(其實就是使用框架的缺點)

用法：options 中 customPropertiies 設為 true

在進入點 import vuetify 時， 添加新的 theme 變數，

```javascript=
import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

const opts = {
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        red: "#c50818",
        orange: "#F39800",
      },
    },
  },
};

new Vue({
  vuetify: new Vuetify(opts),
  el: "#app",
  components: {
    App: App,
  },
});

```

就可以在 dev tool 中看到變數
![](https://i.imgur.com/TEVr7QL.png)
