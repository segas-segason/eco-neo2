import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSeatingOpen() {
   const section = document.querySelector("[data-seating]");
   const title = document.querySelector("[data-seating-title]");

   const tabs = document.querySelector("[data-layout-tabs]");
   const tab = document.querySelectorAll("[data-layout-tab]");

   const includedImages = document.querySelector("[data-included-images]");
   const includedItems = document.querySelectorAll("[data-included-item]");

   const addTitle = document.querySelector("[data-included-add-title]");
   const addItems = document.querySelectorAll("[data-included-add-item]");

   const layoutContainer = document.querySelector("[data-layout-container]");
   const layoutImage = document.querySelector("[data-layout-image]");

   if (
      !section ||
      !title ||
      !tabs ||
      !tab.length ||
      !includedImages ||
      !includedItems.length ||
      !addTitle ||
      !addItems.length ||
      !layoutContainer ||
      !layoutImage
   )
      return;

   const layoutImages = {
      banquet: "./src/assets/images/options/hall-layout-banquet.webp",
      buffet: "./src/assets/images/options/hall-layout-buffet.webp",
      theater: "./src/assets/images/options/hall-layout-theater.webp",
      lecture: "./src/assets/images/options/hall-layout-lecture.webp",
      custom: "./src/assets/images/options/hall-layout-custom.webp",
   };

   function updateLayoutImage(imageUrl) {
      const tempClone = layoutImage.cloneNode();
      tempClone.style.position = "absolute";
      tempClone.style.top = "0";
      tempClone.style.left = "0";
      tempClone.style.width = "100%";
      tempClone.style.height = "100%";
      tempClone.style.objectFit = "cover";
      tempClone.style.opacity = "0";
      layoutContainer.style.position = "relative";
      layoutContainer.appendChild(tempClone);

      gsap.to(layoutImage, {
         opacity: 0,
         duration: 0.3,
         ease: "power2.in",
         onComplete: () => {
            layoutImage.src = imageUrl;

            gsap.to(layoutImage, {
               opacity: 1,
               duration: 0.4,
               ease: "power2.out",
               onComplete: () => {
                  if (tempClone && tempClone.parentNode) {
                     tempClone.parentNode.removeChild(tempClone);
                  }
               },
            });
         },
      });
   }

   function getLayoutType(buttonText) {
      const text = buttonText.toLowerCase();
      if (text.includes("банкет")) return "banquet";
      if (text.includes("фуршет")) return "buffet";
      if (text.includes("театр")) return "theater";
      if (text.includes("лекция")) return "lecture";
      if (text.includes("ваш вариант")) return "custom";
      return "banquet";
   }

   function activateTab(activeTab) {
      tab.forEach((t) => {
         t.classList.remove("border-primary");
         t.classList.add("border-grey/20");
      });

      activeTab.classList.remove("border-grey/20");
      activeTab.classList.add("border-primary");

      const buttonText = activeTab.querySelector("span:first-child")?.innerText || "";
      const layoutType = getLayoutType(buttonText);
      const imageUrl = layoutImages[layoutType];

      if (imageUrl) {
         updateLayoutImage(imageUrl);
      }
   }

   tab.forEach((tabButton) => {
      tabButton.addEventListener("click", () => {
         activateTab(tabButton);
      });
   });

   gsap.set(title, {
      opacity: 0,
      yPercent: -100,
   });

   gsap.set(tab, {
      opacity: 0,
   });

   gsap.set(includedImages, {
      yPercent: -10,
      opacity: 0,
   });

   gsap.set([includedItems, addTitle, addItems], {
      opacity: 0,
      xPercent: -5,
   });

   gsap.set(layoutContainer, {
      opacity: 0,
      yPercent: 10,
   });

   const tl = gsap.timeline({
      scrollTrigger: {
         trigger: section,
         start: "top 50%",
      },
   });

   tl.to(title, {
      delay: 0.3,
      opacity: 1,
      yPercent: 0,
      duration: 0.5,
      ease: "power2.out",
   })
      .to(tab, {
         opacity: 1,
         stagger: 0.1,
         ease: "power2.out",
      })
      .to(layoutContainer, {
         opacity: 1,
         yPercent: 0,
         duration: 0.6,
         ease: "power2.out",
      })
      .to(includedImages, {
         opacity: 1,
         yPercent: 0,
         ease: "power2.out",
         duration: 0.8,
      })
      .to(
         [includedItems, addTitle, addItems],
         {
            opacity: 1,
            xPercent: 0,
            stagger: 0.1,
            ease: "power2.out",
         },
         "<",
      );
}
