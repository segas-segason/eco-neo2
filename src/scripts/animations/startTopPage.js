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
    lightImage: "[data-hero-light-image]",
    light: "[data-hero-light]",
    home: "[data-hero-home-image]",
    about: "[data-section-about]",
    open: "[data-we-opened]",
};

export function initStartTopPage() {
    const init = () => initStartTopPageLogic();
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
}

function initStartTopPageLogic() {
    const els = Object.values(SELS).map((s) => document.querySelector(s));
    const [menu, logo, title, desc, light, lightImage, home, about, open] = els;

    let splitTitle, splitDesc;

    if (!menu || !logo || !title || !desc || !light || !lightImage || !home || !open) return;

    gsap.set(els, {
        autoAlpha: 0,
    });

    gsap.set([menu, logo], {
        yPercent: -50,
    });

    gsap.set(light, {
        scale: 0.6,
    });

    gsap.set(home, {
        yPercent: -10,
    });

    gsap.set(about, {
        yPercent: 10,
    });

    gsap.set(open, {
        yPercent: 10,
    });

    const tl = gsap.timeline({});

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
            open,
            {
                autoAlpha: 1,
                duration: 0.8,
                ease: "elastic(1.2, 1)",
                yPercent: 0,
            },
            "<",
        )

        .to(
            home,
            {
                autoAlpha: 1,
                duration: 0.8,
                ease: "elastic(1.2, 1)",
                yPercent: 0,
            },
            "<",
        )

        .to(
            light,
            {
                autoAlpha: 1,
                duration: 0.55,
                ease: "elastic(1.2, 2)",
                scale: 1,
            },
            "<",
        )

        .to(
            lightImage,
            {
                autoAlpha: 1,
            },
            "<",
        );

    document.fonts.ready.then(() => {
        gsap.set([title, desc], {
            autoAlpha: 1,
        });

        splitTitle = new SplitText(title, {
            type: "lines, words",
            tag: "span",
            wordDelimiter: {
                delimiter: "",
            },
        });

        splitDesc = new SplitText(desc, {
            type: "lines, words",
            tag: "span",
        });

        const titleWords = splitTitle.words || [];
        const descWords = splitDesc.words || [];

        gsap.set([...titleWords, ...descWords], {
            autoAlpha: 0,
        });

        tl.to(
            titleWords,
            {
                autoAlpha: 1,
                stagger: 0.05,
                ease: "power2.out",
            },

            "-=0.9",
        )

            .to(
                descWords,
                {
                    autoAlpha: 1,
                    stagger: 0.025,
                    ease: "power2.out",
                },

                "-=0.3",
            );
    });
}
