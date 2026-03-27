import { navLinks } from "../data/navLinks";
import { renderNav } from "../components/nav/renderNav";

export function initLayoutNav() {
   const ul = document.getElementById("nav-list");
   if (!ul) return;

   renderNav(ul, navLinks);
}
