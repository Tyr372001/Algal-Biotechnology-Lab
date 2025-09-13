import { useState, useEffect, useRef } from "react";
import biofuelImg from "../assets/biofuel_image.jpg";
import carbonImg from "../assets/carbon_capture.jpg";
import nutaImg from "../assets/nutra.jpg";
import wastewaterImg from "../assets/wastewater.jpg";

const researchItems = [
  { id: 1, title: "Biofuels from Algae", desc: "Exploring microalgae as a renewable source of sustainable biofuels.", img: biofuelImg },
  { id: 2, title: "Carbon Capture", desc: "Harnessing algae’s ability to absorb CO₂ for climate change mitigation.", img: carbonImg },
  { id: 3, title: "Nutraceuticals", desc: "Developing high-value bioactive compounds for health applications.", img: nutaImg },
  { id: 4, title: "Wastewater Treatment", desc: "Utilizing algae for eco-friendly bioremediation of industrial waste.", img: wastewaterImg },
];

export default function ResearchHighlights() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => setIndex(prev => (prev + 1) % researchItems.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setIndex(prev => (prev - 1 + researchItems.length) % researchItems.length);
  const nextSlide = () => setIndex(prev => (prev + 1) % researchItems.length);

  // Mobile swipe handlers
  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].screenX; };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  return (
    <section id="research" className="relative w-full overflow-hidden py-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">Research Highlights</h2>

      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex transition-transform duration-700 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {researchItems.map(item => (
          <div key={item.id} className="min-w-full flex-shrink-0 relative cursor-pointer">
            <img src={item.img} alt={item.title} className="w-full h-[400px] sm:h-[500px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
              <h3 className="text-2xl md:text-4xl font-semibold text-white drop-shadow-lg">{item.title}</h3>
              <p className="mt-3 text-base md:text-lg text-gray-200 max-w-3xl">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {researchItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${i === index ? "bg-green-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
