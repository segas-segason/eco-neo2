import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { closeMobileMenu, isMobileMenuOpen } from "./mobileMenu";

gsap.registerPlugin(ScrollTrigger);

export function initBackdropMenu() {
   const menuShell = document.querySelector("[data-menu-shell]");
   const menuBackdrop = document.querySelector("[data-menu-backdrop]");

   if (!menuShell || !menuBackdrop) return;

   const tl = gsap.timeline({});

   let isHidden = false;
   let isProcessing = false;

   const hideShell = () => {
      if (isHidden) return;

      isHidden = true;

      gsap.to(menuShell, {
         y: -menuShell.offsetHeight - 24,
         duration: 0.35,
         ease: "power2.inOut",
         overwrite: "auto",
         onStart: () => {
            menuShell.style.pointerEvents = "none";
         },
      });
   };

   const showShell = () => {
      if (!isHidden) return;

      isHidden = false;

      gsap.to(menuShell, {
         y: 0,
         duration: 0.35,
         ease: "power2.inOut",
         overwrite: "auto",
         onStart: () => {
            menuShell.style.pointerEvents = "auto";
         },
      });
   };

   const handleHideOnScrollDown = async () => {
      if (isProcessing || isHidden) return;
      isProcessing = true;

      if (isMobileMenuOpen()) {
         await closeMobileMenu();
      }

      hideShell();
      isProcessing = false;
   };

   ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
         const scrollY = self.scroll();
         const direction = self.direction;

         if (scrollY <= 80) {
            showShell();
            return;
         }

         if (direction === 1) {
            handleHideOnScrollDown();
         } else if (direction === -1) {
            showShell();
         }
      },
   });

   gsap.to(menuBackdrop, {
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(138,179,172,0.8)",
      ease: "power2.inOut",
      scrollTrigger: {
         trigger: document.body,
         start: "top top",
         end: "+=300",
         scrub: true,
      },
   });
}
