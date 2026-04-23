import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { setShippingMethod } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Review from "@modules/checkout/components/review"
import AutoInitPayment from "@modules/checkout/components/auto-init-payment"
import { Suspense } from "react"

function SectionSkeleton() {
  return <div className="h-24 rounded-xl bg-gray-100 animate-pulse" />
}

/** Silently auto-selects the first home-delivery shipping method. */
async function AutoSelectShipping({ cart }: { cart: HttpTypes.StoreCart }) {
  const shippingMethods = await listCartShippingMethods(cart.id)

  const homeDelivery = shippingMethods?.find(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )

  const alreadySelected = cart.shipping_methods?.some(
    (sm) => sm.shipping_option_id === homeDelivery?.id
  )

  if (homeDelivery && !alreadySelected) {
    try {
      await setShippingMethod({
        cartId: cart.id,
        shippingMethodId: homeDelivery.id,
      })
    } catch {
      // silently ignore
    }
  }

  return null
}

/** Silently auto-initiates the COD payment session. */
async function AutoSelectPayment({ cart }: { cart: HttpTypes.StoreCart }) {
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  const codMethod =
    paymentMethods?.find(
      (pm) =>
        pm.id.includes("cod") ||
        pm.id.includes("cash") ||
        pm.id.includes("manual")
    ) ?? paymentMethods?.[0]

  if (!codMethod) return null

  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s: any) => s.status === "pending"
  )

  if (activeSession?.provider_id === codMethod.id) return null

  return <AutoInitPayment cart={cart} providerId={codMethod.id} />
}

/** Visible info card shown between address and review. */
function OrderInfoCard() {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 divide-y divide-gray-100">
      {/* Delivery row */}
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#C5A163]/10 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#C5A163]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 1h11l2 6h7l-2 9H3L1 1z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">Home Delivery</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Delivered to your shipping address
          </p>
        </div>
        <span className="text-xs font-medium text-[#C5A163] bg-[#C5A163]/10 px-2 py-0.5 rounded-full shrink-0">
          Standard
        </span>
      </div>

      {/* Payment row */}
      <div className="flex items-center gap-3 px-4 py-3.5">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#C5A163]/10 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-[#C5A163]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800">
            Cash on Delivery
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Pay when your order arrives
          </p>
        </div>
        <span className="text-xs font-medium text-[#C5A163] bg-[#C5A163]/10 px-2 py-0.5 rounded-full shrink-0">
          COD
        </span>
      </div>
    </div>
  )
}

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) return null
  console.log("customer:", customer)

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      {/* Silent background setup */}
      <Suspense fallback={null}>
        <AutoSelectShipping cart={cart} />
      </Suspense>
      <Suspense fallback={null}>
        <AutoSelectPayment cart={cart} />
      </Suspense>

      {/* Step 1 — Shipping Address */}
      <Suspense fallback={<SectionSkeleton />}>
        <Addresses cart={cart} customer={customer} />
      </Suspense>

      {/* Delivery & payment info */}
      <OrderInfoCard />

      {/* Step 2 — Review & Place Order */}
      <Review cart={cart} />
    </div>
  )
}
// import { listCartShippingMethods } from "@lib/data/fulfillment"
// import { listCartPaymentMethods } from "@lib/data/payment"
// import { HttpTypes } from "@medusajs/types"
// import Addresses from "@modules/checkout/components/addresses"
// import Payment from "@modules/checkout/components/payment"
// import Review from "@modules/checkout/components/review"
// import Shipping from "@modules/checkout/components/shipping"
// import { Suspense } from "react"

// function SectionSkeleton() {
//   return <div className="h-24 rounded-xl bg-gray-100 animate-pulse" />
// }

// async function ShippingWrapper({ cart }: { cart: HttpTypes.StoreCart }) {
//   const shippingMethods = await listCartShippingMethods(cart.id)
//   if (!shippingMethods) return null
//   return <Shipping cart={cart} availableShippingMethods={shippingMethods} />
// }

// async function PaymentWrapper({ cart }: { cart: HttpTypes.StoreCart }) {
//   const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")
//   if (!paymentMethods) return null
//   return <Payment cart={cart} availablePaymentMethods={paymentMethods} />
// }

// export default async function CheckoutForm({
//   cart,
//   customer,
// }: {
//   cart: HttpTypes.StoreCart | null
//   customer: HttpTypes.StoreCustomer | null
// }) {
//   if (!cart) return null

//   return (
//     <div className="w-full grid grid-cols-1 gap-y-8">
//       <Suspense fallback={<SectionSkeleton />}>
//         <Addresses cart={cart} customer={customer} />
//       </Suspense>

//       <Suspense fallback={<SectionSkeleton />}>
//         <ShippingWrapper cart={cart} />
//       </Suspense>

//       <Suspense fallback={<SectionSkeleton />}>
//         <PaymentWrapper cart={cart} />
//       </Suspense>

//       <Review cart={cart} />
//     </div>
//   )
// }
