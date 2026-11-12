'use client';

import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

export function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isComplete = form.name.trim().length > 0
    && form.email.trim().length > 0
    && form.message.trim().length > 0;

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!isComplete) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
    );
    window.location.href = `mailto:tolentinorohani@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('tolentinorohani@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  }

  const inputClass =
    'w-full bg-[#1e1e24] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 ' +
    'focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors duration-150';

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-xl mx-auto">
        <SectionHeading>Contact Form</SectionHeading>

        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Please email me directly at{' '}
          <span className="inline-flex items-center gap-1.5 align-baseline">
            <a
              href="mailto:tolentinorohani@gmail.com"
              className="font-bold text-white hover:text-violet-300 transition-colors"
            >
              tolentinorohani@gmail.com
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? 'Copied!' : 'Copy email address'}
              title={copied ? 'Copied!' : 'Copy email address'}
              className="text-gray-500 hover:text-violet-300 transition-colors focus-visible:outline-none focus-visible:text-violet-300"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </span>{' '}
          or drop your info here
        </p>

        <div className="bg-[#151519] border border-gray-700/40 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-gray-200">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your Name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@sample.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-gray-200">
                Message
              </label>
              <textarea
                id="contact-message"
                placeholder="Describe me your project.."
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={!isComplete}
              className={[
                'relative w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',
                'focus-visible:ring-offset-2 focus-visible:ring-offset-[#151519]',
                isComplete
                  ? 'shimmer-border-active bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white border border-transparent cursor-pointer'
                  : 'bg-gray-800/50 text-gray-600 border border-gray-700/50 cursor-not-allowed',
              ].join(' ')}
            >
              {submitted ? 'Opening your email app…' : 'Send Message'}
            </button>
            {submitted && (
              <p className="text-xs text-emerald-400 text-center" role="status">
                Your email client should open with the message pre-filled.
              </p>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
