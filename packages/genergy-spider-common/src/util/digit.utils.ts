import { TypeUtils } from './type.utils';

/**
 * 数字补零
 * @param digit 数字
 */
function digitZeroize(digit: number): string {
    return digit >= 0 && digit < 10 ? `0${String(digit)}` : String(digit);
}

/**
 * 数字转换
 * @param digit 数字
 */
function digitConvert(digit: any): number {
    if (TypeUtils.isNumber(digit)) return digit;

    let ndigit = Number(digit);
    return isNaN(ndigit) ? 0 : ndigit;
}

/**
 * 数字百分比
 * @param digit 数字
 * @param precision 小数点位数
 * @param isString 是否返回字符串
 * @param isDivide 是否为除尘运算
 */
function digitPercent(
    digit: any,
    precision: number = 2,
    isString: boolean = false,
    isDivide: boolean = false
): number | string {
    let cdigit = digitConvert(digit),
        ndigit = isDivide ? cdigit / 100 : cdigit * 100;

    if (!isString) return Number(ndigit.toFixed(precision));
    return ndigit.toFixed(precision);
}

/**
 * 数字精度
 * @param digit 数字
 * @param precision 小数点位数
 * @param isString 是否返回字符串
 */
function digitPrecision(digit: any, precision: number = 2, isString: boolean = false) {
    let cdigit = digitConvert(digit);

    if (!isString) return Number(cdigit.toFixed(precision));
    return cdigit.toFixed(precision);
}

export const DigitUtils = {
    digitZeroize,
    digitConvert,
    digitPercent,
    digitPrecision,
};
