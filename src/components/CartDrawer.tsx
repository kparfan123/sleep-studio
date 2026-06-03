import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, MessageSquare, Truck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { SHOWROOM_INFO } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (idx: number, change: number) => void;
  onRemoveItem: (idx: number) => void;
}

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let itemsText = cart.map((item, idx) => {
      const sizeText = `Size: ${item.selectedSize}`;
      const thicknessText = item.selectedThickness ? `, Thickness: ${item.selectedThickness}` : '';
      return `${idx + 1}. *${item.product.title}*\n   - ${sizeText}${thicknessText}\n   - Qty: ${item.quantity}\n   - Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`;
    }).join('\n\n');

    const message = encodeURIComponent(
      `Hello *The Sleep Studio (Palakkode)*!\n\nI want to place/enquire an order for the following premium sleep products:\n\n${itemsText}\n\n*Estimated Total*: ₹${subtotal.toLocaleString('en-IN')}\n\n- Customer Name: \n- Delivery Address (Kerala): \n- Preferred Delivery Date:\n\nPlease confirm availability and payment setup. Thanks!`
    );

    window.open(`https://wa.me/${SHOWROOM_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-110 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in text-[#181c1d]">
      {/* Backdrop Close Click area */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-md bg-[#fafbfc] h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Cart Drawer Header */}
        <div className="p-6 border-b border-slate-200 bg-white flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#00617d]" />
            <h3 className="font-serif text-xl font-bold text-[#0f2e4f]">Your Bedcart</h3>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-bold">
              {cart.length} unique
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          <div className="flex items-center gap-3 bg-[#eaf7fb] p-3 rounded-lg border border-cyan-100 text-xs">
            <Truck className="w-5 h-5 text-[#007b9e] shrink-0" />
            <div>
              <span className="font-bold text-[#00617d]">Authorized Free Home Delivery!</span>
              <p className="text-slate-500 mt-0.5">Complimentary express shipping and direct setup across all regions of Palakkode.</p>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-slate-700">Your bedcart is empty</p>
                <p className="text-sm text-slate-400 mt-1 max-w-[250px] mx-auto">Explore our high-fidelity premium mattresses to find your absolute comfort.</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 text-xs font-bold text-[#00617d] uppercase tracking-wider hover:underline"
              >
                Go back to collections
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div 
                  key={`${item.product.id}-${idx}`}
                  className="flex gap-4 p-4 bg-white rounded-lg border border-slate-200/85 hover:border-slate-300 transition-all shadow-sm"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.title} 
                    className="w-16 h-16 object-contain rounded bg-slate-50 border border-slate-100 p-1 shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-sm text-[#0f2e4f] truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Size: {item.selectedSize}
                        {item.selectedThickness && ` • ${item.selectedThickness}`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(idx, -1)}
                          className="px-1.5 py-1 text-slate-500 hover:bg-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-700 select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, 1)}
                          className="px-1.5 py-1 text-slate-500 hover:bg-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#00617d]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout panel */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-slate-200 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
              <span className="text-slate-500">Shipping (Palakkode Region)</span>
              <span className="font-bold text-emerald-600 uppercase tracking-wider text-[11px] bg-emerald-50 px-2 py-0.5 rounded">
                Free Express
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg font-bold text-[#0f2e4f]">Total Estimate</span>
              <span className="text-2xl font-extrabold text-[#00617d]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-6 rounded-lg font-bold bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-98 transition-all flex items-center justify-center gap-2 group shadow-md"
            >
              <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Checkout Order via WhatsApp</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <span className="text-[10px] text-slate-400 block text-center">
              Clicking will prepare a WhatsApp summary to complete customized bedding setups directly with us.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
