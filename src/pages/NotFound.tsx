import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-5xl font-semibold text-primary">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground"
      >
        Back to home
      </Link>
    </section>
  )
}