'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { CheckoutAddressForm } from './checkout-address-form'
import { CheckoutShippingMethodForm } from './checkout-shipping-method-form'
import { CheckoutPaymentForm } from './checkout-payment-form'
import type { CheckoutAddressFormValues } from './checkout-address-schema'
import type { ShippingOption } from '../_lib/shipping-options'

type CheckoutPath = 'guest' | 'auth' | null
type CheckoutStep = 1 | 2 | 3

interface CheckoutFlowState {
  path: CheckoutPath
  step: CheckoutStep
  addressValues: CheckoutAddressFormValues | null
  selectedShippingOption: ShippingOption | null
  resolvedShippingCost: number
}

export function CheckoutEntry() {
  const t = useTranslations('checkoutPage')

  const [flowState, setFlowState] = useState<CheckoutFlowState>({
    path: null,
    step: 1,
    addressValues: null,
    selectedShippingOption: null,
    resolvedShippingCost: 0,
  })

  function handleGuestSelected() {
    setFlowState((prev) => ({ ...prev, path: 'guest', step: 1 }))
  }

  function handleAddressCompleted(addressValues: CheckoutAddressFormValues) {
    setFlowState((prev) => ({ ...prev, addressValues, step: 2 }))
  }

  function handleShippingMethodCompleted(
    selectedShippingOption: ShippingOption,
    resolvedShippingCost: number,
  ) {
    setFlowState((prev) => ({ ...prev, selectedShippingOption, resolvedShippingCost, step: 3 }))
  }

  function handleBackToAddressForm() {
    setFlowState((prev) => ({ ...prev, step: 1 }))
  }

  function handleBackToShippingMethod() {
    setFlowState((prev) => ({ ...prev, step: 2 }))
  }

  if (flowState.path === 'guest') {
    if (flowState.step === 1) {
      return (
        <CheckoutAddressForm
          defaultValues={flowState.addressValues ?? undefined}
          onNext={handleAddressCompleted}
        />
      )
    }

    if (flowState.step === 2) {
      return (
        <CheckoutShippingMethodForm
          onNext={handleShippingMethodCompleted}
          onBack={handleBackToAddressForm}
        />
      )
    }

    if (flowState.step === 3 && flowState.addressValues) {
      return (
        <CheckoutPaymentForm
          addressValues={flowState.addressValues}
          shippingCost={flowState.resolvedShippingCost}
          selectedShippingOption={flowState.selectedShippingOption ?? undefined}
          onBack={handleBackToShippingMethod}
        />
      )
    }
  }

  // Gateway screen — choose guest or sign in
  return (
    <div className="mx-auto max-w-md py-8">
      <h1 className="mb-2 text-2xl font-semibold text-foreground">{t('entryTitle')}</h1>
      <p className="mb-8 text-muted-foreground">{t('entrySubtitle')}</p>

      <div className="space-y-4">
        {/* Guest path — primary CTA */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-1 font-semibold text-foreground">{t('guestTitle')}</h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('guestDescription')}</p>
          <Button className="w-full" size="lg" onClick={handleGuestSelected}>
            {t('continueAsGuest')}
          </Button>
        </div>

        {/* Auth path — secondary */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-1 font-semibold text-foreground">{t('authTitle')}</h2>
          <p className="mb-4 text-sm text-muted-foreground">{t('authDescription')}</p>
          {/* TODO #72: replace with real auth flow when JWT is implemented */}
          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href="/login">{t('signIn')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
