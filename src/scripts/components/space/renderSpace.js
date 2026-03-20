import { createSpaceCard } from "./spaceCard";

export function renderSpace(container, data) {
   if (!container) return;

   const fragment = document.createDocumentFragment();

   data.forEach((item) => {
      fragment.appendChild(createSpaceCard(item));
   });

   container.appendChild(fragment);
}
