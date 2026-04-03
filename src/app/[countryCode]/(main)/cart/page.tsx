import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getRegion } from "@lib/data/regions"
import CartTemplate from "@modules/cart/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Cart",
  description: "View your cart",
}

export default async function Cart({
  params,
}: {
  params: { countryCode: string }
}) {
  const { countryCode } = params

  const region = await getRegion(countryCode)
  if (!region) return notFound() // ← add this

  const cart = await retrieveCart().catch((error) => {
    console.error(error)
    return notFound()
  })

  console.log("cart region →", cart?.region)
  console.log("cart tax lines →", cart?.items?.[0]?.tax_lines)
  console.log("shipping tax →", cart?.shipping_methods?.[0])

  const customer = await retrieveCustomer()

  return <CartTemplate cart={cart} customer={customer} region={region} />
}
