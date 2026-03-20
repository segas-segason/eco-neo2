import { createNavItem } from "./navItems";

export function renderNav(container, links) {
   if (!container) return;

   const fragment = document.createDocumentFragment();

   links.forEach((link) => {
      const item = createNavItem(link);
      fragment.appendChild(item);
   });

   container.appendChild(fragment);

   const navLinks = container.querySelectorAll("a");
   const sections = links.map((link) => document.querySelector(link.href)).filter(Boolean);

   if (sections.length === 0) return;

   function updateActiveLink() {
      const viewportCenter = window.innerHeight / 2;

      let found = false;

      sections.forEach((section) => {
         const rect = section.getBoundingClientRect();
         if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            // Секция находится в центре viewport
            const link = Array.from(navLinks).find((a) => a.getAttribute("href") === `#${section.id}`);
            if (link) {
               navLinks.forEach((l) => l.classList.remove("active"));
               link.classList.add("active");
               found = true;
            }
         }
      });

      if (!found) {
         navLinks.forEach((l) => l.classList.remove("active"));
      }
   }

   window.addEventListener("scroll", updateActiveLink);
   window.addEventListener("resize", updateActiveLink);
   updateActiveLink();
}
