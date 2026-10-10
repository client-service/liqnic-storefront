"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const SHOP_LINK = "/shop?query=sun%20pearl"

export default function TereaPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("tereaPopupShown")) return

    let timer: ReturnType<typeof setTimeout>

    // Wait until the age popup has been answered, then show after 1s
    const check = setInterval(() => {
      if (sessionStorage.getItem("ageVerified") !== "true") return

      clearInterval(check)
      timer = setTimeout(() => {
        setOpen(true)
        sessionStorage.setItem("tereaPopupShown", "true")
      }, 1000)
    }, 300)

    return () => {
      clearInterval(check)
      clearTimeout(timer)
    }
  }, [])

  if (!open) return null

  return (
    <div
      className="terea-backdrop fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <style>{`
        @keyframes terea-pop {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes terea-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes terea-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes terea-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        @keyframes terea-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
        .terea-backdrop { animation: terea-fade 0.3s ease-out; }
        .terea-card { animation: terea-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .terea-float { animation: terea-float 4s ease-in-out infinite; }
        .terea-glow { animation: terea-glow 3s ease-in-out infinite; }
        .terea-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
          animation: terea-shine 2.5s ease-in-out infinite;
        }
      `}</style>

      <div
        className="terea-card relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-[#2B1A12] via-[#3D2216] to-[#1A100B] text-white shadow-[0_20px_60px_rgba(232,105,42,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg text-white/80 transition hover:bg-white/20 hover:text-white"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden">
          <div className="terea-glow absolute h-56 w-56 rounded-full bg-[#E8692A]/50 blur-3xl" />
          <div className="relative h-full w-full">
            <Image
              src="/images/sunpearl.png"
              alt="TEREA Sun Pearl"
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2B1A12] to-transparent" />

          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#E8692A] px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            New arrival
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-3 px-6 pb-7 pt-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4A26B]">
            ☀ Just landed
          </p>
          <h2 className="text-3xl font-extrabold leading-tight">
            TEREA{" "}
            <span className="bg-gradient-to-r from-[#F4A26B] via-[#E8692A] to-[#C5A163] bg-clip-text text-transparent">
              Sun Pearl
            </span>
          </h2>
          <p className="text-sm text-white/70">
            Smooth, refined and warm as a sunset. <br />
            The newest TEREA flavour for IQOS ILUMA is finally here !!
          </p>

          {/* Pricing */}
          <div className="mt-1 grid w-full grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-white/60">Packet · 20 sticks</p>
              <p className="text-lg font-bold">NPR 400</p>
            </div>
            <div className="relative rounded-xl border border-[#E8692A]/60 bg-[#E8692A]/10 p-3">
              <span className="absolute -top-2 right-2 rounded-full bg-[#C5A163] px-2 text-[10px] font-bold uppercase text-black">
                Best value
              </span>
              <p className="text-xs text-white/60">Box · 200 sticks</p>
              <p className="text-lg font-bold">NPR 4,000</p>
            </div>
          </div>

          <Link
            href={SHOP_LINK}
            onClick={() => setOpen(false)}
            className="terea-shine relative mt-2 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#E8692A] to-[#C5A163] py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Try Sun Pearl Now →
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-xs text-white/50 transition hover:text-white/80"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
