import { space } from "../data/space";
import { renderSpace } from "../components/space/renderSpace";

export function initSpaceSection() {
    const grid = document.getElementById("space-grid");
    if (!grid) return;

    renderSpace(grid, space);
}
