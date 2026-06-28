import React from 'react'
import Bg from '../assets/Bg.png'
import Lottie from 'lottie-react';
import coffee from '../assets/Coffeeanime.json'
import { motion } from 'framer-motion'; 
import { Leaf, Flame, ShieldCheck, HeartHandshake } from 'lucide-react';

const bgImage = {
    backgroundImage: `url(${Bg})`,
    backgroundColor: "#180a05",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
};

const VALUES = [
    { icon: Leaf, title: "100% Organic Beans", desc: "Fair-trade sourced from small-family estates in Harar and Yirgacheffe." },
    { icon: Flame, title: "Small-Batch Roasting", desc: "Meticulously roasted in-house to unlock unique, complex notes." },
    { icon: ShieldCheck, title: "Certified Baristas", desc: "Skilled coffee artisans dedicated to brewing the perfect cup." },
    { icon: HeartHandshake, title: "Cozy Ambiance", desc: "Comfortable seating, free high-speed Wi-Fi, and warm fireplace views." }
];

const About = () => {
  return (
    <div id='about' className='py-24 relative' style={bgImage}>
      {/* Dark overlay to ensure contrast */}
      <div className="absolute inset-0 bg-[#0e0805]/90 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-0">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
           initial={{opacity:0, y:30}}
           whileInView={{opacity:1, y:0}}
           viewport={{ once: true }}
           transition={{duration:0.8}}
           className='text-amber-500 font-cursive2 text-4xl md:text-5xl font-bold'>Our Story</motion.h1>
        </div>

        <div className='grid md:grid-cols-2 gap-10 items-center'>
          {/* image section */}
          <motion.div
           initial={{opacity:0, scale:0.85}}
           whileInView={{opacity:1, scale:1}}
           viewport={{ once: true }}
           transition={{duration:1}}
           className="flex justify-center"
          >
              <Lottie animationData={coffee} className='w-full max-w-[480px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]' />
          </motion.div>

          {/* text section */}
          <div className='space-y-6 text-left'>
              <motion.h2 
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                viewport={{ once: true }}
                transition={{duration:0.8}}
                className='text-2xl md:text-3xl font-cursive font-bold text-amber-100'>Passion for Perfect Brews</motion.h2>
              
              <motion.p 
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                viewport={{ once: true }}
                transition={{duration:0.8, delay:0.2}}
                className='text-stone-300 text-sm md:text-base leading-relaxed font-sans'
              >
                Founded in 2010, Brew Haven started as a tiny coffee cart serving the historic streets of Harar. Our founder, Murad, envisioned a community space built on sustainable values and the finest organic single-origins.
              </motion.p>
              
              <motion.p 
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                viewport={{ once: true }}
                transition={{duration:0.8, delay:0.3}}
                className='text-stone-300 text-sm md:text-base leading-relaxed font-sans'
              >
                Today, our mission remains unaltered: treating coffee roasting and brewing as an elevated craft. From selecting premium berries directly from small cooperatives to hand-crafting each espresso with state-of-the-art machinery, love and experience shape every cup.
              </motion.p>
          </div>
        </div>

        {/* Feature Grid cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {VALUES.map((val, idx) => {
                const IconComponent = val.icon;
                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="bg-[#120805]/75 border border-amber-950/30 p-5 rounded-2xl flex flex-col items-start gap-4 hover:border-amber-900/40 hover:bg-[#1a0e09]/80 transition-all duration-300 shadow-md group"
                    >
                        <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-900/30 group-hover:bg-amber-900/30 transition-colors">
                            <IconComponent className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-amber-200 text-sm mb-1.5 font-sans">{val.title}</h3>
                            <p className="text-xs text-stone-400 leading-relaxed font-sans">{val.desc}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>

      </div>
    </div>
  )
}

export default About

