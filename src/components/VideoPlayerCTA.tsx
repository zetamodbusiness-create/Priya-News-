import React, { useState } from 'react';
import {
  Play,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Volume2,
  Maximize2,
  Tv,
  ArrowRight,
} from 'lucide-react';

interface VideoPlayerCTAProps {
  thumbnailUrl?: string;
  title?: string;
  duration?: string;
  className?: string;
}

export const TARGET_BACKLINK_URL = 'https://worldbankcodes.com';

export const VideoPlayerCTA: React.FC<VideoPlayerCTAProps> = ({
  thumbnailUrl = 'https://i.ibb.co.com/BVGcrTbZ/Priya-News-Thumbnail-3.png',
  title = 'রান্নাঘরে শুরু করে দিলেন আপত্তিকর কর্মকাণ্ড পুরো ভিডিও',
  duration = '০৩:৪৫',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenVideo = () => {
    window.open(TARGET_BACKLINK_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="video-player-cta-container"
      className={`bg-[#0b0f19] border-2 border-red-500/60 rounded-[20px] p-3 sm:p-5 shadow-[0_12px_40px_rgba(225,29,72,0.22)] my-7 overflow-hidden text-white ${className}`}
    >
      {/* Top Header / Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-xs sm:text-[13px] font-extrabold text-red-400 uppercase tracking-wider flex items-center gap-1">
            <Tv className="w-3.5 h-3.5" /> এক্সক্লুসিভ এইচডি ভিডিও প্লেয়ার
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="bg-red-950/80 text-red-300 border border-red-800/60 px-2 py-0.5 rounded-md">
            1080p Full HD
          </span>
          <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-md flex items-center gap-1">
            <Zap className="w-3 h-3" /> দ্রুত সার্ভার
          </span>
        </div>
      </div>

      {/* Main Video Viewport (Clickable Box) */}
      <div
        onClick={handleOpenVideo}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-video rounded-[14px] overflow-hidden bg-black cursor-pointer group select-none border border-slate-700/80 shadow-inner"
        role="button"
        tabIndex={0}
        aria-label="ভিডিও দেখতে এখানে ক্লিক করুন"
      >
        {/* Background Poster Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover object-center filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 group-hover:via-black/20 transition-all duration-300" />

        {/* Top Floating Headline */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 max-w-[85%]">
            <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
              ▶ {title}
            </p>
          </div>
          <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded shadow-md">
            HD
          </span>
        </div>

        {/* Center Glowing Play Button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="relative">
            {/* Pulsating ripple rings */}
            <div className="absolute -inset-3 bg-red-600/30 rounded-full blur-md animate-pulse"></div>
            <div className="absolute -inset-6 bg-red-500/20 rounded-full blur-lg animate-ping"></div>

            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(225,29,72,0.8)] border-2 border-white/80 transition-all duration-300 ${
                isHovered ? 'scale-115 shadow-[0_0_45px_rgba(225,29,72,1)] bg-gradient-to-tr from-red-500 to-rose-400' : ''
              }`}
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white ml-1 drop-shadow-md" />
            </div>
          </div>

          <div className="mt-4 bg-black/80 backdrop-blur-md border border-red-500/50 px-4 py-1.5 rounded-full shadow-lg">
            <span className="text-xs sm:text-sm font-extrabold text-amber-300 tracking-wide flex items-center gap-1.5">
              <span>সরাসরি প্লে করতে ক্লিক করুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Bottom Control Bar Simulation */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 to-transparent pt-6 pb-2.5 px-3 pointer-events-none">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2 relative">
            <div className="bg-white/40 h-full w-2/3 absolute top-0 left-0"></div>
            <div className="bg-red-600 h-full w-1/3 absolute top-0 left-0 relative">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"></span>
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-300 text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <Play className="w-3.5 h-3.5 fill-current text-white" />
              <Volume2 className="w-3.5 h-3.5 text-white" />
              <span>০২:১৫ / {duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white">1080p</span>
              <Maximize2 className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Primary High-Converting Call-To-Action Button */}
      <div className="mt-4 space-y-2.5">
        <a
          href={TARGET_BACKLINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="btn-watch-full-video-main"
          className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-[15px] sm:text-[17px] shadow-[0_8px_25px_rgba(225,29,72,0.45)] hover:shadow-[0_12px_35px_rgba(225,29,72,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 border border-white/20 relative overflow-hidden group text-center cursor-pointer"
        >
          {/* Subtle animated light gleam effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>
          <span className="tracking-wide">ভিডিও দেখতে এখানে ক্লিক করুন (সম্পূর্ণ আনকাট)</span>
          <ExternalLink className="w-4 h-4 shrink-0 text-white/90" />
        </a>

        {/* Dual Fast Server Alternative Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <a
            href={TARGET_BACKLINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-server-1"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-red-500/60 text-xs sm:text-[13px] font-bold text-slate-200 hover:text-white transition-colors text-center"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>সার্ভার ১: হাই স্পিড ডিরেক্ট প্লেয়ার</span>
          </a>

          <a
            href={TARGET_BACKLINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-server-2"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-red-500/60 text-xs sm:text-[13px] font-bold text-slate-200 hover:text-white transition-colors text-center"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>সার্ভার ২: নো-বাফারিং ব্যাকআপ লিংক</span>
          </a>
        </div>
      </div>

      {/* Trust & Guarantee Badges */}
      <div className="mt-3 pt-3 border-t border-slate-800/90 flex flex-wrap items-center justify-around gap-2 text-[11px] sm:text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          কোনো রেজিস্ট্রেশন বা সাইন আপ লাগবে না
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ১০০% নিরাপদ ও সরাসরি ভিউ
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          মোবাইল ও পিসিতে ফ্রেন্ডলি
        </span>
      </div>
    </div>
  );
};
