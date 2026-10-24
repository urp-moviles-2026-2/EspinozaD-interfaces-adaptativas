import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Badge from "../components/Badge";
import { PRODUCTS } from "../data/products";
import { getColumns, getDeviceClass } from "../utils/breakpoints";
import { colors, spacing } from "../theme";

/** Slide 19: galería adaptativa. Un componente, cuatro layouts según el ancho de ventana. */
export default function GalleryScreen() {
  // Paso 1: ancho de ventana en vivo
  const { width } = useWindowDimensions();

  // Paso 2: columnas según la clase de dispositivo y ancho de cada celda
  const columns = getColumns(width);
  const itemWidth = width / columns;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Badge>{columns} columnas</Badge>
        <Badge tone="info">{getDeviceClass(width)}</Badge>
        <Text style={styles.hint}>{width.toFixed(0)} dp</Text>
      </View>
      {/* Paso 3: key={columns} fuerza a FlatList a remontarse cuando cambia numColumns */}
      <FlatList
        key={columns}
        data={PRODUCTS}
        keyExtractor={(p) => p.id}
        numColumns={columns}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth, height: itemWidth, padding: 2 }}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.caption} numberOfLines={1}>
              {item.name}
            </Text>
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
