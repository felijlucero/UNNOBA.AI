export const formatPlanEstudios = (text) => {
  if (!text) return "";

  let formatted = text;

  // 1. Encabezados de año
  formatted = formatted.replace(
    /(^|\n)(\d{1,2}(º|°)?\s*año|primer año|segundo año|tercer año|cuarto año|quinto año)/gi,
    '<div class="text-xl font-bold text-blue-800 mt-4">$2</div>'
  );

  // 2. Materias
  formatted = formatted.replace(
    /^(\s*)(💻|📚|🧪|🧮|🧠)?\s*(.+?)(?=\n|$)/gm,
    '<div class="ml-4 font-medium">$2 <span class="ml-1">$3</span></div>'
  );

  // 3. Correlativas
  formatted = formatted.replace(
    /🔗?\s*(Requiere|Correlativa|Prerrequisito):\s*(.+)/gi,
    '<div class="ml-8 text-orange-600">🔗 <strong>$1:</strong> $2</div>'
  );

  // 4. Créditos y carga horaria
  formatted = formatted.replace(
    /(Créditos|Carga horaria):\s*(\d+)/gi,
    '<div class="ml-8 italic text-sm text-gray-600"><strong>$1:</strong> $2</div>'
  );

  // 5. Orientaciones
  formatted = formatted.replace(
    /(Orientación|Mención):\s*(.+)/gi,
    '<div class="mt-2 p-3 bg-blue-100 border-l-4 border-blue-600 text-blue-800"><strong>🎯 $1:</strong> $2</div>'
  );

  // 6. Links markdown
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    `<a href='$2' target='_blank' class='text-blue-700 underline'>$1</a>`
  );

  // 7. Fechas
  formatted = formatted.replace(
    /\b(\d{4}-\d{2}-\d{2})\b/g,
    '<span class="bg-blue-50 text-blue-800 px-1 rounded">$1</span>'
  );
  formatted = formatted.replace(
    /\b(\d{1,2}\s+de\s+\w+\s+de\s+\d{4})\b/gi,
    '<span class="bg-blue-50 text-blue-800 px-1 rounded">$1</span>'
  );

  // 8. Doble salto → nuevo párrafo
  formatted = formatted.replace(/\n\n+/g, '</div><div class="mt-4">');

  // 9. Salto de línea simple
  formatted = formatted.replace(/\n/g, "<br>");

  // 10. Contenedor general
  return `<div class="text-base leading-relaxed space-y-2">${formatted}</div>`;
};
