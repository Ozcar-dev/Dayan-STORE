import { ReviewList } from '@/components/sections/ReviewList'
import { PageHeader } from '@/components/ui/PageHeader'

export default function Reviews() {
  return (
    <>
      <PageHeader
        title="Reviews"
        subtitle="What our customers say about us."
      />
      <ReviewList />
    </>
  )
}