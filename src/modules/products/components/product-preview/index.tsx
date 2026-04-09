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

const optionsAsKeymap = (opts: any): Record<string, string> =>
  opts?.reduce((acc: Record<string, string>, o: any) => {
    acc[o.option_id] = o.value
    return acc
  }, {}) ?? {}

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

  // Auto-select first variant on mount
  useEffect(() => {
    if (!product.variants?.length) return
    setOptions(optionsAsKeymap(product.variants[0].options))
  }, [product])

  const selectedVariant = useMemo(() => {
    if (!product.variants) return null
    return (
      product.variants.find((v) =>
        isEqual(optionsAsKeymap(v.options), options)
      ) ?? null
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
  }, [maxQuantity, quantity])

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return
    setIsAdding(true)
    await addToCart({ variantId: selectedVariant.id, quantity, countryCode })
    setIsAdding(false)
  }

  const imageUrl = product.thumbnail || product.images?.[0]?.url
  const { cheapestPrice } = getProductPrice({ product })
  // ↑ removed console.logs — never log in production card components

  return (
    <div className="group w-full h-full flex flex-col rounded-lg bg-[#F9F9F9] border border-gray-100 group">
      {/* ── Image ───────────────────────────────────────────────────────────── */}
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        tabIndex={-1}
        aria-hidden
        className="p-2 lg:p-4"
      >
        <div className="relative w-full h-36 xs:h-44 sm:h-52 lg:h-56 rounded-lg overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover !rounded-lg group-hover:scale-105 duration-300 transition-all"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-300 text-xs">
              No image
            </div>
          )}
        </div>
      </LocalizedClientLink>

      {/* ── Info + actions ──────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-grow p-2.5 sm:p-3.5 gap-2">
        {/* Title — no reserved min-height; let it flow naturally */}
        <h2 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 text-gray-900">
          {product.title}
        </h2>

        {/* Subtitle — hide on mobile to save space, show sm+ */}
        {product.subtitle && (
          <p className="hidden sm:block text-xs text-gray-400 line-clamp-1">
            {product.subtitle}
          </p>
        )}

        {/* Price */}
        {cheapestPrice && (
          <p className="text-sm font-bold text-gray-900 mt-auto">
            {cheapestPrice.original_price}
          </p>
        )}

        {/* ── Quantity stepper ──────────────────────────────────────────────
            Stacked vertically on mobile — side-by-side was too cramped
            at ~175px card width in a 2-col grid
        ─────────────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">Qty</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
              disabled={!selectedVariant || quantity <= 1}
              aria-label="Decrease quantity"
              className="
                w-7 h-7 sm:w-8 sm:h-8
                flex items-center justify-center
                rounded-md border border-gray-200 bg-white
                text-gray-700 font-medium text-sm
                disabled:opacity-40 disabled:cursor-not-allowed
                active:scale-95 transition
                /* Native button instead of Medusa Button — more control over size */
              "
            >
              −
            </button>

            <span className="w-6 text-center text-sm font-medium tabular-nums">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => Math.min(q + 1, maxQuantity))}
              disabled={!selectedVariant || quantity >= maxQuantity}
              aria-label="Increase quantity"
              className="
                w-7 h-7 sm:w-8 sm:h-8
                flex items-center justify-center
                rounded-md border border-gray-200 bg-white
                text-gray-700 font-medium text-sm
                disabled:opacity-40 disabled:cursor-not-allowed
                active:scale-95 transition
              "
            >
              +
            </button>
          </div>
        </div>

        {/* ── CTA buttons ───────────────────────────────────────────────────
            On mobile: Add to cart full-width (primary action), View details below
            On sm+: side by side
        ─────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 mt-2">
          {/* Add to cart — primary, full width on mobile */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || !inStock || isAdding}
            aria-label={!inStock ? "Out of stock" : "Add to cart"}
            className="
              w-full sm:flex-1
              h-9 sm:h-10
              flex items-center justify-center gap-1.5
              rounded-md bg-black text-white
              text-xs sm:text-sm font-medium
              disabled:opacity-50 disabled:cursor-not-allowed
              active:scale-[0.98] transition
            "
          >
            {isAdding ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : !inStock ? (
              "Out of stock"
            ) : (
              "Add to cart"
            )}
          </button>

          {/* View details — secondary, full width on mobile */}
          <LocalizedClientLink
            href={`/products/${product.handle}`}
            className="w-full sm:flex-1"
          >
            <button
              className="
              w-full
              h-9 sm:h-10
              flex items-center justify-center
              rounded-md border border-gray-200 bg-white
              text-xs sm:text-sm font-medium text-gray-700
              hover:bg-gray-50 active:scale-[0.98] transition
            "
            >
              View details
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
