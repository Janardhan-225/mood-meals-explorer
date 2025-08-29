import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * @component Breadcrumb
 * @description The main container for a breadcrumb navigation. It semantically represents a navigation path.
 * It renders as a `nav` element and provides ARIA accessibility attributes.
 * Inherits all standard HTML `nav` element props.
 * @property {React.ReactNode} [separator] - An optional custom separator to use between breadcrumb items.
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />) // Renders a <nav> element with ARIA label
Breadcrumb.displayName = "Breadcrumb"

/**
 * @component BreadcrumbList
 * @description An ordered list that contains `BreadcrumbItem` components.
 * It applies default styling for layout, word wrapping, and spacing between items.
 * Inherits all standard HTML `ol` element props.
 */
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", // Styling for flex layout, word breaks, text size, and color
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

/**
 * @component BreadcrumbItem
 * @description A list item within a `BreadcrumbList`.
 * It typically contains a `BreadcrumbLink`, `BreadcrumbPage`, and optionally a `BreadcrumbSeparator`.
 * It applies default styling for inline display and item spacing.
 * Inherits all standard HTML `li` element props.
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)} // Styling for inline display and gap between elements
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

/**
 * @component BreadcrumbLink
 * @description A clickable link within a `BreadcrumbItem`.
 * It can render as an `a` tag or as a child component (using `asChild`).
 * Applies hover effects to indicate interactivity.
 * Inherits all standard HTML `a` element props.
 * @property {boolean} [asChild] - If true, the component will render its child without a wrapper DOM element.
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a" // Determines whether to render as a Slot (passthrough) or an <a> tag

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)} // Styling for hover effect on text color
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

/**
 * @component BreadcrumbPage
 * @description Represents the current page in the breadcrumb navigation.
 * It renders as a `span` element and indicates that it's not a clickable link with ARIA attributes.
 * Applies default styling for text color and font weight.
 * Inherits all standard HTML `span` element props.
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link" // ARIA role to indicate it's a link-like element, but... 
    aria-disabled="true" // ...it is disabled for interaction
    aria-current="page" // ARIA attribute to mark the current page in a set of links
    className={cn("font-normal text-foreground", className)} // Styling for normal font weight and foreground text color
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

/**
 * @component BreadcrumbSeparator
 * @description A visual separator between `BreadcrumbLink` or `BreadcrumbPage` components.
 * It renders as an `li` element and defaults to a `ChevronRight` icon if no children are provided.
 * Inherits all standard HTML `li` element props.
 * @property {React.ReactNode} [children] - Custom content to use as the separator (e.g., a different icon or text).
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation" // ARIA role to indicate it's purely decorative
    aria-hidden="true" // Hides the element from assistive technologies
    className={cn("[&>svg]:size-3.5", className)} // Styling to control the size of any SVG child
    {...props}
  >
    {children ?? <ChevronRight />} {/* Renders children or a default ChevronRight icon */}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

/**
 * @component BreadcrumbEllipsis
 * @description Represents a condensed part of the breadcrumb navigation, often indicating hidden items.
 * It renders as a `span` element and displays a `MoreHorizontal` icon.
 * Inherits all standard HTML `span` element props.
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation" // ARIA role to indicate it's purely decorative
    aria-hidden="true" // Hides the element from assistive technologies
    className={cn("flex h-9 w-9 items-center justify-center", className)} // Styling for a centered icon within a fixed-size container
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" /> {/* Horizontal ellipsis icon */}
    <span className="sr-only">More</span> {/* Screen reader only text for accessibility */}
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
