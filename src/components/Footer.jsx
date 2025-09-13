export default function Footer() {
  return (
    <footer className="bg-green-800 text-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Lab Name & Motto */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Algal Biotechnology Lab
          </h3>
          <p className="mt-2 text-gray-300 max-w-xl mx-auto">
            Innovating sustainable algae research for a brighter, greener future.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-300 text-sm md:text-base">
          <a href="#home" className="hover:text-green-400 transition">
            Home
          </a>
          <a href="#research" className="hover:text-green-400 transition">
            Research
          </a>
          <a href="#team" className="hover:text-green-400 transition">
            Team
          </a>
          <a href="#about" className="hover:text-green-400 transition">
            About
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-green-700 my-6"></div>

        {/* Creator Signature */}
        <div className="text-center text-gray-300 italic">
          "Be brighter than Sun" — Creator
        </div>
      </div>
    </footer>
  );
}
