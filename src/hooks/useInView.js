import { useEffect, useState, useRef } from "react";

/**
 * useInView
 * - returns [ref, inView]
 */
export default function useInView(options = { root: null, rootMargin: "0px", threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (observer && node) {
              observer.unobserve(node); // one-time reveal
            }
          }
        });
      },
      options
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, inView];
}
