import React from 'react';
import { NewsProvider, useNews } from './context/NewsContext';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { VideosView } from './components/VideosView';
import { GalleryView } from './components/GalleryView';
import { SearchView } from './components/SearchView';
import { Footer } from './components/Footer';
import { AdBlockDetector } from './components/AdBlockDetector';

const AppContent: React.FC = () => {
  const { viewMode } = useNews();

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#24262f] flex flex-col font-['Hind_Siliguri',sans-serif]">
      {/* Strict Ad Blocker Protection */}
      <AdBlockDetector />
      
      {/* Top Main Header & Navigation Bar */}
      <Header />

      {/* Dynamic Main Body Content */}
      <div className="flex-1 max-w-[1220px] w-full mx-auto px-4 sm:px-5">
        {viewMode.type === 'home' && <HomeView />}

        {viewMode.type === 'article' && (
          <ArticleView articleId={viewMode.articleId} />
        )}

        {viewMode.type === 'category' && (
          <CategoryView categorySlug={viewMode.categorySlug} />
        )}

        {viewMode.type === 'videos' && (
          <VideosView activeVideoId={viewMode.activeVideoId} />
        )}

        {viewMode.type === 'gallery' && (
          <GalleryView albumId={viewMode.albumId} />
        )}

        {viewMode.type === 'search' && (
          <SearchView initialQuery={viewMode.query} />
        )}
      </div>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <NewsProvider>
      <AppContent />
    </NewsProvider>
  );
}
