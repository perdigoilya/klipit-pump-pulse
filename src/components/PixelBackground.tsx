import React from 'react';
import { Camera, Gamepad2, MessageCircle, Coins, Pill } from 'lucide-react';

const PixelBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating pixel icons */}
      <div className="absolute top-10 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
        <Coins className="w-8 h-8 text-foreground opacity-20" />
      </div>
      <div className="absolute top-20 right-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
        <Camera className="w-6 h-6 text-foreground opacity-30" />
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>
        <Gamepad2 className="w-10 h-10 text-foreground opacity-15" />
      </div>
      <div className="absolute bottom-20 right-32 animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.5s' }}>
        <MessageCircle className="w-7 h-7 text-foreground opacity-25" />
      </div>
      <div className="absolute top-1/2 left-32 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}>
        <Coins className="w-5 h-5 text-foreground opacity-10" />
      </div>
      <div className="absolute top-1/3 right-10 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.2s' }}>
        <Pill className="w-9 h-9 text-foreground opacity-20" />
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
};

export default PixelBackground;