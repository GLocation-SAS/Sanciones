import * as React from "react";
import { cn } from "./utils";

export interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Floating label text */
  label?: string;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
  /** Error message */
  error?: string;
  /** Input size variant */
  inputSize?: "default" | "sm";
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      label,
      leftIcon,
      rightIcon,
      error,
      inputSize = "default",
      disabled,
      onFocus,
      onBlur,
      value,
      defaultValue,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(
      !!(value || defaultValue)
    );
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Sync hasValue with controlled value
    React.useEffect(() => {
      if (value !== undefined) {
        setHasValue(value !== "");
      }
    }, [value]);

    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref]
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value !== "");
      onBlur?.(e);
    };

    const isFloating = label && (isFocused || hasValue);
    const hasError = !!error;
    const isSmall = inputSize === "sm";

    /* Border color logic using CSS variables:
       - Error → --destructive
       - Focused → --primary
       - Disabled → --card
       - Default → --border, hover → --foreground */
    const borderColor = hasError
      ? "border-destructive"
      : isFocused
        ? "border-primary"
        : disabled
          ? "border-card"
          : "border-border hover:border-foreground";

    /* Icon color */
    const iconColor = hasError
      ? "text-destructive"
      : disabled
        ? "text-muted"
        : isFocused
          ? "text-muted"
          : "text-muted";

    return (
      <div className={cn("relative w-full", className)}>
        {/* Input wrapper */}
        <div
          className={cn(
            "relative flex items-center gap-3 rounded-lg border bg-transparent px-6 py-3 transition-colors",
            isSmall ? "h-[44px]" : "h-[52px]",
            borderColor,
            disabled && "bg-card cursor-not-allowed"
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Left icon */}
          {leftIcon && (
            <span className={cn("shrink-0 size-6 flex items-center justify-center", iconColor)}>
              {leftIcon}
            </span>
          )}

          {/* Input */}
          <input
            ref={combinedRef}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            placeholder={isFloating ? "" : placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
              "disabled:text-muted disabled:placeholder:text-muted disabled:cursor-not-allowed",
              hasError && "text-destructive"
            )}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)",
            }}
            aria-invalid={hasError || undefined}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <span className={cn("shrink-0 flex items-center gap-1.5", hasError ? "text-destructive" : iconColor)}>
              {rightIcon}
            </span>
          )}
        </div>

        {/* Floating label */}
        {label && (
          <span
            className={cn(
              "absolute left-3 px-1 bg-background transition-all pointer-events-none",
              isFloating
                ? "-top-2.5"
                : isSmall
                  ? "top-[10px]"
                  : "top-[14px]",
              isFloating
                ? hasError
                  ? "text-foreground"
                  : "text-primary"
                : "text-muted-foreground",
              disabled && !isFloating && "text-card",
              disabled && isFloating && "text-card"
            )}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: isFloating ? "var(--text-xs)" : "var(--text-base)",
              fontWeight: "var(--font-weight-normal)",
              lineHeight: isFloating ? "18px" : "28px",
            }}
          >
            {label}
          </span>
        )}

        {/* Error message */}
        {hasError && (
          <p
            className="mt-1.5 text-destructive"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-weight-normal)",
              lineHeight: "18px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
