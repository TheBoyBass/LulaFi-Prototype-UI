import React from 'react';
import { cn } from '@/lib/utils';

interface LulaBadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
}

const variantStyles = {
  success: 'bg-tone-success-surface text-tone-success-content border-tone-success-stroke',
  warning: 'bg-tone-warning-surface text-tone-warning-content border-tone-warning-stroke',
  error: 'bg-tone-danger-surface text-tone-danger-content border-tone-danger-stroke',
  info: 'bg-tone-info-surface text-tone-info-content border-tone-info-stroke',
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
