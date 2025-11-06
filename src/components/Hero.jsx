import { useState, useEffect } from "react";
import { Music } from "lucide-react";

export default function Hero() {
  const youtubeVideoId = "9NlDzgl_Bpg";
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Set a minimum display time for the loading animation
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 2000); // Show loading for at least 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="bg-black flex items-center justify-center relative overflow-hidden min-h-screen"
    >
      {/* Custom Loading Animation */}
      <div
        className={`absolute inset-0 z-30 flex items-center justify-center bg-black transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="text-center">
          {/* Animated Music Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-band-yellow/20 rounded-full animate-ping"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-band-yellow/30 rounded-full animate-pulse"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <Music className="w-16 h-16 text-band-yellow animate-bounce" />
            </div>
          </div>

          {/* Animated Sound Bars */}
          <div className="flex items-end justify-center gap-2 h-20 mb-6">
            <div className="w-2 bg-band-yellow rounded-full animate-sound-bar-1" style={{ animationDelay: "0s" }}></div>
            <div className="w-2 bg-band-yellow rounded-full animate-sound-bar-2" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 bg-band-yellow rounded-full animate-sound-bar-3" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 bg-band-yellow rounded-full animate-sound-bar-1" style={{ animationDelay: "0.3s" }}></div>
            <div className="w-2 bg-band-yellow rounded-full animate-sound-bar-2" style={{ animationDelay: "0.4s" }}></div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl sm:text-3xl font-black gradient-text mb-2">
            BAND AMBASSADORS
          </h2>
          <p className="text-gray-400 text-sm tracking-widest animate-pulse">
            LOADING EXPERIENCE...
          </p>
        </div>
      </div>

      {/* YouTube Video Background Container */}
      <div className="absolute w-full h-full overflow-hidden">
        {/* Wrapper for scaling */}
        <div className="absolute w-full h-full transform scale-100 lg:scale-125">
          <iframe
            className="w-full h-full object-cover pointer-events-none"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=1&`}
            title="Band Ambassadors Intro"
            allow="autoplay; encrypted-media"
            allowFullScreen={true}
            onLoad={() => {
              // Additional check when iframe loads
              setTimeout(() => setIsVideoLoaded(true), 1500);
            }}
          ></iframe>
        </div>
        {/* New overlay div to hide the title */}
        <div className="absolute top-0 left-0 w-full h-[55px] bg-black z-20"></div>
      </div>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/1 z-10"></div>
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
    </section>
  );
}