import React from 'react';
import {Button} from '@/components/ui/button';
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Hello World!</p>
      <Button className="ml-4">Click Me</Button>
    </div>
  );
}