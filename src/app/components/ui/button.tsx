import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg transition-all [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        /* Primary — bg-primary (#3F51B5) */
        default:
          "bg-primary text-primary-foreground hover:brightness-95 active:brightness-75 disabled:bg-primary/25 disabled:text-primary/45",
        /* Secondary — bg-secondary (#11386B) */
        secondary:
          "bg-secondary text-secondary-foreground hover:brightness-95 active:brightness-75 disabled:bg-secondary/25 disabled:text-secondary/45",
        /* Neutral — bg-neutral (#6B6B6B) */
        neutral:
          "bg-neutral text-neutral-foreground hover:brightness-90 active:brightness-70 disabled:bg-neutral/25 disabled:text-neutral/45",
        /* Outline — transparent bg, border */
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted/30 active:bg-muted/50 disabled:border-border/40 disabled:text-muted-foreground/50 disabled:bg-transparent",
        /* Destructive / Error — bg-destructive (#D93428) */
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-95 active:brightness-75 disabled:bg-destructive/25 disabled:text-destructive/45",
        /* Success — bg-success (#008037) */
        success:
          "bg-success text-success-foreground hover:brightness-95 active:brightness-75 disabled:bg-success/25 disabled:text-success/45",
        /* Warning — bg-warning (#171F4B) */
        warning:
          "bg-warning text-warning-foreground hover:brightness-95 active:brightness-75 disabled:bg-warning/25 disabled:text-warning/45",
        /* Ghost — no background */
        ghost:
          "hover:bg-accent/10 hover:text-accent-foreground",
        /* Link — text only */
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[52px] px-10 py-3",
        sm: "h-9 px-4 py-2 gap-2",
        lg: "h-14 px-12 py-4",
        icon: "size-[52px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
