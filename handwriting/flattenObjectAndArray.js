// 3. 
/**
 * 对象扁平化
 * 说明：请实现 flatten(input) 函数，input 为一个 javascript 对象（Object 或者 Array），返回值为扁平化后的结果。
 * 示例：
 *   var input = {
 *     a: 1,
 *     b: [ 1, 2, { c: true }, [ 3 ] ],
 *     d: { e: 2, f: 3 },
 *     g: null, 
 *   }
 *   var output = flatten(input);
 *   output如下
 *   {
 *     "a": 1,
 *     "b[0]": 1,
 *     "b[1]": 2,
 *     "b[2].c": true,
 *     "b[3][0]": 3,
 *     "d.e": 2,
 *     "d.f": 3,
 *     // "g": null,  值为null或者undefined，丢弃
 *  }
 */

let newObj = {}

function flatten(obj, str = '') {
    if (obj instanceof Object) {
        let keys = Object.keys(obj);
        keys.forEach(key => {
            const value = obj[key];
            if (value instanceof Object || value instanceof Array) {
                flatten(value, `${str}${key}.`)
            } else if (value !== null && value !== undefined) {
                newObj[`${str}${key}`] = value;
            }
        })
    } else if (obj instanceof Array) {
        obj.forEach((value, i) => {
            if (value instanceof Object || value instanceof Array) {
                flatten(value, `${str}${i}.`);
            } else if (value !== null && value !== undefined) {
                newObj[`${str}${i}`] = value;
            }
        });
    }
    return newObj;
}

let input = {
    a: 1,
    b: [1, 2, {
            c: true
        },
        [3]
    ],
    d: {
        e: 2,
        f: 3
    },
    g: null,
}

console.log(flatten(input));