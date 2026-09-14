# UnicomScraper

Herramienta de web scraping diseñada para extraer el catálogo de productos del importador **UNICOM (Uruguay)**. Este proyecto está desarrollado principalmente como una **Extensión de Google Chrome**, pero también permite su ejecución manual mediante un script directamente en la consola del navegador. Su función es exportar el listado completo de productos a un archivo estructurado en formato **JSON**.

## 🚀 Características

* **Dos modos de uso:** Integración cómoda mediante Extensión de Chrome o ejecución directa por consola.
* **Ejecución del lado del cliente:** No requiere instalación de entornos de desarrollo (Node.js, Python, etc.) ni dependencias de terceros.
* **Exportación automatizada:** Genera y descarga automáticamente un archivo `.json` con los datos parseados.

## 📋 Requisitos Previos

Para que la herramienta funcione correctamente, es estrictamente necesario:

1. **Credenciales de acceso:** Contar con una cuenta activa en el portal B2B/B2C de UNICOM.
2. **Navegador compatible:** Google Chrome o navegadores basados en Chromium (Edge, Brave, etc.) Para el uso de la extension, otros deben usar la version standalone.

## ⚙️ Instrucciones de Uso

Puedes utilizar esta herramienta de dos maneras distintas:

### Opción 1: Instalación como Extensión de Chrome (Recomendado)

1. Descarga o clona este repositorio en tu computadora.
2. Abre Google Chrome y escribe `chrome://extensions/` en la barra de direcciones.
3. Activa el **"Modo desarrollador"** (Developer mode) utilizando el interruptor en la esquina superior derecha.
4. Haz clic en el botón **"Cargar descomprimida"** (Load unpacked) en la parte superior izquierda.
5. Selecciona la carpeta donde guardaste los archivos de la extensión.
6. Navega a el portal web de UNICOM.
7. Haz clic en el ícono de la extensión (en la barra superior de tu navegador) para iniciar la extracción.

### Opción 2: Ejecución manual desde la consola

Si prefieres no instalar la extensión, puedes inyectar el script manualmente:

1. Inicia sesión en el portal web de UNICOM.
2. Abre las herramientas para desarrolladores de tu navegador presionando `F12` (o `Ctrl + Shift + I` / `Cmd + Option + I` en Mac).
3. Dirígete a la pestaña **Consola** (Console).
4. Copia el contenido del script `scraper.js` proporcionado en este repositorio y pégalo en la consola.
5. Presiona `Enter` para ejecutar.

> **Nota:** En cualquiera de los dos métodos, el código procesará la información en pantalla y forzará automáticamente la descarga de un archivo `.json` en tu directorio local de descargas.

## 📄 Formato de Salida

La herramienta generará un archivo JSON estructurado con la información de los productos detectados en la sesión actual. Se recomienda utilizar herramientas como [JSONLint](https://jsonlint.com/) o visualizadores integrados en editores de código (VS Code) para analizar e iterar sobre los datos extraídos.

## ⚠️ Consideraciones y Aviso Legal

* **Mantenimiento:** La estructura del DOM (HTML) del sitio web de UNICOM puede actualizarse sin previo aviso. Si esto ocurre, los selectores podrían fallar y requerirán actualización.
* **Uso ético y legal:** Esta herramienta está concebida únicamente para facilitar la extracción de información a la que el usuario ya tiene acceso legítimo. Se recomienda utilizarlo de manera responsable, evitando sobrecargar los servidores del importador.
* **Privacidad de datos:** Toda la información extraída es responsabilidad del usuario final.

## ⚖️ Licencia

Este proyecto se distribuye bajo la licencia MIT (o *especificar licencia deseada*). Eres libre de utilizar, modificar y distribuir este código, asumiendo la total responsabilidad por su implementación y uso.
