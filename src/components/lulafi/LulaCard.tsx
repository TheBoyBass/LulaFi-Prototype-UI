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
        "bg-bg-secondary rounded-lg p-6",
        elevated
          ? "shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          : "shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {children}
    </div>
  );
}
