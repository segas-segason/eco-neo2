import { stats } from "../data/stats";
import { renderStats } from "../components/stats/renderStats";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStatsSection() {
    const container = document.getElementById("stats");
    if (!container) return;

    renderStats(container, stats);

    const statsSection = document.querySelector("[data-stats]");
    if (!statsSection) return;

    const counters = statsSection.querySelectorAll("[data-counter]");
    if (counters.length === 0) return;

    counters.forEach((counter) => {
        const endValue = Number(counter.dataset.counter);
        const obj = { val: 0 };

        gsap.to(obj, {
            val: endValue,
            duration: 2,
            ease: "power2.out",
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
