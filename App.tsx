
import React, { useState, useCallback } from 'react';
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
    defaultShell: 'pwsh'
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

  const getPowershellInitCode = () => {
    return `# 1. Create the global memory file in your User profile
$globalMemory = "$HOME\\GEMINI.md"
if (!(Test-Path $globalMemory)) {
    New-Item -Path $globalMemory -ItemType File -Force
    Set-Content -Path $globalMemory -Value "# 🧠 SYSTEM-WIDE AI MEMORY\`nInitialized: $(Get-Date -Format G)"
}

# 2. Link the global file to your current project directory
New-Item -ItemType SymbolicLink -Path ".\\GEMINI.md" -Target $globalMemory`;
  };

  const getWrapperFunctionCode = () => {
    return `function g {
    param([string]$prompt)
    
    # 1. Log Thought
    "## [$(Get-Date -Format 'HH:mm:ss')] Task: $prompt" | Add-Content ".\\GEMINI.md"

    # 2. Decision Logic
    if ($prompt -match "logic|code|math") {
        $env:GEMINI_MODEL = "deepseek/deepseek-r1"
        Write-Host "🤖 Routing to Reasoning Engine" -ForegroundColor Cyan
    } else {
        $env:GEMINI_MODEL = "google/gemini-2.0-flash-lite:free"
        Write-Host "⚡ Using Fast Mode" -ForegroundColor Green
    }

    # 3. Execution
    try {
        gemini $prompt
    } catch {
        Write-Host "⚠️ Retrying with Fallback..." -ForegroundColor Yellow
        $env:GEMINI_MODEL = "meta-llama/llama-3.1-405b"
        gemini "Fix failure: $prompt"
    }
}`;
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold">G</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Agentic Win11 <span className="text-blue-400">Layer</span></h1>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#setup" className="hover:text-blue-400 transition-colors">Setup</a>
            <a href="#generator" className="hover:text-blue-400 transition-colors">Rule Generator</a>
            <a href="#visualizer" className="hover:text-blue-400 transition-colors">Routing</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        {/* Intro Section */}
        <section className="mb-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Hybrid Agentic Super-Wrapper
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Transform your Windows Terminal into a proactive, self-correcting assistant. 
              This layer routes tasks based on complexity, manages persistent context via <code className="text-blue-400">GEMINI.md</code>, 
              and ensures failure-proof execution through intelligent model switching.
            </p>
          </div>
        </section>

        <RoutingVisualizer />

        {/* Setup Guide Section */}
        <section id="setup" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-slate-800"></div>
            <h2 className="text-2xl font-bold text-slate-200">1. Environment Setup</h2>
            <div className="h-px flex-1 bg-slate-800"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Initialize Persistent Memory</h3>
                <p className="text-sm text-slate-400 mb-4">Run this in your project root to link your project's AI context to a system-wide scratchpad.</p>
                <CodeBlock code={getPowershellInitCode()} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Set Persistent Keys</h3>
                <p className="text-sm text-slate-400 mb-4">Store your API keys permanently for use across sessions.</p>
                <CodeBlock code={`setx OPENROUTER_API_KEY "your_key_here"\nsetx GOOGLE_API_KEY "your_key_here"`} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Deploy the 'g' Wrapper</h3>
              <p className="text-sm text-slate-400 mb-4">Add this to your <code className="text-slate-200">$PROFILE</code> to enable the agentic routing logic in every terminal window.</p>
              <CodeBlock code={getWrapperFunctionCode()} />
            </div>
          </div>
        </section>

        {/* Rule Generator Section */}
        <section id="generator" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-slate-800"></div>
            <h2 className="text-2xl font-bold text-slate-200">2. GEMINI.md Rule Generator</h2>
            <div className="h-px flex-1 bg-slate-800"></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-6">Configure Your Environment</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Main Package Manager</label>
                      <select 
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200"
                        value={config.packageManager}
                        onChange={(e) => setConfig({...config, packageManager: e.target.value as any})}
                      >
                        <option value="scoop">Scoop (Recommended for Devs)</option>
                        <option value="winget">WinGet (Official Windows)</option>
                        <option value="choco">Chocolatey</option>
                        <option value="none">None / Manual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Primary Shell</label>
                      <select 
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200"
                        value={config.defaultShell}
                        onChange={(e) => setConfig({...config, defaultShell: e.target.value as any})}
                      >
                        <option value="pwsh">PowerShell Core (v7+)</option>
                        <option value="powershell">Windows PowerShell (v5.1)</option>
                        <option value="cmd">Legacy Command Prompt</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                      <div>
                        <span className="font-medium text-slate-200">Enable WSL2 Context?</span>
                        <p className="text-xs text-slate-500">Includes rules for cross-system path translation.</p>
                      </div>
                      <button 
                        onClick={() => setConfig({...config, wslEnabled: !config.wslEnabled})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${config.wslEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${config.wslEnabled ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={loading}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Synthesizing Rules...
                        </span>
                      ) : 'Generate Model Rules'}
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[400px]">
                  {ruleSet ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-xl">{ruleSet.title}</h4>
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">AI Generated</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-6">{ruleSet.description}</p>
                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {ruleSet.rules.map((rule, idx) => (
                          <div key={idx} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50">
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{rule.category}</span>
                            <p className="text-sm mt-1 mb-2 font-medium">{rule.rule}</p>
                            {rule.commandSnippet && (
                              <code className="block p-2 bg-slate-900 rounded text-xs mono text-yellow-500 border border-slate-700">
                                {rule.commandSnippet}
                              </code>
                            )}
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          const content = `# Rules for GEMINI.md\n\n${ruleSet.rules.map(r => `## ${r.category}\n- ${r.rule}\n${r.commandSnippet ? `\n\`\`\`powershell\n${r.commandSnippet}\n\`\`\`` : ''}`).join('\n\n')}`;
                          navigator.clipboard.writeText(content);
                          alert("Full Ruleset Copied to Clipboard!");
                        }}
                        className="mt-6 w-full py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm hover:bg-slate-700 transition-colors"
                      >
                        Copy Full Ruleset to GEMINI.md
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-800 rounded-3xl">
                      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">🧠</span>
                      </div>
                      <h4 className="font-bold text-slate-300 mb-2">No Rules Generated Yet</h4>
                      <p className="text-sm text-slate-500">Customize your configuration on the left and click Generate to build your context rules.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Synergy Footer Info */}
        <section className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border border-indigo-500/20 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Unstoppable Synergy</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            The Hybrid Agentic Layer isn't just a script; it's an extension of your operating system. 
            By centralizing memory in <code className="text-slate-200">GEMINI.md</code>, your AI agents maintain context across reboots, 
            terminals, and even IDE instances.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-slate-900 rounded-full border border-slate-800 text-xs text-slate-400">Windows 11 Taskbar Integration</div>
            <div className="px-4 py-2 bg-slate-900 rounded-full border border-slate-800 text-xs text-slate-400">VS Code Terminal Ready</div>
            <div className="px-4 py-2 bg-slate-900 rounded-full border border-slate-800 text-xs text-slate-400">Cross-Platform (WSL2) Compatible</div>
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-800 py-10 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Windows 11 Agentic Layer Dashboard. Optimized for PowerShell Core.</p>
      </footer>
    </div>
  );
};

export default App;
