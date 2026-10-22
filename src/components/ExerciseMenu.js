import { FlatList, Pressable, Text, View, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../theme";

/** Lista de ejercicios. Recibe los ejercicios y avisa cuál se eligió. */
export default function ExerciseMenu({ exercises, onSelect }) {
  return (
    <FlatList
      data={exercises}
      keyExtractor={(e) => e.key}
      contentContainerStyle={{ padding: spacing.lg, gap: spacing.sm }}
      ListHeaderComponent={
        <Text style={styles.intro}>
          Semana 06 · Interfaces adaptativas. Abre cada ejercicio, completa los TODO del archivo indicado y
          rota el teléfono para comprobar el resultado.
        </Text>
      }
      renderItem={({ item, index }) => (
        <Pressable onPress={() => onSelect(item.key)} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{String(index + 1).padStart(2, "0")}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.file}>{item.file}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.muted, fontSize: 14, lineHeight: 20, marginBottom: spacing.sm },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.7 },
  number: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: { color: colors.primary, fontWeight: "800" },
  title: { fontSize: 15, fontWeight: "700", color: colors.text },
  file: { fontSize: 12, color: colors.muted, marginTop: 2 },
  chevron: { fontSize: 24, color: colors.muted },
});
