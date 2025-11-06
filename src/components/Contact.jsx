import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

// List of background image URLs
const backgroundImages = [
  "/images/Background/back5.jpg",
  "/images/Background/back6.jpg",
];

export default function Contact() {
  const handleEmailClick = (e) => {
    e.preventDefault();

    const mailtoLink = "mailto:bandambassadors0508@gmail.com";
    const webmailLink =
      "https://mail.google.com/mail/?view=cm&fs=1&to=bandambassadors0508@gmail.com";

    // Try to open the mailto link first
    window.open(mailtoLink, "_self");

    // If the mailto doesn't open (page still visible), open webmail in new tab
    setTimeout(() => {
      if (!document.hidden) {
        window.open(webmailLink, "_blank");
      }
    }, 500);
  };

  // The total duration of the animation cycle (seconds)
  const totalDuration = 20; // keep as you set it
  const numberOfImages = backgroundImages.length;

  // how long each image is "displayed" (seconds)
  const displayTime =
    numberOfImages > 0 ? totalDuration / numberOfImages : totalDuration;

  // Fade duration (ms) derived from displayTime but capped to keep it pleasant
  const fadeMs = Math.min(
    1500,
    Math.max(500, Math.floor(displayTime * 1000 * 0.18))
  ); // ~18% of display time, bounded

  // current visible background index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // advance the slide every `displayTime` seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % numberOfImages);
    }, Math.max(1000, Math.floor(displayTime * 1000)));

    return () => clearInterval(interval);
  }, [displayTime, numberOfImages]);

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-20 px-4 sm:px-6 pt-24 relative overflow-hidden"
    >
      {/* Semi-transparent overlay to make the images less visible */}
      <div className="absolute inset-0 z-10 bg-black/85" />

      {/* Background image slideshow container */}
      <div className="absolute inset-0 -z-10">
        {backgroundImages.map((src, index) => {
          const isActive = index === currentIndex;

          return (
            <div
                key={src}
                className="absolute inset-0 bg-cover bg-center will-change-transform pointer-events-none"
                style={{
                backgroundImage: `url(${src})`,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(1.02)",
                transition: `opacity ${fadeMs}ms ease-in-out, transform ${fadeMs}ms ease-in-out`,
              }}
            />
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
            <span className="text-white">GET IN</span>
            <span className="text-band-yellow"> TOUCH</span>
          </h2>
          <div className="w-24 h-1 bg-band-yellow mx-auto mb-6 sm:mb-8" />
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to book us for your event? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-8 text-band-yellow">
                Let's Connect
              </h3>
              <div className="inline-flex flex-col sm:flex-row justify-center gap-8 sm:gap-12">
                <div className="flex items-center gap-4 ml-8 pl-2 sm:px-4 py-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-band-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-band-yellow" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm md:text-sm sm:text-base text-white">
                      Mobile Number
                    </h4>
                    <p className="text-gray-100 text-sm sm:text-base">
                      +91 86989 97723
                    </p>
                  </div>
                </div>

                <div className="flex items-center h-15 gap-4 pl-10 sm:px-6 py-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-band-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-band-yellow" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h4 className="font-bold text-sm sm:text-base text-white">
                      Email
                    </h4>
                    <button
                      onClick={handleEmailClick}
                      className="text-gray-100 text-sm sm:text-base break-all hover:text-band-yellow transition-colors duration-200"
                    >
                      Book Your Experience !
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-6 text-white">
                Follow Our Journey
              </h3>
              <div className="flex justify-center gap-2 sm:gap-4">
                <a
                  href="https://www.instagram.com/bandambassadors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className="w-10 sm:w-12 h-10 sm:h-12 bg-band-black/70 rounded-full"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/images/Icons/instagram.webp"
                    alt="Instagram"
                    className="w-full h-full rounded-full"
                  />
                </a>
                <a
                  rel="noreferrer"
                  href="https://www.youtube.com/@BandAmbassadors"
                  className="w-8 sm:w-10 h-8 sm:h-10 mt-[4px]"
                  target="_blank"
                >
                  <img
                    src="/images/Icons/YouTube.png"
                    alt="YouTube"
                    className="w-full h-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 mt-12 sm:mt-16 pt-6 sm:pt-8 text-center">
          <p className="text-white font-bold mb-4 text-sm sm:text-base">
            © 2025 Band Ambassadors. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 font-normal">
            Crafting sonic experiences that transcend boundaries.
          </p>
        </div>
      </div>
    </section>
  );
}
