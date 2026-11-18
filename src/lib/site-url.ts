const configured = (
  import.meta.env.VITE_SITE_URL as string | undefined
)?.replace(/\/+$/, '')

export function siteOrigin() {
  return configured || window.location.origin
}