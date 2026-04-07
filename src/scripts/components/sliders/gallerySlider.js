// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Слайдер в секции Галерея (splidejs)
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";

export function initGallerySlider() {
    const container = document.querySelector("#gallery-slider .splide");
    const bar = document.querySelector("#gallery-slider .splide__progress-bar");

    if (!container || !bar) return;

    const splide = new Splide(container, {
        type: "loop",
        perPage: 1,
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 2000,
        focus: "center",
        gap: "1.5rem",
        pauseOnHover: false,
        pauseOnFocus: false,
        padding: "30%",

        breakpoints: {
            640: {
                padding: "2rem",
            },

            840: {
                padding: "4rem",
            },

            1024: {
                padding: "10rem",
            },

            1536: {
                padding: "20%",
            },
        },
    });

    splide.on("mounted move", function () {
        const end = splide.Components.Controller.getEnd() + 1;
        const rate = Math.min((splide.index + 1) / end, 1);
        bar.style.width = String(100 * rate) + "%";
    });

    splide.mount();
}
