import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 font-light",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-foreground text-background hover:bg-foreground/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        white:
          "bg-background hover:bg-accent text-foreground border border-muted",
      },
      size: {
        default:
          "text-xs xs:text-sm lg:text-base h-8 xs:h-9 md:h-10 px-4 py-2 lg:h-12",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 lg:text-lg lg:h-13",
        icon: "h-fit w-fit p-1",
        auto: "text-xs xs:text-sm lg:text-base h-auto min-h-9 xs:min-h-9 md:min-h-10 px-4 py-2",
      },
      buttonStyle: {
        default: "",
        underlined:
          "border border-background border-t-0 border-l-0 border-r-0 border-b-1 rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      buttonStyle: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, buttonStyle, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, buttonStyle, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
