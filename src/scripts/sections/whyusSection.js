import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWhyusSection() {
   const whyusSection = document.querySelector("[data-whyus-section]");
   const whyusImg = document.querySelector("[data-whyus-img]");
   const whyusCard = document.querySelectorAll("[data-whyus-card]");
   const whyusNumberContainer = document.querySelectorAll("[data-whyus-card-number]");

   if (!whyusSection || !whyusImg || whyusCard.length === 0 || whyusNumberContainer.length === 0) return;

   gsap.set(whyusCard, {
      opacity: 0,
      yPercent: -25,
   });

   gsap.set(whyusImg, {
      opacity: 0,
   });

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: whyusSection,
         start: "top 50%",
      },
   });

   tl.to(whyusImg, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
   }).to(
      whyusCard,
      {
         stagger: 0.1,
         autoAlpha: 1,
         duration: 0.5,
         ease: "back.out",
         yPercent: 0,
         onStart: () => {
            gsap.to(whyusNumberContainer, {
               autoAlpha: 1,
               ease: "back.out",
               duration: 0.7,
               stagger: 0.15,
               translateY: 0,
            });
         },
      },
      "<",
   );
}
