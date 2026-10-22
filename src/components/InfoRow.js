import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../theme";

/** Fila etiqueta / valor para mostrar medidas del dispositivo. */
export default function InfoRow({ label, value, hint }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: { fontSize: 14, color: colors.text },
  hint: { fontSize: 12, color: colors.muted, marginTop: 2 },
  value: { fontSize: 15, fontWeight: "700", color: colors.primary, fontVariant: ["tabular-nums"] },
});
