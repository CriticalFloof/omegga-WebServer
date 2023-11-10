<style lang="scss" scoped>
@import "@css/theme";

.footer {
    background-color: $br-bg-footer;
    color: $br-fg-footer;
    display: flex;
    font-size: $br-footer-font;
    font-weight: bold;
    height: $br-footer-height - 20px;
    padding: 10px;
    text-transform: uppercase;
}
</style>

<template>
    <div class="footer">
        <slot />
    </div>
</template>

<script>
/**
 * Creates a footer that content can be placed in, which spans the entire width of its parent.
 */
export default {};
</script>
