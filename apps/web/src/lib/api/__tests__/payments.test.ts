import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPaymentIntent } from '../payments'
import { ApiError } from '../client'
import * as client from '../client'

vi.mock('../client', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof client
  return {
    ...actual,
    apiClient: vi.fn(),
  }
})

describe('createPaymentIntent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls apiClient with POST /api/payments/intent and orderId', async () => {
    const mockClientSecret = 'pi_test_secret_xyz'
    vi.mocked(client.apiClient).mockResolvedValueOnce({ clientSecret: mockClientSecret })

    const result = await createPaymentIntent({ orderId: 'order_123' })

    expect(client.apiClient).toHaveBeenCalledWith('/api/payments/intent', {
      method: 'POST',
      body: JSON.stringify({ orderId: 'order_123' }),
    })
    expect(result).toEqual({ clientSecret: mockClientSecret })
  })

  it('propagates ApiError when the request fails', async () => {
    const apiError = new ApiError(404, 'API 404: Not Found — /api/payments/intent')
    vi.mocked(client.apiClient).mockRejectedValueOnce(apiError)

    await expect(createPaymentIntent({ orderId: 'missing_order' })).rejects.toThrow(ApiError)
  })
})
