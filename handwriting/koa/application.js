const http = require("http");
class Application {
    constructor() {
        this.callbackFn;
    }
    use = (fn) => {
        this.callbackFn = fn;
    }
    listen = (port) => {
        const server = http.createServer(this.callback())
        server.listen(port)
    }
    callback = () => {
        return (req, res) => {
            this.callbackFn(req, res)
        }
    }
}
module.exports = Application