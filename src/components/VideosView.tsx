import React, { useState } from 'react';
import {
  Play,
  Share2,
  Clock,
  Eye,
  ChevronRight,
  Sparkles,
  Youtube,
  Tv,
  MessageSquare,
  Check,
  Link2,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import {
  formatBengaliDate,
  formatRelativeBengaliTime,
  toBengaliNumber,
} from '../utils/helpers';
import { AdSlot } from './AdSlot';

interface VideosViewProps {
  activeVideoId?: string;
}

export const VideosView: React.FC<VideosViewProps> = ({ activeVideoId }) => {
  const { videos, setViewMode, incrementVideoViews } = useNews();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  // Active playing video (default to first or activeVideoId)
  const currentVideo =
    (activeVideoId ? videos.find((v) => v.id === activeVideoId) : null) ||
    videos[0];

  // Distinct video categories
  const videoCategories = Array.from(new Set(videos.map((v) => v.category))).filter(Boolean);

  const filteredVideos =
    selectedCategory === 'all'
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  const handleSelectVideo = (videoId: string) => {
    incrementVideoViews(videoId);
    setViewMode({ type: 'videos', activeVideoId: videoId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-md border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
            <button
              onClick={() => setViewMode({ type: 'home' })}
              className="hover:text-red-400 cursor-pointer"
            >
              প্রচ্ছদ
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-200">ভিডিও কর্নার</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-lg">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                ভিডিও কর্নার ও টক শো
              </h1>
              <p className="text-xs text-slate-400">
                Priya News Link-এর অফিসিয়াল ইউটিউব ও ভিডিও প্রতিবেদন
              </p>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            সব ভিডিও ({toBengaliNumber(videos.length)})
          </button>
          {videoCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Video Cinema Showcase */}
      {currentVideo && (
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left 8 Cols: YouTube Embed Player */}
            <div className="lg:col-span-8 bg-black">
              <div className="relative aspect-16/9 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            </div>

            {/* Right 4 Cols: Video Details & Sharing */}
            <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded">
                    {currentVideo.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {formatRelativeBengaliTime(currentVideo.publishDate)}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-3">
                  {currentVideo.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-6 mb-4 whitespace-pre-line">
                  {currentVideo.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Eye className="w-4 h-4 text-red-600" />
                    {toBengaliNumber(currentVideo.viewsCount)} বার দেখা হয়েছে
                  </span>
                  <a
                    href={currentVideo.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
                  >
                    <Youtube className="w-4 h-4" /> YouTube-এ দেখুন
                  </a>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors shadow-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4 text-slate-500" />}
                  <span>{copied ? 'ভিডিও লিংক কপি হয়েছে' : 'ভিডিও লিংক শেয়ার করুন'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Ad in Videos Section */}
      <AdSlot position="in_article_ad" />

      {/* Video Playlist Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b-2 border-red-600 pb-2">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full"></span>
          আরও অন্যান্য ভিডিও
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredVideos.map((video) => {
            const isPlaying = currentVideo?.id === video.id;
            return (
              <article
                key={video.id}
                onClick={() => handleSelectVideo(video.id)}
                className={`group cursor-pointer rounded-xl overflow-hidden border transition-all flex flex-col justify-between ${
                  isPlaying
                    ? 'bg-red-50/50 border-red-500 shadow-md ring-2 ring-red-500/20'
                    : 'bg-white border-slate-200 hover:shadow-md hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                    <img
                      src={video.customThumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                          isPlaying ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-900/80 text-white'
                        }`}
                      >
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 left-2 bg-slate-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {video.category}
                    </span>
                    {isPlaying && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        এখন চলছে
                      </span>
                    )}
                  </div>

                  <div className="p-3.5">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug mb-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 pb-3 pt-2 text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
                  <span>{formatRelativeBengaliTime(video.publishDate)}</span>
                  <span className="font-semibold text-slate-600">
                    {toBengaliNumber(video.viewsCount)} ভিউ
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
