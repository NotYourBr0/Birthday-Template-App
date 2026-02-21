import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

interface ClosingSectionProps {
  className?: string;
}

export default function ClosingSection({ className = '' }: ClosingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heart entrance
      gsap.fromTo(
        heartRef.current,
        { scale: 0.7, rotation: -10, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Text entrance
      gsap.fromTo(
        textRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Button entrance
      gsap.fromTo(
        buttonRef.current,
        { y: '6vh', scale: 0.92, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous heart pulse
      gsap.to(heartRef.current, {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: 'power2.inOut',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="closing-section"
      className={`section-flowing bg-gradient-to-b from-sky-light to-sky min-h-screen flex items-center justify-center ${className}`}
    >
      <div className="text-center px-4">
        {/* Big pixel heart */}
        <div
          ref={heartRef}
          className="mx-auto mb-8 w-[min(30vw,150px)]"
        >
          <svg viewBox="0 0 100 100" className="w-full drop-shadow-glow">
            <path
              d="M50 85 C50 85, 20 60, 20 40 C20 25, 30 15, 42 15 C48 15, 50 20, 50 20 C50 20, 52 15, 58 15 C70 15, 80 25, 80 40 C80 60, 50 85, 50 85Z"
              fill="#FF6A97"
              stroke="#2F2B5C"
              strokeWidth="3"
            />
            <path
              d="M35 30 Q40 25 45 30"
              stroke="white"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Text */}
        <p
          ref={textRef}
          className="font-cute text-[clamp(16px,2.5vw,24px)] text-violet-dark mb-8"
        >
          Made with blocks & love.
        </p>

        {/* Replay button */}
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          className="btn-coral"
        >
          Replay
        </button>
      </div>

      {/* Floating decorations */}
      <div className="absolute left-[10vw] top-[20vh] text-coral/30 animate-heart-float text-xl">
        💖
      </div>
      <div className="absolute right-[15vw] top-[30vh] text-coral/20 animate-heart-float text-lg" style={{ animationDelay: '2s' }}>
        💕
      </div>
      <div className="absolute left-[80vw] top-[70vh] text-coral/25 animate-heart-float text-xl" style={{ animationDelay: '4s' }}>
        💗
      </div>
      <div className="absolute left-[20vw] top-[75vh] text-candle/40 animate-sparkle text-2xl">✨</div>
      <div className="absolute right-[25vw] top-[15vh] text-candle/30 animate-sparkle text-xl" style={{ animationDelay: '0.7s' }}>✨</div>
    </section>
  );
}
