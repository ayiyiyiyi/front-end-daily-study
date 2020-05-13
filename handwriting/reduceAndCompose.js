/**
 * 手写一个 reduce 函数
*/
Array.prototype.myReduce = function (fn, initValue) {
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
console.log([1, 2, 3, 4].myReduce(reducer, 5))

/**
 *  手写compose函数
 *  compose 返回一个函数
 *  compose 执行顺序是从右往左
 *  pipe 执行顺序是从左往右
 */
let compose = function name(...args) {
    return function (param) {
        return args.reduceRight((res, fn) => {
            return fn(res)
        }, param)
    }
}

function a() {
    return 'a'
}

function b(str) {
    return str + 'b'
}

function c(str) {
    return str + 'c'
}
const fn = compose(b, c)
console.log(fn('a'))