<template>

</template>

<script>
import cr from '../composables/classroom.js'
import { onBeforeUnmount } from "vue"
export default {
    
    setup(){
        const {init,loadmodles, animate} = cr()
        init()
        loadmodles()
        animate()
        onBeforeUnmount(()=>{
            document.querySelector("canvas").remove()
        })
    }
}

</script>