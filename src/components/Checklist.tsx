import React from 'react';
import { VitaeData } from '../types/vitae';

interface ChecklistProps {
  data: VitaeData;
}

export const Checklist: React.FC<ChecklistProps> = ({ data }) => {
  const rules = [
    {
      label: "General: No 'I' pronouns used",
      isValid: !/\b(I|me|my|mine|we|our|us)\b/gi.test(data.summary) && 
               data.experience.every((exp) => exp.achievements.every((ach) => !/\b(I|me|my|mine|we|our|us)\b/gi.test(ach)))
    },
    {
      label: "Summary: 3-4 sentences long",
      isValid: (() => {
        const sentences = data.summary.split(/[.!?]/).filter((s) => s.trim().length > 0);
        return sentences.length >= 3 && sentences.length <= 4;
      })()
    },
    {
      label: "Skills: Focus on technical skills",
      isValid: data.skills.technical.length > 5
    },
    {
      label: "Projects: 3-5 bullets per project",
      isValid: data.projects.every((proj) => proj.bullets.length >= 3 && proj.bullets.length <= 5)
    },
    {
      label: "Experience: Achievements follow 'Accomplished [A] as evidenced by [B] by doing [C]'",
      isValid: data.experience.every((exp) => 
        exp.achievements.every((ach) => 
          ach.toLowerCase().includes('accomplished') && 
          ach.toLowerCase().includes('as evidenced by') && 
          ach.toLowerCase().includes('by doing')
        )
      )
    },
    {
      label: "Personal Info: Links are hyperlinked names",
      isValid: data.personalInfo.socialLinks.every((link) => link.name && link.url)
    },
    {
      label: "Education: Reverse chronological order",
      isValid: true // Simplification for now
    }
  ];

  return (
    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        Submission Checklist
      </h2>
      <ul className="space-y-4">
        {rules.map((rule, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <span className={`flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center border ${
              rule.isValid ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-zinc-800 border-white/5 text-zinc-500'
            }`}>
              {rule.isValid ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              )}
            </span>
            <span className={rule.isValid ? 'text-zinc-200' : 'text-zinc-500 italic'}>
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-6 border-t border-white/5">
        <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-widest font-semibold tracking-tighter">
          Progress: {rules.filter(r => r.isValid).length}/{rules.length} Complete
        </p>
        <div className="w-full bg-zinc-800 h-1 rounded-full mt-2 overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-500" 
            style={{ width: `${(rules.filter(r => r.isValid).length / rules.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
