import React, { useState } from 'react';
import { 
  Library as LibraryIcon, 
  Download, 
  Share2, 
  Filter,
  Clock,
  Play,
  Search,
  Calendar
} from 'lucide-react';
import { PixelButton } from '@/components/ui/pixel-button';
import { PixelCard, PixelCardContent, PixelCardHeader, PixelCardTitle } from '@/components/ui/pixel-card';
import { PixelInput } from '@/components/ui/pixel-input';
import { PixelModal, PixelModalContent, PixelModalHeader, PixelModalTitle, PixelModalDescription } from '@/components/ui/pixel-modal';
import { useToast } from '@/hooks/use-toast';

interface LibraryClip {
  id: string;
  filename: string;
  duration: string;
  createdAt: string;
  streamSource: string;
  tags: string[];
  views: number;
  downloads: number;
}

const Library = () => {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [shareModalClip, setShareModalClip] = useState<LibraryClip | null>(null);

  // Mock library data
  const [clips] = useState<LibraryClip[]>([
    {
      id: '1',
      filename: 'epic-rug-moment.mp4',
      duration: '00:23',
      createdAt: '2 hours ago',
      streamSource: 'pump.fun/degen-trader',
      tags: ['RUG', 'EPIC', 'CHAT'],
      views: 1247,
      downloads: 89
    },
    {
      id: '2', 
      filename: 'moon-celebration.mp4',
      duration: '00:18',
      createdAt: '5 hours ago',
      streamSource: 'pump.fun/crypto-king',
      tags: ['MOON', 'PUMP', 'CELEBRATION'],
      views: 2156,
      downloads: 143
    },
    {
      id: '3',
      filename: 'rage-quit-compilation.mp4',
      duration: '00:35',
      createdAt: '1 day ago',
      streamSource: 'pump.fun/angry-ape',
      tags: ['RAGE', 'QUIT', 'COMPILATION'],
      views: 856,
      downloads: 67
    },
    {
      id: '4',
      filename: 'based-take-viral.mp4', 
      duration: '00:27',
      createdAt: '2 days ago',
      streamSource: 'pump.fun/based-chad',
      tags: ['BASED', 'VIRAL', 'WISDOM'],
      views: 3421,
      downloads: 234
    },
    {
      id: '5',
      filename: 'chat-goes-wild.mp4',
      duration: '00:31',
      createdAt: '3 days ago', 
      streamSource: 'pump.fun/hype-master',
      tags: ['CHAT', 'WILD', 'ENERGY'],
      views: 1876,
      downloads: 112
    },
    {
      id: '6',
      filename: 'diamond-hands-speech.mp4',
      duration: '00:42',
      createdAt: '1 week ago',
      streamSource: 'pump.fun/diamond-joe',
      tags: ['DIAMOND', 'HANDS', 'SPEECH'],
      views: 987,
      downloads: 78
    }
  ]);

  const filteredClips = clips
    .filter(clip => 
      clip.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clip.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'viral': return b.views - a.views;
        case 'downloads': return b.downloads - a.downloads;
        default: return 0;
      }
    });

  const downloadClip = (clip: LibraryClip) => {
    toast({
      title: "Download Started",
      description: `Downloading ${clip.filename}...`
    });
  };

  const shareClip = (clip: LibraryClip) => {
    setShareModalClip(clip);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(`https://klipit.fun/clip/${shareModalClip?.id}`);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard!"
    });
    setShareModalClip(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-pixel-xl text-3xl mb-2">Clip Library</h1>
          <p className="font-pixel text-muted-foreground">
            Your viral moments collection.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-pixel">
          <LibraryIcon className="w-4 h-4" />
          {clips.length} clips
        </div>
      </div>

      {/* Filters and Search */}
      <PixelCard>
        <PixelCardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <PixelInput
                placeholder="Search clips or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {[
              { value: 'newest', label: 'Newest', icon: Calendar },
              { value: 'viral', label: 'Most Viral', icon: LibraryIcon },
              { value: 'downloads', label: 'Downloads', icon: Download }
            ].map(option => {
              const Icon = option.icon;
              return (
                <PixelButton
                  key={option.value}
                  variant={sortBy === option.value ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                  className="flex items-center gap-1"
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{option.label}</span>
                </PixelButton>
              );
            })}
          </div>
        </PixelCardContent>
      </PixelCard>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredClips.map((clip) => (
          <PixelCard key={clip.id} className="overflow-hidden">
            <div className="relative bg-muted aspect-[9/16] flex items-center justify-center cursor-pointer group">
              <Play className="w-12 h-12 text-muted-foreground group-hover:scale-110 transition-transform" />
              
              {/* Tags */}
              <div className="absolute top-2 right-2 flex gap-1 flex-wrap">
                {clip.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="bg-foreground text-background px-1 py-0.5 text-xs font-pixel">
                    {tag}
                  </span>
                ))}
                {clip.tags.length > 2 && (
                  <span className="bg-foreground text-background px-1 py-0.5 text-xs font-pixel">
                    +{clip.tags.length - 2}
                  </span>
                )}
              </div>
              
              {/* Duration */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-pixel bg-foreground text-background px-1 py-0.5">
                <Clock className="w-3 h-3" />
                {clip.duration}
              </div>
            </div>
            
            <PixelCardContent className="space-y-3">
              <div>
                <p className="font-pixel text-sm truncate font-semibold">{clip.filename}</p>
                <p className="text-xs text-muted-foreground font-pixel">{clip.createdAt}</p>
                <p className="text-xs text-muted-foreground font-pixel truncate">{clip.streamSource}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-pixel text-muted-foreground">
                <span>{clip.views.toLocaleString()} views</span>
                <span>{clip.downloads} downloads</span>
              </div>
              
              <div className="flex gap-2">
                <PixelButton 
                  size="sm" 
                  onClick={() => downloadClip(clip)}
                  className="flex-1"
                >
                  <Download className="w-3 h-3" />
                </PixelButton>
                <PixelButton 
                  size="sm" 
                  variant="secondary"
                  onClick={() => shareClip(clip)}
                >
                  <Share2 className="w-3 h-3" />
                </PixelButton>
              </div>
            </PixelCardContent>
          </PixelCard>
        ))}
      </div>

      {filteredClips.length === 0 && (
        <PixelCard className="text-center py-12">
          <PixelCardContent>
            <LibraryIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-pixel-lg text-lg mb-2">No clips found</h3>
            <p className="text-muted-foreground font-pixel text-sm">
              {searchQuery ? 'Try a different search term.' : 'Generate your first clips to build your library.'}
            </p>
          </PixelCardContent>
        </PixelCard>
      )}

      {/* Share Modal */}
      <PixelModal open={!!shareModalClip} onOpenChange={() => setShareModalClip(null)}>
        <PixelModalContent>
          <PixelModalHeader>
            <PixelModalTitle>Share Clip</PixelModalTitle>
            <PixelModalDescription>
              Share {shareModalClip?.filename} with the world.
            </PixelModalDescription>
          </PixelModalHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block font-pixel text-sm mb-2">Share Link</label>
              <div className="flex gap-2">
                <PixelInput
                  value={`https://klipit.fun/clip/${shareModalClip?.id}`}
                  readOnly
                  className="flex-1"
                />
                <PixelButton onClick={copyShareLink}>Copy</PixelButton>
              </div>
            </div>
            
            <div>
              <label className="block font-pixel text-sm mb-2">Social Platforms</label>
              <div className="space-y-2">
                {[
                  { name: 'TikTok', disabled: true },
                  { name: 'Instagram Reels', disabled: true },
                  { name: 'YouTube Shorts', disabled: true }
                ].map(platform => (
                  <PixelButton
                    key={platform.name}
                    variant="secondary"
                    size="sm"
                    disabled={platform.disabled}
                    className="w-full justify-between"
                  >
                    Open on {platform.name}
                    <span className="text-xs opacity-60">Coming Soon</span>
                  </PixelButton>
                ))}
              </div>
            </div>
          </div>
        </PixelModalContent>
      </PixelModal>
    </div>
  );
};

export default Library;