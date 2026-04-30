/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Bookmark, Lightbulb, ArrowRight, Target, Download, FileText } from 'lucide-react';
import { StudyPlan } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PlanViewProps {
  plan: StudyPlan;
}

export default function PlanView({ plan }: PlanViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);
    
    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FBFBFA',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`StudyPlan_${plan.title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6" id="plan-wrapper">
      <div className="flex justify-end gap-2">
        <button
          onClick={exportPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
        >
          {isExporting ? (
             <div className="animate-spin h-3 w-3 border-2 border-slate-300 border-t-slate-600 rounded-full" />
          ) : (
            <Download size={14} />
          )}
          PDF Жүктөө
        </button>
      </div>

      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 p-1"
        id="plan-container"
      >
        {/* Hero Section */}
        <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
              <FileText size={12} /> Personalized Roadmap
            </div>
            <h2 className="text-3xl font-display font-bold text-slate-900 leading-tight" id="plan-title text-wrap">
              {plan.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Максат</p>
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Target size={14} className="text-orange-500" />
                {plan.targetGoal}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Убакыт</p>
              <p className="text-sm font-medium text-slate-700">
                {plan.overallDuration}
              </p>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-4" id="modules-list">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2 mb-4">Окуу программасы</h4>
          {plan.modules.map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-[28px] border border-slate-100 hover:border-orange-200/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-900 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-display font-bold text-sm shadow-lg shadow-slate-200">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{module.title}</h3>
                    <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">{module.duration}</p>
                  </div>
                </div>
              </div>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {module.topics.map((topic, tidx) => (
                  <li key={tidx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed font-medium">
                    <div className="mt-1 bg-green-50 p-1 rounded-md">
                      <CheckCircle2 size={12} className="text-green-600 shrink-0" />
                    </div>
                    {topic}
                  </li>
                ))}
              </ul>

              {module.resources && module.resources.length > 0 && (
                <div className="pt-6 border-t border-slate-50">
                  <div className="flex flex-wrap gap-2">
                    {module.resources.map((res, ridx) => (
                      <span key={ridx} className="text-[10px] font-bold bg-slate-50 text-slate-400 px-3 py-1.5 rounded-full border border-slate-100 flex items-center gap-2">
                        <Bookmark size={10} /> {res}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-slate-900 p-10 rounded-[32px] text-white space-y-6 shadow-2xl shadow-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Lightbulb size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="font-display font-bold text-xl flex items-center gap-3 mb-6">
              <span className="bg-orange-500 p-2 rounded-xl"><Lightbulb size={20} /></span>
              Ийгилик үчүн кеңештер
            </h3>
            <ul className="space-y-4">
              {plan.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-4 text-sm text-slate-300 opacity-90 leading-relaxed group">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 group-hover:scale-150 transition-transform" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
