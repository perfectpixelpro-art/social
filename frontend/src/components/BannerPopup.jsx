import { useState, useEffect } from "react";
import { getActiveBanners } from "../api";

// Shows the latest active banner as a dismissible popup (once per banner, per browser).
export default function BannerPopup() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await getActiveBanners();
        const list = r.data || [];
        const dismissed = JSON.parse(localStorage.getItem("dismissedBanners") || "[]");
        const next = list.find((b) => !dismissed.includes(b._id));
        if (next) setBanner(next);
      } catch { /* ignore */ }
    })();
  }, []);

  const close = () => {
    if (banner) {
      const dismissed = JSON.parse(localStorage.getItem("dismissedBanners") || "[]");
      localStorage.setItem("dismissedBanners", JSON.stringify([...dismissed, banner._id]));
    }
    setBanner(null);
  };

  if (!banner) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4" onClick={close}>
      <div className="bg-white rounded-[18px] w-full max-w-[720px] overflow-hidden shadow-[0_24px_70px_rgba(1,49,134,0.3)]" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          {banner.imageUrl && <img src={banner.imageUrl} alt={banner.title} className="w-full max-h-[460px] object-cover" />}
          <button onClick={close} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        {(banner.title || banner.body || banner.link) && (
          <div className="p-6 text-center">
            {banner.title && <h2 className="m-0 text-[20px] font-bold text-[#0b1f44]">{banner.title}</h2>}
            {banner.body && <p className="m-0 mt-2 text-[14px] text-[#5b6472]">{banner.body}</p>}
            {banner.link && (
              <a href={banner.link} target="_blank" rel="noreferrer" onClick={close}
                className="inline-block mt-4 px-6 py-2.5 rounded-[10px] bg-[#013186] text-white font-bold text-[14px] no-underline hover:bg-[#012270]">
                Learn more
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
