"use client";

import React, { useState, useRef, useCallback } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";

interface PasswordInputProps extends InputProps {
  label?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleToggleShowPassword = useCallback(() => {
      setShowPassword((prev) => !prev);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    const disabled =
      !isFocused ||
      props.value === "" ||
      props.value === undefined ||
      props.disabled;

    return (
      <div className="relative">
        <FloatingLabelInput
          type={showPassword ? "text" : "password"}
          className={cn("hide-password-toggle pr-10", className)}
          label={label}
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                node;
            }
          }}
          onFocus={() => setIsFocused(true)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent disabled:hidden"
          onClick={handleToggleShowPassword}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
