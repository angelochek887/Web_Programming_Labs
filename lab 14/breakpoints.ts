export interface Breakpoints {
    mobile: string;
    tablet: string;
    desktop: string;
}

export const BREAKPOINTS: Breakpoints = {
    mobile: "(max-width: 767px)",
    tablet: "(min-width: 768px) and (max-width: 1023px)",
    desktop: "(min-width: 1024px)"
};