<template>

</template>

<script>
import raa from '../composables/restaurant.js'
export default {
    
    setup(){
        const {init,loadmodles, animate} = raa()
        init()
        loadmodles()
        animate()
    }
}
</script>