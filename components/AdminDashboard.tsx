
import React, { useState, useEffect } from 'react';
import { X, Upload, Link as LinkIcon, Type, Plus, Trash2, LogOut, Briefcase, GraduationCap, Globe, Award, FileText, Layout, Palette, Save, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceItem, EducationItem, LanguageItem, Skill } from '../types';

interface PortfolioItem {
  id: string;
  image: string;
  link: string;
  title: string;
}

interface AdminDashboardProps {
  onClose: () => void;
  onLogout: () => void;
  password: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onLogout, password }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'experience' | 'skills' | 'texts' | 'design'>('portfolio');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [siteContent, setSiteContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', link: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [expToDeleteIdx, setExpToDeleteIdx] = useState<number | null>(null);
  const [eduToDeleteIdx, setEduToDeleteIdx] = useState<number | null>(null);
  const [skillToDeleteIdx, setSkillToDeleteIdx] = useState<number | null>(null);
  const [langToDeleteIdx, setLangToDeleteIdx] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [portRes, contentRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/site-content')
      ]);
      const portData = await portRes.json();
      const contentData = await contentRes.json();
      setItems(portData);
      setSiteContent(contentData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', newItem.title);
    formData.append('link', newItem.link);
    formData.append('password', password);

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setNewItem({ title: '', link: '' });
        setSelectedFile(null);
        setPreviewUrl(null);
        const resPort = await fetch('/api/portfolio');
        const data = await resPort.json();
        setItems(data);
        window.dispatchEvent(new CustomEvent('portfolio-updated'));
      } else {
        const error = await res.json();
        alert(error.error || 'Errore durante il caricamento');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Errore di connessione');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const resPort = await fetch('/api/portfolio');
        const data = await resPort.json();
        setItems(data);
        window.dispatchEvent(new CustomEvent('portfolio-updated'));
        setItemToDeleteId(null);
      } else {
        const error = await res.json();
        alert(error.error || 'Errore durante l\'eliminazione');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Errore di connessione');
    }
  };

  const saveSiteContent = async () => {
    setSavingContent(true);
    try {
      const res = await fetch('/api/site-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: siteContent, password }),
      });

      if (res.ok) {
        window.dispatchEvent(new CustomEvent('site-content-updated'));
        alert('Contenuti salvati con successo!');
      } else {
        const error = await res.json();
        alert(error.error || 'Errore durante il salvataggio');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Errore di connessione');
    } finally {
      setSavingContent(false);
    }
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingProfile(true);
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('password', password);

      try {
        const res = await fetch('/api/profile-image', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setSiteContent({
            ...siteContent,
            theme: {
              ...siteContent.theme,
              profileImage: data.imageUrl
            }
          });
          alert('Foto profilo aggiornata! Ricorda di salvare i contenuti.');
        } else {
          alert('Errore durante il caricamento della foto');
        }
      } catch (err) {
        console.error('Profile upload error:', err);
        alert('Errore di connessione');
      } finally {
        setUploadingProfile(false);
      }
    }
  };

  const addExperience = () => {
    const newExp: ExperienceItem = { company: '', role: '', period: '', description: '' };
    setSiteContent({ ...siteContent, experiences: [newExp, ...siteContent.experiences] });
  };

  const removeExperience = (index: number) => {
    const newExps = [...siteContent.experiences];
    newExps.splice(index, 1);
    setSiteContent({ ...siteContent, experiences: newExps });
  };

  const addEducation = () => {
    const newEdu: EducationItem = { institution: '', degree: '', period: '', description: '' };
    setSiteContent({ ...siteContent, education: [newEdu, ...siteContent.education] });
  };

  const removeEducation = (index: number) => {
    const newEdus = [...siteContent.education];
    newEdus.splice(index, 1);
    setSiteContent({ ...siteContent, education: newEdus });
  };

  const addLanguage = () => {
    const newLang: LanguageItem = { language: '', level: '', description: '' };
    setSiteContent({ ...siteContent, languages: [...siteContent.languages, newLang] });
  };

  const removeLanguage = (index: number) => {
    const newLangs = [...siteContent.languages];
    newLangs.splice(index, 1);
    setSiteContent({ ...siteContent, languages: newLangs });
  };

  const addSkill = () => {
    const newSkill: Skill = { name: '', category: 'professional' };
    setSiteContent({ ...siteContent, skills: [...siteContent.skills, newSkill] });
  };

  const removeSkill = (index: number) => {
    const newSkills = [...siteContent.skills];
    newSkills.splice(index, 1);
    setSiteContent({ ...siteContent, skills: newSkills });
  };

  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
        activeTab === id 
          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 md:p-6"
    >
      <div className="bg-white w-full max-w-6xl h-full max-h-[95vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-2xl font-bold serif text-slate-900">Dashboard Amministratore</h2>
            <p className="text-slate-500 text-sm">Gestisci ogni sezione del tuo portfolio</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium"
            >
              <LogOut size={18} />
              Esci
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 py-4 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
          <TabButton id="portfolio" label="Portfolio" icon={Layout} />
          <TabButton id="experience" label="Esperienze & Formazione" icon={Briefcase} />
          <TabButton id="skills" label="Competenze & Lingue" icon={Award} />
          <TabButton id="texts" label="Testi & Manifesto" icon={FileText} />
          <TabButton id="design" label="Design & Stile" icon={Palette} />
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {activeTab === 'portfolio' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Form Section */}
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Plus size={20} className="text-slate-900" />
                      Aggiungi Progetto
                    </h3>
                    <form onSubmit={handleUpload} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Titolo Progetto</label>
                        <div className="relative">
                          <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            type="text" 
                            value={newItem.title}
                            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                            placeholder="es. Social Media Strategy"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Link Progetto</label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            type="url" 
                            value={newItem.link}
                            onChange={(e) => setNewItem({...newItem, link: e.target.value})}
                            placeholder="https://..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Immagine</label>
                        <div 
                          className={`relative border-2 border-dashed rounded-2xl p-4 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden min-h-[160px] ${
                            previewUrl ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-400'
                          }`}
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          {previewUrl ? (
                            <>
                              <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                              <div className="relative z-10 flex flex-col items-center">
                                <Upload size={24} className="text-slate-900 mb-2" />
                                <span className="text-sm font-medium text-slate-900">Cambia immagine</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <Upload size={32} className="text-slate-300" />
                              <div className="text-center">
                                <span className="text-sm font-medium text-slate-600 block">Clicca per caricare</span>
                                <span className="text-xs text-slate-400">PNG, JPG fino a 5MB</span>
                              </div>
                            </>
                          )}
                          <input 
                            id="file-upload"
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={uploading || !selectedFile}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                      >
                        {uploading ? 'Caricamento...' : (
                          <>
                            <Plus size={20} />
                            Pubblica Progetto
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* List Section */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      Progetti Online ({items.length})
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {items.map((item) => (
                        <div key={item.id} className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex gap-4 p-3 hover:bg-white hover:shadow-md transition-all">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                              {itemToDeleteId === item.id ? (
                                <motion.div 
                                  key="confirm"
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="flex flex-col gap-2"
                                >
                                  <p className="text-xs font-bold text-red-600">sei sicuro di voler eliminare?</p>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleDelete(item.id)}
                                      className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                      si
                                    </button>
                                    <button 
                                      onClick={() => setItemToDeleteId(null)}
                                      className="px-3 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-300 transition-colors"
                                    >
                                      no
                                    </button>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div 
                                  key="info"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                >
                                  <h4 className="font-bold text-slate-900 truncate">{item.title}</h4>
                                  <p className="text-xs text-slate-400 truncate">{item.link}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {itemToDeleteId !== item.id && (
                            <button 
                              onClick={() => setItemToDeleteId(item.id)}
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                              title="Elimina progetto"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-12">
                  {/* Experiences */}
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Briefcase size={22} />
                        Esperienze Professionali
                      </h3>
                      <button onClick={addExperience} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold transition-all">
                        <Plus size={16} /> Aggiungi
                      </button>
                    </div>
                    <div className="space-y-6">
                      {siteContent.experiences.map((exp: any, idx: number) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <AnimatePresence mode="wait">
                              {expToDeleteIdx === idx ? (
                                <motion.div 
                                  key="confirm"
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-red-100"
                                >
                                  <span className="text-[10px] font-bold text-red-600">sei sicuro di voler eliminare?</span>
                                  <div className="flex gap-1">
                                    <button 
                                      onClick={() => {
                                        removeExperience(idx);
                                        setExpToDeleteIdx(null);
                                      }}
                                      className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                      si
                                    </button>
                                    <button 
                                      onClick={() => setExpToDeleteIdx(null)}
                                      className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-300 transition-colors"
                                    >
                                      no
                                    </button>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.button 
                                  key="trash"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  onClick={() => setExpToDeleteIdx(idx)} 
                                  className="text-slate-300 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={18} />
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-slate-400">Azienda</label>
                              <input 
                                type="text" 
                                value={exp.company}
                                onChange={(e) => {
                                  const newExps = [...siteContent.experiences];
                                  newExps[idx].company = e.target.value;
                                  setSiteContent({ ...siteContent, experiences: newExps });
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-slate-400">Periodo</label>
                              <input 
                                type="text" 
                                value={exp.period}
                                onChange={(e) => {
                                  const newExps = [...siteContent.experiences];
                                  newExps[idx].period = e.target.value;
                                  setSiteContent({ ...siteContent, experiences: newExps });
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div className="space-y-1 mb-4">
                            <label className="text-[10px] font-bold uppercase text-slate-400">Ruolo</label>
                            <input 
                              type="text" 
                              value={exp.role}
                              onChange={(e) => {
                                const newExps = [...siteContent.experiences];
                                newExps[idx].role = e.target.value;
                                setSiteContent({ ...siteContent, experiences: newExps });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-slate-400">Descrizione</label>
                            <textarea 
                              rows={3}
                              value={exp.description}
                              onChange={(e) => {
                                const newExps = [...siteContent.experiences];
                                newExps[idx].description = e.target.value;
                                setSiteContent({ ...siteContent, experiences: newExps });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Education */}
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <GraduationCap size={22} />
                        Formazione
                      </h3>
                      <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold transition-all">
                        <Plus size={16} /> Aggiungi
                      </button>
                    </div>
                    <div className="space-y-6">
                      {siteContent.education.map((edu: any, idx: number) => (
                        <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <AnimatePresence mode="wait">
                              {eduToDeleteIdx === idx ? (
                                <motion.div 
                                  key="confirm"
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-red-100"
                                >
                                  <span className="text-[10px] font-bold text-red-600">sei sicuro di voler eliminare?</span>
                                  <div className="flex gap-1">
                                    <button 
                                      onClick={() => {
                                        removeEducation(idx);
                                        setEduToDeleteIdx(null);
                                      }}
                                      className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                      si
                                    </button>
                                    <button 
                                      onClick={() => setEduToDeleteIdx(null)}
                                      className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-300 transition-colors"
                                    >
                                      no
                                    </button>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.button 
                                  key="trash"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  onClick={() => setEduToDeleteIdx(idx)} 
                                  className="text-slate-300 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={18} />
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-slate-400">Istituto</label>
                              <input 
                                type="text" 
                                value={edu.institution}
                                onChange={(e) => {
                                  const newEdus = [...siteContent.education];
                                  newEdus[idx].institution = e.target.value;
                                  setSiteContent({ ...siteContent, education: newEdus });
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-slate-400">Periodo</label>
                              <input 
                                type="text" 
                                value={edu.period}
                                onChange={(e) => {
                                  const newEdus = [...siteContent.education];
                                  newEdus[idx].period = e.target.value;
                                  setSiteContent({ ...siteContent, education: newEdus });
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div className="space-y-1 mb-4">
                            <label className="text-[10px] font-bold uppercase text-slate-400">Titolo di Studio</label>
                            <input 
                              type="text" 
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdus = [...siteContent.education];
                                newEdus[idx].degree = e.target.value;
                                setSiteContent({ ...siteContent, education: newEdus });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-slate-400">Descrizione</label>
                            <textarea 
                              rows={3}
                              value={edu.description}
                              onChange={(e) => {
                                const newEdus = [...siteContent.education];
                                newEdus[idx].description = e.target.value;
                                setSiteContent({ ...siteContent, education: newEdus });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-12">
                  {/* Skills */}
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Award size={22} />
                        Competenze & Asset
                      </h3>
                      <button onClick={addSkill} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold transition-all">
                        <Plus size={16} /> Aggiungi
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {siteContent.skills.map((skill: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <input 
                            type="text" 
                            value={skill.name}
                            onChange={(e) => {
                              const newSkills = [...siteContent.skills];
                              newSkills[idx].name = e.target.value;
                              setSiteContent({ ...siteContent, skills: newSkills });
                            }}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            placeholder="Nome competenza"
                          />
                          <select 
                            value={skill.category}
                            onChange={(e) => {
                              const newSkills = [...siteContent.skills];
                              newSkills[idx].category = e.target.value;
                              setSiteContent({ ...siteContent, skills: newSkills });
                            }}
                            className="bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs font-bold"
                          >
                            <option value="professional">Pro</option>
                            <option value="interpersonal">Soft</option>
                          </select>
                          <AnimatePresence mode="wait">
                            {skillToDeleteIdx === idx ? (
                              <motion.div 
                                key="confirm"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-red-100 shadow-sm"
                              >
                                <span className="text-[9px] font-bold text-red-600">elimina?</span>
                                <button 
                                  onClick={() => {
                                    removeSkill(idx);
                                    setSkillToDeleteIdx(null);
                                  }}
                                  className="px-2 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded hover:bg-red-700"
                                >
                                  si
                                </button>
                                <button 
                                  onClick={() => setSkillToDeleteIdx(null)}
                                  className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-bold rounded hover:bg-slate-200"
                                >
                                  no
                                </button>
                              </motion.div>
                            ) : (
                              <motion.button 
                                key="trash"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => setSkillToDeleteIdx(idx)} 
                                className="text-slate-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={16} />
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Languages */}
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Globe size={22} />
                        Lingue
                      </h3>
                      <button onClick={addLanguage} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-bold transition-all">
                        <Plus size={16} /> Aggiungi
                      </button>
                    </div>
                    <div className="space-y-4">
                      {siteContent.languages.map((lang: any, idx: number) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <AnimatePresence mode="wait">
                              {langToDeleteIdx === idx ? (
                                <motion.div 
                                  key="confirm"
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-red-100"
                                >
                                  <span className="text-[10px] font-bold text-red-600">sei sicuro di voler eliminare?</span>
                                  <div className="flex gap-1">
                                    <button 
                                      onClick={() => {
                                        removeLanguage(idx);
                                        setLangToDeleteIdx(null);
                                      }}
                                      className="px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                      si
                                    </button>
                                    <button 
                                      onClick={() => setLangToDeleteIdx(null)}
                                      className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-300 transition-colors"
                                    >
                                      no
                                    </button>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.button 
                                  key="trash"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  onClick={() => setLangToDeleteIdx(idx)} 
                                  className="text-slate-300 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={18} />
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-slate-400">Lingua</label>
                              <input 
                                type="text" 
                                value={lang.language}
                                onChange={(e) => {
                                  const newLangs = [...siteContent.languages];
                                  newLangs[idx].language = e.target.value;
                                  setSiteContent({ ...siteContent, languages: newLangs });
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase text-slate-400">Livello</label>
                              <input 
                                type="text" 
                                value={lang.level}
                                onChange={(e) => {
                                  const newLangs = [...siteContent.languages];
                                  newLangs[idx].level = e.target.value;
                                  setSiteContent({ ...siteContent, languages: newLangs });
                                }}
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-slate-400">Descrizione</label>
                            <input 
                              type="text" 
                              value={lang.description}
                              onChange={(e) => {
                                const newLangs = [...siteContent.languages];
                                newLangs[idx].description = e.target.value;
                                setSiteContent({ ...siteContent, languages: newLangs });
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'texts' && (
                <div className="space-y-12">
                  {/* Hero Section */}
                  <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Layout size={22} />
                      Sezione Hero
                    </h3>
                    <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Badge Titolo</label>
                        <input 
                          type="text" 
                          value={siteContent.hero.badge}
                          onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, badge: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Nome</label>
                        <input 
                          type="text" 
                          value={siteContent.hero.name}
                          onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, name: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Citazione</label>
                        <input 
                          type="text" 
                          value={siteContent.hero.quote}
                          onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, quote: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Testo AI</label>
                        <textarea 
                          rows={2}
                          value={siteContent.hero.aiText}
                          onChange={(e) => setSiteContent({...siteContent, hero: {...siteContent.hero, aiText: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                        />
                      </div>
                    </div>
                  </section>

                  {/* About Section */}
                  <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Type size={22} />
                      Sezione About
                    </h3>
                    <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Titolo</label>
                        <input 
                          type="text" 
                          value={siteContent.about.title}
                          onChange={(e) => setSiteContent({...siteContent, about: {...siteContent.about, title: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Paragrafo 1</label>
                        <textarea 
                          rows={3}
                          value={siteContent.about.p1}
                          onChange={(e) => setSiteContent({...siteContent, about: {...siteContent.about, p1: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Paragrafo 2</label>
                        <textarea 
                          rows={3}
                          value={siteContent.about.p2}
                          onChange={(e) => setSiteContent({...siteContent, about: {...siteContent.about, p2: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Manifesto Section */}
                  <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <FileText size={22} />
                      Manifesto Professionale
                    </h3>
                    <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Titolo</label>
                        <input 
                          type="text" 
                          value={siteContent.manifesto.title}
                          onChange={(e) => setSiteContent({...siteContent, manifesto: {...siteContent.manifesto, title: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Paragrafo 1</label>
                        <textarea 
                          rows={3}
                          value={siteContent.manifesto.p1}
                          onChange={(e) => setSiteContent({...siteContent, manifesto: {...siteContent.manifesto, p1: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Paragrafo 2</label>
                        <textarea 
                          rows={3}
                          value={siteContent.manifesto.p2}
                          onChange={(e) => setSiteContent({...siteContent, manifesto: {...siteContent.manifesto, p2: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Paragrafo 3</label>
                        <textarea 
                          rows={3}
                          value={siteContent.manifesto.p3}
                          onChange={(e) => setSiteContent({...siteContent, manifesto: {...siteContent.manifesto, p3: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Paragrafo 4 (Grassetto)</label>
                        <textarea 
                          rows={2}
                          value={siteContent.manifesto.p4}
                          onChange={(e) => setSiteContent({...siteContent, manifesto: {...siteContent.manifesto, p4: e.target.value}})}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none font-bold"
                        />
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="space-y-12">
                  {/* Profile Image */}
                  <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <ImageIcon size={22} />
                      Foto Profilo
                    </h3>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                        <img 
                          src={siteContent.theme?.profileImage || "https://picsum.photos/200"} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-4">
                        <p className="text-sm text-slate-500">Carica una nuova foto profilo per la sezione Hero.</p>
                        <div className="flex flex-wrap gap-3">
                          <button 
                            onClick={() => document.getElementById('profile-upload')?.click()}
                            disabled={uploadingProfile}
                            className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50"
                          >
                            <Upload size={16} />
                            {uploadingProfile ? 'Caricamento...' : 'Carica Foto'}
                          </button>
                          <input 
                            id="profile-upload"
                            type="file" 
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                            className="hidden"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-slate-400">O inserisci URL immagine</label>
                          <input 
                            type="text" 
                            value={siteContent.theme?.profileImage || ''}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, profileImage: e.target.value }
                            })}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Fonts */}
                  <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Type size={22} />
                      Tipografia (Font)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Font Serif (Titoli)</label>
                        <select 
                          value={siteContent.theme?.fontSerif || 'Playfair Display'}
                          onChange={(e) => setSiteContent({
                            ...siteContent, 
                            theme: { ...siteContent.theme, fontSerif: e.target.value }
                          })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                        >
                          <optgroup label="Serif Eleganti">
                            <option value="Playfair Display">Playfair Display</option>
                            <option value="Cormorant Garamond">Cormorant Garamond</option>
                            <option value="Libre Baskerville">Libre Baskerville</option>
                            <option value="EB Garamond">EB Garamond</option>
                          </optgroup>
                          <optgroup label="Serif Leggibili">
                            <option value="Lora">Lora</option>
                            <option value="Merriweather">Merriweather</option>
                            <option value="PT Serif">PT Serif</option>
                            <option value="Crimson Text">Crimson Text</option>
                          </optgroup>
                          <optgroup label="Standard">
                            <option value="Georgia">Georgia</option>
                            <option value="serif">Serif di sistema</option>
                          </optgroup>
                        </select>
                        <p className="text-[10px] text-slate-400 italic">Usato per i titoli principali e scritte in corsivo.</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Font Sans (Testi)</label>
                        <select 
                          value={siteContent.theme?.fontSans || 'Plus Jakarta Sans'}
                          onChange={(e) => setSiteContent({
                            ...siteContent, 
                            theme: { ...siteContent.theme, fontSans: e.target.value }
                          })}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm"
                        >
                          <optgroup label="Moderni & Brand">
                            <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                            <option value="Inter">Inter</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Poppins">Poppins</option>
                          </optgroup>
                          <optgroup label="Popolari">
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                            <option value="Raleway">Raleway</option>
                          </optgroup>
                          <optgroup label="Caratteristici">
                            <option value="Ubuntu">Ubuntu</option>
                            <option value="Oswald">Oswald</option>
                            <option value="Quicksand">Quicksand</option>
                            <option value="Nunito">Nunito</option>
                          </optgroup>
                          <optgroup label="Standard">
                            <option value="Helvetica">Helvetica / Arial</option>
                            <option value="sans-serif">Sans-serif di sistema</option>
                          </optgroup>
                        </select>
                        <p className="text-[10px] text-slate-400 italic">Usato per i paragrafi e i testi di navigazione.</p>
                      </div>
                    </div>
                  </section>

                  {/* Colors */}
                  <section>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Palette size={22} />
                      Colori del Sito
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Colore Primario</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={siteContent.theme?.primaryColor || '#0f172a'}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, primaryColor: e.target.value }
                            })}
                            className="w-10 h-10 rounded-lg border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={siteContent.theme?.primaryColor || '#0f172a'}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, primaryColor: e.target.value }
                            })}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Sfondo Pagina</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={siteContent.theme?.backgroundColor || '#f8fafc'}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, backgroundColor: e.target.value }
                            })}
                            className="w-10 h-10 rounded-lg border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={siteContent.theme?.backgroundColor || '#f8fafc'}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, backgroundColor: e.target.value }
                            })}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Colore Testo</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={siteContent.theme?.textColor || '#334155'}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, textColor: e.target.value }
                            })}
                            className="w-10 h-10 rounded-lg border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={siteContent.theme?.textColor || '#334155'}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, textColor: e.target.value }
                            })}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Colore Accento</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={siteContent.theme?.accentColor || '#64748b'}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, accentColor: e.target.value }
                            })}
                            className="w-10 h-10 rounded-lg border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={siteContent.theme?.accentColor || '#64748b'}
                            onChange={(e) => setSiteContent({
                              ...siteContent, 
                              theme: { ...siteContent.theme, accentColor: e.target.value }
                            })}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

            </div>
          )}
        </div>
        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-400 italic">
            * Ricorda di cliccare "Salva Modifiche" per rendere pubblici i cambiamenti.
          </p>
          <button 
            onClick={saveSiteContent}
            disabled={savingContent}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
          >
            {savingContent ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save size={18} />
            )}
            Salva Modifiche
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
