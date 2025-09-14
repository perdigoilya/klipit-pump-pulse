import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PixelButton } from '@/components/ui/pixel-button';
import logo from '@/assets/logo.png';
import klipitLogo from '@/assets/klipit-logo.png';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <header className="border-b-2 border-foreground bg-background p-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={logo} alt="Klipit.fun" className="w-12 h-12" />
          <img src={klipitLogo} alt="Klipit.fun" className="h-12 -ml-4" />
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/generate">
            <PixelButton 
              variant={location.pathname === '/generate' ? 'default' : 'ghost'} 
              size="sm"
            >
              Generate
            </PixelButton>
          </Link>
          <Link to="/library">
            <PixelButton 
              variant={location.pathname === '/library' ? 'default' : 'ghost'} 
              size="sm"
            >
              Library
            </PixelButton>
          </Link>
          <Link to="/styles">
            <PixelButton 
              variant={location.pathname === '/styles' ? 'default' : 'ghost'} 
              size="sm"
            >
              Styles
            </PixelButton>
          </Link>
          <PixelButton variant="secondary" size="sm">
            Sign In
          </PixelButton>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;