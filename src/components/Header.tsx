import React, { useState, useEffect } from 'react';
import { Search, Sun, Menu, X, Facebook, Youtube, Newspaper, Home as HomeIcon } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { formatBengaliDate } from '../utils/helpers';

export const Header: React.FC = () => {
  const { settings, viewMode, setViewMode } = useNews();
  const [currentDateString, setCurrentDateString] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setCurrentDateString(formatBengaliDate(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setViewMode({ type: 'search', query: searchInput.trim() });
      setSearchInput('');
      setMobileMenuOpen(false);
    }
  };

  const handleHomeClick = () => {
    setViewMode({ type: 'home' });
    setMobileMenuOpen(false);
  };

  const handleArticleListClick = () => {
    // Show article list / all articles archive
    setViewMode({ type: 'search', query: '' });
    setMobileMenuOpen(false);
  };

  const isHome = viewMode.type === 'home';
  const isArticles = viewMode.type === 'search' || viewMode.type === 'category';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#ececf2] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all">
      {/* Header Top Bar */}
      <div className="max-w-[1220px] mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between py-2 sm:py-3 gap-3 md:gap-6">
          {/* Left: Menu & Date/Socials */}
          <div className="flex items-center gap-3 shrink-0 min-w-[60px] sm:min-w-[160px] md:min-w-[200px]">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 text-[#0b0d14] cursor-pointer border border-slate-200/60"
              aria-label="মেনু"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#ff3b4e]" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748b] font-medium">
              <Sun className="w-3.5 h-3.5 text-[#ff3b4e]" />
              <span>{currentDateString || 'ঢাকা'}</span>
            </div>

            {/* Top Socials */}
            <div className="hidden lg:flex items-center gap-1.5 border-l border-[#ececf2] pl-3">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#f6f7fb] hover:bg-[#3b5998] hover:text-white flex items-center justify-center text-[#787c88] transition-all"
                  title="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#f6f7fb] hover:bg-[#ff0000] hover:text-white flex items-center justify-center text-[#787c88] transition-all"
                  title="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Center: Brand Logo (Exactly in the middle) */}
          <div className="flex justify-center items-center flex-1 px-2">
            <button
              id="brand-logo-btn"
              onClick={handleHomeClick}
              className="inline-flex items-center justify-center cursor-pointer focus:outline-none transition-transform hover:scale-[1.02] py-0.5"
            >
              <img
                alt={settings.siteName || 'Priya News Link'}
                src={settings.logoUrl || '/logo.png'}
                referrerPolicy="no-referrer"
                className="h-11 sm:h-16 md:h-20 lg:h-[84px] w-auto object-contain max-w-[220px] sm:max-w-[340px] md:max-w-[440px] drop-shadow-xs transition-all duration-200"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + '/logo.png') {
                    target.src = '/logo.png';
                  } else {
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.logo-fallback');
                    if (fallback) fallback.classList.remove('hidden');
                  }
                }}
              />
              <div className="logo-fallback hidden flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold text-[#0b0d14] tracking-tight font-['Poppins']">
                  Priya <span className="text-[#ff3b4e]">News Link</span>
                </span>
              </div>
            </button>
          </div>

          {/* Right: Search Box */}
          <div className="flex justify-end items-center shrink-0 min-w-[60px] sm:min-w-[160px] md:min-w-[200px]">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-[#f6f7fb] border border-[#ececf2] rounded-full overflow-hidden p-0.5 focus-within:border-[#ff3b4e] focus-within:ring-2 focus-within:ring-[#ff3b4e]/10 transition-all max-w-[180px] sm:max-w-[210px] w-full"
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="সংবাদ খুঁজুন..."
                className="bg-transparent border-0 px-2.5 sm:px-3 py-1.5 text-[12px] sm:text-[13px] text-[#24262f] placeholder-[#787c88] outline-none w-full font-['Hind_Siliguri',sans-serif]"
              />
              <button
                type="submit"
                className="bg-[#0b0d14] hover:bg-[#ff3b4e] text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                aria-label="অনুসন্ধান"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop Main Navigation Bar: Exactly Home & Articles */}
      <nav className="border-t border-[#ececf2] hidden lg:block">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-5">
          <div className="flex items-center justify-center py-2">
            <ul className="flex items-center gap-3">
              <li>
                <button
                  onClick={handleHomeClick}
                  className={`flex items-center gap-2 px-5 py-2 rounded-[30px] font-bold text-[14px] transition-all cursor-pointer ${
                    isHome
                      ? 'bg-[#0b0d14] text-white shadow-sm'
                      : 'text-[#0b0d14] hover:bg-[#0b0d14] hover:text-white'
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>হোম</span>
                </button>
              </li>

              <li>
                <button
                  onClick={handleArticleListClick}
                  className={`flex items-center gap-2 px-5 py-2 rounded-[30px] font-bold text-[14px] transition-all cursor-pointer ${
                    isArticles
                      ? 'bg-[#ff3b4e] text-white shadow-sm'
                      : 'text-[#0b0d14] hover:bg-[#ff3b4e] hover:text-white'
                  }`}
                >
                  <Newspaper className="w-4 h-4" />
                  <span>আর্টিকেল</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ececf2] bg-white px-4 py-4 space-y-3 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleHomeClick}
              className={`text-left px-4 py-3 rounded-[12px] font-bold text-[14px] transition-all flex items-center gap-2.5 ${
                isHome ? 'bg-[#0b0d14] text-white' : 'bg-[#f6f7fb] text-[#0b0d14] hover:bg-[#ececf2]'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>হোম</span>
            </button>

            <button
              onClick={handleArticleListClick}
              className={`text-left px-4 py-3 rounded-[12px] font-bold text-[14px] transition-all flex items-center gap-2.5 ${
                isArticles ? 'bg-[#ff3b4e] text-white' : 'bg-[#f6f7fb] text-[#0b0d14] hover:bg-[#ececf2]'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>আর্টিকেল</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#ececf2] flex items-center justify-between text-xs text-[#787c88]">
            <div className="flex items-center gap-2">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#f6f7fb] hover:bg-[#3b5998] hover:text-white flex items-center justify-center text-[#787c88]"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-full bg-[#f6f7fb] hover:bg-[#ff0000] hover:text-white flex items-center justify-center text-[#787c88]"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <span className="text-[11px] text-[#787c88]">{currentDateString}</span>
          </div>
        </div>
      )}
    </header>
  );
};
