import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/**
 * @typedef {React.ComponentProps<typeof DayPicker>} CalendarProps
 * @description Props for the Calendar component, extending all props from `react-day-picker`'s `DayPicker`.
 */
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * @component Calendar
 * @description A customizable calendar component built on top of `react-day-picker`.
 * It provides month navigation, displays days, and supports selection, with extensive styling options
 * for various parts of the calendar (months, days, captions, etc.).
 * @param {CalendarProps} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply to the main calendar container.
 * @param {object} [props.classNames] - Custom CSS class names to apply to specific elements within the calendar.
 * @param {boolean} [props.showOutsideDays=true] - Whether to display days outside the current month.
 * @returns {JSX.Element} A React functional component.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays} // Controls visibility of days outside the current month
      className={cn("p-3", className)} // Applies padding and any additional classes to the calendar wrapper
      classNames={{ // Extensive custom class names for various parts of the DayPicker component
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0", // Styles for the months container (responsive layout)
        month: "space-y-4", // Styles for a single month container
        caption: "flex justify-center pt-1 relative items-center", // Styles for the caption area (month/year display)
        caption_label: "text-sm font-medium", // Styles for the month/year label
        nav: "space-x-1 flex items-center", // Styles for the navigation buttons container
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" // Styles for navigation buttons (previous/next month)
        ),
        nav_button_previous: "absolute left-1", // Positions the previous month button
        nav_button_next: "absolute right-1", // Positions the next month button
        table: "w-full border-collapse space-y-1", // Styles for the calendar grid table
        head_row: "flex", // Styles for the header row (weekdays)
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]", // Styles for individual weekday cells
        row: "flex w-full mt-2", // Styles for a week row
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // Styles for individual day cells, including selection, range, and focus states
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100" // Base styles for day buttons
        ),
        day_range_end: "day-range-end", // Class for the end day of a selected range
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", // Styles for selected days
        day_today: "bg-accent text-accent-foreground", // Styles for the current day
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30", // Styles for days outside the current month
        day_disabled: "text-muted-foreground opacity-50", // Styles for disabled days
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground", // Styles for days in the middle of a selected range
        day_hidden: "invisible", // Hides specific days
        ...classNames,
      }}
      components={{ // Custom components for DayPicker elements
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />, // Custom icon for previous month button
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />, // Custom icon for next month button
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar"; // Sets display name for React DevTools

export { Calendar };
