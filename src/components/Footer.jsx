import React from 'react'
import FooterBg from '../assets/coffee-footer.jpg'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Coffee, MapPin, Phone, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ServicesLinks = [
    { title: "Table Booking", action: 'booking' },
    { title: "In-House Roastery", action: 'roast' },
    { title: "Custom Blends", action: 'blend' },
    { title: "Special Catering", action: 'catering' }
];

const MenuQuickLinks = [
    { title: "Espresso Duo", link: "#menu" },
    { title: "Turkish Cardamom", link: "#menu" },
    { title: "Glazed Cinnamon Roll", link: "#menu" },
    { title: "Classic Cold Brew", link: "#menu" }
];

const bgImage = {
    backgroundImage: `url(${FooterBg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "350px",
    width: "100%",
};

const Footer = () => {
    const { setBookingOpen } = useApp();

    return (
        <div style={bgImage} className='text-white relative overflow-hidden font-sans border-t border-amber-950/20'>
            {/* Dark background tint overlay */}
            <div className='bg-black/80 min-h-[350px] py-12 px-6 md:px-0'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start'>
                    
                    {/* Column 1: Brand Info (5 columns) */}
                    <div className='md:col-span-5 space-y-4 text-left'>
                        <a href="#" className='flex items-center gap-2 font-semibold text-2xl font-cursive text-amber-500 hover:scale-[1.01] transition-transform w-fit'>
                            <Coffee className="w-6 h-6" />
                            <span>Brew Haven</span>
                        </a>
                        <p className='text-stone-400 text-sm leading-relaxed max-w-sm'>
                            Crafted coffee, cozy fireplace vibes, and unforgettable memories. Sourcing the finest organic beans directly from ethical growers worldwide to bring perfection into every single cup.
                        </p>
                    </div>

                    {/* Columns 2-4: Links & Contact (7 columns) */}
                    <div className='md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left'>
                        {/* Services Links */}
                        <div className='space-y-4'>
                            <h1 className='text-base font-bold text-amber-500 uppercase tracking-wider'>Our Services</h1>
                            <ul className='space-y-2 text-stone-400 text-sm font-medium'>
                                {ServicesLinks.map((data, index) => (
                                    <li key={index}>
                                        {data.action === 'booking' ? (
                                            <button 
                                                onClick={() => setBookingOpen(true)}
                                                className='hover:text-amber-500 transition-colors'
                                            >
                                                {data.title}
                                            </button>
                                        ) : (
                                            <a href="#about" className='hover:text-amber-500 transition-colors'>{data.title}</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Quick Menu Links */}
                        <div className='space-y-4'>
                            <h1 className='text-base font-bold text-amber-500 uppercase tracking-wider'>Quick Menu</h1>
                            <ul className='space-y-2 text-stone-400 text-sm font-medium'>
                                {MenuQuickLinks.map((data, index) => (
                                    <li key={index}>
                                        <a href={data.link} className='hover:text-amber-500 transition-colors'>{data.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Address & Socials */}
                        <div className='space-y-4'>
                            <h1 className='text-base font-bold text-amber-500 uppercase tracking-wider'>Get In Touch</h1>
                            <div className='space-y-2.5 text-stone-400 text-sm'>
                                <div className='flex items-center gap-2'>
                                    <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                    <span>Harar, Ethiopia</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                    <span>+251 944 559907</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                    <span className="truncate">murad@gmail.com</span>
                                </div>
                                
                                {/* Social icons */}
                                <div className='flex items-center gap-3.5 pt-3'>
                                    <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                                        <FaInstagram className='text-xl' />
                                    </a>
                                    <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                                        <FaFacebook className='text-xl' />
                                    </a>
                                    <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors">
                                        <FaLinkedin className='text-xl' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subfooter bottom bar */}
                <div className='max-w-7xl mx-auto border-t border-stone-850/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4'>
                    <p>© 2026 Brew Haven. All rights reserved.</p>
                    <p className="flex gap-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <span>•</span>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer

