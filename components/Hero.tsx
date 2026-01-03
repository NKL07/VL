import React, { useEffect, useState, useRef } from 'react';
import { Play, ChevronDown, Activity, Zap } from 'lucide-react';

interface HeroProps {
  onTermsClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onTermsClick }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            const x = (e.clientX / clientWidth) - 0.5;
            const y = (e.clientY / clientHeight) - 0.5;
            setMousePos({ x, y });
        }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToInventory = () => {
    const element = document.getElementById('inventory');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] w-full flex flex-col justify-center items-center overflow-hidden bg-vl-dark perspective-1000">
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Layer 1: Base Dark Overlay */}
        <div className="absolute inset-0 bg-[#030304] z-0" />
        
        {/* Layer 2: Moving Cyber Grid */}
        <div 
            className="absolute inset-0 bg-cyber-grid bg-[length:60px_60px] opacity-10 animate-grid-flow pointer-events-none transform origin-bottom"
            style={{ 
                transform: `rotateX(60deg) translateY(${scrollY * 0.5}px) scale(2)`,
                maskImage: 'linear-gradient(to bottom, transparent, black)'
            }} 
        />

        {/* Layer 3: The Car (Parallax Effect) */}
        <div 
            className="absolute inset-0 z-10"
            style={{ 
                transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px) scale(${1 + scrollY * 0.0005})` 
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-vl-dark via-transparent to-transparent z-20" />
            <img 
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2500"
              alt="Luxury Car Night" 
              className="w-full h-full object-cover opacity-80"
            />
        </div>

        {/* Layer 4: Cinematic Spotlight / Glow */}
        <div 
            className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-40"
            style={{
                background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, rgba(234, 179, 8, 0.15), transparent 60%)`
            }}
        />
        
        {/* Layer 5: Dust/Particles (CSS generated) */}
        <div className="absolute inset-0 z-10 opacity-30 animate-pulse-ring" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* Content Layer with Depth */}
      <div 
        className="relative z-30 container mx-auto px-4 sm:px-6 text-center mt-[-5vh] transform transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
      >
        
        {/* Animated Status Badge */}
        <div className="inline-flex items-center gap-3 mb-8 pl-1 pr-4 py-1 rounded-full border border-vl-accent/20 bg-vl-accent/5 backdrop-blur-md animate-fade-in-up hover:bg-vl-accent/10 transition-colors cursor-default shadow-[0_0_20px_rgba(234,179,8,0.2)]">
          <div className="bg-vl-accent text-black p-1 rounded-full animate-pulse">
             <Activity size={12} />
          </div>
          <span className="text-gray-200 font-mono text-xs tracking-[0.2em] uppercase font-bold text-shadow-sm">System Online • 2026 Fleet</span>
        </div>
        
        {/* Hero Headline with Glitch/Glow */}
        <div className="relative mb-6 group">
            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 leading-[0.85] animate-fade-in-up drop-shadow-2xl select-none">
                FUTURE
            </h1>
            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-bold tracking-tighter text-white leading-[0.85] animate-fade-in-up delay-100 relative inline-block">
                <span className="relative z-10 text-shadow-glow">DRIVEN</span>
                <span className="absolute top-0 left-0 -z-10 text-vl-accent blur-lg opacity-50 animate-pulse">DRIVEN</span>
            </h1>
        </div>
        
        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-12 font-light px-4 animate-fade-in-up leading-relaxed font-mono tracking-wide drop-shadow-md" style={{ animationDelay: '0.3s' }}>
           <span className="text-vl-accent font-bold">///</span> REDEFINING MOBILITY IN MATARA. <br className="hidden sm:block"/>
           Experience hybrid efficiency meeting digital simplicity.
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={scrollToInventory}
            className="group relative px-10 py-5 bg-vl-accent text-black font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-all shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_50px_rgba(250,204,21,0.5)]"
          >
             <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
             <span className="relative z-10 flex items-center gap-3">
                VIEW FLEET <Zap size={18} className="fill-black" />
             </span>
          </button>
          
          <button 
            onClick={onTermsClick}
            className="group flex items-center gap-4 px-6 py-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all backdrop-blur-sm"
          >
             <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-vl-accent group-hover:bg-vl-accent group-hover:text-black transition-all duration-300">
                <Play size={14} className="fill-current ml-0.5" />
             </div>
             <div className="text-left">
                <span className="block text-[10px] font-bold uppercase text-gray-400 group-hover:text-white transition-colors">Watch Video</span>
                <span className="block text-sm font-mono tracking-widest text-white">HOW IT WORKS</span>
             </div>
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator - Perfect Centering */}
      <div className="absolute bottom-12 w-full flex justify-center z-30 pointer-events-none">
        <div className="animate-bounce flex flex-col items-center gap-3 opacity-60">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-gray-400 drop-shadow-md">Scroll to Explore</span>
            <ChevronDown size={24} className="text-vl-accent drop-shadow-md" />
        </div>
      </div>

    </section>
  );
};

export default Hero;