'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Drawer as VaulDrawer } from 'vaul';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  breakpoint?: 'desktop' | 'mobile';
  width?: 'sm' | 'md' | 'lg' | 'fit';
  height?: 'full' | 'fit';
}

export function Drawer({ 
  open, 
  onClose, 
  title, 
  children, 
  footer,
  breakpoint = 'mobile',
  width = 'md',
  height = 'fit'
}: DrawerProps) {
  return (
    <VaulDrawer.Root open={open} onOpenChange={onClose} direction={breakpoint === 'desktop' ? 'right' : 'bottom'}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content 
          className={`bg-white dark:bg-neutral-800 fixed flex flex-col ${
            breakpoint === 'desktop' 
              ? `right-0 bottom-0 max-w-${width} h-screen`
              : `inset-x-0 bottom-0 rounded-t-2xl w-full h-${height}`
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="text-xl font-bold text-neutral-900 dark:text-white">
              {title}
            </div>
            <VaulDrawer.Title className="sr-only">{title}</VaulDrawer.Title>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto h-full">
            {children}
          </div>
          {footer && (
            <div className="border-t border-neutral-200 dark:border-neutral-700">
              {footer}
            </div>
          )}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
} 