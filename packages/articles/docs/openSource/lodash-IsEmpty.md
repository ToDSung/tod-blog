---

---

# lodash isEmpty


相信只要在職場有工作過一小段時間以後的前端工作者，一定或多或少都使用過 lodash 這個套件，而我自己與同事在 code base 中最常使用的 method 便是其中的 isEmpty，不過最近一段時間也發現這個 method 與我們所想的有些不同，就讓我們一起來看看吧！

一般在串接 api 時，筆者習慣會先利用以下的寫法控制參數是否被實際帶入到呼叫 api 的 queryString 或 body   中。

```javascript
import isEmpty from 'lodash/isEmpty';

const apiName = async ({ filter }) => {
	const params = {
		...!isEmpty(filter.status) && { status: filter.status },
	};
	
	const response = await callApi(path, params);
	return response;
}
```

可以見到 keyword 或 status 在 && 前的判斷結果如若是 falsy，就能利用解構賦值的拆解與合併達到忽略的效果，在上述的例子之中由於設計上的因素 status 有可能被填入的值是 number or numbers array，題幹說明至此，使用過 isEmpty 的你有想出來可能發生什麼問題了嗎？

沒錯，當在 isEmpty 中填入  number 時，isEmpty 會 return true，從而導致所有帶入 number 作為過濾的需求全部無法達成效果。

```javascript
// const params = {
// 	...!isEmpty(filter.status) && { status: filter.status },
// };

const filter = {
	status: 1,
};

expect(params).toEqual({ status: 1 }); // wrong

// params actually {}
```

那麼如果我們直接拿掉 !isEmpty呢？又會導致帶入空陣列（[]）到 api 參數之中 。

```javascript
// const params = {
// 	...filter.status && { status: filter.status },
// };

const filter = {
	status: [],
};

expect(params).toEqual({}); // wrong

// params actually { status: [] }
```

於是乎在沒有思慮周全的寫法之下，兩種方式都無法達成需求。

回歸正題，為什麼 isEmpty(number) 會 return true 呢？難道他不是一般的 truthy，falsy 強制轉型，再額外添加空陣列（[]）、空物件（{}）、空 map、空 set 等等其他資料結構？

節錄至官方文件的說明內容

> Checks if value is an empty object, collection, map, or set.
>Objects are considered empty if they have no own enumerable string keyed properties. 
>Array-like values such as arguments objects, arrays, buffers, strings, or jQuery-like collections are considered empty if they have length of 0 . Similarly, maps and sets are considered empty if they have a size of 0.
> 

其實裡面早已經說明了只有空物件，空 collection，空 map ，空 set 才能透過使用 isEmpty 判斷 ，而什麼是 collection ，他指的是可以用來被迭代（iteratre）的 Array-like 資料結構 。( objects, arrays, buffers, string, jQuery-like collections )

<b>現在是原始碼時間！</b>

```javascript
function isEmpty(value) {
  if (value == null) {
    return true
  }
  if (isArrayLike(value) &&
      (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function' ||
        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length
  }
  const tag = getTag(value)
  if (tag == '[object Map]' || tag == '[object Set]') {
    return !value.size
  }
  if (isPrototype(value)) {
    return !Object.keys(value).length
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false
    }
  }
  return true
}
```

首先會先確認 value 是否為 null，因為 null 不屬於文件說明中的任何一個情境，所以無需判斷直接 return true。

第二步判斷 value 是不是一個 ArrayLike 的變數，並確認這個 value 可以拿到 valid length 值。

```javascript
function isArrayLike(value) {
  return value != null && typeof value !== 'function' && isLength(value.length)
}

function isLength(value) {
  return typeof value === 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}
```

 

接著我們慢慢拆解 && 以後的值每個判斷式各代表什麼。

