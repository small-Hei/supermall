
import axios from 'axios'

// 终极请求方案 Promise 简写
export function request(config){
    // 1.创建axios的实例
    const instatce = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout: 5000
    })
    //2 axios的拦截器
    // 2.1 请求拦截
    instatce.interceptors.request.use(
        config=>{
            // console.log(config)
            // 为什么拦截config
            // 1. config中有一些信息不符合服务器的要求
            // 2. 比如每次发送网络请求时 都希望在界面中显示一个请求的图标
            // 3. 某些网络请求(比如登录（token）),必须携带一些特殊的信息
            // 拦截之后要进行config返回 不然网络请求中没有config
            return config
        },err=>{
            console.log(err)
        }
    )
    // 2.2 相应拦截
    instatce.interceptors.response.use(
        result=>{
            // 拦截之后要进行result返回 不然请求结果中没有数据
            return result.data
        },err=>{
            console.log(err)
        }
    )

    //3.发送真正的网络请求
    // instatce(config) 本身返回的就是Promise
    return instatce(config)
}


// 如何使用拦截器？
// axios提供了拦截器 用于我们在发送每次请求或者得到相应后 进行对应的处理
// 四个拦截
// request 成功(success)和失败(failure)的拦截
// response 成功(success)和失败(failure)的拦截
