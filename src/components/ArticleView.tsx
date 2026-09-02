import React, { useEffect, useState } from 'react';
import {
  Clock,
  Eye,
  Share2,
  ChevronRight,
  Facebook,
  Twitter,
  MessageCircle,
  Link2,
  Check,
  ArrowLeft,
  ArrowRight,
  User,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import {
  formatBengaliDate,
  formatRelativeBengaliTime,
  toBengaliNumber,
  calculateReadingTime,
} from '../utils/helpers';
import { AdSlot } from './AdSlot';

interface ArticleViewProps {
  articleId: string;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ articleId }) => {
  const { articles, setViewMode, incrementArticleViews } = useNews();
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const article = articles.find((a) => a.id === articleId);

  useEffect(() => {
    if (articleId) {
      incrementArticleViews(articleId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [articleId]);

  useEffect(() => {
    if (article) {
      // Set Document Title
      const originalTitle = document.title;
      document.title = `${article.title} | Priya News Link`;

      // Helper function to set meta tags
      const setMetaTag = (attrName: string, attrValue: string, content: string) => {
        let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attrName, attrValue);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
        return element;
      };

      // Set standard and Open Graph SEO tags
      const addedTags: Element[] = [];
      const siteDescription = 'সত্যের সন্ধানে নির্ভীক | দ্রুত ও নির্ভরযোগ্য সংবাদ মাধ্যম';
      
      const descTag = setMetaTag('name', 'description', article.summary || article.title);
      
      addedTags.push(setMetaTag('property', 'og:title', article.title));
      addedTags.push(setMetaTag('property', 'og:description', article.summary || article.title));
      addedTags.push(setMetaTag('property', 'og:image', article.featuredImage));
      addedTags.push(setMetaTag('property', 'og:url', window.location.href));
      addedTags.push(setMetaTag('property', 'og:type', 'article'));
      
      addedTags.push(setMetaTag('name', 'twitter:card', 'summary_large_image'));
      addedTags.push(setMetaTag('name', 'twitter:title', article.title));
      addedTags.push(setMetaTag('name', 'twitter:description', article.summary || article.title));
      addedTags.push(setMetaTag('name', 'twitter:image', article.featuredImage));

      return () => {
        // Cleanup and restore defaults when leaving article view
        document.title = originalTitle;
        descTag.setAttribute('content', siteDescription);
        addedTags.forEach(tag => {
          if (tag && tag.parentNode) {
            tag.parentNode.removeChild(tag);
          }
        });
      };
    }
  }, [article]);

  if (!article) {
    return (
      <div className="bg-white rounded-[18px] p-10 text-center border border-[#ececf2] shadow-[0_2px_10px_rgba(20,20,40,0.05)] max-w-xl mx-auto my-12">
        <h2 className="text-xl font-bold text-[#0b0d14] mb-2">সংবাদটি খুঁজে পাওয়া যায়নি</h2>
        <p className="text-[#787c88] text-sm mb-6">
          সম্ভবত সংবাদটি মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
        </p>
        <button
          onClick={() => setViewMode({ type: 'home' })}
          className="px-6 py-2.5 bg-[#0b0d14] hover:bg-[#ff3b4e] text-white rounded-full text-sm font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> প্রচ্ছদে ফিরে যান
        </button>
      </div>
    );
  }

  // Related articles
  const relatedArticles = articles
    .filter((a) => a.categoryId === article.categoryId && a.id !== article.id && a.status === 'published')
    .slice(0, 4);

  const fallbackArticles = articles
    .filter((a) => a.id !== article.id && a.status === 'published')
    .slice(0, 4);

  const displayRelated = relatedArticles.length > 0 ? relatedArticles : fallbackArticles;

  // Popular articles for sidebar
  const popularArticles = [...articles]
    .filter((a) => a.status === 'published' && a.id !== article.id)
    .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
    .slice(0, 6);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article.title;

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleShareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' - ' + currentUrl)}`,
      '_blank'
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-[13px] text-[#787c88] font-medium pt-1">
        <button
          onClick={() => setViewMode({ type: 'home' })}
          className="hover:text-[#ff3b4e] cursor-pointer"
        >
          হোম
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#787c88]" />
        <button
          onClick={() => setViewMode({ type: 'search', query: '' })}
          className="text-[#ff3b4e] font-semibold hover:underline cursor-pointer"
        >
          আর্টিকেল
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#787c88]" />
        <span className="text-[#24262f] truncate max-w-[200px] sm:max-w-md">{article.title}</span>
      </nav>

      {/* Main Reading Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[26px] items-start">
        {/* Left: Single Post Content (.single-post) */}
        <main className="lg:col-span-8 space-y-6">
          <article className="bg-white border border-[#ececf2] rounded-[18px] p-6 sm:p-8 shadow-[0_2px_12px_rgba(20,20,40,0.04)]">
            {/* Category Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#ff3b4e] text-white text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {article.categoryName}
              </span>
              <span className="text-xs text-[#787c88] ml-auto flex items-center gap-1 font-medium bg-[#f6f7fb] px-2.5 py-1 rounded-full border border-[#ececf2]">
                <Clock className="w-3.5 h-3.5 text-[#ff3b4e]" />
                {calculateReadingTime(article.content)}
              </span>
            </div>

            {/* Post Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0f172a] font-editorial leading-[1.38] mb-3 tracking-[0.01em]">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-base sm:text-lg font-medium text-[#475569] leading-relaxed mb-4">
                {article.subtitle}
              </p>
            )}

            {/* Post Meta & Font Size Adjuster */}
            <div className="text-[13px] text-[#64748b] flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#ececf2]">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#0f172a] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#ff3b4e]" />
                  {article.author}
                </span>
                <span>•</span>
                <span>{formatBengaliDate(article.publishDate)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {/* Font Size Adjuster */}
                <div className="flex items-center bg-[#f1f5f9] rounded-lg p-0.5 border border-slate-200/80">
                  <span className="text-[11px] font-bold px-1.5 text-slate-500">ফন্ট:</span>
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-0.5 text-xs font-bold rounded ${fontSize === 'normal' ? 'bg-white text-[#ff3b4e] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                    title="স্বাভাবিক ফন্ট সাইজ"
                  >
                    অ
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-0.5 text-sm font-bold rounded ${fontSize === 'large' ? 'bg-white text-[#ff3b4e] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                    title="বড় ফন্ট সাইজ"
                  >
                    অ+
                  </button>
                  <button
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2 py-0.5 text-base font-bold rounded ${fontSize === 'xlarge' ? 'bg-white text-[#ff3b4e] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                    title="খুব বড় ফন্ট সাইজ"
                  >
                    অ++
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-xs bg-[#f6f7fb] px-3 py-1 rounded-full border border-[#ececf2]">
                  <Eye className="w-3.5 h-3.5 text-[#64748b]" />
                  <span>{toBengaliNumber(article.viewsCount || 0)} বার পড়া হয়েছে</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-6">
              <div className="rounded-[16px] overflow-hidden bg-slate-100 border border-[#ececf2]">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-auto max-h-[480px] object-cover"
                />
              </div>
              {article.imageCaption && (
                <p className="text-xs text-[#787c88] mt-2 italic text-center">
                  {article.imageCaption}
                </p>
              )}
            </div>

            {/* Social Share Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f6f7fb] border border-[#ececf2] rounded-[14px] p-3 mb-6">
              <span className="text-xs font-bold text-[#0b0d14] flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#ff3b4e]" />
                শেয়ার করুন:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareFacebook}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#3b5998] text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ফেসবুক</span>
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">হোয়াটসঅ্যাপ</span>
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0b0d14] text-white text-xs font-semibold hover:bg-[#ff3b4e] transition-colors cursor-pointer shadow-xs"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">X</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#ececf2] text-[#24262f] hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'কপি হয়েছে' : 'লিংক'}</span>
                </button>
              </div>
            </div>

            {/* Article Body Content */}
            <div
              className={`text-[#1e293b] space-y-5 transition-all duration-200 ${
                fontSize === 'large'
                  ? 'text-[19px] leading-[2.1]'
                  : fontSize === 'xlarge'
                  ? 'text-[22px] leading-[2.2]'
                  : 'text-[17px] leading-[1.95]'
              }`}
            >
              {article.summary && (
                <p className="font-semibold text-[#0f172a] bg-[#f8fafc] p-4 sm:p-5 rounded-[14px] border-l-4 border-[#ff3b4e] shadow-xs text-base sm:text-lg leading-relaxed">
                  {article.summary}
                </p>
              )}

              {article.content.split('\n\n').map((paragraph, idx) => (
                <React.Fragment key={idx}>
                  <p className="text-justify sm:text-left">{paragraph}</p>
                  {idx === 1 && <AdSlot position="in_article_ad" className="!my-6" />}
                </React.Fragment>
              ))}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-5 border-t border-[#ececf2] flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#787c88]">ট্যাগসমূহ:</span>
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#f6f7fb] hover:bg-[#0b0d14] hover:text-white transition-colors text-[#24262f] px-3 py-1 rounded-full text-xs font-medium border border-[#ececf2] cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Related Articles Section (Matching card design) */}
          {displayRelated.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[#0b0d14] font-bold text-lg flex items-center gap-2">
                  <span className="w-[5px] h-[20px] bg-[#ff3b4e] rounded-[3px]"></span>
                  সম্পর্কিত আরও আর্টিকেল
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayRelated.map((rel) => (
                  <article
                    key={rel.id}
                    onClick={() => setViewMode({ type: 'article', articleId: rel.id })}
                    className="bg-white rounded-[18px] overflow-hidden border border-[#ececf2] shadow-[0_2px_10px_rgba(20,20,40,0.04)] hover:shadow-md hover:-translate-y-1 transition-all group cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-44 overflow-hidden bg-slate-100 relative">
                      <img
                        src={rel.featuredImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-[#ff3b4e] text-white text-[10.5px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                        {rel.categoryName}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-[14.5px] font-bold text-[#0b0d14] group-hover:text-[#ff3b4e] transition-colors line-clamp-2 leading-snug mb-2">
                        {rel.title}
                      </h4>
                      <div className="text-xs text-[#787c88] flex items-center justify-between">
                        <span>{formatRelativeBengaliTime(rel.publishDate)}</span>
                        <span className="text-[#ff3b4e] font-semibold flex items-center gap-0.5">
                          পড়ুন <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Most Popular */}
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

          {/* Sidebar Ad */}
          <AdSlot position="sidebar_ad_1" />
        </aside>
      </div>
    </div>
  );
};
