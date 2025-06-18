# UNNOBA.AI

UNNOBA.AI es un chatbot institucional desarrollado con **React.js**, **Tailwind CSS** y **Vite**. El sistema combina respuestas predefinidas con inteligencia artificial para brindar información específica sobre la Universidad Nacional del Noroeste de la Provincia de Buenos Aires (UNNOBA).

## Características principales

- **Sistema híbrido de respuestas**: Combina respuestas predefinidas para consultas frecuentes con IA para preguntas más complejas
- **Respuestas dinámicas**: Genera URLs específicas para distribución de aulas con fechas actuales
- **Interface moderna**: Diseño responsive con animaciones y temas (claro/oscuro)
- **Tipado progresivo**: Simula escritura humana para mejor experiencia de usuario

## Temas cubiertos por el chatbot

### 📝 Inscripción a Materias

- Proceso de inscripción a través de SIU-Guaraní
- Fechas del calendario académico
- Requisitos de regularidad (sistema de 4 puntos anuales)
- Sistema de puntos: materias cursadas (1 punto), finales aprobados (2 puntos)
- Pérdida de regularidad y reinscripción (hasta 3 veces)

### 📚 Biblioteca

- Ubicaciones: Junín (Jorge Newbery 375), Pergamino (Monteagudo 2772)
- Horarios: lunes a viernes 08:00-19:00
- Préstamo de libros (2 semanas, renovable)
- Acceso a biblioteca digital
- Sistema de registro y sanciones por atrasos

### 🏫 Distribución de Aulas

- Enlaces dinámicos para consulta diaria
- Junín: https://unnoba.edu.ar/distribucion-aulas/junin
- Pergamino: https://unnoba.edu.ar/distribucion-aulas/pergamino
- Para fechas específicas agregar ?date=DD-MM-YYYY
- Los domingos y feriados no tienen distribución disponible

### 🍽️ Otros servicios

- Información sobre el comedor universitario
- Plataforma virtual/campus
- Redes sociales y contactos institucionales

## Requisitos previos

- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

## Cómo iniciar el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/felijlucero/UNNOBA.AI.git
cd UNNOBA.AI
```

2. Instalar npm (si no está instalado):

```bash
sudo apt install npm
```

3. Instalar dependencias:

```bash
npm install
```

4. Configurar API Key de Google Generative AI

Para que el chatbot funcione correctamente, es necesario obtener una API Key desde Google AI Studio.

Pasos para obtener la API Key:

- Ingresar a https://makersuite.google.com/app
- Iniciar sesión con cuenta de Google
- Ir al menú y seleccionar "API Keys", o ingresar a: https://makersuite.google.com/app/apikey
- Hacer clic en "Create API Key"
- Copiar la clave generada (comienza con AIza...)

Agregar la clave en el código:

- Abrir el archivo `src/utils/constants.js`
- Reemplazar la API key en la configuración:

```javascript
export const API_CONFIG = {
  apiKey: "TU_API_KEY_AQUÍ",
  model: "gemini-1.5-flash",
};
```

5. Iniciar servidor de desarrollo:

```bash
npm run dev
```

El proyecto estará disponible en http://localhost:5173

## Estructura del proyecto

```
src/
├── components/          # Componentes React reutilizables
├── hooks/              # Custom hooks (useChat, useTheme)
├── utils/              # Utilidades y constantes
│   ├── constants.js    # Configuración y respuestas predefinidas
│   ├── responseHandler.js  # Lógica para manejo de respuestas dinámicas
│   └── formatters.js   # Funciones de formato
└── ...
```

## Sistema de respuestas

El chatbot utiliza un sistema híbrido de tres tipos de respuestas:

1. **Respuestas predefinidas**: Para preguntas exactas frecuentes
2. **Respuestas dinámicas**: Generadas automáticamente (ej: URLs con fechas actuales)
3. **Respuestas por IA**: Para consultas más complejas usando Google Gemini

### Agregar nuevas respuestas predefinidas

Editar el archivo `src/utils/constants.js` en la sección `PREDEFINED_RESPONSES`:

```javascript
export const PREDEFINED_RESPONSES = {
  "¿Nueva pregunta?": "Nueva respuesta con <strong>formato HTML</strong>",
  // ...
};
```

### Agregar respuestas dinámicas

Para consultas que requieren procesamiento especial (fechas, cálculos, etc.), editar `src/utils/responseHandler.js`.

## Tecnologías utilizadas

- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS, CSS Modules
- **Animaciones**: Framer Motion
- **IA**: Google Generative AI (Gemini)
- **Icons**: React Icons
- **Linting**: ESLint
