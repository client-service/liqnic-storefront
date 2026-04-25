const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ""

const medusaHeaders = {
  "Content-Type": "application/json",
  "x-publishable-api-key": PUBLISHABLE_KEY,
}

export async function initPaymentSession(cartId: string, providerId: string) {
  // Step 1 — create payment collection
  const colRes = await fetch(
    `${MEDUSA_BACKEND_URL}/store/payment-collections`,
    {
      method: "POST",
      headers: medusaHeaders,
      body: JSON.stringify({ cart_id: cartId }),
    }
  )

  if (!colRes.ok) {
    const body = await colRes.json().catch(() => ({}))
    throw new Error(
      body?.message ?? `Failed to create payment collection (${colRes.status})`
    )
  }

  const { payment_collection } = await colRes.json()

  // Step 2 — initialize session on that collection
  const sesRes = await fetch(
    `${MEDUSA_BACKEND_URL}/store/payment-collections/${payment_collection.id}/payment-sessions`,
    {
      method: "POST",
      headers: medusaHeaders,
      body: JSON.stringify({ provider_id: providerId }),
    }
  )

  if (!sesRes.ok) {
    const body = await sesRes.json().catch(() => ({}))
    throw new Error(
      body?.message ?? `Failed to init payment session (${sesRes.status})`
    )
  }

  return sesRes.json()
}

export async function saveQrReference(
  cartId: string,
  transactionId: string,
  bankName?: string
) {
  const res = await fetch(`${MEDUSA_BACKEND_URL}/store/carts/${cartId}`, {
    method: "POST",
    headers: medusaHeaders,
    body: JSON.stringify({
      metadata: {
        qr_transaction_id: transactionId,
        ...(bankName ? { qr_bank_name: bankName } : {}),
      },
    }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.message ?? `Failed to save reference (${res.status})`)
  }

  return res.json()
}
