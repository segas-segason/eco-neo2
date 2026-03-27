import gsap from "gsap";

export function initPopupLegal() {
   const popup = document.querySelector("[data-popup-legal]");
   const overlay = popup?.querySelector("[data-popup-legal-overlay]");
   const modal = popup?.querySelector("[data-popup-legal-modal]");

   const openBtn = document.querySelector("[data-contacts-button-legal]");
   const closeBtn = popup?.querySelector("[data-popup-legal-close]");

   if (!popup || !overlay || !modal) return;

   popup.style.cssText = `
      pointer-events: none;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0.3s, opacity 0.3s;
   `;

   gsap.set(modal, { y: 40, scale: 0.96, autoAlpha: 0 });

   function open() {
      popup.style.pointerEvents = "auto";
      popup.style.visibility = "visible";
      popup.style.opacity = "1";

      gsap.killTweensOf(modal);

      gsap.to(modal, {
         y: 0,
         scale: 1,
         autoAlpha: 1,
         duration: 0.35,
         ease: "power2.out",
      });
   }

   function close() {
      gsap.killTweensOf(modal);

      gsap.to(modal, {
         y: 40,
         scale: 0.96,
         autoAlpha: 0,
         duration: 0.25,
         ease: "power2.in",
         onComplete: () => {
            popup.style.pointerEvents = "none";
            popup.style.visibility = "hidden";
            popup.style.opacity = "0";
         },
      });
   }

   openBtn?.addEventListener("click", open);
   closeBtn?.addEventListener("click", close);

   overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) close();
   });

   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
   });
}
