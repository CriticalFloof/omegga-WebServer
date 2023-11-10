<style scoped lang="scss">
@import "@css/style.scss";

.effect-layer {
    opacity: 0;
    z-index: 500;
    transition: opacity 0.4s;
    &.visible {
        opacity: 1;
        pointer-events: bounding-box;
    }
}
.modal {
    @include absolute-center;
    background-color: $br-bg-primary;
    opacity: 0;
    z-index: 1000;

    &.visible {
        opacity: 1;
        animation: fadeIn 0.4s ease 1;
    }

    .modal-content {
        position: relative;
    }

    .popout-inputs {
        .dropdown,
        .input {
            margin: 8px;
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translate(-50%, calc(-50% + 40px));
    }
    100% {
        opacity: 1;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>

<template>
    <div>
        <effect-layer effects="blur(6px)" :class="['effect-layer', { visible }]" />
        <div :class="['modal', { visible }]">
            <div class="modal-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import effectLayer from "@components/visual_candy/effect_layer.vue";

export default {
    components: {
        "effect-layer": effectLayer,
    },
    props: {
        visible: Boolean,
    },
};
</script>
