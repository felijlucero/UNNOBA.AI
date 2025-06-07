export const formatResponseText = (text) => {
  // Reemplaza los patrones * *** ** con etiquetas <strong>
  let formattedText = text.replace(/\*\s\*\*\*\s\*\*/g, "<strong>");
  formattedText = formattedText.replace(/\*\s\*\*\*\s\*\*/g, "</strong>");

  // También maneja el caso de listas con asteriscos
  formattedText = formattedText.replace(
    /\*\s\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  return formattedText;
};
