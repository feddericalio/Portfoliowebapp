
import React from 'react';
import { ICONS } from '../constants';

interface HeroProps {
  content: {
    badge: string;
    name: string;
    quote: string;
    aiText: string;
    profileImage?: string;
  };
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const defaultImage = "https://media.licdn.com/dms/image/v2/D4D03AQEZDyn4O1WruQ/profile-displayphoto-scale_200_200/B4DZpa38mmJIAc-/0/1762461212551?e=2147483647&v=beta&t=QR9zHl5Ro2dDhtJv8ngO_aV38RtY5271i3UdB0TxtFk";
  
  const scrollToChat = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const chatSection = document.getElementById('chat');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-slate-400 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-300 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-6">
          {content.badge}
        </span>
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight text-slate-900">
          {content.name}
        </h1>
        
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img 
              src={content.profileImage || defaultImage} 
              alt={content.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <p className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {content.quote}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="px-8 py-4 rounded-full font-medium text-slate-700 border border-slate-200 cursor-default">
            Scopri la mia visione
          </div>
          <a 
            href="#chat" 
            onClick={scrollToChat}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-medium shadow-xl hover:bg-slate-800 transition-all"
          >
            Parla con la mia AI
            <ICONS.ArrowDown />
          </a>
        </div>

        <p className="mt-8 text-slate-500 text-sm max-w-md mx-auto leading-relaxed font-light italic">
          {content.aiText}
        </p>
      </div>
    </section>
  );
};

export default Hero;
