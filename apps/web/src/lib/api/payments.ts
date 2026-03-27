import { apiClient } from './client'

export interface CreatePaymentIntentPayload {
  orderId: string
}

export interface CreatedPaymentIntent {
  clientSecret: string
}

export async function createPaymentIntent(
  payload: CreatePaymentIntentPayload,
): Promise<CreatedPaymentIntent> {
  return apiClient<CreatedPaymentIntent>('/api/payments/intent', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
