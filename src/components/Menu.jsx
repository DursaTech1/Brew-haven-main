import React, { useState } from 'react'
import Img1 from '../assets/coffee-white.png'
import Img2 from '../assets/coffee2.png'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { Flame, Snowflake, Cookie, Sparkles, Plus } from 'lucide-react'

const MenuCategories = [
    { id: 'hot', name: 'Hot Brews', icon: Flame },
    { id: 'cold', name: 'Cold Brews', icon: Snowflake },
    { id: 'treats', name: 'Sweet Treats', icon: Cookie },
    { id: 'signatures', name: 'Signatures', icon: Sparkles }
];

const MenuData = [
    {
      id: 1,
      category: 'hot',
      img: Img2,
      name: "Espresso Duo",
      description: "Rich, concentrated double shot of espresso brewed from our premium dark roast beans.",
      price: 3.25
    },
    {
      id: 2,
      category: 'hot',
      img: Img1,
      name: "Americano",
      description: "Double shot of espresso diluted with hot water for a smooth, deep, and robust coffee flavor.",
      price: 3.50
    },
    {
      id: 3,
      category: 'hot',
      img: Img2,
      name: "Cappuccino",
      description: "Rich espresso topped with steamed milk and a deep layer of velvety, thick milk foam.",
      price: 4.25
    },
    {
      id: 4,
      category: 'hot',
      img: Img1,
      name: "Cafe Latte",
      description: "Smooth espresso shot poured over steamed milk with a delicate, artistic hint of microfoam.",
      price: 4.50
    },
    {
      id: 5,
      category: 'cold',
      img: Img1,
      name: "Classic Cold Brew",
      description: "Artisan coffee beans slow-steeped in cold water for 16 hours, served over ice for low acidity.",
      price: 4.50
    },
    {
      id: 6,
      category: 'cold',
      img: Img2,
      name: "Iced Caramel Macchiato",
      description: "Espresso layer over milk and vanilla syrup, served with ice and rich caramel drizzle.",
      price: 4.95
    },
    {
      id: 7,
      category: 'treats',
      img: Img1,
      name: "Chocolate Muffin",
      description: "Double chocolate muffin baked daily with Belgian chips and a soft fudge core.",
      price: 3.50
    },
    {
      id: 8,
      category: 'treats',
      img: Img2,
      name: "Glazed Cinnamon Roll",
      description: "Freshly baked roll filled with cinnamon brown sugar, finished with sweet cream cheese frosting.",
      price: 3.75
    },
    {
      id: 9,
      category: 'signatures',
      img: Img2,
      name: "Turkish Cardamom Brew",
      description: "Traditional unfiltered coffee boiled in a copper pot with crushed cardamom pods.",
      price: 4.95
    },
    {
      id: 10,
      category: 'signatures',
      img: Img1,
      name: "Brew Haven Latte",
      description: "Espresso infused with house hazelnut praline, organic maple syrup, and steamed oat milk.",
      price: 5.50
    }
];

const Menu = () => {
  const { setCustomizeItem } = useApp()
  const [activeCategory, setActiveCategory] = useState('hot')

  const filteredItems = MenuData.filter(item => item.category === activeCategory)

  return (
    <div id='menu' className='py-24 bg-[#0a0503] relative'>
      {/* Visual background lights */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className='max-w-7xl mx-auto px-6 md:px-0'>
        {/* Heading section */}
        <div className='text-center mb-16 space-y-4'>
            <motion.h1 
              initial={{opacity:0, y:30}}
              whileInView={{opacity:1, y:0}}
              viewport={{ once: true }}
              transition={{duration:0.8}}
              className='text-4xl md:text-5xl font-bold font-cursive2 text-white'
            >
              Discover Our <span className="text-amber-500">Coffee Menu</span>
            </motion.h1>
            <motion.p
              initial={{opacity:0, y:20}}
              whileInView={{opacity:1, y:0}}
              viewport={{ once: true }}
              transition={{duration:0.8, delay: 0.2}}
              className="text-stone-400 max-w-md mx-auto text-sm"
            >
              Every cup is prepared by certified baristas using sustainably sourced single-origin coffee beans.
            </motion.p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
            {MenuCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                            activeCategory === cat.id
                                ? 'bg-amber-900 border-amber-600 text-white shadow-lg shadow-amber-900/20'
                                : 'bg-[#120906] border-amber-950/40 text-stone-400 hover:text-stone-200 hover:border-amber-900/30'
                        }`}
                    >
                        <IconComponent className="w-4 h-4 text-amber-500" />
                        <span>{cat.name}</span>
                    </button>
                );
            })}
        </div>

        {/* menu card section */}
        <motion.div 
          layout
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 place-items-stretch'
        >
            <AnimatePresence mode='popLayout'>
                {filteredItems.map((menu) => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        key={menu.id}
                        className='rounded-2xl bg-[#120805] hover:bg-[#1c0e09] border border-amber-950/30 hover:border-amber-900/40 transition-all duration-300 relative shadow-xl flex flex-col justify-between group overflow-hidden p-5 pt-14'
                    >
                        {/* Circle overlay element on hover */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-900/10 rounded-full blur-2xl group-hover:bg-amber-900/20 transition-all duration-500" />
                        
                        {/* Image area */}
                        <div className='absolute -top-10 left-1/2 transform -translate-x-1/2 h-24 w-full flex justify-center z-10'>
                            <img 
                                src={menu.img} 
                                alt={menu.name} 
                                className='w-24 block object-contain transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-350 drop-shadow-[0_8px_16px_rgba(180,83,9,0.25)]'
                            />
                        </div>
                        
                        {/* Details */}
                        <div className='text-center space-y-2 mt-4 flex-1 flex flex-col justify-between'>
                            <div className="space-y-1">
                                <h2 className='text-lg font-bold text-amber-100 font-sans tracking-wide'>{menu.name}</h2>
                                <p className='text-stone-400 text-xs leading-relaxed line-clamp-3 px-1'>{menu.description}</p>
                            </div>
                            
                            <div className='flex justify-between items-center mt-5 bg-[#0a0503]/50 p-2.5 rounded-xl border border-amber-950/20'>
                                <span className='text-base font-bold text-amber-500'>${menu.price.toFixed(2)}</span>
                                <button 
                                    onClick={() => setCustomizeItem(menu)}
                                    className='bg-amber-900 hover:bg-amber-800 text-white font-bold p-2 rounded-lg transition-colors flex items-center justify-center'
                                    aria-label={`Order ${menu.name}`}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Menu

