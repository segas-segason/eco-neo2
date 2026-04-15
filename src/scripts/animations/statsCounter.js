// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Анимация счетчика секции Статистики
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStatsCounter() {
    const statsSection = document.querySelector("[data-stats]");
    const counters = statsSection.querySelectorAll("[data-counter]");

    if (!statsSection || !counters.length) return;

    counters.forEach((counter) => {
        const endValue = Number(counter.dataset.counter);
        const obj = { val: 0 };

        gsap.to(obj, {
            val: endValue,
            duration: 3.5,
            snap: { val: 1 },

            onUpdate: () => {
                counter.textContent = Math.round(obj.val);
            },

            scrollTrigger: {
                trigger: statsSection,
                start: "top 100%",
            },
        });
    });
}
