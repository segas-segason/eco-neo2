export function initLayoutTabs() {
   const container = document.querySelector("[data-layout-tabs]");
   if (!container) return;

   const buttons = container.querySelectorAll("[data-layout-tab]");

   buttons.forEach((button) => {
      button.addEventListener("click", () => {
         buttons.forEach((btn) => {
            btn.classList.remove("border-primary", "border-b-4");
            btn.classList.add("border-grey/20", "border-b");
         });

         button.classList.remove("border-grey/20", "border-b");
         button.classList.add("border-primary", "border-b-4");
      });
   });
}
