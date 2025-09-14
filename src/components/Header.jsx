import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/ABL_Logo.png"; // make sure file exists (case-sensitive)

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // hide header on scroll down after a threshold, show on scroll up
      if (y > lastY && y > 120) {
        setShowBar(false);
      } else {
        setShowBar(true);
      }
      setLastY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <>
      {/* FIXED logo + title (always visible) */}
      <div
        className={`fixed top-3 left-4 z-50 flex items-center gap-3 transition-all duration-350 ease-in-out origin-top-left
          ${showBar ? "scale-100 translate-y-0" : "scale-110 -translate-y-1"}`}
        style={{ willChange: "transform, opacity" }}
      >
        <img
          src={logo}
          alt="ABL Logo"
          onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/64?text=ABL")}
          className="h-12 w-auto md:h-14 object-contain drop-shadow-md"
        />
        {/* lab title hides when header is hidden (so only logo remains) */}
        <div className={`flex flex-col leading-tight transition-opacity duration-300 ${showBar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <span className="font-semibold text-sm md:text-base text-gray-800">ALGAL BIOTECHNOLOGY</span>
          <span className="text-xs md:text-sm text-gray-600 -mt-0.5">LABORATORY</span>
        </div>
      </div>

      {/* HEADER BAR (slides up / down) */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transform transition-transform duration-300 ${showBar ? "translate-y-0" : "-translate-y-full"}`}
        aria-hidden={showBar ? "false" : "true"}
      >
        <div className={`w-full transition-colors duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-green-200"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Increased header height */}
            <div className="h-20 flex items-center justify-between">
              {/* spacer because logo is fixed above */}
              <div className="w-48" />

              {/* center nav */}
              <nav className="hidden md:flex flex-1 justify-center">
                <div className="grid grid-cols-4 gap-10 w-full max-w-3xl text-center">
                  <a href="#home" className="whitespace-nowrap text-gray-700 font-medium hover:text-green-700 transition">HOME</a>
                  <a href="#research" className="whitespace-nowrap text-gray-700 font-medium hover:text-green-700 transition">RESEARCH</a>
                  <a href="#team" className="whitespace-nowrap text-gray-700 font-medium hover:text-green-700 transition">TEAM</a>
                  <a href="#about" className="whitespace-nowrap text-gray-700 font-medium hover:text-green-700 transition">ABOUT</a>
                </div>
              </nav>

              {/* right: mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setOpen((s) => !s)}
                  aria-label="Toggle menu"
                  className="p-2 text-gray-800 hover:text-green-700 focus:outline-none"
                >
                  {open ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* mobile dropdown */}
          {open && (
            <div className="md:hidden bg-green-100/95 border-t">
              <nav className="flex flex-col py-3 px-4 space-y-1 text-gray-800 font-medium">
                <a href="#home" className="py-2" onClick={() => setOpen(false)}>HOME</a>
                <a href="#research" className="py-2" onClick={() => setOpen(false)}>RESEARCH</a>
                <a href="#team" className="py-2" onClick={() => setOpen(false)}>TEAM</a>
                <a href="#about" className="py-2" onClick={() => setOpen(false)}>ABOUT</a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}



