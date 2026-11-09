'use client';

import { useState, useEffect } from 'react';
import { SectionHeading } from './SectionHeading';


function getOffsetLabel(offsetHours: number): string {
  const sign = offsetHours >= 0 ? '+' : '-';
  const abs = Math.abs(offsetHours);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return m > 0
    ? `GMT ${sign}${h}:${String(m).padStart(2, '0')}`
    : `GMT ${sign}${h}`;
}

function getRelativeLabel(diff: number): string {
  if (diff === 0) return 'same timezone';
  const abs = Math.abs(diff);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  const amount = m > 0 ? `${h}h ${m}m` : `${h}h`;
  return diff > 0 ? `${amount} after you` : `${amount} before you`;
}

export function About() {
  const [time, setTime]   = useState<Date | null>(null);
  const [is24h, setIs24h] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const localOffset = time ? -time.getTimezoneOffset() / 60 : 0;
  const diff        = 8 - localOffset;

  const fmt = (tz?: string) => {
    if (!time) return '--:--';
    return new Intl.DateTimeFormat('en-US', {
      ...(tz ? { timeZone: tz } : {}),
      hour:   is24h ? '2-digit' : 'numeric',
      minute: '2-digit',
      hour12: !is24h,
    }).format(time);
  };

  const myTime       = fmt('Asia/Manila');
  const yourTime     = fmt();
  const yourGMT      = time ? getOffsetLabel(localOffset) : 'GMT';
  const relative     = time ? getRelativeLabel(diff)      : '...';
  const monthLabel   = time
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(time)
    : '';

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        <div>
          <SectionHeading>About Me</SectionHeading>
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-300 mt-6">
            <p className="font-bold text-white text-base">
              I&apos;m a Front-End Web Developer based from the Philippines.
            </p>
            <p>
              I am an aspiring developer passionate about building interactive and
              creative digital experiences.
            </p>
            <p>
              While I&apos;m mainly focused on front-end, I also explore mobile development,
              UI design, and graphic design, allowing me to work both technical and
              creative projects.
            </p>
            <p>
              I&apos;m passionate about continuously learning and improving my coding skills.
            </p>
          </div>
        </div>

        {/* Now section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src="/images/crosshair.svg" alt="" aria-hidden="true" width={30} height={30} className='-translate-x-2.5'/>
              <h3 className="text-2xl font-bold text-white">Now</h3>
            </div>
            <span className="text-sm text-gray-400 font-mono">{monthLabel}</span>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col items-center shrink-0 mt-1">
              <div className="w-px grow bg-linear-to-b from-violet-500/60 to-violet-500/20 min-h-8" />
              <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
              <div className="w-px grow bg-violet-500/20 min-h-24" />
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500/35 shrink-0" />
              <div className="w-px grow bg-violet-500/10 min-h-4" />
            </div>

            <div className="flex flex-col gap-5 flex-1 min-w-0">

              <p className="text-sm text-gray-400 leading-relaxed">
                Currently studying at{' '}
                <span className="font-semibold text-white">STI Lipa, Philippines.</span>
              </p>

              <div className="bg-[#1a1a22] border border-gray-700/50 rounded-xl p-4 relative">

                <button
                  onClick={() => setIs24h((v) => !v)}
                  aria-pressed={is24h}
                  aria-label="Toggle 24-hour clock"
                  className={[
                    'absolute top-3 right-3 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400',
                    is24h
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-700/60 text-gray-400 hover:bg-gray-700 hover:text-gray-300',
                  ].join(' ')}
                >
                  24H
                </button>

                {/* Time widget */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 pr-10">

                  <div>
                    <p className="text-xs text-gray-400 mb-1 font-medium tracking-wide">My Time</p>
                    <p className="text-2xl sm:text-3xl font-bold tabular-nums leading-none tracking-tight text-white">
                      {myTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5">GMT +8</p>
                  </div>

                  <p className="text-[10px] text-gray-400 text-center px-2 leading-snug">
                    {relative}
                  </p>

                  <div>
                    <p className="text-xs text-gray-400 mb-1 font-medium tracking-wide">Your Time</p>
                    <p className="text-2xl sm:text-3xl font-bold tabular-nums leading-none tracking-tight text-white">
                      {yourTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5">{yourGMT}</p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
