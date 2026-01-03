import React, { useEffect, useState } from 'react';
import { ArrowLeft, Key, UserCheck, Sparkles, Car, ShieldCheck, Clock, Loader2 } from 'lucide-react';

interface FleetGalleryProps {
  onBack: () => void;
  onCarClick: (car: any) => void;
}

const FleetGallery: React.FC<FleetGalleryProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate data loading time
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const serviceHighlights = [
    {
      url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
      title: "Premium Handover",
      desc: "A seamless, paperless key handover experience.",
      icon: Key
    },
    {
      url: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
      title: "Pristine Detailing",
      desc: "Every vehicle is sanitized and detailed before your trip.",
      icon: Sparkles
    },
    {
      url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800",
      title: "The Fleet Lot",
      desc: "A wide selection of hybrid city cars ready for dispatch.",
      icon: Car
    },
    {
      url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800",
      title: "Modern Interiors",
      desc: "Equipped with Apple CarPlay, Android Auto, and climate control.",
      icon: UserCheck
    },
    {
      url: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80&w=800",
      title: "Safety First",
      desc: "Rigorous mechanical checks ensure your peace of mind.",
      icon: ShieldCheck
    },
    {
      url: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800",
      title: "24/7 Availability",
      desc: "We work around your schedule, day or night.",
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-vl-accent/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="inline-block mb-3 px-3 py-1 rounded-full border border-vl-accent/20 bg-vl-accent/5">
             <span className="text-vl-accent font-mono text-xs tracking-widest uppercase">The VL Standard</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">EXPERIENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-vl-accent to-yellow-200">EXCELLENCE</span></h1>
          <p className="text-gray-400 max-w-xl mx-auto font-light text-lg">
            Beyond just a rental. A commitment to quality, safety, and modern convenience in every interaction.
          </p>
        </div>
        
        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {isLoading ? (
             // Skeleton Loader
             Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-80 rounded-3xl bg-vl-surface border border-vl-subtle overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-vl-surface via-vl-subtle to-vl-surface animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]"></div>
                   <div className="absolute bottom-0 left-0 w-full p-8">
                      <div className="w-12 h-12 bg-vl-subtle rounded-xl mb-4"></div>
                      <div className="w-3/4 h-6 bg-vl-subtle rounded mb-2"></div>
                      <div className="w-full h-4 bg-vl-subtle rounded"></div>
                   </div>
                </div>
             ))
           ) : (
             // Real Content
             serviceHighlights.map((item, index) => (
               <div 
                 key={index} 
                 className="group relative h-80 rounded-3xl overflow-hidden border border-vl-subtle cursor-default animate-fade-in-up" 
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                  {/* Background Image */}
                  <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" 
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-vl-accent mb-4 border border-white/10 shadow-lg group-hover:bg-vl-accent group-hover:text-black transition-colors duration-300">
                          <item.icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                          {item.desc}
                      </p>
                  </div>

                  {/* Decorative Borders */}
                  <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-vl-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-vl-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               </div>
             ))
           )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">Ready to drive?</p>
            <button 
                onClick={onBack}
                className="px-8 py-4 bg-transparent border border-vl-subtle text-white font-bold rounded-xl hover:border-vl-accent hover:text-vl-accent transition-all active:scale-95"
            >
                View Available Cars
            </button>
        </div>
      </div>
    </div>
  );
};

export default FleetGallery;