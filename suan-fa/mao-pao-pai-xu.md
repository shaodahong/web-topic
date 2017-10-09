# 冒泡排序

> 引自wikipedia 冒泡排序（英语：Bubble Sort，台湾另外一种译名为：泡沫排序）是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
图片详解


<p align="center">
    <img src="../assets/maopaopaixu1.png" />
</p>

代码实现

假设有一个数组`var list = [22, 90, 65, 34, 27, 8, 43, 24, 9, 10, 100, 1001];`

## 一阶段

要想实现冒泡肯定得来个双重循环结构，遍历到每个数和其之后的数进行比较，如果符合预期则进行交换，代码如下，计数count来表示交换的次数

```js
function bubbleSort(arr) {
	var origin = arr.slice(),
		count = 0;

	for (var i = 0; i < origin.length-1; i++) {
		for (var j = 0; j < origin.length-1-i; j++) {
			if (origin[j] > origin[j+1]) {
				var temp = origin[j];
				origin[j] = origin[j+1];
				origin[j+1] = temp;
				count++;
			}
		}
	}

	console.log(count);		//32
	return origin;
}
```

## 二阶段

有了一阶段的代码我们已经初步封装了一个bubbleSort的冒泡排序函数，你只要传入一个数组就能返回给你一个排序好的数组，但是这个是有局限性的

如果数组后面的已经排序好但是循环还是会继续
只能从小到大
好，我们再根据这个局限性封装下

```js
function bubbleSort(arr, callback) {
	if(Object.prototype.toString.call(arr) !== '[object Array]') {
		throw 'bubbleSort: is not array';
	}
	if(typeof callback === 'undefined') {
		callback = function (a, b) {
			return a - b;
		}
	}

	var origin = arr.slice(),
		length = origin.length,
		count = 0,
		start = 0;

	while (start < length-1) {
		var flag = true;
		for (var j = 0; j < length-1-start; j++) {
			if (callback(origin[j], origin[j+1]) > 0) {
				flag = false;
				var temp = origin[j];
				origin[j] = origin[j+1];
				origin[j+1] = temp;
				count++;
			}
		}
		if (flag) break;
		for (var k = length-1; k >= 0; k--) {
			if (callback(origin[k-1], origin[k]) > 0) {
				flag = false;
				var temp = origin[k];
				origin[k] = origin[k-1];
				origin[k-1] = temp;
				count++;
			}
		}
		if (flag) break;
		start++;
	}

	console.log(count);		//32
	return origin;
}
```

这样的实现对传入的参数进行了检测，并且可以根据callback来从小到大或者从大到小进行排序



