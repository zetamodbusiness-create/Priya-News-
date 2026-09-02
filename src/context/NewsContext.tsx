import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NewsArticle,
  Category,
  VideoEntry,
  PhotoAlbum,
  AdSlotConfig,
  SiteSettings,
  ViewMode,
  AdPosition,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_ARTICLES,
  INITIAL_VIDEOS,
  INITIAL_ALBUMS,
  INITIAL_AD_SLOTS,
  INITIAL_SETTINGS,
} from '../data/initialData';

interface NewsContextType {
  articles: NewsArticle[];
  categories: Category[];
  videos: VideoEntry[];
  albums: PhotoAlbum[];
  adSlots: AdSlotConfig[];
  settings: SiteSettings;
  siteSettings: SiteSettings;
  viewMode: ViewMode;
  searchQuery: string;
  isAdmin: boolean;
  
  // Navigation
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  
  // Auth
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (password: string) => void;
  
  // Article CRUD
  addArticle: (article: Omit<NewsArticle, 'id' | 'viewsCount' | 'publishDate'> & { publishDate?: string }) => NewsArticle;
  updateArticle: (id: string, updates: Partial<NewsArticle>) => void;
  deleteArticle: (id: string) => void;
  incrementArticleViews: (id: string) => void;
  
  // Category CRUD
  addCategory: (cat: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Video CRUD
  addVideo: (video: Omit<VideoEntry, 'id' | 'viewsCount' | 'publishDate'>) => VideoEntry;
  updateVideo: (id: string, updates: Partial<VideoEntry>) => void;
  deleteVideo: (id: string) => void;
  incrementVideoViews: (id: string) => void;
  
  // Album CRUD
  addAlbum: (album: Omit<PhotoAlbum, 'id' | 'publishDate'>) => PhotoAlbum;
  updateAlbum: (id: string, updates: Partial<PhotoAlbum>) => void;
  deleteAlbum: (id: string) => void;
  
  // Ad Management
  updateAdSlot: (id: AdPosition, updates: Partial<AdSlotConfig>) => void;
  getAdSlot: (id: AdPosition) => AdSlotConfig | undefined;
  
  // Settings & Backup
  updateSettings: (updates: Partial<SiteSettings>) => void;
  updateSiteSettings: (updates: Partial<SiteSettings>) => void;
  resetToDefaultData: () => void;
  exportData: () => string;
  exportDataJson: () => string;
  importData: (jsonString: string) => boolean;
  importDataJson: (jsonString: string) => boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ARTICLES: 'pnl_articles_v3',
  CATEGORIES: 'pnl_categories_v3',
  VIDEOS: 'pnl_videos_v3',
  ALBUMS: 'pnl_albums_v3',
  AD_SLOTS: 'pnl_ad_slots_v3',
  SETTINGS: 'pnl_settings_v3',
  ADMIN_AUTH: 'pnl_admin_auth_v3',
};

// Check if old demo data was present and purge once if needed
try {
  const isPurged = localStorage.getItem('pnl_demo_purged_v1');
  if (!isPurged) {
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    localStorage.removeItem(STORAGE_KEYS.ALBUMS);
    localStorage.setItem('pnl_demo_purged_v1', 'true');
  }
} catch (e) {
  // ignore storage errors
}

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [videos, setVideos] = useState<VideoEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  });

  const [albums, setAlbums] = useState<PhotoAlbum[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ALBUMS);
      return saved ? JSON.parse(saved) : INITIAL_ALBUMS;
    } catch {
      return INITIAL_ALBUMS;
    }
  });

  const [adSlots, setAdSlots] = useState<AdSlotConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AD_SLOTS);
      return saved ? JSON.parse(saved) : INITIAL_AD_SLOTS;
    } catch {
      return INITIAL_AD_SLOTS;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SETTINGS,
          ...parsed,
          logoUrl: parsed.logoUrl && !parsed.logoUrl.includes('placeholder') && !parsed.logoUrl.includes('i.ibb.co') ? parsed.logoUrl : '/logo.png',
        };
      }
      return INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Initial URL parsing for dynamic routing
  const getInitialViewMode = (): ViewMode => {
    const path = window.location.pathname;
    const search = new URLSearchParams(window.location.search);
    
    if (path.startsWith('/article/')) {
      const articleId = path.replace('/article/', '');
      return { type: 'article', articleId };
    }
    if (path.startsWith('/category/')) {
      const categorySlug = path.replace('/category/', '');
      return { type: 'category', categorySlug };
    }
    if (path.startsWith('/videos')) {
      const activeVideoId = search.get('v') || undefined;
      return { type: 'videos', activeVideoId };
    }
    if (path.startsWith('/gallery')) {
      const albumId = search.get('album') || undefined;
      return { type: 'gallery', albumId };
    }
    if (path.startsWith('/search')) {
      const query = search.get('q') || '';
      return { type: 'search', query };
    }
    return { type: 'home' };
  };

  const [viewMode, setViewModeState] = useState<ViewMode>(getInitialViewMode());
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Listen for back/forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setViewModeState(getInitialViewMode());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Storage listener for cross-tab or standalone admin synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key) return;
      try {
        if (e.key === STORAGE_KEYS.ARTICLES && e.newValue) {
          setArticles(JSON.parse(e.newValue));
        }
        if (e.key === STORAGE_KEYS.CATEGORIES && e.newValue) {
          setCategories(JSON.parse(e.newValue));
        }
        if (e.key === STORAGE_KEYS.SETTINGS && e.newValue) {
          setSettings(JSON.parse(e.newValue));
        }
        if (e.key === STORAGE_KEYS.AD_SLOTS && e.newValue) {
          setAdSlots(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.error('Storage sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALBUMS, JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(adSlots));
  }, [adSlots]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdmin));
  }, [isAdmin]);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL dynamically
    let newUrl = '/';
    if (mode.type === 'article') {
      newUrl = `/article/${mode.articleId}`;
    } else if (mode.type === 'category') {
      newUrl = `/category/${mode.categorySlug}`;
    } else if (mode.type === 'videos') {
      newUrl = `/videos${mode.activeVideoId ? `?v=${mode.activeVideoId}` : ''}`;
    } else if (mode.type === 'gallery') {
      newUrl = `/gallery${mode.albumId ? `?album=${mode.albumId}` : ''}`;
    } else if (mode.type === 'search') {
      newUrl = `/search${mode.query ? `?q=${encodeURIComponent(mode.query)}` : ''}`;
    }
    
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.pushState({}, '', newUrl);
    }
  };

  // Auth
  const loginAdmin = (password: string): boolean => {
    if (password === settings.adminPasswordHash || password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    if (viewMode.type === 'admin') {
      setViewMode({ type: 'home' });
    }
  };

  // Article CRUD
  const addArticle = (data: Omit<NewsArticle, 'id' | 'viewsCount' | 'publishDate'> & { publishDate?: string }): NewsArticle => {
    const newArt: NewsArticle = {
      ...data,
      id: 'art-' + Date.now(),
      viewsCount: 0,
      publishDate: data.publishDate || new Date().toISOString(),
    };
    setArticles((prev) => [newArt, ...prev]);
    return newArt;
  };

  const updateArticle = (id: string, updates: Partial<NewsArticle>) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updates } : art))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((art) => art.id !== id));
  };

  const incrementArticleViews = (id: string) => {
    setArticles((prev) =>
      prev.map((art) =>
        art.id === id ? { ...art, viewsCount: (art.viewsCount || 0) + 1 } : art
      )
    );
  };

  // Category CRUD
  const addCategory = (cat: Omit<Category, 'id'>): Category => {
    const newCat: Category = {
      ...cat,
      id: 'cat-' + Date.now(),
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Video CRUD
  const addVideo = (video: Omit<VideoEntry, 'id' | 'viewsCount' | 'publishDate'>): VideoEntry => {
    const newVid: VideoEntry = {
      ...video,
      id: 'vid-' + Date.now(),
      viewsCount: 0,
      publishDate: new Date().toISOString(),
    };
    setVideos((prev) => [newVid, ...prev]);
    return newVid;
  };

  const updateVideo = (id: string, updates: Partial<VideoEntry>) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const incrementVideoViews = (id: string) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, viewsCount: (v.viewsCount || 0) + 1 } : v
      )
    );
  };

  // Album CRUD
  const addAlbum = (album: Omit<PhotoAlbum, 'id' | 'publishDate'>): PhotoAlbum => {
    const newAlbum: PhotoAlbum = {
      ...album,
      id: 'album-' + Date.now(),
      publishDate: new Date().toISOString(),
    };
    setAlbums((prev) => [newAlbum, ...prev]);
    return newAlbum;
  };

  const updateAlbum = (id: string, updates: Partial<PhotoAlbum>) => {
    setAlbums((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const deleteAlbum = (id: string) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
  };

  // Ad Slot
  const updateAdSlot = (id: AdPosition, updates: Partial<AdSlotConfig>) => {
    setAdSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, ...updates } : slot))
    );
  };

  const getAdSlot = (id: AdPosition): AdSlotConfig | undefined => {
    return adSlots.find((slot) => slot.id === id);
  };

  // Settings & Reset
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const updateAdminPassword = (password: string) => {
    setSettings((prev) => ({ ...prev, adminPasswordHash: password }));
  };

  const resetToDefaultData = () => {
    setArticles(INITIAL_ARTICLES);
    setCategories(INITIAL_CATEGORIES);
    setVideos(INITIAL_VIDEOS);
    setAlbums(INITIAL_ALBUMS);
    setAdSlots(INITIAL_AD_SLOTS);
    setSettings(INITIAL_SETTINGS);
    localStorage.clear();
  };

  const exportData = (): string => {
    return JSON.stringify(
      {
        articles,
        categories,
        videos,
        albums,
        adSlots,
        settings,
        exportDate: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.articles && Array.isArray(data.articles)) setArticles(data.articles);
      if (data.categories && Array.isArray(data.categories)) setCategories(data.categories);
      if (data.videos && Array.isArray(data.videos)) setVideos(data.videos);
      if (data.albums && Array.isArray(data.albums)) setAlbums(data.albums);
      if (data.adSlots && Array.isArray(data.adSlots)) setAdSlots(data.adSlots);
      if (data.settings) setSettings(data.settings);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        categories,
        videos,
        albums,
        adSlots,
        settings,
        siteSettings: settings,
        viewMode,
        searchQuery,
        isAdmin,
        setViewMode,
        setSearchQuery,
        loginAdmin,
        logoutAdmin,
        updateAdminPassword,
        addArticle,
        updateArticle,
        deleteArticle,
        incrementArticleViews,
        addCategory,
        updateCategory,
        deleteCategory,
        addVideo,
        updateVideo,
        deleteVideo,
        incrementVideoViews,
        addAlbum,
        updateAlbum,
        deleteAlbum,
        updateAdSlot,
        getAdSlot,
        updateSettings,
        updateSiteSettings: updateSettings,
        resetToDefaultData,
        exportData,
        exportDataJson: exportData,
        importData,
        importDataJson: importData,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
