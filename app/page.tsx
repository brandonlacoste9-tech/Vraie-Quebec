import { MainNav } from "@/components/main-nav"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedSpots } from "@/components/featured-spots"
import { SubscriptionBanner } from "@/components/subscription-banner"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Footer } from "@/components/footer"
import { FloatingCreatorButton } from "@/components/floating-creator-button"
import { PromoBanner } from "@/components/promo-banner"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-pulse-glow delay-1000" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[60%] h-[30%] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <MainNav />
        <HeroSection />
        <div className="container mx-auto px-4 py-8 space-y-16">
          <CategoryGrid />

          <PromoBanner />

          <FeaturedSpots />
          <SubscriptionBanner />
          <UpcomingEvents />
        </div>
        <Footer />
      </div>

      <FloatingCreatorButton />
    </main>
  )
}
