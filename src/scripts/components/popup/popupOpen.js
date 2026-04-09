// xxxxxxxxxxxxxxxxxx
// Попап Мы открылись
// xxxxxxxxxxxxxxxxxx

import { gsap } from "gsap";

export function initPopupOpen() {
    const popup = document.querySelector("[data-popup-open]");
    const close = document.querySelector("[data-popup-open-close]");

    if (!popup) return;

    const showDelay = 5;
    const hideDelay = 1000;

    const lastShown = Number(localStorage.getItem("popupLastShown"));
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 часа в мс

    gsap.set(popup, { clearProps: "all" });

    const shouldShow = !(lastShown && now - lastShown < oneDay);

    gsap.set(popup, {
        autoAlpha: 0,
    });

    if (!shouldShow) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(popup, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
    });

    tl.to(
        popup,
        {
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",

            onComplete: () => {
                localStorage.setItem("popupLastShown", Date.now());
            },
        },
        `+=${hideDelay}`,
    );

    gsap.delayedCall(showDelay, () => tl.play());

    close?.addEventListener("click", () => {
        tl.kill();
        gsap.to(popup, {
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",

            onComplete: () => {
                localStorage.setItem("popupLastShown", Date.now());
            },
        });
    });
}
