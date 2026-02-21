import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface StorySectionProps {
  className?: string;
}

export default function StorySection({ className = '' }: StorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const groundRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const decorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0-30%)
      // Clouds entrance
      scrollTl.fromTo(
        cloudRefs.current[0],
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );
      scrollTl.fromTo(
        cloudRefs.current[1],
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.02
      );
      scrollTl.fromTo(
        cloudRefs.current[2],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 0.7, ease: 'power2.out' },
        0.04
      );

      // Ground platform entrance
      scrollTl.fromTo(
        groundRef.current,
        { y: '40vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Decorative blocks entrance
      blockRefs.current.forEach((block, i) => {
        if (block) {
          scrollTl.fromTo(
            block,
            { y: '30vh', rotation: -10, opacity: 0 },
            { y: 0, rotation: 0, opacity: 1, ease: 'power2.out' },
            0.12 + i * 0.04
          );
        }
      });

      // Trees/flowers entrance
      decorRefs.current.forEach((decor, i) => {
        if (decor) {
          scrollTl.fromTo(
            decor,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'back.out(1.4)' },
            0.15 + i * 0.03
          );
        }
      });

      // Headline entrance
      scrollTl.fromTo(
        headlineRef.current,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Body text entrance
      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.16
      );

      // SETTLE (30-70%): Elements hold position

      // EXIT (70-100%)
      // Headline + body exit
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Ground exit
      scrollTl.fromTo(
        groundRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      // Blocks exit
      blockRefs.current.forEach((block, i) => {
        if (block) {
          scrollTl.fromTo(
            block,
            { y: 0, rotation: 0, opacity: 1 },
            { y: '-24vh', rotation: 8 - i * 4, opacity: 0.2, ease: 'power2.in' },
            0.72 + i * 0.02
          );
        }
      });

      // Decor exit
      decorRefs.current.forEach((decor, i) => {
        if (decor) {
          scrollTl.fromTo(
            decor,
            { scale: 1, opacity: 1 },
            { scale: 0.8, opacity: 0, ease: 'power2.in' },
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story-section"
      className={`section-pinned bg-gradient-to-b from-sky to-sky-light ${className}`}
      style={{ position: 'relative' }}
    >
      {/* Clouds */}
      <div
        ref={(el) => { cloudRefs.current[0] = el; }}
        className="absolute left-[6vw] top-[8vh] w-[32vw]"
        style={{ animation: 'cloud-drift 6s ease-in-out infinite' }}
      >
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-lg">
          <ellipse cx="50" cy="60" rx="40" ry="30" fill="white" />
          <ellipse cx="100" cy="50" rx="50" ry="35" fill="white" />
          <ellipse cx="150" cy="60" rx="40" ry="30" fill="white" />
        </svg>
      </div>
      <div
        ref={(el) => { cloudRefs.current[1] = el; }}
        className="absolute left-[66vw] top-[12vh] w-[28vw]"
        style={{ animation: 'cloud-drift 6s ease-in-out infinite', animationDelay: '1s' }}
      >
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-lg">
          <ellipse cx="60" cy="55" rx="45" ry="32" fill="white" />
          <ellipse cx="120" cy="45" rx="55" ry="38" fill="white" />
          <ellipse cx="170" cy="55" rx="35" ry="28" fill="white" />
        </svg>
      </div>
      <div
        ref={(el) => { cloudRefs.current[2] = el; }}
        className="absolute left-[40vw] top-[70vh] w-[24vw] opacity-70"
      >
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-lg">
          <ellipse cx="50" cy="55" rx="35" ry="28" fill="white" />
          <ellipse cx="100" cy="45" rx="45" ry="32" fill="white" />
          <ellipse cx="150" cy="55" rx="35" ry="28" fill="white" />
        </svg>
      </div>

      {/* Decorative trees and flowers */}
      <div
        ref={(el) => { decorRefs.current[0] = el; }}
        className="absolute left-[8vw] top-[50vh] w-[12vw] md:w-[8vw] max-w-[80px]"
      >
        <div className="relative">
          <div className="w-full aspect-square bg-grass mc-block rounded-lg" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">🌳</div>
        </div>
      </div>
      <div
        ref={(el) => { decorRefs.current[1] = el; }}
        className="absolute left-[22vw] top-[58vh] w-[6vw] max-w-[60px]"
      >
        <div className="text-4xl" style={{ animation: 'float 3s ease-in-out infinite' }}>🌸</div>
      </div>
      <div
        ref={(el) => { decorRefs.current[2] = el; }}
        className="absolute left-[78vw] top-[52vh] w-[12vw] md:w-[8vw] max-w-[80px]"
      >
        <div className="relative">
          <div className="w-full aspect-square bg-grass mc-block rounded-lg" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">🌲</div>
        </div>
      </div>
      <div
        ref={(el) => { decorRefs.current[3] = el; }}
        className="absolute left-[68vw] top-[60vh] w-[6vw] max-w-[60px]"
      >
        <div className="text-4xl" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}>🌺</div>
      </div>
      <div
        ref={(el) => { decorRefs.current[4] = el; }}
        className="absolute left-[45vw] top-[55vh] w-[6vw] max-w-[60px]"
      >
        <div className="text-4xl" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1s' }}>⭐</div>
      </div>

      {/* Floating blocks */}
      <div
        ref={(el) => { blockRefs.current[0] = el; }}
        className="absolute left-[12vw] top-[62vh] w-[10vw] max-w-[100px]"
      >
        <div className="mc-block bg-stone aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
        </div>
      </div>
      <div
        ref={(el) => { blockRefs.current[1] = el; }}
        className="absolute left-[82vw] top-[58vh] w-[14vw] md:w-[9vw] max-w-[90px] opacity-0 hidden sm:block"
      >
        <div className="mc-block bg-dirt aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      </div>

      {/* Ground platform */}
      <div
        ref={groundRef}
        className="absolute left-1/2 top-[78vh] -translate-x-1/2 w-[110vw] h-[26vh]"
      >
        <div className="grass-platform w-full h-full">
          {/* Grass top detail */}
          <div className="absolute top-0 left-0 right-0 h-4 flex">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="flex-1 h-full bg-grass/50" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,860px)] text-center">
        <h2
          ref={headlineRef}
          className="font-pixel text-[clamp(16px,3.5vw,38px)] text-violet-dark leading-tight mb-6"
        >
          Every block holds a memory…
        </h2>
        <p
          ref={bodyRef}
          className="font-cute text-[clamp(14px,2vw,22px)] text-violet-muted"
        >
          Scroll to build the world we share.
        </p>
      </div>

      {/* Floating hearts */}
      <div className="absolute left-[15vw] top-[30vh] text-coral/40 text-xl" style={{ animation: 'heart-float 8s ease-in-out infinite' }}>
        💖
      </div>
      <div className="absolute left-[80vw] top-[35vh] text-coral/30 text-lg" style={{ animation: 'heart-float 8s ease-in-out infinite', animationDelay: '3s' }}>
        💕
      </div>
    </section>
  );
}
