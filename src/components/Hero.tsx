import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PixelButton } from '@/components/ui/pixel-button';
import { PixelCard, PixelCardContent } from '@/components/ui/pixel-card';
import { PixelInput } from '@/components/ui/pixel-input';
import PixelBackground from '@/components/PixelBackground';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [streamUrl, setStreamUrl] = useState('');
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (streamUrl.trim()) {
      navigate('/generate', { state: { streamUrl } });
    }
  };

  const taglines = [
    "Streamers stream. We Klipit.",
    "From rug to reel in 60 seconds.",
    "The engine of pump.fun attention.",
    "Every clip pumps the culture."
  ];

  const [currentTagline] = useState(taglines[Math.floor(Math.random() * taglines.length)]);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      <PixelBackground />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main logo and tagline */}
        <div className="mb-8">
        <h1 className="font-pixel-xl text-3xl sm:text-4xl md:text-6xl mb-4 text-shadow-pixel animate-pixel-bounce">
          klipit.fun
        </h1>
          <h2 className="font-pixel-lg text-lg sm:text-xl md:text-2xl mb-2 text-shadow-pixel">
            We power the attention market.
          </h2>
          <p className="font-retro text-sm sm:text-base md:text-lg text-muted-foreground">
            {currentTagline}
          </p>
        </div>

        {/* Main CTA card */}
        <PixelCard className="max-w-2xl mx-auto mb-12">
          <PixelCardContent className="space-y-4">
            <div>
              <label className="block font-pixel mb-2 text-left">
                Paste pump.fun stream URL
              </label>
              <PixelInput
                type="url"
                placeholder="https://pump.fun/stream/..."
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1 text-left">
                No timestamps needed — we find the moments.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <PixelButton 
                onClick={handleGenerate}
                className="flex-1 flex items-center justify-center gap-2"
                disabled={!streamUrl.trim()}
              >
                <Sparkles className="w-4 h-4" />
                Generate Klips
                <ArrowRight className="w-4 h-4" />
              </PixelButton>
              <PixelButton variant="secondary" onClick={() => navigate('/styles')} className="sm:w-auto">
                Customize Style
              </PixelButton>
            </div>
          </PixelCardContent>
        </PixelCard>

        {/* Attention flywheel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {[
            { title: "Streamers Stream", desc: "pump.fun creators go live" },
            { title: "Klipit Captures", desc: "AI finds viral moments" },
            { title: "Clips Go Viral", desc: "Content spreads everywhere" },
            { title: "More Join", desc: "Flywheel accelerates" }
          ].map((step, i) => (
            <div key={i} className="relative">
              <PixelCard className="h-full">
                <PixelCardContent className="text-center p-3 sm:p-4 min-h-28 sm:min-h-32 md:min-h-36 flex flex-col items-center justify-center">
                  <h3 className="font-pixel-lg text-xs sm:text-sm mb-2">{step.title}</h3>
                  <p className="font-pixel text-xs text-muted-foreground">
                    {step.desc}
                  </p>
                </PixelCardContent>
              </PixelCard>
              {i < 3 && (
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-4 sm:w-6 h-4 sm:h-6 text-foreground hidden lg:block animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center px-4">
        <p className="font-pixel text-xs text-muted-foreground">
          Klipit.fun — We power the attention market.
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2 text-xs">
          <a href="https://x.com/KlipitDotFun" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">X (Twitter)</a>
          <a href="https://pump.fun/live" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">pump.fun live</a>
          <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
          <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Hero;