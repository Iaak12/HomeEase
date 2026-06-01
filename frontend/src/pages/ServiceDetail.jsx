import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import siteData from '../site_data.json';

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const service = siteData.services[serviceName];

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceName]);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-left py-20 px-5">
        <h1 className="text-3xl font-bold mb-4">Service not found</h1>
        <p className="text-[var(--color-ink-4)] mb-6">The service you are looking for does not exist.</p>
        <Link to="/" className="btn-secondary">Go back home</Link>
      </div>
    );
  }

  const allServices = Object.values(siteData.services);
  const cities = Object.values(siteData.cities);

  // Other services (excluding the current one)
  const otherServices = allServices.filter(s => s.slug !== serviceName);

  return (
    <div className="w-full bg-[var(--color-surface-1)] min-h-screen text-left">
      {/* Breadcrumbs and Hero Section */}
      <section className="bg-white py-12 md:py-16 border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs md:text-sm text-[var(--color-ink-4)] font-medium mb-6">
            <Link to="/" className="hover:text-[var(--color-pronto-green-ink)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-[var(--color-pronto-green-ink)] transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[var(--color-ink-2)] font-semibold">{service.title}</span>
          </nav>

          <div className="grid md:grid-cols-[2fr_1.2fr] gap-8 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink-0)]">
                {service.title}
              </h1>
              {service.subtitle && (
                <p className="mt-4 text-xl text-[var(--color-ink-2)] italic font-medium">
                  "{service.subtitle}"
                </p>
              )}
              {service.description && (
                <p className="mt-4 text-lg text-[var(--color-ink-4)] leading-relaxed max-w-xl">
                  {service.description}
                </p>
              )}

              {/* Install Badges */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a
                  href="https://pronto.onelink.me/xj5m/install?pid=withpronto.com&c=home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex hover:opacity-95 transition-opacity"
                >
                  <img src="/brand/badge-google-play.svg" alt="Google Play Store" className="h-11 w-auto shadow-sm rounded-lg" />
                  <img src="/brand/badge-app-store.svg" alt="Apple App Store" className="h-11 w-auto shadow-sm rounded-lg" />
                </a>
                <Link to="/services" className="btn-secondary !px-6 !py-3 rounded-full text-xs font-bold uppercase tracking-wider">
                  All 20 services
                </Link>
              </div>
            </div>

            {/* Visual Icon Box */}
            <div className="hidden md:flex justify-end">
              <div className="w-40 h-40 bg-[var(--color-surface-3)] border border-[var(--color-border-cool)] rounded-3xl overflow-hidden flex items-center justify-center p-4">
                <img
                  src={`/icons/${service.slug}.webp`}
                  alt=""
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/icons/hourly-bookings.webp';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Included / Not Included Lists */}
      <section className="py-16 bg-white border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* What's Included */}
            <div className="bg-[var(--color-surface-1)] p-8 rounded-2xl border border-[var(--color-border-cool)]">
              <h2 className="text-xl font-bold text-[var(--color-ink-0)] mb-6 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[var(--color-pronto-green)] text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </span>
                What is included
              </h2>
              {service.included && service.included.length > 0 ? (
                <ul className="flex flex-col gap-4">
                  {service.included.map((inc, index) => (
                    <li key={index} className="flex gap-3 text-sm md:text-[15px] text-[var(--color-ink-2)] leading-relaxed">
                      <span className="text-[var(--color-pronto-green)] font-bold shrink-0 mt-0.5">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--color-ink-4)]">Professional execution matching industry standards.</p>
              )}
            </div>

            {/* What's Not Included */}
            <div className="bg-[var(--color-surface-1)] p-8 rounded-2xl border border-[var(--color-border-cool)]">
              <h2 className="text-xl font-bold text-[var(--color-ink-0)] mb-6 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[var(--color-danger)] text-white flex items-center justify-center font-bold text-sm">
                  ×
                </span>
                What is not included
              </h2>
              {service.not_included && service.not_included.length > 0 ? (
                <ul className="flex flex-col gap-4">
                  {service.not_included.map((notInc, index) => (
                    <li key={index} className="flex gap-3 text-sm md:text-[15px] text-[var(--color-ink-2)] leading-relaxed">
                      <span className="text-[var(--color-danger)] font-bold shrink-0 mt-0.5">•</span>
                      <span>{notInc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--color-ink-4)]">Deep repair, supply provision, or structural remodels.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Available Cities Grid */}
      <section className="py-16 border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-2xl font-bold text-[var(--color-ink-0)] mb-8">
            Available in 11 Indian cities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/cities/${city.slug}`}
                className="group relative block aspect-[10/7] overflow-hidden rounded-2xl ring-1 ring-[var(--color-border-cool)] hover:ring-[var(--color-pronto-green)] transition-all shadow-sm"
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('/brand/city-tiles/${city.slug}.jpg')` }}></div>
                {/* Tint Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-colors"></div>
                {/* Text */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-[15px] tracking-tight leading-tight">
                    {city.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Grid */}
      <section className="py-16 bg-white border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="text-2xl font-bold text-[var(--color-ink-0)] mb-8">
            More ways to keep your home clean
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {otherServices.slice(0, 6).map((srv) => (
              <Link
                key={srv.slug}
                to={`/services/${srv.slug}`}
                className="group p-4 pb-6 bg-white border border-[var(--color-border-cool)] rounded-xl text-center hover:border-[var(--color-pronto-green)] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-[var(--color-surface-3)] rounded-lg flex items-center justify-center overflow-hidden mb-3.5 mx-auto p-1">
                  <img
                    src={`/icons/${srv.slug}.webp`}
                    alt=""
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = '/icons/hourly-bookings.webp';
                    }}
                  />
                </div>
                <p className="text-[13px] font-semibold text-[var(--color-ink-2)] truncate group-hover:text-[var(--color-pronto-green-ink)] transition-colors">
                  {srv.title}
                </p>
              </Link>
            ))}
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

export default ServiceDetail;
