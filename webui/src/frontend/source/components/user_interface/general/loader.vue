<style scoped>
@import "@css/theme";

.loader {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    align-items: stretch;
    flex-direction: column;
}

.loader.active {
    display: flex;
}

.loader-container {
    flex: 1;
}

.loader-container.blur {
    backdrop-filter: blur(5px);
}

.loader.inline {
    position: relative;
    display: inline-block;
    left: auto;
    right: auto;
    width: auto;
    height: auto;
}

.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
}

.inline .loader-container {
    display: block;
    color: inherit;
}

.loader-icon {
    color: white;
    animation: rotating 2s infinite linear;
}

@keyframes rotating {
    0% {
        transform: rotate(0);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

<template>
    <div
        :class="[
            'loader',
            {
                active,
                inline,
            },
        ]"
        @click="$emit('click', $event)"
    >
        <div :class="['loader-container', { blur }]">
            <IconLoader :size="sizes[size || 'normal']" :class="['loader-icon']" />
            <div><slot /></div>
        </div>
    </div>
</template>
<script>
import { IconLoader } from "@tabler/icons-vue";

export default {
    components: { IconLoader },
    props: {
        active: Boolean,
        size: String,
        blur: Boolean,
        inline: Boolean,
    },
    data() {
        return {
            sizes: {
                small: "24",
                normal: "30",
                huge: "60",
                massive: "120",
            },
        };
    },
};
</script>
