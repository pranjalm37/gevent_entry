'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, CheckSquare, QrCode, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Navigate', icon: Compass },
  { href: '/check-in', label: 'Check-in', icon: CheckSquare },
  { href: '/entry-qr', label: 'Entry QR', icon: QrCode },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-lg border-t md:hidden">
      <div className="container mx-auto h-full">
        <div className="grid h-full grid-cols-4 items-center">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link href={href} key={label} className="flex flex-col items-center justify-center text-center">
                <Icon
                  className={cn(
                    'h-6 w-6 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'text-xs font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
