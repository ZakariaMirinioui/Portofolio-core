"use client";

import { ThemeProvider } from "next-themes";
import PageTransitionOverlay from "./components/transitions/PageTransition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
      <PageTransitionOverlay />
    </ThemeProvider>
  );
}
