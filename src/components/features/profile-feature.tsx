import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronRight, Bell, Shield, LogOut } from 'lucide-react';

const ProfileMenuItem = ({ icon: Icon, label, hasChevron = true }: { icon: React.ElementType, label: string, hasChevron?: boolean }) => (
  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
    <Icon className="h-5 w-5 text-muted-foreground" />
    <span className="flex-1 font-medium">{label}</span>
    {hasChevron && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
  </div>
);

export function ProfileFeature() {
  return (
    <div className="container mx-auto max-w-lg px-4 py-8">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <Avatar className="h-24 w-24 border-4 border-primary/20">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User Name" data-ai-hint="person portrait" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-headline font-bold">John Doe</h1>
          <p className="text-muted-foreground">john.doe@example.com</p>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ProfileMenuItem icon={Bell} label="Notifications" />
          <ProfileMenuItem icon={Shield} label="Privacy & Security" />
          <Separator />
          <div className="flex items-center space-x-4 p-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
            <LogOut className="h-5 w-5" />
            <span className="flex-1 font-medium">Log Out</span>
          </div>
        </CardContent>
      </Card>
       <div className="text-center mt-8">
        <Button variant="outline">View Event Policies</Button>
      </div>
    </div>
  );
}
