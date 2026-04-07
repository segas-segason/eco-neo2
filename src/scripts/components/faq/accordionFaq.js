import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAccordionFaq() {
    const items = document.querySelectorAll("[data-accordion-item]");

    if (!items.length) return;

    let openItem = null;
    let isAnimating = false;

    items.forEach((item) => {
        const content = item.querySelector("[data-accordion-content]");
        const plus = item.querySelector("[data-accordion-plus]");
        const minus = item.querySelector("[data-accordion-minus]");

        if (!content || !plus || !minus) return;

        gsap.set(content, {
            height: 0,
            opacity: 0,
            overflow: "hidden",
        });

        gsap.set(plus, {
            autoAlpha: 1,
            rotate: 0,
        });

        gsap.set(minus, {
            autoAlpha: 0,
            rotate: -90,
        });

        item.addEventListener("click", () => {
            if (isAnimating) return;
            isAnimating = true;

            if (openItem && openItem !== item) {
                const prevContent = openItem.querySelector("[data-accordion-content]");
                const prevPlus = openItem.querySelector("[data-accordion-plus]");
                const prevMinus = openItem.querySelector("[data-accordion-minus]");

                gsap.to(prevContent, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut",
                    marginTop: 0,
                });

                gsap.to(prevPlus, {
                    autoAlpha: 1,
                    rotate: 0,
                    duration: 0.25,
                    ease: "power2.out",
                });

                gsap.to(prevMinus, {
                    autoAlpha: 0,
                    rotate: -90,
                    duration: 0.25,
                    ease: "power2.out",
                });

                openItem = null;
            }

            const isOpen = content.offsetHeight > 0;

            const tlClick = gsap.timeline({
                onComplete: () => {
                    isAnimating = false;
                },
            });

            if (isOpen) {
                tlClick
                    .to(content, {
                        height: 0,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.inOut",
                        marginTop: 0,
                    })

                    .to(
                        plus,
                        {
                            autoAlpha: 1,
                            rotate: 0,
                            duration: 0.25,
                            ease: "power2.out",
                        },
                        "<",
                    )

                    .to(
                        minus,
                        {
                            autoAlpha: 0,
                            rotate: -90,
                            duration: 0.25,
                            ease: "power2.out",
                        },
                        "<",
                    )

                    .call(() => {
                        openItem = null;
                    });
            } else {
                tlClick
                    .to(content, {
                        height: content.scrollHeight,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.inOut",
                        marginTop: 24,
                    })

                    .to(
                        plus,
                        {
                            autoAlpha: 0,
                            rotate: 90,
                            duration: 0.25,
                            ease: "power2.out",
                        },
                        "<",
                    )

                    .to(
                        minus,
                        {
                            autoAlpha: 1,
                            rotate: 0,
                            duration: 0.25,
                            ease: "power2.out",
                        },
                        "<",
                    )

                    .call(() => {
                        openItem = item;
                    });
            }
        });
    });
}
