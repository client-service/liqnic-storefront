import { deleteLineItem } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"
import { toast } from "react-toastify"

// ─── Toast content components ─────────────────────────────────────────────────

function DeleteSuccessToast({ name }: { name?: string }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="min-w-0 flex-1">
        {name && (
          <p className="text-xs font-semibold text-gray-900 truncate">{name}</p>
        )}
        <p className="text-xs text-gray-500 mt-0.5">Removed from your cart</p>
      </div>
    </div>
  )
}

function DeleteErrorToast({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-start gap-3 min-w-0">
      <svg
        className="shrink-0 mt-0.5 text-rose-500"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.15" />
        <path
          d="M6 6l6 6M12 6l-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-gray-900">
          Couldn't remove item
        </p>
        <p className="text-xs text-gray-500 mt-0.5">Something went wrong.</p>
        <button
          onClick={onRetry}
          className="mt-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 underline underline-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

// ─── Shared toast base options ─────────────────────────────────────────────────

const baseToastStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "12px",
  padding: "12px 14px",
  boxShadow: "0 4px 16px 0 rgba(0,0,0,0.08)",
  minWidth: "260px",
  maxWidth: "340px",
}

const baseToastOpts = {
  position: "top-center" as const,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  closeButton: false,
  style: baseToastStyle,
}

// ─── Component ────────────────────────────────────────────────────────────────

const DeleteButton = ({
  id,
  label,
  children,
  className,
  onOptimisticDelete, // <-- ADDED PROP
}: {
  id: string
  label?: string
  children?: React.ReactNode
  className?: string
  onOptimisticDelete?: () => void // <-- ADDED PROP
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default/propagation to stop any Table Row clicks from interfering
    e.preventDefault()
    e.stopPropagation()
    
    if (isDeleting) return // Prevent double clicks
    
    setIsDeleting(true)

    // Trigger the optimistic UI callback (tells parent to fade)
    if (onOptimisticDelete) {
      onOptimisticDelete()
    }

    try {
      // Optimistic UI: Fire toast BEFORE awaiting the backend
      toast.success(<DeleteSuccessToast name={label} />, {
        ...baseToastOpts,
        autoClose: 3000,
        progressStyle: { background: "#f43f5e" },
      })
      
      await deleteLineItem(id)
      // We do NOT set isDeleting to false here. 
      // The component will naturally unmount when Next.js revalidates the cart.
    } catch {
      // Revert on failure
      setIsDeleting(false)
      toast.error(
        <DeleteErrorToast
          onRetry={() => {
            toast.dismiss()
            handleDelete(e)
          }}
        />,
        {
          ...baseToastOpts,
          autoClose: 6000,
          progressStyle: { background: "#f43f5e" },
        }
      )
    }
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer z-10" // added z-10
        onClick={handleDelete}
        disabled={isDeleting}
        type="button" // explicit type
      >
        {isDeleting ? (
          <Spinner className="animate-spin" />
        ) : (
          <Trash className="text-red-500" />
        )}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton