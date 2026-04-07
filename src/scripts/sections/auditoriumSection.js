import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAuditoriumSection() {
    const section = document.querySelector("[data-auditorium-parallax]");
    const bg = document.querySelector("[data-auditorium-parallax-bg]");

    if (!bg) return;

    gsap.to(bg, {
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top ",
            scrub: true,

            onUpdate: (self) => {
                const progress = self.progress;
                const slowProgress = progress * 0.8;

                const y = -slowProgress * 200;

                gsap.set(bg, {
                    y: y,
                });
            },
        },
    });
}
