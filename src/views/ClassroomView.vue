<template>

</template>

<script>
import cr from '../composables/classroom.js'
export default {
    
    setup(){
        const {init,loadmodles, animate} = cr()
        init()
        loadmodles()
        animate()
    }
}

</script>