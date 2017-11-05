Function.prototype.callLike = function (isThis) {
    isThis = typeof isThis === 'undefined' || isNull(isThis) ? window : isThis;

    var valueType = typeof isThis;
    if (valueType === 'string') {
        isThis = new String(isThis)
    }else if (valueType === 'number') {
        isThis = new Number(isThis)
    }else if (valueType === 'boolean') {
        isThis = new Boolean(isThis)
    }else if (valueType === 'symbol') {
        isThis = Object(isThis)
    }
    
    isThis.fn = this;

    var args = [];
    for (var i = 1, l = arguments.length; i< l; i++) {
        args.push(arguments[i]);
    }

    var result = eval('isThis.fn(' + args.join() + ')');
    delete isThis.fn;

    function isNull (value) {
        return typeof value === 'object' && !value === true
    }

    return result;
}

var a = function() {
    console.log(this, arguments)
}

var c = {}
var b = a.callLike(c, 1,2,3)

console.log(b, c)