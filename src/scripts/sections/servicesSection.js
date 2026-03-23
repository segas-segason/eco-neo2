import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initServicesSection() {
   const servicesSection = document.querySelector("[data-services-section]");
   const serviceCard = document.querySelectorAll("[data-service-card]");

   if (!servicesSection || serviceCard.length === 0) return;

   gsap.set(serviceCard, {
      opacity: 0,
      yPercent: -10,
   });

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: servicesSection,
         start: "top 80%",
      },
   });

   tl.to(serviceCard, {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
   });
}
