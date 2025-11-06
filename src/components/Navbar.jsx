import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Music', href: '#music' },
    { name: 'About', href: '#about' },
    { name: 'Gigs', href: '#gigs' },
    { name: 'Press', href: '#press'},
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
];

// Configuration for the two diagonal sparkle streak elements
const SPARKLE_WIPE_COUNT = 2; 

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const sparkleRef = useRef(null); 
    const navContentRef = useRef(null); 

    // Updated navBgClass: Removed the gradient for a flatter, dark background with blur.
    const navBgClass = "bg-gradient-to-b from-gray-950/95 to-black/80 backdrop-blur-md border-b border-white/10 border-t border-yellow-400/10 shadow-lg";

    const scrollToSection = (sectionId) => {
        // Simple scroll to section, assuming sections have IDs matching the href
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
    };

    const menuVariants = {
        hidden: { x: '-100%' },
        visible: { 
            x: 0,
            transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
        },
        exit: { 
            x: '-100%',
            transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };
    
    const navContainerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.2,
            },
        },
    };

    const handleDragEnd = (event, info) => {
        // Close menu if dragged left aggressively
        if (info.velocity.x < -100) {
            setIsOpen(false);
        }
    };

    // Diagonal Sparkle Streak Injection
    useEffect(() => {
        if (!sparkleRef.current) return;

        const container = sparkleRef.current;
        container.innerHTML = ''; 

        // 1. Create the two diagonal light streaks
        for (let i = 0; i < SPARKLE_WIPE_COUNT; i++) {
             const streak = document.createElement('div');
             // streak-1 sweeps from Top-Left to Bottom-Right
             // streak-2 sweeps from Bottom-Left to Top-Right
             streak.className = `sparkle-streak-${i + 1}`; 
             container.appendChild(streak);
        }
    }, []);

    return (
        <>
            <style>{`
                /* --- Text Effects (Kept for Logo) --- */
                .gradient-text {
                background: linear-gradient(90deg, #FFD700, #FFFFFF);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                }
                .checkerboard-text {
                background-color: white;
                background-image:
                    linear-gradient(45deg, black 25%, transparent 25%),
                    linear-gradient(-45deg, black 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, black 75%),
                    linear-gradient(-45deg, transparent 75%, black 75%);
                background-size: 8px 8px;
                background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
                animation: move-checkerboard 10s linear infinite;
                }
                @keyframes move-checkerboard {
                0% { background-position: 0 0, 0 4px, 4px -4px, -4px 0px; }
                100% { background-position: 80px 0, 80px 4px, 84px -4px, 76px 0px; }
                }

                /* --- High-Energy Diagonal Sparkle Streak Effect --- */
                .sparkle-container {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    overflow: hidden;
                    pointer-events: none;
                }

                /* General style for the streaks */
                .sparkle-streak-1, .sparkle-streak-2 {
                    position: absolute;
                    width: 300px; /* INCREASED: Wider streak for more visibility */
                    height: 100px; 
                    
                    /* Highly blurred light source for the sparkle/zip effect */
                    background: radial-gradient(circle at center, 
                        rgba(255, 255, 255, 0.9) 0%, /* White core */
                        #FFD700 30%, /* Gold center */
                        rgba(255, 255, 255, 0) 60% /* Hard fade out */
                    );
                    
                    opacity: 0;
                    filter: blur(8px); /* INCREASED: Much higher blur for a strong glow effect */
                    transform-origin: 0 0; 
                    box-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 0 15px rgba(255, 255, 255, 0.8); /* Stronger shadow */
                    z-index: 55;
                    display: block; /* CHANGE: Removed media query to show on mobile too */
                }
                

                /* Streak 1: Top-Left to Bottom-Right Swipe */
                .sparkle-streak-1 {
                    transform: translate(-100%, -100%) rotate(135deg); /* Start off top-left corner */
                    animation: diagonal-swipe-1 5s linear infinite; 
                }

                @keyframes diagonal-swipe-1 {
                    /* Start: Off-screen, invisible (Top-Left) */
                    0%, 100% { 
                        transform: translate(-100px, -100px) rotate(135deg); 
                        opacity: 0;
                    }
                    /* Flash On */
                    5% { opacity: 1; } /* INCREASED: Full opacity */
                    /* Swipe Across (To Bottom-Right) */
                    25% { 
                        transform: translate(calc(100vw + 100px), calc(100% + 100px)) rotate(135deg); 
                        opacity: 1; /* INCREASED: Full opacity */
                    }
                    /* Flash Off Quickly */
                    30% { opacity: 0; }
                    /* Pause for the rest of the loop */
                }

                /* Streak 2: Bottom-Left to Top-Right Swipe (Opposite Corner) */
                .sparkle-streak-2 {
                    transform: translate(-100%, 100%) rotate(45deg); /* Start off bottom-left corner */
                    animation: diagonal-swipe-2 5s linear infinite;
                    animation-delay: 2.5s; /* Stagger the second streak */
                }

                @keyframes diagonal-swipe-2 {
                    /* Start: Off-screen, invisible (Bottom-Left) */
                    0%, 100% { 
                        transform: translate(-100px, 100%) rotate(45deg); 
                        opacity: 0;
                    }
                    /* Flash On */
                    5% { opacity: 1; } /* INCREASED: Full opacity */
                    /* Swipe Across (To Top-Right) */
                    25% { 
                        transform: translate(calc(100vw + 100px), -100%) rotate(45deg); 
                        opacity: 1; /* INCREASED: Full opacity */
                    }
                    /* Flash Off Quickly */
                    30% { opacity: 0; }
                    /* Pause for the rest of the loop */
                }
            `}</style>

            <header
                className={`fixed w-full z-50 transition-all duration-300 ${navBgClass}`}
            >
                {/* Sparkle Trail Container */}
                <div 
                    ref={sparkleRef} 
                    className="sparkle-container"
                >
                    {/* The sparkle-streak elements are injected here */}
                </div>

                <div 
                    ref={navContentRef}
                    className='relative flex justify-between items-center h-14 sm:h-14 max-w-[1650px] mx-auto px-4 text-white'
                >
                    <a 
                        href="#hero"
                        onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
                        className="text-xl font-extrabold tracking-widest text-white uppercase transition-colors hover:text-yellow-400"
                    >
                        {/* Logo kept the existing color effects */}
                        <span className="gradient-text">Band Amba</span><span className="checkerboard-text">ssadors</span>
                    </a>
                    
                    {/* Desktop Menu */}
                    <nav className="hidden xlNav:flex font-bold items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.href.substring(1))}
                                className="px-1 text-sm font-semibold uppercase tracking-wider text-gray-300 hover:text-yellow-400 transition-all duration-200 relative group"
                            >
                                {item.name}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Icon */}
                    <div className="xlNav:hidden z-[60]">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isOpen ? 'x' : 'menu'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </header>
            
            {/* Mobile Menu (unchanged) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="xlNav:hidden fixed inset-0 bg-black/60 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="xlNav:hidden fixed top-0 left-0 w-[60%] max-w-sm h-full bg-gradient-to-b from-black z-50 p-6 shadow-2xl shadow-yellow-500/10"
                            drag="x" 
                            dragConstraints={{ left: 0, right: 0 }} 
                            dragElastic={0.2} 
                            onDragEnd={handleDragEnd} 
                        >
                            <motion.nav 
                                variants={navContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-col space-y-2"
                            >
                                {navItems.map((item) => (
                                    <motion.button
                                        key={item.name}
                                        variants={itemVariants}
                                        onClick={() => scrollToSection(item.href.substring(1))}
                                        className="text-2xl text-left font-semibold tracking-wider text-gray-200 hover:text-yellow-400 p-4 rounded-md hover:bg-white/5 transition-all duration-200"
                                    >
                                        {item.name}
                                    </motion.button>
                                ))}
                            </motion.nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}