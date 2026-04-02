'use client';

import { useEffect } from 'react';
import { Gender } from '@/types';

/**
 * Sets data-gender on <html> so CSS variables in globals.css switch the palette.
 * Girl → rose/peach, Boy → azure/sky clinical blue.
 * Must be rendered inside a Client Component tree.
 */
export function ThemeProvider({ gender }: { gender?: Gender }) {
  useEffect(() => {
    const el = document.documentElement;
    if (gender) {
      el.setAttribute('data-gender', gender);
    } else {
      el.removeAttribute('data-gender');
    }
    return () => {
      el.removeAttribute('data-gender');
    };
  }, [gender]);

  return null;
}
