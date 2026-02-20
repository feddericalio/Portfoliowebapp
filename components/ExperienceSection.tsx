
import React, { useState } from 'react';
import { ExperienceItem, EducationItem, LanguageItem } from '../types';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  education: EducationItem[];
  languages: LanguageItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, education, languages }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  return (
    <section id="experience" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          
          {/* Esperienze */}
          <div className="border-b border-slate-100 pb-8">
            <button 
              onClick={() => toggleSection('esperienze')}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
            >
              <h2 className="text-3xl font-bold flex items-center gap-4 text-slate-900">
                <span className="w-8 h-[2px] bg-slate-900"></span>
                Esperienze
              </h2>
              <ChevronIcon isOpen={openSection === 'esperienze'} />
            </button>
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openSection === 'esperienze' ? 'max-h-[2000px] opacity-100 mt-12' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-12">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-slate-200">
                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-slate-900 rounded-full"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{exp.company}</h3>
                    <p className="text-sm font-medium text-slate-600 mb-4">{exp.role}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formazione */}
          <div className="border-b border-slate-100 pb-8">
            <button 
              onClick={() => toggleSection('formazione')}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
            >
              <h2 className="text-3xl font-bold flex items-center gap-4 text-slate-900">
                <span className="w-8 h-[2px] bg-slate-900"></span>
                Formazione
              </h2>
              <ChevronIcon isOpen={openSection === 'formazione'} />
            </button>
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openSection === 'formazione' ? 'max-h-[2000px] opacity-100 mt-12' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-12">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-slate-200">
                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-slate-900 rounded-full"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                      {edu.period}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{edu.degree}</h3>
                    <p className="text-sm font-medium text-slate-600 mb-4">{edu.institution}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lingue */}
          <div className="border-b border-slate-100 pb-8">
            <button 
              onClick={() => toggleSection('lingue')}
              className="w-full flex items-center justify-between text-left group focus:outline-none"
            >
              <h2 className="text-3xl font-bold flex items-center gap-4 text-slate-900">
                <span className="w-8 h-[2px] bg-slate-900"></span>
                Lingue
              </h2>
              <ChevronIcon isOpen={openSection === 'lingue'} />
            </button>
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openSection === 'lingue' ? 'max-h-[1000px] opacity-100 mt-12' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-12">
                {languages.map((lang, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-slate-200">
                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] bg-slate-900 rounded-full"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                      {lang.level}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{lang.language}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{lang.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;