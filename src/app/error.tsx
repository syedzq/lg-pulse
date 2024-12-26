'use client';

import { useEffect } from 'react';
import { Button } from './components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h2 className="text-xl font-bold">Something went wrong!</h2>
      <Button
        onClick={reset}
        variant="brand"
      >
        Try again
      </Button>
    </div>
  );
} 