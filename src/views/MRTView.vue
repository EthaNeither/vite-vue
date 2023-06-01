<template>

</template>

<script>
import mrt from '../composables/MRT.js'
import { onBeforeUnmount } from "vue"
export default {
    
    setup(){
        const {init,loadmodles, animate} = mrt()
        init()
        loadmodles()
        animate()
        onBeforeUnmount(()=>{
            document.querySelector("canvas").remove()
        })
    }
}

</script>