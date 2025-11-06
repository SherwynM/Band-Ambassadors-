import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
    { id: 1, src: '/images/Gallery/img1.jpg', caption: 'Live at Mikeys' },
    { id: 2, src: '/images/Gallery/img2.jpg', caption: "Live at Bebde's " },
    { id: 3, src: '/images/Gallery/img3.WEBP', caption: 'Crowd Vibes' },
    { id: 4, src: '/images/Gallery/img4.jpg', caption: 'Sound Check' },
    { id: 5, src: '/images/Gallery/img5.jpg', caption: 'Stage Lights' },
    { id: 6, src: '/images/Gallery/img6.jpg', caption: 'High Energy' },
];

const backgroundImages = [
    "/images/Background/back2.jpg",
    "/images/Background/back3.jpg",
];
const scrollImages = [...backgroundImages, ...backgroundImages];
const totalScrollDuration = 60; 

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    const imageZoom = useRef({ scale: 1, translateX: 0, translateY: 0 });
    const pinchStart = useRef({ distance: 0, scale: 1 });
    const panStart = useRef({ x: 0, y: 0, translateX: 0, translateY: 0 });
    const imageRef = useRef(null);
    const gestureMode = useRef(null);
    const touchStartX = useRef(null);

    const LB_SWIPE_THRESHOLD = 50;

    const preloadImage = useCallback((url) => {
        if (typeof window !== 'undefined') { 
            const img = new window.Image(); 
            img.src = url;
        }
    }, []);

    const lockScroll = (shouldLock) => {
        if (shouldLock) {
            document.body.classList.add('lightbox-open');
        } else {
            document.body.classList.remove('lightbox-open');
        }
    };

    const openLightbox = (image) => {
        setSelectedImage(image);
        lockScroll(true);
        imageZoom.current = { scale: 1, translateX: 0, translateY: 0 };
        gestureMode.current = null;
    };

    const closeLightbox = useCallback(() => {
        setSelectedImage(null);
        lockScroll(false);
        imageZoom.current = { scale: 1, translateX: 0, translateY: 0 };
        gestureMode.current = null;
    }, []);

    const navigateImage = useCallback((direction) => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        let newIndex;

        if (direction === 'next') {
            if (currentIndex < galleryImages.length - 1) { 
                newIndex = currentIndex + 1;
            } else {
                return; 
            }
        } else if (direction === 'prev') {
            if (currentIndex > 0) { 
                newIndex = currentIndex - 1;
            } else {
                return; 
            }
        }
        
        setSelectedImage(galleryImages[newIndex]);
        imageZoom.current = { scale: 1, translateX: 0, translateY: 0 };
        if (imageRef.current) {
            imageRef.current.style.transform = `scale(1) translate(0px, 0px)`;
        }
    }, [selectedImage]);

    useEffect(() => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = currentIndex + 1;
        if (nextIndex < galleryImages.length) {
            preloadImage(galleryImages[nextIndex].src);
        }
    }, [selectedImage, preloadImage]); 
    
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!selectedImage) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                navigateImage('next');
            } else if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedImage, closeLightbox, navigateImage]);

    useEffect(() => {
        return () => lockScroll(false);
    }, []);

    const getTouchDistance = (touch1, touch2) => {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const updateImageTransform = () => {
        if (imageRef.current) {
            const { scale, translateX, translateY } = imageZoom.current;
            imageRef.current.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }
    };

    const lbOnTouchStart = (e) => {
        if (e.touches.length === 2) {
            gestureMode.current = 'zoom';
            const distance = getTouchDistance(e.touches[0], e.touches[1]);
            pinchStart.current = {
                distance: distance,
                scale: imageZoom.current.scale
            };
        } else if (e.touches.length === 1) {
            if (imageZoom.current.scale > 1) {
                gestureMode.current = 'pan';
                panStart.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    translateX: imageZoom.current.translateX,
                    translateY: imageZoom.current.translateY
                };
            } else {
                gestureMode.current = 'swipe';
                touchStartX.current = e.touches[0].clientX;
            }
        }
    };

    const lbOnTouchMove = (e) => {
        if (gestureMode.current === 'zoom' && e.touches.length === 2) {
            e.preventDefault();
            const distance = getTouchDistance(e.touches[0], e.touches[1]);
            const scale = (distance / pinchStart.current.distance) * pinchStart.current.scale;
            const clampedScale = Math.max(1, Math.min(4, scale));
            
            imageZoom.current.scale = clampedScale;
            
            if (clampedScale === 1) {
                imageZoom.current.translateX = 0;
                imageZoom.current.translateY = 0;
            }
            
            updateImageTransform();
        } else if (gestureMode.current === 'pan' && e.touches.length === 1) {
            e.preventDefault();
            const deltaX = e.touches[0].clientX - panStart.current.x;
            const deltaY = e.touches[0].clientY - panStart.current.y;
            
            const maxTranslate = 200 * imageZoom.current.scale;
            imageZoom.current.translateX = Math.max(-maxTranslate, Math.min(maxTranslate, panStart.current.translateX + deltaX / imageZoom.current.scale));
            imageZoom.current.translateY = Math.max(-maxTranslate, Math.min(maxTranslate, panStart.current.translateY + deltaY / imageZoom.current.scale));
            
            updateImageTransform();
        }
    };

    const lbOnTouchEnd = (e) => {
        if (gestureMode.current === 'zoom' || gestureMode.current === 'pan') {
            gestureMode.current = null;
            return;
        }

        if (gestureMode.current === 'swipe' && touchStartX.current !== null && imageZoom.current.scale <= 1) {
            const touchEnd = e.changedTouches[0].clientX;
            const swipeDistance = touchStartX.current - touchEnd;
            
            if (swipeDistance > LB_SWIPE_THRESHOLD) {
                navigateImage('next');
            } else if (swipeDistance < -LB_SWIPE_THRESHOLD) {
                navigateImage('prev');
            }
        }
        
        gestureMode.current = null;
        touchStartX.current = null;
    };

    const LightboxPortal = () => {
        if (!selectedImage) return null;
        const currentImageIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const isFirstImage = currentImageIndex === 0;
        const isLastImage = currentImageIndex === galleryImages.length - 1;

        return (
            <motion.div
                key="lightbox-root" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[9999]"
                onClick={(e) => {
                    if (e.currentTarget === e.target) {
                        closeLightbox();
                    }
                }}
                onTouchStart={lbOnTouchStart}
                onTouchMove={lbOnTouchMove}
                onTouchEnd={lbOnTouchEnd}
                style={{ touchAction: 'none' }}
            >
                <motion.button
                    aria-label="Close lightbox"
                    onClick={(e) => {
                        e.stopPropagation();
                        closeLightbox();
                    }}
                    className="absolute top-4 right-4 z-[10000] text-white hover:text-band-yellow hover:bg-white/10 w-12 h-12 flex items-center justify-center rounded-full transition-colors"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                >
                    <X className="w-8 h-8" />
                </motion.button>

                <motion.div
                    className="relative max-w-full max-h-[95vh] flex flex-col items-center text-white"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center overflow-hidden h-[45vh] md:h-[75vh] lg:h-[90vh]">
                        <AnimatePresence mode="wait">
                            <motion.img
                                ref={imageRef}
                                key={selectedImage.id}
                                src={selectedImage.src}
                                alt={selectedImage.caption}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-auto h-full max-w-full object-contain rounded-lg shadow-2xl"
                                style={{ 
                                    willChange: 'transform',
                                    transformOrigin: 'center center',
                                    touchAction: 'none'
                                }}
                                draggable={false}
                            />
                        </AnimatePresence>
                    </div>

                    <div id="lightbox-caption-nav-container" className="relative p-2 text-center w-full max-w-full min-h-[56px] mt-3">
                        <h3 className="text-white font-bold text-xl sm:text-2xl mb-3">
                            {selectedImage.caption}
                        </h3>
                        <div className="flex items-center justify-center space-x-2"> 
                            <motion.button
                                aria-label="Previous image"
                                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                                disabled={isFirstImage} 
                                className={`z-[10000] w-12 h-12 flex items-center justify-center rounded-full transition-colors p-2 
                                    ${isFirstImage 
                                        ? 'text-gray-600 cursor-not-allowed' 
                                        : 'text-white hover:text-band-yellow hover:bg-white/10'}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>

                            <p className="text-gray-300 text-xl font-mono px-4 py-2 bg-white/5 rounded-full min-w-[100px] transition-opacity duration-200">
                                {currentImageIndex + 1} / {galleryImages.length}
                            </p>

                            <motion.button
                                aria-label="Next image"
                                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                                disabled={isLastImage}
                                className={`z-[10000] w-12 h-12 flex items-center justify-center rounded-full transition-colors p-2
                                    ${isLastImage 
                                        ? 'text-gray-600 cursor-not-allowed' 
                                        : 'text-white text-bold hover:text-band-yellow hover:bg-white/10'}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div> 
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <>
            <style>{`
                @keyframes infinite-scroll-seamless {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100vw * ${backgroundImages.length})); }
                }
                .lightbox-open {
                    overflow: hidden !important; 
                }
            `}</style>

            <section id="gallery" className="pt-20 pb-6 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden bg-gray-900/30">
                <div className="absolute inset-0 z-0 bg-black/70"></div> 
                <div className="absolute inset-0 -z-10 overflow-hidden w-full h-full">
                    <div
                        className="absolute left-0 top-0 flex"
                        style={{
                            width: `calc(100vw * ${scrollImages.length})`,
                            height: "100%",
                            animation: `infinite-scroll-seamless ${totalScrollDuration}s linear infinite`,
                        }}
                    >
                        {scrollImages.map((src, index) => (
                            <div
                                key={index}
                                className="w-[100vw] min-w-[100vw] h-full bg-cover bg-center flex-shrink-0 opacity-80"
                                style={{ backgroundImage: `url(${src})` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-6">
                            <span className="text-white">VISUAL</span>
                            <span className="text-band-yellow"> STORIES</span>
                        </h2>
                        <div className="w-24 h-1 bg-band-yellow mx-auto mb-2 sm:mb-8"></div>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                            Capture the essence of our journey through powerful visuals.
                        </p>
                        <p className="text-sm text-gray-400 mt-2">Pinch to zoom • Drag to pan when zoomed</p>
                    </div>

                    <div className="relative w-full flex items-center justify-center">
                        <div className="w-full min-h-[18vw] overflow-hidden relative">
                            <div className="grid grid-cols-6 gap-2 sm:gap-2 place-items-center max-w-[calc(100%-82px)] mx-auto px-1 lg:px-5 sm:px-1">
                                {galleryImages.map((image) => (
                                    <div
                                        key={image.id}
                                        className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
                                        onClick={() => openLightbox(image)}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.caption}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-all duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {createPortal(
                <AnimatePresence>
                    {selectedImage && <LightboxPortal />}
                </AnimatePresence>, 
                document.body
            )}
        </>
    );
}
