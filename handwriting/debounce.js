/**
 * 初版 防抖
 */
function debounce(fn, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, args)
        }, wait);
    }
}

/**
 * 
 * 节流
 */
function throttle(fn, wait) {
    
}