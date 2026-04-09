export function createNavItem(link) {
    const li = document.createElement("li");
    li.className = "nav-list__item";

    li.innerHTML = `
      <a class="nav-list__link" href="${link.href}" title="${link.title}">
         <span class="nav-list__label">${link.text}</span>
      </a>
   `;

    return li;
}
