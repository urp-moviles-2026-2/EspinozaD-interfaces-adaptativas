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

  // Paso 2: compact solo es true cuando ya se midió y el ancho es menor al umbral
  const compact = cardWidth > 0 && cardWidth < COMPACT_BELOW;

  return (
    // Paso 1: onLayout mide el ancho real de la tarjeta
    <View
      style={[styles.card, style]}
      onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
    >
      {/* Paso 3: 80 dp de alto en compacto, 140 en completo */}
      <Image
        source={{ uri: product.uri }}
        style={[styles.image, { height: compact ? 80 : 140 }]}
      />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        {/* Paso 3: la descripción solo se muestra en modo completo */}
        {!compact && (
          <Text style={styles.description}>{product.description}</Text>
        )}
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  price: { fontSize: 15, fontWeight: "800", color: colors.primary },
});
