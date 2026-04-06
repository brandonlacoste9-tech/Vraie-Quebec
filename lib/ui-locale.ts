/** Mirrors keys in `language-provider` for non-React callers (e.g. fetch hooks). */

export const UI_LOCALE_STORAGE_KEY = "vraiquebec-language"
export const UI_LOCALE_LEGACY_KEY = "language"

export function readUiLocaleFromBrowserStorage(): "FR" | "EN" {
  if (typeof window === "undefined") return "FR"
  const raw = localStorage.getItem(UI_LOCALE_STORAGE_KEY) ?? localStorage.getItem(UI_LOCALE_LEGACY_KEY)
  if (raw == null || raw === "") return "FR"
  const v = raw.trim().toUpperCase()
  return v === "EN" ? "EN" : "FR"
}
