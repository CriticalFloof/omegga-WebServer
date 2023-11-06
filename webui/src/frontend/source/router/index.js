import { createRouter, createWebHashHistory } from "vue-router";

import Dashboard from "@pages/dashboard.vue";
import History from "@pages/history.vue";
import Plugins from "@pages/plugins.vue";

const routes = [
    { path: "/", component: Dashboard },
    { path: "/history", component: History },
    { path: "/plugins", component: Plugins },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
