import { useState, useEffect } from "react";
import { Award, Heart, Zap, X } from "lucide-react";

// Member images
const memberImages = {
  "Leroy Alexander Fernandes": "/images/individual/leroy.jpg",
  "Boney Alex Dias": "/images/individual/boney.jpg",
  "Shalisha Fernandes": "/images/individual/shalisha.jpg",
  "Dane Santan Dias": "/images/individual/dane.jpg",
  "Sherwyn Tristen Diogo Misquitta": "/images/individual/sherwyn.jpg",
  "James Jesus Cardozo": "/images/individual/james.jpg",
};

// Global style for scroll lock
const scrollLockStyle = `
  .overflow-hidden {
    overflow: hidden !important;
  }
`;

export default function About() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Hook to disable body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedImage]);

  const bandMembers = [
    {
      name: "Shalisha Fernandes",
      role: "Lead Vocals & Guitar",
      description: `On main vocals is the sensational singer-songwriter and guitarist, 
            the Kingfisher Voice of Goa fame, Shalisha Fernandes. Known for her aggressive 
            vocals and fierce stage presence, she's perhaps the only female lead guitarist Goa
             has ever seen. Whether shredding the guitar on challenging songs like 'Beat It' by MJ
              or playing her own lead solos on various tracks while singing her heart out, she 
              mesmerises the audience with her musicianship and melodious voice. She's also 
              recognised with multiple Goan music scene accolades, including collaborations 
              with the Goan legend Remo Fernandes.`,
      instagramUrl: "http://instagram.com/shalishafernandes/",
    },
    {
      name: "Leroy Alexander Fernandes",
      role: "Lead Vocals",
      description: `Leroy is the live-wire frontman,
       a passionate musician whose interactive style of performance creates an 
       engaging and immersive experience for the audience. Leroy's stage presence 
       is next-level, and the energy and emotional depth he brings to every song 
       make him truly the face of this band. Each song is a story, and Leroy 
       narrates it perfectly. As his music continues to evolve, he is excited to 
       push creative boundaries!`,
      instagramUrl: "https://www.instagram.com/i_am_leroy_alexander/",
    },
    {
      name: "Boney Alex Dias",
      role: "Lead Guitar",
      description: `The band leader of Band Ambassadors, nicknamed "Boney" at
       birth because of his resemblance to pop sensation Boney M, Alex Dias 
       has, despite having no musical roots, gone on to become a well-known 
       music composer, lead guitarist, and one of the most sought-after guitar
       instructors in Goa. An avant-garde guitarist, he keeps the audience 
       spellbound with his intricate guitar sections and also lends his voice 
       to backing vocals. Having been awarded many times for his outstanding 
       guitar playing and felicitated publicly for his contribution to music
      locally, Boney's unique composing skills are evident in all the originals
       the band has put out so far.`,
      instagramUrl: "https://www.instagram.com/boneyalex05/",
    },
    {
      name: "Dane Santan Dias",
      role: "Bass Guitar",
      description: `A five-string fighter, the low-end expert aka Dane is our 
      group's self-taught bassist and occasional country singer. He brings 
      over 13 years of groove, funk, and headbanging to the table. A highly
       versatile musician, he effortlessly covers genres like funk, blues, 
       jazz, Indian fusion, RnB, rock, and heavy metal. An alumnus of the 
       Institute of Recording Arts, Canada, he also spends his time recording
        and mixing covers and original tracks.`,
      instagramUrl: "https://www.instagram.com/itsgonnagetbetterman/",
    },
    {
      name: "Sherwyn Tristen Diogo Misquitta",
      role: "Drums",
      description: `A drummer from a very young age, Sherwyn has played different
       genres of music across both Western and Indian circuits. He has a knack for 
       crafting intricate parts when needed the most. He enjoys the mathematical and
        theoretical side of rhythm and experimenting with various permutations,
         bringing a lot of variety to the band's rhythm section. Moreover,
          his humour and infectious energy are as integral to our shows as his drumming,
           making him a truly one of a kind presence.`,
      instagramUrl: "https://www.instagram.com/sherwyn__misquitta_23/",
    },
    {
      name: "James Jesus Cardozo",
      role: "Keyboards",
      description:  `Meet James, our keyboardist who is passionate about sound and music 
      and has been playing piano since the age of four. He grew up playing church music 
      and has recently stepped onto the big stage. James is blessed
      with sharp ears and can figure out melodies with ease. A perfectionist to the core,
      he likes to nail all his parts and solos. Creative yet humble, James adds a lot of
      colour to the canvas called Band Ambassadors.`,
      instagramUrl: "https://www.instagram.com/sunflower_luwer/",
    },
  ];

  return (
    <>
      <style>{scrollLockStyle}</style> {/* Apply the scroll lock style */}
      <style>{`
        @keyframes subtle-glow {
          0%, 100% {
            filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.2))
                    drop-shadow(0 0 30px rgba(255, 215, 0, 0.15));
          }
          50% {
            filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.3))
                    drop-shadow(0 0 50px rgba(255, 215, 0, 0.2));
          }
        }
        .logo-glow {
          animation: subtle-glow 5s ease-in-out infinite;
        }

        @keyframes smooth-spin {
          0% { 
            transform: rotate(0deg) translateZ(0);
          }
          100% { 
            transform: rotate(360deg) translateZ(0);
          }
        }
        
        .spinning-border::before {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>

      <section id="about" className="py-16 sm:py-20 lg:py-20 px-4 sm:px-6 pt-24 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
              <span className="text-white">OUR</span>
              <span className="text-band-yellow"> STORY</span>
            </h2>
            <div className="w-24 h-1 bg-band-yellow mx-auto relative">
              <div className="absolute -top-1 -left-1 w-26 h-3 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent blur-sm"></div>
            </div>
          </div>

          {/* Grid: Text + Logo */}
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-16 sm:mb-20 lg:mb-24">
            {/* Text + badges */}
            <div className="space-y-6 sm:space-y-20 order-2 lg:order-1">
              <p className="text-md sm:text-sm text-gray-300 leading-relaxed text-justify">
                The Band Ambassadors bring the Charisma & Raw energy at every
                event that they are part of. Their wide repertoire across
                various genres of music & a stupendous command over multilingual
                songs speaks volumes about how passionately they cater to
                audiences across diverse cultures & traditions. With years of
                experience and an exclusive Classy repertoire specially
                curated for your event they ensure a packed dance floor and a
                entertaining time for everyone!
              </p>
              <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8">
                {[
                  { icon: Heart, title: "Passion", desc: "Every note we play comes from the heart" },
                  { icon: Zap, title: "Energy", desc: "High-voltage performances that electrify" },
                  { icon: Award, title: "Excellence", desc: "Committed to pushing creative boundaries" },
                ].map((item, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-16 h-16 bg-band-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-band-yellow" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo with smooth spinning border */}
            <div className="spinning-border relative h-[450px] w-full rounded-2xl overflow-hidden bg-[rgb(15,15,15)]
              before:content-[''] before:absolute before:inset-[-65%] before:rounded-full
              before:bg-[conic-gradient(rgb(15,15,15)_0deg,rgb(15,15,15)_280deg,rgba(233,154,8,0.8)_300deg,#e99a08_320deg,rgba(255,215,0,0.6)_340deg,rgba(255,215,0,0.1)_360deg)]
              before:animate-[smooth-spin_12s_linear_infinite]
              after:content-[''] after:absolute after:inset-[2px] after:rounded-2xl after:bg-[rgb(15,15,15)] after:z-10
            ">
              <div className="w-full h-full bg-gradient-to-br from-band-yellow/10 via-transparent to-band-yellow/5 rounded-2xl p-4 flex items-center justify-center relative z-20">
                <div className="text-center">
                  <img
                    src="/images/Logo/logo.png"
                    alt="Band Ambassadors Logo"
                    className="logo-glow w-48 h-48 sm:w-64 sm:h-64 object-contain ml-2"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/256x256/1a1a1a/FFD700?text=LOGO"; }}
                  />
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                    Since 2019
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                    6 years of musical evolution
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Band Members */}
          <div className="mb-16 relative z-10 p-8 rounded-xl bg-gradient-to-br from-band-yellow/5 to-black/10 backdrop-blur-sm border border-band-yellow/10">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
                <span className="text-white">MEET THE</span>
                <span className="text-band-yellow"> BAND</span>
              </h3>
              <div className="w-16 h-1 bg-band-yellow mx-auto mb-4 sm:mb-6"></div>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto px-4">
                Six talented musicians united by a shared passion for creating
                unforgettable musical experiences
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {bandMembers.map((member, index) => (
                <div key={index} className="group" style={{ perspective: "1000px" }}>
                  <div className="relative h-full overflow-hidden rounded-xl p-6 bg-white/5 backdrop-blur-md border border-band-yellow/10 transition-transform duration-500 ease-in-out group-hover:-translate-y-2 group-hover:rotate-x-3 transform-gpu">
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="text-center mb-6 flex-grow">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-5">
                          <div
                            onClick={() => setSelectedImage(memberImages[member.name])}
                            className="w-full h-full rounded-full overflow-hidden cursor-pointer border-2 border-band-yellow/30 group-hover:border-band-yellow/80 transition-all duration-300 transform group-hover:scale-105"
                          >
                            <img
                              src={memberImages[member.name] || `https://via.placeholder.com/128x128/1a1a1a/FFD700?text=${member.name.split(" ").map(n=>n[0]).join("")}`}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-band-yellow transition-colors duration-200 whitespace-nowrap"
                            style={{ fontSize: "clamp(0.9rem, 2vw, 1.3rem)" }}>
                          {member.name}
                        </h4>
                        <p className="text-band-yellow/80 font-semibold text-xs tracking-wider uppercase mb-4">
                          {member.role}
                        </p>
                        <p className="text-gray-400 text-justify [hyphens:auto] leading-relaxed text-sm">
                          {member.description}
                        </p>
                      </div>
                      <div className="text-center mt-auto pt-4 border-t border-white/10">
                        <a
                          href={member.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gray-500 hover:text-band-yellow transition-colors duration-300"
                        >
                          <img
                            src="/images/Icons/instagram.webp"
                            alt="Instagram icon"
                            className="w-8 h-8 filter grayscale group-hover:grayscale-0 transition-filter duration-300"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2">
            <X size={24} />
          </button>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Band member expanded"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}