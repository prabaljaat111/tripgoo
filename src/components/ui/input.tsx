import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        search: "border-transparent bg-muted/50 focus-visible:bg-background focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/20",
        hero: "border-white/30 bg-white/10 text-white placeholder:text-white/60 focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/30 backdrop-blur-sm",
        glass: "border-white/20 bg-white/80 backdrop-blur-xl focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/20",
      },
      inputSize: {
        default: "h-10",
        sm: "h-9",
        lg: "h-12 text-base",
        xl: "h-14 text-lg px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
