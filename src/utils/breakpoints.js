// Breakpoints por clase de dispositivo (slide 17). En móvil decidimos por clase, no por xs/sm/md/lg.
export const BREAKPOINTS = {
  phoneLandscape: 600, // < 600 dp  → phone portrait
  tabletPortrait: 768, // 600 - 768 → phone landscape
  tabletLandscape: 1024, // 768 - 1024 → tablet portrait · ≥ 1024 → tablet landscape
};

export const DEVICE_CLASSES = [
  {
    key: "phone-portrait",
    label: "Phone Portrait",
    range: "< 600 dp",
    example: "iPhone SE, 13, 15",
  },
  {
    key: "phone-landscape",
    label: "Phone Landscape",
    range: "600 - 768 dp",
    example: "Phones rotados, mini tablets",
  },
  {
    key: "tablet-portrait",
    label: "Tablet Portrait",
    range: "768 - 1024 dp",
    example: "iPad Mini, iPad estándar",
  },
  {
    key: "tablet-landscape",
    label: "Tablet Landscape",
    range: "≥ 1024 dp",
    example: "iPad Pro, foldables abiertos",
  },
];

/** Devuelve la clase de dispositivo a partir del ancho de ventana en dp. */
export function getDeviceClass(width) {
  if (width < BREAKPOINTS.phoneLandscape) return "phone-portrait";
  if (width < BREAKPOINTS.tabletPortrait) return "phone-landscape";
  if (width < BREAKPOINTS.tabletLandscape) return "tablet-portrait";
  return "tablet-landscape";
}

/** Número de columnas de la galería según el ancho de ventana (slide 19). */
export function getColumns(width) {
  if (width < BREAKPOINTS.phoneLandscape) return 2;
  if (width < BREAKPOINTS.tabletPortrait) return 3;
  if (width < BREAKPOINTS.tabletLandscape) return 4;
  return 6;
}
