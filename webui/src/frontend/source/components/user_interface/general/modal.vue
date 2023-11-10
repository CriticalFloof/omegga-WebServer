<style scoped lang="scss">
@import "@css/style.scss";

.modal {
    @include absolute-center;
    background-color: $br-bg-primary;
    width: 500px;
    opacity: 0;

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
</style>

<template>
    <div :class="['modal', { visible }]">
        <div class="modal-content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: Boolean,
    },
};
</script>
