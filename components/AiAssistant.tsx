import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, WifiOff } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Beep boop! 🤖 I am your VL Bot. Ask me anything about our cars!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasNotification, setHasNotification] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg, messages);

    // Check for demo mode signal
    if (responseText.startsWith("DEMO_MODE:")) {
        setIsOffline(true);
        setMessages(prev => [...prev, { role: 'model', text: responseText.replace("DEMO_MODE: ", "") }]);
    } else {
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    }
    
    setIsLoading(false);
  };

  const toggleChat = () => {
      setIsOpen(!isOpen);
      if (hasNotification) setHasNotification(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[340px] sm:w-[380px] h-[550px] bg-[#0A0A0C]/95 backdrop-blur-xl border border-vl-accent/30 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-scale-in origin-bottom-right ring-1 ring-white/10">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-vl-accent/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-vl-accent flex items-center justify-center shadow-lg relative">
                  <Bot size={22} className="text-black" />
                  {isOffline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#0A0A0C] flex items-center justify-center">
                          <WifiOff size={8} className="text-white" />
                      </div>
                  )}
              </div>
              <div>
                 <h3 className="font-bold text-white text-base">VL Bot</h3>
                 <span className={`flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold ${isOffline ? 'text-red-500' : 'text-green-500'}`}>
                    {isOffline ? 'Offline' : 'Online'}
                 </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-vl-subtle">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-vl-accent text-black rounded-br-none font-semibold' 
                    : 'bg-[#1a1a1c] border border-white/10 text-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1c] border border-white/10 p-4 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-vl-accent rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-vl-accent rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-vl-accent rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-black/40">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isOffline ? "Chat unavailable..." : "Ask me..."}
                disabled={isOffline || isLoading}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-vl-accent/50 focus:bg-white/10 transition-all font-sans placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || isOffline}
                className="absolute right-2 p-2 bg-vl-accent rounded-full text-black hover:bg-yellow-400 disabled:opacity-50 disabled:bg-gray-600 transition-all active:scale-95 shadow-[0_0_10px_rgba(234,179,8,0.4)]"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUTE ROBOT BUTTON */}
      <button 
        onClick={toggleChat}
        className={`group relative w-16 h-16 focus:outline-none transition-all duration-300 ${isOpen ? 'scale-90' : 'hover:scale-110'}`}
      >
         {/* Robot Head Container */}
         <div className="w-full h-full bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-[#0A0A0C] flex flex-col items-center justify-center overflow-hidden relative animate-[float_3s_ease-in-out_infinite]">
             
             {/* Antenna */}
             <div className="absolute -top-3 w-1 h-3 bg-gray-400"></div>
             <div className={`absolute -top-4 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_red] ${isOffline ? 'bg-gray-400 shadow-none animate-none' : 'bg-red-500'}`}></div>

             {/* Face Screen */}
             <div className="w-10 h-6 bg-[#0A0A0C] rounded-lg flex items-center justify-center gap-1.5 relative overflow-hidden">
                 {/* Eyes */}
                 {isOffline ? (
                     // Dead Eyes
                     <>
                        <div className="w-2 h-0.5 bg-red-500 rotate-45"></div>
                        <div className="w-2 h-0.5 bg-red-500 -rotate-45"></div>
                     </>
                 ) : isOpen ? (
                     // Happy/Open Eyes
                     <>
                        <div className="w-1.5 h-1.5 bg-vl-accent rounded-full shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
                        <div className="w-1.5 h-1.5 bg-vl-accent rounded-full shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
                     </>
                 ) : (
                     // Normal Blink Eyes
                     <>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-[pulse_2s_infinite] shadow-[0_0_5px_cyan]"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-[pulse_2s_infinite] shadow-[0_0_5px_cyan]"></div>
                     </>
                 )}
                 
                 {/* Reflection */}
                 <div className="absolute top-0 right-0 w-full h-1/2 bg-white/10 rounded-t-lg pointer-events-none"></div>
             </div>
         </div>

         {/* Notification Badge */}
         {hasNotification && !isOpen && !isOffline && (
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center font-bold rounded-full border-2 border-[#0A0A0C] z-20 animate-bounce">1</span>
         )}
      </button>
    </div>
  );
};

export default AiAssistant;