import { createNavItem } from "./navItems";

export function renderNav(container, links) {
   if (!container) return;

   const fragment = document.createDocumentFragment();

   links.forEach((link, index) => {
      const isLast = index === links.length - 1;
      const item = createNavItem(link, isLast);
      fragment.appendChild(item);
   });

   container.appendChild(fragment);
}
