import "../style.css";

// Import Animations
import { initIntro } from "./animations/intro";
import { initStartTopPage } from "./animations/startTopPage";

import { initMobileMenu } from "./animations/mobileMenu";
import { initBackdropMenu } from "./animations/backdropMenu";

// Import Sections
import { initSpaceSection } from "./sections/spaceSection";
import { initServicesSection } from "./sections/servicesSection";
import { initWhyusSection } from "./sections/whyusSection";
import { initSeatingOpen } from "./animations/seatingOpen";
import { initStockOpen } from "./animations/stockOpen";
import { initAccordionFaq } from "./animations/accordionFaq";
import { initContactsFooter } from "./animations/contactsFooter";

// Import Layouts
import { initLayoutTabs } from "./layout/tabs";
import { initLayoutNav } from "./layout/nav";

// Import Components
import { initAdventagesSection } from "./sections/adventagesSection";
import { initStatsSection } from "./sections/statsSection";

import { initPopupOpen } from "./components/popup/popupOpen";
import { initPopupLegal } from "./components/popup/popupLegal";

// Import External
import { initYaMap } from "./initYaMap";
import { initYaMetrika } from "./initYaMetrika";

async function initApp() {
   await initIntro();

   // UI
   initStartTopPage();
   initPopupOpen();
   initPopupLegal();
   initContactsFooter();
   initStockOpen();
   initSeatingOpen();

   // Sections
   initSpaceSection();
   initStatsSection();
   initServicesSection();
   initWhyusSection();

   // Components
   initAdventagesSection();

   // Layout
   initLayoutNav();
   initBackdropMenu();
   initMobileMenu();
   initAccordionFaq();
   initLayoutTabs();

   // External
   initYaMap();
   initYaMetrika();
}

initApp();
