'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import {
  AndroidStudioIcon, BlenderIcon, BootstrapIcon, CIcon, CanvaIcon,
  CsharpIcon, CSSIcon, FigmaIcon, HTMLIcon, IllustratorIcon,
  JavaIcon, JsIcon, MongoDBIcon, MySQLIcon, NextIcon,
  PythonIcon, ReactIcon, SQLiteIcon, TailwindIcon,
} from './icons';

type Category = 'all' | 'frontend' | 'backend' | 'tools';
type Tier = 'legendary' | 'epic' | 'rare' | 'uncommon';

interface Skill {
  name: string;
  icon: any;
  category: Exclude<Category, 'all'>;
  tier: Tier;
}

const tierConfig: Record<Tier, {
  cardClass: string;
  tierGlow: string;
  badgeClass: string;
  dotClass: string;
  label: string;
}> = {
  legendary: {
    cardClass: 'border-amber-400/30 hover:border-amber-400/60',
    tierGlow: 'rgba(251, 191, 36, 0.9)',
    badgeClass: 'bg-amber-400 text-amber-950',
    dotClass: 'bg-amber-400',
    label: 'Legendary',
  },
  epic: {
    cardClass: 'border-violet-400/30 hover:border-violet-400/60',
    tierGlow: 'rgba(167, 139, 250, 0.9)',
    badgeClass: 'bg-violet-500 text-white',
    dotClass: 'bg-violet-400',
    label: 'Epic',
  },
  rare: {
    cardClass: 'border-blue-400/30 hover:border-blue-400/60',
    tierGlow: 'rgba(96, 165, 250, 0.9)',
    badgeClass: 'bg-blue-500 text-white',
    dotClass: 'bg-blue-400',
    label: 'Rare',
  },
  uncommon: {
    cardClass: 'border-emerald-400/30 hover:border-emerald-400/60',
    tierGlow: 'rgba(74, 222, 128, 0.9)',
    badgeClass: 'bg-emerald-500 text-white',
    dotClass: 'bg-emerald-400',
    label: 'Uncommon',
  },
};

const categoryConfig: Record<Category, {
  label: string;
  activeClass: string;
  hoverClass: string;
}> = {
  all: {
    label: 'All Skills',
    activeClass: 'bg-gradient-to-r from-violet-600 to-blue-500 text-white border-transparent shadow-[0_0_14px_rgba(139,92,246,0.45)]',
    hoverClass: 'hover:border-violet-500 hover:text-violet-300',
  },
  frontend: {
    label: 'Frontend',
    activeClass: 'bg-gradient-to-r from-cyan-600 to-blue-500 text-white border-transparent shadow-[0_0_14px_rgba(6,182,212,0.45)]',
    hoverClass: 'hover:border-cyan-500 hover:text-cyan-300',
  },
  backend: {
    label: 'Backend & DB',
    activeClass: 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-transparent shadow-[0_0_14px_rgba(16,185,129,0.45)]',
    hoverClass: 'hover:border-emerald-500 hover:text-emerald-300',
  },
  tools: {
    label: 'Tools & Design',
    activeClass: 'bg-gradient-to-r from-orange-600 to-pink-600 text-white border-transparent shadow-[0_0_14px_rgba(249,115,22,0.45)]',
    hoverClass: 'hover:border-orange-500 hover:text-orange-300',
  },
};

const SKILLS: Skill[] = [
  { name: 'HTML5',         icon: HTMLIcon,          category: 'frontend', tier: 'legendary' },
  { name: 'CSS3',          icon: CSSIcon,           category: 'frontend', tier: 'legendary' },
  { name: 'JavaScript',    icon: JsIcon,            category: 'frontend', tier: 'epic'      },
  { name: 'React',         icon: ReactIcon,         category: 'frontend', tier: 'epic'      },
  { name: 'Tailwind CSS',  icon: TailwindIcon,      category: 'frontend', tier: 'epic'      },
  { name: 'Next.js',       icon: NextIcon,          category: 'frontend', tier: 'rare'      },
  { name: 'Bootstrap',     icon: BootstrapIcon,     category: 'frontend', tier: 'uncommon'      },
  { name: 'Python',        icon: PythonIcon,        category: 'backend',  tier: 'uncommon'      },
  { name: 'Java',          icon: JavaIcon,          category: 'backend',  tier: 'rare'      },
  { name: 'C',             icon: CIcon,             category: 'backend',  tier: 'rare'      },
  { name: 'C#',            icon: CsharpIcon,        category: 'backend',  tier: 'rare'      },
  { name: 'MongoDB',       icon: MongoDBIcon,       category: 'backend',  tier: 'uncommon'      },
  { name: 'MySQL',         icon: MySQLIcon,         category: 'backend',  tier: 'uncommon'  },
  { name: 'SQLite',        icon: SQLiteIcon,        category: 'backend',  tier: 'uncommon'  },
  { name: 'Figma',         icon: FigmaIcon,         category: 'tools',    tier: 'legendary' },
  { name: 'Canva',         icon: CanvaIcon,         category: 'tools',    tier: 'legendary'      },
  { name: 'Illustrator',   icon: IllustratorIcon,   category: 'tools',    tier: 'uncommon'      },
  { name: 'Blender',       icon: BlenderIcon,       category: 'tools',    tier: 'rare'      },
  { name: 'Android Studio',icon: AndroidStudioIcon, category: 'tools',    tier: 'uncommon'  },
];

