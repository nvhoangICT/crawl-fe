import { useEffect, useState } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useMediaQuery() {
  const getBreakpointsState = () => {
    if (typeof window === "undefined") {
      return {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        "2xl": false,
      };
    }

    const width = window.innerWidth;
    return {
      xs: width < breakpoints.sm,
      sm: width >= breakpoints.sm && width < breakpoints.md,
      md: width >= breakpoints.md && width < breakpoints.lg,
      lg: width >= breakpoints.lg && width < breakpoints.xl,
      xl: width >= breakpoints.xl && width < breakpoints["2xl"],
      "2xl": width >= breakpoints["2xl"],
    };
  };

  const [currentBreakpoints, setCurrentBreakpoints] = useState(getBreakpointsState);

  useEffect(() => {
    const updateBreakpoints = () => setCurrentBreakpoints(getBreakpointsState());

    window.addEventListener("resize", updateBreakpoints);
    return () => window.removeEventListener("resize", updateBreakpoints);
  }, []);

  return currentBreakpoints;
}
