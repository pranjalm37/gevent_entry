'use client';

import { AccessForm, type AccessFormData } from '@/components/access-form';

interface AccessFormFeatureProps {
  onSubmit: (data: AccessFormData) => void;
}

export function AccessFormFeature({ onSubmit }: AccessFormFeatureProps) {
  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <AccessForm onSubmit={onSubmit} />
    </div>
  );
}
