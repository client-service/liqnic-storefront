"use client"

import { addToCart } from "@lib/data/cart"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { isEqual } from "lodash"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export default function ProductPreview({
  product,
  isFeatured,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
}) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  const optionsAsKeymap = (opts: any) =>
    opts?.reduce((acc: Record<string, string>, o: any) => {
      acc[o.option_id] = o.value
      return acc
    }, {})

  // AUTO SELECT VARIANT — same logic as product page
  useEffect(() => {
    if (!product.variants?.length) return
    const firstVariant = product.variants[0]
    setOptions(optionsAsKeymap(firstVariant.options))
  }, [product])

  const selectedVariant = useMemo(() => {
    if (!product.variants) return null
    return product.variants.find((v) =>
      isEqual(optionsAsKeymap(v.options), options)
    )
  }, [product.variants, options])

  const inStock = useMemo(() => {
    if (!selectedVariant) return false
    if (!selectedVariant.manage_inventory) return true
    if (selectedVariant.allow_backorder) return true
    return (selectedVariant.inventory_quantity || 0) > 0
  }, [selectedVariant])

  const maxQuantity = useMemo(() => {
    if (!selectedVariant) return 1
    const available = selectedVariant.manage_inventory
      ? selectedVariant.inventory_quantity || 0
      : 10
    return Math.min(available, 10)
  }, [selectedVariant])

  useEffect(() => {
    if (quantity > maxQuantity) setQuantity(maxQuantity)
  }, [maxQuantity])

  const incrementQuantity = () =>
    setQuantity((q) => Math.min(q + 1, maxQuantity))

  const decrementQuantity = () => setQuantity((q) => Math.max(q - 1, 1))

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return

    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })
    setIsAdding(false)
  }

  const imageUrl = product.thumbnail || product.images?.[0]?.url
  const { cheapestPrice } = getProductPrice({ product })

  console.log("cheapestPrice →", cheapestPrice)
  console.log(
    "variant calculated_price →",
    product.variants?.[0]?.calculated_price
  )

  return (
    <div className="group w-full h-full flex flex-col border rounded-lg bg-[#F9F9F9] p-4 ">
      {/* Image */}
      <div className="relative w-full overflow-hidden rounded-lg flex items-center justify-center h-60 bg-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-lg border scale-110 bg-white"
          />
        ) : (
          <div className="text-gray-400 text-sm">No image</div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 mt-4 flex-grow">
        <h2 className="text-base sm:text-lg font-bold line-clamp-2 min-h-[3rem]">
          {product.title}
        </h2>

        <p className="text-xs text-gray-500 line-clamp-2 min-h-[2rem]">
          {product.subtitle}
        </p>
      </div>

      {/* --- PRICE + QUANTITY (same row) --- */}
      <div className="flex justify-between items-center mt-3">
        {cheapestPrice ? (
          <span className="text-sm font-semibold">
            {cheapestPrice.original_price}
          </span>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={decrementQuantity}
            disabled={!selectedVariant || quantity <= 1}
            className="h-8 w-8 p-0"
          >
            -
          </Button>

          <span className="w-8 text-center">{quantity}</span>

          <Button
            variant="secondary"
            onClick={incrementQuantity}
            disabled={!selectedVariant || quantity >= maxQuantity}
            className="h-8 w-8 p-0"
          >
            +
          </Button>
        </div>
      </div>

      {/* --- ADD TO CART + VIEW DETAILS (same row) --- */}
      <div className="flex gap-2 mt-4">
        {/* View details (left) */}
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="w-1/2"
        >
          <Button variant="secondary" className="w-full h-10">
            View details
          </Button>
        </LocalizedClientLink>

        {/* Add to cart (right) */}
        <Button
          onClick={handleAddToCart}
          disabled={!selectedVariant || !inStock || isAdding}
          isLoading={isAdding}
          className="w-1/2 h-10 bg-black text-white"
        >
          {!inStock ? "Out of stock" : "Add to cart"}
        </Button>
      </div>
    </div>
  )
}
