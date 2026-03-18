export function createStatCard(stat) {
   const card = document.createElement("div");
   card.className = "stat-card";

   const indicator = document.createElement("span");
   indicator.className = "stat-card__indicator gap-1 leading-none";

   if (stat.prefix) {
      const prefix = document.createElement("span");
      prefix.className = "stat-card__append";
      prefix.textContent = stat.prefix;
      indicator.appendChild(prefix);
   }

   const counter = document.createElement("span");
   counter.className = "stat-card__counter";
   counter.dataset.counter = stat.counter;
   counter.textContent = "0";
   indicator.appendChild(counter);

   if (stat.suffix) {
      const suffix = document.createElement("span");
      suffix.className = "stat-card__append";
      suffix.textContent = stat.suffix;
      indicator.appendChild(suffix);
   }

   if (stat.unit) {
      const unit = document.createElement("span");
      unit.className = "stat-card__unit";
      unit.textContent = stat.unit;
      indicator.appendChild(unit);
   }

   card.appendChild(indicator);

   const desc = document.createElement("p");
   desc.className = "stat-card__desc";
   desc.textContent = stat.description;

   card.appendChild(desc);

   return card;
}
