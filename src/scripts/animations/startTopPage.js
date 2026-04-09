// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация Верхней части сайта: топ-меню, Hero, секции Статистики и секции Возможности
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const SELS = {
    menu: "[data-menu-shell]",
    logo: "[data-hero-logo]",
    title: "[data-hero-title]",
    desc: "[data-hero-desc]",
    light: "[data-hero-light]",
    home: "[data-hero-home]",
    about: "[data-section-about]",
};

let parallaxHandler = null;

export function initStartTopPage() {
    const init = () => initStartTopPageLogic();
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
}

function initStartTopPageLogic() {
    const els = Object.values(SELS).map((s) => document.querySelector(s));
    const [menu, logo, title, desc, light, home, about] = els;

    let splitTitle, splitDesc;

    if (!menu || !logo || !title || !desc || !light || !home) return;

    gsap.killTweensOf(els);

    gsap.set(els, { clearProps: "all" });

    gsap.set([menu, logo], {
        autoAlpha: 0,
        yPercent: -50,
    });

    gsap.set(light, {
        autoAlpha: 0,
        xPercent: 10,
        rotate: "90deg",
    });

    gsap.set(home, {
        autoAlpha: 0,
    });

    gsap.set(about, {
        autoAlpha: 0,
        yPercent: 10,
    });

    gsap.set([home, light], {
        willChange: "transform",
    });

    const tl = gsap.timeline({
        onComplete: () => gsap.set(light, { clearProps: "rotate" }),
    });

    tl.to(menu, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.7,
        ease: "elastic(1.2, 1)",
        delay: 0.5,
    })

        .to(
            about,
            {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.5,
                ease: "elastic(1.2, 1)",
            },
            "<",
        )

        .to(
            logo,
            {
                autoAlpha: 1,
                yPercent: 0,
                duration: 1,
                ease: "elastic(1.2, 1)",
            },
            "-=0.5",
        )

        .to(
            light,
            {
                autoAlpha: 0.5,
                duration: 0.5,
                ease: "power2.out",
            },
            "<",
        )

        .to(
            light,
            {
                xPercent: 0,
                rotate: "0deg",
                duration: 1.2,
                ease: "back.out(0.6)",

                onStart: () => {
                    gsap.to(home, {
                        autoAlpha: 1,
                        ease: "elastic(1, 0.8)",
                        duration: 1.2,

                        onComplete: () =>
                            startParallax([
                                { el: home, invert: true },
                                { el: light, invert: false },
                            ]),
                    });
                },
            },
            "<",
        );

    document.fonts.ready.then(() => {
        splitTitle = new SplitText(title, {
            type: "lines, words",
            tag: "span",
            wordDelimiter: {
                delimiter: "|",
            },
        });

        splitDesc = new SplitText(desc, {
            type: "lines, words",
            tag: "span",
        });

        const words = [...(splitTitle?.words || []), ...(splitDesc?.words || [])];

        gsap.set(words, {
            autoAlpha: 0,
        });

        tl.to(
            splitTitle.words,
            {
                autoAlpha: 1,
                stagger: 0.05,
                ease: "power2.out",
            },
            "-=0.9",
        )

            .to(
                splitDesc.words,
                {
                    autoAlpha: 1,
                    stagger: 0.05,
                    ease: "power2.out",
                },
                "-=0.3",
            );
    });
}

function startParallax(heroes) {
    const maxOffset = 15;
    if (parallaxHandler) window.removeEventListener("mousemove", parallaxHandler);

    heroes.forEach((h) => {
        if (h.el) {
            gsap.set(h.el, { x: 0 });
            h.currentX = 0;
            h.el.style.willChange = "transform";
        }
    });

    let ticking = false;
    let lastMouseX = 0;

    parallaxHandler = (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * maxOffset * 2;

                if (Math.abs(mouseX - lastMouseX) > 0.01) {
                    lastMouseX = mouseX;

                    heroes.forEach((h) => {
                        if (!h.el) return;

                        const targetX = mouseX * (h.invert ? -1 : 1);

                        if (Math.abs(targetX - h.currentX) > 0.01) {
                            gsap.to(h.el, {
                                x: targetX,
                                duration: 0.4,
                                ease: "power2.out",
                                overwrite: true,

                                onUpdate: () => {
                                    h.currentX = targetX;
                                },
                            });
                        }
                    });
                }
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener("mousemove", parallaxHandler);
}

export function cleanupStartTopPage() {
    if (parallaxHandler) {
        window.removeEventListener("mousemove", parallaxHandler);
        parallaxHandler = null;
    }
    gsap.killTweensOf("*");
    document.querySelectorAll(Object.values(SELS).join(", ")).forEach((el) => el.removeAttribute("style"));
}
