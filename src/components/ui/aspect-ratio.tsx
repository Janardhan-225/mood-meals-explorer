import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

/**
 * @component AspectRatio
 * @description A utility component that maintains a consistent aspect ratio for its content.
 * It wraps `AspectRatioPrimitive.Root` from Radix UI, allowing you to define a `ratio` prop
 * (e.g., `16/9`, `4/3`, `1/1`) to control the width-to-height proportion of its children.
 * Inherits all props from `AspectRatioPrimitive.Root`.
 */
const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
