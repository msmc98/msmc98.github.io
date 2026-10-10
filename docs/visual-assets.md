# Imágenes del portfolio

## Aficiones

Las 25 tarjetas sirven imágenes individuales desde `public/images/hobbies/`. No utilizan imágenes generadas ni montajes de distintas aficiones.

`src/data/hobby-images.json` conserva la fuente, URL de descarga, crédito, fecha y dimensiones de cada archivo. Se optimizan a WebP, con calidad 88 y sin ampliar las imágenes originales.

- Viajes y animales: fotografías de Wikipedia/Wikimedia. París: Benh LIEU SONG, [Tour Eiffel Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Tour_Eiffel_Wikimedia_Commons.jpg), CC BY-SA 3.0; redimensionada y convertida a WebP.
- Deportes: fotografías de Pexels; enlaces originales registrados en el manifiesto.
- Cine y anime: carteles y portadas originales, conservando su proporción.
- Videojuegos: material oficial de Riot Games, Pokémon y las fichas de Steam.
- Kawasaki Z125: fotografía del modelo publicada por Kawasaki. No se presenta como una fotografía de la moto concreta de Manuel.

Cada tarjeta y su visor incluyen un enlace a la fuente. Los carteles, videojuegos y marcas conservan la autoría de sus respectivos titulares; la disponibilidad pública no se identifica como una licencia libre.

## Empresas de la experiencia laboral

`public/images/employers/` contiene los seis logos obtenidos de las webs oficiales de las empresas del CV. `src/data/employer-logos.json` registra las URLs, dimensiones y fechas de descarga. Se conserva el diseño original y se convierte a PNG para servirlo localmente.

- AdGency Pixel: adgencypixel.com.
- Soluciones Informáticas MJ (SiMJ): simj.es; identidad confirmada en su aviso legal.
- TicTac Comunicación: tictac-comunicacion.es.
- WhiteKong Software: whitekongsoftware.com.
- Aventus Online (Eccuo), según la denominación del CV: eccuo.com.
- Aicor Consultores: aicor.com.

El logo y el nombre de cada empresa enlazan a su web corporativa. Las marcas originales conservan sus colores y se presentan sobre un fondo con contraste adecuado.

## Recompensa de Iron Man

`public/images/iron-man-reward.webp` procede de [Iron Man con el pulgar levantado](https://emojis.sh/emoji/iron-man-with-one-hand-up-d0WAhiRcwv), descargado de `https://attic.sh/i9iaexg8p9b9cgotoltv659hdoon`. Se conserva un enlace de crédito en la recompensa.

Las capturas de los proyectos conservan el contenido original de sus webs.

## Fondos de laboratorio

Seis ilustraciones generadas con image_gen integrado, guardadas en `public/images/laboratory/`. El conjunto de prompts y los archivos está documentado en [laboratory-prompts.md](laboratory-prompts.md). Se usan como fondos ambientales al 24% de opacidad; no sustituyen a las fotografías reales de aficiones.
