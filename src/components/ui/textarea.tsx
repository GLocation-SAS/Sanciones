import * as React from "react";

import { cn } from "./utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "resize-none border-border placeholder:text-muted-foreground focus-visible:border-primary hover:border-foreground aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-6 py-3 text-foreground transition-colors outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:bg-card disabled:border-card disabled:text-muted",
        className
      )}
      style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: "var(--font-weight-medium)" }}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };