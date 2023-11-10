<style scoped lang="scss">
.info {
    position: absolute;
    top: 5px;
    right: 5px;
    font-weight: 200;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>

<template>
    <span class="info" v-if="info?.version"> Omegga v{{ info.version }}</span>
</template>

<script>
import { inject, ref } from "vue";

export default {
    setup() {
        const store = inject("store");
        const info = ref(null);

        store.onKeyValueChanged("omeggaInfo", () => {
            info.value = store.get("omeggaInfo");
        });

        return {
            info,
        };
    },
};
</script>
