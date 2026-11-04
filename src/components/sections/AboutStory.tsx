import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { ABOUT } from '@/constants/about'

export function AboutStory() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      <section className="max-w-3xl space-y-4 text-lg">
        <p>{ABOUT.intro}</p>
        <p className="text-muted-foreground">{ABOUT.story}</p>
      </section>

      <ul className="grid gap-3 sm:grid-cols-2">
        {ABOUT.highlights.map((item) => (
          <li
            key={item}
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <Check size={20} className="shrink-0 text-primary" />
            <span className="font-semibold">{item}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/shop"
        className="inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
      >
        Shop the collection
      </Link>
    </div>
  )
}