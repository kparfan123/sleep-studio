import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Star, Activity } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenQuiz: () => void;
}

export default function Navbar({ cart, onOpenCart, onOpenQuiz }: NavbarProps) {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current scroll section
      const sections = ['home', 'about', 'products', 'gallery', 'quiz', 'reviews', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'home' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
      setIsOpenInput(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
        : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
    } px-6 md:px-16 text-[#181c1d]`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <a 
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex flex-col select-none"
        >
          <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-[#00617d] hover:opacity-90 transition-opacity">
            The Sleep Studio
          </span>
          <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase -mt-1">
            Palakkode • ZAARA Authorized
          </span>
        </a>

        {/* Desktop Pages Links */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Showroom' },
            { id: 'products', label: 'Collections' },
            { id: 'gallery', label: 'Inspired Living' },
            { id: 'reviews', label: 'Stories' },
            { id: 'contact', label: 'Get in Touch' }
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`relative py-1 uppercase tracking-wider text-xs transition-colors hover:text-[#007b9e] ${
                activeTab === link.id 
                  ? 'text-[#00617d] font-bold border-b-2 border-[#00617d]' 
                  : 'text-slate-600'
              }`}
            >
              {link.label}
            </a>
          ))}
          
          {/* Interactive Advisor triggering button */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f9ff] text-[#007b9e] border border-cyan-200 rounded-lg hover:bg-[#e0f2fe] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 stroke-[2.5]" />
            Sleep Diagnostic Tool
          </button>
        </div>

        {/* Dynamic Cart & Menu Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-slate-700 hover:text-[#00617d] transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#007b9e] text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Quick Consultation CTA */}
          <button 
            onClick={onOpenQuiz}
            className="hidden lg:block bg-[#00617d] text-white px-5 py-2 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#007b9e] hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Find Bed Mattress
          </button>

          {/* Hamburger Mobile Menu toggle */}
          <button 
            onClick={() => setIsOpenInput(!isOpenInput)}
            className="lg:hidden p-2 text-slate-600 hover:text-[#00617d] transition-colors rounded-full hover:bg-slate-100"
          >
            {isOpenInput ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay List */}
      {isOpenInput && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-200 shadow-xl px-6 py-6 flex flex-col gap-4 animate-fade-in text-sm font-medium">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Showroom' },
            { id: 'products', label: 'Collections' },
            { id: 'gallery', label: 'Inspired Living' },
            { id: 'reviews', label: 'Stories of sleep' },
            { id: 'contact', label: 'Get in Touch' }
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className={`py-2 border-b border-slate-100 uppercase tracking-widest text-xs ${
                activeTab === link.id ? 'text-[#00617d] font-bold' : 'text-slate-600'
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile sleep diagnostic option */}
          <button
            onClick={() => {
              setIsOpenInput(false);
              onOpenQuiz();
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 mt-2 bg-[#f0f9ff] text-[#007b9e] border border-cyan-200 rounded-lg hover:bg-[#e0f2fe] text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Activity className="w-4 h-4 stroke-[2.5]" />
            Sleep Diagnostic Tool
          </button>

          <button
            onClick={() => {
              setIsOpenInput(false);
              onOpenCart();
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#0f2e4f] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#1a4470]"
          >
            <ShoppingBag className="w-4 h-4" />
            Check My Cart ({totalCartCount} items)
          </button>
        </div>
      )}
    </nav>
  );
}
