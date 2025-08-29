import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @component Card
 * @description A flexible container component used to group related content.
 * It provides default styling for a rounded border, background, text color, and shadow.
 * Inherits all standard HTML `div` element props.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm", // Default styling for a card container
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * @component CardHeader
 * @description A sub-component of `Card` used for the header section of a card.
 * It provides default styling for vertical spacing and padding.
 * Inherits all standard HTML `div` element props.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Styling for vertical flex layout with spacing and padding
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * @component CardTitle
 * @description A sub-component of `CardHeader` used for the main title of a card.
 * It renders as an `h3` element and applies default font styling for prominence.
 * Inherits all standard HTML `h3` element props.
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", // Styling for a large, bold title with tight tracking
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * @component CardDescription
 * @description A sub-component of `CardHeader` used for additional descriptive text in a card.
 * It renders as a `p` element and applies default muted text styling.
 * Inherits all standard HTML `p` element props.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Styling for smaller, muted description text
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * @component CardContent
 * @description A sub-component of `Card` used for the main content area of a card.
 * It provides default padding and ensures content starts without top padding if used after a header.
 * Inherits all standard HTML `div` element props.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> // Styling for padding, specifically removing top padding if used directly after header
))
CardContent.displayName = "CardContent"

/**
 * @component CardFooter
 * @description A sub-component of `Card` used for the footer section of a card.
 * It provides default styling for aligning items and padding.
 * Inherits all standard HTML `div` element props.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} // Styling for flex layout, center alignment, and padding
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
