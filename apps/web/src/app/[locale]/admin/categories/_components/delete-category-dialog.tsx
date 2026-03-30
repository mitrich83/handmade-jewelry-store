'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { CategoryWithCount } from '@jewelry/shared'

interface DeleteCategoryDialogProps {
  category: CategoryWithCount | null
  onClose: () => void
  onConfirm: () => void
  isPending: boolean
}

export function DeleteCategoryDialog({
  category,
  onClose,
  onConfirm,
  isPending,
}: DeleteCategoryDialogProps) {
  const t = useTranslations('admin')
  const hasProducts = (category?._count.products ?? 0) > 0

  return (
    <Dialog open={category !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('categoriesDeleteTitle')}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          {hasProducts
            ? t('categoriesDeleteBlockedMessage', {
                name: category?.name ?? '',
                count: category?._count.products ?? 0,
              })
            : t('categoriesDeleteConfirmMessage', { name: category?.name ?? '' })}
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            {t('categoriesCancel')}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isPending || hasProducts}>
            {isPending ? t('categoriesDeleting') : t('categoriesDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
