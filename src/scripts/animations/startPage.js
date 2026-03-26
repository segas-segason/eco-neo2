import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function initStartPage() {
   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => initStartPageLogic());
   } else {
      initStartPageLogic();
   }
}

function initStartPageLogic() {
   const menuShell = document.querySelector("[data-menu-shell]");
   const logoHero = document.querySelector("[data-hero-logo]");
   const titleHero = document.querySelector("[data-hero-title]");
   const descHero = document.querySelector("[data-hero-desc]");
   const lightHero = document.querySelector("[data-hero-light]");
   const homeHero = document.querySelector("[data-hero-home]");
   const sectionAbout = document.querySelector("[data-section-about]");

   if (!menuShell || !logoHero || !titleHero || !descHero || !lightHero || !homeHero) return;

   gsap.killTweensOf([menuShell, logoHero, titleHero, descHero, lightHero, homeHero, sectionAbout]);

   [menuShell, logoHero, titleHero, descHero, lightHero, homeHero, sectionAbout].forEach((el) => {
      if (el) {
         el.style.removeProperty("opacity");
         el.style.removeProperty("transform");
         el.style.removeProperty("visibility");
         el.style.removeProperty("will-change");
      }
   });

   gsap.set([menuShell, logoHero], {
      autoAlpha: 0,
      yPercent: -50,
   });

   gsap.set([titleHero, descHero], {
      autoAlpha: 1,
   });

   gsap.set(lightHero, {
      autoAlpha: 0,
      xPercent: 10,
      rotate: "90deg",
   });

   gsap.set(homeHero, {
      autoAlpha: 0,
      yPercent: -5,
   });

   gsap.set(sectionAbout, {
      autoAlpha: 0,
      yPercent: 10,
   });

   [homeHero, lightHero].forEach((el) => {
      if (el) {
         el.style.willChange = "transform";
      }
   });

   let splitTitle, splitDesc;

   try {
      splitTitle = new SplitText(titleHero, { type: "lines, words" });
      splitDesc = new SplitText(descHero, { type: "lines, words" });
   } catch (e) {
      console.error("SplitText error:", e);
   }

   setTimeout(() => {
      const tl = gsap.timeline({
         onComplete: () => {
            gsap.set(lightHero, { clearProps: "rotate" });
         },
      });

      tl.to(menuShell, {
         autoAlpha: 1,
         yPercent: 0,
         duration: 0.7,
         ease: "elastic(1.2, 1)",
         delay: 0.5,
      });

      tl.to(
         sectionAbout,
         {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.5,
            ease: "elastic(1.2, 1)",
         },
         "<",
      );

      tl.to(
         logoHero,
         {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "elastic(1.2, 1)",
         },
         "-=0.5",
      );

      tl.to(
         lightHero,
         {
            autoAlpha: 0.5,
            duration: 0.5,
            ease: "power2.out",
         },
         "<",
      );

      tl.to(
         lightHero,
         {
            xPercent: 0,
            rotate: "0deg",
            duration: 1.2,
            ease: "back.out(0.6)",
            onStart: () => {
               gsap.to(homeHero, {
                  autoAlpha: 1,
                  yPercent: 0,
                  ease: "elastic(1, 0.8)",
                  duration: 1.2,
                  onComplete: () => {
                     const heroes = [
                        { el: homeHero, invert: true, active: true, currentX: 0 },
                        { el: lightHero, invert: false, active: true, currentX: 0 },
                     ];
                     startParallax(heroes);
                  },
               });
            },
         },
         "<",
      );

      if (splitTitle && splitTitle.words) {
         tl.from(
            splitTitle.words,
            {
               opacity: 0,
               stagger: 0.05,
               ease: "power2.out",
            },
            "-=0.9",
         );
      }

      if (splitDesc && splitDesc.words) {
         tl.from(
            splitDesc.words,
            {
               opacity: 0,
               stagger: 0.05,
               ease: "power2.out",
            },
            "-=0.3",
         );
      }
   }, 50);

   function startParallax(heroes) {
      const maxOffset = 15;

      if (window._parallaxInitialized) {
         if (window._parallaxHandler) {
            window.removeEventListener("mousemove", window._parallaxHandler);
         }
      }

      window._parallaxInitialized = true;

      heroes.forEach((h) => {
         if (h.el) {
            gsap.set(h.el, { x: 0 });
            h.currentX = 0;
            h.el.style.willChange = "transform";
         }
      });

      let ticking = false;
      let lastMouseX = 0;

      const handleMouseMove = (e) => {
         if (!ticking) {
            requestAnimationFrame(() => {
               const mouseX = (e.clientX / window.innerWidth - 0.5) * maxOffset * 2;

               if (Math.abs(mouseX - lastMouseX) > 0.01) {
                  lastMouseX = mouseX;

                  heroes.forEach((h) => {
                     if (!h.active || !h.el) return;

                     const factor = h.invert ? -1 : 1;
                     const targetX = mouseX * factor;

                     if (Math.abs(targetX - h.currentX) > 0.01) {
                        gsap.to(h.el, {
                           x: targetX,
                           duration: 0.4,
                           ease: "power2.out",
                           overwrite: true,
                           onUpdate: () => {
                              h.currentX = targetX;
                           },
                        });
                     }
                  });
               }
               ticking = false;
            });
            ticking = true;
         }
      };

      window.addEventListener("mousemove", handleMouseMove);
      window._parallaxHandler = handleMouseMove;
   }
}

export function cleanupStartPage() {
   if (window._parallaxHandler) {
      window.removeEventListener("mousemove", window._parallaxHandler);
      window._parallaxHandler = null;
   }
   window._parallaxInitialized = false;

   gsap.killTweensOf("*");

   const elements = document.querySelectorAll(
      "[data-menu-shell], [data-hero-logo], [data-hero-title], [data-hero-desc], [data-hero-light], [data-hero-home], [data-section-about]",
   );

   elements.forEach((el) => {
      if (el) {
         el.style.removeProperty("opacity");
         el.style.removeProperty("transform");
         el.style.removeProperty("visibility");
         el.style.removeProperty("will-change");
         el.style.removeProperty("translate");

         el.removeAttribute("style");
      }
   });
}
