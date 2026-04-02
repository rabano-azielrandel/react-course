import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type CardSize = "sm" | "md" | "lg" | "xl" | "full";

type CardProps = PropsWithChildren<{
  className?: string;
  size?: CardSize;
}>;

type CardTitleProps = {
  title: string;
  className?: string;
};

const sizeStyles: Record<CardSize, string> = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-none",
};

// 🔹 Main Card
export function Card({ children, className, size = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl shadow-md bg-white overflow-hidden",
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </div>
  );
}

// 🔹 Header (container)
export function CardHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("p-4 border-b", className)}>{children}</div>;
}

// 🔹 Title (text only)
export function CardTitle({ title, className }: CardTitleProps) {
  return <p className={cn("font-bold text-lg", className)}>{title}</p>;
}

// 🔹 Content (body)
export function CardContent({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

// 🔹 Footer (actions / bottom area)
export function CardFooter({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("p-4 border-t", className)}>{children}</div>;
}
