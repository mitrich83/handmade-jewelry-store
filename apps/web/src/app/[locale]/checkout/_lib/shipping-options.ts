import { FREE_SHIPPING_THRESHOLD } from '@/lib/pricing-constants'

export { FREE_SHIPPING_THRESHOLD }

export type ShippingOptionId = 'standard' | 'express'

export interface ShippingOption {
  id: ShippingOptionId
  businessDaysMin: number
  businessDaysMax: number
  baseCost: number
  /** Minimum subtotal for free shipping. null = never free. */
  freeThreshold: number | null
}

export const DEFAULT_SHIPPING_OPTION_ID: ShippingOptionId = 'standard'

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    businessDaysMin: 5,
    businessDaysMax: 7,
    baseCost: 5.99,
    freeThreshold: FREE_SHIPPING_THRESHOLD,
  },
  {
    id: 'express',
    businessDaysMin: 2,
    businessDaysMax: 3,
    baseCost: 12.99,
    freeThreshold: null,
  },
]

export function calculateShippingCost(option: ShippingOption, subtotal: number): number {
  if (option.freeThreshold !== null && subtotal >= option.freeThreshold) {
    return 0
  }
  return option.baseCost
}
