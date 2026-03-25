import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSeatingOpen() {
   const section = document.querySelector("[data-seating]");
   const title = document.querySelector("[data-seating-title]");

   const tabs = document.querySelector("[data-layout-tabs]");
   const tab = document.querySelectorAll("[data-layout-tab]");

   const includedImages = document.querySelector("[data-included-images]");
   const includedItems = document.querySelectorAll("[data-included-item]");

   const addTitle = document.querySelector("[data-included-add-title]");
   const addItems = document.querySelectorAll("[data-included-add-item]");

   if (
      !section ||
      !title ||
      !tabs ||
      !tab.length ||
      !includedImages ||
      !includedItems.length ||
      !addTitle ||
      !addItems.length
   )
      return;

   gsap.set(title, {
      opacity: 0,
      yPercent: -100,
   });

   gsap.set(tab, {
      opacity: 0,
   });

   gsap.set(includedImages, {
      yPercent: -10,
      opacity: 0,
   });

   gsap.set([includedItems, addTitle, addItems], {
      opacity: 0,
      xPercent: -5,
   });

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: section,
         start: "top 50%",
      },
   });

   tl.to(title, {
      delay: 0.3,
      opacity: 1,
      yPercent: 0,
      duration: 0.5,
      ease: "power2.out",
   })
      .to(tab, {
         opacity: 1,
         stagger: 0.1,
         ease: "power2.out",
      })
      .to(includedImages, {
         opacity: 1,
         yPercent: 0,
         ease: "power2.out",
         duration: 0.8,
      })
      .to(
         [includedItems, addTitle, addItems],
         {
            opacity: 1,
            xPercent: 0,
            stagger: 0.1,
            ease: "power2.out",
         },
         "<",
      );
}
