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
    id: 'jungle-incident-viral-video',
    title: 'জঙ্গলের ভিতরে দুই যুবক-যুবতী অশালীন কর্মকাণ্ড',
    subtitle: 'Jungle Incident Viral Video Sparks Widespread Reaction on Social Media',
    summary: 'জঙ্গলের নির্জন পরিবেশে দুই যুবক-যুবতীর অশালীন কর্মকাণ্ডের একটি ভিডিও সামাজিক যোগাযোগ মাধ্যমে দ্রুত ছড়িয়ে পড়েছে এবং তীব্র সমালোচনার সৃষ্টি করেছে। Priya News-এ পড়ুন বিস্তারিত প্রতিবেদন ও দেখুন সম্পূর্ণ ভিডিও।',
    content: 'জঙ্গলের নির্জন পরিবেশে দুই যুবক-যুবতীর অশালীন কর্মকাণ্ডের একটি ভিডিও সম্প্রতি সামাজিক যোগাযোগ মাধ্যমে ব্যাপক ভাইরাল হয়েছে। ভিডিওটি প্রকাশের পর থেকেই ফেসবুক, টেলিগ্রাম এবং বিভিন্ন অনলাইন প্ল্যাটফর্মে এটি নিয়ে তীব্র সমালোচনা ও আলোচনা তৈরি হয়েছে।\n\nস্থানীয় সূত্রে জানা যায়, নির্জন বনাঞ্চলে ধারণ করা এই আপত্তিকর ভিডিওটি কোনোভাবে ইন্টারনেটে ছড়িয়ে পড়ে। বিষয়টি নজরে আসার পর নেটিজেনরা সামাজিক অবক্ষয় ও অনৈতিক আচরণের বিরুদ্ধে তীব্র ক্ষোভ প্রকাশ করছেন।\n\nবিশেষজ্ঞরা বলছেন, সামাজিক যোগাযোগ মাধ্যমে সংবেদনশীল বা ব্যক্তিগত মুহূর্তের ভিডিও প্রচার ও শেয়ার করা আইনত দণ্ডনীয় অপরাধ। দায়িত্বশীলতার সাথে সামাজিক মাধ্যম ব্যবহারের জন্য সংশ্লিষ্ট সকলে আহ্বান জানিয়েছেন। Priya News Link ঘটনার বিস্তারিত তথ্য অনুসন্ধান করছে।\n\n#ViralVideo #JungleIncident #TrendingNews #PriyaNews #BanglaNews #SocialMediaViral',
    categoryId: 'entertainment',
    categoryName: 'বিনোদন',
    tags: ['PriyaNews', 'ViralVideo', 'JungleIncident', 'TrendingNews', 'Controversy', 'ViralNews'],
    featuredImage: 'https://i.ibb.co.com/Q5QS6wP/Priya-News-Thumbnail-4.png',
    author: 'অনলাইন ডেস্ক',
    authorRole: 'Priya News Digital Desk',
    publishDate: new Date().toISOString(),
    isTopStory: true,
    isBreaking: true,
    isFeatured: true,
    viewsCount: 420,
    status: 'published'
  },
  {
    id: 'kitchen-incident-viral-video',
    title: 'রান্নাঘরে শুরু করে দিলেন আপত্তিকর কর্মকাণ্ড',
    subtitle: 'Objectionable Kitchen Incident Video Sparks Intense Debate Across Social Media',
    summary: 'A controversial video showing objectionable activities inside a kitchen setting has gone viral across social media platforms, sparking intense discussions and widespread public reaction. Read the full report on Priya News.',
    content: 'A controversial video featuring objectionable and inappropriate activities inside a kitchen setting has rapidly gone viral across various social media platforms, triggering widespread debate and strong public reaction. The footage, which surfaced over the past 24 hours, quickly garnered thousands of views, shares, and comments across Facebook, TikTok, and other social channels.\n\nAccording to emerging reports, the clip appears to have been recorded in a domestic kitchen setting before being circulated or leaked to online networks. Netizens and viewers have voiced sharp criticism over the explicit nature of the behavior, while discussions continue regarding the context and origins of the recorded footage.\n\nDigital media analysts pointed out that sensational content frequently spreads at high velocity across social media feeds, prompting moderation teams on major platforms to review the material under community safety guidelines. Several internet users and community advocates have also urged the public to refrain from circulating sensitive or unverified video clips.\n\nAuthorities and digital ethics experts continue to emphasize the importance of online responsibility and personal privacy in digital communications. Priya News Link is closely monitoring the development and will provide further verified updates as they become available.\n\n#PriyaNews #ViralVideo #Controversy #TrendingNews #SocialMediaViral #KitchenIncident',
    categoryId: 'entertainment',
    categoryName: 'বিনোদন',
    tags: ['PriyaNews', 'ViralVideo', 'KitchenIncident', 'TrendingNews', 'Controversy', 'ViralNews'],
    featuredImage: 'https://i.ibb.co.com/BVGcrTbZ/Priya-News-Thumbnail-3.png',
    author: 'অনলাইন ডেস্ক',
    authorRole: 'Priya News Digital Desk',
    publishDate: new Date().toISOString(),
    isTopStory: false,
    isBreaking: false,
    isFeatured: true,
    viewsCount: 248,
    status: 'published'
  },
  {
    id: 'park-incident-viral-video',
    title: 'পার্কের মধ্যে তরুণ তরুণীর অনৈতিক কর্মকাণ্ড পুরো ভিডিও',
    summary: 'পার্কে তরুণ-তরুণীর অনৈতিক কর্মকাণ্ডের ভিডিও ভাইরাল। ঘটনাটি নিয়ে সামাজিক যোগাযোগমাধ্যমে ব্যাপক আলোচনা ও সমালোচনা চলছে। বিস্তারিত জানতে দেখুন Priya News-এর সম্পূর্ণ ভিডিও নিউজ।',
    content: 'পার্কে তরুণ-তরুণীর অনৈতিক কর্মকাণ্ডের ভিডিও ভাইরাল। ঘটনাটি নিয়ে সামাজিক যোগাযোগমাধ্যমে ব্যাপক আলোচনা ও সমালোচনা চলছে। বিস্তারিত জানতে দেখুন Priya News-এর সম্পূর্ণ ভিডিও নিউজ।\n\n#ViralVideo #BanglaNews #PriyaNews #ParkIncident #ViralNews',
    categoryId: 'national',
    categoryName: 'জাতীয়',
    tags: ['ViralVideo', 'BanglaNews', 'PriyaNews', 'ParkIncident', 'ViralNews'],
    featuredImage: 'https://i.ibb.co.com/gZyF9Nkj/Priya-News-Thumbnail-1.png',
    author: 'নিজস্ব প্রতিবেদক',
    publishDate: new Date().toISOString(),
    isTopStory: false,
    isBreaking: false,
    isFeatured: true,
    viewsCount: 1520,
    status: 'published'
  }
];

