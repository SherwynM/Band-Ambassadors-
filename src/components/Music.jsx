import { useEffect, useState } from "react";
import { ListMusic, ChevronLeft, ChevronRight } from "lucide-react";
import BadApple from "./BadApple";

export default function Music() {
  const [activeTab, setActiveTab] = useState("english");
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const songLists = {
    english: [
      {
        title: "Eye Of The Tiger X Tiktok",
        youtubeUrl: "https://www.youtube.com/watch?v=RxJu0j6J6Hg",
      },
      {
        title: "Abba Medley",
        youtubeUrl: "https://www.youtube.com/watch?v=cqfzmfvDCLo ",
      },
      {
        title: "Feel This Moment X Dynamite",
        youtubeUrl: "https://www.youtube.com/watch?v=Axpq79yepB0",
      },
      {
        title: "Clarity X Viva La Vida X Stay The Night",
        youtubeUrl: "https://www.youtube.com/watch?v=FjaWyv-XbJ0",
      },
    ],
    konkani: [
      {
        title: "Tuzo Mog",
        youtubeUrl: "https://www.youtube.com/watch?v=xtklRfTkZdQ",
      },
      {
        title: "THE ULTIMATE KONKANI MASALA",
        youtubeUrl: "https://www.youtube.com/watch?v=DAMiWk7OqR4",
      },
      {
        title: "CELINA",
        youtubeUrl: "https://www.youtube.com/watch?v=UVseNNEmD1A",
      },
      {
        title: "Mogacho Uzzo",
        youtubeUrl: "https://www.youtube.com/watch?v=lILpfiTShHA",
      },
    ],
    hindi: [
      {
        title: "Made In India",
        youtubeUrl:
          "https://www.youtube.com/watch?v=eulsHc3f-rM&list=RDeulsHc3f-rM&start_radio=1",
      },
    ],
    originals: [
      {
        title: "Made In India",
        youtubeUrl:
          "https://www.youtube.com/watch?v=eulsHc3f-rM&list=RDeulsHc3f-rM&start_radio=1",
      },
    ],
  };

  const SongList = ({ songs }) => (
    <div className="space-y-3 sm:space-y-4">
      {songs.map((song, index) => (
        <a
          key={index}
          href={song.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 sm:p-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-black/50 hover:border-band-yellow/50 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="w-8 sm:w-10 h-8 sm:h-10 flex-shrink-0 bg-band-yellow/20 rounded-full flex items-center justify-center text-band-yellow group-hover:bg-band-yellow group-hover:text-black transition-colors duration-300">
              <ListMusic className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-white text-sm sm:text-base truncate">
                {song.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 truncate">
                {song.artist}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );

  const getTabClasses = (tabValue) => {
    const baseClasses =
      "py-3 px-4 text-sm sm:text-lg font-bold transition-all duration-300 cursor-pointer rounded-md flex-1 border border-white/20 text-center";
    const activeClasses =
      "bg-band-yellow text-black scale-105 shadow-lg shadow-yellow-500/20";
    const inactiveClasses = "text-gray-300 hover:bg-white/10";
    return `${baseClasses} ${
      activeTab === tabValue ? activeClasses : inactiveClasses
    }`;
  };

  const currentSongs = songLists[activeTab].slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const totalSongs = songLists[activeTab].length;
  const totalPages = Math.ceil(totalSongs / songsPerPage);
  const hasPagination = totalSongs > songsPerPage;

  // ---------- Fade slideshow background (replaces JS scroll) ----------
  const musicFadeImages = [
    "/images/Background/back1.jpg",
    "/images/Background/back2.jpg",
    "/images/Background/back3.jpg",
  ];

  // seconds each image stays visible (including fade transition time)
  const musicFadeDuration = 10;
  // milliseconds for CSS transition (should be less than musicFadeDuration * 1000)
  const transitionMs = 2000;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (musicFadeImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % musicFadeImages.length);
    }, musicFadeDuration * 1000);
    return () => clearInterval(interval);
  }, [musicFadeImages.length, musicFadeDuration]);

  // --------------------------------------------------------------------

  return (
    <>
      <section
        id="music"
        className="relative py-16 sm:py-20 px-4 sm:px-6 pt-24 overflow-hidden"
      >
        {/* Fade slideshow background */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="relative w-full h-full">
            {musicFadeImages.map((src, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[${transitionMs}] ease-linear`} // transition duration inline
                  style={{
                    backgroundImage: `url(${src})`,
                    opacity: isActive ? 1 : 0,
                    transition: `opacity ${transitionMs}ms ease-in-out`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* overlays */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: "url('/noise-light.png')", opacity: 0.03 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-10">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6"
              style={{ textShadow: "0 0 10px rgba(255, 215, 0, 0.3)" }}
            >
              <span className="text-white">OUR</span>
              <span className="text-band-yellow"> SETLIST</span>
            </h2>
            <div className="w-24 h-1 bg-band-yellow mx-auto mb-6 sm:mb-8" />
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              We cater to diverse audiences with a versatile setlist. Browse our
              song selections by language to find the perfect vibe for your
              event.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Custom Tabs List */}
            <div className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-2 mb-6 sm:mb-8">
              <div
                className={getTabClasses("originals")}
                onClick={() => setActiveTab("originals")}
              >
                Originals
              </div>
              <div
                className={getTabClasses("english")}
                onClick={() => setActiveTab("english")}
              >
                English
              </div>
              <div
                className={getTabClasses("konkani")}
                onClick={() => setActiveTab("konkani")}
              >
                Konkani
              </div>
              <div
                className={getTabClasses("hindi")}
                onClick={() => setActiveTab("hindi")}
              >
                Hindi
              </div>
            </div>

            {/* Custom Tabs Content */}
            <div className="bg-transparent border-0">
              <div className="min-h-[350px]">
                <SongList songs={currentSongs} />
              </div>

              {/* Pagination Controls */}
              {hasPagination && (
                <div className="flex justify-center mt-6 sm:mt-8 gap-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-full bg-black/30 text-gray-400 hover:text-white hover:bg-band-yellow/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="flex items-center text-sm font-semibold text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full bg-black/30 text-gray-400 hover:text-white hover:bg-band-yellow/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bad Apple Section wrapped */}
     
    </>
  );
}
