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

相比较 fn 和 fnThree，区别在于 fnThree return 了一个函数，但是结果却是迥然不同的，fn 每次调用打印出来的值都是1，而 result 却会保存上一个调用的结果，原因为什么呢？大家知道 js 的垃圾回收是*自动*的，实际上是对引用判断，fn 调用后没有什么引用所以垃圾回收会对 fn 不再使用的变量进行清理，而 result 却引用了 fnThree 内部 return 出来的这个函数，而这个函数又引用了父函数的变量 a，所以并不会进行清理，这样我们看到的 result 会一直保存着运行结果

那我们来看看闭包，闭包是个概念，它在很多的程序设计和代码封装上都随处可见，所以我们要想写好代码肯定是绕不过这个坎的，闭包本身它就是**函数**，不过它不同于一般的函数，**它可以拥有自己的私有变量，并且能够保持每次运行的状态**，私有变量只要是个函数就能做到，因为作用域的隔离，父作用域是访问不到子作用域中声明的变量的