// 实现一个方法，拉平Object
// const obj = { a: { b: { c: 1 } }, d: 1,e:{f:0} }
// flattenObject(obj); // { 'a.b.c': 1, d: 1 ,'e.f':0}


function flattenObject(obj, str = '', newObj = {}) {
    let entries = Object.entries(obj);
    return entries.reduce((res, [key, value]) => {
        if (value instanceof Object) {
            flattenObject(value, `${str}${key}.`, res)
        } else {
            res[`${str}${key}`] = value
        }
        return res;
    }, newObj);
}

let newObj = {}
function flattenObject2(obj, str = '') {
    let keys = Object.keys(obj);
    keys.forEach(key => {
        const value = obj[key];
        if (value instanceof Object) {
            flattenObject2(value, `${str}${key}.`)
        } else {
            newObj[`${str}${key}`] = value
        }
    })  
    return newObj; 
}

const obj = {
    a: {
        b: {
            c: 1
        }
    },
    d: 1,
    e: {
        f: 0,
        g: 2
    }
}
console.log(flattenObject2(obj));