import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * @const badgeVariants
 * @description Defines the base and variant styles for the Badge component using `cva`.
 * It includes default styling for inline display, rounded corners, padding, font, and focus states.
 * Variants include `default`, `secondary`, `destructive`, and `outline`.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", // Base styles for the badge, including layout, shape, text, and focus states
  {
    variants: { // Defines available variants for the badge
      variant: { // The 'variant' prop can be 'default', 'secondary', 'destructive', or 'outline'
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80", // Default badge styling: primary background, white text
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", // Secondary badge styling
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80", // Destructive badge styling
        outline: "text-foreground", // Outline badge styling: transparent background, foreground text
      },
    },
    defaultVariants: { // Sets the default variant if none is explicitly provided
      variant: "default",
    },
  }
)

/**
 * @interface BadgeProps
 * @description Props for the Badge component.
 * Extends standard HTML `div` attributes and variant props from `badgeVariants`.
 * @property {string} [className] - Additional CSS classes to apply to the badge container.
 * @property {"default" | "secondary" | "destructive" | "outline"} [variant="default"] - The visual style of the badge.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * @component Badge
 * @description A small, styled component used for displaying short, important pieces of information.
 * It supports various visual styles through its `variant` prop.
 * @param {BadgeProps} props - The props for the component.
 * @returns {JSX.Element} A React functional component.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} /> // Combines base and variant styles with any additional classes
  )
}

export { Badge, badgeVariants }
