'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { projectsData, type Category } from '@/lib/projectsData';

type ViewMode      = 'slider' | 'gallery';
type GalleryFilter = Category | 'all';

const CATEGORY_LABELS: Record<Category, string> = {
  web:     'Website',
  mobile:  'Mobile',
  ui:      'UI Designs',
  '3d':    '3D Designs',
  graphic: 'Graphic Design',
};

const CATEGORIES: Category[] = ['web', 'mobile', 'ui', '3d', 'graphic'];

const DESIGN_CATS = new Set<Category>(['ui', '3d', 'graphic']);
const isDesignCat = (cat: Category) => DESIGN_CATS.has(cat);

// ── View-toggle icons ────────────────────────────────────────────────────────

function SliderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1.5" y="3"  width="17" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="15" width="13" height="1.5" rx="0.75" fill="currentColor" opacity="0.6" />
      <rect x="6"   y="17" width="8"  height="1"   rx="0.5"  fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11"  y="1.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1.5" y="11"  width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11"  y="11"  width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function iconSrc(icon: any): string {
  if (typeof icon === 'string') return icon;
  if (icon?.src) return icon.src as string;
  return '';
}

function NoPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-800/60 text-gray-600 text-xs select-none">
      No preview
    </div>
  );
}

// ── Component ───────────────────────────────────────────────────────────

