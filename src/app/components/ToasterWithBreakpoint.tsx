'use client';
import { Toaster } from 'sonner';
import { useEffect, useState } from 'react';

export function ToasterWithBreakpoint() {
  const [position, setPosition] = useState<'top-right' | 'bottom-center'>('bottom-center');

  useEffect(() => {
    setPosition(window.innerWidth >= 768 ? 'top-right' : 'bottom-center');

    const handleResize = () => {
      setPosition(window.innerWidth >= 768 ? 'top-right' : 'bottom-center');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Toaster
      position={position}
      offset={position === 'bottom-center' ? 100 : 64}
      toastOptions={{
        unstyled: true,
        closeButton: true,
        classNames: {
          toast: 'flex flex-row-reverse items-center justify-between w-96 font-sans p-4 rounded-md shadow-lg bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900',
          title: 'font-bold',
          description: '',
          actionButton: 'bg-zinc-400',
          cancelButton: 'bg-orange-400',
          closeButton: 'w-5 h-5 relative mt-4 flex items-center justify-center border-none',
        },
      }}
    />
  );
} 