import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ResearchHighlights from "./components/ResearchHighlights";
import TeamPreview from "./components/TeamPreview";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setFadeIn(true); // trigger fade-in
    }, 10000); // 10s loader
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div
      className={`font-sans text-gray-900 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <Header />
      {/* Removed pt-24 to eliminate the gap */}
      <main className="mt-0">
        <HeroSection />
        <ResearchHighlights />
        <TeamPreview />
      </main>
      <Footer />
    </div>
  );
}

export default App;
