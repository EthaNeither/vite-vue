<template>

</template>

<script>
import mrt from '../composables/MRT.js'
import { onBeforeUnmount } from "vue"
export default {
    
    setup(){
        const {init,loadmodles, animate , dom} = mrt()
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