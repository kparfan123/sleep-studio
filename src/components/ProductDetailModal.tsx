import React, { useState } from 'react';
import { X, Check, Star, ShoppingBag, MessageCircle } from 'lucide-react';
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
            <div className="mt-6 w-full bg-[#f1f4f5] p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider mb-2">Technical Specs</h4>
              <dl className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col border-b border-slate-200/50 pb-1.5">
                    <dt className="text-slate-400 font-medium">{key}</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{value}</dd>
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
