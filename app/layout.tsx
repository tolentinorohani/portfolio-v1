import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Image from "next/image";
import GithubIcon   from '@/components/icons/github-original.svg';
import LinkedInIcon from '@/components/icons/linkedin-original.svg';
import "./globals.css";

function iconSrc(icon: any): string {
  if (typeof icon === 'string') return icon;
  if (icon?.src) return icon.src as string;
  return '';
}

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohani Tolentino — Front-End Developer & UI Designer",
  description:
    "Portfolio of Rohani Tolentino, a front-end developer, UI designer, and graphics artist based in the Philippines.",
  openGraph: {
    title: "Rohani Tolentino — Front-End Developer & UI Designer",
    description:
      "Portfolio of Rohani Tolentino, a front-end developer, UI designer, and graphics artist based in the Philippines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} bg-slate-950 h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col"
      suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-violet-500 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
        <footer className="px-6 py-4 text-xs text-white/70 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p>Rohani Tolentino.</p>
              <p>All Rights Reserved ©2026</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/tolentinorohani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Image src={iconSrc(GithubIcon)} alt="GitHub" width={18} height={18} className="invert" />
              </a>
              <span
                title="LinkedIn coming soon"
                aria-label="LinkedIn (coming soon)"
                className="opacity-30 cursor-not-allowed"
              >
                <Image src={iconSrc(LinkedInIcon)} alt="LinkedIn" width={18} height={18} />
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
