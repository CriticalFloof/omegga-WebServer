<style lang="scss" scoped>
@import "@css/theme";
.nav-header {
    color: white;
    font-weight: bold;
    font-size: 50px;
    text-transform: uppercase;
}

.main-nav {
    margin-bottom: 16px;
}
</style>

<template>
    <div class="main-nav">
        <header class="nav-header">{{ title }}</header>
        <section-header>
            <span style="flex: 1; margin-left: 8px"> Welcome, {{ username }} </span>
            <slot />
        </section-header>
    </div>
</template>

<script>
import sectionHeader from "./section_header.vue";

/**
 *  Usually shows the user what page they're in, and allows page specific UI to be placed within it. Only one should be loaded.
 *  @prop title: String. Displays this string in big, bold, text.
 */
export default {
    components: {
        "section-header": sectionHeader,
    },
    props: ["title"],
    data() {
        return {
            username: "Placeholder",
        };
    },
};
</script>
