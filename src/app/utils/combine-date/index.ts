export function combineDateAndTime(date: Date | undefined, time: string | undefined): string {
  if (!date || !time) return "";
  const [hours, minutes] = time.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  // Retorna no formato ISO 8601 sem milissegundos
  return combined.toISOString().slice(0, 19);
}
