export const formatResponseText = (text) => {
  let formattedText = text.replace(/\*\s\*\*\*\s\*\*/g, "<strong>");
  formattedText = formattedText.replace(/\*\s\*\*\*\s\*\*/g, "</strong>");
  formattedText = formattedText.replace(
    /\*\s\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );
  return formattedText;
};
