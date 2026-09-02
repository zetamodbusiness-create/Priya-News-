import React from 'react';
import { Facebook, Youtube, ChevronUp, Newspaper, Home as HomeIcon } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const Footer: React.FC = () => {
  const { settings, setViewMode } = useNews();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0d14] text-[#c3c7d6] pt-10 pb-6 mt-10 border-t border-white/5">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-5">
        {/* Footer Social Icons (Facebook & YouTube) */}
        <div className="flex justify-center items-center gap-4 mb-6">
          {settings.facebookUrl && (
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/[0.06] hover:bg-[#3b5998] flex items-center justify-center text-white text-lg transition-all duration-300 hover:-translate-y-1 shadow-md"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          )}

          {settings.youtubeUrl && (
            <a
              href={settings.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/[0.06] hover:bg-[#ff0000] flex items-center justify-center text-white text-lg transition-all duration-300 hover:-translate-y-1 shadow-md"
              title="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Quick Nav Links: Exactly Home & Articles */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#8a8ea0] mb-6 font-semibold">
          <button
            onClick={() => setViewMode({ type: 'home' })}
            className="hover:text-white cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>হোম</span>
          </button>
          <button
            onClick={() => setViewMode({ type: 'search', query: '' })}
            className="hover:text-[#ff3b4e] cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>আর্টিকেল</span>
          </button>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/[0.08] pt-5 text-center text-[13px] text-[#8a8ea0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © <span className="text-[#ff3b4e] font-semibold">{settings.siteName || 'Priya News Link'}</span> {new Date().getFullYear()}. সর্বস্বত্ব সংরক্ষিত।
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8a8ea0]/70 font-sans">Priya News Link Template</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-full bg-white/[0.06] hover:bg-[#ff3b4e] text-white transition-colors cursor-pointer"
              title="উপরে যান"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
