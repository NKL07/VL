import React, { useState } from 'react';
import { ArrowLeft, User, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { User as UserType } from '../types';

interface SignInProps {
  onBack: () => void;
  onNavigateSignUp: () => void;
  onSignInSuccess: (user: UserType) => void;
  onForgotPassword: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onBack, onNavigateSignUp, onSignInSuccess, onForgotPassword }) => {
  const [identifier, setIdentifier] = useState(''); // Email or Username
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
        setError("Please enter both username/email and password");
        return;
    }

    setIsLoading(true);
    setError('');

    // Simulate 1 second network delay
    setTimeout(() => {
        // Retrieve users from localStorage DB
        const existingUsersStr = localStorage.getItem('vl_users_db');
        const users = existingUsersStr ? JSON.parse(existingUsersStr) : [];
        
        // Find matching user (check against both email and username)
        const foundUser = users.find((u: any) => 
            (u.username.toLowerCase() === identifier.trim().toLowerCase() || u.email.toLowerCase() === identifier.trim().toLowerCase()) && 
            u.password === password
        );

        if (foundUser) {
            // Save Session
            localStorage.setItem('vl_session', JSON.stringify(foundUser.userProfile));
            onSignInSuccess(foundUser.userProfile);
        } else {
            setError("Invalid credentials. Please try again.");
            setIsLoading(false);
        }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh] py-8">
        <div className="w-full max-w-md bg-vl-surface border border-vl-subtle rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-vl-accent/5 rounded-full blur-2xl"></div>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400 text-sm">Sign in to access exclusive fleet options and deals.</p>
            </div>

            {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm animate-shake">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email or Username</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-vl-accent transition-colors" size={18} />
                        <input 
                            type="text" 
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full bg-vl-dark border border-vl-subtle rounded-lg py-3 pl-10 pr-4 text-white focus:border-vl-accent focus:outline-none transition-colors placeholder-gray-600" 
                            placeholder="Enter your email or username" 
                        />
                    </div>
                </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 text-gray-500 group-focus-within:text-vl-accent transition-colors" size={18} />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-vl-dark border border-vl-subtle rounded-lg py-3 pl-10 pr-4 text-white focus:border-vl-accent focus:outline-none transition-colors placeholder-gray-600" 
                            placeholder="••••••••" 
                        />
                    </div>
                    {/* Forgot Password Link */}
                    <div className="flex justify-end">
                      <button 
                        type="button" 
                        onClick={onForgotPassword}
                        className="text-xs text-gray-500 hover:text-vl-accent transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3 bg-vl-accent text-black font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                </button>
            </form>
            
            <div className="mt-8 text-center pt-6 border-t border-vl-subtle">
                <p className="text-gray-500 text-sm mb-3">Not a member yet?</p>
                <button 
                    onClick={onNavigateSignUp} 
                    className="w-full py-2 border border-vl-subtle rounded-lg text-white font-medium hover:border-vl-accent hover:text-vl-accent transition-all flex items-center justify-center gap-2 group"
                >
                    Join Now 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;