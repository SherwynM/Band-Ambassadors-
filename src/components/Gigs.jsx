import { useRef } from "react";
import { MapPin, Clock, Calendar } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Gigs() {
  const sectionRef = useRef(null);

  const tourDates = [
    {
      date: "2025-11-22",
      venue: "Copa Cabana",
      time: "8:00 PM",
      city: "Cavelossim, Goa",
      mapUrl: "https://www.google.com/maps/dir//Radisson+Blu+Resort,+Beach,+Cavelossim,+Goa+403731/@15.175809,73.8646782,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bbe4dd73aef4aff:0xce1a154d4cf4c156!2m2!1d73.9470661!2d15.1758217?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
    },
    
  ];

  const fallbackPosterUrl = "/images/Gallery/img1.jpg";

  const formatDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatMonthAndDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="gigs" ref={sectionRef} className="relative overflow-hidden py-20 sm:py-24 lg:py-32 px-4 sm:px-6">
      {/* Image Background and Overlay */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src={fallbackPosterUrl}
          alt="Band performing on stage"
          className="w-full h-full object-cover"
          style={{ scale, y, scaleX: scale, scaleY: scale }} 
        />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6"> 
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 sm:mb-8" 
                style={{ textShadow: "0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.9)" }}>
              <span className="text-white">UPCOMING</span>
              <span className="text-band-yellow"> GIGS</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-band-yellow to-transparent mx-auto mb-8"></div>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Join us on our electrifying journey. Experience the energy, 
              <br className="hidden sm:block" />
              feel the pulse, and become part of our musical story.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {tourDates.map((show, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-band-yellow/20 via-band-yellow/10 to-band-yellow/20 rounded-2xl blur-xl opacity-0 "></div>
              
              <div className="relative bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl border-2 border-band-yellow/30 rounded-2xl overflow-hidden group-hover:border-band-yellow/60 transition-all duration-300 shadow-2xl">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-band-yellow/0 via-band-yellow/5 to-band-yellow/0 opacity-0 "></div>
                
                <div className="relative p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
                    {/* Date Section - Enhanced */}
                    <div className="relative flex-shrink-0">
                      <div className="relative bg-gradient-to-br from-band-yellow/20 to-band-yellow/5 p-6 rounded-xl border border-band-yellow/40 min-w-[140px] text-center  group-hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                        <div className="absolute top-2 right-2">
                          <Calendar className="w-4 h-4 text-band-yellow/60" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-band-yellow tracking-tight mb-1" 
                             style={{ textShadow: "0 2px 10px rgba(255, 215, 0, 0.3)" }}>
                          {formatMonthAndDay(show.date).split(' ')[1]}
                        </div>
                        <div className="text-lg font-bold text-white mb-1">
                          {formatMonthAndDay(show.date).split(' ')[0]}
                        </div>
                        <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">
                          {formatDayOfWeek(show.date)}
                        </div>
                        <div className="text-xs text-band-yellow/70 font-semibold mt-2">
                          {formatYear(show.date)}
                        </div>
                      </div>
                    </div>

                    {/* Vertical divider - hidden on mobile */}
                    <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-transparent via-band-yellow/40 to-transparent"></div>

                    {/* Info Section - Enhanced */}
                    <div className="flex-1 space-y-4">
                      {/* VENUE: plain styled text (no link, no hover) */}
                      <div
                        className="inline-flex items-center gap-3 font-black text-2xl sm:text-3xl md:text-4xl text-white"
                        style={{ textShadow: "0 2px 15px rgba(0, 0, 0, 0.8)" }}
                      >
                        <span className="relative">{show.venue}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <div className="flex items-center gap-3 group/item">
                          <div className="w-10 h-10 rounded-full bg-band-yellow/10 flex items-center justify-center border border-band-yellow/30 group-hover/item:bg-band-yellow/20 group-hover/item:border-band-yellow/50 transition-all duration-300">
                            <MapPin className="w-5 h-5 text-band-yellow" />
                          </div>
                          <span className="text-lg sm:text-xl text-gray-200 font-medium">{show.city}</span>
                        </div>

                        <div className="hidden sm:block w-px h-8 bg-band-yellow/20"></div>

                        <div className="flex items-center gap-3 group/item">
                          <div className="w-10 h-10 rounded-full bg-band-yellow/10 flex items-center justify-center border border-band-yellow/30 group-hover/item:bg-band-yellow/20 group-hover/item:border-band-yellow/50 transition-all duration-300">
                            <Clock className="w-5 h-5 text-band-yellow" />
                          </div>
                          <span className="text-lg text-gray-300 font-medium">{show.time}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <a 
                          href={show.mapUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-band-yellow/10 hover:bg-band-yellow hover:text-black text-band-yellow border border-band-yellow/40 hover:border-band-yellow rounded-lg font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-105"
                        >
                          <MapPin className="w-4 h-4" />
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-transparent via-band-yellow/50 to-transparent"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
