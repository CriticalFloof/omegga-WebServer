<template>
    <button @click="increment">Counter</button>
    <div>count is {{ counter }}</div>
</template>

<script>
    import { ref, onMounted } from 'vue';

    export default {
        setup() {
            onMounted(()=>{
                console.log("Component has been Mounted!")
            })

            const counter = ref(0)

            function increment() {
                counter.value += 13
            }

            return { counter, increment }
        }
    }
</script>

