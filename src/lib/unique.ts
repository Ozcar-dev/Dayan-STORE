export function normalizeText(text: string) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}