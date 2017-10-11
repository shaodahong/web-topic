# 数组去重

这是我被坑的最惨的一个面试题

当时的面试情况是这样的，面试官问我数组是怎么去重的，我回答:"声明个新的空数组，然后遍历要去重的数组，拿每一个值去和空数组 indexOf 判断一下如果返回为 -1 则 push 进去，遍历结束后这个新的数组就是去重后的"，突然面试官问了一下如果不用 indexOf 呢，当时大脑不知怎么了短路了一下，然后GG思密达了

## 不考虑兼容性的最优解

```js
[...new Set(arr)]
```

或者

```js
Array.from(new Set(arr))
```

## indexOf

```js
function unique(arr) {
    var temp = [];

    for (var i = 0; i < arr.length; i++) {
        if (temp.indexOf(arr[i]) === -1) {
            temp.push(arr[i]);
        }
    }

    return temp;
}
```

## 不用 indexOf
```js
function unique(arr) {
    var temp = [];

    for (var i = 0; i < arr.length; i++) {
        var flag = true;
        for (var j = 0; j < temp.length; j++) {
            if (arr[i] === temp[j]) {
                flag = false;
            }
        }
        if (flag) {
            temp.push(arr[i]);
        }
    }

    return temp;
}
```

