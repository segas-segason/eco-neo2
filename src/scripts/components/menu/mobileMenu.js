import { gsap } from "gsap";

let isInited = false;
let externalCloseMenu = null;
let externalIsOpen = () => false;

export function isMobileMenuOpen() {
    return externalIsOpen();
}

export function closeMobileMenu() {
    if (typeof externalCloseMenu === "function") {
        return externalCloseMenu();
    }

    return Promise.resolve();
}

export function initMobileMenu() {
    if (isInited) return;
    isInited = true;

    const button = document.querySelector("[data-button]");
    const burger = document.querySelector("[data-burger]");
    const close = document.querySelector("[data-close]");
    const nav = document.querySelector("[data-mobile-nav]");
    const links = Array.from(document.querySelectorAll("[data-mobile-links] li"));

    if (!button || !burger || !close || !nav) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 1279px)", () => {
        let isOpen = false;

        gsap.set(nav, {
            height: 0,
            opacity: 0,
            overflow: "hidden",
        });

        gsap.set(links, {
            x: -50,
            opacity: 0,
        });

        gsap.set(burger, {
            rotate: 0,
            scale: 1,
            opacity: 1,
        });

        gsap.set(close, {
            opacity: 0,
            rotate: 180,
            scale: 0.8,
        });

        const menuTl = gsap.timeline({
            paused: true,
            defaults: { ease: "power1.inOut" },
        });

        menuTl
            .to(nav, {
                height: "auto",
                opacity: 1,
                duration: 0.3,
            })

            .to(
                links,
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.06,
                    duration: 0.25,
                },
                0.1,
            );

        const iconTl = gsap.timeline({
            paused: true,
            defaults: { ease: "power1.inOut", duration: 0.35 },
        });

        iconTl
            .to(
                burger,
                {
                    opacity: 0,
                    rotate: 0,
                    scale: 0.8,
                },
                0,
            )

            .to(
                close,
                {
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                },
                0,
            );

        const openMenu = () => {
            if (isOpen || menuTl.isActive() || iconTl.isActive()) return;

            isOpen = true;
            button.setAttribute("aria-expanded", "true");
            menuTl.play();
            iconTl.play();
        };

        const closeMenu = () => {
            return new Promise((resolve) => {
                if (!isOpen) {
                    resolve();
                    return;
                }

                isOpen = false;
                button.setAttribute("aria-expanded", "false");

                let doneCount = 0;
                const done = () => {
                    doneCount += 1;
                    if (doneCount === 2) resolve();
                };

                menuTl.eventCallback("onReverseComplete", () => {
                    menuTl.eventCallback("onReverseComplete", null);
                    done();
                });

                iconTl.eventCallback("onReverseComplete", () => {
                    iconTl.eventCallback("onReverseComplete", null);
                    done();
                });

                menuTl.reverse();
                iconTl.reverse();
            });
        };

        externalCloseMenu = closeMenu;
        externalIsOpen = () => isOpen;

        const onButtonClick = () => {
            isOpen ? closeMenu() : openMenu();
        };

        const onLinkClick = () => {
            if (!isOpen) return;
            closeMenu();
        };

        button.addEventListener("click", onButtonClick);
        links.forEach((link) => link.addEventListener("click", onLinkClick));

        return () => {
            externalCloseMenu = null;
            externalIsOpen = () => false;

            button.removeEventListener("click", onButtonClick);
            links.forEach((link) => link.removeEventListener("click", onLinkClick));

            menuTl.kill();
            iconTl.kill();
        };
    });
}
