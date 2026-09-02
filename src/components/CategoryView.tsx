import React, { useState } from 'react';
import {
  Clock,
  Eye,
  LayoutGrid,
  List,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  User,
  Flame,
  Search,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { formatRelativeBengaliTime, toBengaliNumber } from '../utils/helpers';
import { AdSlot } from './AdSlot';

interface CategoryViewProps {
  categorySlug?: string;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ categorySlug }) => {
  const { articles, setViewMode } = useNews();
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');
  const [filterText, setFilterText] = useState('');

  const publishedArticles = articles.filter((a) => a.status === 'published');

  const filteredArticles = publishedArticles.filter((a) => {
    if (filterText.trim()) {
      const q = filterText.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.viewsCount || 0) - (a.viewsCount || 0);
    }
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  const popularArticles = [...publishedArticles]
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 6);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header Banner */}
      <div className="bg-white rounded-[18px] border border-[#ececf2] p-5 sm:p-6 shadow-[0_2px_12px_rgba(20,20,40,0.04)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#787c88] font-medium mb-1.5">
            <button
              onClick={() => setViewMode({ type: 'home' })}
              className="hover:text-[#ff3b4e] cursor-pointer"
            >
              হোম
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#787c88]" />
            <span className="text-[#0b0d14] font-semibold">আর্টিকেল আর্কাইভ</span>
          </nav>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0b0d14] flex items-center gap-2.5">
            <span className="w-[6px] h-[22px] bg-[#ff3b4e] rounded-[4px] inline-block"></span>
            সকল আর্টিকেল ও সংবাদ
            <span className="text-xs sm:text-sm font-normal text-[#787c88]">
              ({toBengaliNumber(sortedArticles.length)} টি সংবাদ)
            </span>
          </h1>
        </div>

        {/* Controls & Search Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="আর্টিকেল ফিল্টার..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="bg-[#f6f7fb] border border-[#ececf2] rounded-full px-3.5 py-1.5 text-xs text-[#24262f] placeholder-[#787c88] outline-none focus:border-[#ff3b4e] w-36 sm:w-48 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-[#787c88] absolute right-3 top-2.5 pointer-events-none" />
          </div>

          <div className="flex bg-[#f6f7fb] p-1 rounded-full border border-[#ececf2] text-xs font-semibold">
            <button
              onClick={() => setSortBy('latest')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                sortBy === 'latest' ? 'bg-[#0b0d14] text-white' : 'text-[#787c88] hover:text-[#0b0d14]'
              }`}
            >
              সর্বশেষ
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                sortBy === 'popular' ? 'bg-[#0b0d14] text-white' : 'text-[#787c88] hover:text-[#0b0d14]'
              }`}
            >
              জনপ্রিয়
            </button>
          </div>

          <div className="hidden sm:flex bg-[#f6f7fb] p-1 rounded-full border border-[#ececf2]">
            <button
              onClick={() => setViewStyle('grid')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewStyle === 'grid' ? 'bg-white text-[#ff3b4e] shadow-xs' : 'text-[#787c88]'
              }`}
              title="গ্রিড ভিউ"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewStyle('list')}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                viewStyle === 'list' ? 'bg-white text-[#ff3b4e] shadow-xs' : 'text-[#787c88]'
              }`}
              title="লিস্ট ভিউ"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[26px] items-start">
        {/* Main Content (lg:col-span-8) */}
        <main className="lg:col-span-8 space-y-6">
          {sortedArticles.length === 0 ? (
            <div className="bg-white rounded-[18px] p-12 text-center border border-[#ececf2] shadow-[0_2px_10px_rgba(20,20,40,0.05)]">
              <p className="text-[#787c88] mb-4">কোনো আর্টিকেল পাওয়া যায়নি।</p>
              <button
                onClick={() => setViewMode({ type: 'home' })}
                className="px-5 py-2 bg-[#0b0d14] hover:bg-[#ff3b4e] text-white rounded-full text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> প্রচ্ছদে ফিরে যান
              </button>
            </div>
          ) : viewStyle === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {sortedArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setViewMode({ type: 'article', articleId: article.id })}
                  className="bg-white rounded-[18px] overflow-hidden border border-[#ececf2] shadow-[0_2px_12px_rgba(20,20,40,0.04)] hover:shadow-[0_14px_34px_rgba(20,20,40,0.11)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="h-[190px] overflow-hidden relative bg-slate-100">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-[#ff3b4e] text-white text-[11px] font-bold uppercase px-3 py-1 rounded-[30px] tracking-wider shadow-md">
                          {article.categoryName}
                        </span>
                        {article.isBreaking && (
                          <span className="bg-[#0b0d14]/85 text-amber-300 text-[10px] font-bold px-2 py-1 rounded-[30px] flex items-center gap-1 shadow-md">
                            <Flame className="w-3 h-3 fill-current" /> ব্রেকিং
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
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

                      <h3 className="text-[#0b0d14] group-hover:text-[#ff3b4e] transition-colors duration-250 font-bold text-[17px] leading-[1.45] line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-[#646875] text-[13.5px] line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>

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
          ) : (
            <div className="space-y-4">
              {sortedArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setViewMode({ type: 'article', articleId: article.id })}
                  className="bg-white rounded-[18px] overflow-hidden border border-[#ececf2] p-4 shadow-[0_2px_12px_rgba(20,20,40,0.04)] hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col sm:flex-row gap-4"
                >
                  <div className="sm:w-56 h-40 rounded-[14px] overflow-hidden bg-slate-100 shrink-0 relative">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#ff3b4e] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      {article.categoryName}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#787c88] mb-1.5">
                        <span className="font-semibold text-[#24262f]">{article.author}</span>
                        <span>•</span>
                        <span>{formatRelativeBengaliTime(article.publishDate)}</span>
                      </div>
                      <h3 className="text-[#0b0d14] group-hover:text-[#ff3b4e] transition-colors font-bold text-base sm:text-[17px] leading-snug mb-2">
                        {article.title}
                      </h3>
                      <p className="text-[#787c88] text-xs sm:text-[13.5px] line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#787c88] pt-2 border-t border-[#f4f4f8]">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> {toBengaliNumber(article.viewsCount || 0)} ভিউ
                      </span>
                      <span className="text-[#ff3b4e] font-bold flex items-center gap-1">
                        বিস্তারিত পড়ুন <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#ececf2] rounded-[18px] p-5 sm:p-6 shadow-[0_2px_12px_rgba(20,20,40,0.04)]">
            <h3 className="font-bold text-[16px] text-[#0b0d14] mb-4 flex items-center gap-2 border-b border-[#ececf2] pb-3">
              <span className="w-[5px] h-[18px] bg-[#ff3b4e] rounded-[4px]"></span>
              সর্বাধিক পঠিত আর্টিকেল
            </h3>
            <div className="space-y-4">
              {popularArticles.map((post, idx) => (
                <div
                  key={post.id}
                  onClick={() => setViewMode({ type: 'article', articleId: post.id })}
                  className="flex gap-3.5 group cursor-pointer items-start pb-3.5 border-b border-[#f6f7fb] last:border-0 last:pb-0"
                >
                  <div className="w-18 h-18 min-w-[72px] rounded-[14px] overflow-hidden bg-slate-100 shrink-0 relative">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute bottom-0 left-0 bg-[#0b0d14] text-white text-[10.5px] px-1.5 py-0.5 font-bold rounded-tr-lg">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10.5px] font-bold text-[#ff3b4e] uppercase block mb-1">
                      {post.categoryName}
                    </span>
                    <h4 className="text-[14px] leading-[1.45] font-bold text-[#24262f] group-hover:text-[#ff3b4e] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="text-[11px] text-[#787c88] mt-1.5">
                      {formatRelativeBengaliTime(post.publishDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AdSlot position="sidebar_ad_1" />
        </aside>
      </div>
    </div>
  );
};
