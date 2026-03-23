export function createAdventageCard(item, index) {
   const card = document.createElement("div");
   card.className = "adventage-card";

   if (index === 0) {
      card.className +=
         " border-b-grey-light-transparent sm:border-r-grey-light-transparent border-b sm:border-r xl:border-b-0";
   } else if (index === 1) {
      card.className +=
         " border-b-grey-light-transparent xl:border-r-grey-light-transparent border-b xl:border-r xl:border-b-0";
   } else if (index === 2) {
      card.className +=
         " border-b-grey-light-transparent sm:border-r-grey-light-transparent border-b sm:border-r sm:border-b-0";
   }

   const title = document.createElement("span");
   title.className = "adventage-card__title";
   title.textContent = item.title;

   const desc = document.createElement("span");
   desc.className = "adventage-card__desc";
   desc.textContent = item.description;

   card.append(title, desc);

   return card;
}
