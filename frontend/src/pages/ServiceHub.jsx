import React from 'react';
import { Link } from 'react-router-dom';
import siteData from '../site_data.json';

const ServiceHub = () => {
  const services = Object.values(siteData.services);

  return (
    <div className="w-full bg-[var(--color-surface-1)] min-h-screen text-left">
      {/* Header Banner */}
      <section className="bg-white py-16 border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink-0)]">
              20 services.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[var(--color-ink-4)] leading-relaxed">
              Book trained professionals in minutes. From hourly bookings to task-based chores to deep express cleans.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Services */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-xl font-bold text-[var(--color-ink-0)] uppercase tracking-wider mb-8">
            Live in 11 cities across India
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((srv) => (
              <Link
                key={srv.slug}
                to={`/services/${srv.slug}`}
                className="group bg-white p-6 rounded-2xl border border-[var(--color-border-cool)] shadow-sm hover:border-[var(--color-pronto-green)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center overflow-hidden mb-5 group-hover:bg-[var(--color-surface-1)] transition-colors">
                  <img
                    src={`/icons/${srv.slug}.webp`}
                    alt=""
                    className="w-full h-full object-contain p-1.5"
                    onError={(e) => {
                      e.target.src = '/icons/hourly-bookings.webp';
                    }}
                  />
                </div>
                <h3 className="text-base font-bold text-[var(--color-ink-0)] mb-2">
                  {srv.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-4)] leading-relaxed line-clamp-3">
                  {srv.description || "Book a background-verified professional in minutes."}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 bg-white text-center border-t border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-ink-0)]">
            Get trusted house help in minutes.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--color-ink-4)] max-w-md mx-auto">
            Download the HomeEase app and book your first service today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://pronto.onelink.me/xj5m/install?pid=withpronto.com&c=home"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex hover:opacity-90 transition-opacity"
            >
              <img src="/brand/badge-google-play.svg" alt="Google Play Store" className="h-12 w-auto shadow-sm rounded-lg" />
              <img src="/brand/badge-app-store.svg" alt="Apple App Store" className="h-12 w-auto shadow-sm rounded-lg" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceHub;
