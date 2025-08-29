import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * @component Accordion
 * @description A basic accordion component that wraps `AccordionPrimitive.Root` from Radix UI.
 * Provides a container for one or more `AccordionItem` components.
 * Inherits all props from `AccordionPrimitive.Root`.
 */
const Accordion = AccordionPrimitive.Root

/**
 * @component AccordionItem
 * @description Represents a single, collapsable item within an `Accordion` component.
 * It wraps `AccordionPrimitive.Item` and applies default bottom border styling.
 * Inherits all props from `AccordionPrimitive.Item`.
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)} // Applies a bottom border and any additional classes
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * @component AccordionTrigger
 * @description The clickable header for an `AccordionItem` that toggles its content.
 * It wraps `AccordionPrimitive.Trigger` within an `AccordionPrimitive.Header`.
 * Includes a `ChevronDown` icon that rotates 180 degrees when the item is open.
 * Inherits all props from `AccordionPrimitive.Trigger`.
 * @property {React.ReactNode} children - The content to be rendered inside the trigger (e.g., the title of the accordion item).
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex"> {/* Ensures the trigger spans the full width */} 
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", // Styling for the trigger, including hover effect and icon rotation
        className
      )}
      {...props}
    >
      {children} {/* Renders the children passed to the trigger */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> {/* Chevron icon, rotates on open */}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * @component AccordionContent
 * @description The collapsible content area for an `AccordionItem`.
 * It wraps `AccordionPrimitive.Content` and applies animations for expanding and collapsing.
 * Inherits all props from `AccordionPrimitive.Content`.
 * @property {React.ReactNode} children - The content to be rendered when the accordion item is open.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" // Styling for content, including overflow and animation
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div> {/* Inner div for padding and rendering children */}
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