```javascript
Array.isArray(value) || // 原生的判斷 array 方法
typeof value === 'string' || // 判斷是否是字串
typeof value.splice === 'function' || // 用來過濾這樣子形式的 object： { length: 0 }
isBuffer(value) || // 判斷是否是 buffer (node.js 中用來處理二進制 data 的 class)
isTypedArray(value) || //  判斷是否是 TypedArray // 用 ArrayBuffer 才能使 Js 讀取二進位的資料
isArguments(value)) // 判斷是否是 Arguments // arguments 是對應傳入函式之引述的類陣列物件

const isBuffer = nativeIsBuffer || (() => false)

const isTypedArray = nodeIsTypedArray
  ? (value) => nodeIsTypedArray(value)
  : (value) => isObjectLike(value) && reTypedTag.test(getTag(value))

function isArguments(value) {
	// getTag 這邊可當作 Object.prototype.toString.call(value) 用來取得物件的 class
  return isObjectLike(value) && getTag(value) == '[object Arguments]'
}
```

如果符合以上任一條件就取 value 的 length 而後搭配強制轉型確認是否是空的 array-like 變數。

```javascript
return !value.length
```

第三步假定輸入的變數不是一個 array-like 的變數，就判斷他是否是 Map 或是 Set，如果是就取 vlaue 的 size 然後一樣強制轉型確認是否為空。

```javascript
const tag = getTag(value)
// getTag 這邊可當作 Object.prototype.toString.call(value) 用來取得物件的 class
if (tag == '[object Map]' || tag == '[object Set]') {
  return !value.size
}
```

第四步檢定是否是一個原型物件，原型物件指的是一個物件的屬性 prototype 中有 constructor 並且 使得用這個原型物件建立出來的物件可以透過 prototype 繼承屬性，如果他是一個原型物件就轉成 array 以後確認其 length。

```javascript
if (isPrototype(value)) {
  return !Object.keys(value).length
}

var objectProto = Object.prototype;

function isPrototype(value) {
	var Ctor = value && value.constructor, // 取得構造函數
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
			// 也就是取得 value 的構造函數的 prototype 或是物件的 prototype
	
  return value === proto; 
}
```

<b>快速釐清 prototype</b>
 

```javascript
function Person(name, gender){
  this.name = name;
  this.gender = gender;
}
console.log(Person.prototype); // {} 是一个空对象
Person.prototype = {
  country: 'China'
};
const Jason = new Person("Jason", 'male');

// Jason.__proto__ === Person.prototype
// Jason.__proto__.__proto__ == Person.prototype.__proto__ == Object.prototype
```

第五步檢定一般物件，檢查該物件有沒有可以直接被呼叫到的屬性。

```javascript
for (const key in value) {
  if (hasOwnProperty.call(value, key)) {
    return false
  }
}
```

如果以上條件都通過了，那代表 value 不是需要判斷是否為 empty 的變數，return true 即可。

終於！透過平常踩到的地雷及閱讀相關的開源程式碼，我們學到了什麼。

1. 閱讀文件的重要性，講起來基本，但有時還是會下意識地亂猜。
2. 各種邊界條件的守備，雖然上述沒特別提及，不過在 lodash 中其實都有做相對應的測試。（補充：筆者認為利用 typescript 也可以很好避免這個問題）。
3. Single-responsibility principle 單一職責原則，一個 function 只做一件事情，同時也減少了重複的程式碼。
4. coding style 的臨摹，效法程式碼的可讀性，更多更多的 function 命名思考等等。
5. 各式各樣的基本 Js 觀念，例如為了寫這樣的文章我又多了解了 Arguments 跟更清楚了原型鏈的關係。
6. 更簡潔的寫法，例如 .legnth !== 0 直接 return .length 讓強制轉型做判斷即可 ( 初學者蠻常寫成這樣，當然並非在所有時候都無腦的使用 .length ，沒有絕對必須因地制宜，永遠記得追求可讀性。）

## reference

1. [該來理解 JavaScript 的原型鍊了](https://blog.huli.tw/2017/08/27/the-javascripts-prototype-chain/)
2. [lodash源码分析之isPrototype](https://github.com/HeftyKoo/pocket-lodash/issues/196)