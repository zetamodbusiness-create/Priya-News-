import React from 'react';
import { useNews } from '../context/NewsContext';
import { AdPosition } from '../types';

interface AdSlotProps {
  position: AdPosition;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ position, className = '' }) => {
  const { getAdSlot } = useNews();
  const ad = getAdSlot(position);

  if (!ad || !ad.enabled) {
    return null;
  }

  return (
    <aside
      id={`ad-slot-${position}`}
      aria-label="বিজ্ঞাপন"
      className={`my-4 flex flex-col items-center justify-center p-2 rounded-lg bg-slate-100/80 border border-slate-200 text-center relative overflow-hidden transition-all ${className}`}
    >
      <div className="w-full flex items-center justify-between px-2 mb-1">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
          বিজ্ঞাপন / Advertisement
        </span>
        {ad.dimensionsText && (
          <span className="text-[9px] text-slate-500 hidden sm:inline-block">
            {ad.dimensionsText}
          </span>
        )}
      </div>

      {ad.type === 'script' && ad.scriptCode ? (
        <div
          className="w-full overflow-hidden min-h-[90px] flex items-center justify-center text-xs text-slate-600"
          dangerouslySetInnerHTML={{ __html: ad.scriptCode }}
        />
      ) : ad.imageUrl ? (
        <a
          href={ad.targetUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full max-w-full overflow-hidden rounded transition-opacity hover:opacity-95"
        >
          <img
            src={ad.imageUrl}
            alt={ad.altText || 'বিজ্ঞাপন'}
            className="w-full h-auto max-h-[160px] object-cover object-center mx-auto rounded shadow-xs"
            loading="lazy"
          />
        </a>
      ) : (
        <div className="py-6 px-4 text-center text-xs text-slate-600">
          স্পন্সরড বিজ্ঞাপন স্থান ({ad.name})
        </div>
      )}
    </aside>
  );
};
