var a = true;
while (a.length) {
    console.log(1);
}

setTimeout(function () {
    a = false;
    console.log(2);
}, 3000);


setTimeout(function () {
    a = false;
    console.log(3);
}, 5000)