<template>

</template>

<script>
import mrt from '../composables/MRT.js'
export default {
    
    setup(){
        const {init,loadmodles, animate} = mrt()
        init()
        loadmodles()
        animate()
    }
}

</script>