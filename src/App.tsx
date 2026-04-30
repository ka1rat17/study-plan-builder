/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, GraduationCap } from 'lucide-react';
import PlanForm from './components/PlanForm';
import PlanView from './components/PlanView';
import { generateStudyPlan } from './services/gemini';
import { StudyPlan } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (topic: string, goal: string, duration: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateStudyPlan(topic, goal, duration);
      setPlan(generatedPlan);
    } catch (err) {
      console.error(err);
      setError('Кечиресиз, план түзүүдө ката кетти. Кайра аракет кылып көрүңүз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] font-sans selection:bg-orange-100" id="study-plan-app">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBFBFA]/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-slate-900 px-2 py-1.5 rounded-lg text-white group-hover:bg-orange-600 transition-colors">
              <GraduationCap size={18} />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight text-slate-900">
              Study<span className="text-orange-600">Plan</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
             <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Documents</a>
                <a href="#" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Community</a>
             </nav>
             <div className="w-[1px] h-4 bg-slate-200 hidden md:block" />
             <p className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">
               AI V2.0
             </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Content + Form */}
          <div className="lg:w-[400px] shrink-0 space-y-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full text-[10px] font-bold text-orange-600 border border-orange-100 uppercase tracking-wider"
              >
                <Sparkles size={10} /> Next-Gen Learning
              </motion.div>
              <h2 className="text-5xl font-display font-bold text-slate-900 leading-[0.95] tracking-tight">
                Окууну <br /> <span className="text-orange-600">Системалаштыр.</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Татаал темаларды жөнөкөй кадамдарга айлантыңыз. Gemini AI сиздин каалооңузга жараша жеке план түзүп берет.
              </p>
            </div>

            <PlanForm onGenerate={handleGenerate} isLoading={isLoading} />
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-semibold rounded-2xl border border-red-100 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                {error}
              </motion.div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {plan ? (
                <div key="results" className="w-full max-w-2xl">
                  <PlanView plan={plan} />
                </div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-[500px] flex flex-col items-center justify-center p-12 bg-white/50 border border-slate-100 rounded-[40px] text-center space-y-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-200 blur-2xl opacity-20 rounded-full" />
                    <div className="relative bg-white border border-slate-100 p-6 rounded-3xl text-slate-300 shadow-sm">
                      <BookOpen size={48} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-900 font-display font-bold text-lg">План күтүлүүдө</p>
                    <p className="text-slate-400 text-sm max-w-[200px] mx-auto">
                      Сол жактагы форманы толтуруп, өзүңүздүн жол картаңызды алыңыз.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 font-display font-bold text-sm">
            StudyPlan <span className="text-slate-200">/</span> 2026
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.25em] font-bold">
            Built with Strategic Precision
          </p>
        </div>
      </footer>
    </div>
  );
}

// Minimal missing icons
function BookOpen({ size, className }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

