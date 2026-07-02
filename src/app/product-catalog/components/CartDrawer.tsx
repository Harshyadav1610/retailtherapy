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
  const shipping = subtotal > 0 ? (subtotal > 150 ? 0 : 12) : 0;
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
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md flex flex-col transition-transform duration-400 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--background)', borderLeft: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b flex-shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          <div>
            <p className="tracking-editorial" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
              {checkoutStep === 'checkout' ? 'Checkout' : 'Your Bag'}
            </p>
            {checkoutStep === 'cart' && cart.length > 0 && (
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>
          <button
            onClick={() => { onClose(); setCheckoutStep('cart'); }}
            className="p-2 transition-all duration-150 hover:opacity-60"
          >
            <Icon name="XMarkIcon" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
                  <div
                    className="w-16 h-16 flex items-center justify-center"
                    style={{ background: 'var(--muted)' }}
                  >
                    <Icon name="ShoppingBagIcon" size={24} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)', fontStyle: 'italic', fontWeight: 300 }}>
                      Your bag is empty
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                      Discover our latest collection and add pieces you love.
                    </p>
                  </div>
                  <button onClick={onClose} className="btn-primary text-xs">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-6 flex flex-col gap-0 divide-y" style={{ borderColor: 'var(--border)' }}>
                  {cart.map((item) => (
                    <div
                      key={`cart-item-${item.product.id}`}
                      className="flex gap-4 py-5"
                    >
                      <div
                        className="w-20 h-24 overflow-hidden flex-shrink-0"
                        style={{ background: 'var(--muted)' }}
                      >
                        <AppImage
                          src={item.product.image}
                          alt={`${item.product.title} — cart item`}
                          width={80}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="tracking-editorial mb-0.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.55rem' }}>
                          {item.product.brand}
                        </p>
                        <p className="text-sm font-light mb-3" style={{ color: 'var(--foreground)' }}>
                          {item.product.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center transition-all duration-150 hover:opacity-60"
                              style={{ border: '1px solid var(--border)' }}
                            >
                              <Icon name="MinusIcon" size={10} className="text-muted-foreground" />
                            </button>
                            <span className="text-xs font-medium w-5 text-center font-mono-nums" style={{ color: 'var(--foreground)' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center transition-all duration-150 hover:opacity-60"
                              style={{ border: '1px solid var(--border)' }}
                            >
                              <Icon name="PlusIcon" size={10} className="text-muted-foreground" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm price-tag" style={{ color: 'var(--foreground)' }}>
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="transition-all duration-150 hover:opacity-60"
                            >
                              <Icon name="TrashIcon" size={12} className="text-muted-foreground" />
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
                className="w-16 h-16 flex items-center justify-center pulse-soft"
                style={{ background: 'var(--muted)' }}
              >
                <Icon name="ShoppingBagIcon" size={24} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--foreground)', fontStyle: 'italic', fontWeight: 300 }}>
                  Processing...
                </h3>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
                  Preparing your order
                </p>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={`placing-dot-${i}`}
                    className="w-1.5 h-1.5 pulse-soft"
                    style={{ background: 'var(--foreground)', animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && checkoutStep !== 'placing' && (
          <div
            className="p-6 border-t flex-shrink-0"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Totals */}
            <div className="flex flex-col gap-2 mb-5">
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>Subtotal</span>
                <span className="text-xs price-tag" style={{ color: 'var(--foreground)' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>Shipping</span>
                <span className="text-xs" style={{ color: shipping === 0 ? 'var(--success)' : 'var(--foreground)' }}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>Tax</span>
                <span className="text-xs price-tag" style={{ color: 'var(--foreground)' }}>${tax.toFixed(2)}</span>
              </div>
              <div
                className="flex justify-between pt-3 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Total</span>
                <span className="text-sm font-medium price-tag" style={{ color: 'var(--foreground)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* CTA */}
            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="btn-primary w-full justify-center py-4"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={handlePlaceOrder}
                  className="btn-primary w-full justify-center py-4"
                >
                  Place Order — ${total.toFixed(2)}
                </button>
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="btn-outline w-full justify-center py-3"
                >
                  Back to Bag
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {completedOrder && (
        <OrderSuccessModal
          open={showSuccess}
          order={completedOrder}
          onClose={() => { setShowSuccess(false); setCompletedOrder(null); }}
        />
      )}
    </>
  );
}

function CheckoutForm() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <p className="tracking-editorial mb-4" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
          Delivery
        </p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>First Name</label>
              <input type="text" className="input-field py-2.5 text-xs" placeholder="Sofia" style={{ borderRadius: '0' }} />
            </div>
            <div>
              <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>Last Name</label>
              <input type="text" className="input-field py-2.5 text-xs" placeholder="Marchetti" style={{ borderRadius: '0' }} />
            </div>
          </div>
          <div>
            <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>Email</label>
            <input type="email" className="input-field py-2.5 text-xs" placeholder="sofia@example.com" style={{ borderRadius: '0' }} />
          </div>
          <div>
            <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>Address</label>
            <input type="text" className="input-field py-2.5 text-xs" placeholder="123 Fashion Street" style={{ borderRadius: '0' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>City</label>
              <input type="text" className="input-field py-2.5 text-xs" placeholder="Milan" style={{ borderRadius: '0' }} />
            </div>
            <div>
              <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>Postal Code</label>
              <input type="text" className="input-field py-2.5 text-xs" placeholder="20121" style={{ borderRadius: '0' }} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="tracking-editorial mb-4" style={{ color: 'var(--muted-foreground)', fontSize: '0.65rem' }}>
          Payment
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>Card Number</label>
            <input type="text" className="input-field py-2.5 text-xs" placeholder="4242 4242 4242 4242" style={{ borderRadius: '0' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>Expiry</label>
              <input type="text" className="input-field py-2.5 text-xs" placeholder="MM / YY" style={{ borderRadius: '0' }} />
            </div>
            <div>
              <label className="tracking-editorial block mb-1.5" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>CVV</label>
              <input type="text" className="input-field py-2.5 text-xs" placeholder="123" style={{ borderRadius: '0' }} />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)', fontWeight: 300 }}>
        This is a simulated checkout. No real payment is processed.
      </p>
    </div>
  );
}