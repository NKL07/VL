import React, { useEffect, useState } from 'react';
import { MENU_ITEMS } from '../constants';
import { X, ChevronRight, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, user, onLogout }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleItemClick = (e: React.MouseEvent, href: string | undefined) => {
    e.preventDefault();
    if (href) {
        onNavigate(href);
    }
    onClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-vl-surface border-l border-vl-subtle z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6 sm:p-8">
          
          {/* Top Header Section */}
          <div className="flex justify-between items-start mb-8 shrink-0">
            <div>
              <h2 className="text-2xl font-mono font-bold tracking-tighter text-white mb-2">
                VL <span className="text-vl-accent">MENU</span>
              </h2>
              
              {/* Welcome Message at the Top */}
              {user && (
                <div className="animate-fade-in-up">
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Logged in as</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-vl-accent mt-0.5">
                      Welcome, {user.firstName}
                    </h3>
                </div>
              )}
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 hover:bg-vl-subtle rounded-full transition-colors text-gray-400 hover:text-white"
            >
              <X size={28} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto min-h-0 pr-2 scrollbar-thin scrollbar-thumb-vl-subtle scrollbar-track-transparent">
            <ul className="space-y-3">
              {MENU_ITEMS.map((item, index) => (
                <li key={index} style={{ transitionDelay: `${index * 50}ms` }} className={`transform transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                  <button 
                    onClick={(e) => handleItemClick(e, item.href)}
                    className="w-full group flex items-center justify-between text-lg sm:text-xl font-light text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 border-b border-vl-subtle hover:border-vl-accent hover:bg-vl-accent/10 rounded-lg text-left relative overflow-hidden"
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">{item.label}</span>
                    <ChevronRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-vl-accent relative z-10" size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Footer Section */}
          <div className="mt-6 shrink-0 border-t border-vl-subtle pt-6">
            {user ? (
               <div className="animate-fade-in-up">
                 <button 
                   onClick={handleLogoutClick}
                   className="w-full py-4 border border-red-500/30 text-red-500 font-bold rounded-xl hover:bg-red-500/10 hover:border-red-500 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                 >
                   <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                   Log Out Securely
                 </button>
                 <p className="text-center text-[10px] text-gray-600 mt-3">
                   Session active. Your data is secure.
                 </p>
               </div>
            ) : (
                <div className="animate-fade-in-up">
                  <div className="mb-4">
                    <h3 className="text-white font-bold text-sm mb-1">Unlock Exclusive Rates</h3>
                    <p className="text-gray-400 text-xs">Sign in to view member-only deals.</p>
                  </div>
                  <button 
                    onClick={() => { onClose(); onNavigate('SIGN_IN'); }}
                    className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors active:scale-95 flex items-center justify-center gap-2"
                  >
                    <UserIcon size={18} />
                    Sign In / Join Now
                  </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;