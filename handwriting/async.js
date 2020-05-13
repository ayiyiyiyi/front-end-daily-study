const getData = () => new Promise(resolve => setTimeout(() => {
    resolve('data')
}, 1000))
function* testG() {
    const data1 = yield getData();
    console.log('data1: ', data1);
    const data2 = yield getData();
    console.log('data2: ', data2);
    return 'success';
}

function asyncToGenerator(fnG) {
    return function () {
        
    }
}