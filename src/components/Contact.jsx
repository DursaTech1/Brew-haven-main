import React, { useState } from 'react'
import Bg from '../assets/Bg.png'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Send, Mail, Phone, MapPin, Gift, CheckCircle } from 'lucide-react'

const bgImage = {
    backgroundImage: `url(${Bg})`,
    backgroundColor: "#0c0604",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

const Contact = () => {
    const { addToast } = useApp()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    
    const [newsEmail, setNewsEmail] = useState('')
    const [newsSubscribed, setNewsSubscribed] = useState(false)

    const handleContactSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !message) return

        addToast("Message sent! We'll reply within 24 hours.", "success")
        setName('')
        setEmail('')
        setMessage('')
    }

    const handleNewsSubmit = (e) => {
        e.preventDefault()
        if (!newsEmail) return

        addToast("Welcome to the Brew Club!", "success")
        setNewsSubscribed(true)
        setNewsEmail('')
    }

    return (
        <div id='contact' style={bgImage} className='min-h-screen py-24 px-6 md:px-0 relative flex items-center justify-center'>
            {/* Dark background overlay */}
            <div className="absolute inset-0 bg-[#0c0604]/90 pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                
                {/* Left Side: Contact Form (7 columns) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='lg:col-span-7 bg-[#120805]/85 border border-amber-950/30 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col justify-between'
                >
                    <div>
                        <h1 className='text-3xl font-bold text-amber-500 mb-2 font-cursive2'>Get in Touch</h1>
                        <p className='text-stone-400 text-sm mb-8 font-sans'>
                            Have a question about our beans, catering options, or just want to say hi? Drop us a line.
                        </p>
                        
                        <form onSubmit={handleContactSubmit} className='space-y-5'>
                            <div>
                                <label htmlFor="name" className='block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5'>Your Name</label>
                                <input 
                                    type="text" 
                                    id='name' 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                    placeholder='Murad Demelash'
                                    className='w-full px-4 py-2.5 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 transition-all font-sans text-sm'
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5'>Email Address</label>
                                <input 
                                    type="email" 
                                    id='email' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    placeholder='muraddemelash@gmail.com'
                                    className='w-full px-4 py-2.5 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 transition-all font-sans text-sm'
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className='block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5'>Your Message</label>
                                <textarea 
                                    id="message" 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required 
                                    placeholder='Type your thoughts...' 
                                    rows="4"
                                    className='w-full py-2.5 px-4 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 transition-all font-sans text-sm'
                                ></textarea>
                            </div>
                            
                            <button className='w-full py-3 px-4 bg-amber-900 hover:bg-amber-800 text-white font-bold rounded-xl shadow-lg transition duration-300 active:scale-[0.98] flex items-center justify-center gap-2 text-sm'>
                                <Send className="w-4 h-4" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Right Side: Club & Info (5 columns) */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className='lg:col-span-5 flex flex-col gap-6'
                >
                    {/* Newsletter Container */}
                    <div className="bg-amber-950/20 border border-amber-900/20 rounded-3xl p-6 md:p-8 flex-1 flex flex-col justify-between relative overflow-hidden bg-stone-950/80">
                        {newsSubscribed ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                                <CheckCircle className="w-12 h-12 text-amber-500 mb-4 animate-bounce" />
                                <h3 className="text-xl font-bold text-amber-100 font-cursive2 mb-2">Welcome to the Club!</h3>
                                <p className="text-xs text-stone-300 max-w-[240px] mb-6">
                                    You've been added to our mailing list. Use this coupon code at checkout for 10% off:
                                </p>
                                <span className="bg-amber-900/40 text-amber-300 border border-dashed border-amber-700/50 text-sm font-bold tracking-widest px-4 py-2 rounded-xl">
                                    BREWCLUB10
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-3 bg-amber-900/20 rounded-2xl w-fit border border-amber-900/30">
                                    <Gift className="w-6 h-6 text-amber-500" />
                                </div>
                                <h2 className="text-xl font-bold text-amber-100 font-cursive2">Join the Brew Club</h2>
                                <p className="text-stone-400 text-xs leading-relaxed">
                                    Subscribe to our newsletter for exclusive recipes, discount codes, and announcements about new single-origins.
                                </p>
                                
                                <form onSubmit={handleNewsSubmit} className="pt-2 flex flex-col sm:flex-row gap-2">
                                    <input 
                                        type="email" 
                                        value={newsEmail}
                                        onChange={(e) => setNewsEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email" 
                                        className="flex-1 px-4 py-2.5 bg-stone-900/60 border border-amber-950 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900 font-sans text-xs"
                                    />
                                    <button className="bg-amber-900 hover:bg-amber-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs active:scale-[0.98] transition-all whitespace-nowrap">
                                        Join Now
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Direct contact details */}
                    <div className="bg-[#120805]/85 border border-amber-950/30 rounded-3xl p-6 md:p-8 space-y-5 text-left">
                        <h3 className="font-bold text-amber-500 font-cursive2 text-lg">Contact Details</h3>
                        <div className="space-y-4 font-sans text-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-900/50 rounded-lg text-amber-500">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-stone-500 font-semibold uppercase">Call Us</p>
                                    <p className="text-stone-300 font-medium">+251 944 559907</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-900/50 rounded-lg text-amber-500">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-stone-500 font-semibold uppercase">Email Us</p>
                                    <p className="text-stone-300 font-medium">muraddemelash@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-900/50 rounded-lg text-amber-500">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-stone-500 font-semibold uppercase">Visit Us</p>
                                    <p className="text-stone-300 font-medium">Ethiopia, Harar (Main St)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default Contact

