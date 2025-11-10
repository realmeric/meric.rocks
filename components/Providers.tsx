"use client";
import { ReactNode } from 'react';
import { LanyardProvider } from '../hooks/useLanyard';
import YasMarinaMode from './YasMarinaMode';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanyardProvider>
      <YasMarinaMode />
      {children}
    </LanyardProvider>
  );
}
