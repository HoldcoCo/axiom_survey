import { useEffect, useState } from "react";

/**
 * Returns true when the viewport is tablet-width or wider (≥768px).
 */
export function useIsTablet(): boolean {
  const [tablet, setTablet] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    const onResize = (): void => {
      setTablet(window.innerWidth >= 768);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return tablet;
}
