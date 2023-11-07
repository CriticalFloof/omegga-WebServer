import { createRouter, createWebHashHistory } from "vue-router";

import Dashboard from "@pages/dashboard.vue";
import History from "@pages/history.vue";
import Plugins from "@pages/plugins.vue";
import PluginsInspector from "@components/plugins/inspector.vue";

const routes = [
    { path: "/", component: Dashboard },
    { path: "/history", component: History },
    {
        name: "plugins",
        path: "/plugins",
        component: Plugins,
        children: [
            {
                name: "plugins",
                path: "/plugins/:id",
                component: PluginsInspector,
            },
        ],
    },
];

const router = createRouter({
    mode: "history",
    history: createWebHashHistory("/"),
    routes,
});

export default router;
