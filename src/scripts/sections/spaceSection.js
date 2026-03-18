import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSpaceSection() {
    const spaceSection = document.querySelector('[data-space-section]');
    const spaceTitle = document.querySelector('[data-space-title]');
    const spaceCard = document.querySelectorAll('[data-space-card]');

    if (!spaceSection || !spaceTitle || spaceCard.length === 0) return;

    gsap.set(spaceTitle, {
        opacity: 0,
        y: -100,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: spaceSection,
            start: 'top 80%',
        },
    });

    tl.to(spaceTitle, {
        opacity: 1,
        duration: 0.5,
        y: 0,
        ease: 'power2.out',
    }).from(spaceCard, {
        opacity: 0,
        y: 50,
        stagger: 0.25,
    });
}
