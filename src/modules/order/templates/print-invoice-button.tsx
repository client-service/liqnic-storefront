"use client"

import { HttpTypes } from "@medusajs/types"
import { useRef, useState } from "react"
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
            @media print {
              body { padding: 20px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `)

    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  const shippingAddress = order.shipping_address

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 px-4 border border-gray-300 text-sm font-medium rounded hover:bg-gray-50 transition-colors text-center"
      >
        🖨️ Print Invoice
      </button>

      {/* Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 mt-8">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Invoice Preview</h2>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
                >
                  Print
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-sm rounded hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Invoice Content */}
            <div ref={printRef} className="p-8">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-2xl font-bold">Liqnic </p>
                  <p className="text-sm text-gray-500 mt-1">liqnic.com</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">INVOICE</p>
                  <p className="text-sm text-gray-500">#{order.display_id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Bill To */}
              <div className="mb-6">
                <p className="text-xs uppercase text-gray-400 mb-2 tracking-wide">
                  Bill To
                </p>
                <p className="font-medium">
                  {shippingAddress?.first_name} {shippingAddress?.last_name}
                </p>
                <p className="text-sm text-gray-600">{order.email}</p>
                <p className="text-sm text-gray-600">
                  {shippingAddress?.address_1}
                  {shippingAddress?.address_2
                    ? `, ${shippingAddress.address_2}`
                    : ""}
                </p>
                <p className="text-sm text-gray-600">
                  {shippingAddress?.city}
                  {shippingAddress?.province
                    ? `, ${shippingAddress.province}`
                    : ""}
                  {shippingAddress?.postal_code
                    ? ` ${shippingAddress.postal_code}`
                    : ""}
                </p>
                <p className="text-sm text-gray-600">
                  {shippingAddress?.country_code?.toUpperCase()}
                </p>
              </div>

              {/* Items Table */}
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-3 font-medium text-gray-600 border-b border-gray-200">
                      Item
                    </th>
                    <th className="text-center py-3 px-3 font-medium text-gray-600 border-b border-gray-200">
                      Qty
                    </th>
                    <th className="text-right py-3 px-3 font-medium text-gray-600 border-b border-gray-200">
                      Unit Price
                    </th>
                    <th className="text-right py-3 px-3 font-medium text-gray-600 border-b border-gray-200">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-3 px-3">
                        <p className="font-medium">{item.title}</p>
                        {item.variant_title && (
                          <p className="text-xs text-gray-400">
                            {item.variant_title}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">{item.quantity}</td>
                      <td className="py-3 px-3 text-right">
                        {format(item.unit_price)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {format(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end">
                <table className="w-64 text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 text-gray-500">
                        Subtotal (excl. {taxName})
                      </td>
                      <td className="py-1 text-right font-medium">
                        {format(order?.subtotal)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 text-gray-500">
                        {taxName} ({taxRate}%)
                      </td>
                      <td className="py-1 text-right font-medium">
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
                        <td className="py-1 text-gray-500">Shipping</td>
                        <td className="py-1 text-right font-medium">
                          {format(order.shipping_total ?? 0)}
                        </td>
                      </tr>
                    )}
                    {(order.discount_total ?? 0) > 0 && (
                      <tr>
                        <td className="py-1 text-green-600">Discount</td>
                        <td className="py-1 text-right font-medium text-green-600">
                          - {format(order.discount_total ?? 0)}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-gray-900">
                      <td className="pt-3 pb-1 font-bold text-base">
                        Total (incl. {taxName})
                      </td>
                      <td className="pt-3 pb-1 text-right font-bold text-base">
                        {format(order.total ?? 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
                <p>Thank you for shopping with Liqnic Store!</p>
                <p className="mt-1">
                  For any queries, contact us at support@liqnic.com
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
