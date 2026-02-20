
export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface LanguageItem {
  language: string;
  level: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'professional' | 'interpersonal';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}