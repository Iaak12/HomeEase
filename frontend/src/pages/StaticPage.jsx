import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import siteData from '../site_data.json';

const StaticPage = () => {
  const location = useLocation();
  
  // Resolve page type from current pathname
  const path = location.pathname.replace(/^\/|\/$/g, ''); // strip leading/trailing slashes
  
  // Scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // Handle FAQ Hub Page separately
  if (path === 'frequently-asked-questions') {
    return (
      <div className="w-full bg-[var(--color-surface-1)] min-h-screen text-left py-16">
        <div className="mx-auto max-w-4xl px-5">
          <div className="mb-8">
            <Link to="/" className="text-sm font-semibold text-[var(--color-pronto-green-ink)] hover:underline">
              ← Go back home
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-ink-0)] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[var(--color-ink-4)] mb-12">
            Detailed answers and information regarding HomeEase's household service policies, bookings, and customer guidelines.
          </p>

          <div className="flex flex-col gap-6">
            {siteData.faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-border-cool)] shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-[var(--color-ink-0)] mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm md:text-[15px] text-[var(--color-ink-4)] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle other policies/text pages
  const policyData = siteData.policies[path];

  if (!policyData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-left py-20 px-5 bg-[var(--color-surface-1)]">
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-[var(--color-ink-4)] mb-6">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-secondary">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--color-surface-1)] min-h-screen text-left py-16">
      <div className="mx-auto max-w-4xl px-5">
        {/* Back Link */}
        <div className="mb-8">
          <Link to="/" className="text-sm font-semibold text-[var(--color-pronto-green-ink)] hover:underline">
            ← Go back home
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white p-6 md:p-12 rounded-3xl border border-[var(--color-border-cool)] shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-ink-0)] border-b border-[var(--color-border-cool)] pb-6 mb-8">
            {policyData.title}
          </h1>

          <div className="flex flex-col gap-8">
            {policyData.sections.map((section, secIdx) => {
              // If the heading is the title, skip duplicating it
              const isPageTitle = section.heading.toLowerCase() === policyData.title.toLowerCase();
              return (
                <div key={secIdx} className="text-left">
                  {section.heading && !isPageTitle && (
                    <h2 className="text-xl font-bold text-[var(--color-ink-0)] mb-4">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs && section.paragraphs.length > 0 && (
                    <div className="flex flex-col gap-4 text-sm md:text-[15px] text-[var(--color-ink-4)] leading-relaxed">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </div>
  );
};

export default StaticPage;
