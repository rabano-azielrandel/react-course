import { cn } from "@/lib/utils";

type InputProps = {
  label?: string;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        className={cn(
          "w-full px-3 py-2 rounded-xl border outline-none",
          "focus:ring-2 focus:ring-black/20",
          error ? "border-red-500" : "border-gray-300",
          className,
        )}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
