'use client';

import { useState } from 'react';
import { AccessForm } from '@/components/access-form';
import { QrCodeDisplay } from '@/components/qr-code-display';

type FormData = {
  fullName: string;
  idType: string;
  idNumber: string;
  phoneNumber: string;
  needsExtension: boolean;
};

export default function EntryQrPage() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setIsFormSubmitted(true);
  };

  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      {isFormSubmitted && formData ? (
        <div className="animate-in fade-in-50">
          <QrCodeDisplay formData={formData} />
        </div>
      ) : (
        <AccessForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}
