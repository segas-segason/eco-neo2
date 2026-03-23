import { gsap } from "gsap";
import { Flip } from "gsap/flip";

gsap.registerPlugin(Flip);

let isIntroInited = false;

/* Генерация текста */
function createAnimatedText(container, text, staticIndexes = []) {
   if (!container) return;

   container.innerHTML = "";
   const fragment = document.createDocumentFragment();

   [...text].forEach((char, index) => {
      const span = document.createElement("span");

      span.textContent = char === " " ? "\u00A0" : char;

      if (staticIndexes.includes(index)) {
         span.setAttribute("data-static-letter", "");
      } else {
         span.setAttribute("data-hidden-letter", "");
      }

      fragment.appendChild(span);
   });

   container.appendChild(fragment);
}

/* Взрыв кружков */
function explodeCircles(container, options = {}) {
   const { count = 30, minSize = 10, maxSize = 60, minScale = 0.8, maxScale = 2, duration = 1 } = options;

   const rect = container.getBoundingClientRect();
   const centerX = rect.left + rect.width / 2;
   const centerY = rect.top + rect.height / 2;
   const maxDistance = Math.hypot(window.innerWidth, window.innerHeight);

   const circles = [];

   for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      const size = gsap.utils.random(minSize, maxSize);

      Object.assign(el.style, {
         position: "fixed",
         left: `${centerX}px`,
         top: `${centerY}px`,
         width: `${size}px`,
         height: `${size}px`,
         borderRadius: "50%",
         background: "#a1c938",
         pointerEvents: "none",
         zIndex: "99999",
         transform: "translate(-50%, -50%)",
         opacity: "1",
      });

      document.body.appendChild(el);
      circles.push(el);
   }

   circles.forEach((circle) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = gsap.utils.random(maxDistance * 0.6, maxDistance);

      gsap.set(circle, { scale: 0, x: 0, y: 0, opacity: 1 });

      gsap.to(circle, {
         x: Math.cos(angle) * distance,
         y: Math.sin(angle) * distance,
         scale: gsap.utils.random(minScale, maxScale),
         opacity: 0,
         duration,
         ease: "power2.out",
         onComplete: () => circle.remove(),
      });
   });
}

/* Основной интро */
export function initIntro() {
   return new Promise((resolve) => {
      const introShown = localStorage.getItem("introShown");

      const intro = document.querySelector("[data-intro]");
      if (!intro) return resolve();

      const leftShort = intro.querySelector("[data-intro-left-short]");
      const rightShort = intro.querySelector("[data-intro-right-short]");

      /* === Генерация текста === */
      createAnimatedText(leftShort, "ЭкоПосольство", [0, 3]);
      createAnimatedText(rightShort, "Зеленый Кот", [0, 8]);

      if (introShown) {
         intro.style.display = "none";
         document.documentElement.classList.add("intro-done");
         return resolve();
      }

      if (isIntroInited) return resolve();
      isIntroInited = true;

      const box = intro.querySelector("[data-intro-box]");
      const grid = intro.querySelector("[data-intro-grid]");
      const hiddenLetters = intro.querySelectorAll("[data-hidden-letter]");

      if (!box || !grid || !hiddenLetters.length) return resolve();

      document.body.style.overflow = "hidden";

      gsap.set(intro, { autoAlpha: 1 });

      const mm = gsap.matchMedia();

      mm.add(
         {
            isMobile: "(max-width: 767px)",
            isTablet: "(min-width: 768px) and (max-width: 1023px)",
            isDesktop: "(min-width: 1024px)",
         },
         (context) => {
            const { isMobile, isTablet } = context.conditions;

            const config = {
               rowGap: isMobile ? "12px" : isTablet ? "16px" : "24px",
               secondFlipDuration: isMobile ? 0.4 : 0.5,
               hiddenLettersDuration: isMobile ? 0.6 : 0.8,
               hiddenLettersDelay: isMobile ? 0.3 : 0.6,
               boxFadeDuration: isMobile ? 0.7 : 0.9,
               introFadeDuration: isMobile ? 0.7 : 1,
            };

            gsap.set(box, { scale: 2 });

            gsap.set(hiddenLetters, {
               autoAlpha: 0,
               width: 0,
               display: "block",
            });

            gsap.set(grid, {
               gridTemplateColumns: "1fr 1fr",
               gridTemplateRows: "1fr 0fr",
               rowGap: "0",
            });

            const tl = gsap.timeline({
               onComplete: () => {
                  document.body.style.overflow = "";
                  intro.style.display = "none";
                  document.documentElement.classList.add("intro-done");
                  localStorage.setItem("introShown", "true");
                  mm.revert();
                  resolve();
               },
            });

            tl.to(box, {
               opacity: 1,
               duration: 0.8,
               scale: 1,
               ease: "elastic.out(1.5, 0.5)",
               delay: 0.5,
            })

               .add(() => {
                  const state = Flip.getState([rightShort, grid]);

                  rightShort.style.gridRow = "2";
                  grid.style.gridTemplateRows = "1fr 1fr";
                  grid.style.rowGap = config.rowGap;

                  Flip.from(state, {
                     duration: 0.3,
                     ease: "power4",
                  });
               })

               .add(() => {
                  const state = Flip.getState([rightShort, grid]);

                  rightShort.style.gridColumn = "1";
                  grid.style.gridTemplateColumns = "1fr 0fr";

                  Flip.from(state, {
                     duration: config.secondFlipDuration,
                     ease: "bounce.out",
                  });
               })

               .to(hiddenLetters, {
                  autoAlpha: 1,
                  width: "auto",
                  duration: config.hiddenLettersDuration,
                  delay: config.hiddenLettersDelay,
                  ease: "elastic.out(1.5, 0.5)",
                  onStart: () => {
                     box.classList.add("w-full", "h-full", "bg-white");
                     explodeCircles(rightShort);
                  },
               })

               .to(box, {
                  autoAlpha: 0,
                  duration: config.boxFadeDuration,
               })

               .to(intro, {
                  autoAlpha: 0,
                  duration: config.introFadeDuration,
               });
         },
      );
   });
}
