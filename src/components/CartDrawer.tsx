import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    setActiveView
  } = useShop();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState('Helena Vance');
  const [customerEmail, setCustomerEmail] = useState('helena.vance@example.com');
  const [customerAddress, setCustomerAddress] = useState('742 Evergreen Terrace, New York, NY 10001');

  if (!isCartOpen) return null;

  const shippingCost = cartSubtotal >= 150 || cartSubtotal === 0 ? 0 : 15;
  const grandTotal = cartSubtotal + shippingCost;
  const amountToFreeShipping = Math.max(0, 150 - cartSubtotal);

  const handlePlaceDemoOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  const handleCompleteOrder = () => {
    setOrderConfirmed(false);
    setIsCheckoutOpen(false);
    clearCart();
    setIsCartOpen(false);
    setActiveView('home');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end bg-[#291F1C]/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-[#F6F1E9] border-l border-[#D8CBBE] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#D8CBBE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#54212D]" />
              <h2 className="font-serif text-2xl text-[#291F1C]">Your Shopping Bag</h2>
              <span className="text-xs font-mono text-[#54212D] tabular-nums">
                ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close Shopping Bag"
              className="p-2 text-[#291F1C]/70 hover:text-[#54212D] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-6 py-2.5 bg-[#EFE9DF] border-b border-[#D8CBBE] text-xs">
            {amountToFreeShipping === 0 ? (
              <span className="text-[#54212D] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#54212D]" />
                <span>You have unlocked complimentary tracked shipping</span>
              </span>
            ) : (
              <span className="text-[#291F1C]/80">
                Add <strong className="font-mono text-[#54212D] tabular-nums">${amountToFreeShipping}</strong> more for complimentary tracked delivery
              </span>
            )}
          </div>

          {/* Cart Items Area */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-full border border-dashed border-[#D8CBBE] flex items-center justify-center mx-auto text-[#D8CBBE]">
                  <ShoppingBag className="w-5 h-5 text-[#C7A778]" />
                </div>
                <h3 className="font-serif text-xl text-[#291F1C]">Your Bag is Empty</h3>
                <p className="text-xs text-[#291F1C]/70 max-w-xs mx-auto leading-relaxed">
                  Discover our twentieth creations or curate a bespoke discovery trio.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-6 py-2.5 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-wider font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#EFE9DF]/60 border border-[#D8CBBE] flex gap-4 items-start"
                >
                  <div className="w-16 h-20 bg-[#291F1C]/5 overflow-hidden shrink-0 border border-[#D8CBBE]/60">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-base text-[#291F1C] truncate">{item.name}</h4>
                    <p className="text-[11px] text-[#291F1C]/60 uppercase tracking-wider">{item.size}</p>
                    <p className="font-mono text-xs font-semibold text-[#54212D] tabular-nums mt-1">
                      ${item.price} each
                    </p>

                    {/* Quantity controls */}
                    <div className="pt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-[#D8CBBE] bg-[#F6F1E9] px-2 py-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="text-[#291F1C]/70 hover:text-[#54212D] p-0.5 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-semibold tabular-nums w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="text-[#291F1C]/70 hover:text-[#54212D] p-0.5 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-[#291F1C]/50 hover:text-[#54212D] flex items-center gap-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#D8CBBE] bg-[#EFE9DF]/80 space-y-4">
              <div className="space-y-1.5 text-xs text-[#291F1C]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-sm tabular-nums">${cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tracked Maison Delivery</span>
                  <span className="font-mono tabular-nums">
                    {shippingCost === 0 ? 'Complimentary ($0)' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D8CBBE] text-sm text-[#291F1C] font-semibold">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base tabular-nums">${grandTotal}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#F6F1E9] border border-[#D8CBBE]/60 text-[11px] text-[#291F1C]/75 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A778] shrink-0" />
                <span>Complimentary 2ml Extrait sample included with this order.</span>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-4 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-[#291F1C]/50 text-center uppercase tracking-wider">
                Preview Demonstration Mode · Safe & Secure
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Demo Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#291F1C]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#F6F1E9] border border-[#D8CBBE] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-[#291F1C]/60 hover:text-[#54212D] cursor-pointer"
              aria-label="Close Checkout"
            >
              <X className="w-5 h-5" />
            </button>

            {orderConfirmed ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#54212D]/10 border border-[#54212D] flex items-center justify-center mx-auto text-[#54212D]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#291F1C]">Order Demonstration Confirmed</h3>
                <p className="text-xs font-mono text-[#54212D] tracking-wider uppercase">
                  Receipt #SCENT-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="text-xs text-[#291F1C]/80 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{customerName}</strong>! In this demonstration environment, your mock order has been logged successfully without charging any payment method.
                </p>
                <div className="p-4 bg-[#EFE9DF] border border-[#D8CBBE] text-left text-xs space-y-1">
                  <p><strong>Recipient:</strong> {customerName}</p>
                  <p><strong>Delivery Destination:</strong> {customerAddress}</p>
                  <p><strong>Total:</strong> ${grandTotal} USD</p>
                </div>
                <button
                  onClick={handleCompleteOrder}
                  className="px-8 py-3 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm"
                >
                  Return to ScentStory
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceDemoOrder} className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#54212D] uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Demo Checkout Mode</span>
                  </div>
                  <h3 className="font-serif text-3xl text-[#291F1C]">Shipping & Presentation</h3>
                  <p className="text-xs text-[#291F1C]/70 mt-1">
                    This is an interactive demonstration. No credit card information is collected or required.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="uppercase tracking-wider font-medium text-[#291F1C] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 bg-white/80 border border-[#D8CBBE] text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D]"
                    />
                  </div>

                  <div>
                    <label className="uppercase tracking-wider font-medium text-[#291F1C] block mb-1">
                      Email Address (for Mock Order Tracking)
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full p-2.5 bg-white/80 border border-[#D8CBBE] text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D]"
                    />
                  </div>

                  <div>
                    <label className="uppercase tracking-wider font-medium text-[#291F1C] block mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full p-2.5 bg-white/80 border border-[#D8CBBE] text-xs text-[#291F1C] focus:outline-none focus:border-[#54212D]"
                    />
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 bg-[#EFE9DF] border border-[#D8CBBE] space-y-2 text-xs">
                  <div className="flex justify-between font-medium">
                    <span>Itemized Total ({cart.length} items)</span>
                    <span className="font-mono tabular-nums">${cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#291F1C]/70">
                    <span>Maison Courier Shipping</span>
                    <span className="font-mono tabular-nums">${shippingCost}</span>
                  </div>
                  <div className="flex justify-between font-serif text-base pt-2 border-t border-[#D8CBBE] text-[#291F1C] font-semibold">
                    <span>Total Demo Balance</span>
                    <span className="font-mono tabular-nums">${grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#54212D] text-[#F6F1E9] text-xs uppercase tracking-widest font-medium hover:bg-[#6e2d3b] transition-all cursor-pointer shadow-sm"
                >
                  Confirm Demonstration Order — ${grandTotal}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};
