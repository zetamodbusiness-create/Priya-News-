export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  categoryId: string;
  categoryName: string;
  tags: string[];
  featuredImage: string;
  imageCaption?: string;
  author: string;
  authorRole?: string;
  publishDate: string; // ISO format
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTopStory?: boolean;
  viewsCount: number;
  status: 'published' | 'draft';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  order: number;
}

export interface VideoEntry {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  customThumbnail?: string;
  category: string;
  publishDate: string;
  viewsCount: number;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  images: PhotoItem[];
  publishDate: string;
  location?: string;
  photographer?: string;
}

export type AdPosition = 'header_ad' | 'sidebar_ad_1' | 'sidebar_ad_2' | 'in_article_ad' | 'footer_ad';

export interface AdSlotConfig {
  id: AdPosition;
  name: string;
  enabled: boolean;
  type: 'banner' | 'script';
  imageUrl?: string;
  targetUrl?: string;
  altText?: string;
  scriptCode?: string;
  dimensionsText?: string;
}

export interface SiteSettings {
  siteName: string;
  siteNameEn: string;
  tagline: string;
  editorName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl?: string;
  facebookUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  tiktokUrl?: string;
  adminPasswordHash: string; // default password 'admin123'
}

export type ViewMode =
  | { type: 'home' }
  | { type: 'article'; articleId: string }
  | { type: 'category'; categorySlug: string }
  | { type: 'videos'; activeVideoId?: string }
  | { type: 'gallery'; albumId?: string }
  | { type: 'search'; query: string }
  | { type: 'admin'; activeTab?: 'dashboard' | 'news' | 'categories' | 'videos' | 'gallery' | 'ads' | 'settings' };
