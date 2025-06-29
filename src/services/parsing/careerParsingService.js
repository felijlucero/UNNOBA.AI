/**
 * Servicio para parsear información de carreras
 */
export class CareerParsingService {
  /**
   * Función principal para parsear materias del contenido del endpoint
   * @param {string} contenido - Contenido HTML/texto del endpoint
   * @param {object} carreraInfo - Información de la carrera
   * @returns {string} - Resultado formateado
   */
  parsearMaterias(contenido, carreraInfo) {
    if (!contenido) return null;

    try {
      let resultado = `📚 **MATERIAS DE ${carreraInfo.nombre.toUpperCase()} - UNNOBA**\n\n`;

      // Normalizar el texto
      const textoCompleto = contenido.replace(/\s+/g, " ").trim();

      // Buscar la sección del plan de estudios
      let inicioSeccion = this.encontrarInicioSeccion(textoCompleto);
      let finSeccion = this.encontrarFinSeccion(textoCompleto);

      const seccionPlan = textoCompleto.substring(inicioSeccion, finSeccion);

      // Detectar años usando un patrón más preciso
      const años = this.detectarAños(seccionPlan);

      if (años.length === 0) {
        // Si no encontramos años, usar fallback
        return this.parsearMateriasSimple(contenido, carreraInfo);
      }

      // Procesar cada año
      for (let i = 0; i < años.length; i++) {
        const añoActual = años[i];
        const proximoAño = años[i + 1];

        // Extraer texto de este año
        const inicioAño = añoActual.posicion;
        const finAño = proximoAño ? proximoAño.posicion : seccionPlan.length;
        const textoAño = seccionPlan.substring(inicioAño, finAño);

        resultado += `🎓 **${añoActual.numero}º Año**\n\n`;

        // Detectar cuatrimestres
        const cuatrimestres = this.detectarCuatrimestres(textoAño);

        // Si no hay cuatrimestres, procesar todo como un bloque
        if (cuatrimestres.length === 0) {
          const materias = this.extraerMateriasTexto(textoAño);
          if (materias.length > 0) {
            resultado += `📋 **Materias del año:**\n`;
            materias.forEach((materia) => {
              resultado += `• ${materia}\n`;
            });
            resultado += "\n";
          }
          continue;
        }

        // Procesar cada cuatrimestre
        resultado += this.procesarCuatrimestres(cuatrimestres, textoAño);
      }

      // Agregar enlaces específicos
      resultado += this.agregarEnlacesOficiales(carreraInfo);

      return resultado;
    } catch (error) {
      console.error("Error parseando materias:", error);
      return this.parsearMateriasSimple(contenido, carreraInfo);
    }
  }

  /**
   * Encuentra el inicio de la sección del plan de estudios
   * @param {string} textoCompleto - Texto completo a analizar
   * @returns {number} - Posición de inicio
   */
  encontrarInicioSeccion(textoCompleto) {
    let inicioSeccion = textoCompleto.indexOf("Plan-Versión");
    if (inicioSeccion === -1) {
      inicioSeccion = textoCompleto.indexOf("Planes de Estudio");
    }
    if (inicioSeccion === -1) {
      inicioSeccion = 0;
    }
    return inicioSeccion;
  }

  /**
   * Encuentra el final de la sección del plan de estudios
   * @param {string} textoCompleto - Texto completo a analizar
   * @returns {number} - Posición de fin
   */
  encontrarFinSeccion(textoCompleto) {
    let finSeccion = textoCompleto.indexOf("Práctica Profesional Supervisada");
    if (finSeccion !== -1) {
      finSeccion = textoCompleto.indexOf(")", finSeccion) + 1;
    } else {
      finSeccion = textoCompleto.length;
    }
    return finSeccion;
  }

  /**
   * Detecta los años en el plan de estudios
   * @param {string} seccionPlan - Sección del plan a analizar
   * @returns {Array} - Array de objetos con información de años
   */
  detectarAños(seccionPlan) {
    const regexAño = /(\d+)º\s+Año/g;
    const años = [];
    let matchAño;

    while ((matchAño = regexAño.exec(seccionPlan)) !== null) {
      años.push({
        numero: matchAño[1],
        texto: matchAño[0],
        posicion: matchAño.index,
      });
    }

    return años;
  }

  /**
   * Detecta los cuatrimestres en un año
   * @param {string} textoAño - Texto del año a analizar
   * @returns {Array} - Array de objetos con información de cuatrimestres
   */
  detectarCuatrimestres(textoAño) {
    const regexCuatrimestre = /(1er|2do)\s+Cuatrimestre/g;
    const cuatrimestres = [];
    let matchCuatrimestre;

    while ((matchCuatrimestre = regexCuatrimestre.exec(textoAño)) !== null) {
      cuatrimestres.push({
        texto: matchCuatrimestre[0],
        posicion: matchCuatrimestre.index,
      });
    }

    return cuatrimestres;
  }

