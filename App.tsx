
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
    refineLogging: true
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateSystemRules(config);
      setRuleSet(result);
    } catch (error) {
      console.error("Failed to generate rules:", error);
      alert("Error generating rules. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const Toggle = ({ label, value, onChange, description }: { label: string, value: boolean, onChange: () => void, description?: string }) => (
    <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
      <div className="flex-1 pr-4">
        <span className="font-medium text-slate-200 text-sm block">{label}</span>
        {description && <p className="text-[10px] text-slate-500 leading-tight">{description}</p>}
      </div>
      <button 
        onClick={onChange}
        className={`w-10 h-5 rounded-full transition-all relative flex-shrink-0 ${value ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-700'}`}
      >
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 selection:bg-blue-500/30">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 shadow-xl shadow-black/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform cursor-pointer">
              <span className="text-xl font-bold text-white">G</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Agentic Win11 <span className="text-blue-400">Layer</span></h1>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#setup" className="hover:text-blue-400 transition-colors">Setup</a>
            <a href="#generator" className="hover:text-blue-400 transition-colors">Configurator</a>
            <a href="#routing" className="hover:text-blue-400 transition-colors">Routing</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        <section className="mb-16 text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6 uppercase tracking-widest">
              v2.0 Agentic Architecture
            </div>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-white to-slate-600 bg-clip-text text-transparent leading-tight">
              A Proactive Assistant for the Power User.
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              Elevate your Windows workflow. This dashboard helps you configure a persistent memory system 
              that bridges the gap between CLI commands and AI intelligence.
            </p>
          </div>
        </section>

        <section id="routing" className="scroll-mt-24">
          <RoutingVisualizer />
        </section>

        <section id="generator" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-black text-white whitespace-nowrap">Core Configurator</h2>
            <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Controls Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                  Environmental Specs
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Package Manager</label>
                      <select 
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 text-slate-200 text-sm appearance-none outline-none"
                        value={config.packageManager}
                        onChange={(e) => setConfig({...config, packageManager: e.target.value as any})}
                      >
                        <option value="scoop">Scoop</option>
                        <option value="winget">WinGet</option>
                        <option value="choco">Choco</option>
                        <option value="none">Manual</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Default Shell</label>
                      <select 
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 text-slate-200 text-sm appearance-none outline-none"
                        value={config.defaultShell}
                        onChange={(e) => setConfig({...config, defaultShell: e.target.value as any})}
                      >
                        <option value="pwsh">PowerShell 7</option>
                        <option value="powershell">Win PS 5.1</option>
                        <option value="cmd">CMD</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Rule Modules</label>
                    <div className="grid grid-cols-1 gap-3">
                      <Toggle 
                        label="Windows Path Rules" 
                        value={config.includePathRules} 
                        onChange={() => setConfig({...config, includePathRules: !config.includePathRules})}
                        description="Rules for AppData, System32, and Profile paths."
                      />
                      <Toggle 
                        label="Shell Commands" 
                        value={config.includeCommandRules} 
                        onChange={() => setConfig({...config, includeCommandRules: !config.includeCommandRules})}
                        description="Alias mapping and execution policies."
                      />
                      <Toggle 
                        label="WSL Path Translation" 
                        value={config.includeWSLRules} 
                        onChange={() => setConfig({...config, includeWSLRules: !config.includeWSLRules, wslEnabled: true})}
                        description="Mapping between /mnt/c/ and C:\"
                      />
                      <Toggle 
                        label="Refined Logging" 
                        value={config.refineLogging} 
                        onChange={() => setConfig({...config, refineLogging: !config.refineLogging})}
                        description="Observation -> Thought -> Action loop template."
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-900/40 active:scale-[0.98] uppercase tracking-widest text-xs"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Synthesizing...
                      </span>
                    ) : 'Compile Agent Rules'}
                  </button>
                </div>
              </div>
            </div>

            {/* Result Panel */}
            <div className="lg:col-span-7">
              {ruleSet ? (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="text-2xl font-bold mb-1">{ruleSet.title}</h4>
                      <p className="text-sm text-slate-500">{ruleSet.description}</p>
                    </div>
                    <button 
                      onClick={() => {
                        const content = `# GEMINI.md Persistent Memory\n\n## Logging Template\n\`\`\`markdown\n${ruleSet.logTemplate}\n\`\`\`\n\n## Agent Rules\n${ruleSet.rules.map(r => `### [${r.importance?.toUpperCase()}] ${r.category}\n- ${r.rule}${r.commandSnippet ? `\n\n\`\`\`powershell\n${r.commandSnippet}\n\`\`\`` : ''}`).join('\n\n')}`;
                        navigator.clipboard.writeText(content);
                        alert("GEMINI.md configuration copied!");
                      }}
                      className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      Copy All
                    </button>
                  </div>

                  <div className="space-y-8 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                    {ruleSet.logTemplate && (
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          Logging Template (Refined)
                        </label>
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-sm text-slate-300 leading-relaxed italic">
                          {ruleSet.logTemplate}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Rule Catalog
                      </label>
                      <div className="grid grid-cols-1 gap-4">
                        {ruleSet.rules.map((rule, idx) => (
                          <div key={idx} className="group p-5 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-slate-500 transition-all">
                            <div className="flex items-center justify-between mb-3">
                              <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${
                                rule.importance === 'high' ? 'bg-rose-500/20 text-rose-400' : 
                                rule.importance === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-500/20 text-slate-400'
                              }`}>
                                {rule.importance}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">{rule.category}</span>
                            </div>
                            <p className="text-sm font-medium text-slate-200 leading-relaxed mb-4 group-hover:text-white transition-colors">
                              {rule.rule}
                            </p>
                            {rule.commandSnippet && (
                              <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800 font-mono text-xs text-blue-400 overflow-x-auto whitespace-pre">
                                {rule.commandSnippet}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl group hover:border-blue-500/30 transition-colors">
                  <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                    <span className="text-4xl">🛸</span>
                  </div>
                  <h4 className="font-bold text-xl text-slate-300 mb-3 tracking-tight">Configuration Pending</h4>
                  <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                    Once you've tailored your system specs, initiate synthesis to generate optimized context rules for your agent.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Actionable PS Setup */}
        <section id="setup" className="scroll-mt-24 mb-20 bg-gradient-to-br from-slate-900 to-indigo-950/20 border border-slate-800 rounded-3xl p-10 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M11 2h2v2h-2V2M4 7h2v2H4V7m14 0h2v2h-2V7M2 12h2v2H2v-2m18 0h2v2h-2v-2M4 17h2v2H4v-2m14 0h2v2h-2v-2m-7 3h2v2h-2v-2z"></path></svg>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-8">Rapid Deployment Guide</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Step 01: Initial Link</h4>
                  <p className="text-sm text-slate-400 mb-4 italic leading-relaxed">Execute once in any new project to link it to the global brain.</p>
                  <CodeBlock code={`$globalMemory = "$HOME\\GEMINI.md"\nNew-Item -ItemType SymbolicLink -Path ".\\GEMINI.md" -Target $globalMemory`} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Step 02: Env Vars</h4>
                  <p className="text-sm text-slate-400 mb-4 italic leading-relaxed">Store credentials securely in the user profile.</p>
                  <CodeBlock code={`setx OPENROUTER_API_KEY "sk-or-v1-..."\nsetx GOOGLE_API_KEY "AIzaSy..."`} />
                </div>
              </div>
              <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
                <h4 className="text-xs font-black text-yellow-400 uppercase tracking-[0.2em] mb-4">Step 03: The Function</h4>
                <p className="text-sm text-slate-400 mb-4 italic leading-relaxed">Paste into <code className="text-slate-200">code $PROFILE</code></p>
                <CodeBlock code={`function g {\n    param([string]$prompt)\n    "## [$(Get-Date -Format 'HH:mm')] $prompt" | Add-Content ".\\GEMINI.md"\n    gemini $prompt\n}`} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 pt-20 border-t border-slate-800 text-center text-slate-600 text-[10px] uppercase tracking-[0.3em] font-bold">
        Designed for Windows 11 & Gemini Flash 2.5 Hybrid Operations
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
    </div>
  );
};

export default App;
