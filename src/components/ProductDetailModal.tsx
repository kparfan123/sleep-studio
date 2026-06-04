import React, { useState } from 'react';
import { X, Check, Star, ShoppingBag, MessageCircle, Printer } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "Standard");
  const [selectedThickness, setSelectedThickness] = useState<string>(
    product.thicknesses ? product.thicknesses[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedMessage, setAddedMessage] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart({
      product,
      quantity,
      selectedSize,
      selectedThickness: selectedThickness || undefined
    });
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1500);
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hi Sleep Studio, I am interested in your "${product.title}"\n- Category: ${product.category}\n- Size: ${selectedSize}${selectedThickness ? `\n- Thickness: ${selectedThickness}` : ''}\n- Quantity: ${quantity}\nCould you please share the current price options & availability for Palakkode? Thank you!`
    );
    window.open(`https://wa.me/919995081947?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    // 1. Create temporary CSS and HTML print viewport elements
    const printEl = document.createElement('div');
    printEl.id = 'print-section';
    printEl.style.position = 'fixed';
    printEl.style.left = '0';
    printEl.style.top = '0';
    printEl.style.width = '100vw';
    printEl.style.height = '100vh';
    printEl.style.zIndex = '999999';
    printEl.style.backgroundColor = '#ffffff';
    printEl.style.color = '#0b1329';
    printEl.style.padding = '40px';
    printEl.style.boxSizing = 'border-box';
    printEl.style.overflowY = 'auto';

    const specsHtml = Object.entries(product.specs)
      .map(([key, value]) => `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding: 6px 0; font-size: 13px; font-family: sans-serif;">
          <strong style="color: #475569;">${key}:</strong>
          <span style="color: #0f2e4f; font-weight: 600;">${value}</span>
        </div>
      `).join('');

    const featuresHtml = product.features
      .map(feat => `<li style="margin-bottom: 6px; font-size: 13px; color: #334155; font-family: sans-serif;">${feat}</li>`)
      .join('');

    printEl.innerHTML = `
      <div style="font-family: Georgia, serif; max-width: 800px; margin: 0 auto; line-height: 1.5; color: #1e293b;">
        <div style="border-bottom: 3px solid #00617d; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <h1 style="color: #00617d; font-size: 28px; font-weight: 800; margin: 0;">The Sleep Studio</h1>
            <p style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 2px; margin: 4px 0 0 0; font-family: sans-serif;">Palakkode • ZAARA Authorized Dealer</p>
          </div>
          <div style="text-align: right; font-family: sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px;">
            Premium Product Datasheet
          </div>
        </div>

        <div style="display: grid; grid-template-cols: 1.2fr 0.8fr; gap: 30px; margin-bottom: 25px;">
          <div>
            <span style="font-size: 11px; font-weight: 800; color: #007b9e; text-transform: uppercase; tracking: 1px; font-family: sans-serif;">${product.category}</span>
            <h2 style="font-size: 24px; color: #0f2e4f; font-weight: 700; margin: 5px 0 15px 0; line-height: 1.2;">${product.title}</h2>
            <p style="font-size: 13px; color: #475569; margin-bottom: 20px; font-family: sans-serif; text-align: justify;">${product.description}</p>
            
            <h4 style="font-size: 12px; font-weight: 700; color: #0f2e4f; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px; font-family: sans-serif;">Core Features</h4>
            <ul style="padding-left: 20px; margin: 0; list-style-type: square;">
              ${featuresHtml}
            </ul>
          </div>

          <div>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
              <h4 style="font-size: 12px; font-weight: 700; color: #0f2e4f; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; font-family: sans-serif; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">Technical Specifications</h4>
              <div style="display: flex; flex-direction: column; gap: 2px;">
                ${specsHtml}
              </div>
              <div style="margin-top: 15px; padding-top: 12px; border-top: 1px dashed #cbd5e1; font-family: sans-serif; font-size: 14px; font-weight: 700; color: #00617d; display: flex; justify-content: space-between;">
                <span>Typical M.R.P:</span>
                <span>₹${product.price.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid #e2e8f0; margin-top: 35px; padding-top: 15px; text-align: center; font-family: sans-serif; font-size: 10px; color: #64748b; line-height: 1.5;">
          <p style="margin: 0 0 4px 0;"><strong>The Sleep Studio Showroom Address:</strong> Noor E Mall, near Petrol Pump, Palakkode, Kerala</p>
          <p style="margin: 0 0 4px 0;">For custom requests, phone ordering or size consultations, feel free to contact us at <strong>+91 9995081947</strong>.</p>
          <p style="margin: 0;">© ${new Date().getFullYear()} The Sleep Studio. All ZAARA products are covered under official authorized manufacturer warranty.</p>
        </div>
      </div>
    `;

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @media print {
        body > *:not(#print-section) {
          display: none !important;
        }
        #print-section {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          height: auto !important;
          padding: 0 !important;
          overflow: visible !important;
        }
      }
    `;

    document.body.appendChild(printEl);
    document.head.appendChild(styleEl);

    // Call window.print inside a brief timeout so layout has finished parsing
    setTimeout(() => {
      window.print();
      // Remove temporary items immediately after printing dialogue closes
      setTimeout(() => {
        if (document.body.contains(printEl)) {
          document.body.removeChild(printEl);
        }
        if (document.head.contains(styleEl)) {
          document.head.removeChild(styleEl);
        }
      }, 500);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#fafbfc] rounded-xl shadow-2xl border border-slate-200 text-[#181c1d]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Gallery view */}
          <div className="relative p-6 bg-white flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-200">
            {product.isZaaraAuthorized && (
              <span className="absolute top-6 left-6 bg-[#00617d] text-white text-xs tracking-wider uppercase px-4 py-1.5 font-semibold rounded-full shadow-sm">
                Authorized ZAARA Dealer
              </span>
            )}
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full max-h-[350px] object-contain rounded-lg hover:scale-102 transition-transform duration-300"
            />
            <div className="mt-6 w-full bg-[#f1f4f5] dark:bg-slate-800/40 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2 border-b border-slate-200/50 pb-2">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider">Technical Specs</h4>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#007b9e] hover:text-[#00617d] dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Print product specifications sheet"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Specs
                </button>
              </div>
              <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col border-b border-slate-200/55 pb-1.5">
                    <dt className="text-slate-400 font-medium">{key}</dt>
                    <dd className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Product Actions & Copy */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-[#007b9e] text-xs font-bold uppercase tracking-widest block mb-1">
                {product.category}
              </span>
              <h3 className="font-serif text-3xl font-bold tracking-tight text-[#0f2e4f] mb-3 leading-tight">
                {product.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-semibold text-slate-500">(5.0 Rating based on Kerala families)</span>
              </div>

              <div className="text-2xl font-bold text-[#00617d] mb-4">
                ₹{product.price.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-400 block mt-0.5">Inclusive of all local taxes. Free delivery in Palakkode.</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest mb-2">
                  Select Dimension Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs rounded-lg font-medium border transition-all ${
                        selectedSize === size
                          ? 'bg-[#007b9e] text-white border-transparent shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thickness Selector if applicable */}
              {product.thicknesses && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest mb-2">
                    Select Thickness Depth
                  </label>
                  <div className="flex gap-2">
                    {product.thicknesses.map((thick) => (
                      <button
                        key={thick}
                        onClick={() => setSelectedThickness(thick)}
                        className={`px-4 py-2 text-xs rounded-lg font-medium border transition-all ${
                          selectedThickness === thick
                            ? 'bg-[#007b9e] text-white border-transparent shadow-sm'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {thick}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bullet Features */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-2">Highlights</h4>
                <ul className="text-xs space-y-1.5 text-slate-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="bg-emerald-100 text-emerald-800 rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity and Checkout Controls */}
            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold text-sm text-slate-800 w-11 text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Price Estimate</span>
                  <span className="text-xl font-bold text-[#00617d]">
                    ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  disabled={addedMessage}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-sm transition-all ${
                    addedMessage 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#0f2e4f] text-white hover:bg-[#1a4470] active:scale-98'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {addedMessage ? "Added Successfully!" : "Add To Bedcart"}
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#25D366] text-white rounded-lg font-bold text-sm hover:bg-[#20ba59] active:scale-98 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  Discuss on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
