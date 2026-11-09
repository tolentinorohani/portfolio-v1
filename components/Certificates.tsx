'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { certsData } from '@/lib/certsData';

const CARD_W    = 260;
const CARD_H    = 340;
const OFFSET_X  = 215; // horizontal spread between cards
const ROTATE_Y  = 55;  // degrees of Y-rotation for adjacent cards

function cardProps(offset: number) {
  const clamped = Math.max(-2, Math.min(2, offset));
  const abs     = Math.abs(clamped);
  return {
    x:       offset  * OFFSET_X,
    rotateY: clamped * -ROTATE_Y,
    scale:   1 - abs * 0.1,
    opacity: Math.abs(offset) > 2 ? 0 : 1 - abs * 0.18,
  };
}

function RingDot({ size = 12 }: { size?: number }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <circle cx={r} cy={r} r={r - 0.5} stroke="#C3B1E1" strokeWidth="0.5" opacity="0.45" />
      <circle cx={r} cy={r} r={r * 0.45}  stroke="#C3B1E1" strokeWidth="0.5" opacity="0.7"  />
      <circle cx={r} cy={r} r={r * 0.18}  fill="#C3B1E1" />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export function Certificates() {
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [isDragging,   setIsDragging]   = useState(false);
  const [lightboxSrc,  setLightboxSrc]  = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightboxSrc(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxSrc]);

  const dragStartX = useRef<number | null>(null);
  const didDrag    = useRef(false);
  const total      = certsData.length;

  function goTo(i: number) {
    setActiveIndex(((i % total) + total) % total);
  }

  function onPointerDown(clientX: number) {
    dragStartX.current = clientX;
    didDrag.current    = false;
    setIsDragging(true);
  }

  function onPointerUp(clientX: number) {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - clientX;
    if (Math.abs(delta) > 40) {
      didDrag.current = true;
      goTo(delta > 0 ? activeIndex + 1 : activeIndex - 1);
    }
    dragStartX.current = null;
    setIsDragging(false);
  }

  function onPointerCancel() {
    dragStartX.current = null;
    setIsDragging(false);
  }

  return (
    <section
      id="certificates"
      className="relative py-24 px-6 overflow-hidden"
      aria-label="Certificates"
    >

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(195,177,225,0.05) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0    h-20 bg-linear-to-b from-slate-950 to-transparent pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-slate-950 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        <div className="text-center mb-2">
          <p className="text-xs font-mono tracking-[0.35em] text-[#C3B1E1]/50 uppercase mb-2 select-none">
            — Achievement Unlocked —
          </p>
          <SectionHeading>Certificates</SectionHeading>
        </div>

        <div className="flex justify-center mb-10 opacity-55" aria-hidden="true">
          <Image src="/images/nav-indicator.svg" alt="" width={17} height={65} />
        </div>

        <div
          className={`relative flex items-center justify-center select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            height:           CARD_H,
            perspective:      '1200px',
            perspectiveOrigin:'50% 50%',
          }}
          onMouseDown={(e)  => { e.preventDefault(); onPointerDown(e.clientX); }}
          onMouseUp={(e)    => onPointerUp(e.clientX)}
          onMouseLeave={()  => onPointerCancel()}
          onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
          onTouchEnd={(e)   => onPointerUp(e.changedTouches[0].clientX)}
          onTouchCancel={()  => onPointerCancel()}
        >
          {certsData.map((cert, i) => {
            const offset   = i - activeIndex;
            const isActive = offset === 0;
            const props    = cardProps(offset);

            return (
              <motion.div
                key={cert.title}
                className="absolute"
                style={{
                  left:   `calc(50% - ${CARD_W / 2}px)`,
                  top:    0,
                  width:  CARD_W,
                  height: CARD_H,
                  zIndex: 10 - Math.abs(offset),
                }}
                initial={props}
                animate={props}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => {
                  if (didDrag.current) { didDrag.current = false; return; }
                  if (!isActive) goTo(i);
                }}
              >
                {/* Card container */}
                <div
                  className={[
                    'relative w-full h-full rounded-xl flex flex-col overflow-hidden',
                    'bg-[#0d0d14] border transition-shadow duration-500',
                    isActive
                      ? 'border-[#C3B1E1]/45 shadow-[0_0_48px_rgba(195,177,225,0.13)]'
                      : 'border-[#C3B1E1]/12',
                  ].join(' ')}
                >
                  {/* Corner brackets */}
                  <span aria-hidden="true" className="absolute top-2.5 left-2.5  w-3 h-3 border-t border-l border-[#C3B1E1]/50 pointer-events-none z-10" />
                  <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#C3B1E1]/50 pointer-events-none z-10" />
                  <span aria-hidden="true" className="absolute bottom-2.5 left-2.5  w-3 h-3 border-b border-l border-[#C3B1E1]/50 pointer-events-none z-10" />
                  <span aria-hidden="true" className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#C3B1E1]/50 pointer-events-none z-10" />

                  <div
                    className="relative m-3 mb-0 rounded-lg overflow-hidden bg-white/3 cursor-pointer group/img"
                    style={{ height: 196 }}
                    onClick={() => setLightboxSrc(cert.image)}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover/img:scale-105"
                      loading={isActive ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 bg-black/30">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C3B1E1" strokeWidth="1.5" aria-hidden="true">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="px-3.5 pb-4 pt-2.5">

                    {/* Divider — nav-indicator ring-dot motif */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <div className="flex-1 h-px bg-[#C3B1E1]/15" />
                      <RingDot size={10} />
                      <div className="flex-1 h-px bg-[#C3B1E1]/15" />
                    </div>

                    <h3 className="text-[13px] font-semibold text-white leading-snug mb-1.5 truncate">
                      {cert.title}
                    </h3>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#C3B1E1]/65 font-medium truncate">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 shrink-0 tracking-wide">
                        {cert.dateAwarded}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">

          <button
            onClick={() => goTo(activeIndex - 1)}
            className="text-[#C3B1E1]/45 hover:text-[#C3B1E1] transition-colors text-2xl leading-none"
            aria-label="Previous certificate"
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {certsData.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to certificate ${i + 1}`}
                aria-pressed={i === activeIndex}
                animate={{
                  width:           i === activeIndex ? 24 : 6,
                  backgroundColor: i === activeIndex
                    ? '#C3B1E1'
                    : 'rgba(195,177,225,0.25)',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ height: 6, borderRadius: 3, flexShrink: 0 }}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(activeIndex + 1)}
            className="text-[#C3B1E1]/45 hover:text-[#C3B1E1] transition-colors text-2xl leading-none"
            aria-label="Next certificate"
          >
            ›
          </button>

        </div>

        <div className="text-center mt-5">
          <p className="text-white text-sm font-semibold">
            {certsData[activeIndex].title}
          </p>
          <p className="text-[#C3B1E1]/55 text-[11px] font-mono mt-1 tracking-wide">
            {certsData[activeIndex].issuer}&nbsp;·&nbsp;{certsData[activeIndex].dateAwarded}
          </p>
        </div>

      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate full view"
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxSrc}
              alt="Certificate full view"
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#1a1a24] hover:bg-[#252530] border border-[#C3B1E1]/30 text-[#C3B1E1] text-xs flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
