import Qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import { TypeUtils, DeviceUtils } from './util';

const isIE9 = DeviceUtils.isIE9();
const TIMEOUT = 10000;

export class Caxios {
    // 通用选项
    private static commonOptions: any = {
        responseType: 'json',
        timeout: TIMEOUT,
    };

    // 设置headers
    private static setHeaders(options: AxiosRequestConfig = {}) {
        if (options['method'] === 'POST') {
            // 设置默认请求头内容类型
            if (!options['headers']['Content-Type']) {
                options['headers']['Content-Type'] = 'application/json; charset=UTF-8';
            }

            // 转换请求数据
            let data = options['data'];
            if (
                options['headers']['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1 &&
                !TypeUtils.isUndefinedOrNull(data)
            ) {
                options['data'] = Qs.stringify(data);
            }
        }

        return options;
    }

    // axios调用
    public static async invoke<T>(options: AxiosRequestConfig): Promise<T> {
        if (!options) return Promise.reject('请求参数不可以为空');

        options = Caxios.setHeaders(options);

        let method = options.method || 'GET',
            instance = axios.create(Caxios.commonOptions);
        // 请求拦截器
        instance.interceptors.request.use(
            (request) => {
                if (isIE9 && method === 'POST') {
                    request.data = JSON.stringify(request.data);
                }
                return request;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        // 响应拦截器
        instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                let result = err;
                // 取消处理
                if (err instanceof axios.Cancel) {
                    result = ''; // 返回空时，Prompt不提示
                }
                // 网络异常处理
                const errMsg = err.message || '';
                if (errMsg.indexOf('Network Error') > -1) {
                    result = '网络异常，请稍后重试';
                } else if (errMsg.indexOf('timeout of') > -1) {
                    result = '请求超时，请稍后重试';
                }
                return Promise.reject(result);
            }
        );

        options.cancelToken = new axios.CancelToken((cancel) => {
            window['cancelAxios'] = cancel;
        });

        // axios调用、处理响应数据
        let response = await instance.request(options);

        // 兼容IE9
        if (isIE9) {
            let request = response.request;
            if (request && request.responseType === 'json' && request.responseText) {
                response.data = JSON.parse(request.responseText);
            }
        }

        let resp = response.data;
        if (!resp) throw new Error('无效的响应结果');

        return resp.data as T;
    }

    // GET方法请求
    public static async get<T>(options: AxiosRequestConfig): Promise<T> {
        if (!options) return Promise.reject('请求参数不可以为空');

        options['method'] = 'GET';
        return await Caxios.invoke<T>(options);
    }

    // POST方法请求
    public static async post<T>(options: AxiosRequestConfig): Promise<T> {
        if (!options) return Promise.reject('请求参数不可以为空');

        options['method'] = 'POST';
        return await Caxios.invoke<T>(options);
    }
}
