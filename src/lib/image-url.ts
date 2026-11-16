export function thumbUrl(url: string | undefined): string | undefined {
  if (!url) return url
  return url.replace(/\.(webp|jpg)$/, '-sm.$1')
}