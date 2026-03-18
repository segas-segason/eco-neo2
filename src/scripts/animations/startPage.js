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
      { el: homeHero, invert: true, active: true },
      { el: lightHero, invert: false, active: true },
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

      heroes.forEach((h) => {
         h.pos = { x: 0 };
      });

      window.addEventListener("mousemove", (e) => {
         const mouseX = (e.clientX / window.innerWidth - 0.5) * maxOffset * 2;

         heroes.forEach((h) => {
            if (!h.active) return;

            const factor = h.invert ? -1 : 1;

            gsap.to(h.el, {
               x: mouseX * factor,
               duration: 0.3,
               ease: "power1.out",
            });
         });
      });
   }
}
