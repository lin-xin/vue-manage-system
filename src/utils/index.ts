export const setProperty = (prop: string, val: any, dom = document.documentElement) => {
    dom.style.setProperty(prop, val);
};

export const mix = (color1: string, color2: string, weight: number = 0.5): string => {
    let color = '#';
    for (let i = 0; i <= 2; i++) {
        const c1 = parseInt(color1.substring(1 + i * 2, 3 + i * 2), 16);
        const c2 = parseInt(color2.substring(1 + i * 2, 3 + i * 2), 16);
        const c = Math.round(c1 * weight + c2 * (1 - weight));
        color += c.toString(16).padStart(2, '0');
    }
    return color;
};
