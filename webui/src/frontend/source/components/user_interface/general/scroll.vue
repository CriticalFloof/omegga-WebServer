<style scoped lang="scss">
@import "@css/theme";

::-webkit-scrollbar {
    width: 16px;
}

::-webkit-scrollbar-track {
    background-color: $br-element-footer-bg;
}

::-webkit-scrollbar-thumb {
    background: $br-element-bg;
}

::-webkit-scrollbar-thumb:hover {
    background: #fff;
}

.scroll-container {
    flex: 1;
    position: relative;
}

.scroll-scroller {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
</style>

<template>
    <div class="scroll-container">
        <div class="scroll-scroller">
            <slot />
        </div>
    </div>
</template>
<script>
/**
 * Creates a container where stylized scrollbars can appear.
 */
export default {};
</script>
