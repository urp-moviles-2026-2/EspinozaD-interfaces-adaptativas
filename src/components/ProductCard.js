import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Badge from "./Badge";
import { colors, spacing, radius } from "../theme";

const COMPACT_BELOW = 240; // dp: por debajo de este ancho la tarjeta pasa a modo compacto

/**
 * Tarjeta de producto que debe adaptarse a su CONTENEDOR, no a la pantalla (slide 18).
 * Hoy siempre se dibuja completa. Con onLayout va a medir su ancho real y pasar a modo compacto
 * por debajo de 240 dp: imagen más baja y sin descripción.
 */
export default function ProductCard({ product, style }) {
  const [cardWidth, setCardWidth] = useState(0);

  // TODO (Ejercicio 06, paso 2): compact es true cuando ya se midió (cardWidth > 0) y mide menos de COMPACT_BELOW.
  const compact = false;

  return (
    // TODO (Ejercicio 06, paso 1): agrega onLayout a esta View y guarda e.nativeEvent.layout.width con setCardWidth.
    <View style={[styles.card, style]}>
      {/* TODO (Ejercicio 06, paso 3): altura de imagen 80 en modo compacto, 140 en modo completo */}
      <Image source={{ uri: product.uri }} style={[styles.image, { height: 140 }]} />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        {/* TODO (Ejercicio 06, paso 3): ocultar la descripción en modo compacto */}
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>S/ {product.price}</Text>
          <Badge tone={compact ? "warn" : "primary"}>
            {compact ? "compacta" : "completa"} · {Math.round(cardWidth)} dp
          </Badge>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  image: { width: "100%", backgroundColor: colors.border },
  body: { padding: spacing.md, gap: spacing.xs },
  name: { fontSize: 15, fontWeight: "700", color: colors.text },
  description: { fontSize: 13, color: colors.muted, lineHeight: 18 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.xs },
  price: { fontSize: 15, fontWeight: "800", color: colors.primary },
});
