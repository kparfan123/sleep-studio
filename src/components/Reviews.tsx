import React, { useState } from 'react';
import { Star, MessageSquare, PlusCircle, CheckCircle, Quote } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data';

interface ReviewsProps {
  // Option to append reviews locally
}

export default function Reviews({}: ReviewsProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) {
      alert("Please fill in your name and review note.");
      return;
    }

    const initials = author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const newRev: Review = {
      id: `local-${Date.now()}`,
      author,
      text,
      role: role || ("Verified Customer"),
      location: location || "Kerala",
      rating,
      avatarInitial: initials || "C",
      date: "Just now"
    };

    setReviewsList([newRev, ...reviewsList]);
    setToastMessage("Thank you! Your verified review has been posted successfully.");
    
    // reset form fields
    setAuthor('');
    setRole('');
    setLocation('');
    setText('');
    setRating(5);
    setShowAddForm(false);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-24 px-6 md:px-16 bg-white text-[#181c1d]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[#007b9e] text-xs font-bold uppercase tracking-widest block mb-1">
            Customer Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#0f2e4f] tracking-tight">
            Stories of Sound Sleep
          </h2>
          <p className="text-slate-500 text-sm font-medium mt-3">
            Read authentic experiences from Kerala homeowners, wellness consultants, and interior designers who made the switch to absolute rest.
          </p>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="mb-8 max-w-lg mx-auto bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg flex items-center gap-3 animate-fade-in shadow-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs font-semibold">{toastMessage}</p>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#f1f4f5] p-8 rounded-xl border border-slate-200/50 flex flex-col justify-between relative shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200 shrink-0" />
              
              <div>
                <div className="flex text-amber-500 gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-current text-amber-500' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>

                <p className="font-serif italic text-slate-700 text-base leading-relaxed mb-8 relative z-10">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-200/50 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#bbd6ff] flex items-center justify-center font-bold text-[#00617d] shrink-0 text-sm">
                  {rev.avatarInitial}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#0f2e4f]">{rev.author}</p>
                  <p className="text-xs text-slate-400 font-medium">
                    {rev.role}, {rev.location}
                  </p>
                </div>
                <span className="ml-auto text-[10px] text-slate-400 font-semibold uppercase">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button to Open Add Review Form */}
        {!showAddForm ? (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f1f4f5] text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:bg-slate-50"
            >
              <PlusCircle className="w-4 h-4 text-[#007b9e]" />
              Share Your Rest Experience
            </button>
          </div>
        ) : (
          /* Form block container */
          <div className="mt-12 max-w-2xl mx-auto bg-[#fafbfc] border border-slate-200 rounded-xl p-8 shadow-lg animate-fade-in text-[#181c1d]">
            <h3 className="font-serif text-xl font-bold text-[#0f2e4f] mb-6 border-b border-slate-100 pb-3">
              Write Your Verified Sleep Testimonial
            </h3>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Ramesh Nair"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#007b9e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Profession / Role (Optional)
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Homeowner / Doctor"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#007b9e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    City / Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Palakkode / Kochi"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#007b9e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Your Rest Rating
                  </label>
                  <div className="flex gap-1 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Detailed Experience testimonial *
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share details about the mattress support quality, fabric feels, or showroom purchase service in Kerala..."
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#007b9e] resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#00617d] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#007b9e] shadow"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
