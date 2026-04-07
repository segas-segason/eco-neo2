// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация для секции Контакты
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStartSectionContacts() {
    const section = document.querySelector("[data-contacts]");
    const title = document.querySelector("[data-contacts-title]");
    const items = document.querySelectorAll("[data-contacts-item]");
    const map = document.querySelector("[data-contacts-map]");
    const icons = document.querySelectorAll("[data-contacts-social-icon]");
    const copy = document.querySelector("[data-contacts-copy]");

    if (!section || !title || !items.length || !icons.length || !map || !copy) return;

    gsap.set(title, {
        autoAlpha: 0,
        yPercent: -100,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
    });

    tl.to(
        title,
        {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.3,
            ease: "power2.out",
        },
        "<",
    )
        .from(items, {
            autoAlpha: 0,
            yPercent: 100,
            stagger: 0.1,
        })

        .from(map, {
            autoAlpha: 0,
            yPercent: -10,
        })

        .from(icons, {
            autoAlpha: 0,
            yPercent: 100,
            stagger: 0.1,
        })

        .from(copy, {
            autoAlpha: 0,
        });
}
