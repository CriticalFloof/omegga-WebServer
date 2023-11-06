<style scoped lang="scss">
.effect-layer {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
}
</style>

<template>
    <div class="effect-layer">
        <slot />
    </div>
</template>

<script>
/**
 *  This element paints everything within the viewport and below its own z-index layer with a filter.
 */
export default {
    mounted() {
        this.$el.style["backdrop-filter"] = this.$attrs["effects"];
    },
};
</script>
