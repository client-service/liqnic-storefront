"use client"

import { toast } from "react-toastify"

interface AgeVerificationModalProps {
  isOpen: boolean
  onVerificationComplete: () => void
}

// ── Reusable toast config ──────────────────────────────────────────────────
const toastBaseStyle = {
  background: "#FFF9F9",
  border: "none",
  borderRadius: "10px",
  padding: "16px 20px", // tighter padding on mobile
  boxShadow: "0 4px 10px 0 rgba(0,0,0,0.15)",
}

const toastClassName =
  "!bg-[#FFF9F9] !shadow-[0_4px_10px_0_rgba(0,0,0,0.15)] !border-0 !rounded-[10px]"

function ToastContent({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[#CE0000] text-sm sm:text-base font-bold leading-snug font-manrope">
        {title}
      </p>
      <p className="text-[#606060] text-xs sm:text-sm font-medium leading-snug font-manrope">
        {message}
      </p>
    </div>
  )
}

const showToast = (title: string, message: string, duration: number) => {
  toast.error(<ToastContent title={title} message={message} />, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: toastClassName,
    style: toastBaseStyle,
  })
}

// ── Age calculation ────────────────────────────────────────────────────────
const calculateAge = (birthDate: string): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

// ── Component ──────────────────────────────────────────────────────────────
import { useState } from "react"

export default function AgeVerificationModal({
  isOpen,
  onVerificationComplete,
}: AgeVerificationModalProps) {
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!dateOfBirth || !isTermsAccepted) {
      showToast(
        "Confirmation Required",
        "Please confirm you are 18+ to continue.",
        5000
      )
      return
    }

    if (calculateAge(dateOfBirth) < 18) {
      showToast(
        "Access Denied",
        "This website is only available to users 18+.",
        8000
      )
      setDateOfBirth("")
      setIsTermsAccepted(false)
      return
    }

    localStorage.setItem("ageVerified", "true")
    localStorage.setItem("verificationDate", new Date().toISOString())
    onVerificationComplete()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/*
        Mobile: sheet slides up from bottom (items-end + rounded top corners)
        Tablet+: centered modal (items-center + all corners rounded)
        This is the standard mobile pattern — bottom sheet feels native on phones
      */}
      <div
        className="
          bg-white w-full
          rounded-t-[20px] sm:rounded-[10px]
          sm:max-w-[540px]
          /* Prevent overflow on small phones — scroll inside if needed */
          max-h-[92dvh] sm:max-h-[90vh]
          overflow-y-auto
          /* Tighter padding on mobile, more generous on desktop */
          px-5 pt-6 pb-8
          sm:px-8 sm:py-10
          lg:px-[50px] lg:py-[50px]
        "
      >
        {/* Drag handle — visual cue that this is a bottom sheet on mobile */}
        <div className="flex justify-center mb-5 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1 mb-6 sm:mb-8">
          <h1 className="text-[#C5A163] text-2xl sm:text-[28px] font-bold leading-tight font-manrope">
            Verify your age
          </h1>
          <p className="text-[#606060] text-sm sm:text-base font-medium leading-relaxed font-manrope mt-1">
            You must be 18+ to enter this website. Please confirm your age.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
          {/* Date of Birth */}
          <div className="flex flex-col gap-1.5">
            <label className="text-black text-sm sm:text-base font-medium font-manrope">
              Date of birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              // max prevents selecting future dates
              max={new Date().toISOString().split("T")[0]}
              className="
                w-full h-12 sm:h-[54px]
                px-4 rounded-[5px]
                bg-[#F4F4F4] text-[#606060]
                text-sm sm:text-base font-manrope
                focus:outline-none focus:ring-2 focus:ring-[#C5A163] focus:bg-white
                transition-colors
                /* iOS date input text color fix */
                [color-scheme:light]
              "
            />
          </div>

          {/* Terms Checkbox — full row is tappable via the label */}
          <label
            htmlFor="terms"
            className="flex items-start gap-3 cursor-pointer"
          >
            {/*
              Visually 20px but wrapped in a 44px touch area via the label.
              The label itself is the tap target — tapping anywhere on the
              text also toggles the checkbox.
            */}
            <div className="flex items-center justify-center mt-0.5 flex-shrink-0">
              <input
                type="checkbox"
                id="terms"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="
                  w-5 h-5 rounded-[4px]
                  border border-[#EDEDED] bg-[#F6F6F6]
                  checked:bg-[#C5A163] checked:border-[#C5A163]
                  focus:ring-2 focus:ring-[#C5A163]
                  transition-colors cursor-pointer
                "
              />
            </div>
            <span className="text-[#606060] text-sm sm:text-base font-medium leading-relaxed font-manrope">
              I confirm I am 18+ and accept the terms for responsible
              consumption of alcohol and nicotine products.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full h-12 sm:h-[54px]
              rounded-[5px] bg-[#C5A163] hover:bg-[#B3935A]
              active:scale-[0.98]
              transition-all
              flex items-center justify-center
              mt-1
            "
          >
            <span className="text-white text-base sm:text-lg font-semibold tracking-tight font-manrope">
              Enter website
            </span>
          </button>

          <p className="text-[#AFAFAF] text-center text-xs sm:text-sm font-normal font-manrope">
            We promote responsible consumption.
          </p>
        </form>
      </div>
    </div>
  )
}
