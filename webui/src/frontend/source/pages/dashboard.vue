<style scoped lang="scss"></style>

<template>
    <page-header title="Dashboard"></page-header>

    <site-navigation />

    <effect-layer effects="blur(6px)" style="z-index: -500" />
</template>

<script>
import siteNavigation from "@components/user_interface/navigation/site_navigation.vue";
import pageHeader from "@components/user_interface/general/page_header.vue";
import effectLayer from "@components/visual_candy/effect_layer.vue";

export default {
    components: {
        "site-navigation": siteNavigation,
        "effect-layer": effectLayer,
        "page-header": pageHeader,
    },
};
</script>
