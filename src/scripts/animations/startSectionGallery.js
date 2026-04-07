// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация для секции Галерея
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStartSectionGallery() {
    const section = document.querySelector("#gallery-slider");
    const container = document.querySelector("#gallery-slider .splide");
    const slides = document.querySelectorAll("#gallery-slider .splide__slide");
    const progress = document.querySelector("#gallery-slider .splide__progress");

    if (!section || !container || !slides.length || !progress) return;

    gsap.set(container, {
        autoAlpha: 0,
        yPercent: -10,
    });

    gsap.set(slides, {
        autoAlpha: 0,
        yPercent: -10,
    });

    gsap.set(progress, {
        autoAlpha: 0,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 100%",
        },
    });

    tl.to(container, {
        autoAlpha: 1,
        yPercent: 0,
        ease: "back.out",
        duration: 0.5,
    })
        .to(
            slides,
            {
                autoAlpha: 1,
                stagger: 0.2,
                ease: "back.out",
                yPercent: 0,
            },
            "<",
        )
        .to(
            progress,
            {
                autoAlpha: 1,
                ease: "power2.out",
                duration: 0.5,
            },
            "<",
        );
}
