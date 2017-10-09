# 深拷贝实现

js中有两种数据类型，基本类型和引用类型，基本类型也叫值类型，说法很多，但是特点就是值是无法改变的，每次操作都会返回新的值，原始的值不会改变，而引用类型则不一样，引用类型的变量名指向的是存储值的内存地址，如果进行一些操作会改变该内存地址中存储的值，而这个内存地址却不会进行改变，所以有时候在业务中我们拿到一个引用类型想要一系列操作但是又不想污染这个，深拷贝就可以帮我们来解决这个问题

举个简单的例子

```js
var people = {
    name: 'dahong',
    age: 18,
}

var newPeople = people;

newPeople.age = 19;

console.log(people)  // {name: "dahong", age: 19}
console.log(newPeople)  // {name: "dahong", age: 19}
```

这个例子很简单，引用类型赋值只是将内存地址和一个新的变量名进行了绑定，用新的变量名来操作其存储的值，那么引用了该内存地址所有变量名的值都是会变化的，好，那么我们来拷贝一份

```js
var people = {
    name: 'dahong',
    age: 18,
}

var newPeople = JSON.parse(JSON.stringify(people));

newPeople.age = 19;

console.log(people)  // {name: "dahong", age: 18}
console.log(newPeople)  // {name: "dahong", age: 19}
```

结果我们看到了，操作 newPeople 并不会改变 people 中存储的值，原理也很简单，`JSON.stringify` 返回一个字符串，然后再 `JSON.parse` 解析成引用类型

但是这样的操作也有缺点：
1. 存储的值中有 Function 则会丢失
2. 原型链会丢失

```js
function fn() {
    this.name = 'dahong';
    this.age = 18;
    this.doOne = function (){
        console.log('doOne');
    }
}

fn.prototype.do = function () {
    console.log('hello');
}

var people = new fn();

var newPeople = JSON.parse(JSON.stringify(people));

newPeople.age = 19;

console.log(people)  // {name: "dahong", age: 18, doOne: ƒ...}
console.log(newPeople)  // {name: "dahong", age: 19}
```