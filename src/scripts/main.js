import "../style.css";

// Import Animations
import { initIntro } from "./animations/intro";
import { initMobileMenu } from "./animations/mobileMenu";
import { initBackdropMenu } from "./animations/backdropMenu";
import { initPopupOpen } from "./animations/popupOpen";
import { initAccordionFaq } from "./animations/accordionFaq";
import { initStartPage } from "./animations/startPage";

// Import Sections
import { initSpaceSection } from "./sections/spaceSection";
import { initServicesSection } from "./sections/servicesSection";
import { initWhyusSection } from "./sections/whyusSection";

// Import Layouts
import { initLayoutTabs } from "./layoutTabs";
import { initNav } from "./layout/nav";

// Import Components
import { initAdventagesSection } from "./sections/adventagesSection";
import { initStatsSection } from "./sections/statsSection";

// Import External
import { initYaMap } from "./initYaMap";
import { initYaMetrika } from "./initYaMetrika";

async function initApp() {
   await initIntro();

   // UI
   initStartPage();
   initPopupOpen();
   initBackdropMenu();

   // Sections
   initSpaceSection();
   initStatsSection();
   initServicesSection();
   initWhyusSection();

   // Components
   initAdventagesSection();
}

initApp();

// Layout
initMobileMenu();
initAccordionFaq();
initLayoutTabs();
initNav();

// External
initYaMap();
initYaMetrika();
