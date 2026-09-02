import React, { useState } from 'react';
import {
  Clock,
  Eye,
  ArrowRight,
  ChevronRight,
  Flame,
  User,
  Sparkles,
  Bookmark,
  Share2,
  Play,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { formatRelativeBengaliTime, toBengaliNumber } from '../utils/helpers';
import { AdSlot } from './AdSlot';

export const HomeView: React.FC = () => {
  const { articles, setViewMode } = useNews();
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const publishedArticles = articles.filter((a) => a.status === 'published');

  // Featured 1: Main featured
  const featuredMain =
    publishedArticles.find((a) => a.isTopStory) ||
    publishedArticles.find((a) => a.isFeatured) ||
    publishedArticles[0];

  // Featured 2 & 3: Side items
  const otherFeatured = publishedArticles
    .filter((a) => a.id !== featuredMain?.id)
    .slice(0, 2);

  // Remaining articles for grid
  const streamArticles = publishedArticles.filter(
    (a) => a.id !== featuredMain?.id && !otherFeatured.some((f) => f.id === a.id)
  );

  // Popular articles for sidebar
  const popularArticles = [...publishedArticles]
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 6);

  const displayedArticles = streamArticles.slice(0, visibleCount);
  const hasMore = visibleCount < streamArticles.length;

  const handleArticleClick = (articleId: string) => {
    setViewMode({ type: 'article', articleId });
  };

  if (publishedArticles.length === 0) {
    return (
      <div className="py-16 text-center max-w-lg mx-auto">
        <div className="bg-white border border-[#ececf2] rounded-[24px] p-8 sm:p-10 shadow-[0_4px_20px_rgba(20,20,40,0.04)]">
          <div className="w-16 h-16 bg-[#ff3b4e]/10 text-[#ff3b4e] rounded-full flex items-center justify-center mx-auto mb-5">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0b0d14] mb-2 font-['Hind_Siliguri',sans-serif]">
            কোনো সংবাদ প্রকাশিত হয়নি
          </h2>
          <p className="text-sm text-[#787c88] leading-relaxed">
            পোর্টালটি প্রস্তুত রয়েছে। এডমিন প্যানেল থেকে সংবাদ প্রকাশ করার সাথে সাথে এখানে তা প্রদর্শিত হবে।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Featured Section (High-polish Blogger Featured Grid) */}
      {(featuredMain || otherFeatured.length > 0) && (
        <section className="pt-2 sm:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[18px]">
            {/* Main Featured (lg:col-span-7 or 8) */}
            {featuredMain && (
              <div
                onClick={() => handleArticleClick(featuredMain.id)}
                className="lg:col-span-7 xl:col-span-8 relative rounded-[20px] overflow-hidden bg-white flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.06)] group cursor-pointer border border-slate-100 transform transition-all duration-300"
              >
                {/* Title & Meta AT THE TOP */}
                <div className="p-5 sm:p-6 bg-white z-10 border-b border-slate-100">
                  {/* Category Badge & Breaking Tag */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="bg-[#ff3b4e] text-white text-[11px] font-bold px-3 py-1 rounded-[30px] uppercase tracking-wider shadow-sm transition-all duration-300 group-hover:shadow-md">
                      {featuredMain.categoryName}
                    </span>
                    {featuredMain.isBreaking && (
                      <span className="bg-amber-50 text-amber-600 text-[11px] font-bold px-2.5 py-1 rounded-[30px] flex items-center gap-1 border border-amber-200">
                        <Flame className="w-3 h-3 text-amber-500 fill-current" /> ব্রেকিং
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-[#0b0d14] text-xl sm:text-2xl lg:text-[25px] font-bold leading-snug group-hover:text-[#ff3b4e] transition-colors">
                    {featuredMain.title}
                  </h2>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-xs text-[#787c88] mt-3.5 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-[#ff3b4e]" />
                      {featuredMain.author}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {formatRelativeBengaliTime(featuredMain.publishDate)}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {toBengaliNumber(featuredMain.viewsCount || 0)} ভিউ
                    </span>
                  </div>
                </div>

                {/* Completely Clear Image AT THE BOTTOM */}
                <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[340px] overflow-hidden bg-slate-100">
                  <img
                    src={featuredMain.featuredImage}
                    alt={featuredMain.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-2xl group-hover:bg-[#ff3b4e]/90 group-hover:scale-110 group-hover:border-[#ff3b4e] transition-all duration-300">
                      <Play className="w-7 h-7 text-white ml-1 fill-current drop-shadow-md" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Side Featured 2 items */}
            <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-[18px]">
              {otherFeatured.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleArticleClick(item.id)}
                  className="relative rounded-[18px] overflow-hidden h-[200px] lg:h-[211px] shadow-[0_4px_16px_rgba(15,23,42,0.08)] group cursor-pointer bg-slate-900 border border-slate-800/40"
                >
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070c] via-[#06070c]/50 to-transparent flex flex-col justify-end p-4 sm:p-5">
                    <span className="bg-[#ff3b4e] text-white text-[10.5px] font-bold px-2.5 py-0.5 rounded-[30px] uppercase tracking-wider self-start mb-2 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:text-[#ff3b4e]">
                      {item.categoryName}
                    </span>
                    <h3 className="text-white text-[15.5px] font-bold leading-snug group-hover:text-amber-200 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11.5px] text-slate-300 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {formatRelativeBengaliTime(item.publishDate)}
                      </span>
                      <span>•</span>
                      <span>{item.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Main Content Feed & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[26px] items-start pt-2">
        {/* Main Left Articles Feed (lg:col-span-8) */}
        <main className="lg:col-span-8 space-y-6">
          {/* Section Heading */}
          <div className="flex items-center justify-between border-b border-[#ececf2] pb-3">
            <h2 className="text-[#0b0d14] font-bold text-xl sm:text-[22px] flex items-center gap-2.5">
              <span className="w-[6px] h-[22px] bg-[#ff3b4e] rounded-[4px] inline-block"></span>
              সবশেষ আর্টিকেল ও সংবাদ
            </h2>
            <span className="text-xs text-[#787c88] font-semibold bg-[#f6f7fb] px-3 py-1 rounded-full border border-[#ececf2]">
              মোট {toBengaliNumber(publishedArticles.length)} টি সংবাদ
            </span>
          </div>

          {/* Premium Blogger-Style News Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {displayedArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="bg-white rounded-[18px] overflow-hidden border border-[#ececf2] shadow-[0_2px_12px_rgba(20,20,40,0.04)] hover:shadow-[0_14px_34px_rgba(20,20,40,0.11)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail & Modern Category Chip with Floating Badges */}
                  <div className="h-[195px] overflow-hidden relative bg-slate-100">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Category Chip */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-[#ff3b4e] text-white text-[11px] font-bold uppercase px-3 py-1 rounded-[30px] tracking-wider shadow-md backdrop-blur-xs transition-transform duration-300 group-hover:scale-105">
                        {article.categoryName}
                      </span>
                      {article.isBreaking && (
                        <span className="bg-[#0b0d14]/85 text-amber-300 text-[10px] font-bold px-2 py-1 rounded-[30px] flex items-center gap-1 shadow-md">
                          <Flame className="w-3 h-3 fill-current" /> ব্রেকিং
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Meta Information Section */}
                    <div className="flex items-center justify-between text-xs text-[#787c88] mb-2.5 pb-2.5 border-b border-[#f4f4f8]">
                      <div className="flex items-center gap-2 font-medium">
                        <span className="flex items-center gap-1 text-[#24262f] font-semibold">
                          <User className="w-3.5 h-3.5 text-[#ff3b4e]" />
                          {article.author}
                        </span>
                        <span className="text-[#c3c7d6]">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#787c88]" />
                          {formatRelativeBengaliTime(article.publishDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[#787c88] text-[11px]">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{toBengaliNumber(article.viewsCount || 0)}</span>
                      </div>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-[#0b0d14] group-hover:text-[#ff3b4e] transition-colors duration-250 font-bold text-[17px] leading-[1.45] line-clamp-2 mb-2">
                      {article.title}
                    </h3>

                    {/* Article Summary Snippet */}
                    <p className="text-[#646875] text-[13.5px] line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-0">
                  <div className="flex items-center justify-between pt-3 border-t border-[#f4f4f8]">
                    <div className="inline-flex items-center gap-1.5 text-[#ff3b4e] font-bold text-[13px] group-hover:underline">
                      <span>বিস্তারিত পড়ুন</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-250" />
                    </div>
                    <span className="text-[11.5px] text-[#8a8ea0] font-medium bg-[#f6f7fb] px-2.5 py-0.5 rounded-full">
                      নিউজ
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination / Load More */}
          <div className="flex justify-center items-center gap-3 pt-4">
            {hasMore ? (
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="bg-white border border-[#ececf2] hover:bg-[#0b0d14] hover:text-white hover:border-[#0b0d14] text-[#0b0d14] px-7 py-3 rounded-[30px] font-bold text-[14px] shadow-[0_2px_10px_rgba(20,20,40,0.05)] transition-all duration-250 cursor-pointer flex items-center gap-2"
              >
                <span>আরও পুরনো আর্টিকেল দেখুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              visibleCount > 8 && (
                <button
                  onClick={() => setVisibleCount(8)}
                  className="bg-white border border-[#ececf2] hover:bg-[#0b0d14] hover:text-white hover:border-[#0b0d14] text-[#0b0d14] px-7 py-3 rounded-[30px] font-bold text-[14px] shadow-[0_2px_10px_rgba(20,20,40,0.05)] transition-all duration-250 cursor-pointer"
                >
                  « প্রথম পাতায় ফিরে যান
                </button>
              )
            )}
          </div>
        </main>

        {/* Sidebar Right (.popular-widget) (lg:col-span-4) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Most Popular Articles Widget */}
          <div className="bg-white border border-[#ececf2] rounded-[18px] p-5 sm:p-6 shadow-[0_2px_12px_rgba(20,20,40,0.04)]">
            <h3 className="font-bold text-[16px] text-[#0b0d14] mb-4 flex items-center gap-2 border-b border-[#ececf2] pb-3">
              <span className="w-[5px] h-[18px] bg-[#ff3b4e] rounded-[4px] inline-block"></span>
              সর্বাধিক পঠিত আর্টিকেল
            </h3>

            <div className="space-y-4">
              {popularArticles.map((post, index) => (
                <div
                  key={post.id}
                  onClick={() => handleArticleClick(post.id)}
                  className="flex gap-3.5 group cursor-pointer items-start pb-3.5 border-b border-[#f6f7fb] last:border-0 last:pb-0"
                >
                  <div className="relative w-18 h-18 min-w-[72px] rounded-[14px] overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute bottom-0 left-0 bg-[#0b0d14] text-white text-[10.5px] px-1.5 py-0.5 font-bold rounded-tr-lg">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10.5px] font-bold text-[#ff3b4e] uppercase block mb-1">
                      {post.categoryName}
                    </span>
                    <h4 className="text-[14px] leading-[1.45] font-bold text-[#24262f] group-hover:text-[#ff3b4e] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-[#787c88] mt-1.5">
                      <span>{formatRelativeBengaliTime(post.publishDate)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-slate-600 font-semibold">
                        <Eye className="w-3 h-3" />
                        {toBengaliNumber(post.viewsCount || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Banner Ad */}
          <AdSlot position="sidebar_ad_1" />
        </aside>
      </div>
    </div>
  );
};
