import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Library, 
  Palette, 
  Share2, 
  Trophy, 
  BarChart3,
  Info
} from 'lucide-react';
import { PixelButton } from '@/components/ui/pixel-button';
import { PixelTooltip, PixelTooltipContent, PixelTooltipTrigger, PixelTooltipProvider } from '@/components/ui/pixel-tooltip';

const Sidebar = () => {
  const location = useLocation();
  
  const activeTab = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/generate', icon: Sparkles, label: 'Generate', active: true },
    { path: '/library', icon: Library, label: 'Library', active: true },
    { path: '/styles', icon: Palette, label: 'Styles', active: true },
    { path: '/integrations', icon: Share2, label: 'Integrations', active: false, tooltip: 'Auto-publish to TikTok, Reels, Shorts' },
    { path: '/arena', icon: Trophy, label: 'Arena', active: false, tooltip: 'Pick live pump streams. Clip without URLs.' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', active: false, tooltip: 'AI scores your Klips for breakout potential.' },
  ];

  return (
    <PixelTooltipProvider>
      <aside className="w-64 border-r-2 border-foreground bg-card h-full">
        <div className="p-4 border-b-2 border-foreground">
          <h2 className="font-pixel-lg text-lg">Dashboard</h2>
        </div>
        
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (!item.active) {
              return (
                <PixelTooltip key={item.path}>
                  <PixelTooltipTrigger asChild>
                    <div className="disabled-pixel">
                      <PixelButton
                        variant="ghost"
                        className="w-full justify-start gap-3 text-left"
                        disabled
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                        <span className="ml-auto text-xs opacity-60">Soon</span>
                      </PixelButton>
                    </div>
                  </PixelTooltipTrigger>
                  <PixelTooltipContent>
                    <p className="font-pixel text-xs max-w-48">
                      <strong>{item.label} — Coming Soon</strong>
                      <br />
                      {item.tooltip}
                    </p>
                  </PixelTooltipContent>
                </PixelTooltip>
              );
            }
            
            return (
              <Link key={item.path} to={item.path}>
                <PixelButton
                  variant={activeTab(item.path) ? 'default' : 'ghost'}
                  className="w-full justify-start gap-3"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </PixelButton>
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 border-2 border-foreground bg-muted">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-pixel text-xs font-semibold">Pro Tip</p>
                <p className="font-pixel text-xs text-muted-foreground mt-1">
                  Best clips come from live streams with active chat!
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </PixelTooltipProvider>
  );
};

export default Sidebar;