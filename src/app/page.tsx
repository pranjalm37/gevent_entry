'use client';

import { useState } from 'react';
import { Compass, CheckSquare, QrCode, User, Wifi } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { NavigateFeature } from '@/components/features/navigate-feature';
import { CheckInFeature } from '@/components/features/check-in-feature';
import { ProfileFeature } from '@/components/features/profile-feature';
import { type AccessFormData } from '@/components/access-form';
import { AccessFormFeature } from '@/components/features/access-form-feature';
import { QrWifiFeature } from '@/components/features/qr-wifi-feature';

export default function HomePage() {
  const [formData, setFormData] = useState<AccessFormData | null>(null);

  const handleFormSubmit = (data: AccessFormData) => {
    setFormData(data);
  };
  
  const tabItems = [
    { value: 'navigate', label: 'Navigate', icon: Compass, component: <NavigateFeature /> },
    { value: 'check-in', label: 'Check-in', icon: CheckSquare, component: <CheckInFeature /> },
    { value: 'access-form', label: 'Access Form', icon: QrCode, component: <AccessFormFeature onSubmit={handleFormSubmit} /> },
    { value: 'qr-wifi', label: 'QR & WiFi', icon: Wifi, component: <QrWifiFeature formData={formData} /> },
    { value: 'profile', label: 'Profile', icon: User, component: <ProfileFeature /> },
  ];

  return (
    <Tabs defaultValue="navigate" className="h-full w-full">
      {tabItems.map(item => (
        <TabsContent
          key={item.value}
          value={item.value}
          className="m-0"
        >
          {item.component}
        </TabsContent>
      ))}

      <TabsList className="fixed bottom-0 left-0 right-0 z-10 grid h-16 w-full grid-cols-5 rounded-none border-t bg-background p-0 md:hidden">
        {tabItems.map(({ value, label, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="h-full flex-col gap-1 rounded-none border-t-2 border-transparent text-muted-foreground data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
