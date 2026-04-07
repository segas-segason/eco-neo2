import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export function initFancyboxAppGallery() {
    const cloneSlides = document.querySelectorAll(".splide__slide.splide__slide--clone [data-fancybox]");

    cloneSlides.forEach((el) => {
        el.removeAttribute("data-fancybox");
    });

    const gallerySlides = document.querySelectorAll("[data-fancybox]");

    if (gallerySlides.length) {
        Fancybox.bind(gallerySlides, {});
    }
}
