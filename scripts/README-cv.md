# CV con Node.js: español e inglés

```bash
npm run cv:generate
```

Genera **únicamente dos PDFs** y regenera el README principal:

- `public/docs/alejandro-fajardo-cv-es.pdf`
- `public/docs/alejandro-fajardo-cv-en.pdf`

No hay alias ni copias duplicadas en `output/`. Estos mismos archivos se descargan desde Inicio y Contacto.

## Requisitos

Node.js 20+ y las dependencias de desarrollo instaladas con `bun install --frozen-lockfile`. También funciona ejecutando `node scripts/generate_cv.mjs` desde cualquier directorio.

No se necesita Python, navegador, fuentes del sistema, API de traducción ni conexión de red para generar. PDFKit y las fuentes JetBrains Mono Regular/Bold ya están incluidas entre las dependencias/recursos del proyecto. La [licencia OFL](assets/fonts/OFL.txt) acompaña a las fuentes del [repositorio oficial](https://github.com/JetBrains/JetBrainsMono/tree/master/fonts/ttf).

## Contenido y mantenimiento

Cada PDF tiene **una sola página A4**, con identidad, contacto, experiencia y tecnologías, sin proyectos ni datos no confirmados. Los textos son seleccionables y los enlaces están activos. No se afirma compatibilidad universal con sistemas ATS.

- `export_cv_data.mjs`: lee datos, cargos, fechas y stack del portfolio.
- `cv-content.mjs`: etiquetas, traducciones y resúmenes revisados de ambos idiomas. Actualizar al cambiar experiencia o cargos.
- `generate_cv.mjs`: maqueta las descripciones como campos `descripcion` / `description` con texto, no comentarios. Si algo no cabe en una página, falla sin recortar ni añadir páginas.
- `render_cv_readme.mjs`: plantilla del mini-CV y documentación del README. El siguiente comando de generación reemplaza el README.

A petición del usuario, no se incluye suite de tests ni comando de tests del CV. Se mantienen únicamente las guardas internas de la maquetación.

Python sigue apareciendo entre las habilidades del CV porque forma parte del stack profesional, no porque sea una dependencia de generación.
