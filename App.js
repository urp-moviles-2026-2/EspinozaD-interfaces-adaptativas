import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
// TODO (Ejercicio 05, paso 1): importa SafeAreaProvider y useSafeAreaInsets de react-native-safe-area-context
import ExerciseMenu from "./src/components/ExerciseMenu";
import DimensionsScreen from "./src/screens/DimensionsScreen";
import UseWindowDimensionsScreen from "./src/screens/UseWindowDimensionsScreen";
import OrientationScreen from "./src/screens/OrientationScreen";
import BreakpointsScreen from "./src/screens/BreakpointsScreen";
import SafeAreaScreen from "./src/screens/SafeAreaScreen";
import OnLayoutScreen from "./src/screens/OnLayoutScreen";
import GalleryScreen from "./src/screens/GalleryScreen";
import { colors, spacing } from "./src/theme";

export const EXERCISES = [
  { key: "dimensions", title: "Dimensions API y PixelRatio", file: "src/screens/DimensionsScreen.js", Screen: DimensionsScreen },
  { key: "hook", title: "useWindowDimensions", file: "src/screens/UseWindowDimensionsScreen.js", Screen: UseWindowDimensionsScreen },
  { key: "orientation", title: "Orientación: portrait y landscape", file: "src/screens/OrientationScreen.js", Screen: OrientationScreen },
  { key: "breakpoints", title: "Breakpoints por clase de dispositivo", file: "src/utils/breakpoints.js", Screen: BreakpointsScreen },
  { key: "safearea", title: "Áreas seguras: insets", file: "App.js · src/screens/SafeAreaScreen.js", Screen: SafeAreaScreen },
  { key: "onlayout", title: "Tamaño por elemento: onLayout", file: "src/components/ProductCard.js", Screen: OnLayoutScreen },
  { key: "gallery", title: "Galería adaptativa", file: "src/screens/GalleryScreen.js", Screen: GalleryScreen },
];

/**
 * Navegación mínima con useState para cambiar de ejercicio.
 * En la Semana 07 esto se reemplaza por React Navigation; aquí basta para practicar layouts.
 */
function Root() {
  const [current, setCurrent] = useState(null);
  // TODO (Ejercicio 05, paso 1): esto es el anti-patrón de la slide 17: padding fijo "para el notch".
  // Reemplázalo por los insets reales de useSafeAreaInsets().
  const insets = { top: 40, bottom: 0, left: 0, right: 0 };
  const exercise = EXERCISES.find((e) => e.key === current);
  const fullBleed = exercise?.key === "safearea" || exercise?.key === "gallery";

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right }]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        {exercise ? (
          <Pressable onPress={() => setCurrent(null)} hitSlop={10}>
            <Text style={styles.back}>‹ Ejercicios</Text>
          </Pressable>
        ) : null}
        <Text style={styles.title} numberOfLines={1}>{exercise ? exercise.title : "Interfaces adaptativas"}</Text>
      </View>
      <View style={[styles.content, !fullBleed && { paddingBottom: insets.bottom }]}>
        {exercise ? <exercise.Screen /> : <ExerciseMenu exercises={EXERCISES} onSelect={setCurrent} />}
      </View>
    </View>
  );
}

export default function App() {
  // TODO (Ejercicio 05, paso 1): envuelve <Root /> con <SafeAreaProvider>, una sola vez, aquí en la raíz.
  return <Root />;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  back: { color: colors.primary, fontSize: 16, fontWeight: "700" },
  title: { flex: 1, fontSize: 17, fontWeight: "800", color: colors.text },
  content: { flex: 1 },
});
