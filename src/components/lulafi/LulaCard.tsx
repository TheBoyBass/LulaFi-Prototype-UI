import React from 'react';
import { cn } from '@/lib/utils';

interface LulaCardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export function LulaCard({ children, className, elevated = false }: LulaCardProps) {
  return (
    <div
      className={cn(
        "bg-surface-elevated rounded-lg p-6",
        elevated
          ? "shadow-[var(--shadow-md)]"
          : "shadow-[var(--shadow-sm)]",
        className
      )}
    >
      {children}
    </div>
  );
}
