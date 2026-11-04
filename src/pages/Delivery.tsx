import { DeliveryDetails } from '@/components/sections/DeliveryDetails'
import { PageHeader } from '@/components/ui/PageHeader'

export default function Delivery() {
  return (
    <>
      <PageHeader
        title="Delivery"
        subtitle="How delivery, payment and returns work."
      />
      <DeliveryDetails />
    </>
  )
}