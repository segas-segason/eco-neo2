// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация секции Специальные предложения
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStartSectionSpecialOffers() {
    const section = document.querySelector("[data-special-offers]");
    const title = document.querySelector("[data-special-offers-title]");
    const cards = document.querySelectorAll("[data-special-offers-card]");

    if (!section || !title || !cards.length) return;

    const firstCard = cards[0];
    const otherCards = Array.from(cards).slice(1);

    gsap.set(title, { opacity: 0, yPercent: -100 });

    otherCards.forEach((card, index) => {
        gsap.set(card, {
            yPercent: -50,
            opacity: 0,
            zIndex: -(index + 1),
        });
    });

    const tl = gsap.timeline({
        paused: true,

        scrollTrigger: {
            trigger: section,
            start: "top 90%",
        },
    });

    tl.to(title, {
        delay: 0.3,
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        ease: "power2.out",
    });

    tl.from(firstCard, {
        opacity: 0,
        yPercent: 10,
        duration: 0.6,
        ease: "power2.out",
    });

    otherCards.forEach((card) => {
        tl.to(
            card,
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
            },
            "-=0.2",
        );
    });
}
