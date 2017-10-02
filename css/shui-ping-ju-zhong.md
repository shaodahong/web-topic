# 水平居中

html:
```html
<div class="father">
  <div class="child">你好</div>
</div>
```

## 子元素和父元素都不知道宽度的情况下:

1. 利用 text-align 的特性设置

```css
.father {
    text-align: center;
}
```
这样设置会使内容居中，要想 child 居中则 child 为行内元素或者行内-块级元素

## 子元素知道宽度父元素不知道宽度的情况下:

1. 利用 `margin: 0 auto;` 的特性设置

```css
.father {
    margin: 0 auto;
}
```
这样设置会使标签居中，但是只适用于子元素比父元素宽度小且子元素是块级元素的时候，版心就是这样设置的


## 父元素知道宽度子元素不知道宽度的情况下:

1. 子元素利用 transform 的属性来平移自身的一半

```css
.father {
  width: 500px;
  position: relative;
}

.child {
  display: inline;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```