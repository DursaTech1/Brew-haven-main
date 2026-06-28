import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ChevronLeft, Coffee, Plus, Minus, Check } from 'lucide-react';

const SIZES = [
    { name: 'Short', volume: '8oz', addon: 0.00 },
    { name: 'Tall', volume: '12oz', addon: 0.50 },
    { name: 'Grande', volume: '16oz', addon: 1.00 }
];

const MILKS = [
    { name: 'Whole Milk', addon: 0.00 },
    { name: 'Oat Milk', addon: 0.60 },
    { name: 'Almond Milk', addon: 0.60 },
    { name: 'Coconut Milk', addon: 0.70 }
];

const SWEETENERS = [
    { name: 'None', addon: 0.00 },
    { name: 'Caramel Drizzle', addon: 0.50 },
    { name: 'Vanilla Syrup', addon: 0.40 },
    { name: 'Honey', addon: 0.30 }
];

const SHOTS = [
    { name: 'Single Shot', addon: 0.00 },
    { name: 'Double Shot', addon: 0.80 },
    { name: 'Triple Shot', addon: 1.50 }
];

const CustomizePage = () => {
    const { customizeItem, setView, addToCart } = useApp();
    const [size, setSize] = useState('Tall');
    const [milk, setMilk] = useState('Whole Milk');
    const [sweetener, setSweetener] = useState('None');
    const [extraShots, setExtraShots] = useState('Single Shot');
    const [quantity, setQuantity] = useState(1);

    // If no item, go back
    useEffect(() => {
        if (!customizeItem) {
            setView('home');
        }
    }, [customizeItem, setView]);

    if (!customizeItem) return null;

    const basePrice = customizeItem.price || 3.75;
    
    // Addons cost calculation
    const sizeAddon = SIZES.find(s => s.name === size)?.addon || 0;
    const milkAddon = MILKS.find(m => m.name === milk)?.addon || 0;
    const sweetenerAddon = SWEETENERS.find(s => s.name === sweetener)?.addon || 0;
    const shotAddon = SHOTS.find(s => s.name === extraShots)?.addon || 0;
    
    const unitPrice = basePrice + sizeAddon + milkAddon + sweetenerAddon + shotAddon;
    const totalPrice = unitPrice * quantity;

    const handleAddToOrder = () => {
        addToCart(customizeItem, quantity, {
            size,
            milk,
            sweetener,
            extraShots,
            price: unitPrice
        });
    };

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
                <span>Back to Menu</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Side: Product Showcase (5 cols) */}
                <div className="lg:col-span-5 flex flex-col items-center bg-[#120805]/50 border border-amber-950/20 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-900/5 rounded-full blur-3xl" />
                    
                    {customizeItem.img && (
                        <motion.img
                            initial={{ scale: 0.9, rotate: -3 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                            src={customizeItem.img}
                            alt={customizeItem.name}
                            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_15px_30px_rgba(217,119,6,0.35)] mb-8"
                        />
                    )}
                    
                    <div className="text-center space-y-3 w-full">
                        <span className="bg-amber-950/60 border border-amber-900/40 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Signature Brew
                        </span>
                        <h1 className="text-3xl font-bold text-amber-500 font-cursive2">{customizeItem.name}</h1>
                        <p className="text-stone-300 text-sm leading-relaxed max-w-sm mx-auto">{customizeItem.description}</p>
                        <p className="text-stone-500 text-xs pt-2">Base price starts at ${basePrice.toFixed(2)}</p>
                    </div>
                </div>

                {/* Right Side: Options Selector (7 cols) */}
                <div className="lg:col-span-7 space-y-8 bg-[#120805]/30 border border-amber-950/10 p-6 md:p-8 rounded-3xl">
                    
                    {/* Size Selector */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-amber-500/80 uppercase tracking-widest">Select Size</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {SIZES.map((s) => (
                                <button
                                    key={s.name}
                                    onClick={() => setSize(s.name)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                                        size === s.name
                                            ? 'bg-amber-900/20 border-amber-500 text-white shadow-lg'
                                            : 'bg-[#120805]/90 border-amber-950/40 text-stone-400 hover:text-stone-200 hover:border-amber-900/30'
                                    }`}
                                >
                                    <span className="text-base font-bold">{s.name}</span>
                                    <span className="text-xs text-stone-500 mt-0.5">{s.volume}</span>
                                    <span className="text-xs text-amber-500 mt-2 font-semibold">
                                        {s.addon === 0 ? 'Included' : `+$${s.addon.toFixed(2)}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Milk Option */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-amber-500/80 uppercase tracking-widest">Milk Alterations</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {MILKS.map((m) => (
                                <button
                                    key={m.name}
                                    onClick={() => setMilk(m.name)}
                                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs transition-all ${
                                        milk === m.name
                                            ? 'bg-amber-900/20 border-amber-500 text-white font-semibold shadow-md'
                                            : 'bg-[#120805]/90 border-amber-950/40 text-stone-400 hover:border-amber-900/30'
                                    }`}
                                >
                                    <span>{m.name}</span>
                                    <span className="text-amber-500 mt-1 font-medium">
                                        {m.addon === 0 ? 'Free' : `+$${m.addon.toFixed(2)}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sweetener Selector */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-amber-500/80 uppercase tracking-widest">Sweetener Add-ins</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {SWEETENERS.map((sw) => (
                                <button
                                    key={sw.name}
                                    onClick={() => setSweetener(sw.name)}
                                    className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs transition-all ${
                                        sweetener === sw.name
                                            ? 'bg-amber-900/20 border-amber-500 text-white font-semibold shadow-md'
                                            : 'bg-[#120805]/90 border-amber-950/40 text-stone-400 hover:border-amber-900/30'
                                    }`}
                                >
                                    <span>{sw.name}</span>
                                    <span className="text-amber-500 mt-1 font-medium">
                                        {sw.addon === 0 ? 'Free' : `+$${sw.addon.toFixed(2)}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Extra Shots */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-amber-500/80 uppercase tracking-widest">Espresso Intensity</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {SHOTS.map((sh) => (
                                <button
                                    key={sh.name}
                                    onClick={() => setExtraShots(sh.name)}
                                    className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl border text-xs transition-all ${
                                        extraShots === sh.name
                                            ? 'bg-amber-900/20 border-amber-500 text-white font-semibold shadow-md'
                                            : 'bg-[#120805]/90 border-amber-950/40 text-stone-400 hover:border-amber-900/30'
                                    }`}
                                >
                                    <span>{sh.name}</span>
                                    <span className="text-amber-500 mt-1 font-medium">
                                        {sh.addon === 0 ? 'Free' : `+$${sh.addon.toFixed(2)}`}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & Add to Cart button */}
                    <div className="pt-6 border-t border-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-5 mt-6">
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Qty</span>
                            <div className="flex items-center border border-amber-900/40 rounded-xl overflow-hidden bg-stone-900/30">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="p-3 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-bold text-white text-base">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    className="p-3 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Add button showing price */}
                        <button
                            onClick={handleAddToOrder}
                            className="w-full sm:w-auto bg-amber-900 hover:bg-amber-800 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-xl hover:shadow-amber-900/25 active:scale-[0.98] flex items-center justify-center gap-3 text-base"
                        >
                            <span>Add to Cart</span>
                            <span className="text-amber-300">|</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </button>
                    </div>

                </div>

            </div>
        </motion.div>
    );
};

export default CustomizePage;
