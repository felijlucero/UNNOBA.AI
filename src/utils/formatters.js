export const formatResponseText = (text) => {
  let formattedText = text.replace(/\*\s\*\*\*\s\*\*/g, "<strong>");
  formattedText = formattedText.replace(/\*\s\*\*\*\s\*\*/g, "</strong>");
  formattedText = formattedText.replace(
    /\*\s\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  // Formatear texto entre ** ** como negritas
  formattedText = formattedText.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  // Formatear URLs automáticamente al estilo de la aplicación
  // Detectar URLs que no estén ya formateadas como enlaces HTML
  formattedText = formattedText.replace(
    /(?<!href=['"])(https?:\/\/[^\s<>"]+)(?![^<]*<\/a>)/gi,
    (url) => {
      // Determinar el texto del enlace basado en la URL
      let linkText = url;

      // Mapeo de URLs específicas a texto más amigable
      const urlMappings = {
        "https://elegi.unnoba.edu.ar/calendarioacademico/":
          "Calendario Académico UNNOBA",
        "https://elegi.unnoba.edu.ar/calendario/":
          "Calendario Académico UNNOBA",
        "https://g3w3.unnoba.edu.ar/g3w3/": "SIU-Guaraní",
        "https://elegi.unnoba.edu.ar/inscripcion/": "Inscripción UNNOBA",
        "https://plataformaed.unnoba.edu.ar": "Plataforma Virtual",
        "https://comedor.unnoba.edu.ar/": "Comedor Universitario",
        "https://unnoba.edu.ar/": "UNNOBA Oficial",
        "https://www.bidi.la/": "BiDi - Biblioteca Digital",
        "https://maps.app.goo.gl/BmMCDAZ3FdckELos7":
          "Ver ubicación en Google Maps",
        "https://maps.app.goo.gl/R5RSsceNyvwConAK8":
          "Ver ubicación en Google Maps",
        "https://unnoba.edu.ar/distribucion-aulas/junin":
          "Distribución de Aulas - Junín",
        "https://unnoba.edu.ar/distribucion-aulas/pergamino":
          "Distribución de Aulas - Pergamino",
      };

      // Buscar mapeo exacto o por dominio
      if (urlMappings[url]) {
        linkText = urlMappings[url];
      } else if (url.includes("elegi.unnoba.edu.ar")) {
        linkText = "UNNOBA";
      } else if (url.includes("unnoba.edu.ar")) {
        linkText = "UNNOBA";
      }

      return `<a href='${url}' target='_blank' style='color:#005B96; font-weight:bold;'>${linkText}</a>`;
    }
  );

  // Convertir saltos de línea a <br> para mejor visualización
  formattedText = formattedText.replace(/\n/g, "<br>");

  return formattedText;
};

// Alias para compatibilidad con useChat.js
export const formatUrls = formatResponseText;
