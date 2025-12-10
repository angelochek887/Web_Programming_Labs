import { BREAKPOINTS } from "./breakpoints.js";
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const mqlMobile = window.matchMedia(BREAKPOINTS.mobile);
const mqlTablet = window.matchMedia(BREAKPOINTS.tablet);
const mqlDesktop = window.matchMedia(BREAKPOINTS.desktop);
let isMenuOpen = false;

function toggleMenu() {
    if (!sidebar || !menuButton)
        return;
    isMenuOpen = !isMenuOpen; 
    if (isMenuOpen) {
        sidebar.classList.remove("hidden"); 
        sidebar.classList.add("menu-opened");
        menuButton.textContent = "✕";
    }
    else {
        sidebar.classList.add("hidden"); 
        sidebar.classList.remove("menu-opened"); 
        menuButton.textContent = "☰"; 
    }
}

function applyResponsiveLayout() {
    if (!sidebar || !menuButton)
        return;

    isMenuOpen = false;
    sidebar.classList.remove("menu-opened");
    menuButton.textContent = "☰";
    if (mqlMobile.matches) {
        sidebar.classList.add("hidden");
        menuButton.classList.remove("hidden");
    }
    else {
        sidebar.classList.remove("hidden");
        menuButton.classList.add("hidden");
    }
}
export function initResponsive() {
    if (!sidebar || !menuButton)
        return;
    menuButton.addEventListener("click", toggleMenu);
    applyResponsiveLayout();
    mqlMobile.addEventListener("change", applyResponsiveLayout);
    mqlTablet.addEventListener("change", applyResponsiveLayout);
    mqlDesktop.addEventListener("change", applyResponsiveLayout);
    console.log("Логіка меню активована");
}
