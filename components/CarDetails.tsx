import React, { useEffect, useState, useRef } from 'react';
import { Car } from '../types';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Fuel, 
  Settings, 
  Users, 
  Check, 
  Share2, 
  Star,
  ZoomIn,
  Move
} from 'lucide-react';

interface CarDetailsProps {
  car: Car;
  onBack: () => void;
  onBookNow: () => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, onBack, onBookNow }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const images = car.gallery && car.gallery.length > 0 
    ? car.gallery 
    : [car.imageUrl, car.imageUrl];

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentIdx(0);
    setIsZooming(false);
  }, [car]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
    setIsZooming(false);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    setIsZooming(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZooming || !containerRef.current) return;
    const touch = e.touches[0];
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    let x = ((touch.clientX - left) / width) * 100;
    let y = ((touch.clientY - top) / height) * 100;
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    setZoomPos({ x, y });
  };

  const toggleZoom = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouch = 'touches' in e;
    if (!isZooming && containerRef.current) {
        let clientX, clientY;
        if (isTouch) {
            clientX = (e as React.TouchEvent).touches[0]?.clientX || (e as React.TouchEvent).changedTouches[0]?.clientX;
            clientY = (e as React.TouchEvent).touches[0]?.clientY || (e as React.TouchEvent).changedTouches[0]?.clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((clientX - left) / width) * 100;
        const y = ((clientY - top) / height) * 100;
        setZoomPos({ x, y });
    }
    setIsZooming(!isZooming);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "94766126754";
    const message = `Hello VL Rent a Car, I am interested in the ${car.name} ${car.year}. Is it available?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-vl-dark text-white pb-24 lg:pb-0 animate-fade-in-up selection:bg-vl-accent selection:text-black">
      
      {/* Internal Header Removed - Handled by Global Header in App.tsx */}

      <div className="container mx-auto px-4 sm:px-6 py-8 pt-4">
        {/* Mobile Action Row (Share) */}
        <div className="flex justify-end mb-4 lg:hidden">
             <button onClick={handleWhatsAppClick} className="p-2 rounded-full border border-vl-subtle bg-vl-surface hover:bg-vl-accent hover:text-black transition-colors">
                <Share2 size={18} />
             </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* --- Left Column: Gallery --- */}
            <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* Main Carousel Stage */}
                <div 
                  ref={containerRef}
                  className={`relative w-full aspect-[4/3] sm:aspect-video bg-vl-surface rounded-3xl overflow-hidden border border-vl-subtle shadow-2xl group select-none 
                    ${isZooming ? 'cursor-move touch-none' : 'cursor-zoom-in'}`}
                  onMouseEnter={() => !isZooming && setIsZooming(true)} 
                  onMouseLeave={() => setIsZooming(false)}
                  onMouseMove={handleMouseMove}
                  onClick={toggleZoom}
                  onTouchMove={isZooming ? handleTouchMove : undefined}
                >
                    {/* The Image */}
                    <img 
                        src={images[currentIdx]} 
                        alt={`${car.name} view ${currentIdx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 ease-out pointer-events-none"
                        style={{
                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                            transform: isZooming ? 'scale(2.0)' : 'scale(1)'
                        }}
                    />

                    {/* Navigation Arrows (Hidden if zooming) */}
                    {!isZooming && (
                      <>
                        <button 
                          onClick={handlePrev}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-vl-accent hover:text-black hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={handleNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-vl-accent hover:text-black hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}

                    {/* Badges (Hide when zoomed) */}
                    <div className={`absolute top-4 left-4 flex gap-2 pointer-events-none transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
                       <span className="bg-vl-accent text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {car.year}
                       </span>
                       <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" /> Top Rated
                       </span>
                    </div>

                    {/* Interaction Hint (Bottom Right) */}
                    <div className={`absolute bottom-4 right-4 pointer-events-none transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
                         <div className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider flex items-center gap-2 border border-white/10">
                            <ZoomIn size={12} className="text-vl-accent" /> 
                            <span className="hidden sm:inline">Hover to Zoom</span>
                            <span className="sm:hidden">Tap to Zoom</span>
                         </div>
                    </div>

                     {/* Mobile Panning Hint */}
                     {isZooming && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none sm:hidden animate-fade-in-up">
                            <div className="bg-black/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-vl-accent/30 flex items-center gap-2">
                                <Move size={14} className="text-vl-accent" /> Drag to Pan
                            </div>
                        </div>
                     )}
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    {images.map((img, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => { setCurrentIdx(idx); setIsZooming(false); }}
                            className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all snap-start ${
                                currentIdx === idx 
                                ? 'border-vl-accent opacity-100 shadow-[0_0_10px_rgba(250,204,21,0.3)] scale-105' 
                                : 'border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                            }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Right Column: Info & Details --- */}
            <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Header Info */}
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded bg-vl-surface border border-vl-subtle text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                            {car.category}
                        </span>
                        <span className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Check size={10} /> Available Now
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                        {car.name}
                    </h1>
                    
                    <div className="flex items-baseline gap-2 pb-6 border-b border-vl-subtle mt-4">
                        <span className="text-4xl sm:text-5xl font-bold text-vl-accent tracking-tighter">
                            {car.pricePerDay.toLocaleString()}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-400">{car.currency}</span>
                            <span className="text-xs text-gray-500">/ Day</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-vl-surface/50 border border-vl-subtle rounded-2xl p-6">
                    <p className="text-gray-300 leading-relaxed font-light">
                        {car.description}
                    </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-vl-surface border border-vl-subtle p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:border-vl-accent/30 transition-colors group">
                        <Fuel size={20} className="text-gray-500 group-hover:text-vl-accent transition-colors" />
                        <div>
                           <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">Fuel Type</span>
                           <span className="block text-sm font-bold text-white">{car.fuelType}</span>
                        </div>
                    </div>
                    <div className="bg-vl-surface border border-vl-subtle p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:border-vl-accent/30 transition-colors group">
                        <Settings size={20} className="text-gray-500 group-hover:text-vl-accent transition-colors" />
                         <div>
                           <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">Gearbox</span>
                           <span className="block text-sm font-bold text-white">{car.transmission}</span>
                        </div>
                    </div>
                    <div className="bg-vl-surface border border-vl-subtle p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:border-vl-accent/30 transition-colors group">
                        <Users size={20} className="text-gray-500 group-hover:text-vl-accent transition-colors" />
                         <div>
                           <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">Capacity</span>
                           <span className="block text-sm font-bold text-white">{car.seats} People</span>
                        </div>
                    </div>
                </div>

                {/* Key Features */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Included Features</h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                        {car.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-vl-accent"></div>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden lg:flex flex-col gap-4 mt-4">
                    <button 
                        onClick={onBookNow}
                        className="w-full py-4 bg-gradient-to-r from-vl-accent to-yellow-400 text-black font-bold text-lg rounded-xl hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 relative overflow-hidden group"
                    >
                         {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"></div>
                        <span className="relative z-20">Book This Vehicle</span>
                    </button>
                    <div className="text-center">
                         <p className="text-[10px] text-gray-600 uppercase tracking-wider">No Credit Card Required • Pay at Pickup</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-vl-surface border-t border-vl-subtle p-4 lg:hidden z-50 flex items-center justify-between gap-4 safe-area-pb">
        <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-bold">Total Rate</span>
            <span className="text-xl font-bold text-white">{car.pricePerDay.toLocaleString()} <span className="text-xs text-vl-accent font-normal">{car.currency}</span></span>
        </div>
        <button 
            onClick={onBookNow}
            className="flex-1 py-3 bg-vl-accent text-black font-bold text-lg rounded-xl shadow-lg active:scale-95 transition-transform relative overflow-hidden group"
        >
             <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"></div>
            <span className="relative z-20">Book Now</span>
        </button>
      </div>
    </div>
  );
};

export default CarDetails;