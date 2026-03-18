import { adventages } from "../data/adventages";
import { renderAdventages } from "../components/adventages/renderAdventages";

export function initAdventagesSection() {
   const container = document.getElementById("adventages");
   if (!container) return;

   renderAdventages(container, adventages);
}
