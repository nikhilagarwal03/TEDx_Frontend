import React, { useRef, useEffect } from "react";

const VIDEO_SOURCE = "/preloader.mp4";

export default function Preloader({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // iOS autoplay fix
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <div className="w-full h-[100dvh] flex items-center justify-center">
        <video
          ref={videoRef}
          src={VIDEO_SOURCE}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={onFinish}
          className="
            w-full h-full
            object-contain     /* ✅ MOBILE: entire video visible */
            sm:object-cover    /* ✅ DESKTOP: fill screen */
          "
        />
      </div>
    </div>
  );
}
