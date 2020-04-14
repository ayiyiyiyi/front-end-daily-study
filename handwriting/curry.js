// 柯里化方法1
function saveCurry(fn, args) {
    return function (...other) {
        return fn.apply(this, args.concat(other));
    }
}

function curry1(fn, length) {
    length = length || fn.length;
    return function (...args) {
        if (args.length < length) {
            return curry1(saveCurry(fn, args), length - args.length)
        } else {
            return fn.apply(this, args);
        }
    }
}
let fn = curry1(function (a, b, c) {
    console.log(a, b, c);
})

// fn('a')('b')('c');
// fn('a','b')('c');
// fn('a','b','c');

//柯里化方法二
function curry2(fn, arr = []) {
    let length = fn.length;
    return function (...args) {
        let _arr = arr.concat(args);
        if (_arr.length < length) {
            return curry2(fn, _arr);
        } else {
            return fn(..._arr);
        }
    }
}

let fn2 = curry2(function (a, b, c) {
    console.log(a, b, c);
})
// fn2('a')('b')('c');

// 柯里化方法三
var curry3 = fn =>
    judge = (...args) =>
    args.length === fn.length ?
    fn(...args) :
    (arg) => judge(...args, arg)

let fn3 = curry3(function (a, b, c) {
    console.log(a, b, c);
})
fn3('a')('b')('c');


function _curry3(fn) {
    function judge(...args) {
        if (args.length === fn.length) {
            fn(...args)
        } else {
            return function (arg) {
                return judge(...args, args)
            }
        }
    }
    return judge;
}

let _fn3 = curry3(function (a, b, c) {
    console.log(a, b, c);
})
_fn3('a')('b')('c');

// 柯里化方法4

var curry4 = (fn, ...args) =>
        fn.length <= args.length
            ? fn(...args)
            : curry4.bind(null, fn, ...args)

let fn4 = curry4(function (a, b, c) {
    console.log(a, b, c, 4);
})
fn4('a')('b')('c');
