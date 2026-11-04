import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { SIZE_CHART, SIZE_UNIT } from '@/constants/size-guide'

const TIPS = [
  'Bust: measure around the fullest part of your chest.',
  'Waist: measure around the narrowest part of your waist.',
  'Hips: measure around the fullest part of your hips.',
]

export function SizeChart() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      <section>
        <h2 className="text-2xl font-semibold text-primary">Size chart</h2>
        <p className="mt-1 text-muted-foreground">All measurements in {SIZE_UNIT}.</p>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-96 text-left">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 font-heading font-semibold">Size</th>
                <th className="px-4 py-3 font-heading font-semibold">Bust</th>
                <th className="px-4 py-3 font-heading font-semibold">Waist</th>
                <th className="px-4 py-3 font-heading font-semibold">Hips</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map((row) => (
                <tr key={row.size} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold">{row.size}</td>
                  <td className="px-4 py-3">{row.bust}</td>
                  <td className="px-4 py-3">{row.waist}</td>
                  <td className="px-4 py-3">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-primary">
          How to measure
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
          {TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-secondary p-6 text-center">
        <p className="font-heading text-xl font-semibold">
          Not sure which size to pick?
        </p>
        <p className="mt-1 text-muted-foreground">
          Send us your measurements and we will help you choose.
        </p>
        <WhatsAppButton
          message="Hello, please help me choose my size."
          label="Ask us on WhatsApp"
          className="mt-4"
        />
      </section>
    </div>
  )
}