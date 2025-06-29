// Función para normalizar texto: convertir a minúsculas, quitar tildes y signos de puntuación.
export const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD") // Descompone los caracteres acentuados en letra + acento
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    .replace(/[¿?¡!.,;]/g, ""); // Elimina signos de puntuación
};

// Función para calcular la similitud de Jaccard entre dos textos
export const jaccardSimilarity = (text1, text2) => {
  const set1 = new Set(normalizeText(text1).split(/\s+/));
  const set2 = new Set(normalizeText(text2).split(/\s+/));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  if (union.size === 0) {
    return 0;
  }

  return intersection.size / union.size;
};

// Función para encontrar la mejor coincidencia en las preguntas predefinidas
export const findBestMatch = (userInput, predefinedQuestions) => {
  let bestMatch = null;
  let maxSimilarity = 0;

  for (const question in predefinedQuestions) {
    const similarity = jaccardSimilarity(userInput, question);
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      bestMatch = {
        question: question,
        response: predefinedQuestions[question],
      };
    }
  }

  // Se requiere un umbral de similitud para considerar una coincidencia válida
  const SIMILARITY_THRESHOLD = 0.75; //estaba en 0.25

  return maxSimilarity >= SIMILARITY_THRESHOLD ? bestMatch : null;
}; 