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

// http response 拦截器
service.interceptors.response.use(
    response => {
      //debugger
      if (response.data.code == 28004) {
          console.log("response.data.resultCode是28004")
          // 返回 错误代码-1 清除ticket信息并跳转到登录页面
          //debugger
          window.location.href="/login"
          return
      }else{
        if (response.data.code !== 20000) {
          //25000：订单支付中，不做任何提示
          if(response.data.code != 25000) {
            Message({
              message: response.data.message || 'error',
              type: 'error',
              duration: 5 * 1000
            })
          }
        } else {
          return response;
        }
      }
    },
    error => {
      return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
export default service