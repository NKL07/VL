import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Minus, Search, MessageCircle } from 'lucide-react';

interface FAQProps {
  onBack: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onBack }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      category: "Booking & Payments",
      items: [
        {
          question: "Do I need a credit card to book?",
          answer: "No, we do not require a credit card. However, a refundable vehicle hold (motorcycle or three-wheeler) is required as security instead of a cash deposit."
        },
        {
          question: "Is an advance payment required?",
          answer: "Yes. To confirm your reservation, a non-refundable advance payment of LKR 2,000 is required. This amount will be deducted from your final bill upon pickup."
        }
      ]
    },
    {
      category: "Vehicle & Usage",
      items: [
        {
          question: "What is the daily mileage limit?",
          answer: "Our standard plan includes 150KM per day. Any additional mileage is charged at a flat rate of LKR 25 per kilometer."
        },
        {
          question: "Are fuel costs included?",
          answer: "No, the vehicle is provided with a certain fuel level and must be returned with the same level. Fuel costs during the trip are borne by the renter."
        },
        {
           question: "What happens if the car breaks down?",
           answer: "All our vehicles are rigorously maintained. However, in the unlikely event of a breakdown, we offer 24/7 roadside assistance and will provide a replacement vehicle if necessary."
        }
      ]
    },
    {
      category: "Policies",
      items: [
         {
          question: "Can I rent a car with a driver?",
          answer: "Currently, we specialize in self-drive rentals to give you maximum privacy and flexibility. We do not provide drivers."
        },
        {
          question: "Can I extend my rental period?",
          answer: "We cannot guarantee extensions after a successful booking as other customers may have reserved the vehicle immediately after your scheduled return. If you need to extend, please request it well in advance."
        }
      ]
    }
  ];

  // Flatten for search
  const allFaqs = faqs.flatMap((cat, catIdx) => 
    cat.items.map((item, itemIdx) => ({
       ...item,
       originalId: `${catIdx}-${itemIdx}`
    }))
  );

  const filteredFaqs = searchQuery 
    ? allFaqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How can we <span className="text-vl-accent">help?</span></h1>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative group">
                <Search className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-vl-accent transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Search for answers..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-vl-surface border border-vl-subtle rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-vl-accent transition-all shadow-lg"
                />
            </div>
        </div>

        <div className="space-y-8">
          {searchQuery ? (
             <div className="space-y-4">
                {filteredFaqs?.length === 0 && <p className="text-center text-gray-500">No results found.</p>}
                {filteredFaqs?.map((faq, index) => (
                    <div key={index} className="bg-vl-surface border border-vl-subtle rounded-xl p-6">
                        <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                        <p className="text-gray-400 text-sm">{faq.answer}</p>
                    </div>
                ))}
             </div>
          ) : (
              faqs.map((category, catIndex) => (
                <div key={catIndex} className="animate-fade-in-up" style={{ animationDelay: `${catIndex * 100}ms` }}>
                    <h3 className="text-sm font-bold text-vl-accent uppercase tracking-widest mb-4 ml-2">{category.category}</h3>
                    <div className="space-y-3">
                        {category.items.map((faq, itemIndex) => {
                            const uniqueId = parseInt(`${catIndex}${itemIndex}`);
                            const isOpen = openIndex === uniqueId;
                            
                            return (
                                <div 
                                    key={itemIndex} 
                                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'bg-vl-surface border-vl-accent/50 shadow-[0_0_15px_rgba(250,204,21,0.05)]' : 'bg-vl-surface/50 border-vl-subtle hover:border-gray-600'}`}
                                >
                                    <button 
                                        onClick={() => setOpenIndex(isOpen ? null : uniqueId)}
                                        className="w-full flex justify-between items-center p-6 text-left"
                                    >
                                        <span className={`font-bold transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>{faq.question}</span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-vl-accent text-black rotate-180' : 'bg-vl-dark border border-vl-subtle text-gray-400'}`}>
                                             {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                        </div>
                                    </button>
                                    
                                    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-vl-subtle/50 pt-4 mt-[-10px]">
                                        {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
              ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-br from-vl-surface to-vl-dark border border-vl-subtle rounded-3xl p-8 text-center">
            <div className="w-14 h-14 bg-vl-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 text-vl-accent">
                <MessageCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">Can't find the answer you're looking for? Our support team is here to help.</p>
            <a 
                href="mailto:support@vlrentacar.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-vl-accent transition-colors"
            >
                Contact Support
            </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;