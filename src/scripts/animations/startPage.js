import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function initStartPage() {
   const menuShell = document.querySelector("[data-menu-shell]");
   const logoHero = document.querySelector("[data-hero-logo]");
   const titleHero = document.querySelector("[data-hero-title]");
   const descHero = document.querySelector("[data-hero-desc]");
   const lightHero = document.querySelector("[data-hero-light]");
   const homeHero = document.querySelector("[data-hero-home]");
   const sectionAbout = document.querySelector("[data-section-about]");

   if (!menuShell || !logoHero || !titleHero || !descHero || !lightHero || !homeHero) return;

   gsap.set([menuShell, logoHero, titleHero, descHero, lightHero, homeHero, sectionAbout], {
      clearProps: "all",
   });

   [homeHero, lightHero].forEach((el) => {
      if (el) {
         el.style.transform = "translate3d(0, 0, 0)";
         el.style.willChange = "transform";
      }
   });

   gsap.set([menuShell, logoHero], {
      autoAlpha: 0,
      yPercent: -50,
      force3D: true,
   });

   gsap.set([titleHero, descHero], {
      autoAlpha: 1,
      force3D: true,
   });

   gsap.set(lightHero, {
      autoAlpha: 0,
      xPercent: 10,
      rotate: "90deg",
      force3D: true,
   });

   gsap.set(homeHero, {
      autoAlpha: 0,
      yPercent: -5,
      force3D: true,
   });

   gsap.set(sectionAbout, {
      autoAlpha: 0,
      yPercent: 10,
      force3D: true,
   });

   requestAnimationFrame(() => {
      const tl = gsap.timeline();

      tl.to(menuShell, {
         autoAlpha: 1,
         yPercent: 0,
         duration: 0.7,
         ease: "elastic(1.2, 1)",
         delay: 0.5,
         onStart: () => {
            gsap.to(sectionAbout, {
               autoAlpha: 1,
               yPercent: 0,
               duration: 0.5,
               ease: "elastic(1.2, 1)",
               delay: 0.05,
            });
         },
      })
         .to(logoHero, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "elastic(1.2, 1)",
         })
         .to(
            lightHero,
            {
               autoAlpha: 1,
               xPercent: 0,
               duration: 10,
               rotate: "0deg",
               onStart: () => {
                  gsap.to(homeHero, {
                     autoAlpha: 1,
                     yPercent: 0,
                     ease: "elastic(1, 0.8)",
                     duration: 1.2,
                     delay: 0.1,
                     onComplete: () => {
                        heroes[0].active = true;
                     },
                  });

                  startParallax();
               },
            },
            "+=0.05",
         );

      const heroes = [
         { el: homeHero, invert: true, active: false, currentX: 0 },
         { el: lightHero, invert: false, active: true, currentX: 0 },
      ];

      const splitTitle = new SplitText(titleHero, { type: "lines, words" });
      tl.from(
         splitTitle.words,
         {
            duration: 1,
            yPercent: -30,
            autoAlpha: 0,
            stagger: 0.1,
            ease: "power2.out",
         },
         "<",
      );

      const splitDesc = new SplitText(descHero, { type: "lines, words" });
      tl.from(
         splitDesc.words,
         {
            duration: 1,
            yPercent: -30,
            autoAlpha: 0,
            delay: 0.7,
            stagger: 0.1,
            ease: "power2.out",
         },
         "<",
      );

      function startParallax() {
         const maxOffset = 15;

         if (window._parallaxInitialized) return;
         window._parallaxInitialized = true;

         heroes.forEach((h) => {
            if (h.el) {
               gsap.set(h.el, { x: 0, clearProps: "x" });
               h.currentX = 0;
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
                              duration: 0.3,
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
   });
}

export function cleanupStartPage() {
   if (window._parallaxHandler) {
      window.removeEventListener("mousemove", window._parallaxHandler);
      window._parallaxHandler = null;
   }
   window._parallaxInitialized = false;

   gsap.killTweensOf("*");
}
