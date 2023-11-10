<style lang="scss">
@import "@css/style.scss";

.content-parent {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 100%;
}

.content {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 24px;
}
</style>

<template>
    <div class="content-parent">
        <div class="content">
            <router-view />
        </div>
    </div>

    <modal-manager />
    <overlay-info />
    <reactive-background style="z-index: -1000" />
</template>

<script>
import overlayInfo from "@components/visual_candy/overlay_info.vue";
import reactiveBackground from "@components/visual_candy/reactive_background.vue";
import modalManager from "@components/modal_manager.vue";

export default {
    components: {
        "reactive-background": reactiveBackground,
        "overlay-info": overlayInfo,
        "modal-manager": modalManager,
    },
};
</script>
