const getData = () => new Promise(resolve => setTimeout(() => {
    resolve('data')
}, 1000))
const getData2 = () => new Promise((resolve, reject) => setTimeout(() => {
    reject('data2')
}, 1000))

function* testG() {
    const data1 = yield getData();
    console.log('data1: ', data1);
    const data2 = yield getData2();
    console.log('data2: ', data2);
    return 'success';
}

function asyncToGenerator(fnG) {
    return function () {
        
        // 先调用 generator 函数 生成迭代器
        const fn = fnG.apply(this, arguments);

         // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
        return new Promise((resolve, reject) => {

             // 内部定义一个step函数 用来递归实现对 generator.next 的调用 
            function step(key, val) {

                let data;

                // 如果抛出异常 就reject掉， 外部通过.catch可以获取。 ps: await 就是这么处理的
                try {
                    data = fn[key](val);
                } catch (e) {
                    return reject(e)
                }

                const { done, value } = data;
                
                // 判断递归完成条件， 如果完成，就 resolve 这个值。
                if (done) {
                    return resolve(value)
                } else {

                    // 把 value 进行处理，防止 value 不是 Promise 无法进行 .then 的操作
                    return Promise.resolve(value).then(res => {
                        step('next', res);
                    }, err => {
                        
                        // 上面的 try catch 中调用的是 fn.throw(err), 会被 catch 到，
                        // 然后 Promise 会直接 reject, 不会再继续下面的 yield 操作了
                        step('throw', err);
                    })
                }
            }
            step('next')
        })

    }
}

let gen = asyncToGenerator(testG)();
gen.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})