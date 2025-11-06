import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const reviewImages = [
  { id: 1, image: "/images/Press/press1.jpg", alt: "Band Ambassadors release for Carnival", description: "Original Multilingual Song For Carnival" },
  { id: 2, image: "/images/Press/press2.jpg", alt: "Band Ambassadors single announcement", description: "New Song Released For Mother Mhadei" },
  { id: 3, image: "/images/Press/press3.jpg", alt: "Band Ambassadors single for Sao Joao", description: "Song For Sao Joao" },
  { id: 4, image: "/images/Press/press4.jpg", alt: "Band Ambassadors release for Carnival theme", description: "Carnival Theme Song Announcement" },
];

const variants = {
  enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
};

export default function Press() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const imageZoom = useRef({ scale: 1, translateX: 0, translateY: 0 });
  const pinchStart = useRef({ distance: 0, scale: 1 });
  const panStart = useRef({ x: 0, y: 0, translateX: 0, translateY: 0 });
  const imageRef = useRef(null);
  const gestureMode = useRef(null);
  const touchStartX = useRef(null);

  const backgroundImages = [
    "/images/Background/back1.jpg",
    "/images/Background/back2.jpg",
    "/images/Background/back3.jpg",
  ];
  const scrollImages = [...backgroundImages, ...backgroundImages];
  const totalScrollDuration = 60;

  const getCurrentIndex = () => reviewImages.findIndex((img) => img.id === selectedImage?.id);

  const showNextImage = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % reviewImages.length;
    setSelectedImage(reviewImages[nextIndex]);
    imageZoom.current = { scale: 1, translateX: 0, translateY: 0 };
    if (imageRef.current) imageRef.current.style.transform = `scale(1) translate(0px, 0px)`;
  };

  const showPrevImage = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex = (currentIndex - 1 + reviewImages.length) % reviewImages.length;
    setSelectedImage(reviewImages[prevIndex]);
    imageZoom.current = { scale: 1, translateX: 0, translateY: 0 };
    if (imageRef.current) imageRef.current.style.transform = `scale(1) translate(0px, 0px)`;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerPage(4);
      else if (window.innerWidth < 1024) setCardsPerPage(2);
      else setCardsPerPage(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [lightboxOpen]);

  const totalPages = Math.ceil(reviewImages.length / cardsPerPage);
  const startIndex = page * cardsPerPage;
  const currentReviews = reviewImages.slice(startIndex, startIndex + cardsPerPage);

  const paginate = (newPage) => {
    if (newPage === page) return;
    setPage([newPage, newPage > page ? 1 : -1]);
  };

  const handleNext = () => { if (page < totalPages - 1) paginate(page + 1); };
  const handlePrev = () => { if (page > 0) paginate(page - 1); };

  const openLightbox = (review) => {
    setSelectedImage(review);
    setLightboxOpen(true);
    imageZoom.current = { scale: 1, translateX: 0, translateY: 0 };
    gestureMode.current = null;
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
    imageZoom.current = { scale: 1, translateX: 0, translateY: 0 };
    gestureMode.current = null;
  };

  const handleCarouselTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleCarouselTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchStart - touchEnd;
    const swipeThreshold = 50;
    if (swipeDistance > swipeThreshold) handleNext();
    else if (swipeDistance < -swipeThreshold) handlePrev();
  };

  const getTouchDistance = (t1, t2) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const updateImageTransform = () => {
    if (!imageRef.current) return;
    const { scale, translateX, translateY } = imageZoom.current;
    imageRef.current.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  };

  const handleLightboxTouchStart = (e) => {
    if (e.touches.length === 2) {
      gestureMode.current = "zoom";
      pinchStart.current = { distance: getTouchDistance(e.touches[0], e.touches[1]), scale: imageZoom.current.scale };
    } else if (e.touches.length === 1) {
      if (imageZoom.current.scale > 1) {
        gestureMode.current = "pan";
        panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, translateX: imageZoom.current.translateX, translateY: imageZoom.current.translateY };
      } else {
        gestureMode.current = "swipe";
        touchStartX.current = e.touches[0].clientX;
      }
    }
  };

  const handleLightboxTouchMove = (e) => {
    if (gestureMode.current === "zoom" && e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      const scale = (distance / pinchStart.current.distance) * pinchStart.current.scale;
      const clampedScale = Math.max(1, Math.min(4, scale));
      imageZoom.current.scale = clampedScale;
      if (clampedScale === 1) { imageZoom.current.translateX = 0; imageZoom.current.translateY = 0; }
      updateImageTransform();
    } else if (gestureMode.current === "pan" && e.touches.length === 1) {
      e.preventDefault();
      const deltaX = e.touches[0].clientX - panStart.current.x;
      const deltaY = e.touches[0].clientY - panStart.current.y;
      const maxTranslate = 200 * imageZoom.current.scale;
      imageZoom.current.translateX = Math.max(-maxTranslate, Math.min(maxTranslate, panStart.current.translateX + deltaX / imageZoom.current.scale));
      imageZoom.current.translateY = Math.max(-maxTranslate, Math.min(maxTranslate, panStart.current.translateY + deltaY / imageZoom.current.scale));
      updateImageTransform();
    }
  };

  const handleLightboxTouchEnd = (e) => {
    if (gestureMode.current === "zoom" || gestureMode.current === "pan") {
      gestureMode.current = null;
      return;
    }
    if (gestureMode.current === "swipe" && touchStartX.current !== null && imageZoom.current.scale <= 1) {
      const touchEnd = e.changedTouches[0].clientX;
      const swipeDistance = touchStartX.current - touchEnd;
      const swipeThreshold = 50;
      if (swipeDistance > swipeThreshold) showNextImage();
      else if (swipeDistance < -swipeThreshold) showPrevImage();
    }
    gestureMode.current = null;
    touchStartX.current = null;
  };

  return (
    <>
      <style>{`@keyframes infinite-scroll-full { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }`}</style>

      <section id="press" className="min-h-screen py-20 flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/80" />

        <div className="absolute inset-0 -z-10 overflow-hidden w-full h-full">
          <div
            className="absolute left-0 top-0 flex"
            style={{
              width: `calc(100vw * ${scrollImages.length})`,
              height: "100%",
              animation: `infinite-scroll-full ${totalScrollDuration}s linear infinite`,
              animationDirection: "reverse",
              animationPlayState: lightboxOpen ? "paused" : "running",
              willChange: "transform",
              transform: "translate3d(0,0,0)",
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

        <div className="relative z-10 text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="text-white">IN THE</span>
            <span className="text-band-yellow"> PRESS</span>
          </h2>
          <div className="w-24 h-1 bg-band-yellow mx-auto mb-6 sm:mb-8" />
          <p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto">Read our coverage, releases and announcements from Band Ambassadors</p>
          <p className="text-sm text-gray-400 mt-2">Pinch to zoom • Drag to pan (mobile)</p>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-4">
          <div className="w-full h-[520px] md:h-[380px] lg:h-[350px] overflow-hidden relative" onTouchStart={handleCarouselTouchStart} onTouchEnd={handleCarouselTouchEnd}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2"
              >
                {currentReviews.map((review) => (
                  <motion.div key={review.id} className="group relative bg-black/30 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden cursor-pointer h-full" whileHover={{ y: -5 }} onClick={() => openLightbox(review)}>
                    <div className="relative h-full min-h-[200px] overflow-hidden">
                      <img src={review.image} alt={review.alt} className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://via.placeholder.com/400x300/1a1a1a/FFD700?text=Review+${review.id}`; }} />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white text-sm font-medium">{review.description}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.1)" }} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={handlePrev} disabled={page === 0} className={`p-2 rounded-full transition-all duration-300 ${page === 0 ? "bg-white/10 text-gray-500 cursor-not-allowed" : "bg-black/40 text-gray-300 hover:text-white hover:bg-band-yellow/20"}`}><ChevronLeft className="w-6 h-6" /></button>

            <div className="flex justify-center gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => paginate(i)} aria-label={`Go to page ${i + 1}`} className={`w-4 h-4 transform rotate-45 inline-flex items-center justify-center transition-all duration-300 focus:outline-none ${page === i ? "bg-band-yellow scale-110" : "bg-white/30 hover:bg-white/50"}`} style={{ borderRadius: "6px" }}>
                  <span className="block w-full h-full transform -rotate-45" aria-hidden="true" />
                </button>
              ))}
            </div>

            <button onClick={handleNext} disabled={page === totalPages - 1} className={`p-2 rounded-full transition-all duration-300 ${page === totalPages - 1 ? "bg-white/10 text-gray-500 cursor-not-allowed" : "bg-black/40 text-gray-300 hover:text-white hover:bg-band-yellow/20"}`}><ChevronRight className="w-6 h-6" /></button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onTouchStart={handleLightboxTouchStart} onTouchMove={handleLightboxTouchMove} onTouchEnd={handleLightboxTouchEnd} className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8" style={{ touchAction: "none" }} onClick={closeLightbox}>
            <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} onClick={closeLightbox} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition-all duration-200 z-50"><X size={24} /></motion.button>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative max-w-4xl max-h-[90vh] mx-auto flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full flex items-center justify-center overflow-hidden h-[50vh] md:h-[70vh] lg:h-[80vh]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img ref={imageRef} key={selectedImage.id} src={selectedImage.image} alt={selectedImage.alt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" style={{ willChange: "transform", touchAction: "none", transformOrigin: "center center" }} draggable={false} />
                </AnimatePresence>
              </div>

              <div className="mt-4 p-4 bg-black/60 rounded-lg text-center flex items-center justify-center space-x-4">
                <button onClick={(e) => { e.stopPropagation(); showPrevImage(); }} className="p-2 bg-black/40 rounded-full text-gray-300 hover:text-white hover:bg-band-yellow/20 transition-all duration-300"><ChevronLeft className="w-5 h-5" /></button>
                <p className="text-white text-lg font-medium">{selectedImage.description}</p>
                <button onClick={(e) => { e.stopPropagation(); showNextImage(); }} className="p-2 bg-black/40 rounded-full text-gray-300 hover:text-white hover:bg-band-yellow/20 transition-all duration-300"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
