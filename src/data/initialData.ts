import { Category, NewsArticle, VideoEntry, PhotoAlbum, AdSlotConfig, SiteSettings } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'national', name: 'জাতীয়', slug: 'national', order: 1, color: '#1e40af' },
  { id: 'politics', name: 'রাজনীতি', slug: 'politics', order: 2, color: '#dc2626' },
  { id: 'economy', name: 'অর্থনীতি', slug: 'economy', order: 3, color: '#059669' },
  { id: 'international', name: 'আন্তর্জাতিক', slug: 'international', order: 4, color: '#7c3aed' },
  { id: 'sports', name: 'খেলাধুলা', slug: 'sports', order: 5, color: '#d97706' },
  { id: 'entertainment', name: 'বিনোদন', slug: 'entertainment', order: 6, color: '#db2777' },
  { id: 'tech', name: 'প্রযুক্তি', slug: 'tech', order: 7, color: '#0284c7' },
  { id: 'education', name: 'শিক্ষা ও ক্যাম্পাস', slug: 'education', order: 8, color: '#4f46e5' },
  { id: 'lifestyle', name: 'জীবনধারা', slug: 'lifestyle', order: 9, color: '#0d9488' },
];

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'park-incident-viral-video',
    title: 'পার্কের মধ্যে তরুণ তরুণীর অনৈতিক কর্মকাণ্ড পুরো ভিডিও',
    summary: 'পার্কে তরুণ-তরুণীর অনৈতিক কর্মকাণ্ডের ভিডিও ভাইরাল। ঘটনাটি নিয়ে সামাজিক যোগাযোগমাধ্যমে ব্যাপক আলোচনা ও সমালোচনা চলছে। বিস্তারিত জানতে দেখুন Priya News-এর সম্পূর্ণ ভিডিও নিউজ।',
    content: '<p>পার্কে তরুণ-তরুণীর অনৈতিক কর্মকাণ্ডের ভিডিও ভাইরাল। ঘটনাটি নিয়ে সামাজিক যোগাযোগমাধ্যমে ব্যাপক আলোচনা ও সমালোচনা চলছে। বিস্তারিত জানতে দেখুন Priya News-এর সম্পূর্ণ ভিডিও নিউজ।</p><p>#ViralVideo #BanglaNews #PriyaNews #ParkIncident #ViralNews</p>',
    categoryId: 'national',
    categoryName: 'জাতীয়',
    tags: ['ViralVideo', 'BanglaNews', 'PriyaNews', 'ParkIncident', 'ViralNews'],
    featuredImage: 'https://i.ibb.co.com/gZyF9Nkj/Priya-News-Thumbnail-1.png',
    author: 'নিজস্ব প্রতিবেদক',
    publishDate: new Date().toISOString(),
    isTopStory: true,
    isBreaking: true,
    viewsCount: 0,
    status: 'published'
  }
];

export const INITIAL_VIDEOS: VideoEntry[] = [
  {
    id: 'park-incident-video',
    title: 'পার্কের মধ্যে তরুণ তরুণীর অনৈতিক কর্মকাণ্ড পুরো ভিডিও',
    description: 'পার্কে তরুণ-তরুণীর অনৈতিক কর্মকাণ্ডের ভিডিও ভাইরাল। ঘটনাটি নিয়ে সামাজিক যোগাযোগমাধ্যমে ব্যাপক আলোচনা ও সমালোচনা চলছে।',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Using placeholder since no video provided
    youtubeId: 'dQw4w9WgXcQ',
    customThumbnail: 'https://i.ibb.co.com/gZyF9Nkj/Priya-News-Thumbnail-1.png',
    category: 'national',
    publishDate: new Date().toISOString(),
    viewsCount: 0
  }
];

export const INITIAL_ALBUMS: PhotoAlbum[] = [];

export const INITIAL_AD_SLOTS: AdSlotConfig[] = [
  {
    id: 'header_ad',
    name: 'হেডার ব্যানার বিজ্ঞাপন (Header Top Ad)',
    enabled: false,
    type: 'banner',
    imageUrl: '',
    targetUrl: '',
    altText: 'বিজ্ঞাপন',
    dimensionsText: '728 x 90 px / Responsive Leaderboard',
  },
  {
    id: 'sidebar_ad_1',
    name: 'সাইডবার বিজ্ঞাপন ১ (Sidebar Square Ad)',
    enabled: false,
    type: 'banner',
    imageUrl: '',
    targetUrl: '',
    altText: 'বিজ্ঞাপন',
    dimensionsText: '300 x 250 px / Medium Rectangle',
  },
  {
    id: 'sidebar_ad_2',
    name: 'সাইডবার বিজ্ঞাপন ২ (Sidebar Half-Page Ad)',
    enabled: false,
    type: 'banner',
    imageUrl: '',
    targetUrl: '',
    altText: 'বিজ্ঞাপন',
    dimensionsText: '300 x 600 px / Half Page',
  },
  {
    id: 'in_article_ad',
    name: 'ইন-আর্টিকেল বিজ্ঞাপন (Inside News Story Ad)',
    enabled: false,
    type: 'banner',
    imageUrl: '',
    targetUrl: '',
    altText: 'বিজ্ঞাপন',
    dimensionsText: 'Fluid / 750 x 200 px',
  },
  {
    id: 'footer_ad',
    name: 'ফুটার ব্যানার বিজ্ঞাপন (Footer Sticky/Bottom Ad)',
    enabled: false,
    type: 'banner',
    imageUrl: '',
    targetUrl: '',
    altText: 'বিজ্ঞাপন',
    dimensionsText: '970 x 90 px / Super Leaderboard',
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'Priya News Link',
  siteNameEn: 'Priya News Link',
  tagline: 'সত্যের সন্ধানে নির্ভীক | দ্রুত ও নির্ভরযোগ্য সংবাদ মাধ্যম',
  editorName: 'প্রধান সম্পাদক: এ. এইচ. রহমান',
  contactEmail: 'contact@priyanewslink.com',
  contactPhone: '+৮৮০ ১৭০০-০০০০০০',
  address: 'ঢাকা, বাংলাদেশ',
  logoUrl: '/logo.png',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  twitterUrl: 'https://twitter.com',
  tiktokUrl: '',
  adminPasswordHash: 'admin123',
};

