'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Wifi, CheckCircle, Lock } from 'lucide-react';
import { Separator } from './ui/separator';

interface QrCodeDisplayProps {
  formData: {
    fullName: string;
  };
}

export function QrCodeDisplay({ formData }: QrCodeDisplayProps) {
  const [showWifi, setShowWifi] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const handleValidation = () => {
    setIsValidated(true);
    setTimeout(() => setShowWifi(true), 500);
  };

  return (
    <Card className="w-full max-w-lg mx-auto text-center shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Welcome, {formData.fullName}!</CardTitle>
        <CardDescription>Present this QR code at the event entrance.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-6">
        <div className="p-4 bg-white rounded-lg border shadow-inner">
          <QrCode className="h-48 w-48 md:h-64 md:w-64 text-black" />
        </div>
        {!isValidated && (
          <Button onClick={handleValidation} className="font-headline">
            <CheckCircle className="mr-2 h-4 w-4" />
            Simulate Staff Validation
          </Button>
        )}
      </CardContent>
      {isValidated && (
        <CardFooter className="flex flex-col gap-4 p-6 pt-0">
           <Separator />
           <div className="w-full">
            {showWifi ? (
                <div className="text-left w-full space-y-4 animate-in fade-in-50">
                    <h3 className="font-headline flex items-center gap-2 text-lg"><Wifi className="text-primary"/> Wi-Fi Access</h3>
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-secondary/50">
                        <span className="text-muted-foreground">Network (SSID)</span>
                        <span className="font-medium">OnboardAI_Guest</span>
                    </div>
                     <div className="flex justify-between items-center p-3 border rounded-lg bg-secondary/50">
                        <span className="text-muted-foreground">Password</span>
                        <span className="font-medium font-mono">Innovate2024!</span>
                    </div>
                </div>
            ) : (
                <div className="text-left w-full space-y-2 text-muted-foreground">
                    <h3 className="font-headline flex items-center gap-2 text-lg"><Lock className="text-muted-foreground"/> Wi-Fi Locked</h3>
                    <p className="text-sm">Wi-Fi details will be revealed after check-in validation.</p>
                </div>
            )}
           </div>
        </CardFooter>
      )}
    </Card>
  );
}
