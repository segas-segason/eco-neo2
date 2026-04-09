// xxxxxxxxxxxxxxxxxxxxxxxx
// Основной файл приложения
// xxxxxxxxxxxxxxxxxxxxxxxx

import "../style.css";

// Импорт Start Animations
import {
    initStartIntro,
    initStartTopPage,
    initStartSectionSpace,
    initStartSectionServices,
    initStartSectionWhyUs,
    initStartSectionGallery,
    initStartSectionSeating,
    initStartSectionIncluded,
    initStartSectionSpecialOffers,
    initStartSectionFaq,
    initStartSectionContacts,
    initHoverUnderline,
} from "./animations/index";

// Импорт Sections
import { initStatsSection } from "./sections/statsSection";
import { initAdventagesSection } from "./sections/adventagesSection";
import { initSpaceSection } from "./sections/spaceSection";
import { initAuditoriumSection } from "./sections/auditoriumSection";

// Импорт Layouts
import { initLayoutNav } from "./layout/nav";

// Импорт Components
import { initMobileMenu } from "./components/menu/mobileMenu";
import { initBackdropMenu } from "./components/menu/backdropMenu";
import { initPopupOpen } from "./components/popup/popupOpen";
import { initPopupLegal } from "./components/popup/popupLegal";
import { initAccordionFaq } from "./components/faq/accordionFaq";
import { initCurrentYearContacts } from "./components/contacts/currentYearContacts";

// Импорт Fancybox
import { initFancyboxAppGallery } from "./components/fancybox/fancyboxApp";

// Импорт Sliders
import { initGallerySlider } from "./components/sliders/gallerySlider";
import { initSeatingSlider } from "./components/sliders/seatingSlider";

// Импорт External
import { initYaMap } from "./external/initYaMap";
import { initYaMetrika } from "./external/initYaMetrika";

// xxxxxxxxxxxxxxxxxxxxxxxx
// Инициализация приложения
// xxxxxxxxxxxxxxxxxxxxxxxx

async function initApp() {
    await initStartIntro();

    // Sliders
    initGallerySlider();
    initSeatingSlider();

    // Fancybox
    initFancyboxAppGallery();

    // UI
    initPopupOpen();
    initPopupLegal();

    // Sections
    initStatsSection();
    initAdventagesSection();
    initSpaceSection();
    initAuditoriumSection();

    // Layout
    initLayoutNav();

    // Components
    initBackdropMenu();
    initMobileMenu();
    initAccordionFaq();
    initCurrentYearContacts();

    // Start Animations
    initStartTopPage();
    initStartSectionSpace();
    initStartSectionServices();
    initStartSectionWhyUs();
    initStartSectionGallery();
    initStartSectionSeating();
    initStartSectionIncluded();
    initStartSectionSpecialOffers();
    initStartSectionFaq();
    initStartSectionContacts();

    initHoverUnderline();

    // External
    initYaMap();
    initYaMetrika();
}

initApp();
