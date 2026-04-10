"use client"

import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import React, { useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    try {
      // Ensure cart has a proper COD payment_collection
      if (!cart.payment_collection) {
        cart.payment_collection = {
          id: "fake-cod-collection",
          status: "authorized",
          currency_code: cart.region?.currency_code || "usd",
          amount: cart.total,
          payment_sessions: [],
          payment_providers: [],
        }
      }

      // Add a fake COD payment session if not present
      if (
        !cart.payment_collection.payment_sessions?.find(
          (ps) => ps.provider_id === "pp_system_default"
        )
      ) {
        cart?.payment_collection?.payment_sessions?.push({
          id: "fake-cod-session",
          provider_id: "pp_system_default",
          status: "pending",
          amount: cart.total,
          currency_code: cart.region?.currency_code || "npr",
          data: {},
        })
      }

      await placeOrder()
    } catch (err: any) {
      // Next.js redirect() throws a special NEXT_REDIRECT error internally.
      // This is NOT a real error — if we catch it we must let it propagate
      // so the redirect to order confirmation actually happens.
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        return
      }
      setErrorMessage(err.message ?? "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        disabled={notReady || submitting}
        onClick={handlePayment}
        data-testid={dataTestId}
        className="
         w-auto px-6 h-12 rounded-xl
          flex items-center justify-center gap-2
          bg-black hover:bg-gray-900 text-white
          text-sm font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-[0.98] transition-all
        "
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Placing order...
          </>
        ) : (
          "Place order"
        )}
      </button>

      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
