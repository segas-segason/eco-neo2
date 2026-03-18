import { createAdventageCard } from "./adventageCard";

export function renderAdventages(container, data) {
   if (!container) return;

   const fragment = document.createDocumentFragment();

   data.forEach((item, index) => {
      const card = createAdventageCard(item, index);
      fragment.appendChild(card);
   });

   container.appendChild(fragment);
}
