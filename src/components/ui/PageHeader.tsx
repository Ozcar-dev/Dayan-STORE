import { StitchCircle } from '@/components/ui/StitchCircle'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-secondary">
      <StitchCircle className="-right-16 -top-20 h-64 w-64 bg-accent/30 sm:h-80 sm:w-80" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-4xl font-semibold text-primary sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}