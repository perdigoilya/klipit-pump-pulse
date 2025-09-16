import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGeneration } from '@/contexts/GenerationContext';
import { 
  Sparkles, 
  Download, 
  Edit3, 
  Trash2, 
  DownloadCloud,
  Play,
  Clock
} from 'lucide-react';
import { PixelButton } from '@/components/ui/pixel-button';
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from '@/components/ui/pixel-card';
import { PixelInput } from '@/components/ui/pixel-input';
import { PixelProgress } from '@/components/ui/pixel-progress';
import { useToast } from '@/hooks/use-toast';

interface ClipData {
  id: string;
  filename: string;
  duration: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
}

const Generate = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [localStreamUrl, setLocalStreamUrl] = useState(location.state?.streamUrl || '');
  const [clips, setClips] = useState<ClipData[]>([]);
  const { 
    isGenerating, 
    progress, 
    progressText, 
    hasError, 
    errorMessage, 
    streamUrl,
    startGeneration, 
    resetGeneration 
  } = useGeneration();

  useEffect(() => {
    if (location.state?.streamUrl) {
      setLocalStreamUrl(location.state.streamUrl);
    }
  }, [location.state]);

  const generateClips = async () => {
    if (!localStreamUrl.trim()) {
      toast({
        title: "Error",
        description: "That doesn't look like a pump.fun URL.",
        variant: "destructive"
      });
      return;
    }

    if (!localStreamUrl.includes('pump.fun')) {
      toast({
        title: "Error", 
        description: "That doesn't look like a pump.fun URL.",
        variant: "destructive"
      });
      return;
    }

    startGeneration(localStreamUrl);
  };

  const downloadClip = (clip: ClipData) => {
    // Mock download - in reality would trigger actual file download
    toast({
      title: "Download Started",
      description: `Downloading ${clip.filename}...`
    });
  };

  const downloadAll = () => {
    toast({
      title: "Download Started", 
      description: "Downloading all clips as ZIP..."
    });
  };

  const deleteClip = (clipId: string) => {
    setClips(clips.filter(c => c.id !== clipId));
    toast({
      title: "Deleted",
      description: "Clip removed from library."
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="font-pixel-xl text-3xl mb-2">Generate Klips</h1>
        <p className="font-pixel text-muted-foreground">
          Stream in. Clips out.
        </p>
      </div>

      {/* Import Stream Card */}
      <PixelCard>
        <PixelCardHeader>
          <PixelCardTitle>Import Stream</PixelCardTitle>
        </PixelCardHeader>
        <PixelCardContent className="space-y-4">
          <div>
            <PixelInput
              type="url"
              placeholder="https://pump.fun/stream/..."
              value={localStreamUrl}
              onChange={(e) => setLocalStreamUrl(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Works best with live/recorded pump.fun streams
            </p>
          </div>

          <div className="flex gap-2">
            <PixelButton 
              onClick={hasError ? resetGeneration : generateClips}
              disabled={!localStreamUrl.trim() || (isGenerating && !hasError)}
              className="flex items-center gap-2 flex-1"
            >
              <Sparkles className="w-4 h-4" />
              {hasError ? 'Try Again' : isGenerating ? 'Generating...' : 'Generate Klips'}
            </PixelButton>
            
            {hasError && (
              <PixelButton 
                onClick={resetGeneration}
                variant="secondary"
                className="flex items-center gap-2"
              >
                Reset
              </PixelButton>
            )}
          </div>

          {(isGenerating || hasError) && (
            <div className="space-y-2">
              <PixelProgress value={progress} />
              <div className="text-center space-y-1">
                <p className="font-pixel text-sm">{progressText}</p>
                {hasError && (
                  <div className="bg-destructive/10 border border-destructive text-destructive px-3 py-2 font-pixel text-xs">
                    {errorMessage}
                  </div>
                )}
                <p className="text-xs text-muted-foreground font-pixel">
                  {Math.floor(progress)}% complete
                </p>
              </div>
            </div>
          )}
        </PixelCardContent>
      </PixelCard>

      {/* Results */}
      {clips.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-pixel-lg text-xl">Generated Klips</h2>
            <PixelButton onClick={downloadAll} variant="secondary">
              <DownloadCloud className="w-4 h-4 mr-2" />
              Download All
            </PixelButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {clips.map((clip) => (
              <PixelCard key={clip.id} className="overflow-hidden">
                <div className="relative bg-muted aspect-[9/16] flex items-center justify-center">
                  <Play className="w-12 h-12 text-muted-foreground" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {clip.tags.map(tag => (
                      <span key={tag} className="bg-foreground text-background px-1 py-0.5 text-xs font-pixel">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-pixel">
                    <Clock className="w-3 h-3" />
                    {clip.duration}
                  </div>
                </div>
                
                <PixelCardContent className="space-y-2">
                  <p className="font-pixel text-sm truncate">{clip.filename}</p>
                  <p className="text-xs text-muted-foreground">{clip.createdAt}</p>
                  
                  <div className="flex gap-2">
                    <PixelButton 
                      size="sm" 
                      onClick={() => downloadClip(clip)}
                      className="flex-1"
                    >
                      <Download className="w-3 h-3" />
                    </PixelButton>
                    <PixelButton size="sm" variant="secondary">
                      <Edit3 className="w-3 h-3" />
                    </PixelButton>
                    <PixelButton 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteClip(clip.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </PixelButton>
                  </div>
                </PixelCardContent>
              </PixelCard>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {clips.length === 0 && !isGenerating && (
        <PixelCard className="text-center py-12">
          <PixelCardContent>
            <div className="w-24 h-24 mx-auto mb-4 border-2 border-foreground bg-muted flex items-center justify-center">
              <div className="w-16 h-12 border border-foreground bg-background relative">
                <div className="absolute inset-2 bg-muted animate-pulse opacity-50"></div>
              </div>
            </div>
            <h3 className="font-pixel-lg text-lg mb-2">Stream in. Clips out.</h3>
            <p className="text-muted-foreground font-pixel text-sm">
              Paste a pump.fun stream URL above to get started.
            </p>
          </PixelCardContent>
        </PixelCard>
      )}
    </div>
  );
};

export default Generate;