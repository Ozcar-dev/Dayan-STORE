import { CustomOrderForm } from '@/components/sections/CustomOrderForm'
import { PageHeader } from '@/components/ui/PageHeader'

export default function CustomOrder() {
  return (
    <>
      <PageHeader
        title="Custom Order"
        subtitle="Can't find what you want? Tell us what you are looking for."
      />
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <CustomOrderForm />
      </div>
    </>
  )
}