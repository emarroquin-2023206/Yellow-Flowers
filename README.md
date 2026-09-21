# Flores amarillas

Detalle web hecho con HTML, CSS y JS. De una sola página (`index.html`):

1. **Pantalla inicial:** fondo de rosa con imagenes de rosas por todo el background, un cuadro central con el mensaje
   *"lamento la distancia"* y el botón *"abrir"*.
2. **Al pulsar "abrir":** empieza la música y, sobre el mismo fondo, se van
   dibujando 4 girasoles y ramas verdes de relleno. Al centro aparece un mensaje para dedicar.

## Canción

Se integro la canción te amo y mas del Libro de la vida como un archivo mp3 **`sound/te-amo-y-mas.mp3`**.
Sin ese archivo todo funciona igual.

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
