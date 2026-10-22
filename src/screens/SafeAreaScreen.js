import { View, Text, ScrollView, StyleSheet } from "react-native";
import Section from "../components/Section";
import InfoRow from "../components/InfoRow";
import { colors, spacing } from "../theme";

/**
 * Slide 17: SafeAreaProvider va UNA vez en la raíz (App.js); useSafeAreaInsets en las pantallas que lo necesiten.
 * Esta pantalla debe pintar franjas con los insets reales para que se vean las áreas no seguras.
 */
export default function SafeAreaScreen() {
  // TODO (Ejercicio 05, paso 2): importa useSafeAreaInsets de react-native-safe-area-context y reemplaza este objeto.
  const insets = { top: 0, bottom: 0, left: 0, right: 0 };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.band, { height: insets.top }]}><Text style={styles.bandText}>top {insets.top.toFixed(0)}</Text></View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={[styles.band, { width: insets.left }]} />
        <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
          <Section title="useSafeAreaInsets()">
            <InfoRow label="insets.top" value={`${insets.top.toFixed(0)} dp`} hint="Status bar, notch o Dynamic Island" />
            <InfoRow label="insets.bottom" value={`${insets.bottom.toFixed(0)} dp`} hint="Barra de gestos / home indicator" />
            <InfoRow label="insets.left" value={`${insets.left.toFixed(0)} dp`} hint="En landscape, el notch queda a un lado" />
            <InfoRow label="insets.right" value={`${insets.right.toFixed(0)} dp`} />
            <Text style={styles.note}>
              Las franjas verdes deben ser exactamente los insets. Rota el teléfono: en landscape el inset del notch pasa a left o right.
              Nunca sumes padding fijo "para el notch".
            </Text>
          </Section>
          <Section title="Por qué ya no SafeAreaView de react-native">
            <Text style={styles.note}>
              Está deprecado: solo iOS, sin insets dinámicos, no sirve para headers, tabs ni modales. Desde Android 15 las apps
              dibujan de borde a borde por defecto, así que el contenido queda debajo de la barra de estado si no lo proteges.
            </Text>
          </Section>
        </ScrollView>
        <View style={[styles.band, { width: insets.right }]} />
      </View>
      <View style={[styles.band, { height: insets.bottom }]}><Text style={styles.bandText}>bottom {insets.bottom.toFixed(0)}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  band: { backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  bandText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  note: { fontSize: 13, color: colors.muted, lineHeight: 18, marginTop: spacing.sm },
});
