import { createNavItem } from "./navItems";
import gsap from "gsap";
import { Flip } from "gsap/flip";

gsap.registerPlugin(Flip);

export function renderNav(container, links) {
   if (!container) return;

   const fragment = document.createDocumentFragment();

   links.forEach((link) => {
      const item = createNavItem(link);
      fragment.appendChild(item);
   });

   container.appendChild(fragment);

   const navLinks = container.querySelectorAll(".nav-list__link");
   const labels = container.querySelectorAll(".nav-list__label");

   const sections = links.map((link) => document.querySelector(link.href)).filter(Boolean);

   if (!labels.length) return;

   const underline = document.createElement("span");
   underline.className = "nav-list__underline";

   let activeLabel = null;
   let isClicking = false;
   let isScrolling = false;
   let scrollTimeout = null;
   let animationFrameId = null;

   function moveUnderline(target, isClick = false) {
      if (!target) return;

      const state = Flip.getState(underline);
      target.appendChild(underline);

      Flip.from(state, {
         duration: 0.5,
         ease: "power2",
         absolute: true,
      });
   }

   requestAnimationFrame(() => {
      activeLabel = labels[0];
      moveUnderline(activeLabel);
   });

   function clearScrollTimeout() {
      if (scrollTimeout) {
         clearTimeout(scrollTimeout);
         scrollTimeout = null;
      }
   }

   navLinks.forEach((link) => {
      const label = link.querySelector(".nav-list__label");

      link.addEventListener("click", (e) => {
         e.preventDefault();

         clearScrollTimeout();

         isClicking = true;
         isScrolling = true;

         navLinks.forEach((l) => l.classList.remove("active"));
         link.classList.add("active");
         activeLabel = label;

         moveUnderline(label, true);

         const href = link.getAttribute("href");
         if (href?.startsWith("#")) {
            const target = document.querySelector(href);
            if (target) {
               window.removeEventListener("scroll", updateActiveLink);

               target.scrollIntoView({ behavior: "smooth", block: "start" });

               scrollTimeout = setTimeout(() => {
                  isScrolling = false;
                  isClicking = false;
                  window.addEventListener("scroll", updateActiveLink);
                  updateActiveLink();
                  clearScrollTimeout();
               }, 1000);
            }
         }
      });
   });

   function updateActiveLink() {
      if (isClicking || isScrolling) return;

      if (animationFrameId) {
         cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
         const viewportCenter = window.innerHeight / 2;
         let found = false;

         sections.forEach((section) => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
               const link = Array.from(navLinks).find((a) => a.getAttribute("href") === `#${section.id}`);

               if (link) {
                  if (!link.classList.contains("active")) {
                     navLinks.forEach((l) => l.classList.remove("active"));
                     link.classList.add("active");

                     const label = link.querySelector(".nav-list__label");
                     activeLabel = label;
                     moveUnderline(label);
                  }
                  found = true;
               }
            }
         });

         if (!found && !isClicking && !isScrolling) {
            navLinks.forEach((l) => l.classList.remove("active"));
         }

         animationFrameId = null;
      });
   }

   window.addEventListener("scroll", updateActiveLink);
   window.addEventListener("resize", updateActiveLink);
   updateActiveLink();
}
