'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { CheckoutOrderSummary } from './checkout-order-summary'
import { CheckoutSteps } from './checkout-steps'
import { useSubmitCheckoutOrder } from './hooks/use-submit-checkout-order'
import type { ShippingOption } from '../_lib/shipping-options'
import type { CheckoutAddressFormValues } from './checkout-address-schema'

interface CheckoutPaymentPlaceholderProps {
  addressValues: CheckoutAddressFormValues
  shippingCost: number
  selectedShippingOption?: ShippingOption
  onBack: () => void
}

export function CheckoutPaymentPlaceholder({
  addressValues,
  shippingCost,
  selectedShippingOption,
  onBack,
}: CheckoutPaymentPlaceholderProps) {
  const t = useTranslations('checkoutPage')
  const { submitOrder, isSubmitting, submitError } = useSubmitCheckoutOrder()

  function handlePlaceOrder() {
    submitOrder({ addressValues, shippingCost })
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <CheckoutSteps currentStep={3} />

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">{t('paymentTitle')}</h2>

          {/* Express payment methods — placeholders until Stripe integration (#30) */}
          <div className="space-y-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full cursor-not-allowed border-border opacity-50"
              disabled
              aria-label={t('applePayComingSoon')}
            >
              {t('payWithApplePay')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full cursor-not-allowed border-border opacity-50"
              disabled
              aria-label={t('googlePayComingSoon')}
            >
              {t('payWithGooglePay')}
            </Button>
          </div>

          <div className="relative flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">{t('orPayWithCard')}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Card form placeholder — replaced by Stripe Elements in #30 */}
          <div
            className="space-y-4 rounded-lg border border-border bg-card p-4"
            aria-label={t('cardFormLabel')}
          >
            <div className="h-10 animate-pulse rounded-md bg-muted" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 animate-pulse rounded-md bg-muted" aria-hidden="true" />
              <div className="h-10 animate-pulse rounded-md bg-muted" aria-hidden="true" />
            </div>
            <p className="text-center text-xs text-muted-foreground">{t('stripeComingSoon')}</p>
          </div>

          {submitError && (
            <p role="alert" className="text-sm text-destructive">
              {t('submitError')}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-48"
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? t('submitting') : t('placeOrder')}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
              onClick={onBack}
              disabled={isSubmitting}
              aria-label={t('backToShippingMethod')}
            >
              {t('back')}
            </Button>
          </div>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>🔒</span>
            <span>{t('securePaymentBadge')}</span>
          </div>
        </div>
      </div>

      <CheckoutOrderSummary shippingCost={shippingCost} selectedOption={selectedShippingOption} />
    </div>
  )
}
