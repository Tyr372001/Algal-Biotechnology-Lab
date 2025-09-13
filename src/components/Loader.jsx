import React, { useEffect, useState } from "react";
import loadingGif from "../assets/ADN_DNA.gif"; // make sure path is correct

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <img src={loadingGif} alt="Loading DNA" className="w-48 h-48 object-contain" />
    </div>
  );
}
