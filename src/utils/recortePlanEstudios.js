export const limpiarPlanEstudios = (text) => {
  if (!text) return "";

  // 1. Encontrar el inicio real del plan
  const inicio = text.indexOf("Plan de Estudio");
  if (inicio === -1) return text;

  // 2. Recortar desde ahí hasta el final real (por ejemplo, "Desarrollado por" o similar)
  const fin = text.indexOf("Prosecretaria TICs");
  const recorte = fin > inicio ? text.slice(inicio, fin) : text.slice(inicio);

  // 3. Eliminar líneas repetidas o banners
  return recorte
    .replace(/Abogacía.+?Menú Inicio.+?\n/gs, "")
    .replace(/Copyright.+?\n/gs, "")
    .replace(/Elegí tema.+?\n/gs, "")
    .replace(/\n{2,}/g, "\n") // quitar saltos dobles
    .trim();
};
