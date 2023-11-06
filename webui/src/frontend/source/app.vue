<template>
    <main-page />
</template>

<script>
import { ref, onMounted, provide } from "vue";
import main from "@pages/main.vue";
import io from "socket.io-client";

export default {
    components: {
        "main-page": main,
    },
    setup: () => {
        let socketIo = ref(io("http://localhost:8081"));

        onMounted(() => {
            console.log("Starting Connection to WebSocket Server.");
            let socket = socketIo.value;

            socket.on("connect", () => {
                console.log("Client Connected with server");
            });

            console.log(socket);

            provide("socket", socket);
        });

        return {
            socketIo: socketIo,
        };
    },
    methods: {},
};
</script>
