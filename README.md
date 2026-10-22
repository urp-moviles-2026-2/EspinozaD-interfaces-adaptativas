# 📐 Interfaces Adaptativas - plantilla base

> **Semana 06** · IF-1103 Sistemas Móviles y Plataformas Menores · Universidad Ricardo Palma · 2026-2

App Expo (SDK 57) con **7 ejercicios**, uno por cada punto de la presentación de la S06: Dimensions API y
PixelRatio, `useWindowDimensions`, orientación, breakpoints, áreas seguras, `onLayout` y una galería adaptativa.
Cada ejercicio trae su pantalla lista y uno o más `TODO` que debes completar.

👉 **Sigue la [GUÍA](./GUIA.md)** paso a paso.

## Empezar

1. **Use this template → Create a new repository** en la organización, con el nombre `ApellidoN-interfaces-adaptativas`.
2. Clona tu copia y ejecuta:

   ```bash
   npm install
   npx expo start
   ```

3. Abre la app en **Expo Go**, desbloquea la rotación del teléfono y entra al primer ejercicio.

## Extensiones de VS Code

Al abrir la carpeta, VS Code te ofrecerá instalar las extensiones recomendadas (`.vscode/extensions.json`):
Expo Tools, React Native Tools, ESLint, Prettier, snippets de React, GitLens, Claude Code y un paquete de
Markdown / documentación. Acepta la notificación o instálalas todas de golpe con:

```bash
npm run setup:vscode
```

> Requiere el comando `code` en el PATH. En macOS/Linux: `Cmd+Shift+P` → **Shell Command: Install 'code' command in PATH**.
> En Windows viene activado al instalar VS Code con la opción *Add to PATH*.

## Estructura

```
App.js                              ← Menú de ejercicios + header (Ejercicio 05: SafeAreaProvider)
src/
├── theme.js                        ← Colores y espaciados
├── data/products.js                ← 24 productos de ejemplo
├── utils/breakpoints.js            ← Ejercicio 04: getDeviceClass, getColumns
├── components/
│   ├── Section.js · InfoRow.js · Badge.js · ExerciseMenu.js   ← base visual, no se tocan
│   └── ProductCard.js              ← Ejercicio 06: onLayout
└── screens/
    ├── DimensionsScreen.js         ← Ejercicio 01
    ├── UseWindowDimensionsScreen.js← Ejercicio 02
    ├── OrientationScreen.js        ← Ejercicio 03
    ├── BreakpointsScreen.js        ← Ejercicio 04 (usa utils)
    ├── SafeAreaScreen.js           ← Ejercicio 05
    ├── OnLayoutScreen.js           ← Ejercicio 06 (usa ProductCard)
    └── GalleryScreen.js            ← Ejercicio 07
```

## Dependencias

- `expo` ~57 · `react-native` 0.86 · `react` 19
- `react-native-safe-area-context` para las áreas seguras (viene en toda plantilla de Expo; React Navigation lo usa en la S07)
- `react-native-web` + `react-dom` solo para probar como tablet con `npx expo start --web`

Solución de referencia: [`interfaces-adaptativas-solucion`](https://github.com/urp-moviles-2026-2/interfaces-adaptativas-solucion) · Sesión: [Semana 06](https://github.com/urp-moviles-2026-2/.github-private/blob/main/semanas/S06/README.md)
