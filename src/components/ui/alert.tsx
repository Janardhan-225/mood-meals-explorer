import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * @const alertVariants
 * @description Defines the base and variant styles for the Alert component using `cva`.
 * It includes default styling for the container and specific styles for different alert variants (e.g., default, destructive).
 */
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", // Base styles for the alert container, including padding, border, and icon positioning
  {
    variants: { // Defines available variants for the alert
      variant: { // The 'variant' prop can be 'default' or 'destructive'
        default: "bg-background text-foreground", // Default alert styling: background and text color
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive", // Destructive alert styling: border, text, and icon colors
      },
    },
    defaultVariants: { // Sets the default variant if none is explicitly provided
      variant: "default",
    },
  }
)

/**
 * @component Alert
 * @description A flexible alert component that can display messages with different visual styles (variants).
 * It wraps a `div` element and applies styles based on its `variant` and `className` props.
 * Inherits all standard HTML `div` element props and `VariantProps<typeof alertVariants>`.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply to the alert container.
 * @param {"default" | "destructive"} [props.variant="default"] - The visual style of the alert.
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert" // ARIA role for accessibility
    className={cn(alertVariants({ variant }), className)} // Combines base and variant styles with any additional classes
    {...props}
  />
))
Alert.displayName = "Alert"

/**
 * @component AlertTitle
 * @description Displays the title of an `Alert` component.
 * It wraps an `h5` element and applies default font styling for a prominent title.
 * Inherits all standard HTML `h5` element props.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply to the title.
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)} // Styling for the alert title
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/**
 * @component AlertDescription
 * @description Displays the descriptive content of an `Alert` component.
 * It wraps a `div` element and applies default text styling.
 * Inherits all standard HTML `div` element props.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply to the description.
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)} // Styling for the alert description
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
