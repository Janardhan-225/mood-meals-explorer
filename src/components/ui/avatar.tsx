import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * @component Avatar
 * @description A component that displays a user's avatar, often a profile picture.
 * It wraps `AvatarPrimitive.Root` from Radix UI and provides default styling for a circular shape.
 * Inherits all props from `AvatarPrimitive.Root`.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Base styling for a circular avatar container with a fixed size
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * @component AvatarImage
 * @description Displays the actual image within an `Avatar` component.
 * It wraps `AvatarPrimitive.Image` from Radix UI and ensures the image fills its container while maintaining aspect ratio.
 * Inherits all props from `AvatarPrimitive.Image`.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)} // Ensures the image fills the avatar container and maintains aspect ratio
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * @component AvatarFallback
 * @description Displays a fallback UI when the `AvatarImage` fails to load or is not provided.
 * It wraps `AvatarPrimitive.Fallback` from Radix UI and provides default styling for a muted background with centered content.
 * Inherits all props from `AvatarPrimitive.Fallback`.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Styling for a full-size, centered fallback with a muted background
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
