import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Lock, ArrowRight, MapPin, Phone, CreditCard, CheckCircle, Loader2, AlertCircle, Mail } from 'lucide-react';
import { User as UserType } from '../types';

interface SignUpProps {
  onBack: () => void;
  onNavigateSignIn: () => void;
  onSignUpSuccess: (user: UserType) => void;
}

// Moved outside to prevent re-render focus loss
const InputField = ({ 
  label, name, type = "text", placeholder, icon: Icon, error, value, onChange, children 
}: { 
  label: string, 
  name: string, 
  type?: string, 
  placeholder: string, 
  icon: any, 
  error?: string, 
  value: string | boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  children?: React.ReactNode 
}) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="relative group">
      <Icon className={`absolute left-3 top-3.5 transition-colors size={18} ${error ? 'text-red-500' : 'text-gray-500 group-focus-within:text-vl-accent'}`} />
      <input 
        type={type} 
        name={name}
        value={value as string}
        onChange={onChange}
        className={`w-full bg-vl-dark border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none transition-all duration-300 placeholder-gray-600 ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-vl-subtle focus:border-vl-accent focus:ring-1 focus:ring-vl-accent'}`}
        placeholder={placeholder} 
      />
      {children}
    </div>
    {error && <p className="text-xs text-red-500 mt-1 animate-slide-in-right">{error}</p>}
  </div>
);

