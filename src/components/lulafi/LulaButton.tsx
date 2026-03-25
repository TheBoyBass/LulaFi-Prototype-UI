import React from 'react';
import { cn } from '@/lib/utils';

interface LulaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function LulaButton({
  variant = 'primary',
  children,
  className,
  disabled,
  ...props
}: LulaButtonProps) {
  return (
    <button
      className={cn(
        "px-5 py-3 rounded-md transition-all duration-150 ease-out font-medium",
        variant === 'primary' && "bg-brand text-bg-primary hover:bg-brand-hover active:bg-brand-active disabled:opacity-40 disabled:cursor-not-allowed",
        variant === 'secondary' && "bg-transparent text-text-primary border border-border-primary hover:border-text-secondary active:border-brand disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
