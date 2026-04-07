// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация для секции Почему мы
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStartSectionWhyUs() {
    const section = document.querySelector("[data-whyus-section]");
    const image = document.querySelector("[data-whyus-img]");
    const cards = document.querySelectorAll("[data-whyus-card]");

    if (!section || !image || !cards.length) return;

    gsap.set(image, {
        autoAlpha: 0,
        xPercent: -30,
    });

    gsap.set(cards, {
        autoAlpha: 0,
        yPercent: -100,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
    });

    tl.to(image, {
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
        xPercent: 0,
    })

        .to(
            cards,
            {
                stagger: 0.1,
                autoAlpha: 1,
                ease: "power2.out",
                yPercent: 0,
            },
            "<",
        );
}
