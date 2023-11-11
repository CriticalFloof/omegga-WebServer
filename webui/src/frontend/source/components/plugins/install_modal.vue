<style scoped lang="scss">
@import "@css/style.scss";

.window {
    text-align: center;
    color: white;
    font-family: "Glacial Indifference";
    min-height: 320px;
    min-width: 400px;
    width: 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search {
    width: calc(100% - 32px);

    > .search-item {
        margin-bottom: 8px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    padding: 16px 0;
}

.info {
    font-size: 12px;
    min-width: 200px;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
        text-decoration: none;
        width: 180px;
    }
}

.downloader {
    font-size: 24px;
    width: 360px;
    padding: 16px 0;
    p {
        margin: 0.5em 0;
    }
}
</style>

<template>
    <omegga-modal :visible="visible">
        <div>
            <section-header>
                <span>Plugin Installer</span>
                <span style="flex: 1" />
                <omegga-button error icon @click="togglerFunction(false)">
                    <IconArrowBackUp />
                </omegga-button>
            </section-header>
            <div class="window">
                <div class="search">
                    <omegga-input class="search-item" placeholder="Enter Plugin Author..." @input="(newValue) => (pluginAuthor = newValue)" />
                    <omegga-input class="search-item" placeholder="Enter Plugin Name..." @input="(newValue) => (pluginName = newValue)" />
                </div>
                <div class="info">
                    <p>You can look at the omegga topic on github to find plugins!</p>
                    <a href="https://github.com/topics/omegga" target="_blank">
                        <omegga-button warn data-tooltip="https://github.com/topics/omegga">
                            <IconBrandGithub />
                            Github
                        </omegga-button>
                    </a>
                </div>
                <div class="downloader">
                    <p>
                        {{ "Status message" }}
                    </p>
                    <omegga-button main data-tooltip="Search github and install if a plugin is found." @click="console.log('not implemented')">
                        <IconDownload />
                        Install
                    </omegga-button>
                    <p>Loading bar goes here</p>
                </div>
            </div>
        </div>
    </omegga-modal>
</template>

<script>
import { inject, ref } from "vue";

import modal from "@components/user_interface/general/modal.vue";
import sectionHeader from "@components/user_interface/general/section_header.vue";
import button from "@components/user_interface/interaction/button.vue";
import input from "@components/user_interface/interaction/input.vue";

import { IconDownload, IconBrandGithub, IconArrowBackUp } from "@tabler/icons-vue";

export default {
    components: {
        IconArrowBackUp,
        IconDownload,
        IconBrandGithub,
        "omegga-input": input,
        "omegga-button": button,
        "omegga-modal": modal,
        "section-header": sectionHeader,
    },
    setup() {
        const socket = inject("socket");

        let pluginAuthor = ref("");
        let pluginName = ref("");

        return {
            pluginAuthor,
            pluginName,
        };
    },
    props: {
        visible: Boolean,
        togglerFunction: Function,
    },
};
</script>
