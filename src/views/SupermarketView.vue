<template>

</template>

<script>
import spmk from '../composables/supermarket.js'
export default {
    
    setup(){
        const {init,loadmodles, animate} = spmk()
        init()
        loadmodles()
        animate()
    }
}
</script>