import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface FinaleSectionProps {
  className?: string;
}

export default function FinaleSection({ className = '' }: FinaleSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const fireworkRefs = useRef<(HTMLDivElement | null)[]>([]);
  const balloonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
          onEnter: () => setShowFireworks(true),
        },
      });

      // ENTRANCE (0-30%)
      // Fireworks entrance
      fireworkRefs.current.forEach((firework, i) => {
        if (firework) {
          scrollTl.fromTo(
            firework,
            { scale: 0.2, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'back.out(1.4)' },
            i * 0.04
          );
        }
      });

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.12
      );

      // Subline entrance
      scrollTl.fromTo(
        sublineRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // Ground entrance
      scrollTl.fromTo(
        groundRef.current,
        { y: '20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Balloons entrance
      balloonRefs.current.forEach((balloon, i) => {
        if (balloon) {
          scrollTl.fromTo(
            balloon,
            { y: '30vh', opacity: 0 },
            { y: 0, opacity: 0.8, ease: 'power2.out' },
            0.15 + i * 0.03
          );
        }
      });

      // SETTLE (30-70%): Hold for celebration

      // EXIT (70-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        sublineRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      fireworkRefs.current.forEach((firework, i) => {
        if (firework) {
          scrollTl.fromTo(
            firework,
            { scale: 1, opacity: 1 },
            { scale: 1.08, opacity: 0, ease: 'power2.in' },
            0.7 + i * 0.02
          );
        }
      });

      balloonRefs.current.forEach((balloon, i) => {
        if (balloon) {
          scrollTl.fromTo(
            balloon,
            { y: 0, opacity: 0.8 },
            { y: '-20vh', opacity: 0, ease: 'power2.in' },
            0.75 + i * 0.02
          );
        }
      });

      scrollTl.fromTo(
        groundRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0.3, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Continuous fireworks animation
  useEffect(() => {
    if (!showFireworks) return;

    const interval = setInterval(() => {
      // Trigger random firework bursts
      const randomFirework = Math.floor(Math.random() * 3);
      const firework = fireworkRefs.current[randomFirework];
      if (firework) {
        gsap.fromTo(
          firework,
          { scale: 0.5, opacity: 0.5 },
          { scale: 1.2, opacity: 1, duration: 0.3, ease: 'back.out(1.6)', yoyo: true, repeat: 1 }
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [showFireworks]);

  return (
    <section
      ref={sectionRef}
      id="finale-section"
      className={`section-pinned bg-gradient-to-b from-sky to-sky-light ${className}`}
    >
      {/* Fireworks */}
      <div
        ref={(el) => { fireworkRefs.current[0] = el; }}
        className="absolute left-[34vw] top-[22vh]"
      >
        <svg viewBox="0 0 100 100" className="w-[15vw] max-w-[150px] drop-shadow-lg">
          <g className="firework-burst">
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 40 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={50 + 40 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="#FF6A97"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            <circle cx="50" cy="50" r="8" fill="#FFD36E" />
          </g>
        </svg>
      </div>
      <div
        ref={(el) => { fireworkRefs.current[1] = el; }}
        className="absolute left-1/2 top-[18vh] -translate-x-1/2"
      >
        <svg viewBox="0 0 100 100" className="w-[18vw] max-w-[180px] drop-shadow-lg">
          <g className="firework-burst">
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 45 * Math.cos((i * 22.5 * Math.PI) / 180)}
                y2={50 + 45 * Math.sin((i * 22.5 * Math.PI) / 180)}
                stroke="#C9F0FF"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            <circle cx="50" cy="50" r="10" fill="#FFB7D5" />
          </g>
        </svg>
      </div>
      <div
        ref={(el) => { fireworkRefs.current[2] = el; }}
        className="absolute left-[66vw] top-[22vh]"
      >
        <svg viewBox="0 0 100 100" className="w-[15vw] max-w-[150px] drop-shadow-lg">
          <g className="firework-burst">
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 35 * Math.cos((i * 36 * Math.PI) / 180)}
                y2={50 + 35 * Math.sin((i * 36 * Math.PI) / 180)}
                stroke="#FFF6B3"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
            <circle cx="50" cy="50" r="6" fill="#7EEA86" />
          </g>
        </svg>
      </div>

      {/* Floating balloons */}
      <div
        ref={(el) => { balloonRefs.current[0] = el; }}
        className="absolute left-[10vw] top-[50vh] text-5xl animate-float-slow"
      >
        🎈
      </div>
      <div
        ref={(el) => { balloonRefs.current[1] = el; }}
        className="absolute left-[20vw] top-[60vh] text-4xl animate-float"
        style={{ animationDelay: '0.5s' }}
      >
        🎊
      </div>
      <div
        ref={(el) => { balloonRefs.current[2] = el; }}
        className="absolute right-[15vw] top-[45vh] text-[clamp(24px,5vw,48px)] animate-float-slow hidden sm:block"
        style={{ animationDelay: '1s' }}
      >
        🎉
      </div>
      <div
        ref={(el) => { balloonRefs.current[3] = el; }}
        className="absolute right-[25vw] top-[55vh] text-[clamp(20px,4vw,36px)] animate-float hidden md:block"
        style={{ animationDelay: '1.5s' }}
      >
        🎈
      </div>
      <div
        ref={(el) => { balloonRefs.current[4] = el; }}
        className="absolute left-[75vw] top-[65vh] text-3xl animate-float-slow"
        style={{ animationDelay: '2s' }}
      >
        ✨
      </div>

      {/* Ground platform */}
      <div
        ref={groundRef}
        className="absolute left-1/2 top-[86vh] -translate-x-1/2 w-[110vw] h-[18vh]"
      >
        <div className="grass-platform w-full h-full">
          <div className="absolute top-0 left-0 right-0 h-4 flex">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="flex-1 h-full bg-grass/50" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Main message */}
      <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,1000px)] text-center">
        <h2
          ref={headlineRef}
          className="font-pixel text-[clamp(18px,4vw,44px)] text-violet-dark leading-tight mb-6 pixel-glow"
        >
          I Love You Sweety
          <br />
          <span className="text-coral">Forever 💖</span>
        </h2>
        <p
          ref={sublineRef}
          className="font-cute text-[clamp(14px,2vw,22px)] text-violet-muted"
        >
          Thanks for being my favorite person.
        </p>
      </div>

      {/* Floating hearts */}
      <div className="absolute left-[5vw] top-[30vh] text-coral/40 animate-heart-float text-xl">
        💖
      </div>
      <div className="absolute right-[8vw] top-[70vh] text-coral/30 animate-heart-float text-lg" style={{ animationDelay: '2s' }}>
        💕
      </div>
      <div className="absolute left-[85vw] top-[35vh] text-coral/25 animate-heart-float text-xl" style={{ animationDelay: '4s' }}>
        💗
      </div>
    </section>
  );
}
