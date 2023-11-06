<style lang="scss" scoped>
@import "@css/theme";

.section-header {
    display: flex;
    height: 32px;
    font-size: $br-footer-font;
    color: $br-fg-footer;
    background-color: $br-bg-footer;
    font-weight: bold;
    padding: 10px;
}
</style>

<template>
    <div class="section-header">
        <slot />
    </div>
</template>

<script>
/**
 * Creates a header that content can be placed in, which spans the entire width of its parent.
 */
export default {};
</script>
