import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initBackdropMenu() {
    const menu = document.querySelector('[data-menu-backdrop]');
    if (!menu) return;

    let lastDirection = 0;

    ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
            const direction = self.direction;

            if (direction !== lastDirection) {
                lastDirection = direction;

                if (direction === 1) {
                    // скролл вниз
                    gsap.to(menu, {
                        yPercent: -140,
                        duration: 0.35,
                        ease: 'power2.in',
                    });
                } else {
                    // скролл вверх
                    gsap.to(menu, {
                        yPercent: 0,
                        duration: 0.35,
                        ease: 'power2.out',
                    });
                }
            }
        },
    });

    gsap.to(menu, {
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(138,179,172,0.8)',
        ease: 'power1.inOut',
        scrollTrigger: {
            trigger: document.body,
            start: 'top',
            end: '300',
            scrub: true,
        },
    });
}
