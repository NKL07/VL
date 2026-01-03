import React, { useEffect } from 'react';
import { ArrowLeft, Check, AlertCircle, Fuel, UserX, Gauge, Info, ShieldCheck, FileText, Lock, Phone } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
  onSelectPlan: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onBack, onSelectPlan }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactSales = () => {
    const phoneNumber = "94766126754";
    const message = "I am willing to book a car";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 py-8 pb-24">
        <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">TRANSPARENT <span className="text-vl-accent">PRICING</span></h1>
          <p className="text-gray-400 max-w-xl mx-auto font-light text-lg">
            No hidden fees. Just simple, straightforward rates for your journey.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Main Plan Card - Full Width Layout */}
          <div className="bg-vl-surface border border-vl-subtle rounded-3xl overflow-hidden relative group animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-700">
              <Gauge size={300} className="text-vl-accent rotate-12" />
            </div>
            
            <div className="p-8 md:p-12 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Standard City Hybrid</h2>
                  <p className="text-gray-400 font-mono text-sm bg-vl-dark/50 inline-block px-3 py-1 rounded border border-vl-subtle">SUZUKI WAGON R FZ SAFETY (2018)</p>
                </div>
                <div className="bg-vl-accent text-black px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(250,204,21,0.4)] tracking-wider animate-pulse">
                  MOST POPULAR
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start border-t border-vl-subtle pt-8">
                  <div className="flex-1 w-full lg:w-auto">
                      <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-gray-400 text-lg font-bold">LKR</span>
                        <span className="text-7xl font-bold text-white tracking-tighter drop-shadow-lg">4,500</span>
                        <span className="text-gray-500 font-medium">/ Day</span>
                      </div>
                      
                      <button 
                        onClick={onSelectPlan}
                        className="w-full px-8 py-5 bg-vl-accent text-black text-lg font-bold rounded-xl hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group/btn"
                        >
                        <span className="relative z-10">Select This Plan</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 ease-in-out"></div>
                     </button>
                  </div>

                  <div className="flex-1 w-full">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-vl-subtle pb-2">Included</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-200">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                                    <Check size={12} />
                                </div>
                                <span><strong className="text-white">150 KM</strong> Daily</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-200">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                                    <Check size={12} />
                                </div>
                                <span>Full Insurance</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-200">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                                    <Check size={12} />
                                </div>
                                <span>Roadside Assist</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-vl-subtle pb-2">Specifics</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-300">
                                <Gauge size={16} className="text-gray-500" />
                                <span>Extra: <span className="text-vl-accent font-bold">LKR 25</span> / KM</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                <UserX size={16} className="text-gray-500" />
                                <span>Self-drive Only</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                <Fuel size={16} className="text-gray-500" />
                                <span>Fuel Excluded</span>
                                </li>
                            </ul>
                        </div>
                     </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Grid for Security & Documents - Bigger Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            
            {/* Security Requirements Card */}
            <div className="bg-gradient-to-br from-vl-surface to-vl-dark border border-vl-subtle rounded-3xl p-1 overflow-hidden relative group hover:border-vl-accent/50 transition-colors shadow-lg h-full">
               <div className="absolute top-0 left-0 w-full h-1 bg-vl-accent/50"></div>
               <div className="bg-vl-dark/50 backdrop-blur-sm p-8 rounded-[20px] h-full flex flex-col">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-14 h-14 bg-vl-accent/10 rounded-2xl flex items-center justify-center text-vl-accent border border-vl-accent/20">
                     <Lock size={28} />
                   </div>
                   <div>
                       <h3 className="font-bold text-white text-2xl">Security</h3>
                       <p className="text-gray-500 text-sm">Requirements for rental</p>
                   </div>
                 </div>
                 
                 <div className="space-y-4 flex-1">
                   <div className="flex gap-4 items-center p-4 rounded-xl bg-vl-surface border border-vl-subtle hover:border-vl-accent/30 transition-colors">
                      <div className="p-3 bg-green-500/10 rounded-lg text-green-500 shrink-0"><ShieldCheck size={20} /></div>
                      <div>
                        <p className="text-white font-bold mb-1">No Cash Deposit</p>
                        <p className="text-gray-500 text-xs">Zero upfront cash security needed.</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-4 items-center p-4 rounded-xl bg-vl-surface border border-vl-subtle hover:border-vl-accent/30 transition-colors">
                      <div className="p-3 bg-vl-accent/10 rounded-lg text-vl-accent shrink-0"><AlertCircle size={20} /></div>
                      <div>
                        <p className="text-white font-bold mb-1">Vehicle Hold</p>
                        <p className="text-gray-500 text-xs">Motorcycle/Three-wheeler required.</p>
                      </div>
                   </div>

                   <div className="flex gap-4 items-center p-4 rounded-xl bg-vl-surface border border-vl-subtle hover:border-vl-accent/30 transition-colors">
                      <div className="p-3 bg-gray-700/30 rounded-lg text-gray-400 shrink-0"><UserX size={20} /></div>
                      <div>
                        <p className="text-white font-bold mb-1">1 Guarantor</p>
                        <p className="text-gray-500 text-xs">With valid National Identity Card.</p>
                      </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Documents Required Card */}
            <div className="bg-gradient-to-br from-vl-surface to-vl-dark border border-vl-subtle rounded-3xl p-1 overflow-hidden relative group hover:border-blue-500/50 transition-colors shadow-lg h-full">
               <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50"></div>
               <div className="bg-vl-dark/50 backdrop-blur-sm p-8 rounded-[20px] h-full flex flex-col">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                     <FileText size={28} />
                   </div>
                   <div>
                       <h3 className="font-bold text-white text-2xl">Documents</h3>
                       <p className="text-gray-500 text-sm">Mandatory verification</p>
                   </div>
                 </div>
                 
                 <div className="flex-1 flex flex-col justify-center">
                    <ul className="space-y-4">
                        {[
                            { title: "Driving License", desc: "Valid local or international permit" },
                            { title: "National Identity Card", desc: "Or valid Passport for foreigners" },
                            { title: "Billing Proof", desc: "Recent utility bill for address verification" }
                        ].map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-vl-surface border border-vl-subtle hover:border-blue-500/30 transition-all group-doc">
                            <div className="w-8 h-8 rounded-full bg-vl-dark border border-vl-subtle flex items-center justify-center text-blue-500 font-mono font-bold text-sm shadow-inner mt-0.5 shrink-0">
                            {idx + 1}
                            </div>
                            <div>
                                <span className="block text-white font-bold text-lg mb-1">{doc.title}</span>
                                <span className="text-gray-500 text-xs">{doc.desc}</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                 </div>
               </div>
            </div>

          </div>

          {/* Contact Sales / Long Term - Compact Bottom Bar */}
          <div className="bg-vl-surface/50 border border-vl-subtle rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in-up hover:border-vl-accent/30 transition-colors" style={{ animationDelay: '400ms' }}>
             <div className="flex items-center gap-4 text-center md:text-left">
                <div className="p-3 bg-vl-accent/10 rounded-full text-vl-accent hidden md:block">
                    <Info size={24} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Looking for Long Term Rentals?</h3>
                    <p className="text-gray-400 text-sm">We offer special weekly and monthly rates with additional benefits.</p>
                </div>
             </div>
             <button 
                onClick={handleContactSales}
                className="whitespace-nowrap px-6 py-3 bg-transparent border border-vl-accent text-vl-accent font-bold rounded-xl hover:bg-vl-accent hover:text-black transition-all flex items-center gap-2 active:scale-95"
              >
                <Phone size={18} />
                Contact Sales
              </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pricing;