
import React from 'react';
import { ExperienceItem, EducationItem, Skill, LanguageItem } from './types';

export const EXPERIENCES: ExperienceItem[] = [
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
];

export const EDUCATION: EducationItem[] = [
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
];

export const LANGUAGES: LanguageItem[] = [
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
];

export const SKILLS: Skill[] = [
  { name: "Comunicazione Strategica", category: 'professional' },
  { name: "Psicologia dei Mercati", category: 'professional' },
  { name: "Marketing Digitale", category: 'professional' },
  { name: "Analisi Critica", category: 'professional' },
  { name: "Creazione Contenuti (foto, video)", category: 'professional' },
  { name: "Canva (per grafiche)", category: 'professional' },
  { name: "Gestione siti Wordpress", category: 'professional' },
  { name: "Creazione Campagne ADV su Meta", category: 'professional' },
  { name: "Problem Solving", category: 'interpersonal' },
  { name: "Team Leadership", category: 'interpersonal' },
  { name: "Ascolto Attivo", category: 'interpersonal' },
  { name: "Adattabilità", category: 'interpersonal' }
];

export const ICONS = {
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
  ),
  Chat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  ),
  ArrowDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
  )
};