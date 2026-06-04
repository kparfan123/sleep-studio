import React, { useState, useEffect } from 'react';
import { 
  Activity, Star, ShoppingBag, Phone, MapPin, Check, 
  CheckCircle, MessageSquare, Clock, ArrowRight, ShieldCheck, 
  X, Send, Plus, Sparkles, MessageCircle, Heart, Info, InfoIcon
} from 'lucide-react';

import { Product, CartItem, ContactMessage } from './types';
import { PRODUCTS, CATEGORIES, SHOWROOM_INFO, GALLERY_ITEMS } from './data';

import Navbar from './components/Navbar';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import SleepQuiz from './components/SleepQuiz';
import Reviews from './components/Reviews';
import { motion } from 'motion/react';

export default function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('sleep_studio_theme');
      return (stored as 'light' | 'dark') || 'light';
    } catch {
      return 'light';
    }
  });

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    try {
      localStorage.setItem('sleep_studio_theme', theme);
    } catch (err) {
      console.warn("Storage write failed:", err);
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Cart state with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('sleep_studio_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // UI state managers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Contact Form state management
  const [contactForm, setContactForm] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Bedding Enquiry',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [favProducts, setFavProducts] = useState<string[]>([]);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('sleep_studio_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart operations helper methods
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => 
          item.product.id === newItem.product.id && 
          item.selectedSize === newItem.selectedSize &&
          item.selectedThickness === newItem.selectedThickness
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prevCart, newItem];
    });

    setAlertMsg(`Added ${newItem.quantity}x "${newItem.product.title}" to your cart!`);
    setTimeout(() => setAlertMsg(null), 3000);
  };

  const handleUpdateQuantity = (idx: number, change: number) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      const newQty = updated[idx].quantity + change;
      if (newQty <= 0) {
        updated.splice(idx, 1);
      } else {
        updated[idx].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated.splice(idx, 1);
      return updated;
    });
  };

  const handleToggleFav = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.warn("Failed to copy link automatically.", err);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: 'General Bedding Enquiry',
        message: ''
      });
    }, 4500);
  };

  const handleScrollToSection = (id: string) => {
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
    }
  };

  // Filter products by category tab
  const filteredProducts = activeCategoryFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategoryFilter);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0b1329] text-[#f1f5f9]' : 'bg-[#f7fafb] text-[#181c1d]'} font-sans antialiased selection:bg-[#007b9e] selection:text-white transition-colors duration-300`}>
      
      {/* Upper Announcement info banner */}
      <div className="bg-[#0f2e4f] text-[#f0f9ff] text-[11px] font-bold tracking-widest text-center py-2 px-4 uppercase flex justify-center items-center gap-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
        <span>Kerala's Authorized ZAARA Dealer • Complimentary Direct Home Setup across Palakkode</span>
        <span className="hidden md:inline">
          • Contact Showroom{' '}
          <a href="tel:+919995081947" className="hover:text-amber-300 underline underline-offset-2 transition-colors">
            +91 9995081947
          </a>
        </span>
      </div>

      {/* Navigation Subsystem */}
      <Navbar 
        cart={cart} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenQuiz={() => {
          handleScrollToSection('quiz');
        }} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Central Interactive Alerts feedback popup */}
      {alertMsg && (
        <div className="fixed top-20 right-6 z-100 bg-[#0f2e4f] text-white border border-slate-700 p-4 rounded-lg shadow-xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-[#7ad1f8]" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <header id="home" className="relative h-screen flex items-center justify-start overflow-hidden pt-12">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover select-none" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjBIbCWjPcZYAfwrO1r2ZQuWYrynmuf78hOmXKZUwyBaLuSSZcpePtRO2ibj20YLRS7jfLeZgd0EGiAi4ZEYtdOj4ZpmqKYlv3o-X2aM8CMegLMntHpUlnqaBy86hGbyQ77AJjWczvUA6ePkOyuPlbmY_6thjfqZsp8PmPX2G4LZHUJUoEmBYrnnyE0ZcK5fyZwK-ULzUgpfYgV4WT0cCTnprYa8gqig540wXcyUJ3PNkEjU3Wp92J1IOL-OVMrDc1-SYynkh9V4M"
            alt="The Sleep Studio luxury orthopaedic master suite"
          />
          {/* Soft premium ambient shade overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 md:px-16 max-w-4xl text-white space-y-6">
          <span className="text-[#7ad1f8] uppercase tracking-widest text-xs font-black bg-cyan-950/45 px-3 py-1.5 rounded-md inline-block border border-cyan-800">
            {SHOWROOM_INFO.dealerStatus}
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white max-w-3xl">
            Experience Better Sleep Every Night
          </h1>
          
          <p className="font-sans text-[#e5e9ea] text-sm md:text-lg leading-relaxed max-w-2xl">
            Quality Mattresses, Premium Bedding &amp; Affordable Luxury for Every Home in Kerala. Discover the therapeutic art of restful living with our curated orthopedic collections.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button 
              onClick={() => handleScrollToSection('products')}
              className="bg-[#007b9e] text-white px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#00617d] transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleScrollToSection('contact')}
              className="border border-white hover:bg-white/15 text-white px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Visit Showroom</span>
            </button>
          </div>
        </div>

        {/* Dynamic bottom scrolling bounce item */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block animate-pulse text-xs text-white/50 tracking-widest uppercase font-semibold">
          Scroll Down to Discover
        </div>
      </header>

      {/* 2. ABOUT SHOWROOM SECTION */}
      <section id="about" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Elegant Showroom Photo */}
          <div className="relative group">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#bbd6ff]/20 -z-10 rounded-full blur-2xl"></div>
            <img 
              className="rounded-xl cloud-shadow w-full aspect-[4/5] object-cover group-hover:scale-101 transition-transform duration-500 border border-slate-200"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUdQDR7WPbgVtfu1od_hZ4vYXSBCT98g34xpyVbwRphJo5e5IqMdSZ2xDai-uTPOmRd61_vIT9fXS8XawGQBtG1vGUGV6sYSrxAn7CIGLeBFI3XtfKUpgTdOUlBFsHK_QumhFzjKFetwzBZ0-727JvK5bNLsUaaORUotL4-ebhGLwg6Rj7fSImpJgrZ83QgDchUWt8JDxzNC1MObCp4p0ziVkkZAWwIZ_9IZ2K8-x4Ujcbq7IDpBXW_FD_0CFMzL58h3ipg-zDALI"
              alt="The Sleep Studio premium bedroom showroom display in Noor E Mall Kerala"
            />
            {/* Soft decorative badge */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-4 rounded-lg shadow-lg border border-slate-200/50 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-[#0f2e4f]">Showroom Open</p>
                <p className="text-[10px] text-slate-500 font-bold">10:00 AM - 9:00 PM Daily</p>
              </div>
            </div>
          </div>

          {/* About narrative details */}
          <div className="space-y-6">
            <span className="text-[#007b9e] text-xs font-extrabold uppercase tracking-widest block">
              The Heritage of Comfort
            </span>
            
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#0f2e4f] leading-tight">
              About The Sleep Studio
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Welcome to Palakkode's premier destination for luxury bedding and state-of-the-art rest. As an <strong>Authorized ZAARA Dealer</strong>, we pride ourselves on bringing world-certified orthopedic sleep science directly to the homes of Kerala.
            </p>

            <p className="text-slate-500 text-sm leading-relaxed border-l-4 border-[#007b9e] pl-4">
              Our studio in Noor E Mall offers a carefully curated selection of premium mattresses, silk bedsheets, and contouring supportive pillows. Every item is handpicked for families who refuse to compromise on long-term spinal health.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <div className="bg-[#bbd6ff]/45 p-2 rounded-lg text-[#00617d]">
                  <ShieldCheck className="w-5 h-5 stroke-[2.3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0f2e4f] uppercase tracking-wider">Authorized Dealer</h4>
                  <p className="text-xs text-slate-400 mt-0.5">100% Genuine ZAARA items</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <div className="bg-[#f0f9ff] p-2 rounded-lg text-[#007b9e]">
                  <MapPin className="w-5 h-5 stroke-[2.3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0f2e4f] uppercase tracking-wider">Noor E Mall, Palakkode</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Physical retail experience</p>
                </div>
              </div>
            </div>

            {/* Address parameters overlay */}
            <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
              <Phone className="w-5 h-5 text-[#00617d] shrink-0" />
              <div>
                <p className="text-xs font-extrabold uppercase text-[#0f2e4f]">Call for instant consultation</p>
                <p className="text-sm font-semibold text-slate-700">
                  <a href="tel:+919995081947" className="hover:text-[#007b9e] font-bold transition-colors hover:underline">+91 9995081947</a>,{' '}
                  <a href="tel:+918137977542" className="hover:text-[#007b9e] font-bold transition-colors hover:underline">+91 8137977542</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM COLLECTIONS GRID */}
      <section id="products" className="bg-[#f1f4f5] py-24 px-6 md:px-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header block */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[#007b9e] text-xs font-black uppercase tracking-widest block">
              Curated Master Designs
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#0f2e4f] tracking-tight">
              Our Premium Collections
            </h2>
            <p className="text-slate-500 text-xs md:text-sm">
              Discover everything you need for the perfect home bedroom sanctuary, from scientific orthopaedic posture support to the softest hand-loomed fibers.
            </p>
          </div>

          {/* Interactive Categories filtering tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200/50 pb-6">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#0f2e4f] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Products ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                    activeCategoryFilter === cat.id
                      ? 'bg-[#0f2e4f] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.title} {count > 0 ? `(${count})` : ''}
                </button>
              );
            })}
          </div>

          {/* Animated Filtered Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const isLiked = favProducts.includes(p.id);
              return (
                <div 
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="group relative overflow-hidden rounded-xl bg-white border border-slate-200/70 cloud-shadow hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image container panel */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-white/50 border-b border-slate-100 p-2 flex items-center justify-center">
                    
                    {p.isZaaraAuthorized && (
                      <span className="absolute top-4 left-4 z-10 bg-[#00617d] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                        ZAARA Authorized
                      </span>
                    )}

                    <button 
                      onClick={(e) => handleToggleFav(p.id, e)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200 shadow-sm transition-colors text-slate-500 hover:text-red-500 cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    <img 
                      className="max-h-[190px] max-w-[85%] object-contain transition-transform duration-700 group-hover:scale-106 select-none" 
                      src={p.image} 
                      alt={p.title} 
                    />
                    
                    {/* Hover reveal overlay backdrop overlay */}
                    <div className="absolute inset-0 bg-[#0f2e4f]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-[#0f2e4f] px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase shadow">
                        Configure Item
                      </span>
                    </div>
                  </div>

                  {/* Text descriptions */}
                  <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between bg-white text-[#181c1d]">
                    <div className="space-y-2">
                      <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold font-sans">
                        {p.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#0f2e4f] tracking-tight group-hover:text-[#007b9e] transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="text-left">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Showroom Price</span>
                        <span className="text-base font-extrabold text-[#00617d]">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="text-right flex items-center gap-1.5 text-[#007b9e] font-semibold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                        <span>Explore Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice info */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2.5">
              <Info className="text-[#007b9e] w-5 h-5 shrink-0" />
              <span>Seeking custom sizes for wooden frames? Our Kerala showroom specializes in tailored cutting services.</span>
            </div>
            <button 
              onClick={() => handleScrollToSection('contact')}
              className="text-[#00617d] font-bold uppercase tracking-wider hover:underline hover:text-[#007b9e]"
            >
              Discuss size customisation
            </button>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE THE SLEEP STUDIO SECTION */}
      <section className="py-24 px-6 md:px-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-center text-[#0f2e4f] tracking-tight">
            Why Choose The Sleep Studio
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-[#fafbfc] border border-slate-100 rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-[#007b9e]/10 group-hover:text-[#00617d]">
                <ShieldCheck className="w-8 h-8 text-[#007b9e]" />
              </div>
              <h4 className="font-bold text-[#0f2e4f] text-xs uppercase tracking-wider mb-1 px-1">Authorized Dealer</h4>
              <p className="text-slate-500 text-[11px] font-sans">100% Genuine Certified ZAARA setups.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-[#fafbfc] border border-slate-100 rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-[#007b9e]/10 group-hover:text-[#00617d]">
                <Star className="w-8 h-8 text-[#007b9e] fill-[#bbd6ff]/50" />
              </div>
              <h4 className="font-bold text-[#0f2e4f] text-xs uppercase tracking-wider mb-1 px-1 font-sans">Premium Quality</h4>
              <p className="text-slate-500 text-[11px]">Best-in-class health materials & finishes.</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-[#fafbfc] border border-slate-100 rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-[#007b9e]/10 group-hover:text-[#00617d]">
                <Sparkles className="w-8 h-8 text-[#007b9e]" />
              </div>
              <h4 className="font-bold text-[#0f2e4f] text-xs uppercase tracking-wider mb-1 px-1 font-sans">Affordable Luxury</h4>
              <p className="text-slate-500 text-[11px]">High-end support feel, honest direct price.</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-[#fafbfc] border border-slate-100 rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-[#007b9e]/10 group-hover:text-[#00617d]">
                <Clock className="w-8 h-8 text-[#007b9e]" />
              </div>
              <h4 className="font-bold text-[#0f2e4f] text-xs uppercase tracking-wider mb-1 px-1 font-sans">Trusted Service</h4>
              <p className="text-slate-500 text-[11px]">Experienced expert advice and post-care support.</p>
            </div>

            {/* Feature 5 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-[#fafbfc] border border-slate-100 rounded-full flex items-center justify-center mb-4 transition-all group-hover:bg-[#007b9e]/10 group-hover:text-[#00617d]">
                <Plus className="w-8 h-8 text-[#007b9e]" />
              </div>
              <h4 className="font-bold text-[#0f2e4f] text-xs uppercase tracking-wider mb-1 px-1 font-sans">Wide Comfort Range</h4>
              <p className="text-slate-500 text-[11px]">Endless curated products for spinal alignment.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. INTEGRATED DIAGNOSTIC ADVISOR WIDGET */}
      <SleepQuiz 
        onSelectProduct={(p) => setSelectedProduct(p)} 
        onAddToCart={handleAddToCart} 
      />

      {/* 6. ENHANCED INSPIRED LIVING GALLERY COLLAGE */}
      <section id="gallery" className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="text-[#007b9e] text-xs font-black uppercase tracking-widest block">Aesthetic Layouts</span>
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#0f2e4f] tracking-tight">Inspired Living</h2>
            <p className="text-slate-400 text-xs md:text-sm">Click any design portrait to view real-world fabric materials or bed frame staging recommendations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
            {GALLERY_ITEMS.map((item, idx) => {
              // Create magazine-like collage patterns using custom col-span mappings
              const gridSpans = [
                "md:col-span-8 md:row-span-1", // 1st is wide
                "md:col-span-4 md:row-span-2", // 2nd is tall
                "md:col-span-4 md:row-span-1", // 3rd is balanced
                "md:col-span-4 md:row-span-1"  // 4th is balanced
              ];
              return (
                <motion.div 
                  key={item.id}
                  onClick={() => setZoomImage(item.image)}
                  className={`relative group rounded-xl overflow-hidden cursor-zoom-in shadow-sm border border-slate-100 ${gridSpans[idx]}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-104 select-none"
                  />
                  <div className="absolute inset-0 bg-[#0f2e4f]/35 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span className="text-xs text-amber-300 font-bold block mb-0.5 select-none">{item.category}</span>
                    <h4 className="font-serif text-white font-extrabold text-lg select-none">{item.title}</h4>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIAL FEEDBACK ENGINE */}
      <Reviews />

      {/* 8. CONTACT FORM & SHOWROOM DIGITAL MAPS INTEGRATION */}
      <section id="contact" className="py-24 px-6 md:px-16 bg-[#f1f4f5] border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Get In Touch info column */}
            <div className="space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-[#007b9e] text-xs font-bold uppercase tracking-widest block">Noor E Mall</span>
                <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#0f2e4f] tracking-tight">Get in Touch</h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  Experience our premium orthopedic weight-distribution mattresses firsthand. Visit our Palakkode showroom or send an instant message for support.
                </p>
              </div>

              {/* Physical details blocks */}
              <div className="space-y-4">
                {/* Block 1 */}
                <div className="flex items-center gap-4 p-5 rounded-lg bg-white border border-slate-200/50 shadow-xs">
                  <Phone className="w-6 h-6 text-[#00617d] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#0f2e4f] uppercase tracking-wider">Phone Support</p>
                    <p className="text-xs md:text-sm font-semibold text-slate-600">
                      <a href="tel:+919995081947" className="hover:text-[#007b9e] transition-colors hover:underline">+91 9995081947</a>,{' '}
                      <a href="tel:+918137977542" className="hover:text-[#007b9e] transition-colors hover:underline">+91 8137977542</a>
                    </p>
                  </div>
                </div>

                {/* Block 2 */}
                <div className="flex items-center gap-4 p-5 rounded-lg bg-white border border-slate-200/50 shadow-xs">
                  <MapPin className="w-6 h-6 text-[#00617d] shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#0f2e4f] uppercase tracking-wider">Palakkode Showroom Address</p>
                    <p className="text-xs md:text-sm font-semibold text-slate-600">{SHOWROOM_INFO.address}</p>
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=Noor+E+Mall+Palakkode+Kerala"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007b9e] font-bold hover:underline text-[11px] uppercase tracking-wider mt-1.5 inline-flex items-center gap-1 hover:text-[#00617d]"
                    >
                      <span>Search Route / Navigate there</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Direct quick action WhatsApp linkage */}
                <a 
                  href={`https://wa.me/${SHOWROOM_INFO.whatsapp}?text=Hi%20Sleep%20Studio!%20I%20am%20enquiring%20about%20your%20premium%20orthopedic%20mattresses.`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white py-3.5 px-8 rounded-lg font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-97 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  Chat on WhatsApp Now
                </a>
              </div>
            </div>

            {/* Interactive Enquiries mail composer */}
            <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-6 md:p-10 text-[#181c1d]">
              <h3 className="font-serif text-xl font-extrabold text-[#0f2e4f] mb-6 pb-2 border-b border-slate-100">
                Send Showroom Inquiry
              </h3>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#0f2e4f]">Mesage Dispatched Successfully</h4>
                    <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                      Thank you for contacting The Sleep Studio. Our Authorized ZAARA specialist will reach out to you within 2-4 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Name *</label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Ramesh V." 
                        className="w-full px-4 py-2.5 bg-[#f1f4f5] border border-transparent rounded-lg text-xs focus:outline-none focus:bg-white focus:border-[#007b9e]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">WhatsApp or Phone *</label>
                      <input 
                        type="tel" 
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="e.g. +91 9995081947" 
                        className="w-full px-4 py-2.5 bg-[#f1f4f5] border border-transparent rounded-lg text-xs focus:outline-none focus:bg-white focus:border-[#007b9e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email (Optional)</label>
                    <input 
                      type="email" 
                      value={contactForm.email || ''}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. name@example.com" 
                      className="w-full px-4 py-2.5 bg-[#f1f4f5] border border-transparent rounded-lg text-xs focus:outline-none focus:bg-white focus:border-[#007b9e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Subject Matter</label>
                    <select 
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#f1f4f5] border border-transparent rounded-lg text-xs focus:outline-none focus:bg-white focus:border-[#007b9e]"
                    >
                      <option>General Bedding Enquiry</option>
                      <option>ZAARA Ortho Mattress customized sizing</option>
                      <option>Rugs & Blankets wholesale price lists</option>
                      <option>Express Delivery scheduling in Kerala</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your inquiry details *</label>
                    <textarea 
                      required
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Type details about your bed size frame, thickness preferences, or address queries..."
                      className="w-full px-4 py-2.5 bg-[#f1f4f5] border border-transparent rounded-lg text-xs focus:outline-none focus:bg-white focus:border-[#007b9e] resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#0f2e4f] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#1a4470] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Interactive Responsive Digital Google Maps container and Google Search/Maps Card */}
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-xl overflow-hidden shadow-md border border-slate-200/75 h-[320px] bg-white relative">
              <iframe 
                title="Google Maps Location for Sleep Studio in Noor E Mall, Palakkode, Kerala"
                src="https://maps.google.com/maps?q=Noor%20E%20Mall%20Palakkode%20Kerala&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0}
                marginWidth={0}
                className="grayscale-[10%] select-none active:pointer-events-auto"
              />
            </div>

            {/* Google Business Profile Information & Direct Search Card for Cross-Device Syncing */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm space-y-4 text-[#181c1d]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="bg-[#007b9e]/10 p-2 rounded-lg text-[#007b9e]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#0f2e4f]">
                      Sleep Studio Google Verification
                    </h4>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold flex items-center gap-1">
                      <span>Verified Google Business Profile</span>
                      <span className="text-emerald-500 font-black">● Live</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full text-amber-600 font-bold text-[11px]">
                  <span>5.0</span>
                  <div className="flex text-amber-500">
                    <Star className="w-3 h-3 fill-current text-amber-500" />
                    <Star className="w-3 h-3 fill-current text-amber-500" />
                    <Star className="w-3 h-3 fill-current text-amber-500" />
                    <Star className="w-3 h-3 fill-current text-amber-500" />
                    <Star className="w-3 h-3 fill-current text-amber-500" />
                  </div>
                  <span className="text-slate-400 font-normal text-[10px] ml-0.5">(Google-Sourced Ratings)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Device Search Instructions</p>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    To access immediately on another tablet, PC, or phone, search <strong className="text-[#0f2e4f]">"Sleep Studio Palakkode"</strong> directly into Google Search or Maps.
                  </p>
                  <button
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText("Sleep Studio Palakkode");
                        setAlertMsg("Search query 'Sleep Studio Palakkode' copied to clipboard! Paste it directly on Google Maps or Search.");
                        setTimeout(() => setAlertMsg(null), 4000);
                      } catch {
                        // fallback
                      }
                    }}
                    className="mt-1 text-[10px] uppercase font-bold tracking-widest text-[#007b9e] hover:text-[#00617d] transition-colors underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Copy Search Query</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">Instant Route Navigation</p>
                  <p className="text-[#181c1d] leading-relaxed text-xs font-semibold">
                    📍 Located at Noor E Mall, near Petrol Pump, Palakkode, Kerala 670305
                  </p>
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Noor+E+Mall+Palakkode+Kerala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#007b9e] hover:text-[#00617d] transition-colors font-bold underline"
                  >
                    <span>Fetch Live GPS Directions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-white border-t border-slate-200 text-[#181c1d] py-16 px-6 md:px-16 text-xs font-medium">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-black text-[#00617d]">The Sleep Studio</h3>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
              Premium Authorized ZAARA Dealer offering world-certified orthopaedic mattresses, custom contour pillows, and aesthetic home textiles.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-slate-800 font-extrabold uppercase tracking-wider text-xs">Explore</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleScrollToSection('home')} className="hover:text-[#007b9e] transition-colors text-left text-slate-400 cursor-pointer">Home</button>
              <button onClick={() => handleScrollToSection('about')} className="hover:text-[#007b9e] transition-colors text-left text-slate-400 cursor-pointer">About Showroom</button>
              <button onClick={() => handleScrollToSection('products')} className="hover:text-[#007b9e] transition-colors text-left text-slate-400 cursor-pointer">Collections</button>
              <button onClick={() => handleScrollToSection('gallery')} className="hover:text-[#007b9e] transition-colors text-left text-slate-400 cursor-pointer">Inspired Staging</button>
              <button onClick={() => handleScrollToSection('quiz')} className="hover:text-[#007b9e] transition-colors text-left text-slate-400 cursor-pointer font-bold text-[#007b9e]">Sleep Quiz</button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-slate-800 font-extrabold uppercase tracking-wider text-xs font-sans">Showroom Details</h4>
            <div className="flex flex-col gap-2 text-slate-400 leading-relaxed">
              <p>📍 {SHOWROOM_INFO.address}</p>
              <p>🕒 {SHOWROOM_INFO.openingHours}</p>
              <p>✉️ {SHOWROOM_INFO.email}</p>
            </div>
          </div>

          <div className="space-y-3 col-span-1">
            <h4 className="text-slate-800 font-extrabold uppercase tracking-wider text-xs font-sans">Quality Assurance</h4>
            <div className="flex flex-col gap-2 text-slate-400 leading-relaxed">
              <p className="flex items-center gap-1">
                <Check className="w-4 h-4 text-[#00617d]" />
                <span>Certified Spinal Alignment</span>
              </p>
              <p className="flex items-center gap-1">
                <Check className="w-4 h-4 text-[#00617d]" />
                <span>Anti-Dust Mite Technology</span>
              </p>
              <p className="text-xs font-bold text-slate-500 pt-1 border-t border-slate-100">
                © {new Date().getFullYear()} The Sleep Studio. All Rights Reserved.
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* 10. FLOATING WHATSAPP CHAT ASSISTANCE WIDGET */}
      <a 
        href={`https://wa.me/${SHOWROOM_INFO.whatsapp}?text=Hi%20Sleep%20Studio!%20I%20am%20interested%20in%20your%20premium%20mattresses%20for%20my%20home%20in%20Palakkode.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center cloud-shadow hover:scale-110 active:scale-95 transition-all group"
        title="Chat live with certified dealer on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-white text-[#25D366] shrink-0" />
      </a>

      {/* 10b. INSTANT MOBILE CONNECTOR (QR CODE FLOATING BUTTON) */}
      <button 
        onClick={() => setIsQrOpen(true)}
        className="fixed bottom-8 left-8 z-[100] bg-[#00617d] text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-xs uppercase tracking-wider"
        title="Scan QR Code to open on your phone directly"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>Open on Mobile</span>
      </button>

      {/* 10c. QR CODE POPUP MODAL OVERLAY */}
      {isQrOpen && (
        <div className="fixed inset-0 z-[140] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full border border-slate-200/80 shadow-2xl relative text-center space-y-6">
            <button 
              onClick={() => setIsQrOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-2 text-[#181c1d]">
              <span className="text-[#007b9e] text-[10px] font-black uppercase tracking-widest bg-[#f0f9ff] px-2.5 py-1 rounded-md inline-block border border-cyan-100">
                Cross-Device Sync
              </span>
              <h3 className="font-serif text-xl font-bold text-[#0f2e4f]">
                Open on Another Device
              </h3>
              <p className="text-slate-500 text-xs">
                Scan this interactive QR Code using your phone camera or QR reader to access the live Sleep Studio immediately on your other device.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`}
                alt="Scan this barcode to visit Sleep Studio"
                className="w-48 h-48 rounded shadow border border-slate-100 bg-white"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={handleCopyLink}
                className="w-full py-2.5 bg-[#0f2e4f] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1a4470] rounded-lg transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isCopied ? "Link Copied!" : "Copy Live Link"}</span>
              </button>
              
              <button 
                onClick={() => setIsQrOpen(false)}
                className="w-full py-2 text-slate-500 hover:text-slate-700 font-bold uppercase tracking-wider text-xs border border-transparent hover:border-slate-100 rounded-lg transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. DETAILED CONFIGURATION MODAL OVERLAY */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 12. CART SIDEBAR OVERLAY */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* 13. IMAGE ZOOM FULLSCREEN MODAL */}
      {zoomImage && (
        <div 
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs cursor-zoom-out animate-fade-in"
        >
          <button 
            onClick={() => setZoomImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 font-bold"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={zoomImage} 
            alt="Inspired bedroom design close-up preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg border border-slate-800 animate-zoom-in"
          />
        </div>
      )}

    </div>
  );
}
