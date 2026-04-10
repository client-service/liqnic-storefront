"use client"

import { ArrowRightMini, XMark } from "@medusajs/icons"
import { clx, useToggleState } from "@medusajs/ui"
import { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import { LuMenu, LuUser } from "react-icons/lu"
import type { MenuItem } from "@lib/menu"

export default function SideMenu({
  regions,
  menuItems,
}: {
  regions: HttpTypes.StoreRegion[] | null
  menuItems: MenuItem[]
}) {
  const toggleState = useToggleState()
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Lock body scroll when open
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

  const close = () => {
    setOpen(false)
    setOpenDropdown(null)
  }

  return (
    <>
      {/* ── Hamburger trigger ──────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        data-testid="nav-menu-button"
        aria-label="Open menu"
        className="
          w-10 h-10 flex items-center justify-center
          rounded-lg hover:bg-gray-100
          transition-colors
        "
      >
        <LuMenu size={20} />
      </button>

      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      <div
        className={clx(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Drawer panel ──────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={clx(
          "fixed top-0 right-0 h-full z-50",
          "w-[85vw] sm:w-80",
          "bg-white flex flex-col",
          "shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-base font-semibold text-gray-900">Menu</span>
          <button
            onClick={close}
            data-testid="close-menu-button"
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMark />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col gap-1">
            {/* ── My Account — shown here on mobile since it's hidden in Navbar ── */}
            <li>
              <LocalizedClientLink
                href="/account"
                onClick={close}
                className="
                  flex items-center gap-3 px-3 py-3 rounded-lg
                  text-sm font-medium text-gray-700
                  hover:bg-gray-50 hover:text-gray-900
                  transition-colors min-h-[44px]
                "
              >
                <LuUser size={17} className="text-gray-400 flex-shrink-0" />
                My Account
              </LocalizedClientLink>
            </li>

            <li className="my-1">
              <div className="h-px bg-gray-100" />
            </li>

            {menuItems.map((item) => (
              <li key={item.label} className="w-full">
                {item.href ? (
                  <LocalizedClientLink
                    href={item.href}
                    onClick={close}
                    className="
                      flex items-center px-3 py-3 rounded-lg
                      text-sm font-medium text-gray-700
                      hover:bg-gray-50 hover:text-gray-900
                      transition-colors min-h-[44px]
                    "
                  >
                    {item.label}
                  </LocalizedClientLink>
                ) : item.dropdown && item.children ? (
                  <div className="flex flex-col">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      className="
                        flex justify-between items-center
                        px-3 py-3 rounded-lg w-full text-left
                        text-sm font-medium text-gray-700
                        hover:bg-gray-50 transition-colors min-h-[44px]
                      "
                    >
                      <span>{item.label}</span>
                      <ArrowRightMini
                        className={clx(
                          "transition-transform duration-200 text-gray-400",
                          openDropdown === item.label ? "rotate-90" : ""
                        )}
                      />
                    </button>

                    {/* Dropdown children */}
                    <div
                      className={clx(
                        "overflow-hidden transition-all duration-200",
                        openDropdown === item.label
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <ul className="ml-4 flex flex-col gap-0.5 pb-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <LocalizedClientLink
                              href={child.href!}
                              onClick={close}
                              className="
                                flex items-center px-3 py-2.5 rounded-lg
                                text-sm text-gray-600
                                hover:bg-gray-50 hover:text-gray-900
                                transition-colors min-h-[44px]
                              "
                            >
                              {child.label}
                            </LocalizedClientLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer — country select + copyright */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col gap-3">
          {regions && (
            <div
              className="flex justify-between items-center"
              onMouseEnter={toggleState.open}
              onMouseLeave={toggleState.close}
            >
              <CountrySelect toggleState={toggleState} regions={regions} />
              <ArrowRightMini
                className={clx(
                  "transition-transform duration-150 text-gray-400",
                  toggleState.state ? "-rotate-90" : ""
                )}
              />
            </div>
          )}
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Liqnic. All rights reserved.
          </p>
        </div>
      </div>
    </>
  )
}
