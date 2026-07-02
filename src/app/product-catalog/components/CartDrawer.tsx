'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useStore } from '@/lib/store';
import OrderSuccessModal from './OrderSuccessModal';
import type { FakeOrder } from '@/lib/store';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const getCartTotal = useStore((s) => s.getCartTotal);
  const placeOrder = useStore((s) => s.placeOrder);

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'placing'>('cart');
  const [completedOrder, setCompletedOrder] = useState<FakeOrder | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setCheckoutStep('placing');
    setTimeout(() => {
      const order = placeOrder(cart);
      setCompletedOrder(order);
      setCheckoutStep('cart');
      setShowSuccess(true);
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--card)', borderLeft: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2">
            <Icon name="ShoppingCartIcon" size={20} style={{ color: 'var(--accent)' } as React.CSSProperties} />
            <span className="font-bold text-base" style={{ color: 'var(--foreground)' }}>
              {checkoutStep === 'checkout' ? 'Checkout' : `Your Cart (${cart.length})`}
            </span>
          </div>
          <button
            onClick={() => { onClose(); setCheckoutStep('cart'); }}
            className="p-2 rounded-xl hover:bg-muted transition-all duration-150"
          >
            <Icon name="XMarkIcon" size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{ background: 'var(--muted)' }}
                  >
                    <Icon name="ShoppingCartIcon" size={36} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--foreground)' }}>
                      Your cart is empty
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Browse our catalog and add products you love — for free.
                    </p>
                  </div>
                  <button onClick={onClose} className="btn-accent text-sm">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-4 flex flex-col gap-3">
                  {cart.map((item) => (
                    <div
                      key={`cart-item-${item.product.id}`}
                      className="flex gap-3 p-3 rounded-2xl transition-all duration-150"
                      style={{ background: 'var(--muted)' }}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--border)' }}>
                        <AppImage
                          src={item.product.image}
                          alt={`${item.product.title} — cart item`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" style={{ color: 'var(--muted-foreground)' }}>
                          {item.product.brand}
                        </p>
                        <p className="text-sm font-semibold truncate mb-2" style={{ color: 'var(--foreground)' }}>
                          {item.product.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-border"
                              style={{ background: 'var(--card)' }}
                            >
                              <Icon name="MinusIcon" size={12} className="text-muted-foreground" />
                            </button>
                            <span className="text-sm font-bold w-6 text-center font-mono-nums" style={{ color: 'var(--foreground)' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-border"
                              style={{ background: 'var(--card)' }}
                            >
                              <Icon name="PlusIcon" size={12} className="text-muted-foreground" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold price-tag" style={{ color: 'var(--foreground)' }}>
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 rounded-lg transition-all duration-150 hover:bg-danger/10"
                            >
                              <Icon name="TrashIcon" size={13} style={{ color: 'var(--danger)' } as React.CSSProperties} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <CheckoutForm />
          )}

          {checkoutStep === 'placing' && (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center pulse-soft"
                style={{ background: 'rgba(232,168,124,0.15)' }}
              >
                <Icon name="ShoppingBagIcon" size={36} style={{ color: 'var(--accent)' } as React.CSSProperties} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--foreground)' }}>
                  Placing your order...
                </h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Preparing your fake tracking number ✨
                </p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={`placing-dot-${i}`}
                    className="w-2 h-2 rounded-full pulse-soft"
                    style={{ background: 'var(--accent)', animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && checkoutStep !== 'placing' && (
          <div
            className="p-5 border-t flex-shrink-0"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Totals */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--muted-foreground)' }}>Subtotal</span>
                <span className="font-semibold font-mono-nums" style={{ color: 'var(--foreground)' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--muted-foreground)' }}>Shipping</span>
                <span className="font-semibold" style={{ color: shipping === 0 ? 'var(--success)' : 'var(--foreground)' }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--muted-foreground)' }}>Tax (8%)</span>
                <span className="font-semibold font-mono-nums" style={{ color: 'var(--foreground)' }}>${tax.toFixed(2)}</span>
              </div>
              <div
                className="flex justify-between pt-2 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-bold" style={{ color: 'var(--foreground)' }}>Total</span>
                <span className="font-extrabold text-lg font-mono-nums" style={{ color: 'var(--foreground)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* CTA */}
            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="btn-primary w-full justify-center text-sm py-3.5"
              >
                <Icon name="LockClosedIcon" size={15} />
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handlePlaceOrder}
                  className="btn-accent w-full justify-center text-sm py-3.5"
                >
                  <Icon name="SparklesIcon" size={15} />
                  Place Fake Order — Save ${total.toFixed(2)}
                </button>
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="btn-outline w-full justify-center text-sm py-2.5"
                >
                  Back to Cart
                </button>
              </div>
            )}

            <p className="text-center text-xs mt-3" style={{ color: 'var(--muted-foreground)' }}>
              <Icon name="ShieldCheckIcon" size={11} className="inline mr-1" />
              No real payment. Your wallet is safe.
            </p>
          </div>
        )}
      </div>

      {/* Success modal */}
      {showSuccess && completedOrder && (
        <OrderSuccessModal
          order={completedOrder}
          onClose={() => { setShowSuccess(false); setCompletedOrder(null); }}
        />
      )}
    </>
  );
}

function CheckoutForm() {
  return (
    <div className="p-5 flex flex-col gap-6">
      {/* Shipping */}
      <div>
        <h4 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <Icon name="MapPinIcon" size={16} style={{ color: 'var(--accent)' } as React.CSSProperties} />
          Shipping Address
        </h4>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>First Name</label>
              <input type="text" defaultValue="Sofia" className="input-field py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Last Name</label>
              <input type="text" defaultValue="Marchetti" className="input-field py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Address</label>
            <input type="text" defaultValue="123 Maple Street, Apt 4B" className="input-field py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>City</label>
              <input type="text" defaultValue="San Francisco" className="input-field py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>ZIP</label>
              <input type="text" defaultValue="94105" className="input-field py-2 text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div>
        <h4 className="font-bold text-sm mb-1 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
          <Icon name="CreditCardIcon" size={16} style={{ color: 'var(--accent)' } as React.CSSProperties} />
          Payment Method
        </h4>
        <p className="text-xs mb-4" style={{ color: 'var(--muted-foreground)' }}>
          This is a simulation. No real payment will be processed.
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Card Number</label>
            <input type="text" defaultValue="4242 4242 4242 4242" className="input-field py-2 text-sm font-mono-nums" maxLength={19} />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Cardholder Name</label>
            <input type="text" defaultValue="Sofia Marchetti" className="input-field py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>Expiry</label>
              <input type="text" defaultValue="12/28" className="input-field py-2 text-sm font-mono-nums" maxLength={5} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--muted-foreground)' }}>CVV</label>
              <input type="text" defaultValue="•••" className="input-field py-2 text-sm font-mono-nums" maxLength={4} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex items-start gap-3 p-3 rounded-xl"
        style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
      >
        <Icon name="ShieldCheckIcon" size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 1 } as React.CSSProperties} />
        <p className="text-xs leading-relaxed" style={{ color: 'var(--success)' }}>
          <strong>100% Safe.</strong> This form is purely decorative. No payment gateway is connected. Your card details go nowhere.
        </p>
      </div>
    </div>
  );
}