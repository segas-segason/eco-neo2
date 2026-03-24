import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initContactsFooter() {
   const sectionContacts = document.querySelector("[data-contacts]");
   const title = document.querySelector("[data-contacts-title]");
   const items = document.querySelectorAll("[data-contacts-item]");
   const map = document.querySelector("[data-contacts-map]");
   const icons = document.querySelectorAll("[data-contacts-social-icon]");
   const copy = document.querySelector("[data-contacts-copy]");

   if (!sectionContacts || !title || !items.length || !icons.length || !map || !copy) return;

   gsap.set(title, {
      opacity: 0,
      yPercent: -100,
   });

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: sectionContacts,
         start: "top 50%",
      },
   });

   tl.from(sectionContacts, {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      delay: 0.25,
   })
      .to(
         title,
         {
            opacity: 1,
            yPercent: 0,
            duration: 0.3,
            ease: "power2.out",
         },
         "<",
      )
      .from(items, {
         opacity: 0,
         yPercent: 100,
         stagger: 0.2,
      })
      .from(map, {
         autoAlpha: 0,
         yPercent: -10,
      })
      .from(icons, {
         opacity: 0,
         yPercent: 100,
         stagger: 0.2,
      })
      .from(copy, {
         opacity: 0,
      });
}
