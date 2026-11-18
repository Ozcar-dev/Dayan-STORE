export function upperFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function capitalizeFirst(text: string) {
  return upperFirst(text.trim().replace(/\s+/g, ' '))
}