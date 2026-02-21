import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface ChildhoodSectionProps {
  className?: string;
}

export default function ChildhoodSection({ className = '' }: ChildhoodSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heartRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0-30%)
      // Background color transition overlay
      scrollTl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power2.out' },
        0
      );

      // Clouds entrance
      scrollTl.fromTo(
        cloudRefs.current[0],
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 0.9, ease: 'power2.out' },
        0.05
      );
      scrollTl.fromTo(
        cloudRefs.current[1],
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 0.9, ease: 'power2.out' },
        0.07
      );

      // Photo card entrance
      scrollTl.fromTo(
        photoCardRef.current,
        { y: '60vh', scale: 0.85, rotation: -3, opacity: 0 },
        { y: 0, scale: 1, rotation: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Caption entrance
      scrollTl.fromTo(
        captionRef.current,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.18
      );

      // Floating hearts entrance
      heartRefs.current.forEach((heart, i) => {
        if (heart) {
          scrollTl.fromTo(
            heart,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 0.6, ease: 'back.out(1.4)' },
            0.2 + i * 0.03
          );
        }
      });

      // SETTLE (30-70%): Hold for reading

      // EXIT (70-100%)
      // Photo card exit
      scrollTl.fromTo(
        photoCardRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Caption exit
      scrollTl.fromTo(
        captionRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Hearts exit
      heartRefs.current.forEach((heart, i) => {
        if (heart) {
          scrollTl.fromTo(
            heart,
            { y: 0, opacity: 0.6 },
            { y: '-20vh', opacity: 0, ease: 'power2.in' },
            0.75 + i * 0.02
          );
        }
      });

      // Clouds drift outward
      scrollTl.fromTo(
        cloudRefs.current[0],
        { x: 0 },
        { x: '-15vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        cloudRefs.current[1],
        { x: 0 },
        { x: '15vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      // Overlay fade
      scrollTl.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="childhood-section"
      className={`section-pinned bg-sky relative ${className}`}
    >
      {/* Pink overlay for background transition */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-pink-soft opacity-0 pointer-events-none"
      />

      {/* Clouds */}
      <div
        ref={(el) => { cloudRefs.current[0] = el; }}
        className="absolute left-[6vw] top-[10vh] w-[35vw] md:w-[28vw]"
      >
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-lg">
          <ellipse cx="50" cy="60" rx="40" ry="30" fill="white" />
          <ellipse cx="100" cy="50" rx="50" ry="35" fill="white" />
          <ellipse cx="150" cy="60" rx="40" ry="30" fill="white" />
        </svg>
      </div>
      <div
        ref={(el) => { cloudRefs.current[1] = el; }}
        className="absolute left-[62vw] top-[14vh] w-[32vw] md:w-[26vw]"
      >
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-lg">
          <ellipse cx="60" cy="55" rx="45" ry="32" fill="white" />
          <ellipse cx="120" cy="45" rx="55" ry="38" fill="white" />
          <ellipse cx="170" cy="55" rx="35" ry="28" fill="white" />
        </svg>
      </div>

      {/* Floating hearts */}
      <div
        ref={(el) => { heartRefs.current[0] = el; }}
        className="absolute left-[15vw] top-[30vh] text-coral text-3xl animate-heart-float"
        style={{ animationDelay: '0s' }}
      >
        💖
      </div>
      <div
        ref={(el) => { heartRefs.current[1] = el; }}
        className="absolute right-[18vw] top-[25vh] text-coral text-2xl animate-heart-float"
        style={{ animationDelay: '2s' }}
      >
        💕
      </div>
      <div
        ref={(el) => { heartRefs.current[2] = el; }}
        className="absolute left-[80vw] top-[60vh] text-coral text-xl animate-heart-float"
        style={{ animationDelay: '4s' }}
      >
        💗
      </div>
      <div
        ref={(el) => { heartRefs.current[3] = el; }}
        className="absolute left-[10vw] top-[65vh] text-coral text-lg animate-heart-float hidden sm:block"
        style={{ animationDelay: '6s' }}
      >
        💝
      </div>

      <div
        ref={photoCardRef}
        className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[min(70vw,400px)]"
      >
        <div className="photo-frame bg-white shadow-glow-lg overflow-hidden">
          <img
            src="/childhood.jpg"
            alt="Childhood memory"
            className="w-full aspect-[9/16] object-cover"
            loading="lazy"
          />
        </div>

        {/* Sparkle decorations around photo */}
        <div className="absolute -top-4 -left-4 w-4 h-4 bg-candle rounded-full animate-sparkle" />
        <div className="absolute -top-2 -right-6 w-3 h-3 bg-coral rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -bottom-4 -left-6 w-3 h-3 bg-candle rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-2 -right-4 w-4 h-4 bg-coral rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Caption */}
      <div
        ref={captionRef}
        className="absolute left-1/2 top-[82%] -translate-x-1/2 w-[min(90vw,720px)] text-center"
      >
        <p className="font-pixel text-[clamp(14px,2.5vw,24px)] text-violet-dark leading-relaxed">
          From this cute little girl
          <br />
          <span className="text-coral">to my forever love.</span>
        </p>
        <p className="font-cute text-[clamp(12px,1.5vw,18px)] text-violet-muted mt-4">
          Some things just get sweeter with time.
        </p>
      </div>

      {/* Decorative pixel stars */}
      <div className="absolute left-[5vw] top-[50vh] text-candle text-2xl animate-sparkle">✨</div>
      <div className="absolute right-[8vw] top-[45vh] text-candle text-xl animate-sparkle" style={{ animationDelay: '0.7s' }}>✨</div>
    </section>
  );
}
