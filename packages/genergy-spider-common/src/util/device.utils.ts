const window: any = this.window ? this.window : {};
const navigator: any = window.navigator || {};
const userAgent: string = navigator.userAgent || '';

/**
 * 判断是否为移动端
 */
function isMobile(): boolean {
    return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

/**
 * 判断是否为安卓
 */
function isAndroid() {
    return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1;
}

/**
 * 判断是否为IOS
 */
function isIOS() {
    return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * 判断是否为微信浏览器
 */
function isWechat(): boolean {
    return /micromessenger/i.test(userAgent.toLowerCase());
}

/**
 * 判断是否为IE9
 */
function isIE9(): boolean {
    let appName = navigator.appName || '',
        appVersion = navigator.appVersion || '',
        version = appVersion.split(';')[1];
    if (!version) return false;

    version = version.replace(/[ ]/g, '').replace('MSIE', '');
    return appName == 'Microsoft Internet Explorer' && parseInt(version) <= 9;
}

export const DeviceUtils = {
    isMobile,
    isAndroid,
    isIOS,
    isWechat,
    isIE9,
};
