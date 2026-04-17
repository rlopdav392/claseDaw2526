/**
 * Alineado con el SDK (`inngest`): `INNGEST_DEV=1` / `true` o una URL (p. ej. dev server).
 * En ese modo no hace falta `INNGEST_EVENT_KEY`; los eventos van a `http://localhost:8288/`.
 */
export function isInngestDevMode(): boolean {
  const v = process.env.INNGEST_DEV;
  if (v === undefined) return false;
  const trimmed = v.trim();
  const lower = trimmed.toLowerCase();
  if (lower === "true" || lower === "1") return true;
  if (lower === "false" || lower === "0") return false;
  return trimmed.includes("://");
}

/**
 * Heurística para detectar claves de Inngest no configuradas (solo relevante en modo **cloud**).
 * En modo dev local, la Event key puede estar vacía.
 */
export function isLikelyInvalidInngestEventKey(key: string | undefined): boolean {
  if (!key || key.trim() === "") return true;
  const t = key.trim();
  if (t === "your_inngest_event_key") return true;
  if (/^your_/i.test(t)) return true;
  return false;
}
