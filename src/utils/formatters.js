export const formatResponseText = (text) => {
  if (!text) return "";

  let formattedText = text;

  // 1. Formatear títulos principales con emojis (## **TÍTULO**)
  formattedText = formattedText.replace(
    /^#{1,2}\s*\*\*([^*]+)\*\*/gm,
    '<div class="response-main-title">$1</div>'
  );

  // 2. Formatear títulos con emojis específicos más seguros
  const emojiTitlePattern =
    /^(📅|📝|📋|🎓|🎉|✅|🔗|💡|⚠️|📍|💻|📚|🏢|📩|🍽️|📧)\s*\*\*([^*]+)\*\*/gm;
  formattedText = formattedText.replace(
    emojiTitlePattern,
    '<div class="response-title"><span class="emoji-icon">$1</span><span class="title-text">$2</span></div>'
  );

  // 3. Formatear subtítulos (texto con **negrita** sin emoji al inicio)
  formattedText = formattedText.replace(
    /^\*\*([^*]+)\*\*/gm,
    '<div class="response-subtitle">$1</div>'
  );

  // 4. Formatear negritas inline normales
  formattedText = formattedText.replace(
    /\*\*((?:[^*]|\*(?!\*))+)\*\*/g,
    "<strong>$1</strong>"
  );

  // 5. Formatear listas con viñetas mejoradas
  formattedText = formattedText.replace(
    /^•\s*(.+)$/gm,
    '<div class="response-list-item"><span class="bullet">•</span><span class="item-content">$1</span></div>'
  );

  // 6. Formatear listas numeradas
  formattedText = formattedText.replace(
    /^\d+\.\s*(.+)$/gm,
    '<div class="response-numbered-item">$1</div>'
  );

  // 7. Formatear bloques de información importantes con emojis específicos
  const infoBlockPattern = /^(💡|⚠️|✅|📢)\s*\*\*([^*]+)\*\*:\s*(.+)$/gm;
  formattedText = formattedText.replace(
    infoBlockPattern,
    '<div class="response-info-block"><span class="info-icon">$1</span><strong>$2:</strong> $3</div>'
  );

  // 8. Formatear información destacada con emojis específicos
  const highlightPattern = /^(💡|⚠️|✅|📢)\s*(.+)$/gm;
  formattedText = formattedText.replace(
    highlightPattern,
    '<div class="response-highlight"><span class="highlight-icon">$1</span><span class="highlight-text">$2</span></div>'
  );

  // 9. Mejorar el formateo de URLs con mapeo más completo
  formattedText = formattedText.replace(
    /(?<!href=['"])(https?:\/\/[^\s<>"]+)(?![^<]*<\/a>)/gi,
    (url) => {
      // Mapeo extendido de URLs a texto amigable
      const urlMappings = {
        "https://elegi.unnoba.edu.ar/calendario/":
          "📅 Calendario Académico UNNOBA",
        "https://elegi.unnoba.edu.ar/calendarioacademico/":
          "📅 Calendario Académico UNNOBA",
        "https://g3w3.unnoba.edu.ar/g3w3/": "🖥️ SIU-Guaraní",
        "https://elegi.unnoba.edu.ar/inscripcion/": "📝 Inscripción UNNOBA",
        "https://plataformaed.unnoba.edu.ar": "💻 Plataforma Virtual",
        "https://comedor.unnoba.edu.ar/": "🍽️ Comedor Universitario",
        "https://unnoba.edu.ar/": "🏫 UNNOBA Oficial",
        "https://www.bidi.la/": "📚 BiDi - Biblioteca Digital",
        "https://maps.app.goo.gl/BmMCDAZ3FdckELos7":
          "📍 Ubicación en Google Maps",
        "https://maps.app.goo.gl/R5RSsceNyvwConAK8":
          "📍 Ubicación en Google Maps",
        "https://unnoba.edu.ar/distribucion-aulas/junin":
          "🏢 Distribución de Aulas - Junín",
        "https://unnoba.edu.ar/distribucion-aulas/pergamino":
          "🏢 Distribución de Aulas - Pergamino",
      };

      let linkText = urlMappings[url] || url;

      // Si no está en el mapeo, agregar emoji según el dominio
      if (!urlMappings[url]) {
        if (url.includes("elegi.unnoba.edu.ar")) {
          linkText = "📅 " + linkText;
        } else if (url.includes("unnoba.edu.ar")) {
          linkText = "🏫 " + linkText;
        } else if (url.includes("maps")) {
          linkText = "📍 " + linkText;
        }
      }

      return `<a href='${url}' target='_blank' class='response-link'>${linkText}</a>`;
    }
  );

  // 10. Formatear fechas destacadas (formato ISO o español)
  formattedText = formattedText.replace(
    /\b(\d{4}-\d{2}-\d{2})\b/g,
    '<span class="response-date">$1</span>'
  );

  formattedText = formattedText.replace(
    /\b(\d{1,2}\s+de\s+\w+\s+de\s+\d{4})\b/gi,
    '<span class="response-date">$1</span>'
  );

  // 11. Formatear horarios
  formattedText = formattedText.replace(
    /\b(\d{1,2}:\d{2})\s*(hs?|horas?)?\b/gi,
    '<span class="response-time">$1 hs</span>'
  );

  // 12. Crear separadores visuales para secciones
  formattedText = formattedText.replace(
    /^[-=]{3,}$/gm,
    '<hr class="response-separator">'
  );

  // 13. Formatear contenido entre líneas vacías como párrafos
  formattedText = formattedText.replace(
    /\n\n+/g,
    '</div><div class="response-paragraph">'
  );

  // 14. Convertir saltos de línea simples a <br>
  formattedText = formattedText.replace(/\n/g, "<br>");

  // 15. Envolver todo en un contenedor
  formattedText = `<div class="response-content">${formattedText}</div>`;

  return formattedText;
};

// Función auxiliar para formatear fechas específicas
export const formatDateInfo = (text) => {
  if (!text) return "";

  // Detectar si el texto contiene información de fechas específicas
  const datePatterns = [
    /\d{4}-\d{2}-\d{2}/g,
    /\d{1,2}\s+de\s+\w+/gi,
    /\w+\s+\d{1,2}\s+al?\s+\d{1,2}/gi,
  ];

  let hasDateInfo = datePatterns.some((pattern) => pattern.test(text));

  if (hasDateInfo) {
    return `<div class="date-info-container">${formatResponseText(text)}</div>`;
  }

  return formatResponseText(text);
};

// Función para formatear respuestas de calendario específicamente
export const formatCalendarResponse = (text) => {
  if (!text) return "";

  let formatted = text;

  // Formatear secciones de calendario con iconos específicos
  const sectionMappings = [
    {
      pattern: /📝\s*\*\*INSCRIPCIONES\*\*/gi,
      replacement:
        '<div class="calendar-section inscripciones-section"><span class="section-icon">📝</span><span class="section-title">INSCRIPCIONES</span></div>',
    },
    {
      pattern: /📋\s*\*\*EXÁMENES\*\*/gi,
      replacement:
        '<div class="calendar-section examenes-section"><span class="section-icon">📋</span><span class="section-title">EXÁMENES</span></div>',
    },
    {
      pattern: /🎓\s*\*\*CLASES Y CUATRIMESTRES\*\*/gi,
      replacement:
        '<div class="calendar-section clases-section"><span class="section-icon">🎓</span><span class="section-title">CLASES Y CUATRIMESTRES</span></div>',
    },
    {
      pattern: /🎉\s*\*\*FERIADOS\*\*/gi,
      replacement:
        '<div class="calendar-section feriados-section"><span class="section-icon">🎉</span><span class="section-title">FERIADOS Y DÍAS NO LABORABLES</span></div>',
    },
    {
      pattern: /✅\s*\*\*CONFIRMACIONES\*\*/gi,
      replacement:
        '<div class="calendar-section confirmaciones-section"><span class="section-icon">✅</span><span class="section-title">CONFIRMACIONES</span></div>',
    },
  ];

  sectionMappings.forEach(({ pattern, replacement }) => {
    formatted = formatted.replace(pattern, replacement);
  });

  return formatResponseText(formatted);
};

// Alias para compatibilidad
export const formatUrls = formatResponseText;
