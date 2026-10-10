# Imágenes de aficiones

Los 29 elementos usan imágenes independientes WebP de 900 × 675 px (4:3), calidad 90. Las miniaturas, la selección principal y la ampliación reutilizan el mismo recorte. No se amplían originales pequeños y no se generan fotografías con IA.

Las fotografías de perros muestran su cara de frente. Películas y series usan material original de promoción o fotogramas; anime conserva ilustraciones originales y videojuegos capturas del juego o arte del editor. Las fotos de artistas proceden de sus webs o sus representantes; la del Córdoba CF procede del club. La Kawasaki es una fotografía del fabricante, identificada como foto del modelo.

Cada archivo tiene su enlace y crédito en `src/data/hobby-images.json`. Las fuentes reproducibles están en `src/data/hobby-sources.json`. Para actualizar un elemento: `node scripts/fetch-hobby-images.mjs collie`. El script omite las imágenes ya normalizadas si no se indican elementos.

Las categorías tienen composiciones SVG propias, con iconos y geometría en blanco, azul y rojo. No reproducen logotipos ni diseños de marcas de moda.
