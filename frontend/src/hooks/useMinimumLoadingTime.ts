import { useState, useEffect } from "react";

export const useMinimumLoadingTime = (
  isLoading: boolean,
  minimumMs: number = 500
) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsAnimating(true);
    } else if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, minimumMs);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAnimating, minimumMs]);

  return isAnimating;
};
