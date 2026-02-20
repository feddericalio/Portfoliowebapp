
import React from 'react';
import { Lock } from 'lucide-react';

interface NavigationProps {
  onAdminClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onAdminClick }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="text-xl font-bold tracking-tighter serif cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          FL
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 uppercase tracking-widest">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-slate-900 transition-colors">About</a>
          <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="hover:text-slate-900 transition-colors">Portfolio</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-slate-900 transition-colors">Percorso</a>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-slate-900 transition-colors">Competenze</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-slate-900 transition-colors">Contatti</a>
          
          <button 
            onClick={onAdminClick}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900"
            title="Area Riservata"
          >
            <Lock size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
