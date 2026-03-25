import React from 'react';
import { cn } from '@/lib/utils';

interface LulaBadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
}

const variantStyles = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-destructive/10 text-destructive border-destructive/20',
  info: 'bg-info/10 text-info border-info/20',
  neutral: 'bg-muted text-text-secondary border-muted-foreground/20',
};

export function LulaBadge({ children, variant, className }: LulaBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-sm border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
