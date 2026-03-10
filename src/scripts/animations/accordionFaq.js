import { gsap } from 'gsap';

export function initAccordionFaq() {
    const items = document.querySelectorAll('[data-accordion-item]');
    if (!items.length) return;

    items.forEach((item) => {
        const content = item.querySelector('[data-accordion-content]');
        const plus = item.querySelector('[data-accordion-plus]');
        const minus = item.querySelector('[data-accordion-minus]');

        if (!content || !plus || !minus) return;

        gsap.set(content, {
            height: 0,
            overflow: 'hidden',
        });

        gsap.set(plus, {
            autoAlpha: 1,
            rotate: 0,
        });

        gsap.set(minus, {
            autoAlpha: 0,
            rotate: -90,
        });

        let isOpen = false;

        item.addEventListener('click', () => {
            if (isOpen) {
                gsap.to(content, {
                    height: 0,
                    duration: 0.45,
                    ease: 'power2.inOut',
                    paddingTop: 0,
                });

                gsap.to(plus, {
                    autoAlpha: 1,
                    rotate: 0,
                    duration: 0.25,
                    ease: 'power2.out',
                });

                gsap.to(minus, {
                    autoAlpha: 0,
                    rotate: -90,
                    duration: 0.25,
                    ease: 'power2.out',
                });
            } else {
                gsap.to(content, {
                    height: 'auto',
                    duration: 0.45,
                    ease: 'power2.inOut',
                    paddingTop: '24px',
                });

                gsap.to(plus, {
                    autoAlpha: 0,
                    rotate: 90,
                    duration: 0.25,
                    ease: 'power2.out',
                });

                gsap.to(minus, {
                    autoAlpha: 1,
                    rotate: 0,
                    duration: 0.25,
                    ease: 'power2.out',
                });
            }

            isOpen = !isOpen;
        });
    });
}
