import { ScrollView, View, Text, useWindowDimensions, StyleSheet } from "react-native";
import Section from "../components/Section";
import InfoRow from "../components/InfoRow";
import Badge from "../components/Badge";
import { DEVICE_CLASSES, getDeviceClass, getColumns } from "../utils/breakpoints";
import { colors, spacing, radius } from "../theme";

export default function BreakpointsScreen() {
  const { width } = useWindowDimensions();
  const deviceClass = getDeviceClass(width);
  const columns = getColumns(width);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Clase de dispositivo actual">
        <InfoRow label="Ancho de ventana" value={`${width.toFixed(0)} dp`} />
        <InfoRow label="getDeviceClass(width)" value={deviceClass} />
        <InfoRow label="getColumns(width)" value={`${columns} columnas`} hint="Lo usa la galería del ejercicio 07" />
      </Section>

      <Section title="Breakpoints por clase de dispositivo">
        {DEVICE_CLASSES.map((c) => {
          const active = c.key === deviceClass;
          return (
            <View key={c.key} style={[styles.row, active && styles.rowActive]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, active && { color: colors.primary }]}>{c.label}</Text>
                <Text style={styles.hint}>{c.example}</Text>
              </View>
              <Badge tone={active ? "primary" : "info"}>{c.range}</Badge>
            </View>
          );
        })}
        <Text style={styles.note}>
          Material Design 3 usa clases parecidas (compact {"<"} 600, medium {"<"} 840, expanded ≥ 840). Lo importante no es el número exacto sino decidir por clase.
        </Text>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "transparent",
  },
  rowActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  label: { fontSize: 14, fontWeight: "700", color: colors.text },
  hint: { fontSize: 12, color: colors.muted, marginTop: 2 },
  note: { fontSize: 13, color: colors.muted, lineHeight: 18, marginTop: spacing.sm },
});
