export function createSpaceCard(item) {
   const card = document.createElement("article");
   card.className = "space-card";
   card.dataset.spaceCard = "";

   const number = document.createElement("span");
   number.className = "space-card__number";
   number.textContent = item.number;

   const title = document.createElement("span");
   title.className = "space-card__title";
   title.textContent = item.title;

   const desc = document.createElement("p");
   desc.className = "space-card__desc";
   desc.textContent = item.description;

   card.append(number, title, desc);

   return card;
}
