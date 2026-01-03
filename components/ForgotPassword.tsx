import React, { useState } from 'react';
import { ArrowLeft, Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh] py-12">
        <div className="w-full max-w-md bg-vl-surface border border-vl-subtle rounded-2xl p-8 shadow-2xl relative overflow-hidden">
             
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-gray-400 text-sm">Enter your registered email address or username. We'll send you instructions to reset your password.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email or Username</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-vl-accent transition-colors" size={18} />
                            <input 
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-vl-dark border border-vl-subtle rounded-lg py-3 pl-10 pr-4 text-white focus:border-vl-accent focus:outline-none transition-colors placeholder-gray-600" 
                                placeholder="name@example.com" 
                                required
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-vl-accent text-black font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:-translate-y-0.5"
                    >
                        Send Reset Link
                    </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 animate-scale-in">
                 <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                    <CheckCircle size={32} />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
                 <p className="text-gray-400 text-sm mb-8">
                   We have sent password recovery instructions to <span className="text-white font-bold">{email}</span>.
                 </p>
                 <button 
                   onClick={onBack}
                   className="text-vl-accent hover:underline text-sm font-bold"
                 >
                   Return to Sign In
                 </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;