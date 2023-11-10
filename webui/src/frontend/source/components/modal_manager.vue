<style scoped lang="scss">
@import "@css/style.scss";
</style>

<template>
    <install-modal :visible="modals.plugins.install ? true : null" :togglerFunction="modalToggleFactory(['plugins', 'install'])" />
</template>

<script>
import { inject, ref } from "vue";
import installModal from "@components/plugins/install_modal.vue";
import modal from "@components/user_interface/general/modal.vue";

export default {
    components: {
        "omegga-modal": modal,
        "install-modal": installModal,
    },
    setup() {
        const store = inject("store");

        const modals = ref({
            plugins: {
                install: false,
                uninstall: false,
            },
        });

        const modalToggleFactory = (path) => {
            return (newState) => {
                const modals = store.get("modal");

                let funcString = "modals.value";
                for (let i = 0; i < path.length; i++) {
                    funcString += `.${path[i]}`;
                }
                funcString += ` = newState;`;

                const setPathProperty = new Function("modals", "newState", funcString);

                setPathProperty(modals, newState);

                store.set("modal", modals);
            };
        };

        store.set("modal", modals);

        return {
            modals: modals,
            modalToggleFactory,
        };
    },
};
</script>
