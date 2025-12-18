import React from 'react';
import { Music, Headphones, Layers, GraduationCap, Search } from 'lucide-react';
import { USE_CASES } from '../../constants';

const icons: Record<string, React.ReactNode> = {
  practice: <Music className="w-6 h-6" />,
  ear_training: <Headphones className="w-6 h-6" />,
  education: <GraduationCap className="w-6 h-6" />,
  analysis: <Layers className="w-6 h-6" />,
  exploration: <Search className="w-6 h-6" />,
};

const UseCases: React.FC = () => {
  return (
    <section id="use-cases" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">A new way of listening.</h2>
          <p className="text-zinc-400 text-lg font-light">Precision tools for every musician.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((useCase, index) => {
            const isPrimary = index === 0;
            return (
              <div 
                key={index} 
                className={`p-8 rounded-3xl border transition-all duration-300 group ${
                  isPrimary 
                    ? "md:col-span-2 bg-zinc-900/50 border-zinc-700 hover:bg-zinc-900" 
                    : "bg-surface/30 border-zinc-800/50 hover:bg-zinc-900/30 hover:border-zinc-700"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  isPrimary
                    ? "bg-white text-black"
                    : "bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:text-white"
                }`}>
                  {icons[useCase.icon]}
                </div>
                <h3 className={`font-display font-bold text-white mb-3 ${isPrimary ? "text-2xl" : "text-xl"}`}>
                  {useCase.title}
                </h3>
                <p className={`font-light leading-relaxed ${isPrimary ? "text-zinc-300 text-lg" : "text-zinc-500"}`}>
                  {useCase.description}
                </p>
              </div>
            );
          })}
          
          {/* Subtle CTA Card */}
          <div className="p-8 rounded-3xl border border-dashed border-zinc-800/50 flex flex-col items-center justify-center text-center opacity-50 hover:opacity-100 transition-opacity">
            <p className="text-zinc-500 text-sm font-medium">And more...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;