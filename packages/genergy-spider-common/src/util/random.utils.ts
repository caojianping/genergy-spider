const chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];

const digitChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * 随机数字
 * @param min 最小值
 * @param max 最大值
 * @param precision 精度
 * @param isFloat 是否为浮点型
 */
function randomDigit(min: number, max: number, precision: number = 0, isFloat: boolean = false): number {
    let num = Math.random() * (max - min) + min;
    if (isFloat) return parseFloat(num.toFixed(precision));
    else return Math.round(num);
}

/**
 * 固定单词
 * @param count 次数
 */
function fixedWords(count: number, prefix: string = '', onlyDigit: boolean = false): string {
    let result = '';
    for (let i = 0; i < count; i++) {
        let arrs = !onlyDigit ? chars : digitChars,
            index = Math.round(Math.random() * (arrs.length - 1));
        result += arrs[index];
    }
    return prefix + result;
}

/**
 * 随机单词
 * @param min 最小值
 * @param max 最大值
 */
function randomWords(min: number, max: number): string {
    let result = '',
        range = Math.round(Math.random() * (max - min)) + min;
    for (var i = 0; i < range; i++) {
        let index = Math.round(Math.random() * (chars.length - 1));
        result += chars[index];
    }
    return result;
}

export const RandomUtils = {
    randomDigit,
    fixedWords,
    randomWords,
};
