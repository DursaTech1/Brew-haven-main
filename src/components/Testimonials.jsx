import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialData = [
    {
        id: 1,
        name: "Vanshika Sharma",
        role: "Coffee Enthusiast",
        text: "The Brew Haven Latte with oat milk is a masterpiece. The hazelnut praline flavor is perfectly balanced and not overly sweet. Truly my daily morning ritual!",
        rating: 5,
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
        id: 2,
        name: "Rohit Verma",
        role: "Remote Developer",
        text: "I love the Cozy Fireplace seating zone. It's the perfect warm spot to read or get work done. Their signature Turkish cardamom coffee is genuinely authentic!",
        rating: 5,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
        id: 3,
        name: "Ankit Gupta",
        role: "Local Foodie",
        text: "A true artisanal coffee shop in the neighborhood. The baristas really know their craft, and the in-house small-batch roast flavor profile is outstanding.",
        rating: 5,
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    },
    {
        id: 5,
        name: "Aman Sen",
        role: "Creative Director",
        text: "Exceptional service and cozy vibes. The table booking system is seamless—reserved a window-view slot for a meeting, and everything was perfectly arranged.",
        rating: 5,
        img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120&h=120",
    },
];

const Testimonials = () => {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 600,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "ease-in-out",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div id='testimonial' className='py-24 bg-[#0c0604] relative overflow-hidden'>
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />

            <div className='max-w-7xl mx-auto px-6 md:px-0'>
                {/* header section */}
                <div className='text-center mb-12 space-y-4'>
                    <motion.h1 
                     initial={{opacity:0, y:30}}
                     whileInView={{opacity:1, y:0}}
                     viewport={{ once: true }}
                     transition={{duration:0.8}}
                     className='text-center text-white text-4xl md:text-5xl font-bold font-cursive2'>What Our Guests Say</motion.h1>
                    <motion.p
                     initial={{opacity:0, y:20}}
                     whileInView={{opacity:1, y:0}}
                     viewport={{ once: true }}
                     transition={{duration:0.8, delay:0.2}}
                     className="text-stone-400 max-w-md mx-auto text-sm"
                    >
                      Read reviews from our beloved community of coffee aficionados.
                    </motion.p>
                </div>

                {/* Testimonials cards */}
                <motion.div
                 initial={{opacity:0, y:30}}
                 whileInView={{opacity:1, y:0}}
                 viewport={{ once: true }}
                 transition={{duration:1, delay:0.2}}
                >
                    <Slider {...settings} className="testimonial-slider">
                        {TestimonialData.map((data) => (
                            <div key={data.id} className='py-6 px-3'>
                                <div className='flex flex-col justify-between min-h-[250px] shadow-xl p-6 rounded-2xl bg-[#120805] border border-amber-950/30 hover:border-amber-900/30 transition-all duration-300 relative group overflow-hidden'>
                                    
                                    <div className="space-y-4">
                                        {/* Rating Stars */}
                                        <div className="flex gap-0.5 text-amber-500">
                                            {Array.from({ length: data.rating }).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-amber-500 stroke-[1.5]" />
                                            ))}
                                        </div>

                                        {/* review text */}
                                        <p className='text-stone-300 text-sm leading-relaxed italic relative z-10'>"{data.text}"</p>
                                    </div>

                                    {/* user details */}
                                    <div className='flex items-center gap-4 mt-6 border-t border-amber-950/20 pt-4'>
                                        <img src={data.img} alt={data.name} className='rounded-full w-12 h-12 object-cover border border-amber-900/30' />
                                        <div>
                                            <h3 className='text-sm font-bold text-amber-100 font-sans'>{data.name}</h3>
                                            <p className="text-[10px] text-stone-500 font-semibold uppercase">{data.role}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Quote Mark background */}
                                    <Quote className="text-amber-900/10 w-20 h-20 absolute -top-2 -right-2 stroke-[1.5] pointer-events-none" />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </motion.div>
            </div>
        </div>
    )
}

export default Testimonials

