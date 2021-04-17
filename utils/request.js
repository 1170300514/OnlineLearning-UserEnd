import axios from 'axios'
import Cookies from 'js-cookie'
import {MessageBox, Message} from 'element-ui'
// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:9001', // api的baseuri
    timeout: 20000 // 请求超时时间
})

// 拦截器
service.interceptors.request.use(
    config => {
        // debugger
        if(Cookies.get("hit_token")) {
            // 把获取cookie值放到header中
            config.headers['token'] = Cookies.get("hit_token");
        }
        return config
    },
    err => {
        Promise.reject(err);
    }
)
export default service