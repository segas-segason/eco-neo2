// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация секции Что включено
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function initStartSectionIncluded() {
    const container = document.querySelector("[data-included]");
    const image = document.querySelector("[data-included-image]");
    const checkList = document.querySelectorAll("[data-included-item]");
    const plusList = document.querySelectorAll("[data-included-add-item]");
    const addTitle = document.querySelector("[data-included-add-title]");

    if (!container || !image || !checkList.length || !plusList.length || !addTitle) return;

    gsap.set(image, {
        autoAlpha: 0,
        xPercent: -30,
    });

    const listOfAllItems = [...checkList, addTitle, ...plusList]; // Один массив, для появления всех пунктов по очереди

    gsap.set(listOfAllItems, {
        autoAlpha: 0,
        xPercent: 10,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 90%",
        },
    });

    tl.to(image, {
        autoAlpha: 1,
        xPercent: 0,
        ease: "power2.out",
        duration: 0.8,
    })

        .to(
            listOfAllItems,
            {
                autoAlpha: 1,
                xPercent: 0,
                ease: "power2.out",
                stagger: 0.05,
            },
            "<",
        );
}
