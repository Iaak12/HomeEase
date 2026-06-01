import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import siteData from '../site_data.json';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const dropRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setUserDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    setUserDropOpen(false);
    await logout();
    navigate('/');
  };

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  const handleHashClick = (e, hash) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const services = Object.values(siteData.services);
  const cities = Object.values(siteData.cities);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--color-border-cool)]">
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" aria-label="HomeEase home">
          <span className="text-[25px] font-extrabold tracking-tight text-[var(--color-pronto-green)]" style={{ fontFamily: 'var(--font-lexend)' }}>
            HomeEase
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 h-full">
          <a
            className="text-[15px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)] transition-colors cursor-pointer"
            href="#why-us"
            onClick={(e) => handleHashClick(e, '#why-us')}
          >
            Why us
          </a>

          {/* Services Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)] transition-colors h-[72px]"
            >
              Services
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-2 pointer-events-none group-hover:pointer-events-auto">
              <div className="w-[640px] bg-white rounded-2xl shadow-2xl border border-[var(--color-border-cool)] p-4">
                <div className="grid grid-cols-2 gap-1">
                  {services.map((srv) => (
                    <Link
                      key={srv.slug}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-surface-1)] transition-colors"
                      to={`/services/${srv.slug}`}
                    >
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--color-surface-3)] overflow-hidden flex items-center justify-center">
                        <img
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-contain"
                          src={`/icons/${srv.slug}.webp`}
                          onError={(e) => {
                            // Fallback in case icon is missing
                            e.target.src = '/icons/hourly-bookings.webp';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--color-ink-0)] truncate">
                          {srv.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  className="mt-3 block px-3 py-2 text-sm font-semibold text-[var(--color-pronto-green)] hover:bg-[var(--color-surface-1)] rounded-lg transition-colors border-t border-[var(--color-border-cool)] pt-3 text-left"
                  to="/services"
                >
                  View all services →
                </Link>
              </div>
            </div>
          </div>

          {/* Cities Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)] transition-colors h-[72px]"
            >
              Cities
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-2 pointer-events-none group-hover:pointer-events-auto">
              <div className="w-[420px] bg-white rounded-2xl shadow-2xl border border-[var(--color-border-cool)] p-4">
                <div className="grid grid-cols-3 gap-1">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--color-ink-2)] hover:bg-[var(--color-surface-1)] hover:text-[var(--color-pronto-green)] transition-colors text-left"
                      to={`/cities/${city.slug}`}
                    >
                      {city.title}
                    </Link>
                  ))}
                </div>
                <Link
                  className="mt-3 block px-3 py-2 text-sm font-semibold text-[var(--color-pronto-green)] hover:bg-[var(--color-surface-1)] rounded-lg transition-colors border-t border-[var(--color-border-cool)] pt-3 text-left"
                  to="/cities"
                >
                  View all cities →
                </Link>
              </div>
            </div>
          </div>

          <a
            className="text-[15px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)] transition-colors cursor-pointer"
            href="#how-it-works"
            onClick={(e) => handleHashClick(e, '#how-it-works')}
          >
            How it works
          </a>
          <a
            className="text-[15px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)] transition-colors cursor-pointer"
            href="#faqs"
            onClick={(e) => handleHashClick(e, '#faqs')}
          >
            FAQs
          </a>
        </nav>

        {/* Auth Buttons / User Avatar */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <div ref={dropRef} style={{ position: 'relative' }}>
              <button
                id="user-menu-btn"
                onClick={() => setUserDropOpen(!userDropOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px 6px 6px',
                  borderRadius: 40, border: '1.5px solid rgba(0,0,0,0.1)', background: 'white',
                  cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>
                    {getInitials(user?.name)}
                  </div>
                )}
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.name?.split(' ')[0]}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#64748b', transition: 'transform 0.2s', transform: userDropOpen ? 'rotate(180deg)' : 'none' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {userDropOpen && (
                <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '0.5rem', minWidth: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 100 }}>
                  <div style={{ padding: '0.75rem 1rem 0.5rem', borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: '0.25rem' }}>
                    <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem' }}>{user?.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
                  </div>
                  <Link to="/dashboard" onClick={() => setUserDropOpen(false)} style={dropItemStyle}>📊 My Dashboard</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setUserDropOpen(false)} style={{ ...dropItemStyle, color: '#7c3aed' }}>🛡️ Admin Panel</Link>}
                  <button onClick={handleLogout} style={{ ...dropItemStyle, width: '100%', textAlign: 'left', color: '#ef4444', border: 'none', background: 'none', fontFamily: 'inherit', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 4 }}>🚪 Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-[15px] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)] transition-colors">
                Sign In
              </Link>
              <Link
                to="/signup"
                style={{ padding: '8px 20px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', borderRadius: 40, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(99,102,241,0.3)' }}
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] text-[var(--color-ink-0)] hover:bg-[var(--color-surface-1)] transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-[300px] h-full bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center shrink-0">
                  <span className="text-[22px] font-extrabold tracking-tight text-[var(--color-pronto-green)]" style={{ fontFamily: 'var(--font-lexend)' }}>
                    HomeEase
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-[var(--radius-md)] text-[var(--color-ink-0)] hover:bg-[var(--color-surface-1)] flex items-center justify-center"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-5 text-left">
                <a
                  className="text-base font-semibold text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)]"
                  href="#why-us"
                  onClick={(e) => handleHashClick(e, '#why-us')}
                >
                  Why us
                </a>
                <Link
                  className="text-base font-semibold text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)]"
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  className="text-base font-semibold text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)]"
                  to="/cities"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cities
                </Link>
                <a
                  className="text-base font-semibold text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)]"
                  href="#how-it-works"
                  onClick={(e) => handleHashClick(e, '#how-it-works')}
                >
                  How it works
                </a>
                <a
                  className="text-base font-semibold text-[var(--color-ink-2)] hover:text-[var(--color-pronto-green)]"
                  href="#faqs"
                  onClick={(e) => handleHashClick(e, '#faqs')}
                >
                  FAQs
                </a>
              </div>
            </div>

            <div className="border-t border-[var(--color-border-cool)] pt-6 mt-6 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full inline-flex items-center justify-center py-3 bg-[var(--color-pronto-green)] hover:bg-[var(--color-pronto-green-hover)] text-white font-bold rounded-full transition-colors text-center text-sm">My Dashboard</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full inline-flex items-center justify-center py-2.5 border border-purple-400 text-purple-600 font-semibold rounded-full text-sm text-center">Admin Panel</Link>}
                  <button onClick={handleLogout} className="w-full inline-flex items-center justify-center py-2.5 border border-red-300 text-red-500 font-semibold rounded-full text-sm">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full inline-flex items-center justify-center py-3 bg-[var(--color-pronto-green)] hover:bg-[var(--color-pronto-green-hover)] text-white font-bold rounded-full transition-colors text-center text-sm">Get Started</Link>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full inline-flex items-center justify-center py-2.5 border border-[var(--color-border-cool)] text-[var(--color-ink-2)] font-semibold rounded-full text-sm text-center">Sign In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const dropItemStyle = {
  display: 'block', padding: '0.6rem 1rem', borderRadius: 10, color: '#374151',
  textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
  transition: 'background 0.15s',
};

export default Header;
