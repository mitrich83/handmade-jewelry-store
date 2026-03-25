import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test-utils'
import { EmptyCart } from '../empty-cart'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <a {...props}>{children}</a>
  ),
}))

describe('EmptyCart', () => {
  it('renders the empty cart heading', () => {
    render(<EmptyCart />)

    expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument()
  })

  it('renders a link to the shop', () => {
    render(<EmptyCart />)

    expect(screen.getByRole('link', { name: /continue shopping/i })).toHaveAttribute(
      'href',
      '/shop',
    )
  })
})
