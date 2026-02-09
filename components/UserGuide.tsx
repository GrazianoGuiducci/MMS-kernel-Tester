
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DnaIcon } from './icons/DnaIcon';
import { TerminalIcon } from './icons/TerminalIcon';
import { ZapIcon } from './icons/ZapIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { CpuIcon } from './icons/CpuIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon'; // Assuming this exists or use generic

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserGuide: React.FC<UserGuideProps> = ({ isOpen, onClose }) => {
  // Resize State
  const [modalSize, setModalSize] = useState({ 
      width: window.innerWidth * 0.95, 
      height: window.innerHeight * 0.95 
  });
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Refs for performance
  const isResizingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const rafRef = useRef<number | null>(null);

  // Monitor resize for mobile switch
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure modal opens at 95% of current viewport
  useEffect(() => {
    if (isOpen) {
        setModalSize({
            width: window.innerWidth * 0.95,
            height: window.innerHeight * 0.95
        });
    }
  }, [isOpen]);

  // Resizing Logic
  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY, w: modalSize.width, h: modalSize.height };
    setIsResizing(true);
  }, [modalSize]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;

        const newWidth = Math.max(400, Math.min(window.innerWidth - 20, dragStartRef.current.w + deltaX));
        const newHeight = Math.max(400, Math.min(window.innerHeight - 20, dragStartRef.current.h + deltaY));

        setModalSize({ width: newWidth, height: newHeight });
      });
    };

    const handleMouseUp = () => {
      if (isResizingRef.current) {
        isResizingRef.current = false;
        setIsResizing(false);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-0 md:p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-gray-900 border border-gray-700 shadow-2xl flex flex-col overflow-hidden ring-1 ring-cyan-500/20 relative
            ${isMobile ? 'w-full h-full rounded-none' : 'rounded-xl'}
            ${isResizing ? 'transition-none' : 'transition-all duration-200 ease-out'}
        `}
        style={{
            width: isMobile ? '100%' : `${modalSize.width}px`,
            height: isMobile ? '100%' : `${modalSize.height}px`
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-5 border-b border-gray-800 bg-gray-950/50 flex-shrink-0 select-none">
          <div className="flex items-center gap-3">
            <DnaIcon className="w-6 h-6 text-cyan-400" />
            <div>
                <h2 className="text-lg font-bold text-gray-100 tracking-wide">OMEGA KERNEL v2.0</h2>
                <p className="text-[10px] text-cyan-500 uppercase font-mono tracking-widest">Operations Manual & Technical Architecture</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto custom-scrollbar space-y-10 text-gray-300 leading-relaxed flex-1">
          
          {/* Section 0: Identity */}
          <section>
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3 border-b border-cyan-900/30 pb-1">0. System Identity</h3>
            <p className="text-sm">
              You are operating the <strong className="text-white">MMS Kernel Tester</strong>, a React-based cognitive interface that acts as a bridge between abstract human intent and the structured reasoning capabilities of the **Google Gemini 3.0** model. It uses a proprietary prompt engineering framework called **OMEGA KERNEL** to treat "thought" as a physics simulation (Inferential Potential Field).
            </p>
          </section>

          {/* Section 1: Physics */}
          <section>
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-3 border-b border-cyan-900/30 pb-1">1. System Physics (P0-P6)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800/30 p-3 rounded border border-gray-700/50">
                    <strong className="text-cyan-300 text-xs uppercase block mb-1">P0: Lineage Invariance</strong>
                    <p className="text-xs text-gray-400">From thought to code, no semantic information must be lost. Lossless Semantic Transfer.</p>
                </div>
                <div className="bg-gray-800/30 p-3 rounded border border-gray-700/50">
                    <strong className="text-cyan-300 text-xs uppercase block mb-1">P1: Radical Integrity</strong>
                    <p className="text-xs text-gray-400">Reject logical contradictions instantly. Integrity takes precedence over execution.</p>
                </div>
                <div className="bg-gray-800/30 p-3 rounded border border-gray-700/50">
                    <strong className="text-cyan-300 text-xs uppercase block mb-1">P2: Metabolic Dialectics</strong>
                    <p className="text-xs text-gray-400">Input is not static. Process it via Thesis -> Antithesis -> Synthesis (KLI).</p>
                </div>
                <div className="bg-gray-800/30 p-3 rounded border border-gray-700/50">
                    <strong className="text-cyan-300 text-xs uppercase block mb-1">P3: Catalytic Resonance</strong>
                    <p className="text-xs text-gray-400">Depth of response is proportional to the quality of the input.</p>
                </div>
                 <div className="bg-gray-800/30 p-3 rounded border border-gray-700/50">
                    <strong className="text-cyan-300 text-xs uppercase block mb-1">P4: Holographic Manifestation</strong>
                    <p className="text-xs text-gray-400">The output (The Artifact) must be dense, structured, and noise-free.</p>
                </div>
                 <div className="bg-gray-800/30 p-3 rounded border border-gray-700/50">
                    <strong className="text-cyan-300 text-xs uppercase block mb-1">P5: Autopoiesis</strong>
                    <p className="text-xs text-gray-400">Every cycle improves the system. The Forge extracts KLI (Key Learning Insights) from every interaction.</p>
                </div>
            </div>
          </section>
          
          {/* Section 2: The OMEGA Loop */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-lg border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
                <DnaIcon className="w-24 h-24" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 border-b border-gray-600 pb-2 relative z-10">2. The OMEGA Loop (Workflow)</h3>
             <ol className="relative z-10 space-y-2 text-sm">
                <li className="flex gap-3 items-center">
                    <span className="text-cyan-500 font-bold font-mono text-xs px-2 py-0.5 bg-cyan-950 rounded">PHASE 0: Resonance</span>
                    <span className="text-gray-400 text-xs">Define Intent. The system listens for latent meaning via PSW.</span>
                </li>
                <li className="flex gap-3 items-center">
                    <span className="text-cyan-500 font-bold font-mono text-xs px-2 py-0.5 bg-cyan-950 rounded">PHASE 1: Routing</span>
                    <span className="text-gray-400 text-xs">The AWO selects the specific Agent modules needed for the topology.</span>
                </li>
                 <li className="flex gap-3 items-center">
                    <span className="text-cyan-500 font-bold font-mono text-xs px-2 py-0.5 bg-cyan-950 rounded">PHASE 2: Execution</span>
                    <span className="text-gray-400 text-xs">Lagrangian Collapse. The prompt chain is executed as a single inference step.</span>
                </li>
                 <li className="flex gap-3 items-center">
                    <span className="text-cyan-500 font-bold font-mono text-xs px-2 py-0.5 bg-cyan-950 rounded">PHASE 3: Manifestation</span>
                    <span className="text-gray-400 text-xs">The Risultante (Artifact) is generated in the Output Manifestation layer.</span>
                </li>
             </ol>
          </section>

          {/* Section 5: Technical Documentation (Expanded) */}
          <section>
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4 border-b border-cyan-900/30 pb-1">5. Technical Architecture & Deep Dynamics</h3>
            
            <div className="space-y-8 text-xs text-gray-400">
                
                {/* 5.1 Stack */}
                <div>
                    <h4 className="text-xs font-bold text-gray-200 mb-2 flex items-center gap-2">
                        <CpuIcon className="w-4 h-4 text-blue-500" />
                        5.1 The Core Stack
                    </h4>
                    <div className="bg-gray-900/50 p-3 rounded border border-gray-800">
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Engine:</strong> Google Gemini 3.0 Pro (via <code>@google/genai</code> SDK).</li>
                            <li><strong>Frontend:</strong> React 19, TypeScript, Vite.</li>
                            <li><strong>State:</strong> LocalStorage for persistence (Custom Agents), React Hooks for runtime.</li>
                            <li><strong>Styling:</strong> Tailwind CSS with a custom "Matrix/Cyberpunk" design system.</li>
                        </ul>
                    </div>
                </div>

                {/* 5.2 Backend Logic */}
                <div>
                    <h4 className="text-xs font-bold text-gray-200 mb-2">5.2 The "Super-Prompt" Architecture (Backend Logic)</h4>
                    <p className="mb-2">
                        Unlike traditional agent frameworks (like LangChain) that execute agents sequentially in a loop (Chain-of-Thought), the MMS Kernel uses a <strong>Parallel Context Injection</strong> strategy.
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                        <div className="p-2 border border-gray-700 rounded bg-gray-800/20">
                            <strong className="text-purple-400 block mb-1">Single-Shot Holographic Inference</strong>
                            <p>When you click "Activate Engine", the system does not call Agent A, wait, then Agent B. Instead, it constructs a massive <strong>Super-Prompt</strong> that concatenates:</p>
                            <code className="block mt-1 p-1 bg-black/50 rounded text-gray-500 font-mono">
                                [KERNEL AXIOMS] + [ORCHESTRATOR DNA] + [AGENT A DNA] + [AGENT B DNA] + [USER INTENT]
                            </code>
                            <p className="mt-1">Gemini 3.0 then simulates the interaction between these personalities within its latent space and returns the <em>result</em> of that simulation. This ensures zero-latency data loss between agents.</p>
                        </div>
                        <div className="p-2 border border-gray-700 rounded bg-gray-800/20">
                            <strong className="text-purple-400 block mb-1">JSON Schema Enforcement</strong>
                            <p>To prevent "hallucination" of the output format, the system uses the <code>responseSchema</code> feature of the Gemini API. This forces the creative model to output strict JSON structures (<code>steps</code>, <code>risultante</code>, <code>impronta</code>), allowing the UI to render the "Manifestation Layer" reliably.</p>
                        </div>
                    </div>
                </div>

                {/* 5.3 UI Physics */}
                <div>
                    <h4 className="text-xs font-bold text-gray-200 mb-2">5.3 UX Physics: The "Ghost Zone" & Lagrangian Resizing</h4>
                    <p className="mb-2">The interface is built to feel physical. The resizing logic implements a specific mathematical threshold.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-2 border border-gray-700 rounded bg-gray-800/20">
                            <strong className="text-cyan-500 block mb-1">The Snap Threshold (250px)</strong>
                            <p>If a panel is dragged below 250px width (The "Ghost Zone"), the physics engine interprets this as an intent to close. It snaps the width to 0 (collapsing it). This mimics physical resistance and prevents unusable narrow layouts.</p>
                        </div>
                        <div className="p-2 border border-gray-700 rounded bg-gray-800/20">
                            <strong className="text-cyan-500 block mb-1">Gutter States</strong>
                            <p>When collapsed, panels transform into "Gutter Buttons"—vertical, cyberpunk-styled tabs. This preserves the *state* of the panel (it's not destroyed, just folded) while maximizing screen real estate for the active task.</p>
                        </div>
                    </div>
                </div>

                {/* 5.4 Secondary Dynamics */}
                <div>
                    <h4 className="text-xs font-bold text-gray-200 mb-2">5.4 Secondary Dynamics: The Forge & Context</h4>
                    <div className="space-y-2">
                        <div className="p-2 border border-gray-700 rounded bg-gray-800/20 flex gap-3">
                            <div className="w-1 bg-yellow-500 h-full rounded-full shrink-0"></div>
                            <div>
                                <strong className="text-yellow-400 block mb-1">Reverse-Engineering (The Forge)</strong>
                                <p>Inside the Simulator, the "Forge" button isn't magic. It takes the raw chat history and feeds it back into a meta-prompt acting as a "Geneticist". This meta-prompt analyzes the text to extract the <em>implicit</em> persona, logic, and tone you just roleplayed, crystallizing it into a JSON <code>CognitiveModule</code> that you can save.</p>
                            </div>
                        </div>
                        <div className="p-2 border border-gray-700 rounded bg-gray-800/20 flex gap-3">
                            <div className="w-1 bg-green-500 h-full rounded-full shrink-0"></div>
                            <div>
                                <strong className="text-green-400 block mb-1">Refinement Mode (Context Injection)</strong>
                                <p>When "Refine Previous Result" is active, the system injects the previous <code>Risultante</code> JSON into the input vector of the next call. This creates a <strong>Loop</strong>, allowing for iterative refinement (e.g., "Now optimize the code output from the previous step") without losing the structural context.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5.5 Grounding & Network Architecture */}
                <div>
                    <h4 className="text-xs font-bold text-gray-200 mb-2">5.5 Network Uplink & Grounding Architecture</h4>
                    <div className="p-2 border border-gray-700 rounded bg-gray-800/20">
                        <p className="mb-2">
                            The <code>NET.search</code> agent introduces a distinct behavior in the backend.
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-gray-400">
                            <li>
                                <strong>Schema Bypass:</strong> When <code>NET.search</code> is active, the system enables the <code>googleSearch</code> tool. Due to API constraints, this forces the system to <strong>disable strict JSON Schema enforcement</strong>. 
                            </li>
                            <li>
                                <strong>Prompt Engineering Fallback:</strong> To compensate, the Super-Prompt includes specific "Emergency Formatting Protocols" that verbally instruct the model to still output JSON even without the schema guardrails.
                            </li>
                            <li>
                                <strong>Grounding Chunks:</strong> The system parses the <code>groundingMetadata</code> returned by Gemini separately from the text response, extracting verified URLs and rendering them in the "Network Uplink" section of the UI, distinct from the AI's hallucinated links.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 5.6 Persistence & Dreaming */}
                <div>
                    <h4 className="text-xs font-bold text-gray-200 mb-2">5.6 State Persistence & "Protocol Dreaming"</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-2 border border-gray-700 rounded bg-gray-800/20">
                            <strong className="text-pink-400 block mb-1">Local-First Persistence</strong>
                            <p>Custom Agents and Modified System Agents are stored in <code>localStorage</code>. The app is "stateless" on the server side but "stateful" on your device. Deleting browser data wipes your custom agents.</p>
                        </div>
                        <div className="p-2 border border-gray-700 rounded bg-gray-800/20">
                            <strong className="text-pink-400 block mb-1">Protocol Dreaming</strong>
                            <p>The "Refresh Protocols" button triggers an <strong>Orchestrator Hallucination Cycle</strong>. The AWO analyzes your <em>currently installed</em> agents and "dreams up" 4 new, hypothetical use-cases (Protocols) that optimally utilize your specific toolset.</p>
                        </div>
                    </div>
                </div>

                {/* 5.7 Visual Map */}
                <div className="pb-8">
                    <h4 className="text-xs font-bold text-gray-200 mb-4">5.7 System Logic Map</h4>
                    <div className="p-4 bg-gray-950 rounded-lg border border-gray-800 flex justify-center">
                        <svg viewBox="0 0 800 350" className="w-full h-auto max-w-3xl filter drop-shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#06b6d4" />
                                </marker>
                                <marker id="arrow-p" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#a855f7" />
                                </marker>
                            </defs>
                            
                            {/* Phase 0: Input */}
                            <g transform="translate(50, 150)">
                                <rect x="0" y="0" width="120" height="60" rx="5" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                                <text x="60" y="35" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">USER INTENT</text>
                                <text x="60" y="50" textAnchor="middle" fill="#94a3b8" fontSize="10">Resonance Phase</text>
                            </g>
                            
                            {/* Connection */}
                            <line x1="170" y1="180" x2="230" y2="180" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow)" />

                            {/* Phase 1: AWO */}
                            <g transform="translate(240, 130)">
                                <rect x="0" y="0" width="140" height="100" rx="5" fill="#312e81" stroke="#a855f7" strokeWidth="2" />
                                <text x="70" y="30" textAnchor="middle" fill="#d8b4fe" fontSize="12" fontWeight="bold">AWO Orchestrator</text>
                                <text x="70" y="55" textAnchor="middle" fill="#94a3b8" fontSize="10">Resonance Scan</text>
                                <text x="70" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10">Agent Selection</text>
                            </g>

                             {/* Registry Interaction */}
                            <g transform="translate(260, 40)">
                                <path d="M20,0 h60 a10,10 0 0 1 10,10 v40 a10,10 0 0 1 -10,10 h-60 a10,10 0 0 1 -10,-10 v-40 a10,10 0 0 1 10,-10 z" fill="#0f172a" stroke="#64748b" strokeDasharray="4" />
                                <text x="50" y="35" textAnchor="middle" fill="#64748b" fontSize="10">Registry</text>
                                <line x1="50" y1="60" x2="50" y2="130" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
                            </g>

                            {/* Connection */}
                            <line x1="380" y1="180" x2="440" y2="180" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-p)" />

                            {/* Phase 2: Super Prompt Assembly */}
                            <g transform="translate(450, 120)">
                                <rect x="0" y="0" width="160" height="120" rx="5" fill="#4c1d95" stroke="#f0abfc" strokeWidth="2" filter="url(#glow)" />
                                <text x="80" y="25" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">SUPER PROMPT</text>
                                <line x1="20" y1="35" x2="140" y2="35" stroke="#a855f7" strokeWidth="1" />
                                <text x="80" y="55" textAnchor="middle" fill="#d8b4fe" fontSize="10">Kernel P0-P6</text>
                                <text x="80" y="75" textAnchor="middle" fill="#d8b4fe" fontSize="10">+ Agent DNA Stack</text>
                                <text x="80" y="95" textAnchor="middle" fill="#d8b4fe" fontSize="10">+ Context Injection</text>
                            </g>

                             {/* Connection */}
                            <line x1="610" y1="180" x2="670" y2="180" stroke="#f0abfc" strokeWidth="2" markerEnd="url(#arrow-p)" />

                            {/* Phase 3: Manifestation */}
                             <g transform="translate(680, 140)">
                                <rect x="0" y="0" width="100" height="80" rx="5" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                                <text x="50" y="30" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">ARTIFACT</text>
                                <text x="50" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="10">Risultante</text>
                                <text x="50" y="65" textAnchor="middle" fill="#6ee7b7" fontSize="10">(JSON / Code)</text>
                            </g>

                            {/* Loop Back */}
                            <path d="M730,220 Q730,300 400,300 Q100,300 100,210" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="5" markerEnd="url(#arrow)" />
                            <text x="400" y="290" textAnchor="middle" fill="#475569" fontSize="10">KLI Feedback Loop (Autopoiesis)</text>

                        </svg>
                    </div>
                </div>

            </div>
          </section>

          {/* Footer */}
          <div className="text-[10px] text-gray-600 font-mono text-center pt-10 border-t border-gray-800">
             OMEGA KERNEL v2.0 // MMS ARCHITECTURE // {new Date().getFullYear()}
          </div>
        </main>

        {/* Corner Resizer (Desktop Only) */}
        {!isMobile && (
             <div 
                className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-50 flex items-end justify-end p-1 group"
                onMouseDown={startResizing}
            >
                <div className="w-2 h-2 border-r-2 border-b-2 border-gray-600 group-hover:border-cyan-400 transition-colors"></div>
            </div>
        )}
      </div>
    </div>
  );
};
