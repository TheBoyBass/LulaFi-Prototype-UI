import React from 'react';
import { cn } from '@/lib/utils';

interface LulaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export function LulaInput({
  label,
  error,
  helper,
  className,
  ...props
}: LulaInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-text-primary mb-2 text-sm">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3 bg-bg-secondary border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all duration-150",
          error ? "border-destructive" : "border-border-primary",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-destructive text-sm mt-2">{error}</p>
      )}
      {helper && !error && (
        <p className="text-text-muted text-sm mt-2">{helper}</p>
      )}
    </div>
  );
}
