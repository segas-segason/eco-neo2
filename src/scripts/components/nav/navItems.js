export function createNavItem(link, isLast) {
   const li = document.createElement("li");

   if (!isLast) {
      li.className = "nav-list__item";
   }

   li.innerHTML = `
    <a class="nav-list__link ${isLast ? "border-0" : ""}" href="${link.href}">
      ${link.text}
    </a>
  `;

   return li;
}
