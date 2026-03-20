import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { space } from "../data/space";
import { renderSpace } from "../components/space/renderSpace";

gsap.registerPlugin(ScrollTrigger);

export function initSpaceSection() {
   const grid = document.getElementById("space-grid");
   if (!grid) return;

   renderSpace(grid, space);

   const spaceSection = document.querySelector("[data-space]");
   const spaceTitle = document.querySelector("[data-space-title]");
   const spaceCard = document.querySelectorAll("[data-space-card]");

   if (!spaceSection || !spaceTitle || spaceCard.length === 0) return;

   gsap.set(spaceTitle, {
      opacity: 0,
      y: -100,
   });

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: spaceSection,
         start: "top 80%",
      },
   });

   tl.to(spaceTitle, {
      opacity: 1,
      duration: 0.5,
      y: 0,
      ease: "power2.out",
   }).from(spaceCard, {
      opacity: 0,
      y: 50,
      stagger: 0.25,
   });
}
