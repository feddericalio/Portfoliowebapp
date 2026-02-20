
import React from 'react';
import { Skill } from '../types';

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-24 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 serif italic">Competenze & Asset</h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all cursor-default border ${
                skill.category === 'professional' 
                  ? 'bg-white border-slate-200 text-slate-800 shadow-sm hover:shadow-md' 
                  : 'bg-slate-900 border-slate-900 text-white shadow-lg hover:-translate-y-1'
              }`}
            >
              {skill.name}
            </div>
          ))}
        </div>
        
        <div className="mt-20 p-10 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-3xl mx-auto">
          <p className="text-xl text-slate-600 font-light leading-relaxed italic">
            "Il marketing efficace nasce dall'ascolto. Capire davvero una persona significa sapere già come creare valore per lei."
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
