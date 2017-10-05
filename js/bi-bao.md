# 闭包

来看一个例子：

```js
function fn() {
    var a = 1;
    function fnOne() {
        console.log(a++);
    }

    fnOne();
}

function fnThree() {
    var a = 1;
    return function () {
        console.log(a++);
    }
}


var result = fnThree();

fn(); // 1
fn(); // 1
fn(); // 1
result(); // 1
result(); // 2
result(); // 3
```