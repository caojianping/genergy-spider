/**
 * 重复字符
 * @param ch 字符
 * @param count 次数
 */
function repeatChar(ch: string, count: number) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += ch;
    }
    return result;
}

export const StringUtils = {
    repeatChar,
};
