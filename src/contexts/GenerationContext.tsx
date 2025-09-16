import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GenerationContextType {
  isGenerating: boolean;
  progress: number;
  progressText: string;
  hasError: boolean;
  errorMessage: string;
  streamUrl: string;
  startGeneration: (url: string) => void;
  resetGeneration: () => void;
}

const GenerationContext = createContext<GenerationContextType | undefined>(undefined);

export const useGeneration = () => {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error('useGeneration must be used within a GenerationProvider');
  }
  return context;
};

interface GenerationProviderProps {
  children: ReactNode;
}

export const GenerationProvider: React.FC<GenerationProviderProps> = ({ children }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [streamUrl, setStreamUrl] = useState('');

  const startGeneration = (url: string) => {
    setStreamUrl(url);
    setIsGenerating(true);
    setProgress(0);
    setProgressText('Initializing clip generation...');
    setHasError(false);
    setErrorMessage('');

    // Simulate 8-minute generation process with realistic steps
    const steps = [
      { progress: 5, text: 'Connecting to stream...', delay: 2000 },
      { progress: 12, text: 'Analyzing video content...', delay: 8000 },
      { progress: 25, text: 'Detecting highlight moments...', delay: 15000 },
      { progress: 35, text: 'Processing audio tracks...', delay: 12000 },
      { progress: 48, text: 'Applying AI filters...', delay: 20000 },
      { progress: 62, text: 'Generating thumbnails...', delay: 18000 },
      { progress: 75, text: 'Optimizing video quality...', delay: 25000 },
      { progress: 85, text: 'Preparing final clips...', delay: 22000 },
      { progress: 92, text: 'Uploading to servers...', delay: 15000 },
      { progress: 97, text: 'Finalizing upload...', delay: 30000 }, // Gets stuck here
    ];

    let currentStep = 0;
    
    const executeStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setProgress(step.progress);
        setProgressText(step.text);
        
        // Special handling for the 97% stuck point
        if (step.progress === 97) {
          setTimeout(() => {
            // Show error after being stuck at 97%
            setHasError(true);
            setErrorMessage('Error communicating with S3 servers');
            setIsGenerating(false);
          }, step.delay);
        } else {
          setTimeout(() => {
            currentStep++;
            executeStep();
          }, step.delay);
        }
      }
    };

    executeStep();
  };

  const resetGeneration = () => {
    setIsGenerating(false);
    setProgress(0);
    setProgressText('');
    setHasError(false);
    setErrorMessage('');
  };

  return (
    <GenerationContext.Provider
      value={{
        isGenerating,
        progress,
        progressText,
        hasError,
        errorMessage,
        streamUrl,
        startGeneration,
        resetGeneration,
      }}
    >
      {children}
    </GenerationContext.Provider>
  );
};