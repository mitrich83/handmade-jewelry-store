import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@/test-utils'
import { CartSummary } from '../cart-summary'
import { useCartStore } from '@/store'

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <a {...props}>{children}</a>
  ),
}))

beforeEach(() => {
  useCartStore.setState({ items: [] })
})

describe('CartSummary — empty cart', () => {
  it('shows $0.00 total when cart is empty', () => {
    render(<CartSummary />)

    const totalValues = screen.getAllByText('$0.00')
    expect(totalValues.length).toBeGreaterThan(0)
  })
})

describe('CartSummary — with items', () => {
  beforeEach(() => {
    act(() => {
      useCartStore.setState({
        items: [
          { productId: 'p1', slug: 'ring', title: 'Ring', price: 50, image: '', quantity: 2 },
          {
            productId: 'p2',
            slug: 'necklace',
            title: 'Necklace',
            price: 30,
            image: '',
            quantity: 1,
          },
        ],
      })
    })
  })

  it('displays the correct subtotal for all cart items', () => {
    render(<CartSummary />)

    // 50×2 + 30×1 = 130.00
    const totalValues = screen.getAllByText('$130.00')
    expect(totalValues.length).toBeGreaterThan(0)
  })

  it('shows shipping calculated note', () => {
    render(<CartSummary />)

    expect(screen.getByText(/calculated at checkout/i)).toBeInTheDocument()
  })

  it('renders a link to /checkout', () => {
    render(<CartSummary />)

    expect(screen.getByRole('link', { name: /proceed to checkout/i })).toHaveAttribute(
      'href',
      '/checkout',
    )
  })
})
