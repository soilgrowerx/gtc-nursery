'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Trees, Home, Users, FileText, Heart, Settings } from 'lucide-react';
import Image from 'next/image';
import { useWishlist } from '@/hooks/use-wishlist';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/inventory', label: 'Inventory', icon: Trees },
  { href: '/requests', label: 'Requests', icon: Users },
  { href: '/admin', label: 'Admin', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const { wishlistCount } = useWishlist();

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/gtc-logo.png" 
                alt="GTC Logo" 
                width={32} 
                height={32} 
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                priority
                sizes="(max-width: 640px) 24px, 32px"
              />
              <span className="text-base sm:text-xl font-bold text-foreground hidden xs:inline">
                The Greentree Co.
              </span>
              <span className="text-sm font-bold text-foreground xs:hidden">
                GTC
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors touch-manipulation',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative touch-manipulation',
                pathname === '/wishlist'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Heart className={`h-4 w-4 ${pathname === '/wishlist' ? '' : 'hover:text-red-400'}`} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center space-x-1">
            {navItems.slice(0, 3).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-center p-2 rounded-md transition-colors touch-manipulation',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                  title={item.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
            
            {/* Mobile Wishlist Link */}
            <Link
              href="/wishlist"
              className={cn(
                'flex items-center justify-center p-2 rounded-md transition-colors relative touch-manipulation',
                pathname === '/wishlist'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
              title="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}