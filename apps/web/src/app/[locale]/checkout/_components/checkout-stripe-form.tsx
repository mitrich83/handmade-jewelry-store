'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

interface CheckoutStripeFormProps {
  orderId: string
  totalAmount: number
  returnUrl: string
  isSubmitting: boolean
  onSubmittingChange: (isSubmitting: boolean) => void
  onBack: () => void
}

export function CheckoutStripeForm({
  orderId,
  totalAmount,
  returnUrl,
  isSubmitting,
  onSubmittingChange,
  onBack,
}: CheckoutStripeFormProps) {
  const t = useTranslations('checkoutPage')
  const stripe = useStripe()
  const elements = useElements()
  const [stripeError, setStripeError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!stripe || !elements) return

    setStripeError(null)
    onSubmittingChange(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    })

    // confirmPayment only returns here if it encounters an error.
    // On success, Stripe redirects to return_url automatically.
    if (error) {
      setStripeError(error.message ?? t('submitError'))
      onSubmittingChange(false)
    }
  }

  // Format total for display: cents → dollars
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalAmount / 100)

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-6">
        {/* Stripe PaymentElement renders card fields + Apple/Google Pay when available */}
        <PaymentElement id={`payment-element-${orderId}`} options={{ layout: 'tabs' }} />

        {stripeError && (
          <p role="alert" className="text-sm text-destructive">
            {stripeError}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row-reverse">
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto sm:min-w-48"
            disabled={!stripe || !elements || isSubmitting}
          >
            {isSubmitting ? t('submitting') : t('payNow', { amount: formattedTotal })}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto"
            onClick={onBack}
            disabled={isSubmitting}
          >
            {t('back')}
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span aria-hidden="true">🔒</span>
          <span>{t('securePaymentBadge')}</span>
        </div>
      </div>
    </form>
  )
}
