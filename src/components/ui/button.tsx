import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * @const buttonVariants
 * @description Defines the base and variant styles for the Button component using `cva`.
 * It includes default styling for layout, typography, focus, and disabled states.
 * Variants include `default`, `destructive`, `outline`, `secondary`, `ghost`, and `link`.
 * Sizes include `default`, `sm`, `lg`, and `icon`.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", // Base styles for button: inline flex, center content, rounded, text, focus, disabled, and icon styling
  {
    variants: { // Defines available variants and sizes for the button
      variant: { // The 'variant' prop controls the visual style
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Default primary button style
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Destructive action button style
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Outline button style
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Secondary button style
        ghost: "hover:bg-accent hover:text-accent-foreground", // Ghost button style (minimal styling)
        link: "text-primary underline-offset-4 hover:underline", // Link button style
      },
      size: { // The 'size' prop controls the padding and height
        default: "h-10 px-4 py-2", // Default size
        sm: "h-9 rounded-md px-3", // Small size
        lg: "h-11 rounded-md px-8", // Large size
        icon: "h-10 w-10", // Icon-only button size (square)
      },
    },
    defaultVariants: { // Sets the default variant and size if none are explicitly provided
      variant: "default",
      size: "default",
    },
  }
)

/**
 * @interface ButtonProps
 * @description Props for the Button component.
 * Extends standard HTML `button` attributes and variant/size props from `buttonVariants`.
 * @property {boolean} [asChild] - If true, the component will render its child without a wrapper DOM element.
 * @property {string} [className] - Additional CSS classes to apply to the button.
 * @property {"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"} [variant="default"] - The visual style of the button.
 * @property {"default" | "sm" | "lg" | "icon"} [size="default"] - The size of the button.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * @component Button
 * @description A customizable button component that supports various visual styles and sizes.
 * It can render as a `button` tag or as a child component (using `asChild`).
 * Applies styles defined by `buttonVariants` based on `variant` and `size` props.
 * @param {ButtonProps} props - The props for the component.
 * @returns {JSX.Element} A React functional component.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button" // Determines whether to render as a Slot (passthrough) or a <button> tag
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Combines base, variant, and size styles with any additional classes
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button" // Sets display name for React DevTools

export { Button, buttonVariants }
