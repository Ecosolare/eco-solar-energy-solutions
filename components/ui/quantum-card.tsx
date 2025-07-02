import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface QuantumCardProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
  [key: string]: any;
}

export const QuantumCard = forwardRef<HTMLDivElement, QuantumCardProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const Component = asChild ? "div" : "div";
    
    return (
      <Component
        ref={ref}
        className={cn(
          "neuro-card quantum-hover rounded-3xl transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

QuantumCard.displayName = "QuantumCard";
