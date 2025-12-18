import React, { useState, useEffect } from 'react';
import { Play, Pause, Upload, Wand2, Music, Loader2 } from 'lucide-react';
import { MOCK_WAVEFORM_DATA } from '../../constants';

const DemoPreview: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [progress, setProgress] = useState(30);

  // Fake Playback Progress
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleApply = (prompt: string) => {
    if (!prompt) return;
    setIsProcessing(true);
    setInputValue(prompt);
    
    // Simulate AI Latency
    setTimeout(() => {
      setIsProcessing(false);
      setActivePrompt(prompt);
      setIsPlaying(true); // Auto play on success
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply(inputValue);
    }
  };

  return (
    <section id="demo" className="py-24 bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/50 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block py-1.5 px-4 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-6">
            Preview — Demo Visuals
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Try it yourself.</h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Experience the workflow. No latency, just pure creative control.
          </p>
        </div>

        {/* Main Interface Mockup */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-800 bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform hover:scale-[1.01] transition-transform duration-700">
          
          {/* Mock Header */}
          <div className="h-14 border-b border-zinc-800 bg-zinc-900/30 flex items-center justify-between px-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-zinc-700" />
                 <div className="w-3 h-3 rounded-full bg-zinc-700" />
                 <div className="w-3 h-3 rounded-full bg-zinc-700" />
               </div>
               <div className="h-6 w-px bg-zinc-800 mx-2" />
               <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                 <Music size={14} />
                 <span>Neon_Nights_Demo.mp3</span>
               </div>
            </div>
            
            <button className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors">
              <Upload size={14} />
              <span>Upload Track</span>
            </button>
          </div>

          {/* Visualization Area */}
          <div className="relative h-64 bg-black w-full flex items-center justify-center px-8 group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
            
            {/* Status Indicator */}
            <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-500 flex items-center gap-2 ${
              activePrompt 
                ? 'bg-emerald-900/20 border-emerald-500/30 opacity-100 translate-y-0' 
                : 'bg-zinc-800/20 border-zinc-700/30 opacity-0 -translate-y-2'
            }`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">
                {activePrompt === "Remove drums" ? "🚫 Drums Removed" : "✨ AI Active"}
              </span>
            </div>

            {/* Bars */}
            <div className="flex items-end justify-center gap-[2px] w-full h-32 opacity-80">
              {MOCK_WAVEFORM_DATA.map((point, i) => {
                // Determine height based on playing state to simulate movement
                const isActive = i > progress && i < progress + 20;
                const baseHeight = point.value;
                const height = isPlaying 
                  ? Math.max(10, baseHeight + Math.sin(Date.now() / 200 + i) * 20) 
                  : baseHeight;
                
                // Color change based on active prompt
                const isModified = activePrompt && i % 3 === 0; // Simulate removed frequencies
                
                return (
                  <div 
                    key={i} 
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isModified 
                        ? 'bg-zinc-800 h-[10%]' // Dimmed/Removed
                        : activePrompt 
                           ? 'bg-gradient-to-t from-emerald-900 to-emerald-500' // Active State
                           : 'bg-gradient-to-t from-zinc-800 to-zinc-400' // Default State
                    }`}
                    style={{ height: `${isModified ? 10 : height}%` }}
                  />
                );
              })}
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                 <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <Play className="ml-1 fill-current" />
                 </div>
              </div>
            )}
          </div>

          {/* Controls & Input */}
          <div className="p-6 md:p-8 bg-zinc-900/20 border-t border-zinc-800 relative">
            
            {/* Scrubber */}
            <div className="flex items-center gap-4 mb-8 text-xs font-mono text-zinc-500">
              <span>0:{Math.floor(progress).toString().padStart(2, '0')}</span>
              <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden relative">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-white transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }} 
                />
              </div>
              <span>3:45</span>
            </div>

            {/* Magic Input */}
            <div className="relative max-w-xl mx-auto">
              <div className="flex gap-2 mb-3 justify-center">
                 <button 
                   onClick={() => handleApply("Remove drums")}
                   className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                 >
                   Remove drums
                 </button>
                 <button 
                   onClick={() => handleApply("Isolate vocals")}
                   className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                 >
                   Isolate vocals
                 </button>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  {isProcessing ? (
                    <Loader2 className="h-5 w-5 text-indigo-500 animate-spin" />
                  ) : (
                    <Wand2 className={`h-5 w-5 ${activePrompt ? 'text-emerald-500' : 'text-zinc-500'}`} />
                  )}
                </div>
                
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  disabled={isProcessing}
                  className="w-full bg-black/50 border border-zinc-700 text-white pl-12 pr-28 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono text-sm transition-all placeholder:text-zinc-600"
                />
                
                <button 
                  onClick={() => handleApply(inputValue)}
                  disabled={isProcessing || !inputValue}
                  className="absolute inset-y-2 right-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Generate'}
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoPreview;