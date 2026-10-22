import { useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import { colors, spacing, radius } from "../theme";

const WIDTHS = [160, 220, 300, "100%"];

export default function OnLayoutScreen() {
  const [containerWidth, setContainerWidth] = useState(300);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Tamaño por elemento con onLayout">
        <Text style={styles.note}>
          La tarjeta no mira la pantalla: mide su propio ancho con onLayout y pasa a modo compacto por debajo de 240 dp.
          Cambia el ancho del contenedor:
        </Text>
        <View style={styles.chips}>
          {WIDTHS.map((w) => (
            <Pressable
              key={String(w)}
              onPress={() => setContainerWidth(w)}
              style={[styles.chip, containerWidth === w && styles.chipActive]}
            >
              <Text style={[styles.chipText, containerWidth === w && styles.chipTextActive]}>
                {typeof w === "number" ? `${w} dp` : "ancho completo"}
              </Text>
            </Pressable>
          ))}
        </View>
      </Section>

      <View style={[styles.frame, { width: containerWidth }]}>
        <ProductCard product={PRODUCTS[0]} />
      </View>

      <Section title="Regla de dos niveles">
        <Text style={styles.note}>
          useWindowDimensions decide el layout de la pantalla (columnas, orientación). onLayout decide el layout interno de un
          componente reutilizable. Con los dos cubres casi todo.
        </Text>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  note: { fontSize: 13, color: colors.muted, lineHeight: 18 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13, color: colors.text, fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  frame: {
    alignSelf: "flex-start",
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.warn,
  },
});
