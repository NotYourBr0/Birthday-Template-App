import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

interface IntroSectionProps {
  className?: string;
}

export default function IntroSection({ className = '' }: IntroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Clouds entrance
      cloudRefs.current.forEach((cloud, i) => {
        if (cloud) {
          tl.fromTo(
            cloud,
            { opacity: 0, y: '-6vh' },
            { opacity: 1, y: 0, duration: 0.8 },
            i * 0.15
          );
        }
      });

      // Headline entrance with split text effect
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 24, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)' },
          0.4
        );
      }

      // Subline entrance
      if (sublineRef.current) {
        tl.fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.8
        );
      }

      // Floating blocks entrance
      blockRefs.current.forEach((block, i) => {
        if (block) {
          tl.fromTo(
            block,
            { opacity: 0, y: 40, rotation: -10 },
            { opacity: 1, y: 0, rotation: 0, duration: 0.6, ease: 'back.out(1.4)' },
            0.6 + i * 0.1
          );
        }
      });

      // CTA button entrance
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.8)' },
          1
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([headlineRef.current, sublineRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
              scale: 1,
            });
            cloudRefs.current.forEach((cloud) => {
              if (cloud) gsap.set(cloud, { x: 0, y: 0, opacity: 1 });
            });
            blockRefs.current.forEach((block) => {
              if (block) gsap.set(block, { y: 0, rotation: 0, opacity: 1 });
            });
          },
        },
      });

      // ENTRANCE (0-30%): Hold - elements already visible from load animation
      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      // Headline exit
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      // Subline exit
      scrollTl.fromTo(
        sublineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // CTA exit
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '10vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.75
      );

      // Clouds parallax exit
      scrollTl.fromTo(
        cloudRefs.current[0],
        { x: 0 },
        { x: '-18vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        cloudRefs.current[1],
        { x: 0 },
        { x: '14vw', opacity: 0.3, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        cloudRefs.current[2],
        { y: 0 },
        { y: '10vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      // Blocks exit
      blockRefs.current.forEach((block, i) => {
        if (block) {
          scrollTl.fromTo(
            block,
            { y: 0, rotation: 0, opacity: 1 },
            { y: '-22vh', rotation: -6 + i * 4, opacity: 0.2, ease: 'power2.in' },
            0.72 + i * 0.02
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('story-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="intro-section"
      className={`section-pinned bg-gradient-to-b from-sky to-sky-light ${className}`}
      style={{ position: 'relative' }}
    >
      {/* Clouds */}
      <div
        ref={(el) => { cloudRefs.current[0] = el; }}
        className="absolute left-[8vw] top-[10vh] w-[40vw] md:w-[34vw] opacity-0"
      >
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-lg">
          <ellipse cx="50" cy="60" rx="40" ry="30" fill="white" />
          <ellipse cx="100" cy="50" rx="50" ry="35" fill="white" />
          <ellipse cx="150" cy="60" rx="40" ry="30" fill="white" />
        </svg>
      </div>
      <div
        ref={(el) => { cloudRefs.current[1] = el; }}
        className="absolute left-[62vw] top-[16vh] w-[35vw] md:w-[30vw] opacity-0"
      >
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-lg">
          <ellipse cx="60" cy="55" rx="45" ry="32" fill="white" />
          <ellipse cx="120" cy="45" rx="55" ry="38" fill="white" />
          <ellipse cx="170" cy="55" rx="35" ry="28" fill="white" />
        </svg>
      </div>
      <div
        ref={(el) => { cloudRefs.current[2] = el; }}
        className="absolute left-[44vw] top-[62vh] w-[30vw] md:w-[26vw] opacity-0 hidden sm:block"
      >
        <svg viewBox="0 0 200 100" className="w-full drop-shadow-lg opacity-80">
          <ellipse cx="50" cy="55" rx="35" ry="28" fill="white" />
          <ellipse cx="100" cy="45" rx="45" ry="32" fill="white" />
          <ellipse cx="150" cy="55" rx="35" ry="28" fill="white" />
        </svg>
      </div>

      {/* Floating blocks */}
      <div
        ref={(el) => { blockRefs.current[0] = el; }}
        className="absolute left-[18vw] top-[56vh] w-[10vw] max-w-[100px] opacity-0"
        style={{ animation: 'float-slow 4s ease-in-out infinite' }}
      >
        <div className="mc-block bg-grass aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        </div>
      </div>
      <div
        ref={(el) => { blockRefs.current[1] = el; }}
        className="absolute left-[76vw] top-[64vh] w-[8vw] max-w-[80px] opacity-0"
        style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}
      >
        <div className="mc-block bg-dirt aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      </div>
      <div
        ref={(el) => { blockRefs.current[2] = el; }}
        className="absolute left-[12vw] top-[30vh] w-[10vw] md:w-[6vw] max-w-[60px] opacity-0 hidden md:block"
        style={{ animation: 'float-slow 4s ease-in-out infinite', animationDelay: '1s' }}
      >
        <div className="mc-block bg-stone aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />
        </div>
      </div>

      {/* Hero content */}
      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,980px)] text-center">
        <h1
          ref={headlineRef}
          className="font-pixel text-[clamp(18px,4vw,44px)] text-violet-dark leading-tight mb-6 pixel-glow"
        >
          <span className="word inline-block">Happy</span>{' '}
          <span className="word inline-block text-coral">18th</span>{' '}
          <span className="word inline-block">Birthday</span>
          <br />
          <span className="word inline-block mt-2">Sweety</span>
        </h1>
        <p
          ref={sublineRef}
          className="font-cute text-[clamp(16px,2vw,24px)] text-violet-muted opacity-0"
        >
          A little world built just for you.
        </p>
      </div>

      {/* CTA Button */}
      <button
        ref={ctaRef}
        onClick={scrollToNext}
        className="btn-coral absolute left-1/2 top-[68vh] -translate-x-1/2 opacity-0"
        style={{ animation: 'bounce 2s ease-in-out infinite' }}
      >
        Open Your Gift
      </button>

      {/* Decorative hearts */}
      <div className="absolute left-[85vw] top-[25vh] text-coral/40 text-2xl" style={{ animation: 'heart-float 8s ease-in-out infinite' }}>
        💖
      </div>
      <div className="absolute left-[10vw] top-[70vh] text-coral/30 text-xl" style={{ animation: 'heart-float 8s ease-in-out infinite', animationDelay: '2s' }}>
        💕
      </div>
    </section>
  );
}
