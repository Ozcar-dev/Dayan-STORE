import { AboutStory } from '@/components/sections/AboutStory'
import { PageHeader } from '@/components/ui/PageHeader'
import { SITE } from '@/constants/site'

export default function About() {
  return (
    <>
      <PageHeader title="About us" subtitle={SITE.tagline} />
      <AboutStory />
    </>
  )
}