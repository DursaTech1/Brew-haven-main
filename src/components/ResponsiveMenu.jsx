import React from 'react'
import { useApp } from '../context/AppContext'
import { Calendar, ShoppingCart, MessageSquare, Coffee } from 'lucide-react'

const ResponsiveMenu = ({ open, setOpen }) => {
    const { setView, setCartOpen, setBookingOpen } = useApp()

    const handleNavClick = (sectionId) => {
        setView('home');
        setOpen(false);
        if (sectionId) {
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 80);
        }
    };

    return (
        <div className={`${open ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-[40] flex h-screen w-[75%] flex-col justify-between bg-[#140b07] border-r border-amber-950/30 px-8 pb-6 pt-24 text-white md:hidden rounded-r-2xl shadow-2xl transition-all duration-300`}>
            <div>
                <div className='flex items-center gap-2 mb-8 border-b border-amber-950/20 pb-4'>
                    <Coffee className="w-6 h-6 text-amber-500" />
                    <span className="font-cursive text-xl font-bold text-amber-100">Brew Haven</span>
                </div>
                <nav className='mt-4'>
                    <ul className='flex flex-col gap-6 text-base font-semibold text-stone-300 text-left'>
                        <button onClick={() => handleNavClick()} className='cursor-pointer hover:text-amber-500 text-left transition-colors'>Home</button>
                        <button onClick={() => handleNavClick('menu')} className='cursor-pointer hover:text-amber-500 text-left transition-colors'>Menu</button>
                        <button onClick={() => handleNavClick('about')} className='cursor-pointer hover:text-amber-500 text-left transition-colors'>About</button>
                        <button onClick={() => handleNavClick('testimonial')} className='cursor-pointer hover:text-amber-500 text-left transition-colors'>Reviews</button>
                        <button onClick={() => handleNavClick('contact')} className='cursor-pointer hover:text-amber-500 text-left transition-colors'>Contact</button>
                    </ul>
                </nav>
                
                {/* Secondary buttons */}
                <div className="mt-10 flex flex-col gap-3">
                    <button 
                        onClick={() => {
                            setBookingOpen(true);
                            setOpen(false);
                        }}
                        className="flex items-center justify-center gap-2 w-full bg-amber-900/20 hover:bg-amber-900/30 border border-amber-800/40 text-amber-300 font-bold py-2.5 rounded-xl text-sm transition-all"
                    >
                        <Calendar className="w-4 h-4" />
                        <span>Book a Table</span>
                    </button>
                    <button 
                        onClick={() => {
                            setCartOpen(true);
                            setOpen(false);
                        }}
                        className="flex items-center justify-center gap-2 w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 rounded-xl text-sm transition-all"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>View Cart</span>
                    </button>
                </div>
            </div>
            <div className='text-xs text-stone-500 border-t border-amber-950/20 pt-4 flex flex-col gap-1'>
                <p>Made with ❤️ by Murad</p>
                <p className="text-[10px] text-stone-600">© 2026 Brew Haven Coffee</p>
            </div>
        </div>
    )
}

export default ResponsiveMenu

