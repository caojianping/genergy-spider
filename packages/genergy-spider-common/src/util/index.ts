export * from './type.utils';
export * from './string.utils';
export * from './digit.utils';
export * from './array.utils';
export * from './date.utils';
export * from './device.utils';
export * from './random.utils';

/**
 * json字符串转换
 * @param data 数据
 */
function parseJSON<T extends object>(data: string = ''): T {
    try {
        return JSON.parse(data) as T;
    } catch (error) {
        throw error;
    }
}

/**
 * 简易的对象副本
 * @param data 数据
 */
function duplicate<T extends object>(data: T): T {
    return parseJSON(JSON.stringify(data)) as T;
}

/**
 * 获取对象第一个key
 * @param obj 对象
 */
function getFirstKey(obj: any): string {
    obj = obj || {};
    let firstKey = '';
    for (const key in obj) {
        firstKey = key;
        break;
    }
    return firstKey;
}

/**
 * 获取对象第一个value
 * @param obj 对象
 */
function getFirstValue(obj: any): any {
    obj = obj || {};
    let firstValue = '';
    for (const key in obj) {
        firstValue = obj[key];
        break;
    }
    return firstValue;
}

/**
 * 构造查询参数
 * @param parameters 查询参数
 */
function buildParameters(parameters: { [key: string]: any }): string {
    if (!parameters || JSON.stringify(parameters) === '{}') return '';

    let temp: Array<any> = [];
    for (const key in parameters) {
        const value = parameters[key];
        temp.push(`${key}=${String(value)}`);
    }
    return temp.join('&');
}

/**
 * 解析查询参数
 * @param key key
 */
function resolveParameters(key: string): string {
    let regex = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
        hash = window.location.hash || '',
        flag = hash.indexOf('?') + 1,
        matches = hash.substr(flag).match(regex);
    if (!matches) return '';
    return unescape(matches[2]);
}

/**
 * 跳转至页面顶部
 */
function jumpTop() {
    const app = document.getElementById('app');
    app && app.scrollIntoView(true);
}

export const Utils = {
    parseJSON,
    duplicate,
    getFirstKey,
    getFirstValue,
    buildParameters,
    resolveParameters,
    jumpTop,
};
