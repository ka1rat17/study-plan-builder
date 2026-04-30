/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Target, Clock, Sparkles } from 'lucide-react';

interface PlanFormProps {
  onGenerate: (topic: string, goal: string, duration: string) => void;
  isLoading: boolean;
}

export default function PlanForm({ onGenerate, isLoading }: PlanFormProps) {
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic && goal && duration) {
      onGenerate(topic, goal, duration);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]" id="study-plan-form">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
          <BookOpen size={12} /> Тема же багыт
        </label>
        <input
          id="input-topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Мисалы: React жана TypeScript"
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all outline-none text-sm font-medium"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
          <Target size={12} /> Негизги максат
        </label>
        <input
          id="input-goal"
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Мисалы: Өз алдынча проект жасоо"
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all outline-none text-sm font-medium"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 flex items-center gap-2">
          <Clock size={12} /> Мөөнөтү (Убакыт)
        </label>
        <input
          id="input-duration"
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Мисалы: 4 жума, күнүнө 2 саат"
          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/50 transition-all outline-none text-sm font-medium"
          required
        />
      </div>

      <button
        id="btn-generate"
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-900 hover:bg-orange-600 text-white font-display font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-slate-100"
      >
        {isLoading ? (
          <div className="animate-spin h-5 w-5 border border-white/20 border-t-white rounded-full" />
        ) : (
          <>
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            План түзүү
          </>
        )}
      </button>
    </form>
  );
}
