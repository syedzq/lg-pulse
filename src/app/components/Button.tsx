import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles applied to all buttons
  'font-semibold inline-flex items-center justify-center h-fit rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 shadow-sm disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        brand: 'bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-500 dark:text-white dark:hover:bg-brand-600',
        primary: 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100',
        secondary: 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-white dark:border-neutral-600 dark:hover:bg-neutral-700',
        tertiary: 'text-neutral-900 hover:bg-neutral-50 dark:text-white dark:hover:bg-neutral-800 shadow-none',
        destructive: 'bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-700',
      },
      size: {
        extraSmall: 'text-xs px-4 py-1 min-h-7',
        base: 'text-base px-5 py-2.5 min-h-10',
        extraLarge: 'text-base px-8 py-4 min-h-[60px]',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'base',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
} 