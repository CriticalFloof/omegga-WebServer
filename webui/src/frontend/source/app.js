import * as Vue from "vue";
import Application from "./app.vue";
import router from "@/router/index";

let app = Vue.createApp(Application);

app.use(router);

app.mount("#app");

export default app;
