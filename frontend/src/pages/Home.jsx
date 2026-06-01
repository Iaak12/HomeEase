import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import siteData from '../site_data.json';

const Home = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  const services = Object.values(siteData.services);
  const cities = Object.values(siteData.cities);
  const faqs = siteData.faqs;

  const pressLogos = [
    { name: 'TechCrunch', src: '/press/techcrunch.svg' },
    { name: 'Bloomberg', src: '/press/bloomberg.svg' },
    { name: 'Reuters', src: '/press/reuters.svg' },
    { name: 'Business Standard', src: '/press/business-standard.png' },
    { name: 'Economic Times', src: '/press/economic-times.svg' },
    { name: 'India Today', src: '/press/india-today.png' },
    { name: 'YourStory', src: '/press/yourstory.svg' },
    { name: 'Inc42', src: '/press/inc42.png' },
    { name: 'Entrackr', src: '/press/entrackr.svg' }
  ];

  const testimonials = [
    {
      quote: "I'd say it was great value for money. The urgency was handled well, without compromising quality. Recommended!",
      author: "Pooja Sharma",
      city: "Bengaluru"
    },
    {
      quote: "The service was simple and effective. It met my expectations without any hassle. Good overall experience.",
      author: "Rohan Verma",
      city: "Gurgaon"
    },
    {
      quote: "Great work, my home was left spotless and fresh. The cleaning was thorough, and I appreciated the attention to detail.",
      author: "Nisha Patel",
      city: "Mumbai"
    },
    {
      quote: "On-demand help has never been this simple in India. Pro arrived in exactly 12 minutes. Absolutely blew my mind.",
      author: "Aditya Rao",
      city: "Pune"
    },
    {
      quote: "No awkward conversations. Paused subscription for a week from the app when I was traveling. Seamless.",
      author: "Siddharth Sen",
      city: "Delhi"
    }
  ];

  const steps = [
    {
      id: 1,
      title: "Pick from 20 trusted services",
      desc: "Browse 20 services in the HomeEase app - from hourly bookings to per-task jobs to express cleans. Stack multiple tasks into one booking. Your Pro handles them all in a single visit.",
      image: "/app-screens/step-1-a.webp",
      subImages: ["/app-screens/step-1-a.webp", "/app-screens/step-1-b.webp", "/app-screens/step-1-c.webp"]
    },
    {
      id: 2,
      title: "Add it to your cart",
      desc: "See transparent upfront prices based on your exact selections. No hourly rates, no hidden fees, no advance deposits. Everything is calculated in-app instantly.",
      image: "/app-screens/step-2.webp"
    },
    {
      id: 3,
      title: "Choose instant, scheduled, or recurring",
      desc: "Book instant service for a Pro to arrive in 15 minutes, schedule a slot for later today, or set up a recurring slot for consistent daily or weekly upkeep.",
      image: "/app-screens/step-3-a-instant.webp",
      subImages: ["/app-screens/step-3-a-instant.webp", "/app-screens/step-3-b-scheduled.webp", "/app-screens/step-3-c-recurring.webp"]
    }
  ];

  const [activeSubImageIndex, setActiveSubImageIndex] = useState({ 1: 0, 3: 0 });

  const handleSubImageClick = (stepId, index) => {
    setActiveSubImageIndex(prev => ({ ...prev, [stepId]: index }));
  };

  const getStepImage = (step) => {
    if (step.subImages) {
      const idx = activeSubImageIndex[step.id] || 0;
      return step.subImages[idx];
    }
    return step.image;
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-16 pb-0 overflow-hidden md:min-h-[580px] lg:min-h-[calc(64px+380px*1.36)] bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(15,118,110,0.12) 1.25px, transparent 1.5px)',
              backgroundSize: '18px 18px',
              maskImage: 'radial-gradient(ellipse 70% 80% at 0% 100%, black 0%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 0% 100%, black 0%, transparent 70%)'
            }}
          ></div>
          <div className="absolute w-[480px] h-[480px] rounded-full bg-[var(--color-pronto-green)]/10 blur-3xl -bottom-32 -left-32"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,440px)] gap-8 lg:gap-10 items-end">
            <div className="text-left pb-8 md:pb-12 lg:pb-16">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-cool)] bg-white/70 px-3.5 py-1.5 backdrop-blur-sm shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-pronto-green)] opacity-75 animate-ping" aria-hidden="true"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-pronto-green)]" aria-hidden="true"></span>
                </span>
                <span className="text-xs md:text-sm font-semibold tracking-wide text-[var(--color-ink-2)]">
                  Trusted by 500,000+ homes <span className="text-[var(--color-ink-4)] font-normal"> · </span> 11 cities live
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[var(--color-ink-0)] font-bold tracking-tight leading-[1.1] text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Trusted house help <br className="hidden sm:inline" />
                <span className="text-[var(--color-pronto-green)]">in minutes!</span>
              </h1>
              
              <p className="mt-4 text-lg md:text-xl text-[var(--color-ink-4)] max-w-xl leading-relaxed">
                Your home, professionally cleaned - exactly when you need it.
              </p>

              {/* Form Link */}
              <div className="mt-6">
                <a
                  href="https://tally.so/r/zxQ1RE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--color-pronto-green)] text-[var(--color-pronto-green-ink)] font-bold text-[15px] hover:bg-[var(--color-pronto-green)] hover:text-white transition-all duration-200 shadow-sm"
                >
                  Request HomeEase in your locality
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>

              {/* Badges */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a
                  href="https://pronto.onelink.me/xj5m/install?pid=withpronto.com&c=home"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get the HomeEase app"
                  className="inline-flex items-center gap-2 hover:opacity-95 transition-opacity"
                >
                  <img src="/brand/badge-google-play.svg" alt="Google Play Store" className="h-12 md:h-14 w-auto shadow-sm rounded-lg" />
                  <img src="/brand/badge-app-store.svg" alt="Apple App Store" className="h-12 md:h-14 w-auto shadow-sm rounded-lg" />
                </a>
              </div>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-2.5">
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-pronto-green)]">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-[var(--color-ink-2)]">
                  <span className="font-bold text-[var(--color-ink-0)]">4.5</span> from 42,700+ ratings
                </span>
              </div>

              {/* Cities list link */}
              <div className="mt-8 border-t border-[var(--color-border-cool)] pt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                <span className="text-[11px] font-bold tracking-[0.14em] text-[var(--color-ink-4)] uppercase mr-1">Live in</span>
                {cities.slice(0, 6).map((city) => (
                  <Link
                    key={city.slug}
                    className="inline-flex items-center px-3.5 py-1.5 text-sm font-medium text-[var(--color-ink-2)] bg-[var(--color-surface-1)] border border-[var(--color-border-cool)] rounded-full hover:border-[var(--color-pronto-green)] hover:text-[var(--color-pronto-green-ink)] hover:bg-white transition-all shadow-sm"
                    to={`/cities/${city.slug}`}
                  >
                    {city.title}
                  </Link>
                ))}
                <Link
                  className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-pronto-green-ink)] hover:underline ml-1"
                  to="/cities"
                >
                  +{cities.length - 6} more cities
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Hero Image (Mobile / Laptop visual fallback support) */}
            <div className="relative flex justify-center lg:block max-w-xs sm:max-w-sm mx-auto lg:mx-0 w-full overflow-hidden" style={{ aspectRatio: '500 / 780' }}>
              <img
                alt="HomeEase Professional"
                className="w-full h-auto object-bottom"
                src="/brand/hero_pro_homeease.png"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 98%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 98%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Large Desktop Graphic */}
        <div className="hidden lg:block absolute top-16 right-[8%] xl:right-[12%] w-[380px] xl:w-[420px] pointer-events-none">
          <img
            alt="HomeEase Professional"
            className="w-full h-auto"
            src="/brand/hero_pro_homeease.png"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 98%)'
            }}
          />
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-12 bg-white border-y border-[var(--color-border-cool)] overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 mb-6 text-center">
          <span className="inline-block text-xs font-bold text-[var(--color-pronto-green)] uppercase tracking-[0.2em] mb-1">
            Featured in
          </span>
        </div>
        <div className="marquee">
          <div className="marquee-track flex animate-[marquee-left_35s_linear_infinite] whitespace-nowrap">
            {[...pressLogos, ...pressLogos].map((press, idx) => (
              <div key={idx} className="shrink-0 h-12 px-8 flex items-center justify-center">
                <img
                  src={press.src}
                  alt={press.name}
                  className="max-h-7 w-auto object-contain filter opacity-60 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-20 bg-[var(--color-surface-1)] border-b border-[var(--color-border-cool)] text-left">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-0)]">
              No more planning around <br className="hidden sm:inline" />
              your house help.
            </h2>
            <p className="mt-3 text-lg text-[var(--color-ink-4)] leading-relaxed">
              HomeEase formalizes and simplifies domestic services with a structured app-based workflow, ensuring professional standard results every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-7 rounded-2xl border border-[var(--color-border-cool)] shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-pronto-green)]/10 text-[var(--color-pronto-green-ink)] flex items-center justify-center mb-6 font-bold text-xl">
                ✓
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink-0)] mb-3">On-time, every time</h3>
              <p className="text-sm text-[var(--color-ink-4)] leading-relaxed">
                Our background-verified Pros are trained specifically for punctuality. If a Pro is delayed, the app notifies you immediately.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[var(--color-border-cool)] shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-pronto-green)]/10 text-[var(--color-pronto-green-ink)] flex items-center justify-center mb-6 font-bold text-xl">
                ₹
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink-0)] mb-3">Upfront pricing</h3>
              <p className="text-sm text-[var(--color-ink-4)] leading-relaxed">
                No hidden costs or awkward salary negotiations. You see transparent visit-based pricing calculated directly inside the app.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[var(--color-border-cool)] shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-pronto-green)]/10 text-[var(--color-pronto-green-ink)] flex items-center justify-center mb-6 font-bold text-xl">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink-0)] mb-3">Instant Booking</h3>
              <p className="text-sm text-[var(--color-ink-4)] leading-relaxed">
                Need immediate help? Book instant service and a verified HomeEase Pro will arrive at your doorstep in under 15 minutes.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[var(--color-border-cool)] shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-pronto-green)]/10 text-[var(--color-pronto-green-ink)] flex items-center justify-center mb-6 font-bold text-xl">
                ↻
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink-0)] mb-3">Zero No-show Risk</h3>
              <p className="text-sm text-[var(--color-ink-4)] leading-relaxed">
                If your assigned Pro falls sick or is unavailable, the app automatically routes and assigns another trained Pro in the area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services" className="py-24 text-left">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-0)]">
              Book trusted house help.
            </h2>
            <p className="mt-3 text-lg text-[var(--color-ink-4)] leading-relaxed">
              From hourly bookings to express cleans to daily upkeep, HomeEase’s got you covered. 20 services, transparent pricing, and instant booking.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {services.map((srv) => (
              <Link
                key={srv.slug}
                to={`/services/${srv.slug}`}
                className="group p-5 bg-white border border-[var(--color-border-cool)] rounded-2xl flex flex-col items-center text-center hover:border-[var(--color-pronto-green)] hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-14 h-14 bg-[var(--color-surface-3)] rounded-xl flex items-center justify-center overflow-hidden mb-4 p-1 group-hover:bg-[var(--color-surface-1)] transition-colors">
                  <img
                    src={`/icons/${srv.slug}.webp`}
                    alt=""
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = '/icons/hourly-bookings.webp';
                    }}
                  />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-ink-0)] leading-snug truncate w-full">
                  {srv.title}
                </h3>
                <p className="text-[12px] text-[var(--color-ink-4)] mt-1.5 line-clamp-2 leading-relaxed">
                  {srv.description || "Book a trained Pro in minutes."}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-surface-1)] hover:bg-[var(--color-surface-3)] text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green-ink)] font-bold text-[14px] rounded-full border border-[var(--color-border-cool)] transition-all duration-150"
            >
              View all 20 services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-[var(--color-ink-0)] text-white text-left">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Simple steps to a cleaner home.
            </h2>
            <p className="mt-3 text-lg text-white/60">
              Follow these simple steps to get trained house help in 15 minutes.
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
            {/* Step Controls */}
            <div className="flex flex-col gap-6">
              {steps.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setActiveStep(st.id)}
                  className={`p-6 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                    activeStep === st.id
                      ? 'bg-white/10 border-white/20 shadow-lg scale-[1.02]'
                      : 'bg-transparent border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      activeStep === st.id ? 'bg-[var(--color-pronto-green)] text-white' : 'bg-white/20 text-white'
                    }`}>
                      {st.id}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{st.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed">{st.desc}</p>
                      
                      {/* Sub-images indicator tabs inside step details (for step 1 and 3) */}
                      {st.subImages && activeStep === st.id && (
                        <div className="mt-4 flex gap-2">
                          {st.subImages.map((_, subIdx) => (
                            <button
                              key={subIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubImageClick(st.id, subIdx);
                              }}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                (activeSubImageIndex[st.id] || 0) === subIdx
                                  ? 'bg-[var(--color-pronto-green)] border-[var(--color-pronto-green)] text-white'
                                  : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/15'
                              }`}
                            >
                              Screen {String.fromCharCode(65 + subIdx)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step Image Visual Device */}
            <div className="relative flex justify-center bg-white/5 rounded-3xl p-8 border border-white/10 max-w-sm sm:max-w-md mx-auto w-full">
              <div
                className="absolute inset-0 bg-radial-gradient from-[var(--color-pronto-green)]/20 to-transparent blur-3xl opacity-50 pointer-events-none"
                aria-hidden="true"
              ></div>
              <div className="w-full relative overflow-hidden rounded-xl shadow-2xl" style={{ aspectRatio: '340 / 580' }}>
                <img
                  src={getStepImage(steps[activeStep - 1])}
                  alt={`HomeEase App Mockup Step ${activeStep}`}
                  className="w-full h-full object-cover animate-fade-in duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white text-left overflow-hidden border-b border-[var(--color-border-cool)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8 mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-ink-0)]">
            Loved by HomeEase homes.
          </h2>
          <p className="mt-3 text-lg text-[var(--color-ink-4)]">
            Real reviews from real homes across India. We maintain a 99%+ service satisfaction rate.
          </p>
        </div>

        {/* Scrolling testimonial cards */}
        <div className="marquee">
          <div className="marquee-track flex animate-[marquee-left_45s_linear_infinite] whitespace-nowrap">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="shrink-0 w-[320px] md:w-[360px] bg-[var(--color-surface-1)] border border-[var(--color-border-cool)] p-6 md:p-8 rounded-2xl shadow-sm whitespace-normal text-left flex flex-col justify-between mx-3"
              >
                <p className="text-sm md:text-base text-[var(--color-ink-2)] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-pronto-green)]/15 text-[var(--color-pronto-green-ink)] font-bold flex items-center justify-center">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-ink-0)]">{t.author}</h4>
                    <p className="text-xs text-[var(--color-ink-4)]">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-24 bg-[var(--color-surface-1)] border-b border-[var(--color-border-cool)] text-left">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-ink-0)]">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-lg text-[var(--color-ink-4)]">
              Got questions about HomeEase? Find answers to commonly asked questions below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[var(--color-border-cool)] rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-[var(--color-ink-0)] hover:text-[var(--color-pronto-green-ink)] transition-colors"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[var(--color-pronto-green)]' : 'text-[var(--color-ink-4)]'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm md:text-[15px] text-[var(--color-ink-4)] leading-relaxed border-t border-[var(--color-border-cool)] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/frequently-asked-questions"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-pronto-green-ink)] hover:underline"
            >
              View all FAQs on a single page
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[var(--color-pronto-green)]/10 blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[var(--color-pronto-green)]/10 blur-3xl -bottom-20 -right-20"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-5">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-ink-0)] leading-tight">
            Get trusted house help <br className="sm:hidden" /> in minutes.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--color-ink-4)] max-w-xl mx-auto leading-relaxed">
            Download the HomeEase app and book your first service today.
          </p>

          <div className="mt-8 flex justify-center gap-4 items-center">
            <a
              href="https://pronto.onelink.me/xj5m/install?pid=withpronto.com&c=closing-home"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <img src="/brand/badge-google-play.svg" alt="Google Play" className="h-12 md:h-14 w-auto shadow-sm rounded-lg" />
              <img src="/brand/badge-app-store.svg" alt="App Store" className="h-12 md:h-14 w-auto shadow-sm rounded-lg" />
            </a>
          </div>

          <div className="mt-12 flex justify-center max-w-sm mx-auto rounded-3xl overflow-hidden shadow-md border border-[var(--color-border-cool)]">
            <img
              src="/brand/cta_clean_room.png"
              alt="HomeEase Clean Room Visual"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
