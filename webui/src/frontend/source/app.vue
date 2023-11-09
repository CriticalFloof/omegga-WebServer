<template>
    <main-page />
</template>

<script>
import { ref, onMounted, provide } from "vue";
import main from "@pages/main.vue";
import io from "socket.io-client";
import ClientAPI from "./client_api.ts";
import GlobalStore from "./global_store.ts";

export default {
    components: {
        "main-page": main,
    },
    setup: () => {
        const store = new GlobalStore();
        const clientApi = new ClientAPI(store);

        console.log("Starting Connection to WebSocket Server.");
        const socket = io("http://localhost:8081");

        socket.on("connect", () => {
            clientApi.inject(socket);
            console.log("Client Connected with server");
        });

        provide("socket", socket);
        provide("store", store);
    },
};
</script>
