import React, { useState, useEffect } from 'react';
import { Menu, ArrowUp } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import CarCard from './components/CarCard';
import CarDetails from './components/CarDetails';
import Pricing from './components/Pricing';
import BookingForm from './components/BookingForm';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import FleetGallery from './components/FleetGallery';
import TermsConditions from './components/TermsConditions';
import FAQ from './components/FAQ';
import ContactSupport from './components/ContactSupport';
import Reviews from './components/Reviews';
import MyBookings from './components/MyBookings';
import Receipt from './components/Receipt';
import ManageBooking from './components/ManageBooking';
import AiAssistant from './components/AiAssistant';
import { CAR_INVENTORY } from './constants';
import { Car, Booking, User } from './types';

type ViewState = 'HOME' | 'DETAILS' | 'PRICING' | 'BOOKING' | 'SIGN_IN' | 'SIGN_UP' | 'FORGOT_PASSWORD' | 'GALLERY' | 'TERMS' | 'FAQ' | 'SUPPORT' | 'REVIEWS' | 'MY_BOOKINGS' | 'RECEIPT' | 'MANAGE_BOOKING';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [history, setHistory] = useState<ViewState[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Global booking state (Initialize empty per request)
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Check for existing session in localStorage on app load
    const session = localStorage.getItem('vl_session');
    if (session) {
      try {
        const parsedUser = JSON.parse(session);
        setUser(parsedUser);
      } catch (e) {
        console.error("Failed to parse session", e);
        localStorage.removeItem('vl_session'); // Clear corrupted session
      }
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      // Reveal animations on scroll
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const navigateTo = (view: ViewState) => {
    setHistory(prev => [...prev, currentView]);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (history.length === 0) {
      if (currentView !== 'HOME') {
        setCurrentView('HOME');
        window.scrollTo(0, 0);
      }
      return;
    }

    const newHistory = [...history];
    const prevView = newHistory.pop();
    setHistory(newHistory);
    
    if (prevView) {
      setCurrentView(prevView);
      window.scrollTo(0, 0);
    }
  };

  const handleResetHome = () => {
    setHistory([]);
    setCurrentView('HOME');
    setSelectedCar(null);
    setSelectedBooking(null);
    window.scrollTo(0, 0);
  };

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
    navigateTo('DETAILS');
  };

  const handleSelectPlan = () => {
    navigateTo('BOOKING');
  };

  const handleViewReceipt = (booking: Booking) => {
    setSelectedBooking(booking);
    navigateTo('RECEIPT');
  };

  const handleManageBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    navigateTo('MANAGE_BOOKING');
  };

  const handleAddNewBooking = (newBooking: Booking) => {
      setBookings(prev => [newBooking, ...prev]);
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => 
        b.id === id ? { ...b, status: 'Cancelled' } : b
    ));
  };

  const handleNavigation = (view: string) => {
    if (view === 'PRICING') navigateTo('PRICING');
    else if (view === 'SIGN_IN') navigateTo('SIGN_IN');
    else if (view === 'GALLERY') navigateTo('GALLERY');
    else if (view === 'TERMS') navigateTo('TERMS');
    else if (view === 'FAQ') navigateTo('FAQ');
    else if (view === 'SUPPORT') navigateTo('SUPPORT');
    else if (view === 'REVIEWS') navigateTo('REVIEWS');
    else if (view === 'MY_BOOKINGS') navigateTo('MY_BOOKINGS');
    else if (view === 'HOME') handleResetHome();
    
    setIsSidebarOpen(false);
  };

  // Called from SignIn and SignUp components
  const handleLoginSuccess = (userData: User) => {
    // userData contains { firstName, lastName, ... }
    setUser(userData);
    // Persist is handled in the components, but state is updated here
    // Redirect to Gallery to show cars
    navigateTo('GALLERY');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vl_session');
    handleResetHome();
  };

  return (
    <div className="min-h-screen bg-vl-dark text-white font-sans selection:bg-vl-accent selection:text-black">
      {/* Navigation Bar - Only visible on HOME to prevent overlay on sub-pages */}
      {currentView === 'HOME' && (
        <header className="fixed top-0 left-0 w-full z-30 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={handleResetHome}
          >
            <div className="w-8 h-8 bg-vl-accent rounded-sm flex items-center justify-center">
               <span className="text-black font-bold font-mono">VL</span>
            </div>
            <span className="font-bold tracking-tight text-xl hidden sm:block text-white">Rent a Car</span>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="group flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="hidden sm:block font-mono text-sm tracking-widest uppercase text-white shadow-black drop-shadow-md">
              {user ? `Hi, ${user.firstName}` : 'Menu'}
            </span>
            <Menu size={32} className="stroke-2 text-white drop-shadow-md" />
          </button>
        </header>
      )}

      {/* Sidebar Overlay */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={handleNavigation}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Router */}
      <main>
        {currentView === 'HOME' && (
          <>
            <Hero onTermsClick={() => navigateTo('TERMS')} />

            {/* Featured Fleet Section - Added Reveal Animation */}
            <section id="inventory" className="py-24 px-6 container mx-auto reveal">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">Available <span className="text-vl-accent">Models</span></h2>
                  <p className="text-gray-400 max-w-md">Our premium selection for your journey.</p>
                </div>
                <button 
                  onClick={() => navigateTo('GALLERY')}
                  className="hidden md:block text-vl-accent hover:text-white transition-colors underline font-mono text-sm uppercase tracking-wider"
                >
                  View Service Gallery
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CAR_INVENTORY.map((car, idx) => (
                  <div key={car.id} className="reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <CarCard 
                      car={car} 
                      onClick={handleCarClick} 
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Features/Trust Section - Added Reveal Animation */}
            <section className="py-20 bg-vl-surface border-y border-vl-subtle reveal">
              <div className="container mx-auto px-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="p-6 group hover:bg-vl-dark transition-colors rounded-xl border border-transparent hover:border-vl-subtle reveal" style={{ transitionDelay: '0ms' }}>
                      <h3 className="text-xl font-bold mb-3 text-vl-accent">Instant Booking</h3>
                      <p className="text-gray-400 text-sm">Hassle-free documentation and quick key handover process.</p>
                    </div>
                    <div className="p-6 group hover:bg-vl-dark transition-colors rounded-xl border border-transparent hover:border-vl-subtle reveal" style={{ transitionDelay: '150ms' }}>
                      <h3 className="text-xl font-bold mb-3 text-vl-accent">Hybrid Efficiency</h3>
                      <p className="text-gray-400 text-sm">Save significantly on fuel with our modern hybrid fleet.</p>
                    </div>
                    <div className="p-6 group hover:bg-vl-dark transition-colors rounded-xl border border-transparent hover:border-vl-subtle reveal" style={{ transitionDelay: '300ms' }}>
                      <h3 className="text-xl font-bold mb-3 text-vl-accent">Safety First</h3>
                      <p className="text-gray-400 text-sm">All vehicles equipped with advanced safety packages and ABS.</p>
                    </div>
                 </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-vl-subtle bg-vl-dark">
              <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-2xl font-mono font-bold tracking-tighter text-white">
                  VL <span className="text-vl-accent">Rent a Car</span>
                </div>
                <div className="text-gray-500 text-sm">
                  © 2024 VL Rent a Car. All rights reserved.
                </div>
                <div className="flex gap-6">
                   <a href="#" className="text-gray-400 hover:text-vl-accent transition-colors">Instagram</a>
                   <a href="#" className="text-gray-400 hover:text-vl-accent transition-colors">Facebook</a>
                   <a href="#" className="text-gray-400 hover:text-vl-accent transition-colors">WhatsApp</a>
                </div>
              </div>
            </footer>
          </>
        )}
        
        {currentView === 'DETAILS' && selectedCar && (
          <CarDetails 
            car={selectedCar} 
            onBack={handleBack} 
            onBookNow={() => navigateTo('PRICING')}
          />
        )}

        {currentView === 'PRICING' && (
          <Pricing onBack={handleBack} onSelectPlan={handleSelectPlan} />
        )}

        {currentView === 'BOOKING' && (
          <BookingForm 
            onBack={handleBack} 
            onNavigate={(view) => {
                if (view === 'MY_BOOKINGS') navigateTo('MY_BOOKINGS');
                else if (view === 'HOME') handleResetHome();
            }}
            onAddBooking={handleAddNewBooking}
            planDetails={{
              name: 'Suzuki Wagon R FZ Safety',
              price: 4500,
              mileage: '150 KM / Day',
              imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200'
            }}
          />
        )}

        {currentView === 'SIGN_IN' && (
          <SignIn 
            onBack={handleBack} 
            onNavigateSignUp={() => navigateTo('SIGN_UP')}
            onSignInSuccess={handleLoginSuccess}
            onForgotPassword={() => navigateTo('FORGOT_PASSWORD')}
          />
        )}

        {currentView === 'SIGN_UP' && (
          <SignUp 
            onBack={handleBack} 
            onNavigateSignIn={() => navigateTo('SIGN_IN')}
            onSignUpSuccess={handleLoginSuccess}
          />
        )}

        {currentView === 'FORGOT_PASSWORD' && (
          <ForgotPassword onBack={handleBack} />
        )}

        {currentView === 'GALLERY' && (
          <FleetGallery onBack={handleBack} onCarClick={handleCarClick} />
        )}

        {currentView === 'TERMS' && (
          <TermsConditions onBack={handleBack} />
        )}

        {currentView === 'FAQ' && (
          <FAQ onBack={handleBack} />
        )}

        {currentView === 'SUPPORT' && (
          <ContactSupport onBack={handleBack} />
        )}

        {currentView === 'REVIEWS' && (
          <Reviews onBack={handleBack} />
        )}

        {currentView === 'MY_BOOKINGS' && (
          <MyBookings 
            bookings={bookings}
            onBack={handleBack} 
            onViewReceipt={handleViewReceipt}
            onManageBooking={handleManageBooking}
            onCancelBooking={handleCancelBooking}
          />
        )}

        {currentView === 'RECEIPT' && selectedBooking && (
          <Receipt booking={selectedBooking} onBack={handleBack} />
        )}

        {currentView === 'MANAGE_BOOKING' && selectedBooking && (
          <ManageBooking booking={selectedBooking} onBack={handleBack} />
        )}
      </main>

      {/* Scroll To Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-40 p-3 bg-vl-surface text-vl-accent border border-vl-subtle rounded-full shadow-2xl transition-all duration-300 hover:bg-vl-accent hover:text-black hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>

      {/* AI Chat Widget */}
      <AiAssistant />
    </div>
  );
};

export default App;