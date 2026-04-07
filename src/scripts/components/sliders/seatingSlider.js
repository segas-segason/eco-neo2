// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Слайдер и вкладки в секции Варианты рассадки
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/flip";

gsap.registerPlugin(ScrollTrigger, Flip);

export function initSeatingSlider() {
    const container = document.querySelector("#tabs-slider .splide");
    const slides = document.querySelectorAll("#tabs-slider .splide__slide");
    const buttons = document.querySelectorAll("#tabs-slider .splide__btn");
    const line = document.querySelector(".splide__line");

    if (!container || !slides.length || !buttons.length) return;

    const splide = new Splide(container, {
        arrows: false,
        type: "loop",
        perPage: 1,
        pagination: false,
        focus: "center",
    });

    splide.mount();

    function updateActiveButton(index) {
        buttons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }

    function animateLineToActiveTab() {
        if (!line) return;

        const activeTab = document.querySelector(".splide__btn.active");
        if (!activeTab) return;

        const currentParent = line.parentElement;
        if (currentParent === activeTab) return;

        const lineState = Flip.getState(line);
        activeTab.appendChild(line);

        Flip.from(lineState, {
            duration: 0.3,
            ease: "power2.inOut",
            absolute: true,
        });
    }

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (index < slides.length) {
                splide.go(index);
                updateActiveButton(index);
                setTimeout(animateLineToActiveTab, 30);
            }
        });
    });

    splide.on("moved", (newIndex) => {
        updateActiveButton(newIndex);
        setTimeout(animateLineToActiveTab, 50);
    });

    splide.on("move", (newIndex) => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                updateActiveButton(newIndex);
                animateLineToActiveTab();
            }, 10);
        });
    });

    updateActiveButton(0);

    setTimeout(animateLineToActiveTab, 100);
}
