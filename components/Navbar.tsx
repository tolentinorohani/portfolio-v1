'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

const SECTION_IDS = ['contact', 'projects', 'skills', 'about', 'home'] as const;


export function Navbar() {
  const [visible,       setVisible]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      const hero      = document.getElementById('home');
      const threshold = (hero?.offsetHeight ?? window.innerHeight) * 0.85;
      setVisible(y > threshold);

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (y >= el.offsetTop - window.innerHeight * 0.35) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: visible ? 0 : -56, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-40 bg-slate-950/50 backdrop-blur-2xl border-b border-white/[0.07] shadow-[0_1px_24px_rgba(0,0,0,0.5)]"
      aria-label="Site navigation"
    >
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">

        {/* Logo */}
        <Link href="#home" aria-label="Go to top">
          <Image
            src="/images/logo.svg"
            alt="Rohani Tolentino"
            width={24}
            height={24}
            priority
          />
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const id       = item.href.slice(1);
            const isActive = activeSection === id;

            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={[
                    'block px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 tracking-wide',
                    isActive
                      ? 'bg-violet-500/15 text-violet-200'
                      : 'text-gray-400 hover:text-white',
                  ].join(' ')}
                >
                  {item.label}
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="nav-pin"
                    className="absolute top-full left-1/2 -translate-x-1/2 pointer-events-none"
                  >
                    <Image
                      src="/images/nav-indicator.svg"
                      alt=""
                      width={17}
                      height={65}
                    />
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>

      </div>
    </motion.nav>
  );
}
