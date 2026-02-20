
import React, { useState } from 'react';
import { Lock, ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLogin: (password: string) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onLogin(password);
      } else {
        setError('Password non corretta. Riprova.');
      }
    } catch (err) {
      setError('Errore di connessione. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-3xl p-10 shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 mx-auto">
          <Lock className="text-slate-900" size={32} />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold serif text-slate-900 mb-2">Area Riservata</h2>
          <p className="text-slate-500">Inserisci la tua password per accedere alla dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all text-center text-lg tracking-widest"
              autoFocus
              required
            />
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20"
          >
            {loading ? 'Verifica...' : (
              <>
                Accedi
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
