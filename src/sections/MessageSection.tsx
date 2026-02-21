import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MessageSectionProps {
  className?: string;
}

const loveMessage = [
  "You make ordinary days feel like adventure mode.",
  "Thank you for every laugh, every hug, and every 'just because'.",
  "I'm so lucky to craft memories with you.",
  "Here's to more worlds to explore—together.",
];

export default function MessageSection({ className = '' }: MessageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const signoffRef = useRef<HTMLParagraphElement>(null);
  const heartRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [typedLines, setTypedLines] = useState<string[]>(['', '', '', '']);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
 if (!section) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { y: '10vh', scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
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

      // Start typing when section is visible
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        onEnter: () => setIsTyping(true),
      });

      // Sign-off entrance
      gsap.fromTo(
        signoffRef.current,
        { y: '3vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating hearts
      heartRefs.current.forEach((heart, i) => {
        if (!heart) return;
        gsap.to(heart, {
          y: -30,
          x: Math.sin(i) * 20,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isTyping || currentLine >= loveMessage.length) return;

    const text = loveMessage[currentLine];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < text.length) {
        setTypedLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = text.slice(0, charIndex + 1);
          return newLines;
        });
        charIndex++;
        setTimeout(typeChar, 40 + Math.random() * 30);
      } else {
        // Move to next line after a pause
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
        }, 500);
      }
    };

    typeChar();
  }, [isTyping, currentLine]);

  return (
    <section
      ref={sectionRef}
      id="message-section"
      className={`section-flowing bg-gradient-to-b from-sky to-pink-soft/30 ${className}`}
    >
      {/* Floating hearts background */}
      <div
        ref={(el) => { heartRefs.current[0] = el; }}
        className="absolute left-[8vw] top-[15vh] text-coral/30 text-3xl"
      >
        💖
      </div>
      <div
        ref={(el) => { heartRefs.current[1] = el; }}
        className="absolute right-[12vw] top-[25vh] text-coral/25 text-2xl"
      >
        💕
      </div>
      <div
        ref={(el) => { heartRefs.current[2] = el; }}
        className="absolute left-[15vw] top-[60vh] text-coral/20 text-xl"
      >
        💗
      </div>
      <div
        ref={(el) => { heartRefs.current[3] = el; }}
        className="absolute right-[8vw] top-[70vh] text-coral/25 text-2xl"
      >
        💝
      </div>
      <div
        ref={(el) => { heartRefs.current[4] = el; }}
        className="absolute left-[75vw] top-[40vh] text-coral/20 text-lg"
      >
        💘
      </div>
      <div
        ref={(el) => { heartRefs.current[5] = el; }}
        className="absolute left-[20vw] top-[80vh] text-coral/15 text-xl"
      >
        💕
      </div>

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div
          ref={cardRef}
          className="w-[min(90vw,980px)] bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-glow border-4 border-white"
        >
          {/* Title */}
          <h2
            ref={titleRef}
            className="font-pixel text-[clamp(16px,3vw,28px)] text-violet-dark mb-8"
          >
            To Sweety,
          </h2>

          {/* Message lines with typing effect */}
          <div className="space-y-4 mb-8">
            {loveMessage.map((_line, i) => (
              <p
                key={i}
                ref={(el) => { linesRef.current[i] = el; }}
                className="font-cute text-[clamp(14px,2vw,20px)] text-violet-dark leading-relaxed min-h-[1.5em]"
              >
                {typedLines[i]}
                {i === currentLine && isTyping && (
                  <span className="typing-cursor" />
                )}
              </p>
            ))}
          </div>

          {/* Sign-off */}
          <div ref={signoffRef} className="mt-12 text-right">
            <p className="font-cute text-[clamp(14px,2vw,20px)] text-violet-muted">
              Forever yours,
            </p>
            <p className="font-pixel text-[clamp(12px,1.5vw,18px)] text-coral mt-2">
              Your Love ❤️
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-candle rounded-full animate-sparkle" />
          <div className="absolute -bottom-3 -right-3 w-5 h-5 bg-coral rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -top-2 -right-4 w-4 h-4 bg-pink rounded-full animate-sparkle" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Additional floating decorations */}
      <div className="absolute left-[5vw] top-[50vh] text-candle text-2xl animate-sparkle">✨</div>
      <div className="absolute right-[10vw] top-[35vh] text-candle text-xl animate-sparkle" style={{ animationDelay: '0.7s' }}>✨</div>
    </section>
  );
}
