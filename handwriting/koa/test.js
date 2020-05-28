const Koa  = require("./application");
const app = new Koa();
app.use((req, res) => {
    res.end('hello world');
})
app.listen(3000, () => {
    console.log('listen success')
})