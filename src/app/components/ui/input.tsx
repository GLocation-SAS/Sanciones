import * as React from "react";

import { cn } from "./utils";

export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  inputSize?: "default" | "sm";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          "flex w-full min-w-0 rounded-lg border border-border bg-transparent px-6 py-3 text-foreground transition-colors outline-none",
          inputSize === "sm" ? "h-[44px]" : "h-[52px]",
          "placeholder:text-muted-foreground",
          "hover:border-foreground",
          "focus-visible:border-primary focus-visible:ring-0",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-card disabled:border-card disabled:text-muted disabled:placeholder:text-muted",
          "aria-invalid:border-destructive aria-invalid:text-destructive",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium",
          "selection:bg-primary selection:text-primary-foreground",
          className,
        )}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-base)",
          fontWeight: "var(--font-weight-medium)",
        }}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
