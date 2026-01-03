import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, User, Phone, CreditCard, ShieldCheck, CheckCircle, AlertTriangle, XCircle, FileText, Settings, Clock } from 'lucide-react';
import { Booking } from '../types';

interface BookingFormProps {
  onBack: () => void;
  onNavigate: (view: 'MY_BOOKINGS' | 'HOME') => void;
  onAddBooking: (booking: Booking) => void;
  planDetails: {
    name: string;
    price: number;
    mileage: string;
    imageUrl?: string;
  };
}

const BookingForm: React.FC<BookingFormProps> = ({ onBack, onNavigate, onAddBooking, planDetails }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    nic: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    hasGuarantor: false,
    hasHoldVehicle: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  
  // Refs for scrolling to errors
  const topRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setShowErrorBanner(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    
    // Phone validation
    const phoneClean = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
    } else if (phoneClean.length < 9) {
        newErrors.phone = "Enter a valid phone number (min 9 digits)";
    }

    if (!formData.nic.trim()) newErrors.nic = "NIC/Passport is required";
    
    // Date validation
    const today = new Date();
    today.setHours(0,0,0,0);

    if (!formData.pickupDate) {
        newErrors.pickupDate = "Pickup Date is required";
    } else {
        const pickup = new Date(formData.pickupDate);
        if (pickup < today) {
            newErrors.pickupDate = "Date cannot be in the past";
        }
    }

    if (!formData.pickupTime) newErrors.pickupTime = "Pickup Time is required";

    if (!formData.returnDate) {
        newErrors.returnDate = "Return Date is required";
    } else {
        if (formData.pickupDate && new Date(formData.returnDate) < new Date(formData.pickupDate)) {
            newErrors.returnDate = "Return date cannot be before pickup";
        }
    }

    if (!formData.hasHoldVehicle) newErrors.hasHoldVehicle = "Security requirement must be accepted";
    if (!formData.hasGuarantor) newErrors.hasGuarantor = "Guarantor requirement must be accepted";

    if (Object.keys(newErrors).length > 0) {
      isValid = false;
      setErrors(newErrors);
      setShowErrorBanner(true);
      
      // Find the first error field and scroll to it
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }

    return isValid;
  };

  const calculateTotal = () => {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);
      
      // Default to 1 day if dates aren't valid yet
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return planDetails.price;

      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive of start day
      return Math.max(1, diffDays) * planDetails.price;
  };

  const formatCurrency = (amount: number) => {
      return `LKR ${amount.toLocaleString()}`;
  };

  const formatTime12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const m = parseInt(minutes, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m < 10 ? '0' + m : m} ${ampm}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const totalPrice = calculateTotal();
      const newBooking: Booking = {
          id: `BK-${Math.floor(1000 + Math.random() * 9000)}-VL`,
          carName: planDetails.name,
          dates: `${formData.pickupDate} - ${formData.returnDate}`,
          status: 'Confirmed', // Default to upcoming
          price: formatCurrency(totalPrice),
          totalAmount: totalPrice,
          image: planDetails.imageUrl || 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=1200',
          pickupTime: formatTime12Hour(formData.pickupTime),
          location: 'Colombo 03 (Main Office)',
          mileageLimit: planDetails.mileage
      };

      onAddBooking(newBooking);
      setIsSubmitted(true);
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper for input styles
  const getInputClass = (fieldName: string) => `
    w-full bg-vl-dark border rounded-lg px-4 py-3 text-white transition-all duration-300
    focus:outline-none focus:border-vl-accent text-base
    ${errors[fieldName] 
      ? 'border-red-500 bg-red-500/10 animate-[shake_0.5s_ease-in-out]' 
      : 'border-vl-subtle'
    }
  `;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-vl-dark flex items-center justify-center animate-scale-in p-4" ref={topRef}>
        <div className="w-full max-w-lg">
          <div className="bg-vl-surface border border-vl-accent rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.1)]">
             <div className="absolute top-0 left-0 w-full h-1 bg-vl-accent"></div>
             
             <div className="w-16 h-16 sm:w-20 sm:h-20 bg-vl-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-vl-accent animate-[bounce_1s_infinite]">
               <CheckCircle size={32} className="sm:w-10 sm:h-10" />
             </div>
             
             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Booking Request Sent!</h2>
             <p className="text-gray-400 mb-8 leading-relaxed text-sm sm:text-base">
               Thank you <span className="text-white font-bold">{formData.firstName}</span>. Our team will review your details and contact you via WhatsApp at <span className="text-white font-mono">{formData.phone}</span> shortly.
             </p>

             {/* Action Buttons */}
             <div className="flex flex-col gap-3">
               <button 
                 onClick={() => onNavigate('MY_BOOKINGS')}
                 className="w-full py-3.5 bg-vl-accent text-black font-bold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 active:scale-95"
               >
                 <Calendar size={18} />
                 My Bookings
               </button>
               
               <button 
                 onClick={() => window.print()}
                 className="w-full py-3.5 bg-transparent border border-vl-subtle text-white font-medium rounded-xl hover:bg-vl-subtle transition-all flex items-center justify-center gap-2"
               >
                 <FileText size={18} />
                 View Receipt
               </button>
             </div>

             <button 
               onClick={() => onNavigate('HOME')}
               className="mt-6 text-sm text-gray-500 hover:text-white transition-colors underline decoration-vl-accent/50 hover:decoration-vl-accent"
             >
               Return to Home
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up" ref={topRef}>
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-4 sm:px-6 py-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Left: Summary Card - Collapsible on mobile or stacked nicely */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <div className="bg-vl-surface border border-vl-subtle rounded-2xl p-5 sm:p-6 lg:sticky lg:top-28">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Booking Summary</h3>
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{planDetails.name}</h2>
                <div className="text-vl-accent font-mono text-lg">LKR {planDetails.price.toLocaleString()} <span className="text-gray-500 text-sm">/ Day</span></div>
              </div>

              {/* Live Estimate */}
              {formData.pickupDate && formData.returnDate && (
                  <div className="mb-6 p-4 bg-vl-accent/5 border border-vl-accent/20 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Estimated Total:</span>
                          <span className="text-white font-bold">{formatCurrency(calculateTotal())}</span>
                      </div>
                  </div>
              )}
              
              <div className="space-y-3 py-4 border-t border-vl-subtle">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                   <CreditCard size={16} className="text-gray-500" />
                   <span>Mileage: {planDetails.mileage}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                   <ShieldCheck size={16} className="text-gray-500" />
                   <span>Full Insurance Included</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-vl-dark/50 border border-vl-subtle rounded-lg">
                <div className="flex gap-2 text-yellow-500 mb-2">
                  <AlertTriangle size={16} />
                  <span className="text-xs font-bold uppercase">Important Requirement</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Please ensure you bring a <strong>Vehicle (Motorcycle/Three-wheeler)</strong> for us to hold and a <strong>Guarantor with ID</strong> upon pickup.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Finalize Booking</h1>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">Fill in your details to secure your reservation.</p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
              {/* Personal Details */}
              <div className="bg-vl-surface border border-vl-subtle rounded-2xl p-5 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <User className="text-vl-accent" size={20} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                      {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
                    </div>
                    <input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={getInputClass('firstName')}
                      placeholder="e.g. Kasun"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                      {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
                    </div>
                    <input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={getInputClass('lastName')}
                      placeholder="e.g. Perera"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone (WhatsApp)</label>
                       {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                    </div>
                    <input 
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={getInputClass('phone')}
                      placeholder="07X XXX XXXX"
                      inputMode="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">NIC / Passport No</label>
                      {errors.nic && <span className="text-xs text-red-500">{errors.nic}</span>}
                    </div>
                    <input 
                      name="nic"
                      value={formData.nic}
                      onChange={handleChange}
                      className={getInputClass('nic')}
                      placeholder="Your ID Number"
                    />
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="bg-vl-surface border border-vl-subtle rounded-2xl p-5 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="text-vl-accent" size={20} />
                  Trip Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                     <div className="flex justify-between">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Date</label>
                       {errors.pickupDate && <span className="text-xs text-red-500">{errors.pickupDate}</span>}
                     </div>
                    <input 
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      className={`${getInputClass('pickupDate')} [color-scheme:dark]`}
                    />
                  </div>

                  <div className="space-y-2">
                     <div className="flex justify-between">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Time</label>
                       {errors.pickupTime && <span className="text-xs text-red-500">{errors.pickupTime}</span>}
                     </div>
                    <input 
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className={`${getInputClass('pickupTime')} [color-scheme:dark]`}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                     <div className="flex justify-between">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Return Date</label>
                       {errors.returnDate && <span className="text-xs text-red-500">{errors.returnDate}</span>}
                     </div>
                    <input 
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      className={`${getInputClass('returnDate')} [color-scheme:dark]`}
                    />
                  </div>
                </div>
              </div>

              {/* Security Acknowledgment */}
              <div className={`bg-vl-surface border rounded-2xl p-5 sm:p-8 relative overflow-hidden transition-colors ${errors.hasHoldVehicle || errors.hasGuarantor ? 'border-red-500/50' : 'border-vl-accent/30'}`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${errors.hasHoldVehicle || errors.hasGuarantor ? 'bg-red-500' : 'bg-vl-accent'}`}></div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className={errors.hasHoldVehicle || errors.hasGuarantor ? 'text-red-500' : 'text-vl-accent'} size={20} />
                  Security Acknowledgments
                </h3>
                
                {(errors.hasHoldVehicle || errors.hasGuarantor) && (
                   <p className="text-red-500 text-xs sm:text-sm mb-4 bg-red-500/10 p-2 rounded">
                     {errors.hasHoldVehicle || errors.hasGuarantor}
                   </p>
                )}

                <div className="space-y-4">
                  <label className="flex items-start gap-4 cursor-pointer group select-none">
                    <div className="relative flex items-center">
                      <input 
                        name="hasHoldVehicle"
                        type="checkbox" 
                        checked={formData.hasHoldVehicle}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className={`w-6 h-6 border-2 rounded transition-all flex-shrink-0 ${errors.hasHoldVehicle ? 'border-red-500' : 'border-gray-500'} peer-checked:bg-vl-accent peer-checked:border-vl-accent`}></div>
                      <CheckCircle size={16} className="absolute top-1 left-1 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className={`text-sm transition-colors ${errors.hasHoldVehicle ? 'text-red-400' : 'text-gray-300 group-hover:text-white'}`}>
                      I agree to provide a <strong className={errors.hasHoldVehicle ? 'text-red-400' : 'text-white'}>Motorcycle or Three-wheeler</strong> to be held by VL Rent a Car as security during the rental period.
                    </span>
                  </label>

                  <label className="flex items-start gap-4 cursor-pointer group select-none">
                    <div className="relative flex items-center">
                      <input 
                        name="hasGuarantor"
                        type="checkbox" 
                        checked={formData.hasGuarantor}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className={`w-6 h-6 border-2 rounded transition-all flex-shrink-0 ${errors.hasGuarantor ? 'border-red-500' : 'border-gray-500'} peer-checked:bg-vl-accent peer-checked:border-vl-accent`}></div>
                      <CheckCircle size={16} className="absolute top-1 left-1 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className={`text-sm transition-colors ${errors.hasGuarantor ? 'text-red-400' : 'text-gray-300 group-hover:text-white'}`}>
                      I will provide <strong className={errors.hasGuarantor ? 'text-red-400' : 'text-white'}>One Guarantor</strong> with a valid National Identity Card upon vehicle pickup.
                    </span>
                  </label>
                </div>
              </div>

              {/* Error Banner */}
              {showErrorBanner && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 animate-slide-in-right">
                  <XCircle className="text-red-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-red-500 text-sm">Submission Failed</h4>
                    <p className="text-red-400 text-xs">Please fix the errors highlighted above.</p>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-4 bg-vl-accent text-black text-lg font-bold rounded-xl hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] active:scale-95"
              >
                Submit Booking Request
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;