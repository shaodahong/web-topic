# 快速排序

> 引自wikipedia 快速排序（英语：Quicksort），又称划分交换排序（partition-exchange sort），一种排序算法，最早由东尼·霍尔提出。在平均状况下，排序n个项目要Ο(n log n)次比较。在最坏状况下则需要Ο(n2)次比较，但这种状况并不常见。事实上，快速排序通常明显比其他Ο(n log n)算法更快，因为它的内部循环（inner loop）可以在大部分的架构上很有效率地被实现出来。
快速排序

步骤

找到该数组的基准点(中间数)，并创建两个空数组 left 和 right；
遍历数组，拿出数组中的每个数和基准点进行比较，如果比基准点小就放到 left 数组中，如果比基准点大就放到 right 数组中；
对数组 left 和 right 进行递归调用。


## 方法一

```js
function quickSort(arr) {
	if (arr.length <= 1) {return arr;}
	var left = [],
		right = [],
		baseDot = Math.round(arr.length / 2),
		base = arr.splice(baseDot, 1)[0];

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < base) {
			left.push(arr[i])
		}else {
			right.push(arr[i])
		}
	}

	return quickSort(left).concat([base], quickSort(right));
}
```
 
实现一个 quickSort 的封装，并且定义 left 和 right，找到数组的基准点 baseDot 和对应的基数 base，然后遍历数组的每一项和 base 进行对比，最后递归调用，给出一个跳出条件`if (arr.length <= 1) {return arr;}`

## 方法二

```js
function quickSort(array, left, right) {
	var length = array.length;
		left = typeof left === 'number' ? left : 0,
		right = typeof right === 'number' ? right : length-1;

    if (left < right) {
        var index = left - 1;
        for (var i = left; i <= right; i++) {
            if (array[i] <= array[right]) {
                index++;
                var temp = array[index];
                array[index] = array[i];
                array[i] = temp;
            }
        }
        quickSort(array, left, index - 1);
        quickSort(array, index + 1, right);
    }
    return array;
}
```

快速排序的基本思想就是分治法

> 引自wikipedia 在计算机科学中，分治法是建基于多项分支递归的一种很重要的算法范式。字面上的解释是“分而治之”，就是把一个复杂的问题分成两个或更多的相同或相似的子问题，直到最后子问题可以简单的直接求解，原问题的解即子问题的解的合并。