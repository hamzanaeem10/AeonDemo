import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

const Comparison: React.FC = () => {
  return (
    <section className="py-32 bg-surface/30 border-y border-zinc-800/50 backdrop-blur-sm relative overflow-hidden">
      {/* Ambient background glow for the section */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Copy */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
              Stems are rigid. <br/>Aeon is fluid.
            </h2>
            <p className="text-zinc-400 text-xl leading-relaxed font-light mb-8">
              Music isn't just four fixed boxes. It's nuance, texture, and feeling. 
              <br /><br />
              Legacy splitters force you to compromise. Aeon understands your intent.
            </p>
          </div>

          {/* Right Side: The Premium Card */}
          <div className="relative group perspective-1000">
            {/* Animated Glow Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-zinc-700 to-zinc-950 rounded-[2rem] opacity-30 blur-sm group-hover:opacity-60 transition duration-1000"></div>
            
            <div className="relative bg-[#050505] rounded-[1.8rem] border border-zinc-800/80 overflow-hidden shadow-2xl">
               
               {/* Traditional Section (Dimmed/Recessed) */}
               <div className="px-8 py-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/30">
                  <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Traditional</span>
                  <span className="text-zinc-700 font-display text-lg line-through decoration-zinc-800 decoration-2">4 Fixed Stems</span>
               </div>

               {/* Pulse Section (Highlighted/Active) */}
               <div className="p-8 relative bg-gradient-to-b from-transparent to-zinc-900/20">
                  {/* Subtle highlight glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-10">
                     <span className="text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]"></span>
                        Aeon Model
                     </span>
                     <div className="flex items-center gap-2 text-indigo-400">
                        <Sparkles size={14} />
                        <span className="font-display text-lg font-medium text-white tracking-tight">Infinite Possibilities</span>
                     </div>
                  </div>

                  {/* Prompt Terminal List */}
                  <div className="space-y-3 relative">
                     {/* Decorative vertical line */}
                     <div className="absolute left-[6px] top-2 bottom-2 w-px bg-zinc-800/50"></div>

                     {[
                        "Remove the crowd noise",
                        "Isolate the rhythm guitar",
                        "Keep only the kick drum and sub"
                     ].map((prompt, i) => (
                        <div key={i} className="flex items-center gap-4 group/line pl-0.5">
                           <Terminal size={14} className="text-zinc-700 group-hover/line:text-indigo-500 transition-colors shrink-0" />
                           <p className="font-mono text-sm text-zinc-500 group-hover/line:text-zinc-200 transition-colors">
                              "{prompt}"
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;