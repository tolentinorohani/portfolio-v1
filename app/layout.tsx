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
  title: "Portfolio — Rohani Tolentino",
  description: "Portfolio of Rohani Tolentino",
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
        {children}
        <footer className="grid grid-cols-2 px-6 py-2 text-xs text-white">
          <div>
            <p>Rohani Tolentino.</p>
            <p>All Rights Reserved ©2026</p>
          </div>
          <div className="flex items-center justify-end gap-3">
            {/* Icons */}
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
              aria-label="LinkedIn (not available)"
              className="opacity-25 cursor-not-allowed"
            >
              <Image src={iconSrc(LinkedInIcon)} alt="LinkedIn" width={18} height={18} />
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
