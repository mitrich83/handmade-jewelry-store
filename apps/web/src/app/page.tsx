import { HeroSection } from './_components/hero-section'
import { StatusCard } from './_components/status-card'

/**
 * Server Component — the only place that knows WHAT data to show.
 * No JSX logic here: just compose presentational components and pass data.
 *
 * In future issues this will do: const products = await getProducts()
 * and pass them down. Components never fetch — page.tsx fetches.
 */
export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <HeroSection
        badge="Coming Soon"
        title="Handmade Jewelry Store"
        description="Unique handmade jewelry crafted with love"
      />

      <StatusCard
        title="UI Components Ready"
        description="Shadcn/ui + Tailwind CSS v4 configured"
        body="Design system is set up. Full layout with header, footer and navigation will be built in the next issue."
        primaryAction="Shop Now"
        secondaryAction="Learn More"
      />
    </main>
  )
}
