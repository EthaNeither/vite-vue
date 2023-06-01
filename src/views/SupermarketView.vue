<template>

</template>

<script>
import spmk from '../composables/supermarket.js'
import { onBeforeUnmount } from "vue"
export default {
    
    setup(){
        const {init,loadmodles, animate} = spmk()
        init()
        loadmodles()
        animate()

        /**
         * pop three from canvas stack
         */
         onBeforeUnmount(()=>{
            document.querySelector("canvas").remove()
        })
    }
}
</script>