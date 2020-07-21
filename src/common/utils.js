// 公共的一些方法
//防抖动的方法
export function debounce(func,delay=500){
    let timer = null
    return function (...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}