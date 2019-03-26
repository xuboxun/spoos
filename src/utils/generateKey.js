const md5 = require('md5');

const pool = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

const length = pool.length;

// 生成n位随机字符串
const generateStr = function() {
    let arr = [];
    for(let count = 0; count < 16; count++) {
        const index = Math.floor(Math.random() * length);
        arr.push(pool[index]);
    }
    return arr.join('');
};


function generateKey() {
    const timeStamp = +(new Date());
    const randomStr = generateStr();

    const message = randomStr + timeStamp;
    return md5(message);
}

module.exports = generateKey;
