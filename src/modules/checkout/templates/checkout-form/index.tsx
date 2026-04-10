import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { Suspense } from "react"

function SectionSkeleton() {
  return <div className="h-24 rounded-xl bg-gray-100 animate-pulse" />
}

async function ShippingWrapper({ cart }: { cart: HttpTypes.StoreCart }) {
  const shippingMethods = await listCartShippingMethods(cart.id)
  if (!shippingMethods) return null
  return <Shipping cart={cart} availableShippingMethods={shippingMethods} />
}

async function PaymentWrapper({ cart }: { cart: HttpTypes.StoreCart }) {
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")
  if (!paymentMethods) return null
  return <Payment cart={cart} availablePaymentMethods={paymentMethods} />
}

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) return null

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Suspense fallback={<SectionSkeleton />}>
        <Addresses cart={cart} customer={customer} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ShippingWrapper cart={cart} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <PaymentWrapper cart={cart} />
      </Suspense>

      <Review cart={cart} />
    </div>
  )
}
