import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ChevronLeft, ShoppingBag, Trash2, Plus, Minus, CreditCard, Sparkles, Coffee, Percent } from 'lucide-react';

const CartPage = () => {
    const { cart, setView, updateQuantity, removeFromCart, clearCart, addToast } = useApp();
    const [coupon, setCoupon] = useState('');
    const [discountRate, setDiscountRate] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotal * discountRate;
    const discountedSubtotal = subtotal - discountAmount;
    const tax = discountedSubtotal * 0.08;
    const total = discountedSubtotal + tax;

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (coupon.trim().toUpperCase() === 'BREWCLUB10') {
            setDiscountRate(0.10);
            setCouponApplied(true);
            addToast("Coupon applied! 10% off discount active.", "success");
        } else {
            addToast("Invalid coupon code.", "warning");
        }
    };

    const handleCheckout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsCheckoutSuccess(true);
            const mockOrderNum = 'BH-' + Math.floor(100000 + Math.random() * 900000);
            setOrderNumber(mockOrderNum);
            addToast(`Payment successful! Preparing order ${mockOrderNum}.`, 'success');
        }, 2000);
    };

    const handleCloseSuccess = () => {
        setIsCheckoutSuccess(false);
        clearCart();
        setView('home');
    };

    if (isCheckoutSuccess) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto px-6 py-24 text-center text-white min-h-[85vh] flex flex-col items-center justify-center font-sans"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-20 h-20 bg-amber-950/40 rounded-full flex items-center justify-center border border-amber-500/50 mb-6"
                >
                    <Sparkles className="w-10 h-10 text-amber-500 animate-pulse" />
                </motion.div>
                
                <h1 className="text-3xl font-bold font-cursive2 text-amber-500 mb-2">Order Confirmed!</h1>
                <p className="text-stone-300 text-sm max-w-sm mb-8">
                    Your payment was processed successfully. Our baristas are preparing your perfect coffee brew right now.
                </p>

                {/* Ticket Receipt Graphic */}
                <div className="w-full bg-stone-900 border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl relative mb-10 text-left">
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-600" />
                    
                    {/* Tear notches */}
                    <div className="absolute top-[28%] -left-3 w-6 h-6 rounded-full bg-[#0c0604] border-r-2 border-amber-500/40" />
                    <div className="absolute top-[28%] -right-3 w-6 h-6 rounded-full bg-[#0c0604] border-l-2 border-amber-500/40" />

                    <div className="bg-amber-950/10 p-5 border-b border-dashed border-amber-500/40">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-bold font-cursive text-amber-100">Brew Haven</h4>
                                <p className="text-[9px] text-amber-500 tracking-wider uppercase">Receipt & Order summary</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-[9px] text-stone-500 uppercase font-bold">Order No</span>
                                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-900/30">
                                    {orderNumber}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="space-y-3 pb-4 border-b border-stone-800">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-xs text-stone-300">
                                    <span>
                                        {item.quantity}x {item.name} <span className="text-[10px] text-stone-500">({item.size})</span>
                                    </span>
                                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="space-y-1.5 text-xs text-stone-400 pb-3">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {discountRate > 0 && (
                                <div className="flex justify-between text-green-500">
                                    <span>Discount (10%)</span>
                                    <span>-${discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Sales Tax (8%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-dashed border-stone-700 pt-3 flex justify-between text-sm font-bold text-amber-400">
                            <span>Total Paid</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleCloseSuccess}
                    className="w-full max-w-xs bg-amber-950 hover:bg-amber-900 border border-amber-800/40 text-white font-bold py-3 rounded-xl transition-all shadow-md"
                >
                    Return to Menu
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto px-6 py-24 text-white min-h-[80vh] font-sans"
        >
            {/* Back button */}
            <button 
                onClick={() => setView('home')}
                className="flex items-center gap-1.5 text-stone-400 hover:text-amber-500 font-semibold mb-10 transition-colors group text-sm"
            >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Continue Browsing</span>
            </button>

            <h1 className="text-3xl font-bold font-cursive2 text-white mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-20 bg-[#120805]/40 border border-amber-950/20 rounded-3xl p-8">
                    <ShoppingBag className="w-16 h-16 text-stone-700 mb-4 stroke-[1.5]" />
                    <p className="font-semibold text-stone-400 text-lg">Your cart is empty</p>
                    <p className="text-stone-500 text-sm mt-1 mb-8 max-w-xs">Look through our fresh selections of artisanal roasts to add items.</p>
                    <button 
                        onClick={() => setView('home')}
                        className="bg-amber-900 hover:bg-amber-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
                    >
                        Browse Coffee Menu
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Cart Items List (8 cols) */}
                    <div className="lg:col-span-8 space-y-4">
                        {cart.map((item) => (
                            <div 
                                key={item.customId}
                                className="flex flex-col sm:flex-row gap-5 items-stretch bg-[#120805]/65 border border-amber-950/20 rounded-2xl p-5 hover:border-amber-900/30 transition-all duration-300"
                            >
                                {item.img && (
                                    <img 
                                        src={item.img} 
                                        alt={item.name} 
                                        className="w-20 h-20 object-contain self-center drop-shadow-[0_8px_16px_rgba(217,119,6,0.2)]"
                                    />
                                )}
                                
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-amber-500 text-base">{item.name}</h3>
                                            <button 
                                                onClick={() => removeFromCart(item.customId)}
                                                className="text-stone-500 hover:text-red-400 p-1 rounded transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-4.5 h-4.5" />
                                            </button>
                                        </div>
                                        
                                        {/* Display customization details */}
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            <span className="text-[10px] bg-amber-950/60 border border-amber-900/40 text-amber-300 px-2 py-0.5 rounded font-semibold">
                                                Size: {item.size}
                                            </span>
                                            <span className="text-[10px] bg-stone-900 border border-stone-850 text-stone-400 px-2 py-0.5 rounded">
                                                {item.milk}
                                            </span>
                                            {item.sweetener !== 'None' && (
                                                <span className="text-[10px] bg-stone-900 border border-stone-850 text-stone-400 px-2 py-0.5 rounded">
                                                    {item.sweetener}
                                                </span>
                                            )}
                                            <span className="text-[10px] bg-stone-900 border border-stone-850 text-stone-400 px-2 py-0.5 rounded">
                                                {item.extraShots}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action row */}
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-stone-500 font-semibold uppercase">Quantity</span>
                                            
                                            <div className="flex items-center border border-amber-900/40 rounded-lg overflow-hidden bg-stone-950/40">
                                                <button
                                                    onClick={() => updateQuantity(item.customId, -1)}
                                                    className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-xs text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.customId, 1)}
                                                    className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        <span className="text-base font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Order Summary (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* Coupon card */}
                        <div className="bg-[#120805]/65 border border-amber-950/20 p-5 rounded-2xl">
                            <h3 className="text-sm font-semibold text-amber-500/80 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <Percent className="w-4 h-4" />
                                <span>Promo Code</span>
                            </h3>
                            
                            {couponApplied ? (
                                <div className="bg-green-950/20 border border-green-900/30 text-green-400 p-3 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-500" />
                                    <span>Code BREWCLUB10 applied (10% Off!)</span>
                                </div>
                            ) : (
                                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        placeholder="e.g. BREWCLUB10"
                                        className="flex-grow px-3 py-2 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-900 text-xs"
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-amber-950 hover:bg-amber-900 text-white border border-amber-800/40 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                                    >
                                        Apply
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Totals Summary */}
                        <div className="bg-[#120805]/65 border border-amber-950/20 p-6 rounded-2xl space-y-4">
                            <h3 className="text-base font-bold text-amber-100 font-sans border-b border-amber-950/20 pb-3">Order Details</h3>
                            
                            <div className="space-y-2.5 text-sm text-stone-400">
                                <div className="flex justify-between">
                                    <span>Items Subtotal</span>
                                    <span className="text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                {discountRate > 0 && (
                                    <div className="flex justify-between text-green-400">
                                        <span>Discount (10%)</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Est. Sales Tax (8%)</span>
                                    <span className="text-white">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-amber-500 pt-3 border-t border-stone-850">
                                    <span>Grand Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full bg-amber-900 hover:bg-amber-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 text-sm mt-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <CreditCard className="w-4 h-4" />
                                        <span>Place Order</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </div>

                </div>
            )}
        </motion.div>
    );
};

// CheckCircle local fallback to prevent import errors if not found
const CheckCircle = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default CartPage;
