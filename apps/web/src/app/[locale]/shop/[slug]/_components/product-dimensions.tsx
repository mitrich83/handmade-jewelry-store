import { getTranslations } from 'next-intl/server'
import type { Product } from '@jewelry/shared'

interface ProductDimensionsProps {
  product: Pick<
    Product,
    'lengthCm' | 'widthCm' | 'heightCm' | 'diameterCm' | 'weightGrams' | 'beadSizeMm'
  >
}

// Dimensions are stored in metric (docs/10_MEASUREMENT_SYSTEMS.md).
// Display in imperial for US market: cm → inches, except weightGrams and beadSizeMm
// which are universal jewelry standards and are never converted.
function cmToInches(cm: number): string {
  return (cm / 2.54).toFixed(2)
}

export async function ProductDimensions({ product }: ProductDimensionsProps) {
  const t = await getTranslations('productDetail')

  const hasDimensions =
    product.lengthCm !== null ||
    product.widthCm !== null ||
    product.heightCm !== null ||
    product.diameterCm !== null ||
    product.weightGrams !== null ||
    product.beadSizeMm !== null

  if (!hasDimensions) return null

  return (
    <section aria-label={t('dimensionsLabel')}>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {t('dimensionsTitle')}
      </h2>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {product.lengthCm !== null && (
          <>
            <dt className="text-muted-foreground">{t('length')}</dt>
            <dd className="font-medium text-foreground">
              {cmToInches(product.lengthCm)}&Prime; / {product.lengthCm} cm
            </dd>
          </>
        )}
        {product.widthCm !== null && (
          <>
            <dt className="text-muted-foreground">{t('width')}</dt>
            <dd className="font-medium text-foreground">
              {cmToInches(product.widthCm)}&Prime; / {product.widthCm} cm
            </dd>
          </>
        )}
        {product.heightCm !== null && (
          <>
            <dt className="text-muted-foreground">{t('height')}</dt>
            <dd className="font-medium text-foreground">
              {cmToInches(product.heightCm)}&Prime; / {product.heightCm} cm
            </dd>
          </>
        )}
        {product.diameterCm !== null && (
          <>
            <dt className="text-muted-foreground">{t('diameter')}</dt>
            <dd className="font-medium text-foreground">
              {cmToInches(product.diameterCm)}&Prime; / {product.diameterCm} cm
            </dd>
          </>
        )}
        {product.weightGrams !== null && (
          <>
            <dt className="text-muted-foreground">{t('weight')}</dt>
            {/* weightGrams is a universal jewelry standard — never convert to oz (docs/10) */}
            <dd className="font-medium text-foreground">{product.weightGrams} g</dd>
          </>
        )}
        {product.beadSizeMm !== null && (
          <>
            <dt className="text-muted-foreground">{t('beadSize')}</dt>
            {/* beadSizeMm is always in mm — industry standard, never convert (docs/10) */}
            <dd className="font-medium text-foreground">{product.beadSizeMm} mm</dd>
          </>
        )}
      </dl>
    </section>
  )
}
