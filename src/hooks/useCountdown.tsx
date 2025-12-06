import { useEffect, useState } from "react";

export const useCountdown = (initial = 60) => {
  const [timeLeft, setTimeLeft] = useState(initial);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const reset = (newValue = initial) => setTimeLeft(newValue);

  return {
    timeLeft,
    reset,
  };
};

