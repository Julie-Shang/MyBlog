import axios from "axios"
import { Message, Loading } from "element-ui"

const BASE_API = process.env.VUE_APP_BASE_API

class HttpRequest {
    constructor() {
        this.queue = {},
            this.loading = undefined
    }

    getConfig() {
        const config = {
            headers: {
                myHeader: "myheader1",
                Authorization: "this-is-julie-token"
            },
            baseURL: BASE_API
        }
        return config
    }

    interceptors(instance, url) {
        //请求拦截器，发送请求之前
        instance.interceptors.request.use(config => {
            this.queue[url] = true
            this.loading = Loading.service({
                text: '加载中',//加载文字
                fullscreen: true,//全屏显示
            })
            return config
        }, error => {
            return Promise.reject(err)
        })

        //响应拦截器
        axios.interceptors.response.use(res => {
            // 对响应数据做点什么
            //相应成功后，应关闭加载层
            this.destroy(url)
            const { data, status } = res
            return { data, status }
        }, err => {
            // 对响应错误做点什么
            this.destroy(url)
            let errInfo = err.response

            if (!errInfo) {
                const {
                    statusText,
                    status,
                    config
                } = JSON.parse(JSON.stringify(error))

                errorInfo = {
                    statusText,
                    status,
                    request: { responseURL: config.url }
                }
            }
            if (error && error.response) {
                switch (error.response.status) {
                    case 400:
                        error.message = '请求错误'
                        break
                    case 401:
                        error.message = '授权错误，请重新登录'
                        break
                    case 403:
                        error.message = '拒绝访问'
                        break
                    case 404:
                        error.message = `请求地址出错: ${error.response.config.url}`
                        break
                    case 408:
                        error.message = '请求超时'
                        break
                    case 500:
                        error.message = '服务器内部错误，请联系系统管理员处理'
                        break
                    case 501:
                        error.message = '服务未实现'
                        break
                    case 502:
                        error.message = '网关错误'
                        break
                    case 503:
                        error.message = '服务不可用'
                        break
                    case 504:
                        error.message = '网关超时'
                        break
                    case 505:
                        error.message = 'HTTP版本不受支持'
                        break
                    default:
                }
            }
            Message.error(error.message);
            return Promise.reject(err);
        });
    }

    destroy(url) {
        delete this.queue[url]
        if (this.loading && !Object.keys(this.queue).length) {
            this.loading.close()
        }
    }

    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getConfig(), options)

        return instance(options)
    }
}

export default new HttpRequest()

