<style scoped lang="scss">
.reactive-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: black;
}

.reactive-background-container {
    --x: 0px;
    --y: 0px;
    --sensitivity_offset_per: 0%;
    --background_padding: 8px;
    --blur_thickness: 0px;

    position: absolute;

    transform: translate(var(--x), var(--y));
    transition: transform 1.2s ease-out;

    left: calc(-50% * var(--sensitivity_offset_per) - var(--background_padding) + var(--blur_thickness));
    top: calc(-50% * var(--sensitivity_offset_per) - var(--background_padding) + var(--blur_thickness));

    width: calc(100% + 100% * var(--sensitivity_offset_per) + var(--background_padding) + var(--blur_thickness));
    height: calc(100% + 100% * var(--sensitivity_offset_per) + var(--background_padding) + var(--blur_thickness));
}

.reactive-background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0%;
    object-fit: cover;
}

.reactive-background-image:first-child {
    z-index: calc(inherit + 2);
}

.reactive-background-image:last-child {
    opacity: 100%;
    z-index: calc(inherit + 1);
}

.reactive-background-image.active {
    animation-name: fade-in;
    animation-duration: 7s;
    animation-timing-function: cubic-bezier(0.51, 0.22, 0.86, 0.42);
    animation-direction: normal;
    animation-fill-mode: forwards;
}

@keyframes fade-in {
    from {
        opacity: 0%;
    }
    to {
        opacity: 100%;
    }
}
</style>

<template>
    <div class="reactive-background">
        <div class="reactive-background-container">
            <img class="reactive-background-image" src="" baseSrc="../public/source/assets/backgrounds/" />
            <img class="reactive-background-image" src="" baseSrc="../public/source/assets/backgrounds/" />
            <slot />
        </div>
    </div>
</template>

<script>
let bTimerActive = true;

//This list is temporary until I figure out how to get these names via the contents on the assets' directory.
let backgroundNames = [
    "bakery.png",
    "bedroom.png",
    "crystal.png",
    "dance_plaza.png",
    "dark_castle.png",
    "datacore.png",
    "drift.png",
    "fancy_bar.png",
    "great_hall.png",
    "mall.png",
    "military_base.png",
    "rapidcore.png",
    "resturant.png",
    "stage.png",
];

/**
 *  Standard background, with some visual flair. Only one should be loaded to the DOM.
 */
export default {
    mounted() {
        let currentBackground = backgroundNames[Math.floor(Math.random() * backgroundNames.length)];
        let incomingBackground = currentBackground;

        const backgroundMouseSensitivity = 0.05;

        const backgroundContainer = document.getElementsByClassName("reactive-background-container");

        for (let i = 0; i < backgroundContainer.length; i++) {
            const container = backgroundContainer[i];

            container.style.setProperty("--sensitivity_offset_per", backgroundMouseSensitivity);

            const backgroundImages = document.getElementsByClassName("reactive-background-image");

            backgroundImages[0].style.zIndex = parseInt(this.$el.style.zIndex) + 2;
            backgroundImages[1].style.zIndex = parseInt(this.$el.style.zIndex) + 1;

            backgroundImages[0].setAttribute("src", backgroundImages[1].getAttribute("baseSrc") + currentBackground);
            backgroundImages[1].setAttribute("src", backgroundImages[1].getAttribute("baseSrc") + incomingBackground);

            const interval = setInterval(() => {
                if (!bTimerActive) {
                    console.log("Deactivated");
                    clearInterval(interval);
                    return;
                }

                // Start the background transition fade-in on the upper background.
                backgroundImages[0].classList.add("active");
                setTimeout(() => {
                    // Overwrite the lower background image to the upper one.
                    currentBackground = incomingBackground;
                    backgroundImages[1].setAttribute("src", backgroundImages[1].getAttribute("baseSrc") + currentBackground);
                }, 10000);

                setTimeout(() => {
                    // Make the upper background invisible..
                    backgroundImages[0].classList.remove("active");
                }, 10050);

                setTimeout(() => {
                    // Overwrite the upper background with a new random image.
                    incomingBackground = findNewBackground(currentBackground);
                    backgroundImages[0].setAttribute("src", backgroundImages[0].getAttribute("baseSrc") + incomingBackground);
                }, 10100);
            }, 3 * 60 * 1000);

            document.addEventListener("mousemove", (event) => {
                const x = event.clientX - window.innerWidth / 2;
                const y = event.clientY - window.innerHeight / 2;
                container.style.setProperty("--x", -(x * backgroundMouseSensitivity) + "px");
                container.style.setProperty("--y", -(y * backgroundMouseSensitivity) + "px");
            });
        }
    },

    unmounted() {
        bTimerActive = false;
    },
};

function findNewBackground(current) {
    let name = current ? current : "";
    for (let i = 0; i < 10; i++) {
        if (name !== current) break;
        name = backgroundNames[Math.floor(Math.random() * backgroundNames.length)];
    }

    return name;
}
</script>
