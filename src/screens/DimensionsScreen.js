import {
  ScrollView,
  Text,
  Dimensions,
  PixelRatio,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import Section from "../components/Section";
import InfoRow from "../components/InfoRow";
import Badge from "../components/Badge";
import { colors, spacing } from "../theme";

// Paso 4: snapshot a nivel de archivo. Se evalúa UNA sola vez, al importar el módulo.
const SNAPSHOT = Dimensions.get("window");

export default function DimensionsScreen() {
  // Paso 1: snapshots dentro del componente (se recalculan en cada render, pero no son reactivos)
  const window = Dimensions.get("window");
  const screen = Dimensions.get("screen");
  const live = useWindowDimensions(); // referencia para comparar

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Dimensions.get('window') vs ('screen')">
        <InfoRow
          label="window.width"
          value={`${window.width.toFixed(0)} dp`}
          hint="Área visible para la app"
        />
        <InfoRow
          label="window.height"
          value={`${window.height.toFixed(0)} dp`}
        />
        <InfoRow
          label="screen.width"
          value={`${screen.width.toFixed(0)} dp`}
          hint="Pantalla física completa, con barras"
        />
        <InfoRow
          label="screen.height"
          value={`${screen.height.toFixed(0)} dp`}
        />
        <Text style={styles.note}>
          En iOS window excluye la status bar. En Android edge-to-edge (15+)
          window y screen se parecen cada vez más.
        </Text>
      </Section>

      <Section title="Densidad: dp vs píxeles físicos">
        {/* Paso 2 y 3 */}
        <InfoRow
          label="PixelRatio.get()"
          value={`${PixelRatio.get()}`}
          hint="px físicos por cada dp"
        />
        <InfoRow
          label="100 dp en píxeles"
          value={`${PixelRatio.getPixelSizeForLayoutSize(100)} px`}
          hint="getPixelSizeForLayoutSize(100)"
        />
        <InfoRow
          label="Ancho físico"
          value={`${PixelRatio.getPixelSizeForLayoutSize(window.width)} px`}
          hint="window.width × PixelRatio"
        />
        <InfoRow
          label="PixelRatio.getFontScale()"
          value={`${PixelRatio.getFontScale()}`}
          hint="Escala de fuente del usuario: respétala"
        />
      </Section>

      <Section title="La trampa del snapshot">
        <Badge tone="danger">constante a nivel de archivo</Badge>
        <InfoRow
          label="SNAPSHOT.width"
          value={`${SNAPSHOT.width.toFixed(0)} dp`}
          hint="Dimensions.get() al cargar el archivo"
        />
        <Badge tone="primary" style={{ marginTop: spacing.sm }}>
          useWindowDimensions (en vivo)
        </Badge>
        <InfoRow
          label="live.width"
          value={`${live.width.toFixed(0)} dp`}
          hint="Se actualiza al rotar"
        />
        <Text style={styles.note}>
          Rota el teléfono. El snapshot se queda con el valor inicial; el valor
          en vivo cambia. Esa es la causa número 1 de bugs responsive.
        </Text>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  note: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
});
