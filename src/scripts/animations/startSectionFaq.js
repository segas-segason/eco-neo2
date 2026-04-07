// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация для секции Вопросы и ответы
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStartSectionFaq() {
    const section = document.querySelector("[data-faq]");
    const title = document.querySelector("[data-faq-title]");
    const items = document.querySelectorAll("[data-accordion-item]");

    if (!section || !title || !items.length) return;

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
        delay: 0.3,
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.out",
    })

        .from(items, {
            opacity: 0,
            yPercent: 100,
            stagger: 0.1,
        });
}
