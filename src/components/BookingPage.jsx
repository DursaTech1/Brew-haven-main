import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, MapPin, Sparkles, Clock, Ticket } from 'lucide-react';

const SEATING_ZONES = [
    { id: 'fireplace', name: 'Cozy Fireplace', desc: 'Plush velvet armchairs by the wood hearth' },
    { id: 'window', name: 'Window View', desc: 'Street-facing bar stool or low-top table' },
    { id: 'terrace', name: 'Sun-lit Terrace', desc: 'Outdoor garden seating with fresh air' },
    { id: 'lounge', name: 'Quiet Lounge', desc: 'Secluded corner perfect for work or reading' }
];

const TIME_SLOTS = [
    '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM',
    '12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

const BookingPage = () => {
    const { setView, bookTable } = useApp();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState('2');
    const [time, setTime] = useState('10:30 AM');
    const [zone, setZone] = useState('fireplace');

    const [isSuccess, setIsSuccess] = useState(false);
    const [ticketData, setTicketData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !date) return;

        const booking = bookTable({
            name,
            email,
            phone,
            date,
            guests,
            time,
            zone: SEATING_ZONES.find(z => z.id === zone)?.name || zone
        });

        setTicketData(booking);
        setIsSuccess(true);
    };

    const handleClose = () => {
        setIsSuccess(false);
        setTicketData(null);
        setView('home');
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
                <span>Back to Home</span>
            </button>

            {isSuccess && ticketData ? (
                /* Ticket Success Page View */
                <div className="space-y-8 text-center flex flex-col items-center justify-center py-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10 }}
                        className="w-16 h-16 bg-amber-950/40 rounded-full flex items-center justify-center border border-amber-500/50 mb-2"
                    >
                        <Sparkles className="w-8 h-8 text-amber-500" />
                    </motion.div>
                    
                    <h1 className="text-3xl font-bold text-amber-500 font-cursive2">Booking Confirmed!</h1>
                    <p className="text-sm text-stone-400 max-w-md">
                        Your table reservation has been logged. Show this confirmation ticket to our baristas upon arrival. We hold seats for up to 15 mins.
                    </p>

                    {/* Golden Ticket Layout */}
                    <div className="w-full max-w-md bg-stone-900 border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl relative">
                        {/* Tear circles */}
                        <div className="absolute top-[28%] -left-3 w-6 h-6 rounded-full bg-[#0c0604] border-r-2 border-amber-500/40" />
                        <div className="absolute top-[28%] -right-3 w-6 h-6 rounded-full bg-[#0c0604] border-l-2 border-amber-500/40" />

                        {/* Ticket Head */}
                        <div className="bg-amber-950/20 p-5 border-b border-dashed border-amber-500/40 text-left">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-lg font-bold font-cursive text-amber-100">Brew Haven</h4>
                                    <p className="text-[10px] text-amber-500 tracking-widest uppercase">Est. 2010 • Harar, Ethiopia</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[9px] text-stone-500 font-bold uppercase">Booking ID</span>
                                    <span className="text-sm font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-900/30">
                                        {ticketData.id}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Body */}
                        <div className="p-6 text-left space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-wider">Reserved For</span>
                                    <span className="text-sm font-bold text-stone-200">{ticketData.name}</span>
                                </div>
                                <div>
                                    <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-wider">Table Zone</span>
                                    <span className="text-sm font-bold text-amber-400">{ticketData.zone}</span>
                                </div>
                                <div>
                                    <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-wider">Date & Time</span>
                                    <span className="text-sm font-bold text-stone-200">{ticketData.date} • {ticketData.time}</span>
                                </div>
                                <div>
                                    <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-wider">Guests</span>
                                    <span className="text-sm font-bold text-stone-200">{ticketData.guests} People</span>
                                </div>
                            </div>

                            {/* CSS-based Barcode */}
                            <div className="pt-4 border-t border-stone-850 flex flex-col items-center gap-1.5">
                                <div className="h-10 w-full bg-stone-900 flex justify-center items-center gap-[2px]">
                                    {Array.from({ length: 48 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-amber-100"
                                            style={{
                                                width: i % 7 === 0 ? '3px' : i % 5 === 0 ? '1px' : i % 3 === 0 ? '2px' : '1px',
                                                height: '100%',
                                                opacity: 0.8
                                            }}
                                        />
                                    ))}
                                </div>
                                <span className="text-[9px] font-mono tracking-[0.3em] text-stone-500 uppercase">
                                    *{ticketData.id}*
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        className="px-8 py-3 bg-amber-950 hover:bg-amber-900 text-white font-bold rounded-xl transition-all border border-amber-800/40 w-full max-w-xs"
                    >
                        Return to Home
                    </button>
                </div>
            ) : (
                /* Booking Form view */
                <div>
                    <h1 className="text-3xl font-bold font-cursive2 text-white mb-8">Table Reservation</h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                        
                        {/* Inputs (7 cols) */}
                        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 bg-[#120805]/45 border border-amber-950/20 p-6 md:p-8 rounded-3xl text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="bookName" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="bookName"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Murad Demelash"
                                        className="w-full px-4 py-2.5 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 transition-all font-sans text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="bookPhone" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="bookPhone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder="+251 944559907"
                                        className="w-full px-4 py-2.5 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 transition-all font-sans text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bookEmail" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="bookEmail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="muraddemelash@gmail.com"
                                    className="w-full px-4 py-2.5 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 transition-all font-sans text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="bookDate" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                                        Reservation Date
                                    </label>
                                    <input
                                        type="date"
                                        id="bookDate"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2.5 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 transition-all font-sans text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="bookGuests" className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
                                        Number of Guests
                                    </label>
                                    <select
                                        id="bookGuests"
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-stone-900 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 transition-all font-sans text-sm"
                                    >
                                        <option value="1">1 Person</option>
                                        <option value="2">2 People</option>
                                        <option value="3">3 People</option>
                                        <option value="4">4 People</option>
                                        <option value="5">5 People</option>
                                        <option value="6">6+ People (Group)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Zone details preference */}
                            <div>
                                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                                    Choose Seating Preference
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {SEATING_ZONES.map((z) => (
                                        <div
                                            key={z.id}
                                            onClick={() => setZone(z.id)}
                                            className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                                                zone === z.id
                                                    ? 'bg-amber-900/20 border-amber-500 text-white'
                                                    : 'bg-[#120805] border-amber-950/40 text-stone-300 hover:border-amber-900/20'
                                            }`}
                                        >
                                            <span className="font-semibold text-sm block">{z.name}</span>
                                            <p className="text-[10px] text-stone-500 mt-1">{z.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Slots */}
                            <div>
                                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                                    Select Time Slot
                                </label>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {TIME_SLOTS.map((t) => (
                                        <button
                                            type="button"
                                            key={t}
                                            onClick={() => setTime(t)}
                                            className={`py-2 rounded-lg border text-xs transition-all ${
                                                time === t
                                                    ? 'bg-amber-900 border-amber-600 text-white font-bold'
                                                    : 'bg-stone-900/40 border-amber-950/20 text-stone-400 hover:border-amber-900/30'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-900 hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98] mt-6 flex items-center justify-center gap-2 text-sm"
                            >
                                <Ticket className="w-4 h-4" />
                                <span>Confirm Reservation</span>
                            </button>
                        </form>

                        {/* Cafe seating diagram illustration (5 cols) */}
                        <div className="lg:col-span-5 bg-[#120805]/20 border border-amber-950/15 rounded-3xl p-6 md:p-8 flex flex-col justify-between text-left">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-amber-500 font-cursive2">Seating Layout</h3>
                                <p className="text-stone-400 text-xs leading-relaxed">
                                    We design our cafe spaces to cater to your specific mood. Here's a brief look at where you'll be seated:
                                </p>
                                
                                <div className="border border-amber-950/30 bg-[#0e0805] rounded-2xl p-4 space-y-3">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-stone-300">🔥 Fireplace Booths</span>
                                        <span className="text-[10px] bg-amber-950 px-2 py-0.5 rounded text-amber-400 font-semibold">Best for Couples</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-stone-300">🌅 Outdoor Terrace</span>
                                        <span className="text-[10px] bg-amber-950 px-2 py-0.5 rounded text-amber-400 font-semibold">Fresh Air Views</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-stone-300">💻 Study Lounge</span>
                                        <span className="text-[10px] bg-amber-950 px-2 py-0.5 rounded text-amber-400 font-semibold">Silent Workspace</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 border-t border-amber-950/20 pt-6">
                                <div className="inline-flex items-center gap-2 text-xs bg-amber-950/30 border border-amber-900/30 px-3 py-1.5 rounded-full text-amber-300 font-semibold">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Open daily: 8:00 AM - 10:00 PM</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default BookingPage;
