
new Promise((resolve, reject) => {
    resolve()
}).then(() => console.log('promise'))
setTimeout(function () {
    console.log('setTimeout')
})