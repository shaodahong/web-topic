```
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



