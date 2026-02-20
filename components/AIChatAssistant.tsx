
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChat } from '../services/geminiService';
import { Message } from '../types';
import { ICONS } from '../constants';

interface AIChatAssistantProps {
  siteContent: any;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ siteContent }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Ciao! Sono il profilo AI di ${siteContent?.hero?.name || 'Federica'}. Vuoi saperne di più sul mio approccio al marketing o sul mio percorso professionale?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  // Initialize chat once
  useEffect(() => {
    if (siteContent) {
      chatRef.current = getGeminiChat(siteContent);
    }
  }, [siteContent]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!chatRef.current && siteContent) {
        chatRef.current = getGeminiChat(siteContent);
      }
      
      if (!chatRef.current) {
        throw new Error("Chat not initialized");
      }

      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Mi scuso, ho avuto un piccolo problema tecnico. Puoi riprovare?" }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sembra che ci sia un problema di connessione. Assicurati che l'API Key sia configurata." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chat" className="py-24 px-6 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 serif">Interagisci con il mio Profilo AI</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Fai domande sulla mia esperienza Erasmus, il mio lavoro in azienda familiare o la mia visione della comunicazione.
          </p>
        </div>

        <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col h-[600px]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Federica AI Assistant</span>
            </div>
            <ICONS.Chat />
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-white text-slate-900 rounded-tr-none' 
                    : 'bg-slate-700 text-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-700 bg-slate-800/80">
            <div className="flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Chiedimi della mia formazione o delle mie soft skills..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-white text-slate-900 w-12 h-12 rounded-full flex items-center justify-center hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                <ICONS.ArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIChatAssistant;
