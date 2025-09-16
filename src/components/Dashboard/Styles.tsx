import React, { useState } from 'react';
import { 
  Type, 
  Palette, 
  Volume2, 
  Save, 
  Eye,
  RotateCcw
} from 'lucide-react';
import { PixelButton } from '@/components/ui/pixel-button';
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from '@/components/ui/pixel-card';
import { useToast } from '@/hooks/use-toast';
import { CursorTooltip } from '@/components/ui/cursor-tooltip';
import { cn } from '@/lib/utils';

const Styles = () => {
  const { toast } = useToast();
  
  const [selectedFont, setSelectedFont] = useState('Press Start 2P');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [captionStyle, setCaptionStyle] = useState({
    allCaps: true,
    dropShadow: true,
    outline: false
  });
  const [sfxEnabled, setSfxEnabled] = useState({
    bleep: true,
    zoom: false,
    shake: true,
    scratch: false
  });
  const [selectedTheme, setSelectedTheme] = useState('Clean');
  const [applyToAll, setApplyToAll] = useState(true);

  const fonts = [
    'Press Start 2P',
    'VT323', 
    'Inter'
  ];

  const themes = [
    { name: 'Clean', desc: 'Minimal captions, smooth cuts', available: true },
    { name: 'Degenerate', desc: 'Max chaos, all effects on', available: false },
    { name: 'Commentary', desc: 'Focus on speech, clean visuals', available: false },
    { name: 'Satisfying', desc: 'Adds attention grabbing satisfying footage', available: false },
    { name: 'Brainrot 1.0', desc: 'Adds subway surfer gameplay', available: false },
    { name: 'bRAinROT 2.0', desc: 'Adds 3 extra pieces of content alongside (gameplay, gooning, satisfying video) with all effects on', available: false }
  ];

  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Style preset saved."
    });
  };

  const resetToDefaults = () => {
    setSelectedFont('Press Start 2P');
    setFontColor('#ffffff');
    setCaptionStyle({ allCaps: true, dropShadow: true, outline: false });
    setSfxEnabled({ bleep: true, zoom: false, shake: true, scratch: false });
    setSelectedTheme('Clean');
    setApplyToAll(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-pixel-xl text-3xl mb-2">Customize Style</h1>
        <p className="font-pixel text-muted-foreground">
          Make your clips stand out with pixel-perfect style.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Style Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Font & Typography */}
          <PixelCard>
            <PixelCardHeader>
              <PixelCardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Font & Typography
              </PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent className="space-y-4">
              <div>
                <label className="block font-pixel text-sm mb-2">Font Family</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {fonts.map(font => (
                    <PixelButton
                      key={font}
                      variant={selectedFont === font ? 'default' : 'secondary'}
                      onClick={() => setSelectedFont(font)}
                      className="text-xs"
                    >
                      {font}
                    </PixelButton>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pixel text-sm mb-2">Font Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'White', value: '#ffffff' },
                    { name: 'Yellow', value: '#ffff00' },
                    { name: 'Red', value: '#ff0000' },
                    { name: 'Green', value: '#00ff00' },
                    { name: 'Blue', value: '#0080ff' },
                    { name: 'Purple', value: '#8000ff' },
                    { name: 'Orange', value: '#ff8000' },
                    { name: 'Pink', value: '#ff00ff' }
                  ].map(color => (
                    <PixelButton
                      key={color.value}
                      variant={fontColor === color.value ? 'default' : 'secondary'}
                      onClick={() => setFontColor(color.value)}
                      className="text-xs h-8 px-2"
                      style={{ 
                        backgroundColor: fontColor === color.value ? undefined : color.value,
                        color: fontColor === color.value ? undefined : '#000000'
                      }}
                    >
                      {color.name}
                    </PixelButton>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-pixel text-sm mb-2">Caption Style</label>
                <div className="space-y-2">
                  {[
                    { key: 'allCaps', label: 'ALL CAPS' },
                    { key: 'dropShadow', label: 'Drop Shadow (2px)' },
                    { key: 'outline', label: 'Outline (1-2px)' }
                  ].map(option => (
                    <label key={option.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={captionStyle[option.key as keyof typeof captionStyle]}
                        onChange={(e) => setCaptionStyle(prev => ({
                          ...prev,
                          [option.key]: e.target.checked
                        }))}
                        className="w-4 h-4 border-2 border-foreground bg-background checked:bg-foreground"
                      />
                      <span className="font-pixel text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </PixelCardContent>
          </PixelCard>

          {/* Sound Effects */}
          <PixelCard>
            <PixelCardHeader>
              <PixelCardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Sound Effects
              </PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'bleep', label: 'Bleep!' },
                  { key: 'zoom', label: 'Zoom-in' },
                  { key: 'shake', label: 'Screen Shake' },
                  { key: 'scratch', label: 'Record Scratch' }
                ].map(sfx => (
                  <label key={sfx.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sfxEnabled[sfx.key as keyof typeof sfxEnabled]}
                      onChange={(e) => setSfxEnabled(prev => ({
                        ...prev,
                        [sfx.key]: e.target.checked
                      }))}
                      className="w-4 h-4 border-2 border-foreground bg-background checked:bg-foreground"
                    />
                    <span className="font-pixel text-sm">{sfx.label}</span>
                  </label>
                ))}
              </div>
            </PixelCardContent>
          </PixelCard>

          {/* Preset Themes */}
          <PixelCard>
            <PixelCardHeader>
              <PixelCardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Preset Themes
              </PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <div className="space-y-3">
                {themes.map(theme => (
                  <CursorTooltip
                    key={theme.name}
                    content="Coming Soon"
                    disabled={!theme.available}
                    className="block"
                  >
                    <label 
                      className={cn(
                        "flex items-center gap-3",
                        theme.available ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                      )}
                    >
                      <input
                        type="radio"
                        name="theme"
                        checked={selectedTheme === theme.name}
                        onChange={() => theme.available && setSelectedTheme(theme.name)}
                        disabled={!theme.available}
                        className="w-4 h-4 border-2 border-foreground bg-background disabled:opacity-50"
                      />
                      <div>
                        <div className="font-pixel text-sm font-semibold">{theme.name}</div>
                        <div className="font-pixel text-xs text-muted-foreground">{theme.desc}</div>
                      </div>
                    </label>
                  </CursorTooltip>
                ))}
              </div>
            </PixelCardContent>
          </PixelCard>

          {/* Apply Settings */}
          <PixelCard>
            <PixelCardContent>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyToAll}
                    onChange={(e) => setApplyToAll(e.target.checked)}
                    className="w-4 h-4 border-2 border-foreground bg-background checked:bg-foreground"
                  />
                  <span className="font-pixel text-sm">Apply to all future clips</span>
                </label>
                
                <div className="flex gap-2">
                  <PixelButton variant="secondary" size="sm" onClick={resetToDefaults}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </PixelButton>
                  <PixelButton onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </PixelButton>
                </div>
              </div>
            </PixelCardContent>
          </PixelCard>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <PixelCard className="sticky top-6">
            <PixelCardHeader>
              <PixelCardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent>
              <div className="bg-muted aspect-[9/16] border-2 border-foreground flex items-center justify-center relative overflow-hidden">
                {/* Mock video preview */}
                <div className="w-full h-full bg-gradient-to-br from-muted to-accent relative">
                  <div className="absolute inset-4 border border-foreground bg-background/10" />
                  
                  {/* Sample caption overlay */}
                  <div className="absolute bottom-6 left-4 right-4">
                   <div 
                      className={`
                        font-pixel text-xs px-2 py-1 text-center
                        ${captionStyle.allCaps ? 'uppercase' : ''}
                        ${captionStyle.dropShadow ? 'text-shadow-pixel' : ''}
                        ${captionStyle.outline ? 'text-outline-pixel' : ''}
                      `}
                      style={{
                        fontFamily: selectedFont === 'Press Start 2P' ? 'Press Start 2P' : 
                                  selectedFont === 'VT323' ? 'VT323' : 'Inter',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: fontColor
                      }}
                    >
                      {selectedTheme === 'Degenerate' ? 'MOON MOON MOON!' : 
                       selectedTheme === 'Commentary' ? '"This is actually huge"' :
                       selectedTheme === 'Satisfying' ? 'SO SATISFYING!' :
                       selectedTheme === 'Brainrot 1.0' ? 'SUBWAY SURFERS!' :
                       selectedTheme === 'bRAinROT 2.0' ? 'MAX CHAOS MODE!' :
                       'Sample caption text'}
                    </div>
                  </div>

                  {/* Sample tags */}
                  <div className="absolute top-4 right-4 flex gap-1">
                    <span className="bg-foreground text-background px-1 py-0.5 text-xs font-pixel">
                      EPIC
                    </span>
                    <span className="bg-foreground text-background px-1 py-0.5 text-xs font-pixel">
                      GG
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-pixel text-sm">Preview Settings:</h4>
                <div className="text-xs font-pixel text-muted-foreground space-y-1">
                  <div>Font: {selectedFont}</div>
                  <div>Color: {fontColor}</div>
                  <div>Theme: {selectedTheme}</div>
                  <div>Effects: {Object.values(sfxEnabled).filter(Boolean).length}/4</div>
                </div>
              </div>
            </PixelCardContent>
          </PixelCard>
        </div>
      </div>
    </div>
  );
};

export default Styles;