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
    b {
        color: $br-boring-button-fg;
    }
}

.stats {
    padding: 8px;
    font-size: 24px;
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
</style>

<template>
    <div class="plugin-inspector-container">
        <section-header>
            <span>{{ inspectorTitle }}</span>
        </section-header>
        <div class="plugin-inspector">
            <div class="plugin-view">
                <loading :active="!loaded" size="huge">Loading Plugin</loading>
                <div class="plugin-info" v-if="loaded && currentPlugin">
                    <div class="stats">
                        <div class="stat" v-if="currentPlugin.name != null"><b data-tooltip="Plugin name">Name:</b> {{ currentPlugin.name }}</div>
                        <div class="stat" v-if="currentPlugin.documentation?.author != null">
                            <b data-tooltip="Plugin creator">Author:</b> {{ currentPlugin.documentation?.author }}
                        </div>
                        <div class="stat" v-if="currentPlugin.documentation?.description != null">
                            <b>Description:</b> {{ currentPlugin.documentation?.description }}
                        </div>
                        <div class="stat" v-if="currentPlugin.path != null">
                            <b data-tooltip="The folder this plugin runs in">Folder:</b> {{ currentPlugin.path }}
                        </div>
                        <div class="stat" v-if="currentPlugin.format != null">
                            <b data-tooltip="The type of plugin this is">Format:</b> {{ currentPlugin.format }}
                        </div>
                        <div class="stat" v-if="currentPlugin.objCount != null">
                            <b data-tooltip="Number of objects in the plugin's storage">Stored Objects:</b> {{ currentPlugin.objCount }}
                        </div>
                        <div class="stat" v-if="currentPlugin.isEnabled != null">
                            <b data-tooltip="Plugin can be started">Enabled:</b> {{ currentPlugin.isEnabled }}
                        </div>
                        <div class="stat" v-if="currentPlugin.isLoaded != null">
                            <b data-tooltip="Plugin is running">Loaded:</b> {{ currentPlugin.isLoaded }}
                        </div>
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
import { onBeforeRouteUpdate, useRoute } from "vue-router";

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
        let inspectorTitle = ref("");
        let currentPlugin = ref(null);
        let loaded = ref(true);

        const updatePluginInspectorTitle = () => {
            const name = currentPlugin.value ? currentPlugin.value.name : "Select a plugin".toUpperCase();
            inspectorTitle.value = name;
        };

        const getPlugin = (path) => {
            loaded.value = false;

            socket.once("plugin:get", (plugin) => {
                currentPlugin.value = plugin;
                console.log(currentPlugin.value);
                updatePluginInspectorTitle();

                loaded.value = true;
            });

            socket.emit("plugin:get", path, "path");
        };

        //saveConfig
        //updateConfig
        //unloadPlugin
        //loadPlugin
        //reloadPlugin
        //togglePlugin

        onBeforeRouteUpdate((to) => {
            getPlugin(to.params.id);
        });

        getPlugin(useRoute().params.id);

        return {
            currentPlugin,
            loaded,
            inspectorTitle,
            getPlugin,
        };
    },
};
</script>
