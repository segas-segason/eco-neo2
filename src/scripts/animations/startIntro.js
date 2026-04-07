// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Стартовая анимация для Интро (показывается один раз)
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import { gsap } from "gsap";
import { Flip } from "gsap/flip";

gsap.registerPlugin(Flip);

let isIntroInited = false;

function explodeCircles(container, options = {}) {
    const { count = 30, minSize = 10, maxSize = 60, minScale = 0.8, maxScale = 2, duration = 1 } = options;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxDistance = Math.hypot(window.innerWidth, window.innerHeight);

    const circles = [];

    for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        const size = gsap.utils.random(minSize, maxSize);

        Object.assign(el.style, {
            position: "fixed",
            left: `${centerX}px`,
            top: `${centerY}px`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: "#a1c938",
            pointerEvents: "none",
            zIndex: "99999",
            transform: "translate(-50%, -50%)",
            opacity: "1",
        });

        document.body.appendChild(el);
        circles.push(el);
    }

    circles.forEach((circle) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = gsap.utils.random(maxDistance * 0.6, maxDistance);

        gsap.set(circle, { scale: 0, x: 0, y: 0, opacity: 1 });

        gsap.to(circle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            scale: gsap.utils.random(minScale, maxScale),
            opacity: 0,
            duration,
            ease: "power2.out",
            onComplete: () => circle.remove(),
        });
    });
}

export function initStartIntro() {
    return new Promise((resolve) => {
        const introShown = localStorage.getItem("introShown");

        if (introShown) {
            const intro = document.querySelector("[data-intro]");
            if (intro) {
                intro.style.display = "none";
            }
            document.documentElement.classList.add("intro-done");
            resolve();
            return;
        }

        if (isIntroInited) {
            resolve();
            return;
        }

        isIntroInited = true;

        const intro = document.querySelector("[data-intro]");
        if (!intro) {
            document.documentElement.classList.add("intro-done");
            resolve();
            return;
        }

        const box = intro.querySelector("[data-intro-box]");
        const leftShort = intro.querySelector("[data-intro-left-short]");
        const rightShort = intro.querySelector("[data-intro-right-short]");
        const grid = intro.querySelector("[data-intro-grid]");
        const hiddenLetters = intro.querySelectorAll("[data-hidden-letter]");

        if (!box || !leftShort || !rightShort || !grid || !hiddenLetters.length) {
            document.documentElement.classList.add("intro-done");
            resolve();
            return;
        }

        document.body.style.overflow = "hidden";

        gsap.set(intro, { autoAlpha: 1 });

        const mm = gsap.matchMedia();

        mm.add(
            {
                isMobile: "(max-width: 767px)",
                isTablet: "(min-width: 768px) and (max-width: 1023px)",
                isDesktop: "(min-width: 1024px)",
            },
            (context) => {
                const { isMobile, isTablet } = context.conditions;

                const config = {
                    rowGap: isMobile ? "12px" : isTablet ? "16px" : "24px",
                    firstFlipDuration: isMobile ? 0.35 : 0.4,
                    secondFlipDuration: isMobile ? 0.4 : 0.5,
                    hiddenLettersDuration: isMobile ? 0.6 : 0.8,
                    hiddenLettersDelay: isMobile ? 0.3 : 0.6,
                    boxFadeDuration: isMobile ? 0.7 : 0.9,
                    introFadeDuration: isMobile ? 0.7 : 1,
                    circleOptions: isMobile
                        ? {
                              count: 14,
                              minSize: 8,
                              maxSize: 28,
                              minScale: 0.7,
                              maxScale: 1.4,
                              duration: 0.9,
                          }
                        : isTablet
                          ? {
                                count: 20,
                                minSize: 10,
                                maxSize: 40,
                                minScale: 0.8,
                                maxScale: 1.6,
                                duration: 1,
                            }
                          : {
                                count: 30,
                                minSize: 10,
                                maxSize: 60,
                                minScale: 0.8,
                                maxScale: 2,
                                duration: 1.2,
                            },
                };

                gsap.set(box, {
                    scale: 2,
                });

                gsap.set(hiddenLetters, {
                    autoAlpha: 0,
                    width: 0,
                    display: "block",
                });

                gsap.set(grid, {
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1fr 0fr",
                    rowGap: "0",
                    columnGap: isMobile ? "8px" : isTablet ? "16px" : "24px",
                });

                gsap.set(leftShort, {
                    gridColumn: "1",
                    gridRow: "1",
                });

                gsap.set(rightShort, {
                    gridColumn: "2",
                    gridRow: "1",
                });

                const tl = gsap.timeline({
                    onComplete: () => {
                        document.body.style.overflow = "";
                        intro.style.display = "none";
                        document.documentElement.classList.add("intro-done");
                        localStorage.setItem("introShown", "true");
                        mm.revert();
                        resolve();
                    },
                });

                tl.to(box, {
                    opacity: 1,
                    duration: isMobile ? 0.7 : 0.9,
                    scale: 1,
                    ease: isMobile ? "power2.out" : "elastic.out(1.5, 0.5)",
                    force3D: true,
                    delay: 0.5,
                })
                    .to({}, { delay: isMobile ? 0.2 : 0.3 })

                    .add(() => {
                        const state = Flip.getState([rightShort, grid]);

                        rightShort.style.gridColumn = "2";
                        rightShort.style.gridRow = "2";
                        grid.style.gridTemplateRows = "1fr 1fr";
                        grid.style.rowGap = config.rowGap;

                        Flip.from(state, {
                            duration: 0.25,
                            ease: "power4",
                            absolute: false,
                            nested: true,
                        });
                    })

                    .to(rightShort, {
                        duration: 0.25,
                        ease: "power4",
                    })

                    .add(() => {
                        const state = Flip.getState([rightShort, grid]);

                        rightShort.style.gridColumn = "1";
                        rightShort.style.gridRow = "2";

                        grid.style.gridTemplateColumns = "1fr 0fr";
                        grid.style.columnGap = "0";

                        Flip.from(state, {
                            duration: config.secondFlipDuration,
                            ease: isMobile ? "power2.out" : "bounce.out",
                            nested: true,
                        });
                    })

                    .to(rightShort, {
                        ease: "sine.out",
                        duration: config.secondFlipDuration,
                        color: "#a1c938",
                        justifyContent: "center",
                    })

                    .to(hiddenLetters, {
                        autoAlpha: 1,
                        width: "auto",
                        display: "inline-block",
                        duration: config.hiddenLettersDuration,
                        delay: config.hiddenLettersDelay,
                        ease: isMobile ? "power2.out" : "elastic.out(1.5, 0.5)",

                        onStart: () => {
                            box.classList.add("w-full", "h-full", "bg-white");
                            explodeCircles(rightShort, config.circleOptions);
                        },
                    })

                    .to(box, {
                        delay: 0.5,
                        autoAlpha: 0,
                        duration: config.boxFadeDuration,
                        ease: "power1.out",
                    })

                    .to(intro, {
                        autoAlpha: 0,
                        duration: config.introFadeDuration,
                        ease: "power1.out",
                    });
            },
        );
    });
}
