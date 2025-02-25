'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Drawer as VaulDrawer } from 'vaul';
import { Button } from './Button';
import { ReactElement, useRef, useState, useEffect } from 'react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: ReactElement<typeof Button>[];
  breakpoint?: 'desktop' | 'mobile';
  width?: 'sm' | 'md' | 'lg' | 'fit';
  height?: 'full' | 'fit';
  inset?: boolean;
}

export function Drawer({ 
  open, 
  onClose, 
  title, 
  subtitle,
  children, 
  footer,
  breakpoint = 'mobile',
  width = 'md',
  height = 'fit',
  inset = true
}: DrawerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const checkScroll = () => {
    const element = contentRef.current;
    if (element) {
      const { scrollTop, scrollHeight, clientHeight } = element;
      setShowTopFade(scrollTop > 0);
      setShowBottomFade(scrollTop < scrollHeight - clientHeight - 1);
    }
  };

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      checkScroll();
      element.addEventListener('scroll', checkScroll);
      return () => element.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <VaulDrawer.Root open={open} onOpenChange={onClose} direction={breakpoint === 'desktop' ? 'right' : 'bottom'}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content 
          className={`bg-white dark:bg-neutral-800 shadow-xl fixed flex flex-col ${
            breakpoint === 'desktop' 
              ? `right-0 bottom-0 w-${width} max-w-[90vw] h-screen`
              : `inset-x-0 bottom-0 rounded-t-2xl w-full h-${height} max-h-[calc(100vh-2rem)]`
          }`}
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div className="flex flex-col">
              <div className="text-xl font-bold text-neutral-900 dark:text-white">
                {title}
              </div>
              {subtitle && (
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {subtitle}
                  </div>
                )}
            </div>
            <VaulDrawer.Title className="sr-only">{title}</VaulDrawer.Title>
            <Button
                    variant="secondary"
                    size="extraSmall"
                    onClick={onClose}
                    className="p-1 rounded-full shadow border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
                >
                    <XMarkIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </Button>
          </div>
          <div className="flex-1 overflow-y-auto h-full relative">
            {showTopFade && (
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white dark:from-neutral-800 to-transparent z-10 pointer-events-none" />
            )}
            <div ref={contentRef} className={`h-full overflow-y-auto ${inset ? 'p-6' : ''}`} onScroll={checkScroll}>
              {children}
            </div>
            {showBottomFade && (
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-neutral-800 to-transparent z-10 pointer-events-none" />
            )}
          </div>
          {footer && (
            <div className="flex justify-end gap-2 p-6 pt-4">
              {footer}
            </div>
          )}
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
} 