export function Projects() {
  const [view, setView]                     = useState<ViewMode>('slider');
  const [activeCategory, setActiveCategory] = useState<Category>('web');
  const [activeIndex, setActiveIndex]       = useState(0);
  const [isDragging, setIsDragging]         = useState(false);

  const [lightboxSrc, setLightboxSrc]     = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all');
  const [expandedCard, setExpandedCard]   = useState<string | null>(null);

  function openLightbox(src: string) { setLightboxSrc(src); }
  function closeLightbox()           { setLightboxSrc(null); }

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxSrc]);

  const dragStartX = useRef<number | null>(null);
  const didDrag    = useRef(false);

  const filtered = projectsData.filter((p) => p.category === activeCategory);
  const current  = filtered[activeIndex] ?? filtered[0];

  function changeCategory(cat: Category) {
    setActiveCategory(cat);
    setActiveIndex(0);
  }

  function goTo(i: number) {
    setActiveIndex((i + filtered.length) % filtered.length);
  }

  function onPointerDown(clientX: number) {
    dragStartX.current = clientX;
    didDrag.current    = false;
    setIsDragging(true);
  }

  function onPointerUp(clientX: number) {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - clientX; // positive = swiped left = next
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

  const CARD_H  = 300;
  const PEEK    = 14;
  const MAX_STK = 2;

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-start justify-between mb-8">
          <SectionHeading>Projects</SectionHeading>
          <div className="flex gap-1 mt-1">
            {(['slider', 'gallery'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-label={v === 'slider' ? 'Card view' : 'Gallery view'}
                aria-pressed={view === v}
                className={`p-1.5 rounded transition-colors ${
                  view === v ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {v === 'slider' ? <SliderIcon /> : <GalleryIcon />}
              </button>
            ))}
          </div>
        </div>

        {view === 'slider' && (
          <div>

            <div className="flex gap-6 mb-10 flex-wrap border-b border-gray-800 pb-4">
              {CATEGORIES.map((cat) => {
                const count = projectsData.filter((p) => p.category === cat).length;
                if (count === 0) return null;
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => changeCategory(cat)}
                    className={`relative text-sm font-semibold pb-3 -mb-4 transition-colors ${
                      active ? 'text-violet-400' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                    {active && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-violet-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {current && (
              <div className="flex flex-col md:flex-row gap-10 items-start">

                <div
                  className={`w-full md:w-[52%] relative shrink-0 select-none ${
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                  style={{ height: CARD_H + PEEK * MAX_STK }}
                  onMouseDown={(e)  => { e.preventDefault(); onPointerDown(e.clientX); }}
                  onMouseUp={(e)    => onPointerUp(e.clientX)}
                  onMouseLeave={()  => onPointerCancel()}
                  onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
                  onTouchEnd={(e)   => onPointerUp(e.changedTouches[0].clientX)}
                  onTouchCancel={()  => onPointerCancel()}
                >
                  {filtered.map((proj, i) => {
                    const offset = (i - activeIndex + filtered.length) % filtered.length;
                    if (offset > MAX_STK) return null;
                    const isActive = offset === 0;

                    const targetOpacity = isActive ? 1 : offset === 1 ? 0.55 : 0.3;

                    return (
                      <motion.div
                        key={proj.title}
                        className="absolute rounded-xl overflow-hidden bg-gray-900 card-stack-item"
                        style={{
                          top:    offset * PEEK,
                          left:   offset * 10,
                          right:  offset * 10,
                          height: CARD_H,
                          zIndex: 10 - offset,
                          cursor: (!isActive || (isActive && isDesignCat(activeCategory) && proj.image)) ? 'pointer' : undefined,
                        }}
                        initial={{ opacity: targetOpacity }}
                        animate={{ opacity: targetOpacity }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        onClick={() => {
                          if (didDrag.current) { didDrag.current = false; return; }
                          if (!isActive) { goTo(i); return; }
                          if (isActive && isDesignCat(activeCategory) && proj.image) openLightbox(proj.image);
                        }}
                        aria-hidden={!isActive}
                      >
                        {proj.image ? (
                          <motion.div
                            className="relative w-full h-full"
                            whileHover={isActive ? { scale: 1.1 } : {}}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          >
                            <Image
                              src={proj.image}
                              alt={proj.title}
                              fill
                              priority={isActive}
                              loading={isActive ? 'eager' : 'lazy'}
                              className="object-cover"
                            />
                          </motion.div>
                        ) : (
                          <NoPreview />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex-1 flex flex-col gap-5 pt-2 min-w-0">

                  <div>
                    <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-gray-500 mb-1">
                      {CATEGORY_LABELS[activeCategory]}
                    </p>
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {current.title}
                    </h3>
                  </div>

                  {current.description && (
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {current.description}
                    </p>
                  )}

                  {current.techStack.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500">Made with:</span>
                      {current.techStack.map((icon, idx) => (
                        <Image key={idx} src={iconSrc(icon)} alt="" aria-hidden="true" width={22} height={22} className="object-contain" />
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    {isDesignCat(activeCategory) ? (
                      current.image ? (
                        <Button onClick={() => openLightbox(current.image)}>View</Button>
                      ) : (
                        <button disabled className="px-5 py-2.5 rounded-lg text-sm font-medium bg-violet-300/20 text-violet-300/40 cursor-not-allowed select-none">View</button>
                      )
                    ) : (
                      <>
                        {current.liveLink ? (
                          <Button href={current.liveLink}>Live</Button>
                        ) : (
                          <button disabled className="px-5 py-2.5 rounded-lg text-sm font-medium bg-violet-300/20 text-violet-300/40 cursor-not-allowed select-none">Live</button>
                        )}
                        {current.codeLink ? (
                          <Button href={current.codeLink} variant="outline">Code</Button>
                        ) : (
                          <button disabled className="px-5 py-2.5 rounded-lg text-sm font-medium border-2 border-violet-300/20 text-violet-300/40 cursor-not-allowed select-none">Code</button>
                        )}
                      </>
                    )}
                  </div>

                  {filtered.length > 1 && (
                    <div className="pt-2">
                      {/* Track */}
                      <div
                        className="relative h-0.75 bg-gray-700/50 rounded-full overflow-hidden"
                        role="progressbar"
                        aria-valuenow={activeIndex + 1}
                        aria-valuemin={1}
                        aria-valuemax={filtered.length}
                        aria-label={`Project ${activeIndex + 1} of ${filtered.length}`}
                      >
                        <motion.div
                          className="absolute left-0 top-0 h-full bg-violet-400 rounded-full"
                          initial={{ width: `${((activeIndex + 1) / filtered.length) * 100}%` }}
                          animate={{ width: `${((activeIndex + 1) / filtered.length) * 100}%` }}
                          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <button
                          onClick={() => goTo(activeIndex - 1)}
                          className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
                          aria-label="Previous project"
                        >
                          ‹
                        </button>
                        <span className="text-xs font-mono text-gray-500 tabular-nums">
                          {String(activeIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                        </span>
                        <button
                          onClick={() => goTo(activeIndex + 1)}
                          className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
                          aria-label="Next project"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'gallery' && (
          <div>

            <div className="flex gap-5 mb-8 flex-wrap border-b border-gray-800 pb-4">
              {(['all', ...CATEGORIES] as GalleryFilter[]).map((filter) => {
                const count = filter === 'all'
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === filter).length;
                if (count === 0) return null;
                const active = galleryFilter === filter;
                const label  = filter === 'all' ? 'All' : CATEGORY_LABELS[filter as Category];
                return (
                  <button
                    key={filter}
                    onClick={() => { setGalleryFilter(filter); setExpandedCard(null); }}
                    className={`relative text-sm font-semibold pb-3 -mb-4 transition-colors ${
                      active ? 'text-violet-400' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="absolute bottom-0 inset-x-0 h-0.5 bg-violet-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {(galleryFilter === 'all'
                ? projectsData
                : projectsData.filter((p) => p.category === galleryFilter)
              ).map((proj) => {
                const isExpanded = expandedCard === proj.title;
                return (
                  <div
                    key={proj.title}
                    className={`rounded-xl overflow-hidden border bg-gray-900/70 transition-colors cursor-pointer ${
                      isExpanded ? 'border-violet-500/50' : 'border-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() => setExpandedCard(isExpanded ? null : proj.title)}
                  >
                    <div className="relative w-full aspect-video bg-gray-800/60 overflow-hidden">
                      {proj.image ? (
                        <motion.div
                          className="relative w-full h-full"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                          <Image
                            src={proj.image}
                            alt={proj.title}
                            fill
                            loading="lazy"
                            className="object-cover"
                          />
                        </motion.div>
                      ) : (
                        <NoPreview />
                      )}
                    </div>

                    <div className="px-2.5 py-2 flex flex-col gap-0.5">
                      <h4 className="font-semibold text-white text-[11px] leading-tight truncate">
                        {proj.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-mono truncate">
                        {CATEGORY_LABELS[proj.category]}
                      </span>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          key="details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-2.5 pb-3 pt-1.5 flex flex-col gap-2 border-t border-gray-700/50">
                            {proj.description && (
                              <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-4">
                                {proj.description}
                              </p>
                            )}
                            {proj.techStack.length > 0 && (
                              <div className="flex items-center gap-1 flex-wrap">
                                {proj.techStack.map((icon, idx) => (
                                  <Image key={idx} src={iconSrc(icon)} alt="" aria-hidden="true" width={13} height={13} className="object-contain" />
                                ))}
                              </div>
                            )}
                            <div className="flex gap-1.5 flex-wrap">
                              {isDesignCat(proj.category) ? (
                                proj.image ? (
                                  <Button
                                    onClick={(e) => { e.stopPropagation(); openLightbox(proj.image); }}
                                    className="text-[10px] py-0.5! px-2! rounded!"
                                  >
                                    View
                                  </Button>
                                ) : (
                                  <button disabled className="px-2 py-0.5 rounded text-[10px] font-medium bg-violet-300/20 text-violet-300/40 cursor-not-allowed">View</button>
                                )
                              ) : (
                                <>
                                  {proj.liveLink ? (
                                    <Button href={proj.liveLink} className="text-[10px] py-0.5! px-2! rounded!">Live</Button>
                                  ) : (
                                    <button disabled className="px-2 py-0.5 rounded text-[10px] font-medium bg-violet-300/20 text-violet-300/40 cursor-not-allowed">Live</button>
                                  )}
                                  {proj.codeLink ? (
                                    <Button href={proj.codeLink} variant="outline" className="text-[10px] py-0.5! px-2! rounded!">Code</Button>
                                  ) : (
                                    <button disabled className="px-2 py-0.5 rounded text-[10px] font-medium border border-violet-300/20 text-violet-300/40 cursor-not-allowed">Code</button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxSrc}
              alt="Full preview"
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-xs flex items-center justify-center transition-colors"
              aria-label="Close preview"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
