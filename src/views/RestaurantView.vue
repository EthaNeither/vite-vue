<template>

</template>

<script>
import raa from '../composables/restaurant.js'
import { onBeforeUnmount } from "vue"
export default {
    
    setup(){
        const {init, textInteraction,collideraction,loadmodles, animate} = raa()
        init()
        textInteraction()
        collideraction()
        loadmodles()
        animate()
        onBeforeUnmount(()=>{
            document.querySelector("canvas").remove()
        })
    }
}
</script>