import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import siteData from '../site_data.json';

const CityDetail = () => {
  const { cityName } = useParams();
  const city = siteData.cities[cityName];

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cityName]);

  if (!city) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-left py-20 px-5">
        <h1 className="text-3xl font-bold mb-4">City not found</h1>
        <p className="text-[var(--color-ink-4)] mb-6">The city you are looking for does not exist.</p>
        <Link to="/" className="btn-secondary">Go back home</Link>
      </div>
    );
  }

  const services = Object.values(siteData.services);
  const allCities = Object.values(siteData.cities);

  // Other cities (excluding the current one)
  const otherCities = allCities.filter(c => c.slug !== cityName);

  return (
    <div className="w-full bg-[var(--color-surface-1)] min-h-screen text-left">
      {/* Breadcrumbs and Hero Section */}
      <section className="bg-white py-12 md:py-16 border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-[var(--color-ink-4)] font-medium mb-6">
            <Link to="/" className="hover:text-[var(--color-pronto-green-ink)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cities" className="hover:text-[var(--color-pronto-green-ink)] transition-colors">Cities</Link>
            <span>/</span>
            <span className="text-[var(--color-ink-2)] font-semibold">{city.title}</span>
          </nav>

          <div className="grid md:grid-cols-[2fr_1.2fr] gap-8 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink-0)]">
                House help in {city.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-[var(--color-ink-4)] leading-relaxed max-w-xl">
                {city.subtitle || `A team of trained and highly-rated HomeEase Professionals serves homes across ${city.title}.`}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a
                  href="https://tally.so/r/zxQ1RE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--color-pronto-green)] text-[var(--color-pronto-green-ink)] font-bold text-[14px] hover:bg-[var(--color-pronto-green)] hover:text-white transition-all duration-200 shadow-sm"
                >
                  Request HomeEase in your locality
                </a>
                <a
                  href="https://pronto.onelink.me/xj5m/install?pid=withpronto.com&c=home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex hover:opacity-95 transition-opacity"
                >
                  <img src="/brand/badge-google-play.svg" alt="Google Play Store" className="h-10 w-auto shadow-sm rounded-lg" />
                  <img src="/brand/badge-app-store.svg" alt="Apple App Store" className="h-10 w-auto shadow-sm rounded-lg" />
                </a>
              </div>
            </div>

            {/* City Visual Cover image */}
            <div className="hidden md:flex justify-end">
              <div className="w-56 h-40 rounded-3xl overflow-hidden shadow-md relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/brand/city-tiles/${city.slug}.jpg')` }}
                ></div>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services available in City */}
      <section className="py-16 bg-white border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-2xl font-bold text-[var(--color-ink-0)] mb-8">
            Services available in {city.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {services.map((srv) => (
              <Link
                key={srv.slug}
                to={`/services/${srv.slug}`}
                className="group p-4 bg-[var(--color-surface-1)] border border-[var(--color-border-cool)] rounded-2xl flex flex-col items-center text-center hover:border-[var(--color-pronto-green)] hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden mb-3 p-1 shadow-sm group-hover:bg-[var(--color-surface-1)] transition-colors">
                  <img
                    src={`/icons/${srv.slug}.webp`}
                    alt=""
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = '/icons/hourly-bookings.webp';
                    }}
                  />
                </div>
                <p className="text-[13px] font-semibold text-[var(--color-ink-2)] truncate w-full group-hover:text-[var(--color-pronto-green-ink)] transition-colors">
                  {srv.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Cities serving Grid */}
      <section className="py-16 border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-xl text-left mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-ink-0)] mb-2">
              Other cities HomeEase serves
            </h2>
            <p className="text-sm text-[var(--color-ink-4)] leading-relaxed">
              Looking for help somewhere else? See all other cities where HomeEase Professionals are live today.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/cities/${c.slug}`}
                className="group relative block aspect-[10/7] overflow-hidden rounded-2xl ring-1 ring-[var(--color-border-cool)] hover:ring-[var(--color-pronto-green)] transition-all shadow-sm"
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('/brand/city-tiles/${c.slug}.jpg')` }}></div>
                {/* Tint Overlay */}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors"></div>
                {/* Text */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-[14px] tracking-tight leading-tight">
                    {c.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/cities" className="btn-secondary !px-6 !py-3">
              House help in all 11 cities
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 bg-white text-center">
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

export default CityDetail;
