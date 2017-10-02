# 垂直居中

html:
```html
<div class="father">
  <div class="child">你好</div>
</div>
```

## 子元素和父元素都不知道高度的情况下:

1. 利用 table 的特性设置 vertical-align 为 middle

```css
.fatcher {
    display: table-cell;
    vertical-align: middle;
}
```

## 子元素知道高度父元素不知道高度的情况下:

1. 利用定位50%再设置 margin 负子元素高度的一半来实现

```css
.father {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: 50px;
}
```


## 父元素知道高度子元素不知道高度的情况下:

1. 子元素利用 transform 的属性来平移自身的一半

```css
.father {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```