'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LoaderCircle, CheckCircle, Users } from 'lucide-react';
import { estimateWaitTime } from '@/ai/flows/wait-time-estimation';
import { useToast } from '@/hooks/use-toast';

type Status = 'idle' | 'loading' | 'checkedIn';

export function CheckInFeature() {
  const [status, setStatus] = useState<Status>('idle');
  const [queuePosition, setQueuePosition] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'checkedIn' && estimatedTime > 0) {
      const totalSeconds = estimatedTime * 60;
      const increment = 100 / totalSeconds;
      
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + increment;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, estimatedTime]);
  
  const handleCheckIn = async () => {
    setStatus('loading');
    try {
      // Simulate getting a queue position and processing rate
      const currentQueuePosition = Math.floor(Math.random() * 20) + 10; // e.g., 10-29
      const tokensProcessedPerHour = 120;
      
      const result = await estimateWaitTime({
        queuePosition: currentQueuePosition,
        tokensProcessedPerHour,
      });

      setQueuePosition(currentQueuePosition);
      setEstimatedTime(result.estimatedWaitTimeMinutes);
      setProgress(0);
      setStatus('checkedIn');
    } catch (error) {
      console.error('Failed to estimate wait time:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch wait time. Please try again.',
      });
      setStatus('idle');
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Badge Check-In</CardTitle>
          <CardDescription>Join the queue to get your event badge.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[16rem] flex flex-col items-center justify-center space-y-4">
          {status === 'idle' && (
            <div className="space-y-4 text-center">
              <Users className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">You are not in the queue yet.</p>
              <Button onClick={handleCheckIn} size="lg" className="font-headline">
                Tap to Check In
              </Button>
            </div>
          )}
          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center space-y-2">
              <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Getting your spot in the queue...</p>
            </div>
          )}
          {status === 'checkedIn' && (
            <div className="w-full space-y-4 animate-in fade-in-50">
              <p className="text-muted-foreground">Your queue number is:</p>
              <p className="font-headline text-6xl font-bold text-primary">{queuePosition}</p>
              <p className="text-lg">
                Estimated wait time: <span className="font-bold text-accent">{estimatedTime} minutes</span>
              </p>
              <Progress value={progress} className="w-full" />
               <p className="text-xs text-muted-foreground pt-1">
                {progress >= 100 ? "It's your turn!" : "Your turn is approaching..."}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center">
          {status === 'checkedIn' && (
            <p className="text-xs text-center text-muted-foreground">
              Please head towards the check-in counter. We'll call your number.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
