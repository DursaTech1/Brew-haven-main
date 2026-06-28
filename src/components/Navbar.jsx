import React from 'react'
import Logo from "../assets/Logo.png"
import { Menu, X, ShoppingCart, Calendar } from 'lucide-react'
import ResponsiveMenu from './ResponsiveMenu'
import { useApp } from '../context/AppContext'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const { cart, view, setView, setCartOpen, setBookingOpen } = useApp()

    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    const handleNavClick = (sectionId) => {
        setView('home');
        if (sectionId) {
            setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 80);
        }
    };

    return (
        <div className='bg-[#0e0805]/95 backdrop-blur-md border-b border-amber-950/20 px-4 md:px-0 fixed z-50 w-full top-0 shadow-lg'>
            <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>
                {/* logo section */}
                <button 
                    onClick={() => handleNavClick()}
                    className='flex items-center gap-2 hover:scale-[1.02] transition-transform'
                >
                    <img src={Logo} alt="Brew Haven Logo" className='w-9 h-9 object-contain' />
                    <h1 className='text-2xl text-amber-50 font-cursive font-bold'>Brew Haven</h1>
                </button>
                
                {/* menu section */}
                <div className='flex items-center gap-4 md:gap-8'>
                    <nav className='md:flex hidden items-center gap-7'>
                        <ul className='flex gap-7 items-center text-base font-semibold text-stone-200'>
                            <button onClick={() => handleNavClick()} className='hover:text-amber-500 transition-colors cursor-pointer'>Home</button>
                            <button onClick={() => handleNavClick('menu')} className='hover:text-amber-500 transition-colors cursor-pointer'>Menu</button>
                            <button onClick={() => handleNavClick('about')} className='hover:text-amber-500 transition-colors cursor-pointer'>About</button>
                            <button onClick={() => handleNavClick('testimonial')} className='hover:text-amber-500 transition-colors cursor-pointer'>Reviews</button>
                        </ul>
                    </nav>

                    
                    {/* Action buttons (Cart, Book Table, Contact) */}
                    <div className='flex items-center gap-3'>
                        {/* Cart Toggle */}
                        <button 
                            onClick={() => setCartOpen(true)}
                            className='relative p-2 text-stone-300 hover:text-amber-500 hover:bg-stone-900/50 rounded-full transition-all'
                            aria-label="Open cart"
                        >
                            <ShoppingCart className='w-5.5 h-5.5' />
                            {cartItemCount > 0 && (
                                <span className='absolute -top-1 -right-1 bg-amber-600 border border-stone-950 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce'>
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        {/* Book a Table button (Desktop) */}
                        <button 
                            onClick={() => setBookingOpen(true)}
                            className='hidden sm:flex items-center gap-1.5 bg-amber-900/20 hover:bg-amber-900/30 border border-amber-800/40 text-amber-300 font-semibold px-4 py-1.5 rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98]'
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Book Table</span>
                        </button>
                        
                        {/* Contact */}
                        <a href="#contact" className='hidden md:block'>
                            <button className='bg-amber-800 text-white hover:bg-amber-900 font-semibold px-4 py-1.5 rounded-xl text-sm transition-all shadow-md active:scale-[0.98]'>
                                Contact
                            </button>
                        </a>
                    </div>
                    
                    {/* Mobile Menu Icon */}
                    {open ? (
                        <X onClick={() => setOpen(false)} className='text-white w-7 h-7 md:hidden cursor-pointer hover:text-amber-500 transition-colors' />
                    ) : (
                        <Menu onClick={() => setOpen(true)} className='text-white w-7 h-7 md:hidden cursor-pointer hover:text-amber-500 transition-colors' />
                    )}
                </div>
            </div>
            <ResponsiveMenu open={open} setOpen={setOpen} />
        </div>
    )
}

export default Navbar

