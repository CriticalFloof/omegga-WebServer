<style lang="scss">
@import "@css/theme";

$btn-height: 60px;
$icon-height: $btn-height - 16px;

.menu-button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-transform: uppercase;
    height: $btn-height;
    font-size: 30px;
    color: $br-button-fg;
    background-color: $br-bg-secondary;
    font-weight: bold;
    padding: 0;
    cursor: pointer;
    user-select: none;
    margin: 8px 0;
    text-decoration: none;
    width: 350px;

    &:visited {
        color: $br-button-fg;
    }

    .menu-button-content {
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .ti,
    .icon {
        display: flex;
        width: $icon-height;
        height: $icon-height;
        margin-left: 8px;
        align-items: center;
        justify-content: center;
        margin-right: 24px;
    }

    &:hover {
        background-color: $br-element-hover;
    }
    &:active {
        background-color: $br-bg-footer;
    }
    &.active {
        background-color: $br-button-normal;
    }
    &.disabled {
        opacity: 50%;
        cursor: default;
        pointer-events: none;
    }

    &:not(.disabled):active .menu-button-content {
        padding-top: 4px;
    }
}
</style>

<template>
    <router-link
        :to="'/' + route"
        :class="[
            'menu-button',
            {
                disabled,
                active: (name || route) === this.$route.name,
            },
        ]"
        @click="$emit('click', $event)"
    >
        <div class="menu-button-content">
            <slot />
        </div>
    </router-link>
</template>

<script>
/**
 *  Button used for the Site Navigation component.
 *  @prop disabled: Boolean. Prevents the button from being interacted with, and applies a dark out style.
 *  @prop route: String. Path to vue component to load.
 *  @prop name: String. (?)
 */
export default {
    props: {
        disabled: Boolean,
        route: String,
        name: String,
    },
};
</script>
