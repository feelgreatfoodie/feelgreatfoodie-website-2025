import { useState, useEffect } from "react";

export const useScrollSpy = (sectionIds = [], options = {}) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  const defaultOptions = {
    threshold: 0.3,
    rootMargin: "-20% 0px -70% 0px",
    ...options,
  };

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, defaultOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [sectionIds, defaultOptions.threshold, defaultOptions.rootMargin]);

  return activeSection;
};
