export function initCurrentYearContacts() {
    const fieldCurrentYear = document.querySelector("[data-contacts-year]");

    if (!fieldCurrentYear) return;

    fieldCurrentYear.textContent = new Date().getFullYear();
}
