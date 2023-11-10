<style scoped lang="scss">
@import "@css/style.scss";

.container {
    width: 30vw;
}
</style>

<template>
    <omegga-modal :visible="visible">
        <div class="container">
            <section-header>
                <span>Plugin Installer</span>
                <span style="flex: 1" />
                <omegga-button error icon @click="togglerFunction(false)">
                    <IconArrowBackUp />
                </omegga-button>
            </section-header>
            <div style="height: 320px; width: 100%"></div>
        </div>
    </omegga-modal>
</template>

<script>
import inject from "vue";

import modal from "@components/user_interface/general/modal.vue";
import sectionHeader from "@components/user_interface/general/section_header.vue";
import button from "@components/user_interface/interaction/button.vue";

import { IconArrowBackUp } from "@tabler/icons-vue";

export default {
    components: {
        IconArrowBackUp,
        "omegga-button": button,
        "omegga-modal": modal,
        "section-header": sectionHeader,
    },
    setup() {
        const socket = inject("socket");
        return {};
    },
    props: {
        visible: Boolean,
        togglerFunction: Function,
    },
};
</script>
