
import React, { useState, useEffect } from 'react';

interface PortfolioItem {
  id: string;
  image: string;
  link: string;
  title: string;
}

const PortfolioSection: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    
    // Listen for updates (custom event or just re-fetch)
    window.addEventListener('portfolio-updated', fetchItems);
    return () => window.removeEventListener('portfolio-updated', fetchItems);
  }, []);

  return (
    <section id="portfolio" className="py-24 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold serif italic text-slate-900">Portfolio</h2>
          <div className="w-16 h-1 bg-slate-900 mx-auto mt-6"></div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <a 
                key={item.id} 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white font-bold uppercase tracking-widest text-xs border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm">
                    Visualizza Progetto
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
