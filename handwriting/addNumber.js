let a = "9007199254740991";
let b = "1234567899999999999";

function addNumber(a, b) {

    let maxLength = Math.max(a.length, b.length);
    /**
     * padStart() 方法用另一个字符串填充当前字符串，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。ES2017 (ES8)
     */
    a = a.padStart(maxLength, '0');
    b = b.padStart(maxLength, '0');

    let sum = '';
    let digit = 0; // 超过 10 进位
    for (let i = maxLength - 1; i >= 0; i--) {
        const res = parseInt(a[i]) + parseInt(b[i])  + digit;
        digit = res >= 10 ? 1 : 0;
        sum = res % 10 + sum;
    }
    if (digit == 1) {
        sum = '1' + sum;
    }
    // console.log(sum);
}

addNumber(a, b);

