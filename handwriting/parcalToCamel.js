// 写个转换函数，把一个JSON对象的key从横杠形式（Pascal）转换到小驼峰形式（Camel），即{“a_b”:1}——>{“aB”:1}

/**
 * 从不改变原有对象来写，本质上是一个 深克隆 + 字符串转换 
 * 
 */
function replace(key) {
    return key.replace(/_(\w)/g, (a, b) => {
        return b.toUpperCase();
    })
}
function transform(obj, res = {}) {
    if (obj instanceof Array) {
        res = obj.map(item => {
            return transform(item)
        })
    } else if (obj instanceof Object) {
        const keys = Object.keys(obj);
        keys.forEach(key => {
            let newKey = replace(key);
            res[newKey] = transform(obj[key]);
        })
    } else {
        res = obj;
    }
    return res;
}
let obj = {
    'a_a': 1,
    'b_b': [{
            'c_c_c': 2
        },
        {
            'd_d': {
                'e_e': 3
            }
        }
    ],
    'f': 4,
    'g_g': {
        'h_h': 5,
        'i': 6
    }
}

function transform2(obj) {
    let o = obj instanceof Array ? [] : {}
    for (i in obj) {
        const key = replace(i);
        if (typeof obj[i] != 'object') {
            o[key] = obj[i]
        } else {
            o[key] = transform2(obj[i])
        }
    }
    return o
}

/**
 * 如果 object 嵌套过深，用递归来写会存在栈溢出
 * 尝试用 while 来改写
 */
function transform3(object) {
    let res = {};
    let stack = [{
        clone: res,
        obj: object
    }];
    for (;item = stack.pop();) {
    // while (item = stack.pop()) {
        let {clone, obj} = item;
        for (i in obj) {
            let key = replace(i);
            if (typeof obj[i] !== 'object') {
                clone[key] = obj[i]
            } else {
                clone[key] = Array.isArray(obj[i]) ? [] : {};
                stack.push({
                    clone: clone[key],
                    obj: obj[i]        
                })
            }
        }
    }
    return res;
}
