import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function initHoverUnderline() {
    const links = document.querySelectorAll(".link");

    if (!links.length) return;

    SplitText.create(links, {
        type: "lines",
        autoSplit: true,
        tag: "span",
        linesClass: "link-underline",
    });
}
