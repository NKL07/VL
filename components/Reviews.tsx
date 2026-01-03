import React, { useEffect } from 'react';
import { ArrowLeft, Star, User, Quote, CheckCircle, ThumbsUp, TrendingUp } from 'lucide-react';

interface ReviewsProps {
  onBack: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = {
    average: 4.9,
    total: 842,
    recommendation: 98
  };

  const reviews = [
    {
      id: 1,
      name: "Dilshan Rajapaksa",
      role: "Business Traveler",
      rating: 5,
      date: "2 days ago",
      tags: ["Hybrid Efficiency", "Cleanliness"],
      content: "The Suzuki Wagon R was in immaculate condition. The hybrid fuel economy is a game changer for Colombo traffic. The handover process was fully digital and took less than 5 minutes.",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      role: "Tourist (UK)",
      rating: 5,
      date: "1 week ago",
      tags: ["Airport Pickup", "Service"],
      content: "First time driving in Sri Lanka and VL made it effortless. The team was waiting at the airport, paperwork was ready, and the car had Apple CarPlay which was essential for navigation.",
      verified: true
    },
    {
      id: 3,
      name: "Kamal Perera",
      role: "Long Term Rental",
      rating: 4,
      date: "2 weeks ago",
      tags: ["Monthly Rate", "Maintenance"],
      content: "Been renting for 2 months now. Good rates for long term. They come to my office to do the routine checkups so I don't have to visit the garage. Very convenient.",
      verified: true
    },
     {
      id: 4,
      name: "Nimali Silva",
      role: "Family Trip",
      rating: 5,
      date: "3 weeks ago",
      tags: ["Safety", "Comfort"],
      content: "Safety was my priority. Checked the tires and ABS light before accepting, everything was perfect. Car seats were clean. Felt very safe driving down south with my kids.",
      verified: true
    },
    {
        id: 5,
        name: "David Chen",
        role: "Digital Nomad",
        rating: 5,
        date: "1 month ago",
        tags: ["Flexible", "Tech-savvy"],
        content: "Love the tech-forward approach. No paper forms, just WhatsApp and digital receipts. The car (Wagon R) is surprisingly spacious for all my gear.",
        verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-vl-dark animate-fade-in-up">
      {/* Header handled by Global Navigation in App.tsx */}

      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vl-accent/10 text-vl-accent border border-vl-accent/20 text-xs font-bold uppercase tracking-wider mb-4">
                    <CheckCircle size={14} /> Verified Reviews
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-vl-accent to-yellow-200">Drivers</span></h1>
                <p className="text-gray-400 max-w-md">See what our community has to say about the VL driving experience.</p>
            </div>

            <button className="px-6 py-3 bg-vl-surface border border-vl-subtle hover:border-vl-accent text-white font-bold rounded-xl transition-all active:scale-95 flex items-center gap-2">
                <Quote size={18} className="text-vl-accent" /> Write a Review
            </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-vl-surface border border-vl-subtle p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Star size={80} />
                </div>
                <div className="relative z-10">
                    <div className="text-4xl font-bold text-white mb-1">{stats.average}</div>
                    <div className="flex gap-1 text-vl-accent text-sm mb-2">
                         {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.floor(stats.average) ? "currentColor" : "none"} className={i < Math.floor(stats.average) ? "" : "opacity-30"} />
                         ))}
                    </div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Overall Rating</p>
                </div>
            </div>

             <div className="bg-vl-surface border border-vl-subtle p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ThumbsUp size={80} />
                </div>
                <div className="relative z-10">
                    <div className="text-4xl font-bold text-white mb-1">{stats.recommendation}%</div>
                    <div className="w-full bg-gray-700 h-1.5 rounded-full mb-2 mt-2 overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: `${stats.recommendation}%` }}></div>
                    </div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Would Recommend</p>
                </div>
            </div>

             <div className="bg-vl-surface border border-vl-subtle p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp size={80} />
                </div>
                <div className="relative z-10">
                    <div className="text-4xl font-bold text-white mb-1">{stats.total}+</div>
                    <div className="text-sm text-green-500 mb-2 font-mono flex items-center gap-1">
                        <TrendingUp size={14} /> +12 this week
                    </div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Total Reviews</p>
                </div>
            </div>
        </div>

        {/* Reviews Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {reviews.map((review, idx) => (
                <div key={review.id} className="break-inside-avoid bg-vl-surface border border-vl-subtle rounded-2xl p-6 hover:border-vl-accent/30 hover:shadow-lg hover:shadow-vl-accent/5 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold border border-vl-subtle">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm flex items-center gap-1">
                                    {review.name}
                                    {review.verified && <CheckCircle size={12} className="text-vl-accent" />}
                                </h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">{review.role}</p>
                            </div>
                        </div>
                        <div className="bg-vl-dark px-2 py-1 rounded text-vl-accent text-xs font-bold flex gap-1 items-center">
                            <Star size={10} fill="currentColor" /> {review.rating}.0
                        </div>
                    </div>

                    <div className="mb-4">
                        <Quote className="text-gray-700 fill-gray-700/20 mb-2 transform group-hover:text-vl-accent/20 group-hover:scale-110 transition-all origin-top-left" size={24} />
                        <p className="text-gray-300 text-sm leading-relaxed font-light">
                            {review.content}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {review.tags?.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-vl-dark border border-vl-subtle rounded text-[10px] text-gray-400 group-hover:border-gray-600 transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    
                    <div className="pt-4 border-t border-vl-subtle flex justify-between items-center text-[10px] text-gray-600">
                        <span>Posted on VL Platform</span>
                        <span>{review.date}</span>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}

export default Reviews;