<style scoped lang="scss">
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

.info {
    font-size: 24px;
    padding: 8px;
    color: white;
    font-weight: bold;
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
        <section-header class="header">
            <span>{{ inspectorTitle }}</span>
            <span style="flex: 1" />
            <router-link style="color: white" :to="'/plugins'">
                <omegga-button error icon v-if="currentPlugin">
                    <IconArrowBackUp />
                </omegga-button>
            </router-link>
        </section-header>

        <div class="plugin-inspector">
            <scroll-container>
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
                                <b data-tooltip="Plugin can be started">Enabled:</b> {{ currentPlugin.isEnabled ? "Yes" : "No" }}
                            </div>
                            <div class="stat" v-if="currentPlugin.isLoaded != null">
                                <b data-tooltip="Plugin is running">Loaded:</b> {{ currentPlugin.isLoaded ? "Yes" : "No" }}
                            </div>
                        </div>
                    </div>
                    <div class="plugin-info" v-if="loaded && !currentPlugin">
                        <span class="info">Select a plugin to inspect it.</span>
                        <div class="stats">
                            <div class="stat"><b data-tooltip="Amount of plugins installed">Installed:</b> {{ pluginsOverview.amount }}</div>
                            <div class="stat">
                                <b data-tooltip="Amount of plugins that can be started">Enabled:</b> {{ pluginsOverview.enabledAmount }}
                            </div>
                            <div class="stat">
                                <b data-tooltip="Amount of plugins that can not be started">Disabled:</b>
                                {{ pluginsOverview.disabledAmount }}
                            </div>
                            <div class="stat">
                                <b data-tooltip="Amount of plugins that are running but aren't enabled">Bugged:</b>
                                {{ pluginsOverview.buggedAmount }}
                            </div>
                            <div class="stat">
                                <b data-tooltip="Amount of plugins that are running">Loaded:</b> {{ pluginsOverview.loadedAmount }}
                            </div>
                        </div>
                    </div>
                </div>
            </scroll-container>
        </div>
    </div>
</template>
<script>
import sectionHeader from "@components/user_interface/general/section_header.vue";
import loading from "@components/user_interface/general/loader.vue";
import scrollContainer from "@components/user_interface/general/scroll.vue";
import button from "@components/user_interface/interaction/button.vue";

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
        "omegga-button": button,
        "section-header": sectionHeader,
        "scroll-container": scrollContainer,
    },
    setup() {
        const socket = inject("socket");
        const store = inject("store");
        let inspectorTitle = ref("");
        let pluginsOverview = ref(null);
        let currentPlugin = ref(null);
        let loaded = ref(true);

        const updatePluginInspectorTitle = () => {
            const name = currentPlugin.value ? currentPlugin.value.name : "Plugins Panel";
            inspectorTitle.value = name;
        };

        const listAllPluginStats = () => {
            const plugins = store.get("pluginslist");

            let pluginsInfo = {
                amount: plugins.length,
                enabledAmount: 0,
                disabledAmount: 0,
                buggedAmount: 0,
                loadedAmount: 0,
            };

            for (const i in plugins) {
                const plugin = plugins[i];
                if (!plugin.isLoaded && !plugin.isEnabled) pluginsInfo.disabledAmount++;
                if (!plugin.isLoaded && plugin.isEnabled) pluginsInfo.enabledAmount++;
                if (plugin.isLoaded && !plugin.isEnabled) pluginsInfo.buggedAmount++;
                if (plugin.isLoaded && plugin.isEnabled) pluginsInfo.loadedAmount++;
            }
            pluginsOverview.value = pluginsInfo;
        };

        const getPlugin = (path) => {
            loaded.value = false;

            socket.once("plugin:get", (plugin) => {
                currentPlugin.value = plugin;
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
        store.onKeyValueChanged("pluginslist", listAllPluginStats);

        return {
            currentPlugin,
            loaded,
            pluginsOverview,
            inspectorTitle,
            getPlugin,
        };
    },
};
</script>