const SignUp: React.FC<SignUpProps> = ({ onBack, onNavigateSignIn, onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    idNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Username availability states
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check username availability against localStorage DB
  useEffect(() => {
    const checkUsername = async () => {
      if (formData.username.length < 3) {
        setUsernameStatus('idle');
        return;
      }
      
      setUsernameStatus('checking');
      
      // Simulate API call delay for realism
      setTimeout(() => {
        const dbStr = localStorage.getItem('vl_users_db');
        const db = dbStr ? JSON.parse(dbStr) : [];
        
        const isTaken = db.some((u: any) => u.username.toLowerCase() === formData.username.toLowerCase());
        
        if (isTaken) {
          setUsernameStatus('taken');
        } else {
          setUsernameStatus('available');
        }
      }, 600);
    };

    const timer = setTimeout(() => {
        if (formData.username) checkUsername();
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.idNumber.trim()) newErrors.idNumber = "Required";
    
    if (!formData.username.trim()) {
        newErrors.username = "Required";
    } else if (usernameStatus === 'taken') {
        newErrors.username = "Username is already taken";
    }

    if (!formData.password) newErrors.password = "Required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      
      // Simulate network request (1 second as requested)
      setTimeout(() => {
        // Retrieve existing DB
        const existingUsersStr = localStorage.getItem('vl_users_db');
        const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
        
        // Final duplicate check (safety)
        if (existingUsers.some((u: any) => u.email.toLowerCase() === formData.email.toLowerCase())) {
            setErrors({ email: "Email already registered" });
            setIsLoading(false);
            return;
        }

        const newUser: UserType = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
        };

        // Add auth credentials to "Database"
        const authEntry = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            userProfile: newUser
        };
        
        localStorage.setItem('vl_users_db', JSON.stringify([...existingUsers, authEntry]));
        
        // Create active session in localStorage
        localStorage.setItem('vl_session', JSON.stringify(newUser));

        setIsLoading(false);
        setIsSuccess(true);
        
        // Redirect after showing success
        setTimeout(() => {
            onSignUpSuccess(newUser);
        }, 1500);

      }, 1000);
    }
  };

  if (isSuccess) {
    return (
        <div className="min-h-screen bg-vl-dark flex items-center justify-center animate-fade-in-up">
            <div className="w-full max-w-md bg-vl-surface border border-vl-accent rounded-2xl p-8 text-center relative overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.1)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-vl-accent"></div>
                
                <div className="w-20 h-20 bg-vl-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-vl-accent animate-[bounce_1s_infinite]">
                    <CheckCircle size={40} />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Aboard!</h2>
                <p className="text-gray-400 mb-6">Your account has been created successfully.</p>
                
                <p className="text-vl-accent animate-pulse text-sm">Redirecting to fleet...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh] py-12">
        <div className="w-full max-w-2xl bg-vl-surface border border-vl-subtle rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
             {/* Decorative accent */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-vl-accent/5 rounded-full blur-3xl"></div>

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Create Member Account</h1>
                <p className="text-gray-400 text-sm max-w-md mx-auto">Join VL Rent a Car to unlock priority booking, history tracking, and exclusive long-term rates.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-vl-accent uppercase tracking-widest border-b border-vl-subtle pb-2">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="First Name" name="firstName" placeholder="e.g. Kasun" icon={User} error={errors.firstName} value={formData.firstName} onChange={handleChange} />
                    <InputField label="Last Name" name="lastName" placeholder="e.g. Perera" icon={User} error={errors.lastName} value={formData.lastName} onChange={handleChange} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" icon={Mail} error={errors.email} value={formData.email} onChange={handleChange} />
                    <InputField label="Phone Number" name="phone" placeholder="07X XXX XXXX" icon={Phone} error={errors.phone} value={formData.phone} onChange={handleChange} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <InputField label="NIC / Passport" name="idNumber" placeholder="ID Number" icon={CreditCard} error={errors.idNumber} value={formData.idNumber} onChange={handleChange} />
                     <InputField label="Permanent Address" name="address" placeholder="House No, Street, City" icon={MapPin} error={errors.address} value={formData.address} onChange={handleChange} />
                  </div>
                </div>

                {/* Account Credentials Section */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-vl-accent uppercase tracking-widest border-b border-vl-subtle pb-2">Account Security</h3>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex justify-between">
                        Username
                        {/* Status Text Indicator */}
                        {usernameStatus === 'checking' && <span className="text-vl-accent normal-case font-normal flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Checking availability...</span>}
                        {usernameStatus === 'available' && <span className="text-green-500 normal-case font-normal flex items-center gap-1"><CheckCircle size={12} /> Username available</span>}
                        {usernameStatus === 'taken' && <span className="text-red-500 normal-case font-normal flex items-center gap-1"><AlertCircle size={12} /> Username taken</span>}
                    </label>
                    <div className="relative group">
                        <User className={`absolute left-3 top-3.5 transition-colors size={18} ${errors.username ? 'text-red-500' : 'text-gray-500 group-focus-within:text-vl-accent'}`} />
                        <input 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`w-full bg-vl-dark border rounded-lg py-3 pl-10 pr-10 text-white focus:outline-none transition-all duration-300 placeholder-gray-600 ${
                            errors.username || usernameStatus === 'taken' ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 
                            usernameStatus === 'available' ? 'border-green-500/50 focus:border-green-500 focus:ring-1 focus:ring-green-500' : 
                            'border-vl-subtle focus:border-vl-accent focus:ring-1 focus:ring-vl-accent'
                        }`}
                        placeholder="Choose a unique username" 
                        />
                        {/* Status Icon Indicator inside Input */}
                        <div className="absolute right-3 top-3.5 pointer-events-none">
                            {usernameStatus === 'checking' && <Loader2 size={18} className="text-gray-500 animate-spin" />}
                            {usernameStatus === 'available' && <CheckCircle size={18} className="text-green-500" />}
                            {usernameStatus === 'taken' && <AlertCircle size={18} className="text-red-500" />}
                        </div>
                    </div>
                    {errors.username && <p className="text-xs text-red-500 mt-1 animate-slide-in-right">{errors.username}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Create Password" name="password" type="password" placeholder="••••••••" icon={Lock} error={errors.password} value={formData.password} onChange={handleChange} />
                    <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" icon={Lock} error={errors.confirmPassword} value={formData.confirmPassword} onChange={handleChange} />
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className={`p-4 rounded-xl border transition-colors ${errors.agreeTerms ? 'bg-red-500/10 border-red-500/50' : 'bg-vl-dark border-vl-subtle'}`}>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center mt-0.5">
                      <input 
                        type="checkbox" 
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded transition-all ${errors.agreeTerms ? 'border-red-500' : 'border-gray-500'} peer-checked:bg-vl-accent peer-checked:border-vl-accent`}></div>
                      <CheckCircle size={12} className="absolute top-[3px] left-[3px] text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className={`text-sm ${errors.agreeTerms ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      I agree to the <a href="#" className="text-vl-accent hover:underline">Terms of Service</a> and <a href="#" className="text-vl-accent hover:underline">Privacy Policy</a>. I confirm that all provided details are accurate.
                    </span>
                  </label>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-vl-accent to-yellow-400 text-black font-bold text-lg rounded-xl hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
                >
                    {/* Shimmer effect overlay */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
                    
                    <span className="relative z-20 flex items-center gap-2">
                       {isLoading ? <Loader2 className="animate-spin" size={24} /> : 'Create Account'}
                    </span>
                </button>
            </form>
            
            <div className="mt-8 text-center pt-6 border-t border-vl-subtle">
                <p className="text-gray-500 text-sm mb-3">Already a member?</p>
                <button 
                    onClick={onNavigateSignIn} 
                    className="w-full py-3 border border-vl-subtle rounded-xl text-white font-medium hover:border-vl-accent hover:text-vl-accent transition-all flex items-center justify-center gap-2 group"
                >
                    Sign In to Account
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;