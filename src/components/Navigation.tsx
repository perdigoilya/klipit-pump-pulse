import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PixelButton } from '@/components/ui/pixel-button';
import logo from '@/assets/logo.png';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <header className="border-b-2 border-foreground bg-background p-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img src={logo} alt="Klipit.fun" className="w-8 h-8 mr-2" />
          <span className="font-pixel-xl text-foreground">Klipit.fun</span>
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