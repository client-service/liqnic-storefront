import { Heading } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import PrintInvoiceButton from "./print-invoice-button"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="min-h-[calc(100vh-64px)] relative">
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.05] blur-[2px]">
        <Image
          src="/images/order-confirm.png"
          alt=""
          width={600}
          height={600}
          className="object-contain"
          priority
        />
      </div>
      <div className="relative z-10 content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-4 max-w-4xl h-full w-full py-10"
          data-testid="order-complete-container"
        >
          <Heading
            level="h1"
            className="flex flex-col gap-y-3 text-ui-fg-base text-3xl mb-4"
          >
            <span>Thank you!</span>
            <span>Your order was placed successfully.</span>
          </Heading>

          <OrderDetails order={order} />

          <Heading level="h2" className="flex flex-row text-3xl-regular">
            Summary
          </Heading>

          <Items order={order} />
          <CartTotals totals={order} />
          <ShippingDetails order={order} />
          <Help />

          {/* Print Invoice Button */}
          <PrintInvoiceButton order={order} />
        </div>
      </div>
    </div>
  )
}
