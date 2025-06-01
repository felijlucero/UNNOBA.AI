# UNNOBA.AI

UNNOBA.AI es un chatbot institucional desarrollado con **React.js**, **Tailwind CSS** y **Vite**.

## Requisitos previos
- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

## Cómo iniciar el proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/felijlucero/UNNOBA.AI.git
cd UNNOBA.AI
```

2. Instalar npm: 
```bash
sudo apt install npm 
```

3. Instalar dependencias:
```bash
npm install
```
4. Generar y agregar una API Key de Google Generative AI

Para que el chatbot funcione correctamente, es necesario obtener una API Key desde Google AI Studio. Esta clave permite acceder a los modelos de inteligencia artificial de Google.

Pasos para obtener la API Key:

Ingresar a https://makersuite.google.com/app

Iniciar sesión con cuenta de Google.

Ir al menú (arriba a la izquierda) y seleccionar "API Keys", o ingresar directamente a:
https://makersuite.google.com/app/apikey

Hacer clic en "Create API Key".

Copiar la clave generada (comienza con AIza...).

Agregar la clave en el código:
Abrir el archivo App.jsx y reemplazar "AQUÍ_VA_TU_API_KEY" por clave personal en la siguiente línea:
```bash
const genAI = new GoogleGenerativeAI("AQUÍ_VA_TU_API_KEY");
```

5. Iniciar servidor de desarrollo:
```bash
npm run dev
```

El proyecto estará disponible en http://localhost:5173


