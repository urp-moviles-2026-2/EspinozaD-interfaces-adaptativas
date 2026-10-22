// 24 productos de ejemplo para la galería. Las imágenes vienen de picsum.photos (requiere internet).
const NAMES = [
  "Mochila urbana", "Audífonos", "Botella térmica", "Lámpara LED", "Teclado compacto", "Zapatillas",
  "Reloj deportivo", "Cámara instantánea", "Silla plegable", "Planta de interior", "Cafetera", "Libreta",
  "Parlante", "Gorra", "Mouse inalámbrico", "Tabla de skate", "Maceta", "Taza", "Bicicleta", "Casco",
  "Cargador portátil", "Lentes de sol", "Agenda", "Poncho",
];

export const PRODUCTS = NAMES.map((name, i) => ({
  id: String(i + 1),
  name,
  description: "Producto de ejemplo para practicar layouts adaptativos. Cambia de tamaño según el contenedor.",
  price: 49 + i * 7,
  uri: `https://picsum.photos/seed/urp-${i + 1}/400/400`,
}));
