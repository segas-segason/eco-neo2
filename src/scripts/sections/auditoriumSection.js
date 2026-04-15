import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAuditoriumSection() {
    const section = document.querySelector("[data-auditorium-parallax]");
    const bg = document.querySelector("[data-auditorium-parallax-bg]");

    if (!bg || !section) return;

    // Анимация позиции Y
    gsap.to(bg, {
        yPercent: 10, // Смещение при скролле
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,

            onEnter: () => {
                gsap.set(bg, { position: "fixed", top: 0 });
            },

            onLeave: () => {
                gsap.set(bg, { position: "absolute", top: "auto" });
            },

            onEnterBack: () => {
                gsap.set(bg, { position: "fixed", top: 0 });
            },

            onLeaveBack: () => {
                gsap.set(bg, { position: "absolute", top: "auto" });
            },
        },
    });
}
