<style lang="scss" scoped>
@import "@css/theme";

.site-nav-container {
    width: 350px;
    margin-top: -8px;
    margin-right: 8px;
}
</style>

<template>
    <div class="site-nav-container">
        <menu-button :disabled="false" route="">
            <IconDashboard style="background: #de4f43" class="icon" />
            <span>Dashboard</span>
        </menu-button>
        <menu-button :disabled="false" route="history">
            <IconMessages style="background: #008bd6" class="icon" />
            <span>History</span>
        </menu-button>
        <menu-button :disabled="false" route="plugins">
            <IconPlug style="background: #00b35f" class="icon" />
            <span>Plugins</span>
        </menu-button>
        <menu-button :disabled="false" route="">
            <IconList style="background: #b3006b" class="icon" />
            <span>Players</span>
        </menu-button>
        <menu-button :disabled="false" route="">
            <IconChartLine style="background: #00b0bd" class="icon" />
            <span>Metrics</span>
        </menu-button>
        <menu-button :disabled="false" route="">
            <IconDeviceFloppy style="background: #1ed4d1" class="icon" />
            <span>Saves</span>
        </menu-button>
        <menu-button :disabled="false" route="">
            <IconAdjustmentsAlt style="background: #c4bb02" class="icon" />
            <span>Settings</span>
        </menu-button>
        <menu-button :disabled="false" route="">
            <IconServer style="background: #453d9c" class="icon" />
            <span>Server</span>
        </menu-button>
        <menu-button :disabled="false" route="">
            <IconUsers style="background: #7f0b8a" class="icon" />
            <span>Users</span>
        </menu-button>
    </div>
</template>

<script>
import menuButton from "./button_navigation.vue";

import {
    IconDashboard,
    IconMessages,
    IconPlug,
    IconList,
    IconUsers,
    IconChartLine,
    IconDeviceFloppy,
    IconAdjustmentsAlt,
    IconServer,
} from "@tabler/icons-vue";

/**
 *  For site navigation. Only one of these is nessesary.
 */
export default {
    components: {
        "menu-button": menuButton,
        IconDashboard,
        IconMessages,
        IconPlug,
        IconList,
        IconUsers,
        IconChartLine,
        IconDeviceFloppy,
        IconAdjustmentsAlt,
        IconServer,
    },
};
</script>
