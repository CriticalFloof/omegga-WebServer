<style lang="scss" scoped>
@import "@css/theme";

.subsection-header {
    display: flex;
    height: 28px;
    font-size: $br-footer-font;
    color: $br-fg-footer;
    background-color: $br-bg-footer;
    font-weight: bold;
    padding: 2px;
}
</style>

<template>
    <div class="subsection-header">
        <slot />
    </div>
</template>

<script>
/**
 * Creates a subheader that content can be placed in, which spans the entire width of its parent.
 */
export default {};
</script>
