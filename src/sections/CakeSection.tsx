import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CakeSectionProps {
  className?: string;
}

/* ── Particle types ─────────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  shape: 'circle' | 'rect' | 'heart' | 'star';
  size: number;
  rotation: number;
  rotationSpeed: number;
}

/* ── Confetti colours ───────────────────────────────────────────── */
const COLORS = ['#FF6A97', '#FFB7D5', '#C9F0FF', '#FFF6B3', '#7EEA86', '#FFD36E', '#B983FF', '#FF8A8A'];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50,
    y: 45,
    vx: randomBetween(-14, 14),
    vy: randomBetween(-20, -4),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: (['circle', 'rect', 'heart', 'star'] as const)[Math.floor(Math.random() * 4)],
    size: randomBetween(6, 18),
    rotation: Math.random() * 360,
    rotationSpeed: randomBetween(-8, 8),
  }));
}

/* ── SVG Cake ───────────────────────────────────────────────────── */
function CakeSVG({ isCut }: { isCut: boolean }) {
  return (
    <svg
      viewBox="0 0 320 280"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-2xl"
      style={{ filter: 'drop-shadow(0 20px 40px rgba(255,106,151,0.35))' }}
    >
      <defs>
        {/* Cream gradient */}
        <linearGradient id="cream" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fffdf0" />
          <stop offset="100%" stopColor="#ffecc8" />
        </linearGradient>
        {/* Pink tier gradient */}
        <linearGradient id="pinkTier" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffafd4" />
          <stop offset="100%" stopColor="#ff6a97" />
        </linearGradient>
        {/* Blue tier gradient */}
        <linearGradient id="blueTier" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9f0ff" />
          <stop offset="100%" stopColor="#7ec8f0" />
        </linearGradient>
        {/* Yellow tier gradient */}
        <linearGradient id="yellowTier" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff6b3" />
          <stop offset="100%" stopColor="#ffd36e" />
        </linearGradient>
        {/* Inner cut gradient */}
        <linearGradient id="innerCut" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffe5f0" />
          <stop offset="50%" stopColor="#fff" />
          <stop offset="100%" stopColor="#ffe5f0" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Bottom tier (pink) ──────────────────────────────────── */}
      {!isCut ? (
        /* Full bottom tier */
        <>
          <rect x="40" y="200" width="240" height="60" rx="6" fill="url(#pinkTier)" />
          {/* Bottom shadow */}
          <rect x="40" y="254" width="240" height="6" rx="3" fill="#d44f80" opacity="0.4" />
          {/* Frosting drips */}
          {[60, 85, 115, 145, 170, 200, 230, 255].map((x, i) => (
            <ellipse key={i} cx={x} cy={200} rx="7" ry={5 + (i % 3) * 3} fill="url(#cream)" />
          ))}
          {/* Polka dots */}
          {[70, 110, 155, 200, 245].map((x, i) => (
            <circle key={i} cx={x} cy={228} r="5" fill="white" opacity="0.7" />
          ))}
          {[88, 130, 175, 220].map((x, i) => (
            <circle key={i} cx={x} cy={245} r="4" fill="white" opacity="0.5" />
          ))}
          {/* "Happy Birthday" text strip */}
          <rect x="70" y="212" width="180" height="18" rx="4" fill="white" opacity="0.35" />
          <text x="160" y="225" textAnchor="middle" fontFamily="'Press Start 2P'" fontSize="7" fill="#ff6a97">Happy Bday!</text>
        </>
      ) : (
        /* Split bottom tier — left half */
        <>
          <g id="left-bottom">
            <rect x="40" y="200" width="118" height="60" rx="6" fill="url(#pinkTier)" />
            {/* Cut face */}
            <rect x="156" y="200" width="8" height="60" fill="url(#innerCut)" />
            <rect x="40" y="254" width="118" height="6" rx="0" fill="#d44f80" opacity="0.4" />
          </g>
          {/* Right half */}
          <g id="right-bottom">
            <rect x="162" y="200" width="118" height="60" rx="6" fill="url(#pinkTier)" />
            <rect x="162" y="254" width="118" height="6" rx="0" fill="#d44f80" opacity="0.4" />
          </g>
          {/* Frosting drips (both sides) */}
          {[60, 85, 115].map((x, i) => (
            <ellipse key={i} cx={x} cy={200} rx="7" ry={5 + (i % 3) * 3} fill="url(#cream)" />
          ))}
          {[200, 230, 255].map((x, i) => (
            <ellipse key={i} cx={x} cy={200} rx="7" ry={5 + (i % 3) * 3} fill="url(#cream)" />
          ))}
          {/* Cream ooze at cut */}
          <ellipse cx="160" cy="220" rx="10" ry="14" fill="url(#cream)" opacity="0.9" />
          <ellipse cx="160" cy="240" rx="7" ry="10" fill="url(#cream)" opacity="0.7" />
          {/* Polka dots */}
          {[70, 110].map((x, i) => (
            <circle key={i} cx={x} cy={228} r="5" fill="white" opacity="0.7" />
          ))}
          {[200, 245].map((x, i) => (
            <circle key={i} cx={x} cy={228} r="5" fill="white" opacity="0.7" />
          ))}
        </>
      )}

      {/* ── Middle tier (blue) ─────────────────────────────────── */}
      {!isCut ? (
        <>
          <rect x="70" y="148" width="180" height="55" rx="6" fill="url(#blueTier)" />
          <rect x="70" y="196" width="180" height="6" rx="3" fill="#5098c0" opacity="0.4" />
          {[88, 108, 133, 158, 183, 208, 228].map((x, i) => (
            <ellipse key={i} cx={x} cy={148} rx="6" ry={4 + (i % 2) * 3} fill="url(#cream)" />
          ))}
          {[90, 130, 170, 210, 245].map((x, i) => (
            <circle key={i} cx={x} cy={168} r="4" fill="white" opacity="0.6" />
          ))}
          {[105, 150, 195, 235].map((x, i) => (
            <circle key={i} cx={x} cy={185} r="3" fill="white" opacity="0.5" />
          ))}
          {/* Star decorations */}
          {[95, 225].map((x, i) => (
            <text key={i} x={x} y={175} fontSize="14" textAnchor="middle">⭐</text>
          ))}
        </>
      ) : (
        <>
          {/* Split middle */}
          <rect x="70" y="148" width="88" height="55" rx="6" fill="url(#blueTier)" />
          <rect x="162" y="148" width="88" height="55" rx="6" fill="url(#blueTier)" />
          <rect x="158" y="148" width="8" height="55" fill="url(#innerCut)" />
          <rect x="70" y="196" width="88" height="6" fill="#5098c0" opacity="0.4" />
          <rect x="162" y="196" width="88" height="6" fill="#5098c0" opacity="0.4" />
          <ellipse cx="160" cy="170" rx="8" ry="10" fill="url(#cream)" opacity="0.9" />
          {[88, 108].map((x, i) => (
            <ellipse key={i} cx={x} cy={148} rx="6" ry={4 + (i % 2) * 3} fill="url(#cream)" />
          ))}
          {[208, 228].map((x, i) => (
            <ellipse key={i} cx={x} cy={148} rx="6" ry={4 + (i % 2) * 3} fill="url(#cream)" />
          ))}
        </>
      )}

      {/* ── Top tier (yellow) ──────────────────────────────────── */}
      {!isCut ? (
        <>
          <rect x="105" y="105" width="110" height="46" rx="6" fill="url(#yellowTier)" />
          <rect x="105" y="144" width="110" height="6" rx="3" fill="#c09040" opacity="0.4" />
          {[115, 135, 155, 175, 195, 205].map((x, i) => (
            <ellipse key={i} cx={x} cy={105} rx="5" ry={3 + (i % 2) * 3} fill="url(#cream)" />
          ))}
          {/* Heart decorations */}
          <text x="160" y="132" fontSize="12" textAnchor="middle">💛</text>
        </>
      ) : (
        <>
          <rect x="105" y="105" width="53" height="46" rx="6" fill="url(#yellowTier)" />
          <rect x="162" y="105" width="53" height="46" rx="6" fill="url(#yellowTier)" />
          <rect x="158" y="105" width="8" height="46" fill="url(#innerCut)" />
          <rect x="105" y="144" width="53" height="6" fill="#c09040" opacity="0.4" />
          <rect x="162" y="144" width="53" height="6" fill="#c09040" opacity="0.4" />
          <ellipse cx="160" cy="128" rx="7" ry="9" fill="url(#cream)" opacity="0.9" />
        </>
      )}

      {/* ── Candles (only before cut) ──────────────────────────── */}
      {!isCut && (
        <>
          {/* Candle 1 */}
          <rect x="128" y="72" width="9" height="36" rx="3" fill="#ff6a97" />
          <rect x="128" y="72" width="9" height="8" rx="2" fill="#ff8ab4" />
          {/* Wick */}
          <line x1="132" y1="72" x2="132" y2="66" stroke="#333" strokeWidth="1.5" />
          {/* Flame */}
          <ellipse cx="132" cy="60" rx="5" ry="8" fill="#FFD36E" filter="url(#glow)" className="cake-flame-1" />
          <ellipse cx="132" cy="63" rx="3" ry="5" fill="#FF8A00" filter="url(#glow)" className="cake-flame-1" />
          <ellipse cx="132" cy="66" rx="2" ry="3" fill="white" opacity="0.8" />

          {/* Candle 2 */}
          <rect x="149" y="68" width="9" height="40" rx="3" fill="#B983FF" />
          <rect x="149" y="68" width="9" height="8" rx="2" fill="#caa5ff" />
          <line x1="153" y1="68" x2="153" y2="62" stroke="#333" strokeWidth="1.5" />
          <ellipse cx="153" cy="56" rx="5" ry="8" fill="#FFD36E" filter="url(#glow)" className="cake-flame-2" />
          <ellipse cx="153" cy="59" rx="3" ry="5" fill="#FF8A00" filter="url(#glow)" className="cake-flame-2" />
          <ellipse cx="153" cy="62" rx="2" ry="3" fill="white" opacity="0.8" />

          {/* Candle 3 */}
          <rect x="170" y="72" width="9" height="36" rx="3" fill="#7EEA86" />
          <rect x="170" y="72" width="9" height="8" rx="2" fill="#a6f5ac" />
          <line x1="174" y1="72" x2="174" y2="66" stroke="#333" strokeWidth="1.5" />
          <ellipse cx="174" cy="60" rx="5" ry="8" fill="#FFD36E" filter="url(#glow)" className="cake-flame-3" />
          <ellipse cx="174" cy="63" rx="3" ry="5" fill="#FF8A00" filter="url(#glow)" className="cake-flame-3" />
          <ellipse cx="174" cy="66" rx="2" ry="3" fill="white" opacity="0.8" />

          {/* Glow halos */}
          <circle cx="132" cy="62" r="12" fill="#FFD36E" opacity="0.15" />
          <circle cx="153" cy="58" r="12" fill="#FFD36E" opacity="0.15" />
          <circle cx="174" cy="62" r="12" fill="#FFD36E" opacity="0.15" />
        </>
      )}

      {/* ── Cherry on top ──────────────────────────────────────── */}
      {!isCut && (
        <>
          <circle cx="160" cy="100" r="7" fill="#e02060" filter="url(#glow)" />
          <circle cx="160" cy="97" r="3" fill="#ff6090" opacity="0.6" />
          <path d="M160 94 Q165 88 168 82" stroke="#2d8a00" strokeWidth="2" fill="none" />
        </>
      )}

      {/* ── Plate ──────────────────────────────────────────────── */}
      <ellipse cx="160" cy="262" rx="145" ry="14" fill="white" opacity="0.9" />
      <ellipse cx="160" cy="262" rx="145" ry="14" fill="none" stroke="#ddd" strokeWidth="3" />
      <ellipse cx="160" cy="260" rx="125" ry="9" fill="none" stroke="#ddd" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

/* ── Knife SVG ─────────────────────────────────────────────────── */
function KnifeSVG() {
  return (
    <svg viewBox="0 0 80 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="blade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a0a0b0" />
          <stop offset="40%" stopColor="#f0f0ff" />
          <stop offset="100%" stopColor="#c0c0d0" />
        </linearGradient>
        <linearGradient id="handle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#5C3010" />
        </linearGradient>
        <filter id="knifeGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Handle */}
      <rect x="28" y="0" width="24" height="65" rx="6" fill="url(#handle)" />
      <rect x="32" y="4" width="10" height="57" rx="3" fill="#a0622a" opacity="0.5" />
      {/* Bolsters */}
      <rect x="22" y="60" width="36" height="10" rx="3" fill="#888" />
      <rect x="22" y="63" width="36" height="4" rx="1" fill="#aaa" opacity="0.6" />
      {/* Blade */}
      <path d="M30 70 L50 70 L46 185 L34 185 Z" fill="url(#blade)" filter="url(#knifeGlow)" />
      {/* Edge highlight */}
      <path d="M40 70 L37 185" stroke="white" strokeWidth="1.5" opacity="0.7" />
      {/* Tip */}
      <path d="M34 185 L40 195 L46 185" fill="#d0d0e0" />
      {/* Shine line */}
      <line x1="44" y1="74" x2="44" y2="178" stroke="white" strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

/* ── Shockwave component ────────────────────────────────────────── */
function Shockwave({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
      <div className="shockwave-ring" />
      <div className="shockwave-ring" style={{ animationDelay: '0.15s' }} />
      <div className="shockwave-ring" style={{ animationDelay: '0.3s' }} />
    </div>
  );
}

/* ── Particle field ─────────────────────────────────────────────── */
function ParticleField({ particles, active }: { particles: Particle[]; active: boolean }) {
  if (!active || particles.length === 0) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-burst"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              '--vx': `${p.vx}vw`,
              '--vy': `${p.vy}vh`,
              '--rot': `${p.rotation}deg`,
              '--rot-end': `${p.rotation + p.rotationSpeed * 100}deg`,
              '--size': `${p.size}px`,
              '--color': p.color,
              animationDelay: `${Math.random() * 0.15}s`,
            } as React.CSSProperties
          }
        >
          {p.shape === 'heart' ? '💖' : p.shape === 'star' ? '⭐' : ''}
        </div>
      ))}
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function CakeSection({ className = '' }: CakeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cakeWrapRef = useRef<HTMLDivElement>(null);
  const knifeRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const postMsgRef = useRef<HTMLDivElement>(null);
  const cakeContainerRef = useRef<HTMLDivElement>(null);

  const [isCut, setIsCut] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showShockwave, setShowShockwave] = useState(false);
  const [particles] = useState<Particle[]>(() => generateParticles(120));
  const [phase, setPhase] = useState<'idle' | 'cutting' | 'cut'>('idle');

  /* ── Scroll-driven entrance ─────────────────────────────────── */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
        },
      });

      // Ground rise
      scrollTl.fromTo(groundRef.current, { y: '40vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0);

      // Cake drop with bounce
      scrollTl.fromTo(
        cakeWrapRef.current,
        { y: '60vh', scale: 0.8, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'back.out(1.5)', duration: 0.5 },
        0.05
      );

      // Message entrance
      scrollTl.fromTo(messageRef.current, { y: '-18vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1);

      // CTA pulse entrance
      scrollTl.fromTo(
        ctaRef.current,
        { y: '14vh', scale: 0.85, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'back.out(1.2)' },
        0.18
      );

      // Exit phase
      scrollTl.fromTo(messageRef.current, { opacity: 1 }, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(ctaRef.current, { opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.72);
      scrollTl.fromTo(cakeWrapRef.current, { opacity: 1 }, { y: '-20vh', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(groundRef.current, { opacity: 1 }, { y: '20vh', opacity: 0, ease: 'power2.in' }, 0.75);
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Idle knife float ───────────────────────────────────────── */
  useLayoutEffect(() => {
    if (phase !== 'idle' || !knifeRef.current) return;
    gsap.to(knifeRef.current, { y: -8, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, [phase]);

  /* ── Cut animation ──────────────────────────────────────────── */
  const cutCake = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('cutting');

    const tl = gsap.timeline();

    /* 1. Knife winds up */
    tl.to(knifeRef.current, {
      x: '8vw',
      rotation: 20,
      scale: 1.15,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    /* 2. Knife charges in as glowing streak */
    tl.to(knifeRef.current, {
      x: 0,
      rotation: -10,
      scale: 1.05,
      duration: 0.12,
      ease: 'power4.in',
    });

    /* 3. Knife plunges DOWN through the cake */
    tl.to(knifeRef.current, {
      y: '28vh',
      rotation: 0,
      duration: 0.18,
      ease: 'expo.in',
    });

    /* 4. Screen flash + shockwave + cake sets as cut */
    tl.call(() => {
      setShowShockwave(true);
      if (flashRef.current) {
        gsap.fromTo(flashRef.current, { opacity: 0.85 }, { opacity: 0, duration: 0.55, ease: 'expo.out' });
      }
      // Cake shake
      gsap.to(cakeContainerRef.current, {
        x: 6,
        duration: 0.05,
        repeat: 9,
        yoyo: true,
        ease: 'none',
        onComplete: () => { gsap.set(cakeContainerRef.current, { x: 0 }); },
      });
      setTimeout(() => setShowShockwave(false), 700);
    });

    /* 5. Mark as cut immediately after plunge */
    tl.call(() => setIsCut(true));

    /* 6. Knife whisks out sideways */
    tl.to(knifeRef.current, {
      x: '-35vw',
      rotation: -30,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in',
    });

    /* 7. Particles explode */
    tl.call(() => {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 3200);
    });

    /* 8. Post-cut message pops in */
    tl.fromTo(
      postMsgRef.current,
      { scale: 0, opacity: 0, rotation: -6 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.65, ease: 'back.out(2)' },
      '-=0.25'
    );

    /* 9. Finale pulse */
    tl.to(postMsgRef.current, { scale: 1.04, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' });

    tl.call(() => setPhase('cut'));
  }, [phase]);

  return (
    <section
      ref={sectionRef}
      id="cake-section"
      className={`section-pinned bg-gradient-to-b from-sky to-sky-light ${className}`}
    >
      {/* ── Screen flash overlay ──────────────────────────────── */}
      <div
        ref={flashRef}
        className="fixed inset-0 z-[200] pointer-events-none bg-white"
        style={{ opacity: 0 }}
      />

      {/* ── Shockwave ─────────────────────────────────────────── */}
      <Shockwave active={showShockwave} />

      {/* ── Particles ─────────────────────────────────────────── */}
      <ParticleField particles={particles} active={showParticles} />

      {/* ── Ambient floating sparkles ─────────────────────────── */}
      {['10vw', '88vw', '22vw', '74vw', '50vw'].map((left, i) => (
        <div
          key={i}
          className="absolute text-candle animate-sparkle pointer-events-none select-none z-10"
          style={{
            left,
            top: `${20 + i * 12}vh`,
            fontSize: `${14 + i * 3}px`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          ✨
        </div>
      ))}

      {/* ── Floating hearts (ambient) ─────────────────────────── */}
      {['💖', '💕', '💗', '💝', '💘'].map((h, i) => (
        <div
          key={i}
          className="absolute animate-heart-float pointer-events-none select-none opacity-40 z-10"
          style={{
            left: `${5 + i * 20}vw`,
            top: `${25 + (i % 2) * 20}vh`,
            fontSize: `${16 + i * 2}px`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${7 + i}s`,
          }}
        >
          {h}
        </div>
      ))}

      {/* ── Ground platform ───────────────────────────────────── */}
      <div ref={groundRef} className="absolute left-1/2 top-[78vh] -translate-x-1/2 w-[110vw] h-[26vh]">
        <div className="grass-platform w-full h-full">
          <div className="absolute top-0 left-0 right-0 h-4 flex">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-full bg-grass/60"
                style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Message area ──────────────────────────────────────── */}
      <div
        ref={messageRef}
        className="absolute left-1/2 top-[12vh] -translate-x-1/2 w-[min(90vw,900px)] text-center z-20"
      >
        {!isCut ? (
          <div>
            <h2 className="font-pixel text-[clamp(16px,3vw,36px)] text-violet-dark mb-3 leading-relaxed">
              Make a wish, Sweety! 🌟
            </h2>
            <p className="font-cute text-[clamp(13px,1.8vw,20px)] text-violet-muted animate-float">
              Tap the cake — or the button — to cut it!
            </p>
          </div>
        ) : (
          <div ref={postMsgRef} style={{ opacity: 0, scale: 0 }}>
            <h2
              className="font-pixel text-[clamp(18px,3.5vw,44px)] text-coral pixel-glow leading-relaxed"
              style={{ textShadow: '0 0 30px rgba(255,106,151,0.8), 0 0 60px rgba(255,106,151,0.4)' }}
            >
              Happy Birthday My Love 🎂❤️
            </h2>
            <p className="font-cute text-[clamp(13px,1.8vw,20px)] text-violet-muted mt-3">
              Keep scrolling for more surprises! ✨
            </p>
          </div>
        )}
      </div>

      {/* ── Cake + Knife container ─────────────────────────────── */}
      <div ref={cakeContainerRef} className="absolute inset-0 pointer-events-none">
        {/* Cake */}
        <div
          ref={cakeWrapRef}
          className="absolute left-1/2 top-[54vh] -translate-x-1/2 -translate-y-1/2 w-[min(52vw,400px)] cursor-pointer pointer-events-auto"
          onClick={cutCake}
          title="Click to cut the cake!"
        >
          {/* Hover glow ring */}
          {phase === 'idle' && (
            <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 60px 20px rgba(255,106,151,0.3)', borderRadius: '50%' }} />
          )}
          <CakeSVG isCut={isCut} />
        </div>

        {/* Knife */}
        <div
          ref={knifeRef}
          className="absolute z-30 pointer-events-none"
          style={{
            left: 'calc(50% + 80px)',
            top: 'calc(54vh - 200px)',
            width: 'clamp(40px, 5vw, 70px)',
            height: 'clamp(80px, 12vh, 160px)',
            opacity: isCut ? 0 : 1,
            filter: phase === 'cutting' ? 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 24px #ff6a97)' : 'drop-shadow(2px 4px 8px rgba(0,0,0,0.25))',
          }}
        >
          <KnifeSVG />
        </div>
      </div>

      {/* ── CTA button ───────────────────────────────────────── */}
      {phase === 'idle' && (
        <button
          ref={ctaRef}
          onClick={cutCake}
          className="btn-coral absolute left-1/2 top-[74vh] -translate-x-1/2 z-20"
          style={{ letterSpacing: '0.05em' }}
        >
          🎂 Cut the Cake!
        </button>
      )}
    </section>
  );
}
