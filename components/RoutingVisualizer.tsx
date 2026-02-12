
import React from 'react';

const RoutingNode: React.FC<{ title: string; subtitle: string; color: string }> = ({ title, subtitle, color }) => (
  <div className={`p-4 rounded-xl border-2 ${color} bg-slate-800 shadow-xl flex flex-col items-center justify-center text-center w-full max-w-[200px]`}>
    <h4 className="font-bold text-sm mb-1">{title}</h4>
    <p className="text-[10px] text-slate-400 leading-tight">{subtitle}</p>
  </div>
);

const Arrow: React.FC = () => (
  <div className="flex-1 flex items-center justify-center min-w-[20px]">
    <div className="h-0.5 w-full bg-slate-700 relative">
      <div className="absolute right-0 -top-1 border-t-[5px] border-b-[5px] border-l-[8px] border-t-transparent border-b-transparent border-l-slate-700"></div>
    </div>
  </div>
);

export const RoutingVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-8">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <span className="text-blue-400">✦</span> Logic Routing Pipeline
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <RoutingNode 
          title="User Command" 
          subtitle="Prompt sent to 'g' function" 
          color="border-slate-600"
        />
        <Arrow />
        <RoutingNode 
          title="Decision Phase" 
          subtitle="Regex check: logic|code|math" 
          color="border-yellow-500/50"
        />
        <Arrow />
        <div className="flex flex-col gap-4">
          <RoutingNode 
            title="Fast Path" 
            subtitle="Gemini 2.0 Flash Lite" 
            color="border-emerald-500/50"
          />
          <RoutingNode 
            title="Reasoning Path" 
            subtitle="DeepSeek R1" 
            color="border-blue-500/50"
          />
        </div>
        <Arrow />
        <RoutingNode 
          title="Self-Correction" 
          subtitle="Fallback: Llama 3.1 405B" 
          color="border-rose-500/50"
        />
      </div>
    </div>
  );
};
