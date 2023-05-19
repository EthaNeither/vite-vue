<template>

</template>

<script>
import raa from '../composables/restaurant.js'
export default {
    
    setup(){
        const {init, textInteraction,loadmodles, animate} = raa()
        init()
        textInteraction()
        loadmodles()
        animate()
    }
}
</script>