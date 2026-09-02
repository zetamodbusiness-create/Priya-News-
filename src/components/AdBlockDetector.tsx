import React, { useEffect, useState } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export const AdBlockDetector: React.FC = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkAdBlocker = async () => {
    setIsChecking(true);
    let isBlocked = false;

    // Test 1: DOM Bait (Ad blockers aggressively hide elements with these class names)
    const bait = document.createElement('div');
    bait.className = 'ad-banner adsbox doubleclick sponsor-ad pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links';
    bait.style.position = 'absolute';
    bait.style.left = '-9999px';
    bait.style.height = '10px';
    bait.style.width = '10px';
    bait.style.display = 'block';
    document.body.appendChild(bait);

    // Give the ad blocker a fraction of a second to hide the bait
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (
      bait.offsetHeight === 0 ||
      bait.offsetWidth === 0 ||
      window.getComputedStyle(bait).display === 'none'
    ) {
      isBlocked = true;
    }
    
    // Cleanup bait
    if (document.body.contains(bait)) {
      document.body.removeChild(bait);
    }

    // Test 2: Network Bait (Attempt to fetch a known ad script url)
    if (!isBlocked) {
      try {
        await fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
        });
      } catch (error) {
        // If the fetch fails, it's highly likely an ad blocker blocked the request
        isBlocked = true;
      }
    }

    setAdBlockDetected(isBlocked);
    setIsChecking(false);

    // Lock scrolling if ad blocker is active
    if (isBlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    checkAdBlocker();
    
    // Periodically check to ensure they didn't re-enable it
    const interval = setInterval(() => {
      if (!adBlockDetected) {
        checkAdBlocker();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [adBlockDetected]);

  if (!adBlockDetected) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border-t-4 border-[#ff3b4e] animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-20 h-20 bg-red-100 text-[#ff3b4e] rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="w-10 h-10" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4 font-['Hind_Siliguri',sans-serif]">
          অ্যাড ব্লকার সনাক্ত করা হয়েছে!
        </h2>
        
        <p className="text-slate-600 mb-6 leading-relaxed font-['Hind_Siliguri',sans-serif]">
          আমাদের ওয়েবসাইটের প্রধান আয়ের উৎস হলো বিজ্ঞাপন। বিনামূল্যে আমাদের নির্ভরযোগ্য সংবাদ পড়তে অনুগ্রহ করে আপনার <strong>Ad Blocker</strong> বা ব্রাউজারের <strong>Shield</strong> বন্ধ করুন।
        </p>

        <div className="bg-slate-50 rounded-xl p-4 mb-8 text-sm text-slate-500 text-left">
          <ul className="list-disc pl-5 space-y-2 font-['Hind_Siliguri',sans-serif]">
            <li>আপনার ব্রাউজারের অ্যাড ব্লকার এক্সটেনশন পজ (Pause) করুন।</li>
            <li>Brave ব্রাউজার ব্যবহার করলে উপরের লায়ন (Lion) আইকনে ক্লিক করে Shield অফ করুন।</li>
            <li>অ্যাড ব্লকার বন্ধ করার পর নিচের বাটনে ক্লিক করে পেজটি রিফ্রেশ করুন।</li>
          </ul>
        </div>

        <button
          onClick={() => {
            setIsChecking(true);
            setTimeout(() => {
              window.location.href = window.location.href;
              window.location.reload();
            }, 300);
          }}
          disabled={isChecking}
          className="w-full bg-[#ff3b4e] hover:bg-[#e63546] text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 font-['Hind_Siliguri',sans-serif]"
        >
          {isChecking ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          {isChecking ? 'চেক করা হচ্ছে...' : 'আমি অ্যাড ব্লকার বন্ধ করেছি'}
        </button>
      </div>
    </div>
  );
};
