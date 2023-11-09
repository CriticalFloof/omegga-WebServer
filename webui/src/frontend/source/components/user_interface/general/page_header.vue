<style lang="scss" scoped>
@import "@css/theme";
.page-header {
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
}

.title {
    font-size: 50px;
    text-transform: uppercase;
    margin: -6px 0;
}

.user-nav {
    font-size: 20px;
    display: flex;
    align-items: center;

    :first-child {
        margin-left: 8px;
    }
    :last-child {
        margin-right: 8px;
    }
}

.user-info {
    flex: 1;
}
</style>

<template>
    <div class="page-header">
        <header class="title">{{ title }}</header>
        <section-header class="user-nav">
            <span class="user-info"> Welcome, {{ username }} </span>
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
