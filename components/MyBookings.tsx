import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, AlertTriangle, XCircle, FileText, Settings, PlayCircle } from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
  onBack: () => void;
  onViewReceipt: (booking: Booking) => void;
  onManageBooking: (booking: Booking) => void;
  onCancelBooking: (id: string) => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ bookings, onBack, onViewReceipt, onManageBooking, onCancelBooking }) => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming' | 'history' | 'cancelled'>('upcoming');
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleCancelConfirm = () => {
    if (bookingToCancel) {
        onCancelBooking(bookingToCancel);
        setBookingToCancel(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Ongoing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Completed': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(b => {
      if (activeTab === 'ongoing') return b.status === 'Ongoing';
      if (activeTab === 'upcoming') return b.status === 'Confirmed';
      if (activeTab === 'history') return b.status === 'Completed';
      if (activeTab === 'cancelled') return b.status === 'Cancelled';
      return false;
  });

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up relative">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">My <span className="text-vl-accent">Bookings</span></h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-vl-subtle mb-8 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-vl-subtle">
          <button 
            onClick={() => setActiveTab('ongoing')}
            className={`pb-4 text-sm font-bold tracking-wider uppercase transition-colors relative whitespace-nowrap ${activeTab === 'ongoing' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Ongoing
            {activeTab === 'ongoing' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-vl-accent"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 text-sm font-bold tracking-wider uppercase transition-colors relative whitespace-nowrap ${activeTab === 'upcoming' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Upcoming
            {activeTab === 'upcoming' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-vl-accent"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`pb-4 text-sm font-bold tracking-wider uppercase transition-colors relative whitespace-nowrap ${activeTab === 'history' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            History
            {activeTab === 'history' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-vl-accent"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('cancelled')}
            className={`pb-4 text-sm font-bold tracking-wider uppercase transition-colors relative whitespace-nowrap ${activeTab === 'cancelled' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Cancelled
            {activeTab === 'cancelled' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-vl-accent"></span>}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {isLoading ? (
             // Skeleton
             Array(3).fill(0).map((_, i) => (
                <div key={i} className="bg-vl-surface border border-vl-subtle rounded-2xl h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-vl-surface via-vl-subtle to-vl-surface animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]"></div>
                </div>
             ))
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-20 bg-vl-surface border border-vl-subtle rounded-2xl border-dashed">
              <p className="text-gray-500 mb-4">No {activeTab} bookings found.</p>
              {activeTab === 'upcoming' && (
                <button onClick={onBack} className="text-vl-accent hover:underline">
                  Browse Fleet
                </button>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-vl-surface border border-vl-subtle rounded-2xl overflow-hidden hover:border-vl-accent/30 transition-all group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  {/* Image */}
                  <div className="md:col-span-4 h-48 md:h-auto relative overflow-hidden">
                    <img src={booking.image} alt={booking.carName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-[10px] font-mono px-2 py-1 rounded">
                      {booking.id}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-8 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{booking.carName}</h3>
                          <div className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-vl-accent">{booking.price}</div>
                          <div className="text-xs text-gray-500">Total</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <Calendar size={16} className="text-vl-accent" />
                          <span>{booking.dates}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <Clock size={16} className="text-vl-accent" />
                          <span>Pickup: {booking.pickupTime}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <MapPin size={16} className="text-vl-accent" />
                          <span className="truncate">{booking.location}</span>
                        </div>
                         <div className="flex items-center gap-3 text-sm text-gray-400">
                          <FileText size={16} className="text-vl-accent" />
                          <span>{booking.mileageLimit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-vl-subtle flex-wrap">
                        {booking.status === 'Confirmed' && (
                          <button 
                            onClick={() => setBookingToCancel(booking.id)}
                            className="px-4 py-2 text-sm text-red-400 border border-red-500/30 rounded hover:bg-red-500/10 hover:border-red-500 transition-colors flex items-center gap-2"
                          >
                            <XCircle size={16} />
                            Cancel
                          </button>
                        )}
                        <button 
                          onClick={() => onViewReceipt(booking)}
                          className="px-4 py-2 text-sm text-white border border-vl-subtle rounded hover:bg-vl-subtle transition-colors flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Receipt
                        </button>
                        {booking.status === 'Confirmed' && (
                          <button 
                            onClick={() => onManageBooking(booking)}
                            className="px-4 py-2 text-sm bg-vl-accent text-black font-bold rounded hover:bg-yellow-400 transition-colors flex items-center gap-2"
                          >
                            <Settings size={16} />
                            Manage
                          </button>
                        )}
                        {booking.status === 'Ongoing' && (
                          <button 
                             disabled
                             className="px-4 py-2 text-sm bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded flex items-center gap-2 cursor-default"
                          >
                            <PlayCircle size={16} />
                            Active Rental
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {bookingToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setBookingToCancel(null)}></div>
          <div className="relative w-full max-w-md bg-vl-surface border border-vl-subtle rounded-2xl p-6 shadow-2xl animate-scale-in">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500">
              <AlertTriangle size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Cancel Reservation?</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to cancel booking <span className="text-white font-mono">{bookingToCancel}</span>? 
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setBookingToCancel(null)}
                className="flex-1 py-3 border border-vl-subtle text-white rounded-lg hover:bg-vl-subtle transition-colors"
              >
                Keep Booking
              </button>
              <button 
                onClick={handleCancelConfirm}
                className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;