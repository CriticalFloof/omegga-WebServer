<style scoped lang="scss">
@import "@css/theme";

.main-content {
    display: flex;
    flex-direction: row;
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
</style>

<template>
    <page-header title="Plugins"></page-header>

    <div class="main-content">
        <site-navigation />
        <div class="generic-container">
            <div class="plugin-list-container">
                <section-header>
                    <omegga-input placeholder="Search Plugins..." />
                    <span style="flex: 1" />
                    <omegga-button icon normal data-tooltip="Refresh plugin list" @click="ping">
                        <IconRotate />
                    </omegga-button>
                </section-header>
                <div class="plugins-list">
                    <scroll-container>
                        <div v-for="plugin in plugins">
                            <div
                                is="router-link"
                                v-if="matches(plugin)"
                                :to="'/plugins/' + plugin.path"
                                :key="plugin.path"
                                :data-tooltip="plugin.documentation && plugin.documentation.description"
                                class="plugin-item"
                            >
                                <component :is="plugin.icon" :class="[plugin.status]" :data-tooltip="plugin.tooltip" />
                                {{ plugin.name }}
                            </div>
                        </div>
                    </scroll-container>
                    <loading :active="loading" size="huge">Loading Plugins</loading>
                </div>
            </div>
            <div class="plugin-inspector-container">
                <p>test</p>
            </div>
        </div>
    </div>

    <effect-layer effects="blur(6px)" style="z-index: -500" />
</template>

<script>
import { inject } from "vue";

import siteNavigation from "@components/user_interface/navigation/site_navigation.vue";
import pageHeader from "@components/user_interface/general/page_header.vue";
import sectionHeader from "@components/user_interface/general/section_header.vue";
import effectLayer from "@components/visual_candy/effect_layer.vue";
import input from "@components/user_interface/interaction/input.vue";
import button from "@components/user_interface/interaction/button.vue";
import scrollContainer from "@components/user_interface/general/scroll.vue";
import loading from "@components/user_interface/general/loader.vue";

import { IconRotate } from "@tabler/icons-vue";

export default {
    components: {
        IconRotate,
        "scroll-container": scrollContainer,
        loading: loading,
        "omegga-button": button,
        "omegga-input": input,
        "site-navigation": siteNavigation,
        "effect-layer": effectLayer,
        "page-header": pageHeader,
        "section-header": sectionHeader,
    },
    setup() {
        const socket = inject("socket");
        socket.on("ping", () => {
            console.log("pong!");
        });

        let ping = () => {
            console.log(socket);

            socket.emit("ping");
        };

        return {
            ping,
        };
    },
};
</script>
