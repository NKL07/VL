import React from 'react';
import { Car } from '../types';
import { Gauge, Users, ArrowRight, Fuel, Star, Zap } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  return (
    <div 
      onClick={() => onClick(car)}
      className="group relative w-full bg-[#0A0A0C] rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
    >
      {/* Holographic Border */}
      <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-b from-white/10 to-transparent group-hover:from-vl-accent group-hover:to-transparent transition-all duration-500 opacity-50 group-hover:opacity-100">
         <div className="absolute inset-0 bg-[#0A0A0C] rounded-[2rem]" />
      </div>

      <div className="relative h-full flex flex-col z-10">
        
        {/* Top: Image Area */}
        <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10 opacity-80"></div>
            
            <img 
              src={car.imageUrl} 
              alt={car.name} 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />

            {/* Top Tags */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
                <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Zap size={12} className="text-vl-accent fill-vl-accent" /> 
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{car.year}</span>
                </div>
            </div>

            {/* Hover Book Action */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                <button className="px-6 py-3 bg-vl-accent text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 shadow-xl">
                    View Details <ArrowRight size={16} />
                </button>
            </div>
        </div>

        {/* Bottom: Info */}
        <div className="p-6 pt-2 flex flex-col gap-4">
            <div>
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-white font-sans tracking-tight group-hover:text-vl-accent transition-colors">{car.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs font-mono uppercase tracking-wide">
                    <span>{car.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <div className="flex items-center gap-1 text-gray-400">
                        <Star size={10} className="text-vl-accent fill-vl-accent" /> 4.9
                    </div>
                </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-2 py-4 border-t border-dashed border-white/10">
                <div className="flex flex-col items-center gap-1">
                    <Fuel size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                    <span className="text-[10px] text-gray-500 font-bold">{car.fuelType}</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-l border-white/5">
                    <Gauge size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                    <span className="text-[10px] text-gray-500 font-bold">{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-l border-white/5">
                    <Users size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                    <span className="text-[10px] text-gray-500 font-bold">{car.seats} Seats</span>
                </div>
            </div>

            {/* Price Footer */}
            <div className="flex items-center justify-between pt-2">
                 <div className="flex flex-col">
                     <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Daily Rate</span>
                     <div className="flex items-baseline gap-1">
                         <span className="text-sm text-vl-accent font-bold">LKR</span>
                         <span className="text-2xl font-bold text-white tracking-tight">{car.pricePerDay.toLocaleString()}</span>
                     </div>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:bg-vl-accent group-hover:text-black group-hover:border-vl-accent transition-all duration-300">
                    <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;