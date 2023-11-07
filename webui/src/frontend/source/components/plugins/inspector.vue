<style lang="scss">
@import "@css/style";

.plugin-inspector-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    .input {
        max-width: 300px;
        margin-right: 8px;
        flex: 1;
        width: 100%;
    }
}

.plugin-inspector {
    @include column;
    background-color: $br-element-popout-bg;
    flex: 1;
    position: relative;
}

.stat {
    color: white;
    font-weight: bold;
}

.stats {
    padding: 8px;
    font-size: 24px;
    word-break: break-all;
    background-color: $br-element-popout-bg;
}

.plugin-view,
.plugin-info {
    @include column-container;

    .scroll-scroller {
        background-color: $br-bg-primary;
    }
}

.plugin-info {
    .section-header {
        @include center;
        color: white;
        height: 32px;
        font-size: 24px;
        text-shadow: none;
        font-weight: bold;
        text-align: center;
        background-color: $br-bg-header;
        top: 0;
        position: sticky;
        text-transform: uppercase;
    }
}

.option-item {
    @include alternate(background-color, $br-bg-secondary, $br-bg-secondary-alt);
    font-size: 20px;
    color: $br-boring-button-fg;
    min-height: 50px;
    overflow: visible;
    white-space: nowrap;
    display: flex;
    align-items: center;

    &.config {
        min-height: 80px;
    }

    .option-name,
    .option-input {
        margin-left: 8px;
        margin-right: 8px;
    }

    .option-name {
        font-size: 24px;
        font-weight: bold;
        cursor: default;
    }

    .option-input {
        @include column;
        width: 100%;

        .option-label {
            font-weight: bold;
            margin-bottom: 4px;

            .saved-note {
                color: $br-info-normal;
                display: inline-flex;
                align-items: center;
                font-weight: normal;
                font-size: 12px;
                opacity: 0;
                transition: 0.2s ease;

                &.show {
                    opacity: 1;
                }
            }
        }

        .option-value {
            @include row;
            justify-content: space-between;

            .reset-button {
                color: white;
                cursor: pointer;
            }
        }
    }

    .option-args {
        display: flex;
        flex-flow: row wrap;

        .option-arg {
            @include center;
            background-color: $br-button-normal;
            height: 16px;
            margin: 4px;
            font-size: 16px;
            padding: 4px 8px;
            border-radius: 16px;
            cursor: default;
            color: white;

            &.required {
                background-color: $br-main-pressed;
            }
        }
    }
}
</style>

<template>
    <div class="plugin-inspector-container">
        <section-header>
            <span>{{ "Placeholder" }}</span>
        </section-header>
        <div class="plugin-inspector">
            <div class="plugin-view">
                <loading :active="!loaded" size="huge">Loading Plugin</loading>
                <div class="plugin-info" v-if="loaded">
                    <div class="stats">
                        <div class="stat"><b data-tooltip="Plugin name">Name:</b> Placeholder</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sectionHeader from "@components/user_interface/general/section_header.vue";
import loading from "@components/user_interface/general/loader.vue";

import { IconCheck, IconArrowBackUp, IconMinus, IconPlus, IconRefresh, IconPlayerStop, IconPlayerPlay } from "@tabler/icons-vue";
import { inject, ref } from "vue";
import { useRoute } from "vue-router";

export default {
    components: {
        IconCheck,
        IconArrowBackUp,
        IconMinus,
        IconPlus,
        IconRefresh,
        IconPlayerStop,
        IconPlayerPlay,
        loading: loading,
        "section-header": sectionHeader,
    },
    setup() {
        const socket = inject("socket");
        let plugin = ref(null);
        let loaded = ref(false);

        console.log(useRoute());
        //getPlugin

        const getPlugin = (name) => {
            loaded.value = false;

            socket.once("plugin:get", (plugin) => {
                plugin.value = plugin;

                loaded.value = true;
                console.log(plugin.value);
            });

            socket.emit("plugin:get", name);
        };

        //saveConfig
        //updateConfig
        //unloadPlugin
        //loadPlugin
        //reloadPlugin
        //togglePlugin

        return {
            plugin,
            loaded,
            getPlugin,
        };
    },
};
</script>
