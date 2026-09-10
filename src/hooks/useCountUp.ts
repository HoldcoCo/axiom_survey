import { useEffect, useState } from "react";

/**
 * Animates a displayed integer from 0 up to `target` when `active` is true.
 * Resets when `active` becomes false or `target` changes (via interval restart).
 *
 * @param target - Final value to reach
 * @param active - When false, returns 0 and no interval runs
 * @param intervalMs - Milliseconds between increments (default 22)
 */
export function useCountUp(
  target: number,
  active: boolean,
  intervalMs = 22,
): number {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }
    let cur = 0;
    const id = window.setInterval(() => {
      cur += 1;
      setDisplay(cur);
      if (cur >= target) {
        window.clearInterval(id);
      }
    }, intervalMs);
    return () => {
      window.clearInterval(id);
    };
  }, [active, target, intervalMs]);

  if (!active) {
    return 0;
  }
  return display;
}
