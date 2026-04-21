"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

// /**
//  * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
//  * without having to explicitly pass it as a prop.
//  */
// const LocalizedClientLink = ({
//   children,
//   href,
//   ...props
// }: {
//   children?: React.ReactNode
//   href: string
//   className?: string
//   onClick?: () => void
//   passHref?: true
//   [x: string]: any
// }) => {
//   const { countryCode } = useParams()

//   return (
//     <Link href={`/${countryCode}${href}`} {...props}>
//       {children}
//     </Link>
//   )
// }

// export default LocalizedClientLink


/**
 * We wrap the Next.js Link to inject the countryCode
 * AND disable aggressive prefetching to save VPS CPU.
 */
const LocalizedClientLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link>
>(({ children, href, prefetch = false, ...props }, ref) => {
  const { countryCode } = useParams()

  return (
    <Link 
      href={`/${countryCode}${href}`} 
      ref={ref} 
      prefetch={prefetch} // <-- CRITICAL: Defaults to false now
      {...props}
    >
      {children}
    </Link>
  )
})

LocalizedClientLink.displayName = "LocalizedClientLink"

export default LocalizedClientLink