  /**
   * Procesa los cuatrimestres de un año
   * @param {Array} cuatrimestres - Array de cuatrimestres
   * @param {string} textoAño - Texto completo del año
   * @returns {string} - Resultado formateado
   */
  procesarCuatrimestres(cuatrimestres, textoAño) {
    let resultado = "";

    for (let j = 0; j < cuatrimestres.length; j++) {
      const cuatrimestreActual = cuatrimestres[j];
      const proximoCuatrimestre = cuatrimestres[j + 1];

      resultado += `📋 **${cuatrimestreActual.texto}:**\n`;

      // Extraer texto de este cuatrimestre
      const inicioCuatrimestre =
        cuatrimestreActual.posicion + cuatrimestreActual.texto.length;
      const finCuatrimestre = proximoCuatrimestre
        ? proximoCuatrimestre.posicion
        : textoAño.length;
      let textoCuatrimestre = textoAño.substring(
        inicioCuatrimestre,
        finCuatrimestre
      );

      // Buscar materias en este cuatrimestre
      const materias = this.extraerMateriasTexto(textoCuatrimestre);

      if (materias.length > 0) {
        materias.forEach((materia) => {
          resultado += `• ${materia}\n`;
        });
      } else {
        resultado += `• (Consultar plan de estudios oficial)\n`;
      }

      resultado += "\n";
    }

    return resultado;
  }

  /**
   * Extrae materias del texto usando múltiples estrategias
   * @param {string} texto - Texto a analizar
   * @returns {Array} - Array de nombres de materias
   */
  extraerMateriasTexto(texto) {
    const materias = new Set();

    // Estrategia 1: Buscar patrones típicos de materias
    const patronesMateria = [
      /([A-ZÁÉÍÓÚÑÜ][a-záéíóúñü\s]+(?:I{1,3}|IV|V|VI{0,3})?)\s*(?:\([^)]*\))?/g,
      /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+[IVX]+)?)/g,
    ];

    patronesMateria.forEach((patron) => {
      let match;
      while ((match = patron.exec(texto)) !== null) {
        const materia = match[1].trim();
        if (this.esNombreMateriaValido(materia)) {
          materias.add(materia);
        }
      }
    });

    // Estrategia 2: Buscar líneas que parecen nombres de materias
    const lineas = texto.split("\n");
    lineas.forEach((linea) => {
      const lineaLimpia = linea.trim();
      if (this.esNombreMateriaValido(lineaLimpia)) {
        materias.add(lineaLimpia);
      }
    });

    return Array.from(materias).slice(0, 15); // Limitar a 15 materias por cuatrimestre
  }

  /**
   * Valida si un string es un nombre de materia válido
   * @param {string} texto - Texto a validar
   * @returns {boolean} - True si es válido
   */
  esNombreMateriaValido(texto) {
    if (!texto || texto.length < 3 || texto.length > 100) return false;

    // Filtrar texto que no parece nombre de materia
    const palabrasExcluidas = [
      "plan",
      "version",
      "año",
      "cuatrimestre",
      "horas",
      "creditos",
      "practica",
      "profesional",
      "supervisada",
      "trabajo",
      "final",
      "total",
      "carga",
      "horaria",
      "requisitos",
      "correlativas",
    ];

    const textoLower = texto.toLowerCase();
    if (palabrasExcluidas.some((palabra) => textoLower.includes(palabra))) {
      return false;
    }

    // Debe contener al menos una letra
    if (!/[a-záéíóúñü]/i.test(texto)) return false;

    // No debe ser solo números o símbolos
    if (/^[\d\s\-().,]+$/.test(texto)) return false;

    return true;
  }

  /**
   * Parseo simple como fallback
   * @param {string} contenido - Contenido a parsear
   * @param {object} carreraInfo - Información de la carrera
   * @returns {string} - Resultado formateado
   */
  parsearMateriasSimple(contenido, carreraInfo) {
    let resultado = `📚 **MATERIAS DE ${carreraInfo.nombre.toUpperCase()} - UNNOBA**\n\n`;

    resultado += "⚠️ **Información parcial disponible**\n\n";
    resultado +=
      "Para obtener la información completa y actualizada sobre las materias de esta carrera, ";
    resultado +=
      "te recomendamos consultar directamente el plan de estudios oficial.\n\n";

    resultado += this.agregarEnlacesOficiales(carreraInfo);

    return resultado;
  }

  /**
   * Agrega enlaces oficiales al resultado
   * @param {object} carreraInfo - Información de la carrera
   * @returns {string} - Enlaces formateados
   */
  agregarEnlacesOficiales(carreraInfo) {
    return (
      `🔗 **Enlaces oficiales:**\n` +
      `• **Plan de estudios oficial:** ${carreraInfo.enlace}\n` +
      `• **Sitio UNNOBA:** https://unnoba.edu.ar/\n\n` +
      `💡 **Para información detallada y actualizada, consultá el plan de estudios oficial.**`
    );
  }
}

// Instancia singleton
export const careerParsingService = new CareerParsingService();
