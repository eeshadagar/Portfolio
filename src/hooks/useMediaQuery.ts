import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on phones and small tablets, where the desktop metaphor is dropped. */
export const useIsCompact = () => useMediaQuery('(max-width: 900px)');

/** Honour the OS "reduce motion" setting — dock magnification is a lot otherwise. */
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
