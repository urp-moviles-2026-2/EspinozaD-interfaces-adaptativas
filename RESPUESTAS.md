# Sistemas Móviles y Plataformas Menores

# Guía - Interfaces Adaptativas con Dimensions API y useWindowDimensions

## Ejercicio 01 - Dimensions API y PixelRatio

¿Qué pasaría si usaras `SNAPSHOT.width` para decidir cuántas columnas mostrar en una galería?

- Las columnas se calcularían una sola vez, cuando carga el archivo, y después no cambiarían nunca. Por ejemplo, si la app abre en vertical con 2 columnas y luego se rota el teléfono, seguirían siendo 2 columnas aunque ahora haya mucho más ancho. Lo mismo pasaría al cambiar el tamaño de la ventana. Para evitarlo hay que calcular las columnas dentro del componente con `useWindowDimensions`, que sí se actualiza.

## Ejercicio 02 - useWindowDimensions

¿Por qué no puedes llamar `useWindowDimensions()` fuera de un componente, por ejemplo junto a `SNAPSHOT` del ejercicio 01?

- Porque es un hook, y los hooks solo se pueden usar dentro de un componente (o de otro hook). Fuera de un componente, React no tiene dónde guardar el valor ni a quién volver a renderizar cuando cambie el tamaño, y daría el error "Invalid hook call". Además, a nivel de archivo el código se ejecuta una sola vez, que es justo el problema de `SNAPSHOT`.

## Ejercicio 03 - Orientación: portrait y landscape

¿En qué caso real de tu proyecto final la misma pantalla debería cambiar de columna a fila?

- En una pantalla de resumen o dashboard. En vertical las tarjetas van una debajo de otra, y en horizontal caben en una fila y se pueden comparar a la vez. Pasaría igual en el detalle de un producto: la imagen arriba y los datos abajo en vertical, y la imagen a un lado y los datos al otro en horizontal.

## Ejercicio 04 - Breakpoints por clase de dispositivo

¿Por qué las funciones viven en `src/utils/` y no dentro de una pantalla? ¿Quién más las va a usar?

- Porque no pertenecen a una sola pantalla, las pueden necesitar varias. Si cada pantalla tuviera su propia copia, los valores podrían quedar distintos y habría que cambiarlos en muchos sitios. En `utils` están en un solo lugar. Las va a usar la galería (`getColumns` para las columnas), otras pantallas que cambien de layout según el tamaño, y los componentes del proyecto final.

## Ejercicio 05 - Áreas seguras: insets

La pantalla del ejercicio 07 (galería) se dibuja hasta el borde inferior. ¿Qué inset le falta y dónde lo aplicarías: en `App.js` o en la propia pantalla?

- Le falta `insets.bottom`, que es el espacio de la barra de gestos o del botón de inicio. Sin él, los últimos productos pueden quedar tapados. Lo aplicaría en la propia pantalla de la galería, como `paddingBottom` en el contenido de la lista, y no en `App.js`. Así la lista se sigue viendo hasta el borde y solo se deja el espacio al final del scroll. Además, `App.js` ya no aplica ese padding a la galería (`fullBleed`), porque cada pantalla decide cómo usar el borde.

## Ejercicio 06 - Tamaño por elemento: onLayout

¿Por qué `compact` exige `cardWidth > 0`? ¿Qué se vería en el primer render si no lo hicieras?

- Porque `cardWidth` empieza en 0 y `onLayout` se ejecuta después del primer render, así que ese 0 solo quiere decir que todavía no se midió. Sin la condición, `0 < 240` sería verdadero y todas las tarjetas se verían un instante en modo compacto (imagen pequeña, sin descripción y con "0 dp"), y luego saltarían a su tamaño real. Se vería como un parpadeo.

## Ejercicio 07 - Galería adaptativa: 1 componente, 4 layouts

La galería usa el ancho de la **ventana**. Si la metieras dentro de un panel lateral de 320 dp en tablet, ¿qué cambiarías para que siguiera funcionando? (pista: ejercicio 06)

- Dejaría de usar el ancho de la ventana y usaría el ancho del panel, medido con `onLayout` como en el ejercicio 06. Si no, la galería calcularía las columnas con el ancho de toda la pantalla (por ejemplo 6 columnas) y las celdas no cabrían en el panel. Con el ancho del panel (320 dp) saldrían 2 columnas. También habría que dibujar la lista solo cuando el ancho medido sea mayor a 0, igual que con `cardWidth > 0`.
EOF
