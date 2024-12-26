import Link from 'next/link';
import { Button } from './components/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h2 className="text-xl font-bold">Page Not Found</h2>
      <p className="text-neutral-600">Could not find requested resource</p>
      <Link href="/">
        <Button variant="brand">Return Home</Button>
      </Link>
    </div>
  );
} 