import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface StatusCardProps {
  title: string
  description: string
  body: string
  primaryAction: string
  secondaryAction: string
}

/**
 * Pure presentational component — dumb card, only renders what it receives.
 * All labels come from the parent so this component is fully reusable and testable.
 */
export function StatusCard({
  title,
  description,
  body,
  primaryAction,
  secondaryAction,
}: StatusCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{body}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button>{primaryAction}</Button>
        <Button variant="outline">{secondaryAction}</Button>
      </CardFooter>
    </Card>
  )
}
