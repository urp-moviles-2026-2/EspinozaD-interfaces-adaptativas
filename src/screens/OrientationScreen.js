import { ScrollView, View, Text, StyleSheet } from "react-native";
import Section from "../components/Section";
import Badge from "../components/Badge";
import { colors, spacing, radius } from "../theme";

const CARDS = [
  { id: "1", title: "Resumen", body: "Ventas de hoy y pedidos pendientes." },
  { id: "2", title: "Actividad", body: "Últimos movimientos de la cuenta." },
  { id: "3", title: "Accesos", body: "Atajos a las acciones frecuentes." },
];

export default function OrientationScreen() {
  // TODO (Ejercicio 03, paso 1): obtén width y height con useWindowDimensions y calcula
  // isPortrait = height >= width (opción 1 de la slide 13: sin librerías, siempre actualizado).
  const isPortrait = true;
  const isLandscape = !isPortrait;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Detectar la orientación">
        <Badge tone={isLandscape ? "info" : "primary"}>{isLandscape ? "LANDSCAPE · flexDirection: row" : "PORTRAIT · flexDirection: column"}</Badge>
        <Text style={styles.note}>
          const isPortrait = height {">="} width. Para bloquear o forzar la orientación se usa expo-screen-orientation o "orientation" en app.json.
        </Text>
      </Section>

      {/* TODO (Ejercicio 03, paso 2): en landscape las tarjetas van en fila (flexDirection: "row") y cada una con flex: 1;
          en portrait, apiladas en columna (slide 14). */}
      <View style={{ flexDirection: "column", gap: spacing.md }}>
        {CARDS.map((card) => (
          <View key={card.id} style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardBody}>{card.body}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  note: { fontSize: 13, color: colors.muted, lineHeight: 18 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    minHeight: 110,
    gap: spacing.xs,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  cardBody: { fontSize: 13, color: colors.muted },
});
