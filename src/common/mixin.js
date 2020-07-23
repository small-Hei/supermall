import {debounce} from './utils'
import {ITEMIMGLOAD} from "common/const"

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener:null
        }
    },
    mounted () {
        //图片加载完成的事件监听
        let refresh = debounce(this.$refs.scroll.refresh,200)
        // 3.监听item中图片加载完成 重新设置滚动的范围
        this.itemImgListener = ()=>{
            refresh() 
        }
        this.$bus.$on(ITEMIMGLOAD,this.itemImgListener)
    }
}