import React from 'react'
import coffee from '../assets/coffee5.png'
import Bean1 from '../assets/bean1.png'
import Bean2 from '../assets/bean2.png'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Calendar, ArrowRight } from 'lucide-react'

const Hero = () => {
    const { setBookingOpen } = useApp()

    return (
        <div className='bg-gradient-to-b from-[#180a05] via-[#0c0604] to-[#0c0604] pt-24 pb-16 md:py-32 relative overflow-hidden'>
            <div className='max-w-7xl mx-auto grid md:grid-cols-2 place-items-center min-h-[600px] relative px-6 md:px-0'>
                
                {/* text section */}
                <div className='space-y-6 z-10 text-left'>
                    <motion.h1 
                     initial={{opacity:0, y:20}}
                     whileInView={{opacity:1, y:0}}
                     viewport={{ once: true }}
                     transition={{duration:0.8, delay:0.1}}
                     className='text-5xl md:text-7xl font-bold font-cursive2 leading-tight text-white'
                    >
                        Experience <span className='text-amber-500 block sm:inline'>Artisanal</span> Coffee
                    </motion.h1>

                    <motion.p
                     initial={{opacity:0, y:20}}
                     whileInView={{opacity:1, y:0}}
                     viewport={{ once: true }}
                     transition={{duration:0.8, delay:0.2}}
                     className='text-stone-300 text-base md:text-lg max-w-lg leading-relaxed'
                    >
                        Indulge in our carefully crafted brews, made from ethically sourced beans and roasted locally to release their full, complex aromas.
                    </motion.p>

                    <motion.div 
                     initial={{opacity:0, y:20}}
                     whileInView={{opacity:1, y:0}}
                     viewport={{ once: true }}
                     transition={{duration:0.8, delay:0.3}}
                     className='flex flex-wrap gap-4 pt-2'
                    >
                        <a href="#menu">
                            <button className='bg-amber-900 hover:bg-amber-800 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-amber-900/20 active:scale-[0.98] flex items-center gap-2'>
                                <span>Explore Menu</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </a>
                        <button 
                            onClick={() => setBookingOpen(true)}
                            className='bg-[#1c0f0a]/80 hover:bg-[#2a170f] border border-amber-900/40 text-amber-300 font-bold px-6 py-3 rounded-xl transition-all active:scale-[0.98] flex items-center gap-2'
                        >
                            <Calendar className="w-4 h-4 text-amber-500" />
                            <span>Book a Table</span>
                        </button>
                    </motion.div>
                </div>

                {/* image section */}
                <div className='relative mt-12 md:mt-0 flex justify-center'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="absolute inset-0 bg-gradient-to-r from-amber-900/10 to-amber-700/10 rounded-full blur-3xl w-[300px] h-[300px] md:w-[450px] md:h-[450px] self-center justify-self-center z-0"
                    />
                    <motion.img 
                     initial={{opacity:0, scale:0.7, rotate: -15}}
                     animate={{opacity:1, scale:1, rotate: 0}}
                     transition={{duration:1.5, type: 'spring', bounce: 0.2}}
                     whileHover={{ scale: 1.03, rotate: 2 }}
                     src={coffee} 
                     alt="Artisan Brew Haven Cup" 
                     className='w-[350px] md:w-[480px] object-contain drop-shadow-[0_15px_30px_rgba(180,83,9,0.3)] z-10 cursor-pointer relative' 
                    />
                </div>

                {/* Floating Beans with customized Framer Motion floats */}
                {/* Bean Left Bottom */}
                <motion.img 
                 initial={{opacity:0, scale:0.7}}
                 animate={{
                    opacity:1, 
                    scale:1,
                    y: [0, -15, 0],
                    rotate: [45, 60, 45]
                 }}
                 transition={{
                    opacity: { duration: 1.5 },
                    scale: { duration: 1.5 },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                 }}
                 src={Bean2} 
                 alt="Coffee Bean" 
                 className='absolute hidden md:block bottom-16 left-[40%] z-20 w-16'
                />

                {/* Bean Left Mid */}
                <motion.img 
                 initial={{opacity:0}}
                 animate={{
                    opacity:1,
                    y: [0, 20, 0],
                    x: [0, 10, 0],
                    rotate: [0, -20, 0]
                 }}
                 transition={{
                    opacity: { duration: 1.8 },
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                 }}
                 src={Bean1} 
                 alt="Coffee Bean" 
                 className='absolute hidden md:block top-24 left-[10%] w-20 opacity-90'
                />

                {/* Bean Right Top */}
                <motion.img 
                 initial={{opacity:0}}
                 animate={{
                    opacity:1,
                    y: [0, -25, 0],
                    rotate: [-45, -30, -45]
                 }}
                 transition={{
                    opacity: { duration: 1.8 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                 }}
                 src={Bean2} 
                 alt="Coffee Bean" 
                 className='absolute hidden md:block w-16 top-16 right-[15%] -rotate-45 opacity-80'
                />
            </div>
        </div>
    )
}

export default Hero
