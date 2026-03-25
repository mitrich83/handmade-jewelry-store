'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartTotalPrice, useCartTotalItems } from '@/store'

export function CartSummary() {
  const t = useTranslations('cartPage')
  const totalPrice = useCartTotalPrice()
  const totalItems = useCartTotalItems()

  const formattedTotal = totalPrice.toFixed(2)

  return (
    <aside aria-label={t('summaryLabel')} className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">{t('summaryTitle')}</h2>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{t('subtotalItems', { count: totalItems })}</span>
          <data value={formattedTotal} className="font-medium text-foreground">
            ${formattedTotal}
          </data>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{t('shipping')}</span>
          <span>{t('shippingCalculated')}</span>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-foreground">
          <span>{t('total')}</span>
          <data value={formattedTotal}>${formattedTotal}</data>
        </div>
      </div>

      <Button className="mt-6 w-full" size="lg" asChild>
        <Link href="/checkout">{t('proceedToCheckout')}</Link>
      </Button>

      <Button variant="ghost" className="mt-2 w-full" size="lg" asChild>
        <Link href="/shop">{t('continueShopping')}</Link>
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground">{t('secureCheckout')}</p>
    </aside>
  )
}
