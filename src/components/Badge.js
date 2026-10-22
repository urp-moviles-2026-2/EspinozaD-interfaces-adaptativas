import { Text, StyleSheet } from "react-native";
import { colors, radius, spacing } from "../theme";

const TONES = {
  primary: { bg: colors.primarySoft, fg: colors.primary },
  warn: { bg: colors.warnSoft, fg: colors.warn },
  danger: { bg: colors.dangerSoft, fg: colors.danger },
  info: { bg: colors.infoSoft, fg: colors.info },
};

/** Etiqueta pequeña de estado: "Portrait", "2 columnas", "snapshot"... */
export default function Badge({ children, tone = "primary", style }) {
  const t = TONES[tone] ?? TONES.primary;
  return <Text style={[styles.badge, { backgroundColor: t.bg, color: t.fg }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
  },
});
