import { useState, useEffect, useRef } from "react";

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: "0px",
    ...options,
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    }, defaultOptions);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [defaultOptions.threshold, defaultOptions.rootMargin]);

  return [elementRef, isIntersecting, entry];
};
