'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import * as Vaul from 'vaul';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'bottom' | 'top';
}

export function Drawer({ 
  open, 
  onClose, 
  title, 
  children, 
  direction = 'bottom' 
}: DrawerProps) {
  return (
    <Vaul.Root open={open} onOpenChange={onClose}>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 bg-black/40" />
        <Vaul.Content 
          className={`bg-white rounded-xl dark:bg-neutral-800 fixed w-full max-h-[85vh] flex flex-col ${
            direction === 'bottom' 
              ? 'inset-x-0 bottom-0 rounded-t-2xl'
              : direction === 'top'
              ? 'inset-x-0 top-0 rounded-b-[10px]'
              : direction === 'left'
              ? 'left-0 top-0 bottom-0 max-w-md w-full'
              : 'right-0 top-0 bottom-0 max-w-md w-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="text-xl font-bold text-neutral-900 dark:text-white">
              {title}
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
} 