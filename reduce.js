Array.prototype.myReduce = function(fn, initValue) {
    let array = this.slice(0);
    let accumulator;
    if (initValue === undefined) {
        accumulator = array[0];
        array.shift();
    } else {
        accumulator = initValue;
    }
    array.map((item, i) => {
        accumulator = fn(accumulator, item, i)
    })
    return accumulator;
}
let reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log([1,2,3,4].myReduce(reducer, 5) )

let compose = function name(...args) {
    let first = args.shift();
    return args.myReduce((res, fn) => {
        return fn(res)
    }, first())
}

function a (){
    return 'a'
}
function b(str) {
    return str+'b'
}
function c(str) {
    return str+'c'
}
console.log(compose(a,b,c))