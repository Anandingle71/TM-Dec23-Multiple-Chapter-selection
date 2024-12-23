import React, { ReactNode } from 'react';

interface OnboardingStepProps {
  children: ReactNode;
}

export function OnboardingStep({ children }: OnboardingStepProps) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
}