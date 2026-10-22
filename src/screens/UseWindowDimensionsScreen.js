import { ScrollView, View, Text, StyleSheet } from "react-native";
import Section from "../components/Section";
import InfoRow from "../components/InfoRow";
import Badge from "../components/Badge";
import { colors, spacing, radius } from "../theme";

/** ResponsiveBox de la slide 11: debe ocupar el 90 % del ancho y re-renderizarse al rotar. */
function ResponsiveBox() {
  // TODO (Ejercicio 02, paso 1): importa useWindowDimensions de react-native y obtén width, height, scale y fontScale.
  // Recuerda: el hook va DENTRO del componente, nunca en el nivel superior del archivo.
  const width = 360;
  const height = 780;
  const scale = "?";
  const fontScale = "?";

  // TODO (Ejercicio 02, paso 2): calcula isLandscape comparando width y height.
  const isLandscape = false;

  return (
    // TODO (Ejercicio 02, paso 3): el ancho del cuadro debe ser el 90 % de la ventana (width * 0.9).
    <View style={[styles.box, { width: 300 }]}>
      <Badge tone={isLandscape ? "info" : "primary"}>{isLandscape ? "horizontal" : "vertical"}</Badge>
      <InfoRow label="width" value={`${width.toFixed(0)} dp`} />
      <InfoRow label="height" value={`${height.toFixed(0)} dp`} />
      <InfoRow label="scale" value={scale} hint="Igual a PixelRatio.get()" />
      <InfoRow label="fontScale" value={fontScale} hint="Cambia en Ajustes → Tamaño de texto" />
      <Text style={styles.note}>Este cuadro debe medir siempre el 90 % del ancho de la ventana. Rota el teléfono.</Text>
    </View>
  );
}

export default function UseWindowDimensionsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="useWindowDimensions()">
        <Text style={styles.note}>
          Mismo dato que Dimensions, reactividad distinta: sin listeners, sin cleanup, se actualiza con rotación, split-view y plegado.
        </Text>
      </Section>
      <View style={{ alignItems: "center" }}>
        <ResponsiveBox />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  box: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  note: { fontSize: 13, color: colors.muted, lineHeight: 18 },
});
