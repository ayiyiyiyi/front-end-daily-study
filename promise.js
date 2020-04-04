const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = null;
        this.resolvedStack = [];
        this.rejectedStack = [];

        try {
            fn(this._resolve, this._reject)
        } catch (error) {

        }
    }
    _resolve = (val) => {

        const _changeStateToResolve = (_val) => {
            this.state = RESOLVED;
            this.value = _val;
            this.resolvedStack.map(cb => {
                cb(_val);
            })
        }
        const _changeStateToReject = (_err) => {
            this.state = REJECTED;
            this.value = _err;
            this.rejectedStack.map(cb => {
                cb(_err);
            })
        }
        let run = () => {
            if (this.state !== PENDING) return;
            if (val instanceof MyPromise) {
                val.then(res => {
                   _changeStateToResolve(res);
                }, err => {
                    _changeStateToReject(err);
                })
            } else {
                _changeStateToResolve(val);
            }
        }
        setTimeout(run, 0);
    }
    _reject = (err) => {
        let run = () => {
            if (this.state !== PENDING) return;
            this.state = REJECTED;
            this.value = err;
            this.rejectedStack.map(cb => {
                cb(err);
            })
        }
        setTimeout(run, 0)
    }
    then = (resolve, reject) => {
        let { value, state } = this;
        return new MyPromise((resolveNext, rejectNext) => {
            let _fulfilled = (val) => {
                if (typeof resolve !== 'function') {
                    resolveNext(resolve);
                } else {
                    let res = resolve(val);
                    if (res instanceof MyPromise) {
                        res.then(resolveNext, rejectNext)
                    } else {
                        resolveNext(res);
                    }
                }
            }
            let _rejected = (err) => {
                if (typeof reject !== 'function') {
                    resolveNext(reject)
                } else {
                    let res = reject(err);
                    if (res instanceof MyPromise) {
                        res.then(resolveNext, rejectNext)
                    } else {
                        resolveNext(res)
                    }
                }
            }
            switch (state) {
                case PENDING:
                    this.resolvedStack.push(_fulfilled);
                    this.rejectedStack.push(_rejected);
                    break;
                case RESOLVED:
                    _fulfilled(value);
                    break;
                case REJECTED:
                    _rejected(value);
                    break;
                default:
                    break;
            }
        })
    }
    catch = (rejected) => {
        this.then(null, rejected);
    }
    static all = (queue) => {
        return new MyPromise((resolve, reject) => {
            let result = [];
            let count = 0;
            queue.map((p, i) => {
                p.then(res => {
                    count++;
                    result[i] = res;
                    if (count === queue.length) {
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                });
            })
        })
    }
    static race = (queue) => {
        return new MyPromise((resolve, reject) => {
            let result = false;
            queue.map(p => {
                p.then(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                })
            })
        })
    }
    static resolve = (val) => {
        if (val instanceof MyPromise) return val;
        return new Promise((resolve) => resolve(val));
    }
    static reject = (err) => {
        return new Promise((resolve, rejected) => rejected(err))
    }
}

// example 1
let promise0 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject(2);
    }, 2000);
})
promise0
    .then((res) => {
        console.log(res, 'promise0 res');
        return res + 3;
    }, err => {
        console.log(err, 'promise0 error');
        return err + 3;
    })
    .then((res) => {
        console.log(res, 'promise0 then2')
    })

// example 2
let promise1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
})
let promise2 = promise1.then(res => {
    return new MyPromise((resolve1, reject1) => {
        setTimeout(() => {
            reject1(3);
        }, 4000);
    });
})

promise2.then(res => {
    console.log(res, 'res');
}, err => {
    console.log(err, 'err');
});

//  example 3
const promise3 = new MyPromise(function (resolve, reject) {
    setTimeout(() => {
        resolve(1)
    }, 4000)
});

const promise4 = new MyPromise(function (resolve, reject) {
    setTimeout(() => {
        reject(promise3);
    }, 1000)
})

promise4.then(res => {
    console.log('promise4 res', res);
}, err => {
    console.log('promise4 err', err);
})

let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
    }, 1000)
})

let p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2');
    }, 2000)
})

let p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p3');
    }, 2500)
})

MyPromise.all([p1,p2,p3]).then(res => {
    console.log(res, 'all res');
}, err => {
    console.log(err, 'all err');
})

MyPromise.race([p1,p2,p3]).then(res => {
    console.log(res, 'race res');
}, err => {
    console.log(err,'race err');
})