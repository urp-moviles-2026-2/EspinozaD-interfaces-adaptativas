# 🧭 Guía - Interfaces Adaptativas con Dimensions API y useWindowDimensions

> **Semana 06** · IF-1103 Sistemas Móviles y Plataformas Menores · Universidad Ricardo Palma
>
> Siete ejercicios, uno por cada punto de la [presentación de la S06](https://github.com/urp-moviles-2026-2/.github-private/blob/main/semanas/S06/slides/06-interfaces-adaptativas.pdf).
> Cada ejercicio tiene una pantalla en la app con los valores "en blanco" y uno o más `TODO` en el archivo indicado.
> Completa el `TODO`, recarga en Expo Go, **rota el teléfono** y compara con lo que dice la guía.

---

## 0. Antes de empezar

1. Crea tu copia desde la plantilla: botón **Use this template → Create a new repository**, en la organización `urp-moviles-2026-2`, con el nombre `ApellidoN-interfaces-adaptativas` (por ejemplo `RequenaR-interfaces-adaptativas`).
2. Clona tu copia e instala:

   ```bash
   git clone https://github.com/urp-moviles-2026-2/ApellidoN-interfaces-adaptativas.git
   cd ApellidoN-interfaces-adaptativas
   npm install
   npm run setup:vscode
   npx expo start
   ```
3. **Abre la carpeta en VS Code** (`code .`). `npm run setup:vscode` instala las extensiones del curso (Expo Tools, React Native Tools, ESLint, Prettier, snippets de React, GitLens, Claude Code y herramientas de Markdown). Si prefieres, al abrir la carpeta VS Code te mostrará la notificación *"Este workspace tiene recomendaciones de extensiones"*: pulsa **Instalar todas**. Luego recarga la ventana (`Cmd/Ctrl+Shift+P` → **Developer: Reload Window**).
4. Escanea el QR con **Expo Go**. Verás el menú con los 7 ejercicios.
5. **Desbloquea la rotación** en tu teléfono (Control Center en iOS, panel rápido en Android). Sin eso no hay landscape.
6. Mira `app.json`: `"orientation": "default"`. Si estuviera en `"portrait"`, la app nunca rotaría. Es la primera decisión adaptativa de un proyecto.

> 💡 Para probar como tablet sin tener una: `npx expo start --web` y cambia el ancho de la ventana del navegador, o usa las herramientas de desarrollador en modo dispositivo.

### Mapa de ejercicios

| #  | Ejercicio                            | Slides  | Archivo con los`TODO`                         |
| -- | ------------------------------------ | ------- | ----------------------------------------------- |
| 01 | Dimensions API y PixelRatio          | 7 - 9   | `src/screens/DimensionsScreen.js`             |
| 02 | useWindowDimensions                  | 10 - 12 | `src/screens/UseWindowDimensionsScreen.js`    |
| 03 | Orientación: portrait y landscape   | 13 - 15 | `src/screens/OrientationScreen.js`            |
| 04 | Breakpoints por clase de dispositivo | 17      | `src/utils/breakpoints.js`                    |
| 05 | Áreas seguras: insets               | 18      | `App.js` · `src/screens/SafeAreaScreen.js` |
| 06 | Tamaño por elemento: onLayout       | 19      | `src/components/ProductCard.js`               |
| 07 | Galería adaptativa                  | 20      | `src/screens/GalleryScreen.js`                |

Lo que **no** tienes que tocar: `src/components/Section.js`, `InfoRow.js`, `Badge.js`, `ExerciseMenu.js`, `src/data/products.js` y `src/theme.js`. Son la base visual para que te concentres en el layout.

---

## Ejercicio 01 - Dimensions API y PixelRatio

**Concepto.** `Dimensions.get('window')` devuelve el área visible para la app; `Dimensions.get('screen')`, la pantalla física completa con barras del sistema. Ambos son un **snapshot estático**: el valor del momento en que se llama. React Native trabaja en **dp** (density-independent pixels); `PixelRatio` traduce a píxeles físicos y expone la escala de fuente del usuario.

**Archivo:** `src/screens/DimensionsScreen.js`

1. Dentro del componente, reemplaza los objetos vacíos por `Dimensions.get("window")` y `Dimensions.get("screen")`.
2. En la sección "Densidad", reemplaza cada `"?"`:
   - `PixelRatio.get()`
   - `PixelRatio.getPixelSizeForLayoutSize(100)` seguido de `" px"`
   - `PixelRatio.getPixelSizeForLayoutSize(window.width)` seguido de `" px"`
   - `PixelRatio.getFontScale()`
3. Comprueba: en un iPhone 15 verás `window.width ≈ 393`, `PixelRatio.get() = 3` y `100 dp = 300 px`. En Android los números cambian, la relación no.
4. Ahora la trampa. A nivel de archivo, cambia `const SNAPSHOT = { width: 0, height: 0 }` por `const SNAPSHOT = Dimensions.get("window")`.
5. Recarga, entra al ejercicio y **rota el teléfono**: `SNAPSHOT.width` se queda con el valor inicial mientras `live.width` cambia. Vuelve a rotar. Ese snapshot a nivel de archivo es la causa número 1 de bugs responsive.

**Pregunta para tus notas.** ¿Qué pasaría si usaras `SNAPSHOT.width` para decidir cuántas columnas mostrar en una galería?

---

## Ejercicio 02 - useWindowDimensions

**Concepto.** Mismo dato que `Dimensions`, reactividad distinta. El hook devuelve `width`, `height`, `scale` y `fontScale`, se re-renderiza en cada cambio de tamaño (rotación, split-view, plegado), sin listeners ni cleanup manual. Es el camino recomendado por la documentación oficial para componentes.

**Archivo:** `src/screens/UseWindowDimensionsScreen.js`

1. Importa `useWindowDimensions` desde `react-native` y, **dentro** de `ResponsiveBox`, reemplaza las cuatro constantes fijas por:

   ```js
   const { width, height, scale, fontScale } = useWindowDimensions();
   ```
2. Calcula `const isLandscape = width > height;`.
3. Cambia el ancho fijo del cuadro por `width * 0.9`.
4. Comprueba: el cuadro ocupa el 90 % del ancho en portrait y en landscape, el badge cambia entre "vertical" y "horizontal", `scale` coincide con `PixelRatio.get()` del ejercicio 01.
5. Extra: cambia el tamaño de texto en Ajustes del teléfono y vuelve a la app. `fontScale` cambia solo. Eso es accesibilidad gratis si usas el hook.

**Pregunta.** ¿Por qué no puedes llamar `useWindowDimensions()` fuera de un componente, por ejemplo junto a `SNAPSHOT` del ejercicio 01?

---

## Ejercicio 03 - Orientación: portrait y landscape

**Concepto.** Para el 95 % de los casos basta comparar ancho y alto: `isPortrait = height >= width`. `expo-screen-orientation` solo hace falta para **bloquear o forzar** una orientación. La misma información puede merecer disposiciones distintas: `flexDirection` cambia con la orientación.

**Archivo:** `src/screens/OrientationScreen.js`

1. Importa `useWindowDimensions`, obtén `width` y `height` y reemplaza `const isPortrait = true` por la comparación.
2. En el contenedor de las tarjetas, cambia `flexDirection: "column"` por `isLandscape ? "row" : "column"`.
3. En cada tarjeta, agrega `flex: 1` solo cuando sea landscape para que las tres repartan el ancho:

   ```jsx
   <View key={card.id} style={[styles.card, isLandscape && { flex: 1 }]}>
   ```
4. Comprueba: en portrait las tarjetas se apilan y ocupan el ancho completo; en landscape van en fila, las tres del mismo ancho. El badge indica la orientación.

**Pregunta.** ¿En qué caso real de tu proyecto final la misma pantalla debería cambiar de columna a fila?

---

## Ejercicio 04 - Breakpoints por clase de dispositivo

**Concepto.** En móvil no se piensa en xs/sm/md/lg sino en **clases de dispositivo**: Phone Portrait (< 600 dp), Phone Landscape (600 - 768), Tablet Portrait (768 - 1024) y Tablet Landscape (≥ 1024). Material Design 3 usa clases parecidas (compact, medium, expanded). Lo importante no es el número exacto sino decidir por clase.

**Archivo:** `src/utils/breakpoints.js`

1. Implementa `getDeviceClass(width)` comparando con `BREAKPOINTS` en orden: menor que 600 → `"phone-portrait"`, menor que 768 → `"phone-landscape"`, menor que 1024 → `"tablet-portrait"`, si no → `"tablet-landscape"`.
2. Implementa `getColumns(width)`: 2, 3, 4 o 6 columnas con los mismos cortes.
3. Comprueba en la pantalla "Breakpoints": la fila de tu clase actual se resalta. En un teléfono normal verás `phone-portrait` y, al rotar, `phone-landscape` si el alto del teléfono supera los 600 dp (iPhone 15: 852 dp, sí; iPhone SE: 667 dp, sí). En web puedes estirar la ventana hasta tablet.

**Pregunta.** ¿Por qué las funciones viven en `src/utils/` y no dentro de una pantalla? ¿Quién más las va a usar?

---

## Ejercicio 05 - Áreas seguras: insets

**Concepto.** Desde Android 15 las apps dibujan de borde a borde por defecto y React Native 0.86 lo soporta por completo: tu contenido puede quedar **debajo de la barra de estado**. `SafeAreaView` de `react-native` está deprecado. Lo correcto es `react-native-safe-area-context`: `SafeAreaProvider` **una sola vez** en la raíz y `useSafeAreaInsets()` en las pantallas que lo necesiten. Nunca padding fijo "para el notch".

**Archivos:** `App.js` y `src/screens/SafeAreaScreen.js`

1. En `App.js`, importa `SafeAreaProvider` y `useSafeAreaInsets` desde `react-native-safe-area-context`. Envuelve `<Root />` con `<SafeAreaProvider>` en `App`. En `Root`, reemplaza el objeto fijo `{ top: 40, ... }` por `useSafeAreaInsets()`.
2. Recarga. Observa el header de la app: antes tenía 40 dp fijos "para el notch"; ahora usa el inset real. En un teléfono sin notch sobraban dp; en uno con Dynamic Island faltaban. Rota: el inset superior cambia y aparecen `left` o `right`.
3. En `SafeAreaScreen.js`, reemplaza el objeto con ceros por `useSafeAreaInsets()`.
4. Comprueba: las franjas verdes miden exactamente los insets de tu teléfono. En landscape, la franja del notch se mueve al costado.

**Pregunta.** La pantalla del ejercicio 07 (galería) se dibuja hasta el borde inferior. ¿Qué inset le falta y dónde lo aplicarías: en `App.js` o en la propia pantalla?

---

## Ejercicio 06 - Tamaño por elemento: onLayout

**Concepto.** A veces no importa la ventana, sino el **contenedor**. Un componente dentro de una columna de 300 dp no debería mirar el ancho de la pantalla. `onLayout` se dispara al montar y cada vez que el elemento cambia de tamaño, y devuelve `x`, `y`, `width` y `height` en dp. Regla de dos niveles: `useWindowDimensions` decide el layout de la pantalla; `onLayout` el layout interno de un componente reutilizable.

**Archivo:** `src/components/ProductCard.js`

1. Agrega a la `View` raíz:

   ```jsx
   onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
   ```
2. Calcula `const compact = cardWidth > 0 && cardWidth < COMPACT_BELOW;`.
3. En modo compacto la imagen mide 80 dp de alto (140 en completo) y la descripción no se muestra: `{!compact && <Text ...>}`.
4. Comprueba en la pantalla "onLayout": con 160 y 220 dp la tarjeta es compacta (badge naranja), con 300 y ancho completo es completa. El badge muestra el ancho medido.

**Pregunta.** ¿Por qué `compact` exige `cardWidth > 0`? ¿Qué se vería en el primer render si no lo hicieras?

---

## Ejercicio 07 - Galería adaptativa: 1 componente, 4 layouts

**Concepto.** El taller en vivo de la presentación: calcular cuántas columnas mostrar según el ancho de ventana. Un solo componente reactivo que da 2, 3, 4 o 6 columnas según la clase de dispositivo. `FlatList` necesita `key={columns}` para recalcular cuando cambia `numColumns`.

**Archivo:** `src/screens/GalleryScreen.js`

1. Obtén `width` con `useWindowDimensions`.
2. `const columns = getColumns(width);` y `const itemWidth = width / columns;` (las funciones del ejercicio 04).
3. Agrega `key={columns}` al `FlatList`.
4. Comprueba: 2 columnas en portrait, 3 en landscape; en web, al estirar la ventana, 4 y 6. Las celdas son cuadradas y ocupan todo el ancho sin dejar hueco.
5. Quita `key={columns}` un momento y rota: React Native lanza el error "Changing numColumns on the fly is not supported". Vuelve a ponerlo. Ahora sabes para qué sirve.

**Pregunta.** La galería usa el ancho de la **ventana**. Si la metieras dentro de un panel lateral de 320 dp en tablet, ¿qué cambiarías para que siguiera funcionando? (pista: ejercicio 06)

---

## Reto final - Tu proyecto, en cualquier pantalla

Es la actividad en clase de la S06. Aplica lo anterior al **proyecto final de tu equipo**:

| Paso                  | Qué hacer                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| 01**Audita**    | Busca`width: 350`, `height: 600` o cualquier px fijo que dependa de la pantalla. Anótalos          |
| 02**Reemplaza** | `useWindowDimensions` y porcentajes o flex. Elimina cualquier `Dimensions.get()` a nivel de archivo |
| 03**Protege**   | `SafeAreaProvider` en `App.js` y `useSafeAreaInsets` en la pantalla principal                     |
| 04**Adapta**    | Tu lista o galería cambia de columnas con los breakpoints de hoy                                       |

Evidencia: commit en el repositorio del proyecto y dos capturas, portrait y landscape (o tablet / web).

> ✅ **Reto opcional:** una tarjeta de tu proyecto pasa a modo compacto con `onLayout` cuando mide menos de 240 dp.

---

## ✅ Checklist

- [ ] Los 7 ejercicios muestran valores reales y reaccionan al rotar el teléfono
- [ ] No queda ningún `TODO` en `src/` ni en `App.js`
- [ ] `App.js` tiene `SafeAreaProvider` una sola vez y ningún padding fijo "para el notch"
- [ ] Respondí las 7 preguntas en mis notas
- [ ] Hice commit de cada ejercicio con un mensaje claro (`Ejercicio 03: orientación`)

## 🆘 Problemas frecuentes

| Síntoma                                             | Causa probable                                                                                                  |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| La app no rota                                       | Rotación bloqueada en el teléfono, o`"orientation": "portrait"` en `app.json`                             |
| `Invalid hook call`                                | Llamaste`useWindowDimensions` o `useSafeAreaInsets` fuera de un componente (por ejemplo a nivel de archivo) |
| Los insets son todos 0                               | Falta`SafeAreaProvider` en la raíz, o lo pusiste dentro de la pantalla en lugar de `App.js`                |
| `Changing numColumns on the fly is not supported`  | Falta`key={columns}` en el `FlatList`                                                                       |
| Las imágenes no cargan                              | Sin internet: las fotos vienen de picsum.photos. El layout se ve igual con el fondo gris                        |
| `Unable to resolve react-native-safe-area-context` | Falta`npm install` después de clonar                                                                         |
| `npm run setup:vscode` dice que no encuentra `code`  | El comando `code` no está en el PATH. En VS Code: `Cmd/Ctrl+Shift+P` → **Shell Command: Install 'code' command in PATH** |
| VS Code no sugiere extensiones al abrir la carpeta   | Abriste un archivo suelto y no la carpeta del proyecto, o tienes desactivado `extensions.ignoreRecommendations` |

---

📚 [Volver a la Semana 06](https://github.com/urp-moviles-2026-2/.github-private/blob/main/semanas/S06/README.md)
