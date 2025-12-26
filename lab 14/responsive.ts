import { BREAKPOINTS } from "./breakpoints.js"; 

const sidebar = document.getElementById("sidebar") as HTMLElement | null;
const menuButton = document.getElementById("menuButton") as HTMLButtonElement | null;

const mqlMobile = window.matchMedia(BREAKPOINTS.mobile);
const mqlTablet = window.matchMedia(BREAKPOINTS.tablet);
const mqlDesktop = window.matchMedia(BREAKPOINTS.desktop);

let isMenuOpen = false;

function toggleMenu(): void {
    if (!sidebar || !menuButton) return;

    isMenuOpen = !isMenuOpen; 

    if (isMenuOpen) {
        sidebar.classList.remove("hidden");     
        sidebar.classList.add("menu-opened");   
        menuButton.textContent = "✕"; 
        menuButton.setAttribute("aria-expanded", "true"); // Доступність
    } else {
        sidebar.classList.add("hidden");        
        sidebar.classList.remove("menu-opened");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false"); // Доступність
    }
}

function applyResponsiveLayout(): void {
    if (!sidebar || !menuButton) return;

    isMenuOpen = false;
    sidebar.classList.remove("menu-opened");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");

    if (mqlMobile.matches) {
        sidebar.classList.add("hidden");
        menuButton.classList.remove("hidden");
    } 
    else {
        sidebar.classList.remove("hidden");
        menuButton.classList.add("hidden");
    }
}

export function initResponsive(): void {
    if (!sidebar || !menuButton) return;

    menuButton.addEventListener("click", toggleMenu);

    applyResponsiveLayout();

    mqlMobile.addEventListener("change", applyResponsiveLayout);
    mqlTablet.addEventListener("change", applyResponsiveLayout);
    mqlDesktop.addEventListener("change", applyResponsiveLayout);

    console.log("Логіка адаптивності активована");
}