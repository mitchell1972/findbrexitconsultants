import React from 'react'
import { HeroSection } from '../components/HeroSection'
import { ServiceCategories } from '../components/ServiceCategories'
import { FeaturedConsultants } from '../components/FeaturedConsultants'
import { RecentReviews } from '../components/RecentReviews'

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServiceCategories />
      <FeaturedConsultants />
      <RecentReviews />
    </div>
  )
}