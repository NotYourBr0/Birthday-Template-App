import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  className?: string;
}

interface Memory {
  image: string;
  caption: string;
  desktopPos: string;
  desktopSize: string;
  rotation: number;
}

const memories: Memory[] = [
  {
    image: '/memory1.jpg',
    caption: 'Are you a redstone torch? Because you activate my heart.',
    desktopPos: 'lg:left-[10vw] lg:top-[5vh]',
    desktopSize: 'lg:w-[22vw]',
    rotation: -4,
  },
  {
    image: '/memory2.jpg',
    caption: "You're the diamond in my caves.",
    desktopPos: 'lg:left-1/2 lg:top-[12vh] lg:-translate-x-1/2',
    desktopSize: 'lg:w-[24vw]',
    rotation: 2,
  },
  {
    image: '/memory3.jpg',
    caption: "If love were blocks, I'd build you a castle.",
    desktopPos: 'lg:right-[10vw] lg:top-[2vh]',
    desktopSize: 'lg:w-[22vw]',
    rotation: -2,
  },
  {
    image: '/memory4.jpg',
    caption: "You're my favorite spawn point.",
    desktopPos: 'lg:left-[8vw] lg:top-[5vh]',
    desktopSize: 'lg:w-[22vw]',
    rotation: 3,
  },
  {
    image: '/memory5.jpg',
    caption: 'With you, every biome feels like home.',
    desktopPos: 'lg:left-1/2 lg:top-[8vh] lg:-translate-x-1/2',
    desktopSize: 'lg:w-[24vw]',
    rotation: -3,
  },
  {
    image: '/memory6.jpg',
    caption: "I'd trade all my emeralds for your smile.",
    desktopPos: 'lg:right-[10vw] lg:top-[14vh]',
    desktopSize: 'lg:w-[22vw]',
    rotation: 5,
  },
  {
    image: '/memory7.jpg',
    caption: "You're my crafting table - where all my best ideas come together.",
    desktopPos: 'lg:left-[10vw] lg:top-[4vh]',
    desktopSize: 'lg:w-[22vw]',
    rotation: -2,
  },
  {
    image: '/memory8.jpg',
    caption: 'Like a bed in the Nether, you make the dangerous feel safe.',
    desktopPos: 'lg:left-1/2 lg:top-[10vh] lg:-translate-x-1/2',
    desktopSize: 'lg:w-[24vw]',
    rotation: -5,
  },
  {
    image: '/memory9.jpg',
    caption: "I'd walk through a Creeper field just to hold your hand.",
    desktopPos: 'lg:right-[10vw] lg:top-[2vh]',
    desktopSize: 'lg:w-[22vw]',
    rotation: 4,
  },
];

export default function GallerySection({ className = '' }: GallerySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Card entrance animations
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
            rotation: i % 2 === 0 ? -10 : 10,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Simple cloud float
      cloudRefs.current.forEach((cloud, i) => {
        if (!cloud) return;
        gsap.to(cloud, {
          x: i === 0 ? 40 : -40,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const renderMemories = (startIndex: number, endIndex: number) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-y-20 w-full mb-12 lg:mb-20">
      {memories.slice(startIndex, endIndex).map((memory, i) => {
        const globalIdx = startIndex + i;
        return (
          <div
            key={globalIdx}
            ref={(el) => { cardRefs.current[globalIdx] = el; }}
            className="relative w-full group flex flex-col items-center"
            style={{
              '--desktop-rot': `${memory.rotation}deg`
            } as React.CSSProperties}
          >
            <div className="photo-frame bg-white p-2 sm:p-3 shadow-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-2xl lg:rotate-[var(--desktop-rot)] lg:group-hover:rotate-0 w-full max-w-[340px] lg:max-w-none">
              <div className="relative overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-gray-50">
                <img
                  src={memory.image}
                  alt={`Memory ${globalIdx + 1}`}
                  className="w-full h-full object-cover sm:object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            <div className="mt-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-pink-soft/10 w-full max-w-[340px] lg:max-w-none transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
              <p className="font-cute text-[clamp(14px,1.2vw,17px)] text-violet-dark text-center leading-relaxed">
                {memory.caption}
              </p>
            </div>

            {/* Decorative items */}
            <div className="absolute top-0 right-4 lg:right-0 w-5 h-5 bg-candle rounded-full animate-sparkle z-10" style={{ animationDelay: `${globalIdx * 0.2}s` }} />
            <div className="absolute bottom-10 left-4 lg:left-0 w-4 h-4 bg-coral rounded-full animate-sparkle z-10" style={{ animationDelay: `${globalIdx * 0.2 + 0.4}s` }} />
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="gallery-section"
      className={`section-flowing bg-gradient-to-b from-sky via-sky-light to-pink-soft/10 py-20 px-6 overflow-hidden ${className}`}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] text-4xl animate-float-slow">🧊</div>
        <div className="absolute top-[50%] right-[10%] text-3xl animate-float" style={{ animationDelay: '1s' }}>💎</div>
        <div className="absolute bottom-[20%] left-[15%] text-2xl animate-float-slow" style={{ animationDelay: '2s' }}>🌱</div>
      </div>

      {/* Decorative Clouds */}
      <div
        ref={(el) => { cloudRefs.current[0] = el; }}
        className="absolute left-[-5vw] top-[5vh] w-[40vw] max-w-[300px] opacity-40 hidden lg:block"
      >
        <svg viewBox="0 0 200 100" fill="white" className="filter blur-[1px] drop-shadow-xl">
          <circle cx="50" cy="60" r="40" />
          <circle cx="100" cy="50" r="50" />
          <circle cx="150" cy="60" r="40" />
        </svg>
      </div>
      <div
        ref={(el) => { cloudRefs.current[1] = el; }}
        className="absolute right-[-5vw] top-[15vh] w-[35vw] max-w-[250px] opacity-30 hidden lg:block"
      >
        <svg viewBox="0 0 200 100" fill="white" className="filter blur-[1.5px] drop-shadow-xl">
          <circle cx="60" cy="55" r="45" />
          <circle cx="120" cy="45" r="55" />
          <circle cx="170" cy="55" r="35" />
        </svg>
      </div>

      {/* Title */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <h2
          ref={titleRef}
          className="font-pixel text-[clamp(20px,4.5vw,48px)] text-violet-dark text-center mb-24 pixel-glow px-4"
        >
          Our Pixels of Joy ✨
        </h2>

        {/* Content */}
        <div className="w-full">
          {renderMemories(0, 3)}
          {renderMemories(3, 6)}
          {renderMemories(6, 9)}
        </div>
      </div>

      {/* Ambient particles */}
      <div className="absolute left-[8vw] bottom-[10vh] text-coral/30 text-2xl animate-bounce">💖</div>
      <div className="absolute right-[12vw] top-[30vh] text-coral/20 text-xl animate-float-slow">💕</div>
    </section>
  );
}
