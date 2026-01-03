import React, { useEffect } from 'react';
import { ArrowLeft, FileText, CheckCircle, ShieldAlert, AlertTriangle, CreditCard, Car, Key } from 'lucide-react';

interface TermsConditionsProps {
  onBack: () => void;
}

const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
             <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Terms of <span className="text-vl-accent">Service</span></h1>
                <p className="text-gray-400">Please read our rental policies carefully before booking.</p>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Last Updated</p>
                <p className="text-white font-mono">October 24, 2023</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation (Sticky) */}
            <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-28 space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-3">Contents</p>
                    {['Quick Summary', 'Eligibility', 'Security', 'Mileage & Fuel', 'Insurance', 'Payments'].map((item, i) => (
                        <a key={i} href={`#section-${i}`} className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-vl-surface rounded-lg transition-colors">
                            {item}
                        </a>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-8">
                
                {/* Quick Summary Card */}
                <div id="section-0" className="bg-gradient-to-br from-vl-accent/10 to-transparent border border-vl-accent/30 rounded-2xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-vl-accent/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="text-vl-accent" /> Key Takeaways
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-vl-dark/50 p-4 rounded-xl border border-vl-accent/10">
                            <h3 className="text-vl-accent font-bold text-sm mb-1">No Cash Deposit</h3>
                            <p className="text-gray-400 text-xs">We hold a vehicle (Bike/Tuk) as security instead.</p>
                        </div>
                        <div className="bg-vl-dark/50 p-4 rounded-xl border border-vl-accent/10">
                            <h3 className="text-vl-accent font-bold text-sm mb-1">Strict Mileage</h3>
                            <p className="text-gray-400 text-xs">150KM/Day limit. Excess charged at LKR 25/KM.</p>
                        </div>
                         <div className="bg-vl-dark/50 p-4 rounded-xl border border-vl-accent/10">
                            <h3 className="text-vl-accent font-bold text-sm mb-1">Advance Required</h3>
                            <p className="text-gray-400 text-xs">LKR 2,000 non-refundable advance to confirm.</p>
                        </div>
                         <div className="bg-vl-dark/50 p-4 rounded-xl border border-vl-accent/10">
                            <h3 className="text-vl-accent font-bold text-sm mb-1">Documents</h3>
                            <p className="text-gray-400 text-xs">NIC/Passport + License + Guarantor required.</p>
                        </div>
                    </div>
                </div>

                {/* Section 1 */}
                <div id="section-1" className="bg-vl-surface border border-vl-subtle rounded-2xl p-8">
                    <div className="w-10 h-10 bg-vl-dark rounded-lg flex items-center justify-center text-gray-300 mb-4 border border-vl-subtle">
                        <FileText size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-4">1. Eligibility & Documentation</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        To rent a vehicle from VL Rent a Car, the renter must meet specific criteria to ensure the safety of the vehicle and compliance with local laws.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-vl-accent mt-2 shrink-0"></div>
                            <span>Must be at least <strong>21 years of age</strong>.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-vl-accent mt-2 shrink-0"></div>
                            <span>Possess a valid <strong>Driving License</strong> (International or Local) held for at least 1 year.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-vl-accent mt-2 shrink-0"></div>
                            <span>Provide a valid National Identity Card (NIC) or Passport.</span>
                        </li>
                    </ul>
                </div>

                {/* Section 2 */}
                <div id="section-2" className="bg-vl-surface border border-vl-subtle rounded-2xl p-8">
                    <div className="w-10 h-10 bg-vl-dark rounded-lg flex items-center justify-center text-gray-300 mb-4 border border-vl-subtle">
                        <Key size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-4">2. Security Deposit & Vehicle Hold</h2>
                    <div className="bg-vl-dark p-4 rounded-xl border border-vl-subtle mb-4 flex gap-3 items-start">
                        <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
                        <p className="text-xs text-gray-300 leading-relaxed">
                            <strong>Important:</strong> We generally do not accept cash deposits. The security hold is mandatory.
                        </p>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Strictly for security purposes, the customer must leave a motorcycle or three-wheeler in our custody for the duration of the rental. This vehicle will be securely stored and returned upon the safe return of the rental car. Exceptions are made only at management discretion.
                    </p>
                </div>

                {/* Section 3 */}
                <div id="section-3" className="bg-vl-surface border border-vl-subtle rounded-2xl p-8">
                    <div className="w-10 h-10 bg-vl-dark rounded-lg flex items-center justify-center text-gray-300 mb-4 border border-vl-subtle">
                        <Car size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-4">3. Mileage & Fuel Policy</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <h3 className="font-bold text-white text-sm mb-2">Mileage Limit</h3>
                             <p className="text-gray-400 text-sm">
                                The daily rental includes a mileage allowance of <strong>150KM</strong>. Excess mileage will be charged at <strong>LKR 25 per kilometer</strong>.
                             </p>
                        </div>
                        <div>
                             <h3 className="font-bold text-white text-sm mb-2">Fuel Policy</h3>
                             <p className="text-gray-400 text-sm">
                                Fuel is <strong>not included</strong> in the rental price. The vehicle must be returned with the same fuel level as at pickup (Level-to-Level).
                             </p>
                        </div>
                     </div>
                </div>

                {/* Section 4 */}
                <div id="section-4" className="bg-vl-surface border border-vl-subtle rounded-2xl p-8">
                    <div className="w-10 h-10 bg-vl-dark rounded-lg flex items-center justify-center text-gray-300 mb-4 border border-vl-subtle">
                        <ShieldAlert size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-4">4. Insurance & Liabilities</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        All vehicles come with full insurance coverage. However, the renter is liable in specific scenarios:
                    </p>
                    <ul className="space-y-3">
                         <li className="flex items-start gap-3 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                            <span>Accidents caused by driving under the influence of alcohol or drugs.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                            <span>Negligence or violation of traffic laws resulting in damage.</span>
                        </li>
                    </ul>
                </div>

                {/* Section 5 */}
                <div id="section-5" className="bg-vl-surface border border-vl-subtle rounded-2xl p-8">
                     <div className="w-10 h-10 bg-vl-dark rounded-lg flex items-center justify-center text-gray-300 mb-4 border border-vl-subtle">
                        <CreditCard size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-4">5. Booking & Cancellation</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        A non-refundable advance payment of <strong>LKR 2,000</strong> is required to confirm your reservation. This amount will be deducted from your total bill. The remaining balance must be paid in full at the time of vehicle handover. Cancellations made less than 24 hours before pickup may result in full forfeiture of the advance.
                    </p>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;