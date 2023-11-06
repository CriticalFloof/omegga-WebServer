<template>
    
    <brickadia-background></brickadia-background>
    <counter></counter>
    
    <p>Test</p>
</template>

<script>

    import brickadiaBackground from './background.vue'
    import counter from './counter.vue'

    export default  {
        components: {
            "brickadia-background": brickadiaBackground,
            "counter": counter
        }
    }
</script>

