import { useState, useRef, useEffect, useCallback } from "react";
import { Youtube, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const badAppleVideos = [
  { title: "Guns N' Roses - Sweet Child O' Mine", youtubeUrl: "https://www.youtube.com/watch?v=1w7OgIMMRc4" },
];

const badApplePictures = [
  { id: 1, src: '/images/Gallery/img1.jpg', caption: 'Live at Mikeys' },
  { id: 2, src: '/images/sherwyn_drum.jpg', caption: "Live at Bebde's" },
  { id: 3, src: '/images/pic4.jpg', caption: 'Crowd Vibes' },
  { id: 4, src: '/images/DSC_8442.JPG', caption: 'Sound Check' },
  { id: 5, src: '/images/pic3.jpg', caption: 'Stage Lights' },
  { id: 6, src: '/images/DSC_8442.JPG', caption: 'High Energy' },
  { id: 7, src: '/images/gallery-1.jpg', caption: 'On The Keys' },
  { id: 8, src: '/images/DSC_8442.JPG', caption: 'Studio Session' },
  { id: 9, src: '/images/sherwyn_drum.JPG', caption: 'Focused' },
  { id: 10, src: '/images/pic3.jpg', caption: 'Vibes' },
  { id: 11, src: '/images/sherwyn_drum.JPG', caption: 'The Lineup' },
  { id: 12, src: '/images/gallery-1.jpg', caption: 'From The Back' },
  { id: 13, src: '/images/pic4.JPG', caption: 'Behind The Scenes' },
  { id: 14, src: '/images/sherwyn_drum.JPG', caption: 'In The Moment' },
];

const VIDEOS_PER_PAGE = 4;
const PICTURES_PER_PAGE = 6;

export default function BadApple() {
  const [activeTab, setActiveTab] = useState("videos");
  const [videosCurrentPage, setVideosCurrentPage] = useState(1);
  const [picturesCurrentPage, setPicturesCurrentPage] = useState(1);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const overlayRef = useRef(null);

  const [mainDirection, setMainDirection] = useState(0);

  const totalVideoPages = Math.ceil(badAppleVideos.length / VIDEOS_PER_PAGE);
  const totalPicturePages = Math.ceil(badApplePictures.length / PICTURES_PER_PAGE);

  const currentVideos = badAppleVideos.slice((videosCurrentPage - 1) * VIDEOS_PER_PAGE, videosCurrentPage * VIDEOS_PER_PAGE);
  const currentPictures = badApplePictures.slice((picturesCurrentPage - 1) * PICTURES_PER_PAGE, picturesCurrentPage * PICTURES_PER_PAGE);

  const getTabClasses = (tabName) => {
    const base = "py-3 px-6 text-lg font-black transition-all duration-300 rounded-t-lg cursor-pointer border-b-4";
    const active = "text-red-500 border-red-500 bg-black/30 scale-105";
    const inactive = "text-gray-400 border-transparent hover:text-white hover:border-red-500/50";
    return `${base} ${activeTab === tabName ? active : inactive}`;
  };

  const arrowBtnClass = (isDisabled) => {
    const base = "p-2 rounded-full bg-black/30 text-red-500 transition-all duration-200";
    const enabled = "hover:bg-red-500/20 hover:text-white";
    const disabled = "opacity-50 cursor-not-allowed";
    return `${base} ${isDisabled ? disabled : enabled}`;
  };

  const contentVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1, transition: { duration: 0.48, ease: [0.2, 0.8, 0.2, 1] } },
    exit: (dir) => ({ x: dir > 0 ? "-30%" : "30%", opacity: 0, transition: { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] } }),
  };

  const fadeVariants = { enter: { opacity: 0 }, center: { opacity: 1, transition: { duration: 0.36 } }, exit: { opacity: 0, transition: { duration: 0.28 } } };

  // ---- make prev/next stable with useCallback to satisfy eslint deps ----
  const goPrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev <= 0) return prev;
      const newIdx = prev - 1;
      setPicturesCurrentPage(Math.floor(newIdx / PICTURES_PER_PAGE) + 1);
      return newIdx;
    });
  }, []);

  const goNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev >= badApplePictures.length - 1) return prev;
      const newIdx = prev + 1;
      setPicturesCurrentPage(Math.floor(newIdx / PICTURES_PER_PAGE) + 1);
      return newIdx;
    });
  }, []);

  const openLightboxAt = (globalIndex) => {
    setPicturesCurrentPage(Math.floor(globalIndex / PICTURES_PER_PAGE) + 1);
    setLightboxIndex(globalIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const onOverlayPointerDown = (e) => { if (e.target === overlayRef.current) closeLightbox(); };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrevLightbox();
      if (e.key === "ArrowRight") goNextLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, goPrevLightbox, goNextLightbox]);

  // touch handling for lightbox image
  const touchStart = useRef({ x: null, y: null });
  const touchDelta = useRef({ x: 0, y: 0 });
  const imgThreshold = 40;

  const onTouchStart = (e) => { touchStart.current.x = e.touches?.[0]?.clientX ?? null; touchStart.current.y = e.touches?.[0]?.clientY ?? null; touchDelta.current.x = 0; touchDelta.current.y = 0; };
  const onTouchMove = (e) => {
    if (touchStart.current.x === null) return;
    const x = e.touches?.[0]?.clientX ?? 0; const y = e.touches?.[0]?.clientY ?? 0;
    touchDelta.current.x = x - touchStart.current.x; touchDelta.current.y = y - touchStart.current.y;
  };
  const onTouchEnd = () => {
    const dx = touchDelta.current.x; const dy = touchDelta.current.y;
    touchStart.current.x = null; touchStart.current.y = null; touchDelta.current.x = 0; touchDelta.current.y = 0;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dx <= -imgThreshold) goNextLightbox();
    else if (dx >= imgThreshold) goPrevLightbox();
  };

  // main grid swipe for pages
  const mainTouchStart = useRef({ x: null, y: null });
  const mainTouchDelta = useRef({ x: 0, y: 0 });
  const mainSwipeThreshold = 50;
  const onMainTouchStart = (e) => { mainTouchStart.current.x = e.touches?.[0]?.clientX ?? null; mainTouchStart.current.y = e.touches?.[0]?.clientY ?? null; mainTouchDelta.current.x = 0; mainTouchDelta.current.y = 0; };
  const onMainTouchMove = (e) => {
    if (mainTouchStart.current.x === null) return;
    const x = e.touches?.[0]?.clientX ?? 0; const y = e.touches?.[0]?.clientY ?? 0;
    mainTouchDelta.current.x = x - mainTouchStart.current.x; mainTouchDelta.current.y = y - mainTouchStart.current.y;
  };
  const onMainTouchEnd = () => {
    const dx = mainTouchDelta.current.x; const dy = mainTouchDelta.current.y;
    mainTouchStart.current.x = null; mainTouchStart.current.y = null; mainTouchDelta.current.x = 0; mainTouchDelta.current.y = 0;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dx <= -mainSwipeThreshold) { setMainDirection(1); setPicturesCurrentPage(p => Math.min(totalPicturePages, p + 1)); }
    else if (dx >= mainSwipeThreshold) { setMainDirection(-1); setPicturesCurrentPage(p => Math.max(1, p - 1)); }
  };

  useEffect(() => {
    if (lightboxOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevPaddingRight = document.body.style.paddingRight || "";
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prevOverflow; document.body.style.paddingRight = prevPaddingRight; };
    }
  }, [lightboxOpen]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 sm:mb-10">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 sm:mb-6" style={{ textShadow: "0 0 15px rgba(255, 0, 0, 0.5)" }}>
          <span className="text-white">BAD</span>
          <span className="text-red-500"> APPLE</span>
        </h2>
        <div className="w-24 h-1 bg-red-500 mx-auto mb-6 sm:mb-8" />
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">Unleashing a harder edge. This is our rock side project.</p>
      </div>

      <div className="max-w-5xl mx-auto px-2">
        <div className="flex justify-center gap-4 sm:gap-8 mb-8">
          <div className={getTabClasses("videos")} onClick={() => setActiveTab("videos")}>Videos</div>
          <div className={getTabClasses("pictures")} onClick={() => setActiveTab("pictures")}>Pictures</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={contentVariants} initial="hidden" animate="visible" exit="hidden">
            {activeTab === 'videos' && (
              <div>
                <div className="space-y-4 min-h-[380px]">
                  {currentVideos.map((video, index) => (
                    <a key={index} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm border border-red-500/20 rounded-lg hover:bg-black/70 hover:border-red-500/60 transition-all duration-300 group">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 flex-shrink-0 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-black transition-colors duration-300">
                          <Youtube className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-white text-base truncate">{video.title}</h4>
                      </div>
                    </a>
                  ))}
                </div>

                {totalVideoPages > 1 && (
                  <div className="flex justify-center mt-8 gap-4">
                    <button onClick={() => setVideosCurrentPage(p => Math.max(1, p - 1))} disabled={videosCurrentPage === 1} className={arrowBtnClass(videosCurrentPage === 1)} aria-disabled={videosCurrentPage === 1}>
                      <ChevronLeft />
                    </button>

                    <span className="flex items-center text-sm font-semibold text-gray-400">Page {videosCurrentPage} of {totalVideoPages}</span>

                    <button onClick={() => setVideosCurrentPage(p => Math.min(totalVideoPages, p + 1))} disabled={videosCurrentPage === totalVideoPages} className={arrowBtnClass(videosCurrentPage === totalVideoPages)} aria-disabled={videosCurrentPage === totalVideoPages}>
                      <ChevronRight />
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pictures' && (
              <div>
                <div className="min-h-[380px] w-full overflow-hidden" onTouchStartCapture={onMainTouchStart} onTouchMoveCapture={onMainTouchMove} onTouchEndCapture={onMainTouchEnd} style={{ touchAction: "pan-y" }}>
                  <div className="w-full overflow-hidden">
                    <AnimatePresence initial={false} custom={mainDirection} mode="wait">
                      <motion.div key={picturesCurrentPage} custom={mainDirection} variants={slideVariants} initial="enter" animate="center" exit="exit" className="w-full">
                        <div className="grid grid-cols-4 lg:grid-cols-6 gap-4 w-full">
                          {currentPictures.map((pic, idxOnPage) => {
                            const globalIndex = (picturesCurrentPage - 1) * PICTURES_PER_PAGE + idxOnPage;
                            const total = currentPictures.length;
                            const fullRows = Math.floor(total / 4);
                            const startIndex = fullRows * 4;
                            const remainder = total % 4;
                            let mobileSpanClass = "";

                            if (idxOnPage >= startIndex && remainder !== 0) {
                              if (remainder === 1) { if (idxOnPage === startIndex) mobileSpanClass = "col-span-4"; }
                              else if (remainder === 2) { mobileSpanClass = "col-span-2"; }
                              else if (remainder === 3) { if (idxOnPage === startIndex) mobileSpanClass = "col-span-2"; }
                            }

                            const spanClasses = `${mobileSpanClass} lg:col-span-1`;

                            return (
                              <div key={pic.id} className={`group relative rounded-lg overflow-hidden border-2 border-transparent hover:border-red-500 transition-all duration-300 min-w-0 ${spanClasses} h-28 sm:h-36 lg:h-24 lg:flex lg:items-center lg:justify-center`}>
                                <button onClick={() => openLightboxAt(globalIndex)} className="w-full h-full p-0 m-0 text-left" aria-label={`Open image ${pic.caption}`} style={{ background: "transparent", border: "none" }}>
                                  <img src={pic.src} alt={pic.caption} className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300 bg-black/20" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/160x90/000000/ffffff?text=Bad+Apple"; }} />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                                  <div className="absolute inset-0 flex flex-col justify-end bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white font-semibold text-sm truncate">{pic.caption}</p>
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {totalPicturePages > 1 && (
                  <div className="flex justify-center mt-8 gap-4">
                    <button onClick={() => { setMainDirection(-1); setPicturesCurrentPage(p => Math.max(1, p - 1)); }} disabled={picturesCurrentPage === 1} className={arrowBtnClass(picturesCurrentPage === 1)} aria-disabled={picturesCurrentPage === 1}><ChevronLeft /></button>
                    <span className="flex items-center text-sm font-semibold text-gray-400">Page {picturesCurrentPage} of {totalPicturePages}</span>
                    <button onClick={() => { setMainDirection(1); setPicturesCurrentPage(p => Math.min(totalPicturePages, p + 1)); }} disabled={picturesCurrentPage === totalPicturePages} className={arrowBtnClass(picturesCurrentPage === totalPicturePages)} aria-disabled={picturesCurrentPage === totalPicturePages}><ChevronRight /></button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div ref={overlayRef} onMouseDown={onOverlayPointerDown} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.99, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.99, opacity: 0 }} transition={{ duration: 0.18 }} className="relative max-w-[95vw] w-full mx-4 lg:mx-8 lg:translate-y-12" style={{ maxHeight: "90vh" }}>
              <div className="hidden lg:flex lg:items-center lg:justify-between lg:absolute lg:inset-0 lg:px-2 pointer-events-none">
                <button onClick={(e) => { e.stopPropagation(); goPrevLightbox(); }} disabled={lightboxIndex === 0} className={`${arrowBtnClass(lightboxIndex === 0)} absolute left-2 top-1/2 -translate-y-1/2 z-50`} aria-disabled={lightboxIndex === 0} style={{ background: "rgba(0,0,0,0.45)", pointerEvents: lightboxIndex === 0 ? "none" : "auto" }}><ChevronLeft /></button>
                <button onClick={(e) => { e.stopPropagation(); goNextLightbox(); }} disabled={lightboxIndex === badApplePictures.length - 1} className={`${arrowBtnClass(lightboxIndex === badApplePictures.length - 1)} absolute right-2 top-1/2 -translate-y-1/2 z-50`} aria-disabled={lightboxIndex === badApplePictures.length - 1} style={{ background: "rgba(0,0,0,0.45)", pointerEvents: lightboxIndex === badApplePictures.length - 1 ? "none" : "auto" }}><ChevronRight /></button>
              </div>

              <button onClick={closeLightbox} aria-label="Close" className="absolute right-2 top-2 z-60 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white"><X /></button>

              <div className="w-fit max-w-full mx-auto flex items-center justify-center select-none p-0" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onMouseDown={(e) => e.stopPropagation()} role="presentation">
                <div className="w-full flex items-center justify-center h-[60vh] lg:h-auto" style={{ maxHeight: "72vh" }}>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div key={lightboxIndex} variants={fadeVariants} initial="enter" animate="center" exit="exit" className="w-full flex items-center justify-center" style={{ display: "flex", pointerEvents: "auto" }}>
                      <img src={badApplePictures[lightboxIndex].src} alt={badApplePictures[lightboxIndex].caption} className="max-w-full max-h-[60vh] lg:max-h-[72vh] object-contain" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/800x600/000000/ffffff?text=Bad+Apple"; }} draggable={false} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-2 lg:mt-3 md:mt-4 sm:mt-4 text-center text-sm text-gray-200 relative z-40">
                <div className="font-semibold">{badApplePictures[lightboxIndex].caption}</div>

                <div className="flex items-center justify-center gap-3 mt-1 lg:hidden z-50">
                  <button onClick={() => goPrevLightbox()} disabled={lightboxIndex === 0} className={`p-2 rounded-full bg-black/30 text-red-500 ${lightboxIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500/20 hover:text-white"}`} aria-disabled={lightboxIndex === 0}><ChevronLeft /></button>
                  <div className="text-xs text-gray-400">{lightboxIndex + 1} / {badApplePictures.length}</div>
                  <button onClick={() => goNextLightbox()} disabled={lightboxIndex === badApplePictures.length - 1} className={`p-2 rounded-full bg-black/30 text-red-500 ${lightboxIndex === badApplePictures.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500/20 hover:text-white"}`} aria-disabled={lightboxIndex === badApplePictures.length - 1}><ChevronRight /></button>
                </div>

                <div className="hidden lg:block text-xs text-gray-400 mt-1">{lightboxIndex + 1} / {badApplePictures.length}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
