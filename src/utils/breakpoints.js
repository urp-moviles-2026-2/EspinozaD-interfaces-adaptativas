// Breakpoints por clase de dispositivo (slide 17). En móvil decidimos por clase, no por xs/sm/md/lg.
export const BREAKPOINTS = {
  phoneLandscape: 600, // < 600 dp  → phone portrait
  tabletPortrait: 768, // 600 - 768 → phone landscape
  tabletLandscape: 1024, // 768 - 1024 → tablet portrait · ≥ 1024 → tablet landscape
};

export const DEVICE_CLASSES = [
  { key: "phone-portrait", label: "Phone Portrait", range: "< 600 dp", example: "iPhone SE, 13, 15" },
  { key: "phone-landscape", label: "Phone Landscape", range: "600 - 768 dp", example: "Phones rotados, mini tablets" },
  { key: "tablet-portrait", label: "Tablet Portrait", range: "768 - 1024 dp", example: "iPad Mini, iPad estándar" },
  { key: "tablet-landscape", label: "Tablet Landscape", range: "≥ 1024 dp", example: "iPad Pro, foldables abiertos" },
];

/** Devuelve la clase de dispositivo a partir del ancho de ventana en dp. */
export function getDeviceClass(width) {
  // TODO (Ejercicio 04): devolver "phone-portrait", "phone-landscape", "tablet-portrait" o
  // "tablet-landscape" comparando width con los valores de BREAKPOINTS.
  return "phone-portrait";
}

/** Número de columnas de la galería según el ancho de ventana (slide 19). */
export function getColumns(width) {
  // TODO (Ejercicio 04): 2 columnas por debajo de 600 dp, 3 por debajo de 768, 4 por debajo de 1024 y 6 en adelante.
  return 2;
}
