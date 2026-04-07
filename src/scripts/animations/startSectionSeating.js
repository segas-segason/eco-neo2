// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация для секции Варианты рассадки
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStartSectionSeating() {
    const container = document.querySelector("#tabs-slider");
    const title = document.querySelector("[data-seating-title]");
    const tabs = document.querySelectorAll("#tabs-slider .splide__tab");
    const images = document.querySelectorAll("#tabs-slider .splide__image");

    if (!container || !title || !tabs.length || !images.length) return;

    gsap.set(title, {
        autoAlpha: 0,
        yPercent: -100,
    });

    gsap.set(tabs, {
        autoAlpha: 0,
        yPercent: -50,
    });

    gsap.set(images, {
        autoAlpha: 0,
        xPercent: -10,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 90%",
        },
    });

    tl.to(title, {
        delay: 0.3,
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.out",
    })
        .to(
            tabs,
            {
                autoAlpha: 1,
                stagger: 0.2,
                ease: "power2.out",
                yPercent: 0,
            },
            "<",
        )

        .to(
            images,
            {
                autoAlpha: 1,
                ease: "power2.out",
                duration: 1,
                xPercent: 0,
            },
            "<",
        );
}
