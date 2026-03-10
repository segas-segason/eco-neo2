import { gsap } from 'gsap';

export function initPopup() {
    const popup = document.querySelector('[data-popup]');
    const close = document.querySelector('[data-popup-close]');
    const balls = document.querySelector('[data-popup-balls]');

    if (!popup) return;

    const showDelay = 1;
    const hideDelay = 20000;

    gsap.set(popup, {
        autoAlpha: 0,
        pointerEvents: 'none',
        y: 20,
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(popup, {
        autoAlpha: 1,
        pointerEvents: 'auto',
        duration: 0.6,
        ease: 'power2.out',
        y: 0,
        onStart: () => {
            document.body.style.overflow = 'hidden';
        },
    });

    tl.to(
        popup,
        {
            autoAlpha: 0,
            pointerEvents: 'none',
            duration: 0.5,
            ease: 'power2.in',
            y: 20,
            onComplete: () => {
                document.body.style.overflow = '';
            },
        },
        `+=${hideDelay}`,
    );

    gsap.delayedCall(showDelay, () => tl.play());

    close?.addEventListener('click', () => {
        tl.kill();
        gsap.to(popup, {
            autoAlpha: 0,
            pointerEvents: 'none',
            duration: 0.4,
            ease: 'power2.in',
            y: 20,
            onComplete: () => {
                document.body.style.overflow = '';
            },
        });
    });
}
