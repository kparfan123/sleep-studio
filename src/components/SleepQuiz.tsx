import React, { useState } from 'react';
import { Activity, ArrowRight, ArrowLeft, RefreshCw, Star, ShoppingBag, MessageSquare } from 'lucide-react';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data';
import { Product, CartItem } from '../types';

interface SleepQuizProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (item: CartItem) => void;
}

export default function SleepQuiz({ onSelectProduct, onAddToCart }: SleepQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const handleSelectOption = (questionId: number, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommendation
      const designChoice = updated[3]; // Preference mattress density (firm, medium_firm, soft)
      const healthIssue = updated[2]; // back neck pain, general
      const tempPreference = updated[4]; // temperature

      let recommendedId = "zaara-ortho"; // Default best seller ortho mattress

      if (designChoice === "soft" || tempPreference === "hot") {
        recommendedId = "zaara-dual-comfort";
      } else if (healthIssue === "neck_pain") {
        recommendedId = "zaara-ortho-pillow";
      } else if (designChoice === "firm") {
        recommendedId = "zaara-ortho";
      }

      const found = PRODUCTS.find(p => p.id === recommendedId) || PRODUCTS[0];
      setRecommendedProduct(found);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
    setRecommendedProduct(null);
  };

  const handleDirectWhatsAppDiagnostic = () => {
    if (!recommendedProduct) return;
    const text = encodeURIComponent(
      `Hello Sleep Studio, I just completed your Sleep Diagnostic Quiz on your app. My profile:\n\n- Position: ${answers[1] || 'Combination'}\n- Health Focus: ${answers[2] || 'Back Prevention'}\n- Feel Preference: ${answers[3] || 'Medium Firm'}\n- Temperature: ${answers[4] || 'Normal'}\n\nRecommended: "${recommendedProduct.title}"\n\nCould you please guide me further on this? Thanks!`
    );
    window.open(`https://wa.me/919995081947?text=${text}`, '_blank');
  };

  const activeQuestion = QUIZ_QUESTIONS[currentStep];

  return (
    <section id="quiz" className="py-24 px-6 md:px-16 bg-[#eaf7fb] text-[#181c1d]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#007b9e]/10 text-[#00617d] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5" />
            Sleep Diagnostic Advisor
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#0f2e4f] tracking-tight">
            Find Your Absolute Sleep Comfort
          </h2>
          <p className="text-slate-500 font-medium text-sm mt-3 max-w-xl mx-auto">
            Answer 4 quick diagnostic questions formulated with therapeutic spine alignment physics to uncover the perfect ZAARA mattress for your body.
          </p>
        </div>

        {/* Diagnostic Wizard Box */}
        <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-6 md:p-12 overflow-hidden transition-all">
          {!isCompleted ? (
            <div className="space-y-8">
              {/* Progress Bar indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4">
                <span>Diagnostic Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="text-[#007b9e]">{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete</span>
              </div>

              {/* Progress Meter bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#007b9e] h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Screen */}
              <div className="space-y-6">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#0f2e4f]">
                  {activeQuestion.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {activeQuestion.options.map((option) => {
                    const isSelected = answers[activeQuestion.id] === option.value;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelectOption(activeQuestion.id, option.value)}
                        className={`p-5 rounded-lg text-left border font-semibold text-sm transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-[#007b9e]/5 border-[#007b9e] text-[#00617d] ring-1 ring-[#007b9e]'
                            : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{option.text}</span>
                        <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1 ${
                          isSelected ? 'text-[#007b9e]' : ''
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${
                    currentStep === 0 
                      ? 'text-slate-300 cursor-not-allowed' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <span className="text-xs text-slate-400">Powered by Authorized ZAARA Technology</span>
              </div>
            </div>
          ) : (
            /* Recommendations Screen */
            <div className="space-y-8 animate-fade-in text-center md:text-left">
              <div className="border-b border-slate-100 pb-4 text-center">
                <span className="text-[#007b9e] text-xs font-bold uppercase tracking-widest block">Analysis Complete</span>
                <h3 className="font-serif text-2xl font-bold text-[#0f2e4f] mt-1 text-center">Your Custom Sleep Prescription</h3>
              </div>

              {recommendedProduct && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                  {/* Recommended Product Photo */}
                  <div className="md:col-span-4 bg-[#f8fafc] p-6 rounded-lg border border-slate-100 flex justify-center">
                    <img 
                      src={recommendedProduct.image} 
                      alt={recommendedProduct.title}
                      className="max-h-[180px] object-contain hover:scale-105 transition-transform" 
                    />
                  </div>

                  {/* Recommendation Details */}
                  <div className="md:col-span-8 space-y-4">
                    <span className="bg-[#e0f2fe] text-[#00617d] text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                      Optimal Recommendation match
                    </span>
                    <h4 className="font-serif text-2xl font-bold text-[#0f2e4f]">
                      {recommendedProduct.title}
                    </h4>
                    
                    <div className="flex justify-center md:justify-start text-amber-500 gap-1 text-xs items-center">
                      <div className="flex font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-slate-400 ml-1">(5/5 Perfect match index)</span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      Based on your preferences, this selection offers optimized orthopedic spine relief, continuous heat-ventilation layers, and the exact firm-medium contour support your sleep position requires.
                    </p>

                    <ul className="text-xs text-slate-500 space-y-1 block max-w-md">
                      {recommendedProduct.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#007b9e]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-xl font-bold text-[#00617d] pt-2">
                      Est Price: ₹{recommendedProduct.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendation Call to Actions */}
              <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Retake Diagnostic
                </button>

                <button
                  onClick={() => recommendedProduct && onSelectProduct(recommendedProduct)}
                  className="px-6 py-3 bg-[#0f2e4f] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#1a4470] flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Configure Bed Set
                </button>

                <button
                  onClick={handleDirectWhatsAppDiagnostic}
                  className="px-6 py-3 bg-[#25D366] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#20ba59] flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                  Consult Doctor/Dealer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
