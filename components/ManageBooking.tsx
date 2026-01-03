import React, { useEffect, useState } from 'react';
import { Booking } from '../types';
import { ArrowLeft, Calendar, Edit2, MessageSquare, AlertTriangle, Save } from 'lucide-react';

interface ManageBookingProps {
  booking: Booking;
  onBack: () => void;
}

const ManageBooking: React.FC<ManageBookingProps> = ({ booking, onBack }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRequestChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending request
    setRequestSent(true);
  };

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Manage Booking <span className="text-vl-accent text-xl font-mono ml-2">#{booking.id}</span></h1>
            <p className="text-gray-400">Modify details or contact support regarding your reservation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Details Card */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-vl-surface border border-vl-subtle rounded-2xl p-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Current Reservation</h3>
                    <img src={booking.image} alt={booking.carName} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h2 className="font-bold text-white text-lg">{booking.carName}</h2>
                    <div className="mt-4 space-y-3 text-sm text-gray-300">
                        <div className="flex justify-between border-b border-vl-subtle pb-2">
                            <span>Status</span>
                            <span className="text-green-500 font-bold">{booking.status}</span>
                        </div>
                        <div className="flex justify-between border-b border-vl-subtle pb-2">
                            <span>Dates</span>
                            <span>{booking.dates}</span>
                        </div>
                         <div className="flex justify-between border-b border-vl-subtle pb-2">
                            <span>Pickup</span>
                            <span>{booking.pickupTime}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-vl-surface border border-vl-subtle rounded-2xl p-6 border-l-4 border-l-yellow-500">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
                        <div>
                            <h4 className="font-bold text-white text-sm">Policy Note</h4>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                Modifications are subject to vehicle availability. Changes made less than 24 hours before pickup may incur a fee.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Request Form */}
            <div className="lg:col-span-2">
                 {requestSent ? (
                     <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center animate-scale-in">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                            <MessageSquare size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Request Sent</h2>
                        <p className="text-gray-400 mb-6">Our support team has received your request. We will review the changes and contact you via WhatsApp shortly to confirm.</p>
                        <button onClick={onBack} className="text-vl-accent hover:underline">Return to My Bookings</button>
                     </div>
                 ) : (
                    <div className="bg-vl-surface border border-vl-subtle rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Edit2 size={20} className="text-vl-accent" />
                            Request Changes
                        </h2>
                        
                        <form onSubmit={handleRequestChange} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Change Reason / Request</label>
                                <textarea 
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full h-32 bg-vl-dark border border-vl-subtle rounded-xl p-4 text-white focus:outline-none focus:border-vl-accent transition-colors resize-none"
                                    placeholder="e.g. I need to extend my rental by 2 days, or change pickup time to 11:00 AM."
                                    required
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred New Start Date (Optional)</label>
                                    <input type="date" className="w-full bg-vl-dark border border-vl-subtle rounded-xl px-4 py-3 text-white [color-scheme:dark] focus:border-vl-accent focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred New Return Date (Optional)</label>
                                    <input type="date" className="w-full bg-vl-dark border border-vl-subtle rounded-xl px-4 py-3 text-white [color-scheme:dark] focus:border-vl-accent focus:outline-none" />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    className="w-full py-3 bg-vl-accent text-black font-bold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    Submit Request
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Submitting this form does not guarantee changes. We will confirm via phone/WhatsApp.
                                </p>
                            </div>
                        </form>
                    </div>
                 )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;