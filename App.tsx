
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import AIChatAssistant from './components/AIChatAssistant';
import PortfolioSection from './components/PortfolioSection';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { ICONS } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [siteContent, setSiteContent] = useState<any>(null);

  const DEFAULT_CONTENT = {
    theme: {
      fontSerif: "Playfair Display",
      fontSans: "Plus Jakarta Sans",
      primaryColor: "#0f172a",
      backgroundColor: "#f8fafc",
      textColor: "#334155",
      accentColor: "#64748b",
      profileImage: "https://media.licdn.com/dms/image/v2/D4D03AQEZDyn4O1WruQ/profile-displayphoto-scale_200_200/B4DZpa38mmJIAc-/0/1762461212551?e=2147483647&v=beta&t=QR9zHl5Ro2dDhtJv8ngO_aV38RtY5271i3UdB0TxtFk"
    },
    hero: {
      badge: "Comunicazione & Marketing Strategico",
      name: "Federica Lionetto",
      quote: "\"La comunicazione non è un dettaglio. È ciò che determina il risultato.\"",
      aiText: "Non hai voglia di leggere tutti i miei dati? Chiedi alla mia assistente AI, che ho creato e addestrato per rispondere a tutte le tue domande su di me."
    },
    about: {
      title: "Comprendere le persone significa comprendere il mercato.",
      p1: "Marketing e psicologia non sono strumenti separati, ma parti di uno stesso processo: analizzare, ascoltare, interpretare e costruire strategie che non siano solo efficaci, ma autentiche.",
      p2: "Crescere in un'azienda familiare mi ha insegnato che i problemi non sono limiti, ma processi da comprendere. Oggi affronto ogni sfida con metodo, calma e una profonda propensione al problem solving rapido."
    },
    experiences: [
      {
        company: "LC Mobili",
        role: "Gestione Comunicazione & Marketing",
        period: "2019-2026",
        description: "Responsabile della comunicazione integrata: gestione e aggiornamento del sito web, definizione di strategie marketing sui social media, creazione di contenuti grafici e video. Coordinamento di collaborazioni con radio e TV locali. Gestione del rapporto diretto con il cliente e sviluppo di problem solving rapido in contesti operativi."
      },
      {
        company: "Yam Lab",
        role: "Operativa & Relazione Clienti",
        period: "2023-2024",
        description: "Gestione del rapporto con il cliente e della comunicazione del brand. Creazione di contenuti accattivanti (grafiche, video e storie) studiati per attrarre nuovi clienti. Risultati tangibili: molti clienti have confermato di aver preso appuntamento proprio grazie alla qualità e all'efficacia dei contenuti social prodotti."
      },
      {
        company: "Eventi & Hospitality",
        role: "Hostess",
        period: "2022-2026 contratto a chiamata",
        description: "Coordinamento logistico e gestione degli imprevisti in contesti organizzativi di alto livello. Capacità di problem solving immediato e gestione dello stress."
      }
    ],
    education: [
      {
        institution: "Innovazione Digitale",
        degree: "Corso AI & Copywriting",
        period: "2026",
        description: "Specializzazione nella gestione di intelligenze artificiali generative per la produzione di contenuti video, fotografici e testuali. Qualificata come tecnico IA con competenze avanzate in copywriting e scrittura creativa."
      },
      {
        institution: "Università degli Studi di Milano",
        degree: "Laurea in comunicazione e società",
        period: "2021-2024",
        description: "Focus su materie sociologiche, diritto, marketing, studio di radio e tv, per un approccio alla comunicazione a 360°. Esperienza Erasmus come pilastro di apertura mentale."
      },
      {
        institution: "Specializzazione Digital",
        degree: "Corso in Digital Marketing",
        period: "2019",
        description: "Apprendimento approfondito di SEO, SEM e tecniche di marketing strategico. Utilizzo di piattaforme come Canva per la realizzazione di grafiche professionali e padronanza dei principali pilastri del digital marketing."
      },
      {
        institution: "Istituti Tecnici",
        degree: "Diploma di Ragioneria",
        period: "2014-2019",
        description: "Solida base analitica in economia, diritto e lingue straniere."
      }
    ],
    languages: [
      {
        language: "Italiano",
        level: "Madrelingua",
        description: "Lingua principale utilizzata in ambito professionale e accademico."
      },
      {
        language: "Spagnolo",
        level: "Livello B2",
        description: "Competenze consolidate e implementate grazie all'esperienza Erasmus vissuta in Spagna."
      },
      {
        language: "Inglese",
        level: "Livello B2",
        description: "Ottima padronanza della lingua, sia parlata che scritta, utilizzata per studio e ricerca."
      }
    ],
    skills: [
      { name: "Comunicazione Strategica", category: "professional" },
      { name: "Psicologia dei Mercati", category: "professional" },
      { name: "Marketing Digitale", category: "professional" },
      { name: "Analisi Critica", category: "professional" },
      { name: "Creazione Contenuti (foto, video)", category: "professional" },
      { name: "Canva (per grafiche)", category: "professional" },
      { name: "Gestione siti Wordpress", category: "professional" },
      { name: "Creazione Campagne ADV su Meta", category: "professional" },
      { name: "Problem Solving", category: "interpersonal" },
      { name: "Team Leadership", category: "interpersonal" },
      { name: "Ascolto Attivo", category: "interpersonal" },
      { name: "Adattabilità", category: "interpersonal" }
    ],
    manifesto: {
      title: "Manifesto Professionale",
      p1: "Sono cresciuta all’interno di un’azienda familiare, un contesto che mette alla prova equilibrio e lucidità. Lì ho imparato a gestire crisi e a separare il piano personale da quello professionale.",
      p2: "La svolta è arrivata con l’università e l’esperienza Erasmus: il confronto, il dibattito, l’ascolto. Ho capito che le idee migliori nascono quando si è disposti a mettersi in discussione e a uscire dalla propria zona di comfort.",
      p3: "L'esperienza in Yam Lab ha consolidato la mia professionalità e adattabilità in ambienti creativi e dinamici. Le difficoltà non mi hanno frenata: mi hanno strutturata.",
      p4": "Oggi cerco sfide che richiedano non solo competenza tecnica, ma una visione umana e strategica del business."
    }
  };

  useEffect(() => {
    fetchSiteContent();
    window.addEventListener('site-content-updated', fetchSiteContent);
    return () => window.removeEventListener('site-content-updated', fetchSiteContent);
  }, []);

  const fetchSiteContent = async () => {
    try {
      const res = await fetch('/api/site-content');
      if (res.ok) {
        const data = await res.json();
        setSiteContent(data);
      } else {
        // Fallback to default content if API fails
        setSiteContent(DEFAULT_CONTENT);
      }
    } catch (err) {
      console.error('Error fetching site content:', err);
      // Fallback to default content if API is unreachable
      setSiteContent(DEFAULT_CONTENT);
    }
  };

  const handleLogin = (password: string) => {
    setAdminPassword(password);
    setIsAdmin(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminPassword('');
  };

  if (!siteContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  const theme = siteContent.theme || {
    fontSerif: 'Playfair Display',
    fontSans: 'Plus Jakarta Sans',
    primaryColor: '#0f172a',
    backgroundColor: '#f8fafc',
    textColor: '#334155',
    accentColor: '#64748b'
  };

  return (
    <div className="min-h-screen selection:bg-slate-900 selection:text-white" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: ${theme.primaryColor};
          --bg-site: ${theme.backgroundColor};
          --text-site: ${theme.textColor};
          --accent-site: ${theme.accentColor};
        }
        body {
          font-family: '${theme.fontSans}', sans-serif;
          background-color: ${theme.backgroundColor};
          color: ${theme.textColor};
        }
        h1, h2, h3, .serif {
          font-family: '${theme.fontSerif}', serif;
        }
        .text-slate-900 { color: ${theme.primaryColor} !important; }
        .bg-slate-900 { background-color: ${theme.primaryColor} !important; }
        .text-slate-600, .text-slate-700 { color: ${theme.textColor} !important; }
        .bg-slate-50 { background-color: ${theme.backgroundColor} !important; filter: brightness(0.98); }
        .border-slate-100, .border-slate-200 { border-color: rgba(0,0,0,0.05) !important; }
      `}} />
      <Navigation onAdminClick={() => setShowLogin(true)} />
      
      <main>
        <Hero content={{...siteContent.hero, profileImage: theme.profileImage}} />
        
        {/* Intro / About section */}
        <section id="about" className="py-24 px-6 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 serif italic text-slate-900">
            {siteContent.about.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 leading-relaxed text-lg">
            <p>{siteContent.about.p1}</p>
            <p>{siteContent.about.p2}</p>
          </div>
        </section>

        <PortfolioSection />
        <ExperienceSection 
          experiences={siteContent.experiences} 
          education={siteContent.education} 
          languages={siteContent.languages} 
        />
        <SkillsSection skills={siteContent.skills} />
        
        <AIChatAssistant siteContent={siteContent} />

        {/* Lettera di Presentazione / Philosophy */}
        <section className="py-24 px-6 bg-white border-y border-slate-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-slate-900">
              <span className="w-8 h-[2px] bg-slate-900"></span>
              {siteContent.manifesto.title}
            </h2>
            <div className="space-y-8 text-slate-700 leading-loose">
              <p>{siteContent.manifesto.p1}</p>
              <p>{siteContent.manifesto.p2}</p>
              <p>{siteContent.manifesto.p3}</p>
              <p className="font-bold text-slate-900 text-xl serif italic">
                {siteContent.manifesto.p4}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <h2 className="text-2xl font-bold serif mb-2 text-slate-900">Federica Lionetto</h2>
            <p className="text-slate-500 text-sm mb-4">Comunicazione & Marketing Strategico</p>
            <div className="flex flex-col gap-1 text-sm text-slate-600">
              <span>fedi.lionetto@gmail.com</span>
            </div>
          </div>
          
          <div className="flex gap-6">
            <a 
              href="https://www.linkedin.com/in/federica-lionetto-178033197" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-slate-700"
            >
              <ICONS.Linkedin />
            </a>
            <a 
              href="https://www.instagram.com/fede_lionetto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-slate-700"
            >
              <ICONS.Instagram />
            </a>
          </div>
          
          <div className="text-slate-400 text-xs uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} Federica Lionetto
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showLogin && !isAdmin && (
          <Login 
            onLogin={handleLogin} 
            onClose={() => setShowLogin(false)} 
          />
        )}
        {isAdmin && (
          <AdminDashboard 
            password={adminPassword}
            onLogout={handleLogout}
            onClose={() => setIsAdmin(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
