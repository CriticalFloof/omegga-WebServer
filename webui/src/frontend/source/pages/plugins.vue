<style scoped lang="scss">
@import "@css/style";

.main-content {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.generic-container {
    margin-left: 8px;
    display: flex;
    flex-direction: row;
    flex: 1;
}

.plugin-list-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    margin-right: 16px;
    .input {
        max-width: 300px;
        margin-right: 8px;
        flex: 1;
        width: 100%;
    }
}

.plugins-list {
    @include column-container;
    margin-top: 8px;

    .plugin-item {
        background-color: $br-button-normal;
        margin-bottom: 8px;
        margin-right: 8px;
        display: flex;
        align-items: center;
        height: 48px;
        font-size: 20px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        text-decoration: none;

        &:hover,
        .router-link-active {
            background-color: $br-element-hover;
        }
        &:active,
        &.disabled {
            background-color: $br-element-pressed;
        }

        .icon {
            @include center;
            height: 32px;
            width: 32px;
            margin-left: 8px;
            margin-right: 8px;

            &.running {
                background-color: $br-main-normal;
            }
            &.bugged {
                background-color: $br-warn-normal;
            }
            &.broken {
                background-color: $br-error-normal;
            }
            &.disabled {
                background-color: $br-bg-primary;
            }
        }
    }
}
</style>

<template>
    <page-header title="Plugins"></page-header>

    <div class="main-content">
        <site-navigation />
        <div class="generic-container">
            <div class="plugin-list-container">
                <section-header>
                    <omegga-input placeholder="Search Plugins..." v-model="search" />
                    <span style="flex: 1" />
                    <omegga-button icon normal data-tooltip="Refresh plugin list" @click="getPlugins()">
                        <IconRotate />
                    </omegga-button>
                </section-header>
                <div class="plugins-list">
                    <scroll-container>
                        <div v-for="plugin in plugins">
                            <router-link
                                v-if="matchesSearch(plugin)"
                                :to="'/plugins/' + plugin.path"
                                :key="plugin.path"
                                :data-tooltip="plugin.documentation && plugin.documentation.description"
                                class="plugin-item"
                            >
                                <component :is="plugin.icon" :class="[plugin.status, 'icon']" :data-tooltip="plugin.tooltip" />
                                {{ plugin.name }}
                            </router-link>
                        </div>
                    </scroll-container>
                    <loading :active="!loaded" size="huge">Loading Plugins</loading>
                </div>
            </div>
            <inspector />
        </div>
    </div>

    <effect-layer effects="blur(6px)" style="z-index: -500" />
</template>

<script>
import { inject, ref } from "vue";

import siteNavigation from "@components/user_interface/navigation/site_navigation.vue";
import pageHeader from "@components/user_interface/general/page_header.vue";
import sectionHeader from "@components/user_interface/general/section_header.vue";
import effectLayer from "@components/visual_candy/effect_layer.vue";
import input from "@components/user_interface/interaction/input.vue";
import button from "@components/user_interface/interaction/button.vue";
import scrollContainer from "@components/user_interface/general/scroll.vue";
import loading from "@components/user_interface/general/loader.vue";
import inspector from "@components/plugins/inspector.vue";

import { IconRotate, IconPower, IconAlertCircle, IconBug, IconCircleCheck } from "@tabler/icons-vue";

export default {
    components: {
        IconPower,
        IconAlertCircle,
        IconBug,
        IconCircleCheck,
        IconRotate,
        inspector: inspector,
        loading: loading,
        "scroll-container": scrollContainer,
        "omegga-button": button,
        "omegga-input": input,
        "site-navigation": siteNavigation,
        "effect-layer": effectLayer,
        "page-header": pageHeader,
        "section-header": sectionHeader,
    },
    setup() {
        const socket = inject("socket");
        let search = ref("");
        let loaded = ref(false);
        let plugins = ref([]);

        const getPlugins = () => {
            loaded.value = false;
            socket.once("pluginslist:get", (pluginList) => {
                plugins.value = pluginList;

                for (const plugin in pluginList) {
                    updatePluginIcon(pluginList[plugin]);
                }

                loaded.value = true;
            });
            socket.emit("pluginslist:get");
        };

        const matchesSearch = (p) => {
            return p.name.includes(search.value);
        };

        const updatePluginIcon = (p) => {
            p.state = (p.isLoaded ? 2 : 0) + (p.isEnabled ? 1 : 0);
            p.status = ["disabled", "broken", "bugged", "running"][p.state];
            p.tooltip = ["Plugin is disabled", "Plugin is enabled but not running", "Plugin is running but not enabled", "Plugin is running"][
                p.state
            ];
            p.icon = ["IconPower", "IconAlertCircle", "IconBug", "IconCircleCheck"][p.state];
        };

        return {
            getPlugins,
            matchesSearch,
            plugins,
            loaded,
            search,
        };
    },
};
</script>
