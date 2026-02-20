
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

  const DEFAULT_ITEMS = [
    {
      id: "1",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL2bd5ONoJocQhUGCafULHLNRz_RWQhkPJRQ&s",
      link: "https://www.facebook.com/LCMobiliLionetto/photos/d41d8cd9/1352057459946831/",
      title: "Social Media Design"
    },
    {
      id: "2",
      image: "https://www.lcmobili.it/wp-content/uploads/2026/01/Grigio-Moderno-Divano-Annuncio-Post-Instagram.png",
      link: "https://www.lcmobili.it/",
      title: "Web & Ad Strategy"
    }
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        } else {
          setItems(DEFAULT_ITEMS);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setItems(DEFAULT_ITEMS);
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
