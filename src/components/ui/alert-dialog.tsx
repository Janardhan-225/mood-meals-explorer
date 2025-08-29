import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/**
 * @component AlertDialog
 * @description A controlled component that manages the open/closed state of an alert dialog.
 * It wraps `AlertDialogPrimitive.Root` from Radix UI.
 * Inherits all props from `AlertDialogPrimitive.Root`.
 */
const AlertDialog = AlertDialogPrimitive.Root

/**
 * @component AlertDialogTrigger
 * @description The button that opens the `AlertDialog` when clicked.
 * It wraps `AlertDialogPrimitive.Trigger` from Radix UI.
 * Inherits all props from `AlertDialogPrimitive.Trigger`.
 */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

/**
 * @component AlertDialogPortal
 * @description A portal that renders the alert dialog content outside of the DOM hierarchy of its parent component.
 * It wraps `AlertDialogPrimitive.Portal` from Radix UI.
 * This is useful for ensuring the dialog renders above all other content.
 * Inherits all props from `AlertDialogPrimitive.Portal`.
 */
const AlertDialogPortal = AlertDialogPrimitive.Portal

/**
 * @component AlertDialogOverlay
 * @description An overlay that darkens the background and prevents interaction with the rest of the page
 * when the `AlertDialog` is open. It handles entry and exit animations.
 * It wraps `AlertDialogPrimitive.Overlay` from Radix UI.
 * Inherits all props from `AlertDialogPrimitive.Overlay`.
 */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", // Styling for a full-screen, semi-transparent overlay with fade animations
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

/**
 * @component AlertDialogContent
 * @description The main container for the `AlertDialog`'s content, including title, description, and actions.
 * It is positioned centrally, handles various entry and exit animations, and is rendered via a `AlertDialogPortal`.
 * It wraps `AlertDialogPrimitive.Content` from Radix UI.
 * Inherits all props from `AlertDialogPrimitive.Content`.
 */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal> {/* Renders content in a portal to ensure it's on top */}
    <AlertDialogOverlay /> {/* Renders the overlay behind the dialog content */}
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", // Centered fixed positioning with various entry/exit animations and responsive styling
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

/**
 * @component AlertDialogHeader
 * @description A component to semantically group the `AlertDialogTitle` and `AlertDialogDescription`.
 * It applies default styling for spacing and text alignment.
 * Inherits all standard HTML div element props.
 */
const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left", // Vertical stacking with spacing and responsive text alignment
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

/**
 * @component AlertDialogFooter
 * @description A component to semantically group action buttons within the `AlertDialog`.
 * It applies default styling for button alignment and spacing, especially responsive layouts.
 * Inherits all standard HTML div element props.
 */
const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", // Responsive layout for buttons (stacked on mobile, row on desktop, right-aligned)
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

/**
 * @component AlertDialogTitle
 * @description The title of the alert dialog.
 * It wraps `AlertDialogPrimitive.Title` and applies default font styling.
 * Inherits all props from `AlertDialogPrimitive.Title`.
 */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)} // Styling for a prominent title
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

/**
 * @component AlertDialogDescription
 * @description The descriptive text providing more context for the alert dialog.
 * It wraps `AlertDialogPrimitive.Description` and applies default text styling.
 * Inherits all props from `AlertDialogPrimitive.Description`.
 */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Styling for muted, smaller descriptive text
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

/**
 * @component AlertDialogAction
 * @description A button that represents the primary action of the `AlertDialog`.
 * It typically confirms the user's intention or proceeds with an action.
 * It wraps `AlertDialogPrimitive.Action` and applies default button styling.
 * Inherits all props from `AlertDialogPrimitive.Action`.
 */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)} // Applies default button variants and any additional classes
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

/**
 * @component AlertDialogCancel
 * @description A button that allows the user to dismiss the `AlertDialog` without performing any action.
 * It wraps `AlertDialogPrimitive.Cancel` and applies default outline button styling with responsive margins.
 * Inherits all props from `AlertDialogPrimitive.Cancel`.
 */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }), // Applies outline button variant
      "mt-2 sm:mt-0", // Responsive top margin for stacking on small screens
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
