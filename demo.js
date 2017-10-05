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

fn();
fn();
fn();
result();
result();
result();