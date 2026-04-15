import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { closeMobileMenu, isMobileMenuOpen } from "./mobileMenu";

gsap.registerPlugin(ScrollTrigger);

export function initBackdropMenu() {
    const menuShell = document.querySelector("[data-menu-shell]");
    const menuBackdrop = document.querySelector("[data-menu-backdrop]");
    const links = document.querySelectorAll(".nav-list__link");

    if (!menuShell || !menuBackdrop || !links.length) return;

    gsap.set(menuBackdrop, {
        backgroundColor: "rgba(138,179,172,1)",
    });

    let isHidden = false;
    let isProcessing = false;
    let userScrolled = false;

    const markUserScroll = () => {
        userScrolled = true;
    };

    window.addEventListener("wheel", markUserScroll, { passive: true });
    window.addEventListener("touchstart", markUserScroll, { passive: true });
    window.addEventListener("keydown", (e) => {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "].includes(e.key)) {
            markUserScroll();
        }
    });

    links.forEach((el) => {
        el.addEventListener("click", () => {
            userScrolled = false;
        });
    });

    const hideShell = () => {
        if (isHidden) return;

        isHidden = true;

        gsap.to(menuShell, {
            y: -menuShell.offsetHeight - 24,
            duration: 0.35,
            ease: "power2.inOut",

            onStart: () => {
                menuShell.style.pointerEvents = "none";
            },
        });
    };

    const showShell = () => {
        if (!isHidden) return;

        isHidden = false;

        gsap.to(menuShell, {
            y: 0,
            duration: 0.35,
            ease: "power1.out",

            onStart: () => {
                menuShell.style.pointerEvents = "auto";
            },
        });
    };

    const handleScrollDown = async () => {
        if (isProcessing) return;
        isProcessing = true;

        try {
            if (isMobileMenuOpen()) {
                await closeMobileMenu();
            } else {
                hideShell();
            }
        } finally {
            isProcessing = false;
        }
    };

    const handleScrollUp = () => {
        showShell();
    };

    ScrollTrigger.create({
        start: 180,
        end: "max",
        onUpdate: (self) => {
            if (!userScrolled) return;

            if (self.direction === 1) {
                handleScrollDown();
            } else if (self.direction === -1) {
                handleScrollUp();
            }
        },
    });

    gsap.to(menuBackdrop, {
        backgroundColor: "rgba(138,179,172,0.8)",
        ease: "power2.inOut",

        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=300",
            scrub: true,
        },
    });
}
