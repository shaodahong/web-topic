Function.prototype.bindLike = function (isThis) {
    isThis  = isThis || window;
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fnOP = function() {};

    var fn =  function () {
        return that.apply(this instanceof fn ? this : isThis, args.concat(Array.prototype.slice.call(arguments)))
    }

    fnOP.prototype = this.prototype;
    fn.prototype = new fnOP();

    return fn;
}

var obj = {
    name: 'monkey',
    age: 1
}

var name = 'hello';

function fn() {
    console.log('arguments', arguments);
    return this.name;
}

var bindFn = fn.bindLike(obj, name);

console.log(1)

console.log('result', new bindFn(2, 3))