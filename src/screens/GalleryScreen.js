import { FlatList, Image, View, Text, StyleSheet } from "react-native";
import Badge from "../components/Badge";
import { PRODUCTS } from "../data/products";
import { getColumns, getDeviceClass } from "../utils/breakpoints";
import { colors, spacing } from "../theme";

/** Slide 19: galería adaptativa. Un componente, cuatro layouts según el ancho de ventana. */
export default function GalleryScreen() {
  // TODO (Ejercicio 07, paso 1): obtén width con useWindowDimensions.
  const width = 360;

  // TODO (Ejercicio 07, paso 2): columnas con getColumns(width) y ancho de cada celda = width / columns.
  const columns = 2;
  const itemWidth = 180;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Badge>{columns} columnas</Badge>
        <Badge tone="info">{getDeviceClass(width)}</Badge>
        <Text style={styles.hint}>{width.toFixed(0)} dp</Text>
      </View>
      {/* TODO (Ejercicio 07, paso 3): agrega key={columns} para que FlatList recalcule cuando cambia numColumns */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(p) => p.id}
        numColumns={columns}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth, height: itemWidth, padding: 2 }}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.caption} numberOfLines={1}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  hint: { marginLeft: "auto", color: colors.muted, fontSize: 12 },
  image: { flex: 1, borderRadius: 6, backgroundColor: colors.border },
  caption: {
    position: "absolute",
    left: 6,
    right: 6,
    bottom: 6,
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowRadius: 4,
  },
});
