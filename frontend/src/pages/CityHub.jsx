import React from 'react';
import { Link } from 'react-router-dom';
import siteData from '../site_data.json';

const CityHub = () => {
  const cities = Object.values(siteData.cities);

  return (
    <div className="w-full bg-[var(--color-surface-1)] min-h-screen text-left">
      {/* Header Banner */}
      <section className="bg-white py-16 border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink-0)]">
              11 cities across India.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-[var(--color-ink-4)] leading-relaxed">
              HomeEase Professionals are live and serving gated societies, apartments, and layouts across 11 major metropolitan areas.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Cities */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/cities/${city.slug}`}
                className="group relative block aspect-[10/7] overflow-hidden rounded-2xl ring-1 ring-[var(--color-border-cool)] hover:ring-[var(--color-pronto-green)] transition-all shadow-md"
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('/brand/city-tiles/${city.slug}.jpg')` }}></div>
                {/* Tint Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                {/* Text */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-bold text-xl tracking-tight leading-tight mb-1">
                    {city.title}
                  </h3>
                  <p className="text-white/80 text-xs font-semibold">
                    View active services →
                  </p>
                </div>
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

export default CityHub;
