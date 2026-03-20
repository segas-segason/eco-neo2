import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWhyusSection() {
   const whyusSection = document.querySelector("[data-whyus-section]");
   const whyusTitle = document.querySelectorAll("[data-whyus-title]");
   const whyusIconArrow = document.querySelectorAll("[data-whyus-icon-arrow]");
   const whyusImgWrapper = document.querySelectorAll("[data-whyus-img-wrapper]");
   const whyusImg = document.querySelector("[data-whyus-img]");
   const whyusCards = document.querySelector("[data-whyus-cards]");
   const whyusCard = document.querySelectorAll("[data-whyus-card]");
   const whyusNumberContainer = document.querySelectorAll("[data-whyus-card-number]");

   if (
      !whyusSection ||
      !whyusImgWrapper ||
      !whyusTitle ||
      !whyusIconArrow ||
      !whyusImg ||
      !whyusCards ||
      whyusCard.length === 0 ||
      whyusNumberContainer.length === 0
   )
      return;

   const mm = gsap.matchMedia();

   mm.add("(min-width: 1024px)", () => {
      // Анимации для десктопа
      setupDesktopAnimations();
   });

   mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      // Анимации для планшета
      setupTabletAnimations();
   });

   mm.add("(max-width: 767px)", () => {
      // Анимации для мобильных
      setupMobileAnimations();
   });

   function setupDesktopAnimations() {
      gsap.set(whyusImgWrapper, { paddingTop: 0 });
      gsap.set(whyusTitle, {
         autoAlpha: 0,
         width: 0,
         height: 0,
         scale: 0,
         whiteSpace: "nowrap",
      });
      gsap.set(whyusIconArrow, {
         autoAlpha: 0,
         yPercent: -100,
         xPercent: -100,
      });
      gsap.set(whyusCards, { autoAlpha: 0, yPercent: -10 });
      gsap.set(whyusCard, { autoAlpha: 0, yPercent: -25 });
      gsap.set(whyusImg, {
         autoAlpha: 0,
         scale: 0,
         borderRadius: "100%",
      });
      gsap.set(whyusNumberContainer, {
         autoAlpha: 0,
         translateY: -50,
      });

      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: whyusSection,
            start: "top 80%",
         },
      });

      tl.to(whyusCards, {
         ease: "back.out",
         autoAlpha: 1,
         yPercent: 0,
      })
         .to(whyusIconArrow, {
            autoAlpha: 1,
            yPercent: 0,
            xPercent: 0,
            ease: "back.out",
            duration: 0.5,
            onStart: () => {
               gsap.to(whyusImg, {
                  delay: 0,
                  autoAlpha: 1,
                  duration: 1,
                  scale: 1,
                  ease: "back.out",
                  borderRadius: 0,
               });
            },
         })
         .to(whyusTitle, {
            delay: 1,
            autoAlpha: 1,
            width: "auto",
            height: "auto",
            ease: "back.out",
            scale: 1,
            duration: 0.6,
            onStart: () => {
               gsap.to(whyusImgWrapper, {
                  paddingTop: "24px",
                  ease: "back.out",
                  duration: 0.1,
               });
            },
         })
         .to(
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

   function setupTabletAnimations() {
      // Упрощенные анимации для планшета
      gsap.set(whyusImgWrapper, { paddingTop: 0 });
      gsap.set(whyusTitle, { autoAlpha: 0, scale: 0 });
      gsap.set(whyusIconArrow, { autoAlpha: 0, scale: 0 });
      gsap.set(whyusCards, { autoAlpha: 0, yPercent: -5 });
      gsap.set(whyusCard, { autoAlpha: 0, yPercent: -15 });
      gsap.set(whyusImg, { autoAlpha: 0, scale: 0 });
      gsap.set(whyusNumberContainer, { autoAlpha: 0, scale: 0 });

      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: whyusSection,
            start: "top 70%",
         },
      });

      tl.to(whyusCards, {
         autoAlpha: 1,
         yPercent: 0,
         duration: 0.8,
      })
         .to(
            [whyusIconArrow, whyusImg],
            {
               autoAlpha: 1,
               scale: 1,
               duration: 0.5,
               stagger: 0.2,
            },
            "<",
         )
         .to(whyusTitle, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
         })
         .to(whyusCard, {
            stagger: 0.1,
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.4,
         })
         .to(
            whyusNumberContainer,
            {
               autoAlpha: 1,
               scale: 1,
               duration: 0.5,
               stagger: 0.1,
            },
            "<",
         );
   }

   function setupMobileAnimations() {
      // Минимальные анимации для мобильных
      gsap.set(whyusCards, { autoAlpha: 0 });
      gsap.set(whyusCard, { autoAlpha: 0 });

      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: whyusSection,
            start: "top 60%",
         },
      });

      tl.to(whyusCards, {
         autoAlpha: 1,
         duration: 0.5,
      }).to(whyusCard, {
         autoAlpha: 1,
         stagger: 0.1,
         duration: 0.3,
      });
   }
}
