// app/layouts/landing-layout.tsx
'use client';

import { ThemeProvider } from 'next-themes';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      {children}
    </ThemeProvider>
  );
}
