import { useRef, useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import videoSrc from "../assets/hero_bg_loop.mp4"; // keep your video in src/assets

export default function HeroSection() {
  // ref for the whole hero (video play/pause)
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // ref for KPI area (triggers count up + reveal)
  const [kpiRef, kpiInView] = useInView({ rootMargin: "-20% 0px" });

  // Start video only when hero is in viewport to save resources
  const [heroInViewRef, heroInView] = useInView({ rootMargin: "-50% 0px" });

  useEffect(() => {
    if (!videoRef.current) return;
    if (heroInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [heroInView]);

  // KPI data with numeric target for counting
  const kpis = [
    { id: 1, target: 50, suffix: "+", label: "Research Publications", color: "from-green-400 to-green-600" },
    { id: 2, target: 12, suffix: "", label: "Ongoing Projects", color: "from-green-300 to-green-500" },
    { id: 3, target: 30, suffix: "+", label: "Team Members", color: "from-green-500 to-green-700" },
  ];

  return (
    <section
      id="home"
      ref={heroInViewRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      aria-label="Hero section"
    >
      {/* Animated background blobs */}
      <svg className="absolute -z-10 left-0 top-0 w-[60rem] opacity-30 blob1" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <path fill="url(#g1)" d="M423,39Q495,78,508,151.5Q521,225,476.5,286.5Q432,348,350,386Q268,424,190.5,379.5Q113,335,82,256Q51,177,85,101.5Q119,26,198,31.5Q277,37,423,39Z" />
      </svg>

      <svg className="absolute -z-10 right-0 bottom-10 w-[50rem] opacity-25 blob2" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <path fill="url(#g2)" d="M420,50Q480,100,500,170Q520,240,470,295Q420,350,355,385Q290,420,225,375Q160,330,110,265Q60,200,72.5,127Q85,54,155,38Q225,22,320,34Q415,46,420,50Z"/>
      </svg>

      {/* Background video for larger screens */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden sm:block"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Mobile fallback image */}
      <div className="absolute inset-0 bg-center bg-cover sm:hidden" style={{ backgroundImage: "url('/lab-wallpaper.jpg')" }} />

      {/* Soft overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-xl tracking-tight">
          ALGAL BIOTECHNOLOGY LABORATORY
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
          Pushing microalgal science forward — sustainable biofuels, carbon capture, and high-value bioproducts.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#research"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-xl transform transition hover:-translate-y-1 hover:scale-105"
          >
            Explore Research
            <span className="inline-block rounded-full bg-white/20 px-2 py-1 text-sm">→</span>
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 text-white/90 hover:bg-white/5 transition"
          >
            About the Lab
          </a>
        </div>

        {/* KPI Grid */}
        <div
          ref={kpiRef}
          className={`mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full px-4 md:px-0 ${
            kpiInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } transition-all duration-700`}
        >
          {kpis.map((k) => (
            <TiltKPI
              key={k.id}
              target={k.target}
              suffix={k.suffix}
              label={k.label}
              gradient={k.color}
              trigger={kpiInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------
   TiltKPI: card with cursor tilt + count-up
   ------------------------------- */
function TiltKPI({ target = 0, suffix = "", label = "", gradient = "from-green-400 to-green-600", trigger = false }) {
  const cardRef = useRef(null);
  const numRef = useRef(null);
  const [display, setDisplay] = useState(0);
  const animRef = useRef(null);
  const animatedOnce = useRef(false);

  // Count-up animation (runs once when trigger becomes true)
  useEffect(() => {
    if (!trigger) return;
    if (animatedOnce.current) return; // only once
    animatedOnce.current = true;

    const duration = 1200; // ms
    const start = performance.now();
    const from = 0;
    const to = Number(target) || 0;

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(from + (to - from) * eased);
      setDisplay(current);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(animRef.current);
      }
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [trigger, target]);

  // Cursor-follow tilt
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx; // -1..1
    const dy = (y - cy) / cy; // -1..1
    const rotateY = dx * -10; // tilt strength
    const rotateX = dy * 8;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    el.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(16,185,129,0.12)`;
  };

  const reset = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = "0 14px 30px rgba(2,6,23,0.12)";
  };

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl p-6 md:p-8 bg-gradient-to-br ${gradient} text-white cursor-pointer transform transition-all duration-300`}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      role="article"
      aria-label={label}
    >
      <div className="text-4xl md:text-5xl font-extrabold leading-none">
        <span ref={numRef}>{display}</span>
        <span className="ml-1">{suffix}</span>
      </div>
      <div className="mt-2 text-sm md:text-base opacity-90">{label}</div>

      {/* accent line */}
      <div className="mt-4 h-1 w-20 rounded-full bg-white/30" />
    </div>
  );
}

/* easing */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

