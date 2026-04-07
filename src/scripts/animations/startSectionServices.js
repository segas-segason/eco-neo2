// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация для секции Услуги
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStartSectionServices() {
    const section = document.querySelector("[data-services-section]");
    const cards = document.querySelectorAll("[data-service-card]");

    if (!section || !cards.length) return;

    gsap.set(cards, {
        opacity: 0,
        yPercent: -10,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
    });

    tl.to(cards, {
        opacity: 1,
        yPercent: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
    });
}
