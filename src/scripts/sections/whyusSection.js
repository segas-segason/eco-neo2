import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initWhyusSection() {
    const whyusSection = document.querySelector('[data-whyus-section]');
    const whyusBoxLeft = document.querySelector('[data-whyus-box-left]');
    const whyusBoxRight = document.querySelector('[data-whyus-box-right]');
    const whyusCard = document.querySelectorAll('[data-whyus-card]');

    if (!whyusSection || !whyusBoxLeft || !whyusBoxRight || whyusCard.length === 0) return;

    gsap.set(whyusBoxRight, {
        autoAlpha: 0,
        yPercent: -10,
        height: 'auto',
    });

    gsap.set(whyusCard, {
        autoAlpha: 0,
        paddingTop: 0,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: whyusSection,
            start: 'top 50%',
        },
    });

    tl.to(whyusBoxRight, {
        ease: 'back.out',
        autoAlpha: 1,
        yPercent: 0,
    }).to(whyusCard, {
        stagger: 0.2,
        autoAlpha: 1,
        duration: 0.3,
        ease: 'back.out',
        paddingTop: '40px',
    });
}
