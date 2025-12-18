import React from 'react';
import { Upload, Mic, Music } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: "1. Drop any track",
    description: "MP3, WAV, FLAC. No prep needed."
  },
  {
    icon: Mic,
    title: "2. Ask naturally",
    description: "Just type 'Remove drums' or 'Solo guitar'.",
    badge: "AI Powered"
  },
  {
    icon: Music,
    title: "3. Practice",
    description: "Instant custom backing tracks. Ready to loop."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface/30 border-y border-zinc-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative group">
              <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 shadow-2xl group-hover:border-zinc-700 transition-all duration-500 relative z-10">
                <step.icon size={28} className="text-zinc-400 group-hover:text-white transition-colors duration-300" />
                {step.badge && (
                  <span className="absolute -top-3 -right-3 bg-zinc-800 text-zinc-300 border border-zinc-700 text-[9px] uppercase font-bold tracking-widest px-2 py-1 rounded-full shadow-lg">
                    {step.badge}
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-500 leading-relaxed px-4 text-sm font-medium">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;