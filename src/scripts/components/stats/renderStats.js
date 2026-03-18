import { createStatCard } from "./statCard";

export function renderStats(container, stats) {
   if (!container) return;

   const fragment = document.createDocumentFragment();

   stats.forEach((stat) => {
      fragment.appendChild(createStatCard(stat));
   });

   container.appendChild(fragment);
}
