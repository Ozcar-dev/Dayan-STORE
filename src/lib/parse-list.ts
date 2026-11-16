export function parseList(text: string): string[] {
  const items = text
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)

  return Array.from(new Set(items))
}