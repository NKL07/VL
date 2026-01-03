import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

interface ContactSupportProps {
  onBack: () => void;
}

const ContactSupport: React.FC<ContactSupportProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-4">Get in <span className="text-vl-accent">Touch</span></h1>
                    <p className="text-gray-400 text-lg font-light">
                        Have a question or need assistance with your booking? Our team is here to help 24/7.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="p-6 bg-vl-surface border border-vl-subtle rounded-xl flex items-start gap-4 hover:border-vl-accent/30 transition-colors">
                        <div className="p-3 bg-vl-dark rounded-lg text-vl-accent border border-vl-subtle">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Phone & WhatsApp</h3>
                            <p className="text-gray-400 text-sm mb-2">Available 24/7 for urgent inquiries.</p>
                            <a href="tel:+94766126754" className="text-xl font-mono text-white hover:text-vl-accent transition-colors block">+94 76 612 6754</a>
                        </div>
                    </div>

                    <div className="p-6 bg-vl-surface border border-vl-subtle rounded-xl flex items-start gap-4 hover:border-vl-accent/30 transition-colors">
                        <div className="p-3 bg-vl-dark rounded-lg text-vl-accent border border-vl-subtle">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Email Support</h3>
                            <p className="text-gray-400 text-sm mb-2">For business inquiries and feedback.</p>
                            <a href="mailto:support@vlrentacar.com" className="text-white hover:text-vl-accent transition-colors">support@vlrentacar.com</a>
                        </div>
                    </div>

                    <div className="p-6 bg-vl-surface border border-vl-subtle rounded-xl flex items-start gap-4 hover:border-vl-accent/30 transition-colors">
                        <div className="p-3 bg-vl-dark rounded-lg text-vl-accent border border-vl-subtle">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Main Office</h3>
                            <p className="text-gray-400 text-sm">
                                No.4/5/B/1, Mulanawaththa,<br />Makdandura, Matara.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Integration */}
                <div className="h-64 rounded-2xl overflow-hidden border border-vl-subtle">
                   <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63459.73602434515!2d80.5166666!3d5.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae138d151937cd9%3A0xd9102c93712b772d!2sMatara!5e0!3m2!1sen!2slk!4v1709467654321!5m2!1sen!2slk"
                      className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office Location"
                    ></iframe>
                </div>
            </div>

            {/* Message Form */}
            <div className="bg-vl-surface border border-vl-subtle rounded-2xl p-8 h-fit">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="text-vl-accent" size={24} />
                    Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Name</label>
                        <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-vl-dark border border-vl-subtle rounded-lg py-3 px-4 text-white focus:border-vl-accent focus:outline-none transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-vl-dark border border-vl-subtle rounded-lg py-3 px-4 text-white focus:border-vl-accent focus:outline-none transition-colors"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
                        <textarea 
                            rows={5}
                            required
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            className="w-full bg-vl-dark border border-vl-subtle rounded-lg py-3 px-4 text-white focus:border-vl-accent focus:outline-none transition-colors resize-none"
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={submitted}
                        className="w-full py-4 bg-vl-accent text-black font-bold rounded-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {submitted ? 'Message Sent!' : (
                            <>
                                Send Message <Send size={18} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;