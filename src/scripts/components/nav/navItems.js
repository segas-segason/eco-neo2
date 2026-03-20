export function createNavItem(link) {
   const li = document.createElement("li");
   li.className = "nav-list__item";
   li.innerHTML = `
      <a class="nav-list__link" href="${link.href}">
         ${link.text}
      </a>
   `;
   return li;
}
