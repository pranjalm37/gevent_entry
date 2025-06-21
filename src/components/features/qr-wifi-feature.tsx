'use client';

import { QrCodeDisplay } from '@/components/qr-code-display';
import { type AccessFormData } from '@/components/access-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

interface QrWifiFeatureProps {
  formData: AccessFormData | null;
}

export function QrWifiFeature({ formData }: QrWifiFeatureProps) {
  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      {formData ? (
        <div className="animate-in fade-in-50">
          <QrCodeDisplay formData={formData} />
        </div>
      ) : (
        <Card className="text-center shadow-lg">
            <CardHeader className="items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Info className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">No QR Code to Display</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                Please visit the "Access Form" tab to fill in your details and generate a QR code.
                </p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
