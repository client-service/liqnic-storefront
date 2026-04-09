"use client"

import { HttpTypes } from "@medusajs/types"
import { useRef, useState, useEffect } from "react"
import { convertToLocale } from "@lib/util/money"

type Props = {
  order: HttpTypes.StoreOrder
}

export default function PrintInvoiceButton({ order }: Props) {
  const [open, setOpen] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const currency_code = order.currency_code
  const format = (amount: number) => convertToLocale({ amount, currency_code })

  const taxLine = order.items?.[0]?.tax_lines?.[0]
  const taxName = taxLine?.description ?? taxLine?.code ?? "VAT"
  const taxRate = taxLine?.rate ?? 0
  const shippingAddress = order.shipping_address

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  const handlePrint = () => {
    const content = printRef.current
    if (!content) return
    const printWindow = window.open("", "_blank", "width=800,height=600")
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.display_id}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; font-size: 13px; color: #111; padding: 40px; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
            .store-name { font-size: 24px; font-weight: bold; }
            .invoice-meta { text-align: right; color: #555; }
            .invoice-meta h2 { font-size: 20px; font-weight: bold; color: #111; margin-bottom: 4px; }
            .section { margin-bottom: 24px; }
            .section-title { font-size: 11px; text-transform: uppercase; color: #888; margin-bottom: 8px; letter-spacing: 0.5px; }
            table { width: 100%; border-collapse: collapse; }
            thead tr { background: #f5f5f5; }
            th { text-align: left; padding: 10px 12px; font-size: 12px; border-bottom: 1px solid #e5e5e5; }
            td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
            .text-right { text-align: right; }
            .totals-table td { border: none; padding: 6px 12px; }
            .totals-table tr.total-row td { font-weight: bold; font-size: 15px; border-top: 2px solid #111; padding-top: 10px; }
            .footer { margin-top: 48px; text-align: center; color: #888; font-size: 12px; border-top: 1px solid #e5e5e5; padding-top: 16px; }
            @media print { body { padding: 20px; } button { display: none; } }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 500)
  }

  return (
    <>
      {/* ── Trigger button ──────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="
          flex items-center justify-center gap-2
          w-full sm:w-auto h-11 px-6 rounded-xl
          border border-gray-200 bg-white
          text-sm font-medium text-gray-700
          hover:bg-gray-50 hover:border-gray-300
          active:scale-[0.98] transition-all
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"
          />
        </svg>
        Print Invoice
      </button>

      {/* ── Modal ───────────────────────────────────────────────────────── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel — bottom sheet on mobile, centered on sm+ */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Invoice preview"
            className="
              fixed z-50 bg-white
              /* Mobile: full-width bottom sheet */
              bottom-0 left-0 right-0 rounded-t-2xl
              /* sm+: centered modal */
              sm:inset-auto sm:top-1/2 sm:left-1/2
              sm:-translate-x-1/2 sm:-translate-y-1/2
              sm:rounded-2xl sm:w-full sm:max-w-2xl
              /* Height */
              max-h-[92dvh] sm:max-h-[88vh]
              flex flex-col
              shadow-2xl
            "
          >
            {/* Modal header — sticky */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-base font-semibold text-gray-900">
                Invoice Preview
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="
                    flex items-center gap-1.5 h-9 px-4 rounded-lg
                    bg-black text-white text-sm font-medium
                    hover:bg-gray-900 active:scale-95 transition-all
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"
                    />
                  </svg>
                  Print
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close invoice"
                  className="
                    w-9 h-9 flex items-center justify-center
                    rounded-lg border border-gray-200 text-gray-500
                    hover:bg-gray-50 active:scale-95 transition-all
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable invoice content */}
            <div className="overflow-y-auto flex-1">
              <div ref={printRef} className="p-4 sm:p-8">
                {/* Invoice header */}
                <div className="flex justify-between items-start mb-6 sm:mb-8 gap-4">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">Liqnic</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      liqnic.com
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg sm:text-xl font-bold">INVOICE</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      #{order.display_id}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Bill to */}
                <div className="mb-5 sm:mb-6">
                  <p className="text-xs uppercase text-gray-400 mb-1.5 tracking-wide">
                    Bill To
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {shippingAddress?.first_name} {shippingAddress?.last_name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {order.email}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {shippingAddress?.address_1}
                    {shippingAddress?.address_2
                      ? `, ${shippingAddress.address_2}`
                      : ""}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {[
                      shippingAddress?.city,
                      shippingAddress?.province,
                      shippingAddress?.postal_code,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {shippingAddress?.country_code?.toUpperCase()}
                  </p>
                </div>

                {/* ── Items ─────────────────────────────────────────────────
                    Mobile: 3 columns (Item, Qty, Total) — drop Unit Price
                    Desktop: 4 columns including Unit Price
                    Unit price is a nice-to-have but breaks layout on phones
                ─────────────────────────────────────────────────────────── */}
                <div className="mb-5 sm:mb-6 overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm min-w-[280px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-2.5 px-2 sm:px-3 font-medium text-gray-600">
                          Item
                        </th>
                        <th className="text-center py-2.5 px-2 sm:px-3 font-medium text-gray-600 w-10">
                          Qty
                        </th>
                        {/* Unit price hidden on mobile */}
                        <th className="hidden sm:table-cell text-right py-2.5 px-3 font-medium text-gray-600">
                          Unit Price
                        </th>
                        <th className="text-right py-2.5 px-2 sm:px-3 font-medium text-gray-600">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2.5 px-2 sm:px-3">
                            <p className="font-medium text-gray-900 leading-snug">
                              {item.title}
                            </p>
                            {item.variant_title && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                {item.variant_title}
                              </p>
                            )}
                          </td>
                          <td className="py-2.5 px-2 sm:px-3 text-center text-gray-600">
                            {item.quantity}
                          </td>
                          <td className="hidden sm:table-cell py-2.5 px-3 text-right text-gray-600">
                            {format(item.unit_price)}
                          </td>
                          <td className="py-2.5 px-2 sm:px-3 text-right font-medium text-gray-900">
                            {format(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Totals ─────────────────────────────────────────────────
                    Full width on mobile instead of fixed w-64 which overflowed
                ─────────────────────────────────────────────────────────── */}
                <div className="flex justify-end">
                  <table className="w-full sm:w-72 text-xs sm:text-sm">
                    <tbody>
                      <tr>
                        <td className="py-1.5 text-gray-500">
                          Subtotal (excl. {taxName})
                        </td>
                        <td className="py-1.5 text-right font-medium">
                          {format(order?.subtotal)}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-gray-500">
                          {taxName} ({taxRate}%)
                        </td>
                        <td className="py-1.5 text-right font-medium">
                          {format(
                            order.tax_total && order.tax_total > 0
                              ? order.tax_total
                              : Math.round(
                                  (order.subtotal ?? 0) -
                                    (order.subtotal ?? 0) / (1 + taxRate / 100)
                                )
                          )}
                        </td>
                      </tr>
                      {(order.shipping_total ?? 0) > 0 && (
                        <tr>
                          <td className="py-1.5 text-gray-500">Shipping</td>
                          <td className="py-1.5 text-right font-medium">
                            {format(order.shipping_total ?? 0)}
                          </td>
                        </tr>
                      )}
                      {(order.discount_total ?? 0) > 0 && (
                        <tr>
                          <td className="py-1.5 text-green-600">Discount</td>
                          <td className="py-1.5 text-right font-medium text-green-600">
                            − {format(order.discount_total ?? 0)}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="pt-3 pb-1 font-bold text-sm sm:text-base border-t-2 border-gray-900">
                          Total (incl. {taxName})
                        </td>
                        <td className="pt-3 pb-1 text-right font-bold text-sm sm:text-base border-t-2 border-gray-900">
                          {format(order.total ?? 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="mt-8 sm:mt-10 pt-5 border-t border-gray-200 text-center text-xs text-gray-400">
                  <p>Thank you for shopping with Liqnic!</p>
                  <p className="mt-1">
                    For any queries, contact us at liqnichost@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
