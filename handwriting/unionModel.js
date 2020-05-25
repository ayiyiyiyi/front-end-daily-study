class Koa {
    constructor() {
        this.middlewares = []
    }
    use = function (fn) {
        this.middlewares.push(fn)
    }
    compose = function () {
        
    }
}