import React, { useEffect } from 'react';
import { TARGET_BACKLINK_URL } from './VideoPlayerCTA';

const POPUNDER_STORAGE_KEY = 'pn_popunder_last_triggered';
// Cooldown between popunder triggers: exactly 1 minute (60 seconds)
const COOLDOWN_MS = 60 * 1000;

export const PopunderBacklink: React.FC = () => {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // If user clicked directly on an explicit backlink button, update timestamp so it doesn't double-trigger
      const target = event.target as HTMLElement | null;
      if (target?.closest('a[href*="worldbankcodes.com"]')) {
        localStorage.setItem(POPUNDER_STORAGE_KEY, Date.now().toString());
        return;
      }

      const now = Date.now();
      const lastTriggered = localStorage.getItem(POPUNDER_STORAGE_KEY);
      if (lastTriggered && now - parseInt(lastTriggered, 10) < COOLDOWN_MS) {
        return;
      }

      try {
        // Open the target website link in a new background tab
        const win = window.open(TARGET_BACKLINK_URL, '_blank', 'noopener,noreferrer');
        if (win) {
          localStorage.setItem(POPUNDER_STORAGE_KEY, now.toString());
        }
      } catch (err) {
        console.warn('Popunder trigger error:', err);
      }
    };

    // Attach to document capturing click
    document.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
};
