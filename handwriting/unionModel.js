class Koa {
    constructor() {
        this.middlewares = []
    }
    use = (fn) => {
        // 忽略上下文参数 ctx
        this.middlewares.push(fn)
    }
    compose = () => {
        const _this = this;
        return () => {
            function dispatch(i) {
                if (i === _this.middlewares.length) return Promise.resolve();
                const fn = _this.middlewares[i];
                return Promise.resolve(fn(() => dispatch(i + 1)))
            }
            dispatch(0)
        }
    }
    listen = () => {
        console.log(this.middlewares)
        let fn = this.compose()
        fn()
    }
}

// 异步函数
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            console.log("hello");
        }, 3000);
    });
}

const app = new Koa();

app.use(async (next) => {
    console.log(1);
    await next();
    console.log(2);
});

app.use(async (next) => {
    console.log(3);
    await fn();
    next();
    console.log(4);
});

app.use(async (next) => {
    console.log(5);
    await next();
    console.log(6);
});

app.listen()