
import React, { useState } from 'react';
import { generateSystemRules } from './services/geminiService';
import { SystemConfig, RuleSet } from './types';
import { CodeBlock } from './components/CodeBlock';
import { RoutingVisualizer } from './components/RoutingVisualizer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [ruleSet, setRuleSet] = useState<RuleSet | null>(null);
  const [config, setConfig] = useState<SystemConfig>({
    wslEnabled: false,
    packageManager: 'scoop',
    customProjectPath: '',
    defaultShell: 'pwsh',
    includePathRules: true,
    includeCommandRules: true,
    includeWSLRules: true,
    refineLogging: true,
    aiPersona: 'architect',
    securityStrictness: 'medium'
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateSystemRules(config);
      setRuleSet(result);
    } catch (error) {
      console.error("Failed to generate rules:", error);
      alert("Error generating rules. Ensure you are using a valid Gemini API key in the environment.");
    } finally {
      setLoading(false);
    }
  };

  const Toggle = ({ label, value, onChange, description, icon }: { label: string, value: boolean, onChange: () => void, description?: string, icon?: string }) => (
    <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-500 transition-all duration-300 group">
      <div className="flex gap-3 items-center">
        {icon && <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>}
        <div className="flex-1">
          <span className="font-semibold text-slate-200 text-sm block">{label}</span>
          {description && <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{description}</p>}
        </div>
      </div>
      <button 
        onClick={onChange}
        className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${value ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-slate-700'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 selection:bg-blue-500/30 font-sans tracking-tight">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(30,58,138,0.1),transparent)] pointer-events-none"></div>

      {/* Header */}
      <header className="bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 group">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-500 border border-white/10">
              <span className="text-xl font-black text-white italic">A</span>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-white">AGENTIC<span className="text-blue-500">WIN11</span></h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none">Command Layer Studio</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#routing" className="hover:text-blue-400 transition-colors">Architecture</a>
            <a href="#config" className="hover:text-blue-400 transition-colors">Configuration</a>
            <a href="#setup" className="hover:text-blue-400 transition-colors">Bootstrap</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-16">
        <section className="mb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black mb-8 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Engine Active: Gemini 3 Flash
            </div>
            <h2 className="text-6xl font-black mb-8 bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-transparent leading-[1.1] tracking-tighter">
              Bridges for your <br/><span className="text-blue-500">Digital Mind.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Transform your CLI into a persistent agentic environment. Configure path mapping, shell intelligence, and memory loops in one unified layer.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <RoutingVisualizer />
          </div>
        </section>

        <section id="config" className="mb-20 scroll-mt-24">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column: Input Settings */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-900/80 border border-white/5 rounded-[2rem] p-8 shadow-3xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                    <span className="text-blue-500 text-2xl">⚙️</span> Configurator
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent ml-4"></div>
                </div>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Package Ecosystem</label>
                      <select 
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 text-slate-200 text-sm appearance-none outline-none cursor-pointer hover:border-slate-500 transition-colors"
                        value={config.packageManager}
                        onChange={(e) => setConfig({...config, packageManager: e.target.value as any})}
                      >
                        <option value="scoop">Scoop (Mainline)</option>
                        <option value="winget">WinGet (Official)</option>
                        <option value="choco">Chocolatey</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Host Shell</label>
                      <select 
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 text-slate-200 text-sm appearance-none outline-none cursor-pointer hover:border-slate-500 transition-colors"
                        value={config.defaultShell}
                        onChange={(e) => setConfig({...config, defaultShell: e.target.value as any})}
                      >
                        <option value="pwsh">PowerShell Core</option>
                        <option value="powershell">Windows PS</option>
                        <option value="cmd">Legacy Command</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">AI Agent Persona</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['architect', 'hacker', 'assistant'].map(p => (
                        <button
                          key={p}
                          onClick={() => setConfig({...config, aiPersona: p as any})}
                          className={`py-3 rounded-xl border text-[10px] font-bold uppercase transition-all ${config.aiPersona === p ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Protocol Modules</label>
                    <div className="grid grid-cols-1 gap-3">
                      <Toggle 
                        icon="📂"
                        label="Windows Pathing" 
                        value={config.includePathRules} 
                        onChange={() => setConfig({...config, includePathRules: !config.includePathRules})}
                        description="Strict path variables ($env:AppData, etc)"
                      />
                      <Toggle 
                        icon="🐚"
                        label="Shell Synthesis" 
                        value={config.includeCommandRules} 
                        onChange={() => setConfig({...config, includeCommandRules: !config.includeCommandRules})}
                        description="Optimized aliases and execution scripts"
                      />
                      <Toggle 
                        icon="🐧"
                        label="WSL/Linux Linkage" 
                        value={config.includeWSLRules} 
                        onChange={() => setConfig({...config, includeWSLRules: !config.includeWSLRules, wslEnabled: !config.includeWSLRules})}
                        description="Auto-translate /mnt/c/ to Windows paths"
                      />
                      <Toggle 
                        icon="✍️"
                        label="Refined Logging" 
                        value={config.refineLogging} 
                        onChange={() => setConfig({...config, refineLogging: !config.refineLogging})}
                        description="Observation-Thought-Action loop logic"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="group relative w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black rounded-3xl transition-all shadow-2xl shadow-blue-900/50 active:scale-[0.98] uppercase tracking-[0.2em] text-[11px]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {loading ? (
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : (
                        <span className="text-lg">⚡</span>
                      )}
                      {loading ? 'Synthesizing Protocols...' : 'Generate Agentic Rules'}
                    </span>
                    <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Generated Output */}
            <div className="lg:col-span-7">
              {ruleSet ? (
                <div className="bg-slate-900/60 border border-white/5 rounded-[2rem] p-8 shadow-3xl backdrop-blur-md animate-in fade-in zoom-in duration-700">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-white/5">
                    <div>
                      <h4 className="text-3xl font-black text-white tracking-tighter">{ruleSet.title}</h4>
                      <p className="text-sm text-slate-500 mt-1 font-medium">{ruleSet.description}</p>
                    </div>
                    <button 
                      onClick={() => {
                        const content = `# GEMINI.md Persistent Memory\n\n## Init Script\n\`\`\`${config.defaultShell}\n${ruleSet.initScript}\n\`\`\`\n\n## Logging Template\n\`\`\`markdown\n${ruleSet.logTemplate}\n\`\`\`\n\n## Rules catalog\n${ruleSet.rules.map(r => `### [${r.importance.toUpperCase()}] ${r.category}\n- ${r.rule}\n- Context: ${r.contextTip || 'General dev guidance'}${r.commandSnippet ? `\n\n\`\`\`powershell\n${r.commandSnippet}\n\`\`\`` : ''}`).join('\n\n')}`;
                        navigator.clipboard.writeText(content);
                        alert("Ruleset successfully compiled and copied.");
                      }}
                      className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-xl active:scale-95"
                    >
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      Copy All to GEMINI.md
                    </button>
                  </div>

                  <div className="space-y-12 max-h-[800px] overflow-y-auto pr-6 custom-scrollbar scroll-smooth">
                    {/* Log Template Highlight */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                         <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Advanced Memory Template</label>
                      </div>
                      <div className="p-6 bg-slate-950/80 border border-emerald-500/20 rounded-3xl font-mono text-sm text-emerald-400/80 leading-relaxed italic shadow-inner">
                        {ruleSet.logTemplate}
                      </div>
                    </div>

                    {/* Rules Grid */}
                    <div className="space-y-6">
                       <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-3 px-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        Generated Rules Catalog
                      </label>
                      <div className="grid grid-cols-1 gap-6">
                        {ruleSet.rules.map((rule, idx) => (
                          <div key={idx} className="group p-6 bg-white/[0.02] hover:bg-white/[0.04] rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500">
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-[9px] px-3 py-1 rounded-lg font-black uppercase tracking-[0.15em] ${
                                rule.importance === 'high' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 
                                rule.importance === 'medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                              }`}>
                                {rule.importance} PRIORITY
                              </span>
                              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{rule.category}</span>
                            </div>
                            <h5 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                              {rule.rule}
                            </h5>
                            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium italic opacity-70">
                              Tip: {rule.contextTip}
                            </p>
                            {rule.commandSnippet && (
                              <div className="relative group/code">
                                <div className="bg-black/60 rounded-2xl p-5 border border-white/5 font-mono text-xs text-blue-400/90 overflow-x-auto whitespace-pre leading-relaxed shadow-xl">
                                  {rule.commandSnippet}
                                </div>
                                <div className="absolute top-3 right-3 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                   <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white">Copy Snippet</button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-16 bg-slate-900/40 border-2 border-dashed border-white/5 rounded-[3rem] group hover:border-blue-500/20 transition-all duration-700">
                  <div className="w-28 h-28 bg-white/5 rounded-full flex items-center justify-center mb-10 shadow-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 border border-white/5">
                    <span className="text-5xl drop-shadow-lg">🛸</span>
                  </div>
                  <h4 className="font-black text-2xl text-white mb-4 tracking-tighter">Waiting for Synthesis</h4>
                  <p className="text-sm text-slate-500 max-w-sm leading-relaxed font-medium">
                    Customize your local environment specs on the left. The AI will then generate a tailored GEMINI.md protocol for your project.
                  </p>
                  <div className="mt-8 flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Setup Guide - Refined */}
        <section id="setup" className="scroll-mt-24 mb-20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border border-white/5 rounded-[3rem] p-12 overflow-hidden relative group shadow-3xl">
          <div className="absolute -top-24 -right-24 p-8 opacity-5 group-hover:opacity-10 transition-all duration-1000 rotate-12 group-hover:rotate-0">
            <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M11 2h2v2h-2V2M4 7h2v2H4V7m14 0h2v2h-2V7M2 12h2v2H2v-2m18 0h2v2h-2v-2M4 17h2v2H4v-2m14 0h2v2h-2v-2m-7 3h2v2h-2v-2z"></path></svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
              <h2 className="text-4xl font-black text-white tracking-tighter">Bootstrap Protocol</h2>
              <div className="flex gap-4">
                 <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">One-time Deployment</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="space-y-10 lg:col-span-2">
                <div className="group/step">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-sm border border-blue-500/20 group-hover/step:scale-110 transition-transform">01</span>
                    <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Persistent Context Linking</h4>
                  </div>
                  <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed max-w-md">Run this once in your project root to link your project's memory to a system-wide global brain.</p>
                  <CodeBlock code={`$globalMemory = "$HOME\\GEMINI.md"\nif (!(Test-Path $globalMemory)) { New-Item -Path $globalMemory -ItemType File }\nNew-Item -ItemType SymbolicLink -Path ".\\GEMINI.md" -Target $globalMemory`} />
                </div>
                
                <div className="group/step">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm border border-emerald-500/20 group-hover/step:scale-110 transition-transform">02</span>
                    <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Environment Hardening</h4>
                  </div>
                  <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed max-w-md">Securely store your API keys in the Windows User Profile for session-agnostic access.</p>
                  <CodeBlock code={`setx OPENROUTER_API_KEY "your_key"\nsetx GOOGLE_API_KEY "your_key"`} />
                </div>
              </div>

              <div className="bg-slate-950/40 p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-10 h-10 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-black text-sm border border-yellow-500/20">03</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Agent Function</h4>
                </div>
                <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed italic">
                  Inject this into your <code className="text-white px-2 py-0.5 bg-slate-800 rounded text-[11px]">$PROFILE</code> to activate the 'g' command.
                </p>
                <CodeBlock code={`function g {\n    param([string]$prompt)\n    $log = "## [$(Get-Date -Format 'HH:mm')] $prompt"\n    $log | Add-Content ".\\GEMINI.md"\n    gemini $prompt\n}`} />
                <div className="mt-8 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <p className="text-[10px] text-blue-400 font-bold leading-relaxed uppercase tracking-wider">
                    Tip: Use 'g "your request"' to invoke the layer with automatic persistent memory logging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 pt-20 border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
           <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-transparent"></div>
           <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white">
             System-Level Agentic Layer • v3.0 Preview • Optimized for Win11
           </p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.5s ease-out forwards; }
      `}} />
    </div>
  );
};

export default App;
