"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,         // Lower = smoother/heavier (0.1 is standard)
        duration: 1.5,     // How long the scroll takes to settle
        smoothWheel: true 
      }}
    >
      {children}
    </ReactLenis>
  );
}