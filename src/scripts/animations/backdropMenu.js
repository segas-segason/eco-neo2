import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initBackdropMenu() {
    const menu = document.querySelector('[data-menu-backdrop]');
    if (!menu) return;

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
