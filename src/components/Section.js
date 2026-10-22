import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../theme";

/** Tarjeta con título para agrupar contenido en los ejercicios. */
export default function Section({ title, children, style }) {
  return (
    <View style={[styles.card, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 16, fontWeight: "700", color: colors.text, marginBottom: spacing.xs },
});
