// Helper utilities for Bengali numerals, dates, and text processing

const BENGALI_NUMBERS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => BENGALI_NUMBERS[parseInt(digit, 10)]);
}

const BENGALI_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const BENGALI_DAYS = [
  'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
];

export function formatBengaliDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';
  
  const day = toBengaliNumber(date.getDate());
  const month = BENGALI_MONTHS[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());
  const dayName = BENGALI_DAYS[date.getDay()];
  
  let hours = date.getHours();
  const minutes = toBengaliNumber(String(date.getMinutes()).padStart(2, '0'));
  const ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
  hours = hours % 12 || 12;
  const bengaliHours = toBengaliNumber(hours);

  return `${dayName}, ${day} ${month} ${year} | ${bengaliHours}:${minutes} ${ampm}`;
}

export function formatRelativeBengaliTime(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'এইমাত্র';
  if (diffInMinutes < 60) return `${toBengaliNumber(diffInMinutes)} মিনিট আগে`;
  if (diffInHours < 24) return `${toBengaliNumber(diffInHours)} ঘণ্টা আগে`;
  if (diffInDays < 7) return `${toBengaliNumber(diffInDays)} দিন আগে`;
  
  return `${toBengaliNumber(date.getDate())} ${BENGALI_MONTHS[date.getMonth()]}, ${toBengaliNumber(date.getFullYear())}`;
}

export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  
  // Standard full youtube.com/watch?v=ID or youtu.be/ID or youtube.com/embed/ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

export function getYoutubeThumbnail(youtubeIdOrUrl: string): string {
  const id = youtubeIdOrUrl.length === 11 ? youtubeIdOrUrl : extractYoutubeId(youtubeIdOrUrl);
  if (!id) {
    return 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format&fit=crop&q=80';
  }
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${toBengaliNumber(minutes)} মিনিট পাঠ`;
}

// Convert image File to Base64 data URL
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
