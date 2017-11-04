# trim实现

可以用正则匹配空字符开头或者空字符结尾来 replace 掉

```js
function trim(string) {
    return string.replace(/(^\s*)|(\s*$)/g, '')
}
```