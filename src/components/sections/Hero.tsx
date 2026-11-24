import { Link } from 'react-router-dom'
import { ArrowRight, Camera, Clock, Truck } from 'lucide-react'
import { StitchCircle } from '@/components/ui/StitchCircle'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { DELIVERY } from '@/constants/delivery'
import { SITE } from '@/constants/site'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <StitchCircle className="-right-28 -top-28 h-104 w-104 animate-float-slow bg-accent/35 sm:h-128 sm:w-lg" />
      <StitchCircle className="-bottom-28 -left-20 h-80 w-80 animate-float-slower bg-primary/10 sm:h-96 sm:w-96" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-24">
        <h1 className="max-w-2xl animate-rise text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
          {SITE.tagline}
        </h1>
        <p className="mt-4 max-w-xl animate-rise text-lg text-muted-foreground [animation-delay:120ms]">
          Dresses, tops, jeans, two pieces and bags for every day and every
          occasion. Pick what you love and order in minutes on WhatsApp.
        </p>

        <div className="mt-8 flex animate-rise flex-col gap-3 sm:flex-row [animation-delay:240ms]">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
          >
            Shop now
            <ArrowRight size={18} />
          </Link>
          <WhatsAppButton
            message="Hello, I would like to make an enquiry."
            label="Chat on WhatsApp"
            className="px-6 py-3 text-base"
          />
        </div>

        <ul className="mt-10 flex animate-rise flex-col gap-3 text-sm font-semibold sm:flex-row sm:flex-wrap sm:gap-6 [animation-delay:360ms]">
          <li className="flex items-center gap-2">
            <Truck size={18} className="text-primary" />
            {DELIVERY.coverage}
          </li>
          <li className="flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            Orders ready in {DELIVERY.prepTime}
          </li>
          <li className="flex items-center gap-2">
            <Camera size={18} className="text-primary" />
            We sell exactly what you see in the pictures
          </li>
        </ul>
      </div>
    </section>
  )
}