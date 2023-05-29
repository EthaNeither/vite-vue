<template>

</template>

<script>
import raa from '../composables/restaurant.js'
import { onBeforeUnmount } from "vue"
export default {
    
    setup(){
        
        const {init,loadmodles, animate} = raa()
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