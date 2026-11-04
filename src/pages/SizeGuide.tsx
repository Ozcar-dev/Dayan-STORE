import { SizeChart } from '@/components/sections/SizeChart'
import { PageHeader } from '@/components/ui/PageHeader'

export default function SizeGuide() {
  return (
    <>
      <PageHeader
        title="Size Guide"
        subtitle="Find the size that fits you best."
      />
      <SizeChart />
    </>
  )
}