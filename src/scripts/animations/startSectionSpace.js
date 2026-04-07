// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация для секции Пространство
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStartSectionSpace() {
    const section = document.querySelector("[data-space]");
    const title = document.querySelector("[data-space-title]");
    const cards = document.querySelectorAll("[data-space-card]");

    if (!section || !title || !cards.length) return;

    gsap.set(title, {
        opacity: 0,
        yPercent: -100,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
    });

    tl.to(title, {
        opacity: 1,
        duration: 0.5,
        yPercent: 0,
        ease: "power2.out",
    })

        .from(cards, {
            opacity: 0,
            yPercent: 10,
            stagger: 0.1,
        });
}