function getIconSrc(icon: any): string {
  if (typeof icon === 'string') return icon;
  if (icon && typeof icon.src === 'string') return icon.src;
  return '';
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredSkills = activeCategory === 'all'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative py-24 px-6 text-slate-100 overflow-hidden"
      aria-label="Skills"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-950 to-transparent pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-slate-950 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-xs font-mono tracking-[0.35em] text-slate-500 uppercase mb-2 select-none">
            — Character Sheet —
          </p>
          <SectionHeading>Skill Tree</SectionHeading>
          <p className="text-slate-400 text-sm mt-1 font-mono tracking-wider select-none">
            Acquired abilities &amp; tech mastery
          </p>
        </div>

        <div
          className="flex flex-wrap justify-center gap-4 mb-6"
          role="list"
          aria-label="Tier rarity legend"
        >
          {(Object.keys(tierConfig) as Tier[]).map((tier) => (
            <div key={tier} role="listitem" className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`w-2 h-2 rounded-full ${tierConfig[tier].dotClass}`}
              />
              <span className="text-[11px] font-mono text-slate-400 tracking-wide">
                {tierConfig[tier].label}
              </span>
            </div>
          ))}
        </div>

        <div aria-hidden="true" className="flex items-center gap-3 mb-8 px-4">
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-slate-700 to-slate-700" />
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span className="w-1 h-1 rounded-full bg-slate-600" />
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent via-slate-700 to-slate-700" />
        </div>

        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {(Object.keys(categoryConfig) as Category[]).map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                'px-4 py-1.5 rounded-full border text-sm font-semibold tracking-wide',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
                activeCategory === cat
                  ? categoryConfig[cat].activeClass
                  : `bg-transparent border-slate-700 text-slate-400 ${categoryConfig[cat].hoverClass}`,
              ].join(' ')}
            >
              {categoryConfig[cat].label}
            </button>
          ))}
        </div>

        <div
          role="list"
          aria-label={activeCategory === 'all' ? 'All skills' : `${categoryConfig[activeCategory].label} skills`}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
        >
          {filteredSkills.map((skill, index) => {
            const tier = tierConfig[skill.tier];
            return (
              <div
                key={skill.name}
                role="listitem"
                tabIndex={0}
                aria-label={`${skill.name} — ${tier.label}`}
                className={[
                  'skill-card',
                  'relative flex flex-col items-center',
                  'p-3 pt-5 rounded-xl bg-slate-900 border',
                  tier.cardClass,
                  'transition-all duration-300 ease-out',
                  'hover:-translate-y-2 hover:bg-slate-800 hover:border-opacity-100',
                  'focus-visible:outline-none focus-visible:-translate-y-2 focus-visible:bg-slate-800',
                  'cursor-default select-none',
                ].join(' ')}
                style={{
                  '--appear-delay': `${index * 0.045}s`,
                  '--tier-glow': tier.tierGlow,
                } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${tier.dotClass}`}
                />

                <div className="w-10 h-10 flex items-center justify-center mb-2.5">
                  <Image
                    src={getIconSrc(skill.icon)}
                    alt=""
                    aria-hidden="true"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                  />
                </div>

                <span className="text-[11px] font-semibold text-slate-300 text-center leading-tight">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs font-mono text-slate-600 mt-8 tracking-wider select-none">
          {filteredSkills.length} skills unlocked
        </p>
      </div>
    </section>
  );
}
