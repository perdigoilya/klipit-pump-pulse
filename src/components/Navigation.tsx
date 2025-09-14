import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PixelButton } from '@/components/ui/pixel-button';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import klipitLogo from '@/assets/klipit-logo.png';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="border-b-2 border-foreground bg-background p-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center hover:opacity-80 hover:animate-pixel-bounce transition-opacity">
          <img src={logo} alt="Klipit.fun" className="w-8 sm:w-12 h-8 sm:h-12" />
          <img src={klipitLogo} alt="Klipit.fun" className="h-8 sm:h-12 -ml-2 sm:-ml-4" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-2 border-foreground bg-background p-4">
          <div className="flex flex-col gap-2">
            <Link to="/generate" onClick={() => setIsMobileMenuOpen(false)}>
              <PixelButton 
                variant={location.pathname === '/generate' ? 'default' : 'ghost'} 
                size="sm"
                className="w-full justify-start"
              >
                Generate
              </PixelButton>
            </Link>
            <Link to="/library" onClick={() => setIsMobileMenuOpen(false)}>
              <PixelButton 
                variant={location.pathname === '/library' ? 'default' : 'ghost'} 
                size="sm"
                className="w-full justify-start"
              >
                Library
              </PixelButton>
            </Link>
            <Link to="/styles" onClick={() => setIsMobileMenuOpen(false)}>
              <PixelButton 
                variant={location.pathname === '/styles' ? 'default' : 'ghost'} 
                size="sm"
                className="w-full justify-start"
              >
                Styles
              </PixelButton>
            </Link>
            <PixelButton variant="secondary" size="sm" className="w-full justify-start">
              Sign In
            </PixelButton>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;