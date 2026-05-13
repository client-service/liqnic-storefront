import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 60
export const dynamicParams = true

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export async function generateStaticParams() {
  try {
    const { response } = await listProducts({
      countryCode: "np",
      queryParams: { limit: 100, fields: "handle" },
    })
    return response.products
      .filter((p) => p.handle)
      .map((p) => ({ countryCode: "np", handle: p.handle }))
  } catch (err: any) {
    console.warn("Failed to generate static params:", err.message)
    return []
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle, countryCode } = params

  let region = null
  try {
    region = await getRegion(countryCode)
  } catch (err: any) {
    console.warn("Could not fetch region:", err.message)
  }

  if (!region) {
    return {
      title: "Product Not Found | Liqnic",
      description: "Region not available",
    }
  }

  let product = null
  try {
    const { response } = await listProducts({
      countryCode,
      queryParams: { handle },
    })
    product = response.products[0]
  } catch (err: any) {
    console.warn("Could not fetch product metadata:", err.message)
  }

  if (!product) {
    return {
      title: "Product Not Found | Liqnic",
      description: "Product data not available",
    }
  }

  const rawDescription = product.description ?? ""

  // strip HTML tags if any, then trim to 160 chars
  const description =
    rawDescription
      .replace(/<[^>]*>/g, "") // remove HTML tags
      .replace(/\s+/g, " ") // collapse whitespace
      .trim()
      .slice(0, 160) ||
    `Buy ${product.title} at Liqnic. Fast delivery across Nepal.`

  return {
    title: `${product.title} | Liqnic`,
    description,
    alternates: {
      canonical: `https://liqnic.com/${countryCode}/products/${handle}`,
    },
    openGraph: {
      title: `${product.title} | Liqnic`,
      description,
      type: "website",
      images: product.thumbnail
        ? [{ url: product.thumbnail, alt: product.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Liqnic`,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const { countryCode, handle } = params

  let region = null
  try {
    region = await getRegion(countryCode)
  } catch (err: any) {
    console.warn("Could not fetch region:", err.message)
  }

  if (!region) notFound()

  let product = null
  try {
    const { response } = await listProducts({
      countryCode,
      queryParams: { handle },
    })
    product = response.products[0]
  } catch (err: any) {
    console.warn("Could not fetch product:", err.message)
  }

  if (!product) notFound()

  return (
    <ProductTemplate
      product={product}
      region={region}
      countryCode={countryCode}
    />
  )
}
