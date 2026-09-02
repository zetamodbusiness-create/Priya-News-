import React, { useState } from 'react';
import { Home, Video, Image as ImageIcon, Search, Menu, X, ChevronRight, TrendingUp } from 'lucide-react';
import { useNews } from '../context/NewsContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { categories, viewMode, setViewMode } = useNews();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSlug = viewMode.type === 'category' ? viewMode.categorySlug : null;
  const isHome = viewMode.type === 'home';
  const isVideos = viewMode.type === 'videos';
  const isGallery = viewMode.type === 'gallery';

  const handleCategoryClick = (slug: string) => {
    setViewMode({ type: 'category', categorySlug: slug });
    setMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    setViewMode({ type: 'home' });
    setMobileMenuOpen(false);
  };

  const handleVideosClick = () => {
    setViewMode({ type: 'videos' });
    setMobileMenuOpen(false);
  };

  const handleGalleryClick = () => {
    setViewMode({ type: 'gallery' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-blue-800 text-white shadow-md border-t border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-700 focus:outline-none"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={handleHomeClick}
              className="ml-2 font-bold text-white text-base tracking-tight truncate sm:hidden"
            >
              Priya News Link
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium overflow-x-auto no-scrollbar py-1">
            <button
              id="nav-home-btn"
              onClick={handleHomeClick}
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                isHome ? 'bg-blue-950 text-white font-semibold' : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>প্রচ্ছদ</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`nav-cat-${cat.slug}`}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeSlug === cat.slug
                    ? 'bg-blue-950 text-white font-semibold shadow-inner'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}

            {/* Video Section Tab */}
            <button
              id="nav-videos-btn"
              onClick={handleVideosClick}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                isVideos
                  ? 'bg-red-700 text-white font-semibold'
                  : 'text-rose-200 bg-red-900/40 hover:bg-red-700 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4 text-rose-300" />
              <span>ভিডিও</span>
            </button>

            {/* Photo Gallery Tab */}
            <button
              id="nav-gallery-btn"
              onClick={handleGalleryClick}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                isGallery
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'text-emerald-200 bg-emerald-900/40 hover:bg-emerald-700 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-emerald-300" />
              <span>ছবি গ্যালারি</span>
            </button>
          </div>

          {/* Search Trigger Button */}
          <div className="flex items-center gap-2">
            <button
              id="navbar-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/80 hover:bg-blue-950 text-blue-100 hover:text-white border border-blue-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300" />
              <span className="hidden sm:inline">খবর খুঁজুন...</span>
              <span className="sm:hidden">অনুসন্ধান</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-900 border-t border-blue-800 px-4 pt-3 pb-6 space-y-1 shadow-2xl transition-all animate-fadeIn">
          <button
            onClick={handleHomeClick}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium ${
              isHome ? 'bg-blue-950 text-white' : 'text-blue-100 hover:bg-blue-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              প্রচ্ছদ
            </span>
            <ChevronRight className="w-4 h-4 text-blue-400" />
          </button>

          <div className="py-2 border-y border-blue-800 my-2">
            <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider px-3 mb-1">
              ক্যাটাগরি সমূহ
            </p>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSlug === cat.slug
                      ? 'bg-blue-950 text-white font-bold'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1 space-y-2">
            <button
              onClick={handleVideosClick}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold bg-red-800/80 text-white hover:bg-red-800"
            >
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-300" />
                ভিডিও কর্নার
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleGalleryClick}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold bg-emerald-800/80 text-white hover:bg-emerald-800"
            >
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-300" />
                ছবি ও অ্যালবাম গ্যালারি
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
