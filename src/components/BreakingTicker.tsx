import React from 'react';
import { Zap } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const BreakingTicker: React.FC = () => {
  const { articles, setViewMode } = useNews();

  // Get breaking news or top published articles
  const breakingList = articles.filter(
    (art) => art.isBreaking && art.status === 'published'
  );
  const displayItems = breakingList.length > 0 ? breakingList : articles.filter((a) => a.status === 'published').slice(0, 6);

  if (displayItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-[#d81f34] to-[#ff3b4e] text-white shadow-xs select-none">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-5 flex items-center gap-3 sm:gap-4 h-11">
        {/* Ticker Label */}
        <div className="bg-black/25 px-3.5 py-1.5 rounded-[30px] text-[12.5px] font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0 shadow-inner">
          <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
          <span>ব্রেকিং নিউজ</span>
        </div>

        {/* Ticker Viewport & Track */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-ticker-marquee flex items-center">
            {displayItems.concat(displayItems).map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => setViewMode({ type: 'article', articleId: item.id })}
                className="text-white hover:text-amber-200 text-[13.5px] font-medium mr-12 sm:mr-16 shrink-0 transition-colors opacity-95 hover:opacity-100 flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
