import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const cn = (...inputs: any[]) => twMerge(clsx(inputs));

type CardSize = "sm" | "md" | "lg" | "xl" | "full";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  size?: CardSize;
};

const sizeStyles: Record<CardSize, string> = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-none",
};

export function Card({ children, className, size = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "w-full p-4 rounded-2xl shadow-md bg-white",
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
