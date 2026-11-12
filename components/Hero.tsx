'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';

export function Hero() {
  const [flipped, setFlipped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setFlipped((f) => !f), 8_000);
  };

  useEffect(() => {
    if (reducedMotion) return;
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reducedMotion]);

  function handleFlip() {
    setFlipped((f) => !f);
    if (!reducedMotion) startInterval();
  }

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center min-h-screen py-16 px-6 gap-8"
    >
      <div className="relative" style={{ width: 360, height: 360 }}>
        
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <img
            src="/images/border-diamond.svg"
            alt=""
            className="ring-spin-cw w-full h-full"
          />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <img
            src="/images/border-dashed.svg"
            alt=""
            className="ring-spin-ccw"
            style={{ width: 280, height: 280 }}
          />
        </div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            width: 260,
            height: 260,
            perspective: '1000px',
          }}
        >
          <button
            onClick={handleFlip}
            aria-label={flipped ? 'Show front profile picture' : 'Show back profile picture'}
            className="relative w-full h-full cursor-pointer bg-transparent border-none p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 rounded-full"
            style={{
              transformStyle: 'preserve-3d',
              transition: reducedMotion ? 'none' : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            
            {/* Front face */}
            <div
              className="absolute inset-0 bg-[#e8dfc8] rounded-full overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              <Image
                src="/images/pfp-front.png"
                alt="Rohani Tolentino"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 bg-[#e8dfc8] rounded-full overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <Image
                src="/images/pfp-back.png"
                alt="Rohani Tolentino — back"
                fill
                className="object-contain"
              />
            </div>
          </button>
        </div>
      </div>

      <div className="text-center -mt-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[0.15em] uppercase text-white">
          Rohani Tolentino
        </h1>
        <p className="text-gray-300 text-sm mt-2 tracking-widest font-medium">
          Front-End Developer&nbsp;&nbsp;·&nbsp;&nbsp;UI Designer&nbsp;&nbsp;·&nbsp;&nbsp;Graphics Artist
        </p>
      </div>

      <div className="flex gap-3">
        <Button href='#contact'>Hire Me</Button>
        <a
          href="./data/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg font-medium text-sm inline-flex items-center justify-center border-2 border-violet-300 text-violet-300 hover:bg-violet-300 hover:text-violet-950 transition-all duration-200"
        >
          View CV
        </a>
      </div>
    </section>
  );
}