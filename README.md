# 🌻 Flores amarillas (versión rositas)

Detalle web hecho con HTML, CSS y JS. Una sola página (`index.html`):

1. **Pantalla inicial:** fondo de rositas, un cuadro central con el mensaje
   *"lamento la distancia🤍🩷"* y el botón *"abrir🎁"*.
2. **Al pulsar "abrir":** empieza la música y, sobre el mismo fondo, se van
   dibujando 4 girasoles y ramitas verdes de relleno. Al centro aparece el mensaje:
   *"Estas flores amarillas son un reflejo de la alegría que traes a mi vida…"*.

## Canción

Coloca el archivo **`sound/te-amo-y-mas.mp3`** ("Te amo y más", de *El libro de la vida*).
Sin ese archivo todo funciona igual, pero sin música. Ver `sound/LEEME.txt`.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Estructura: cuadro inicial, botón y mensaje |
| `css/style.css` | Estilos, posición de los girasoles y animación de dibujado |
| `garden.js` | Genera los girasoles y las ramitas (SVG) |
| `main.js` | Botón "abrir": inicia música y animación |
| `img/rositas.svg` | Mosaico de rositas del fondo |

## Cómo ver el proyecto

Abre `index.html` en el navegador (o usa Live Server en VS Code).

Basado en el tutorial: https://youtu.be/ZSSOiJaMIk0
