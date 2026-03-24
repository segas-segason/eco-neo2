import { gsap } from "gsap";

export function initPopupOpen() {
   const popup = document.querySelector("[data-popup-open]");
   const close = document.querySelector("[data-popup-open-close]");
   const balls = document.querySelector("[data-popup-open-balls]");

   if (!popup) return;

   const showDelay = 5;
   const hideDelay = 1000;

   const lastShown = Number(localStorage.getItem("popupLastShown"));
   const now = Date.now();
   const oneDay = 24 * 60 * 60 * 1000; // 24 часа в мс

   if (lastShown && now - lastShown < oneDay) {
      return;
   }

   gsap.set(popup, {
      autoAlpha: 0,
      pointerEvents: "none",
      y: 20,
   });

   const tl = gsap.timeline({ paused: true });

   tl.to(popup, {
      autoAlpha: 1,
      pointerEvents: "auto",
      duration: 0.6,
      ease: "power2.out",
      y: 0,
   });

   tl.to(
      popup,
      {
         autoAlpha: 0,
         pointerEvents: "none",
         duration: 0.6,
         y: 20,
         ease: "power2.in",
         onComplete: () => {
            localStorage.setItem("popupLastShown", Date.now());
         },
      },
      `+=${hideDelay}`,
   );

   gsap.delayedCall(showDelay, () => tl.play());

   close?.addEventListener("click", () => {
      tl.kill();
      gsap.to(popup, {
         autoAlpha: 0,
         pointerEvents: "none",
         duration: 0.6,
         ease: "power2.out",
         y: 20,
         onComplete: () => {
            localStorage.setItem("popupLastShown", Date.now());
         },
      });
   });
}
