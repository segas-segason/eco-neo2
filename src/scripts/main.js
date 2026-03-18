import '../style.css';

import { initIntro } from './animations/intro';
import { initMobileMenu } from './animations/mobileMenu';
import { initBackdropMenu } from './animations/backdropMenu';
import { initPopupOpen } from './animations/popupOpen';
import { initAccordionFaq } from './animations/accordionFaq';
import { initStartPage } from './animations/startPage';

import { initStatsSection } from './sections/statsSection';
import { initSpaceSection } from './sections/spaceSection';
import { initServicesSection } from './sections/servicesSection';
import { initWhyusSection } from './sections/whyusSection';

import { initLayoutTabs } from './layoutTabs';

import { initYaMap } from './initYaMap';
import { initYaMetrika } from './initYaMetrika';

async function initApp() {
    await initIntro();

    initPopupOpen();
    initBackdropMenu();
    initStartPage();

    initSpaceSection();
    initStatsSection();
    initServicesSection();
    initWhyusSection();
}

initApp();

initYaMap();
initYaMetrika();
initMobileMenu();
initAccordionFaq();
initLayoutTabs();