export const INITIAL_VIDEOS: VideoEntry[] = [
  {
    id: 'jungle-incident-video',
    title: 'জঙ্গলের ভিতরে দুই যুবক-যুবতী অশালীন কর্মকাণ্ড সম্পূর্ণ ভিডিও',
    description: 'জঙ্গলের নির্জন পরিবেশে দুই যুবক-যুবতীর অশালীন কর্মকাণ্ডের ভিডিও সামাজিক মাধ্যমে ভাইরাল। বিস্তারিত দেখুন Priya News-এ।',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    customThumbnail: 'https://i.ibb.co.com/Q5QS6wP/Priya-News-Thumbnail-4.png',
    category: 'entertainment',
    publishDate: new Date().toISOString(),
    viewsCount: 380
  },
  {
    id: 'kitchen-incident-video',
    title: 'রান্নাঘরে শুরু করে দিলেন আপত্তিকর কর্মকাণ্ড পুরো ভিডিও',
    description: 'A controversial video showing objectionable activities in a kitchen has gone viral across social media platforms, sparking intense debate and discussion.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    customThumbnail: 'https://i.ibb.co.com/BVGcrTbZ/Priya-News-Thumbnail-3.png',
    category: 'entertainment',
    publishDate: new Date().toISOString(),
    viewsCount: 140
  },
  {
    id: 'park-incident-video',
    title: 'পার্কের মধ্যে তরুণ তরুণীর অনৈতিক কর্মকাণ্ড পুরো ভিডিও',
    description: 'পার্কে তরুণ-তরুণীর অনৈতিক কর্মকাণ্ডের ভিডিও ভাইরাল। ঘটনাটি নিয়ে সামাজিক যোগাযোগমাধ্যমে ব্যাপক আলোচনা ও সমালোচনা চলছে।',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Using placeholder since no video provided
    youtubeId: 'dQw4w9WgXcQ',
    customThumbnail: 'https://i.ibb.co.com/gZyF9Nkj/Priya-News-Thumbnail-1.png',
    category: 'national',
    publishDate: new Date().toISOString(),
    viewsCount: 890
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

