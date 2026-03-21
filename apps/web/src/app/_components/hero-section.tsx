import { Badge } from '@/components/ui/badge'

interface HeroSectionProps {
  badge: string
  title: string
  description: string
}

/**
 * Pure presentational component — no logic, no state, no API calls.
 * Receives all data as props from the parent Server Component (page.tsx).
 * No 'use client' needed — zero interactivity, renders on the server.
 */
export function HeroSection({ badge, title, description }: HeroSectionProps) {
  return (
    <div className="text-center">
      <Badge variant="secondary" className="mb-4">
        {badge}
      </Badge>
      <h1 className="text-4xl font-bold tracking-tight text-foreground">{title}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{description}</p>
    </div>
  )
}
