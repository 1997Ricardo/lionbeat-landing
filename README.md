# LIONBEAT PERFORMANCE SYSTEM

Landing page de marca para LIONBEAT PERFORMANCE, construida con HTML5, CSS3 y JavaScript Vanilla. El proyecto prioriza una experiencia editorial deportiva, rápida, responsive y accesible.

## Estructura

- `index.html`: contenido, estructura semántica, metadatos SEO y Open Graph.
- `css/style.css`: sistema visual, responsive, componentes y animaciones.
- `js/script.js`: navegación móvil accesible, progreso de lectura, scroll y animaciones.
- `assets/`: logotipo y fotografías de marca.
- `assets/favicon.svg`: icono vectorial.
- `robots.txt` y `sitemap.xml`: directrices y sitemap para buscadores.
- `vercel.json`: cabeceras HTTP de seguridad.

## Desarrollo local

Se puede abrir `index.html` directamente o utilizar Live Server en Visual Studio Code.

No requiere Node.js, compilación ni dependencias npm.

## Despliegue

El proyecto está preparado para despliegue estático en Vercel. La URL canónica configurada actualmente es:

`https://lionbeat-landing.vercel.app/`

Si se conecta un dominio propio, actualizar también la URL canonical, Open Graph, Twitter Card, sitemap y robots.txt en `index.html` y `sitemap.xml`.

## Antes de publicar

1. Confirmar que el dominio de producción es el definitivo.
2. Verificar que todas las fotografías son propias o cuentan con licencia de uso.
3. Revisar y confirmar los textos de formación y experiencia profesional.
4. Ejecutar pruebas en móvil, tablet y escritorio.
5. Ejecutar Lighthouse y revisar Core Web Vitals.
6. Configurar analítica y medición de conversiones si se decide utilizar.
7. Incorporar textos legales y consentimiento de cookies únicamente según las tecnologías de seguimiento que se instalen.

## Criterios técnicos

- Sin frameworks ni dependencias de terceros en JavaScript.
- Contenido visible aunque JavaScript no se ejecute.
- Menú móvil con atributos ARIA y gestión de foco.
- Respeto a `prefers-reduced-motion`.
- Imágenes inferiores con carga diferida.
