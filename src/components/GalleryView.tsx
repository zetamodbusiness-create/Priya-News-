import React, { useState } from 'react';
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Calendar,
  MapPin,
  Camera,
  Share2,
  Download,
  Eye,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import {
  formatBengaliDate,
  formatRelativeBengaliTime,
  toBengaliNumber,
} from '../utils/helpers';
import { PhotoAlbum } from '../types';
import { AdSlot } from './AdSlot';

interface GalleryViewProps {
  albumId?: string;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ albumId }) => {
  const { albums, setViewMode } = useNews();
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoAlbum | null>(() => {
    return albumId ? albums.find((a) => a.id === albumId) || null : null;
  });
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const openLightbox = (album: PhotoAlbum, index = 0) => {
    setSelectedAlbum(album);
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedAlbum(null);
    setActivePhotoIndex(0);
  };

  const nextPhoto = () => {
    if (!selectedAlbum) return;
    setActivePhotoIndex((prev) => (prev + 1) % selectedAlbum.images.length);
  };

  const prevPhoto = () => {
    if (!selectedAlbum) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? selectedAlbum.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-xl p-5 sm:p-6 shadow-md border border-emerald-900 flex flex-wrap items-center justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-emerald-300 font-medium mb-1">
            <button
              onClick={() => setViewMode({ type: 'home' })}
              className="hover:text-white cursor-pointer"
            >
              প্রচ্ছদ
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-emerald-100">ছবি গ্যালারি</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                ছবি গ্যালারি ও ফটো অ্যালবাম
              </h1>
              <p className="text-xs text-emerald-200">
                দেশ ও আন্তর্জাতিক অঙ্গনের গুরুত্বপূর্ণ ও দুর্লভ ছবি সমাহার
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-emerald-200 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-700">
          মোট {toBengaliNumber(albums.length)} টি অ্যালবাম সংকলন
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album.id}
            onClick={() => openLightbox(album, 0)}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {/* Cover Photo */}
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Photo count badge */}
                <div className="absolute top-3 right-3 bg-slate-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5 shadow">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{toBengaliNumber(album.images.length)} ছবি</span>
                </div>

                {album.location && (
                  <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{album.location}</span>
                  </div>
                )}
              </div>

              {/* Album Info */}
              <div className="p-4 sm:p-5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                  {album.title}
                </h2>
                {album.description && (
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {album.description}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatRelativeBengaliTime(album.publishDate)}</span>
              </div>
              {album.photographer && (
                <div className="flex items-center gap-1 text-slate-700 font-medium">
                  <Camera className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{album.photographer}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <AdSlot position="footer_ad" />

      {/* Interactive Lightbox Slideshow Modal */}
      {selectedAlbum && selectedAlbum.images.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between backdrop-blur-sm animate-fadeIn"
        >
          {/* Top Bar */}
          <div className="p-4 flex items-center justify-between text-white border-b border-white/10">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {selectedAlbum.title}
              </h3>
              <p className="text-xs text-slate-400">
                ছবি: {toBengaliNumber(activePhotoIndex + 1)} / {toBengaliNumber(selectedAlbum.images.length)}
                {selectedAlbum.location && ` • ${selectedAlbum.location}`}
              </p>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="বন্ধ করুন (Esc)"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Main Stage */}
          <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
              title="পূর্ববর্তী ছবি"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Image */}
            <div className="max-w-5xl max-h-[70vh] flex flex-col items-center justify-center">
              <img
                src={selectedAlbum.images[activePhotoIndex]?.url}
                alt={selectedAlbum.images[activePhotoIndex]?.caption || selectedAlbum.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
              />
              {selectedAlbum.images[activePhotoIndex]?.caption && (
                <p className="mt-3 text-center text-xs sm:text-sm text-slate-200 bg-black/60 px-4 py-1.5 rounded-full max-w-2xl">
                  {selectedAlbum.images[activePhotoIndex].caption}
                </p>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer"
              title="পরবর্তী ছবি"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="p-3 bg-black/80 border-t border-white/10 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto">
              {selectedAlbum.images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative w-16 h-12 rounded overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? 'border-emerald-500 scale-105 opacity-100 shadow-md ring-2 ring-emerald-500/50'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img.url}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
