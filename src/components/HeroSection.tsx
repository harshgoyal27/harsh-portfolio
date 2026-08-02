import { useEffect, useRef } from 'react';
import FadeIn from './FadeIn';
import CinematicLayer from './CinematicLayer';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Snap-scroll wheel / keyboard arrow jump to About
  useEffect(() => {
    let fired = false;

    const goToAbout = () => {
      if (fired) return;
      fired = true;
      const about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    const onWheel = (e: WheelEvent) => {
      if (fired) return;
      if (e.deltaY <= 0) return;
      if (window.scrollY > 50) return;
      e.preventDefault();
      goToAbout();
    };

    const onKey = (e: KeyboardEvent) => {
      if (fired) return;
      if (window.scrollY > 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToAbout();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#050508]">
      
      {/* 1. Blurred Background Ambient Image (Dynamic Purple Light Glow) */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
        <img
          src="/chip.jpg"
          alt=""
          className="h-full w-full object-cover filter blur-[65px] opacity-[0.3] scale-[1.12]"
        />
      </div>

      {/* 2. Three.js Floating 3D Bokeh Particle Layer */}
      <CinematicLayer />

      {/* 3. Dark Vignette Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/35 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-10" />
      
      {/* Soft purple monitor glow accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vh] rounded-full pointer-events-none z-10 opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)'
        }}
      />

      {/* 4. Complete Content Interactive Layer */}
      <div className="relative z-20 flex h-full flex-col justify-between">
        
        {/* Top bar */}
        <FadeIn delay={0} y={-20} className="relative">
          <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
            <ul className="flex items-center gap-5 sm:gap-8 md:gap-12">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.03] hover:border-purple-500/40"
            >
              Email me
            </a>
          </div>
        </FadeIn>

        {/* Middle content: Grid split */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-6 md:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
              
              {/* Left Column: Typography Layout */}
              <div className="flex flex-col items-start select-none">
                <FadeIn delay={0.3} y={20}>
                  <p className="mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.35em] text-purple-500/80 drop-shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                    VLSI ENGINEER
                  </p>
                </FadeIn>

                <FadeIn delay={0.5} y={40}>
                  <h1
                    className="font-black uppercase leading-[0.88] tracking-tight text-white flex flex-col"
                    style={{ fontSize: 'clamp(2.8rem, 11vw, 7.8rem)' }}
                  >
                    <span>Rishik</span>
                    <span>Kumar</span>
                    <span className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.22)]">
                      Singh
                    </span>
                  </h1>
                </FadeIn>

                <FadeIn delay={0.85} y={20}>
                  <p className="mt-5 md:mt-7 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-white/70 max-w-xl leading-relaxed">
                    Developer · Designer · GenAI Integration
                  </p>
                </FadeIn>
              </div>

              {/* Right Column: Centered Widescreen Film Frame */}
              <FadeIn delay={0.65} y={30} className="flex justify-center items-center">
                <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-[24px] overflow-hidden bg-[#030303] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_0_0_1px_rgba(255,255,255,0.06)] hover:border-purple-500/35 hover:shadow-[0_45px_90px_rgba(0,0,0,0.9),0_0_35px_rgba(168,85,247,0.06)] transition-all duration-700 group">
                  
                  {/* Film Header Overlay */}
                  <div className="absolute top-0 left-0 w-full h-[22px] bg-black flex items-center px-4 z-20 border-b border-white/5">
                    <span className="font-mono text-[7px] tracking-widest text-[#555] font-bold">
                      HD RENDER // CINEMATIC PRO
                    </span>
                  </div>

                  {/* Foreground Image Screen */}
                  <div className="relative w-full h-full py-[22px] box-border">
                    <img
                      src="/chip.jpg"
                      alt="VLSI Microchip"
                      className="w-full h-full object-cover block"
                      draggable={false}
                    />
                  </div>

                  {/* Film Footer Overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-[22px] bg-black flex items-center justify-between px-4 z-20 border-t border-white/5">
                    <span className="font-mono text-[7px] tracking-widest text-[#555] font-bold">
                      REC 00:00:24:19
                    </span>
                    <span className="font-mono text-[7px] tracking-widest text-[#555] font-bold">
                      ISO 400
                    </span>
                  </div>

                </div>
              </FadeIn>

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12 z-20">
          
          {/* Scroll down indicator */}
          <FadeIn delay={1.1} y={20}>
            <a href="#about" aria-label="Scroll to next section" className="group flex flex-col items-center gap-3">
              <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60 transition group-hover:text-purple-500">
                Scroll
              </span>
              <div className="relative h-12 w-px overflow-hidden bg-white/20 group-hover:bg-purple-500/25 transition">
                <span
                  className="absolute inset-x-0 top-0 h-1/2 w-full bg-white group-hover:bg-purple-500"
                  style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
                />
              </div>
            </a>
          </FadeIn>

        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
