# trim实现

## 正则

```js
function trim(string) {
    return string.replace(/(^\s*)|(\s*$)/g, '')
}
```