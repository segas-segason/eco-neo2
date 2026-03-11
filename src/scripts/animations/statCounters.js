import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initStatCounters() {
    const statsSection = document.querySelector('[data-stats]');
    if (!statsSection) return;

    const counters = statsSection.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: statsSection,
            start: 'top 100%',
            once: true,
        },
    });

    counters.forEach((counter, index) => {
        const state = { value: 0 };
        const endValue = Number(counter.dataset.counter);

        tl.to(
            state,
            {
                value: endValue,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                    counter.textContent = Math.floor(state.value);
                },
            },
            index * 0.08,
        );
    });
}
