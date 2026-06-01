import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TABS = ['overview', 'bookings', 'profile'];

const statusColors = {
  pending: { bg: 'rgba(234,179,8,0.15)', color: '#fbbf24', dot: '#f59e0b' },
  confirmed: { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa', dot: '#3b82f6' },
  'in-progress': { bg: 'rgba(139,92,246,0.15)', color: '#a78bfa', dot: '#8b5cf6' },
  completed: { bg: 'rgba(34,197,94,0.15)', color: '#4ade80', dot: '#22c55e' },
  cancelled: { bg: 'rgba(239,68,68,0.15)', color: '#f87171', dot: '#ef4444' },
};

const UserDashboard = () => {
  const { user, logout, checkAuth } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [dashData, setDashData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', address: '', avatar: '' });
  const [profileMsg, setProfileMsg] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/user/dashboard`, { credentials: 'include' });
      if (!res.ok) { navigate('/login'); return; }
      const data = await res.json();
      setDashData(data);
      setBookings(data.recentBookings || []);
    } catch {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/user/bookings`, { credentials: 'include' });
    const data = await res.json();
    if (data.success) setBookings(data.bookings);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'bookings') fetchBookings();
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/user/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (data.success) {
        setProfileMsg('✅ Profile updated!');
        await checkAuth();
      } else {
        setProfileMsg('❌ ' + data.message);
      }
    } catch {
      setProfileMsg('❌ Update failed.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingAvatar(true);
    setProfileMsg('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setProfileForm(prev => ({ ...prev, avatar: data.url }));
        setProfileMsg('✅ Avatar uploaded. Click Save to keep changes.');
      } else {
        setProfileMsg('❌ Upload failed: ' + data.message);
      }
    } catch {
      setProfileMsg('❌ Upload failed.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e' }}>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(139,92,246,0.2)', borderTopColor: '#8b5cf6', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          Loading dashboard...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const stats = dashData?.stats || { total: 0, pending: 0, completed: 0, cancelled: 0 };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          {/* Avatar */}
          <div style={styles.avatarWrap}>
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} style={styles.avatar} />
            ) : (
              <div style={styles.avatarInitials}>{getInitials(user?.name)}</div>
            )}
            <div style={styles.onlineDot} />
          </div>
          <div style={styles.userName}>{user?.name}</div>
          <div style={styles.userEmail}>{user?.email}</div>
          {user?.role === 'admin' && (
            <span style={styles.adminBadge}>👑 Admin</span>
          )}
        </div>

        <nav style={styles.nav}>
          {[
            { id: 'overview', icon: '📊', label: 'Overview' },
            { id: 'bookings', icon: '📋', label: 'My Bookings' },
            { id: 'profile', icon: '👤', label: 'Profile Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id ? styles.navItemActive : {}),
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}

          {user?.role === 'admin' && (
            <button onClick={() => navigate('/admin')} style={styles.navItem}>
              <span style={styles.navIcon}>🛡️</span>
              Admin Panel
            </button>
          )}
        </nav>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          <span>🚪</span> Sign Out
        </button>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        <div style={styles.mainInner}>

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && (
            <div>
              <div style={styles.pageHeader}>
                <h1 style={styles.pageTitle}>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
                <p style={styles.pageSubtitle}>Here's a summary of your activity</p>
              </div>

              {/* Stats grid */}
              <div style={styles.statsGrid}>
                {[
                  { label: 'Total Bookings', value: stats.total, icon: '📦', color: '#6366f1' },
                  { label: 'Pending', value: stats.pending, icon: '⏳', color: '#f59e0b' },
                  { label: 'Completed', value: stats.completed, icon: '✅', color: '#22c55e' },
                  { label: 'Cancelled', value: stats.cancelled, icon: '❌', color: '#ef4444' },
                ].map((s, i) => (
                  <div key={i} style={{ ...styles.statCard, '--accent': s.color }}>
                    <div style={{ ...styles.statIcon, background: `${s.color}20`, color: s.color }}>{s.icon}</div>
                    <div style={styles.statValue}>{s.value}</div>
                    <div style={styles.statLabel}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent bookings */}
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Recent Bookings</h2>
                {bookings.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>No bookings yet</p>
                    <button onClick={() => navigate('/services')} style={styles.ctaBtn}>
                      Browse Services
                    </button>
                  </div>
                ) : (
                  <div style={styles.bookingList}>
                    {bookings.slice(0, 5).map(b => (
                      <BookingCard key={b._id} booking={b} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── BOOKINGS TAB ── */}
          {activeTab === 'bookings' && (
            <div>
              <div style={styles.pageHeader}>
                <h1 style={styles.pageTitle}>My Bookings</h1>
                <p style={styles.pageSubtitle}>All your service bookings in one place</p>
              </div>
              {bookings.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>You have no bookings yet</p>
                  <button onClick={() => navigate('/services')} style={styles.ctaBtn}>Book a Service</button>
                </div>
              ) : (
                <div style={styles.bookingList}>
                  {bookings.map(b => <BookingCard key={b._id} booking={b} />)}
                </div>
              )}
            </div>
          )}

          {/* ── PROFILE TAB ── */}
          {activeTab === 'profile' && (
            <div>
              <div style={styles.pageHeader}>
                <h1 style={styles.pageTitle}>Profile Settings</h1>
                <p style={styles.pageSubtitle}>Manage your personal information</p>
              </div>

              <div style={styles.profileCard}>
                <form onSubmit={handleProfileSave}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Profile Picture</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {profileForm.avatar ? (
                        <img src={profileForm.avatar} alt="Avatar Preview" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(139,92,246,0.4)' }} />
                      ) : (
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '2px dashed rgba(255,255,255,0.2)' }}>
                          📷
                        </div>
                      )}
                      <div>
                        <label style={{ ...styles.saveBtn, padding: '0.5rem 1rem', fontSize: '0.8rem', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#f1f5f9', boxShadow: 'none' }}>
                          {uploadingAvatar ? '⏳ Uploading...' : 'Upload Image'}
                          <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} disabled={uploadingAvatar} />
                        </label>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: 6 }}>Max size 5MB (JPG, PNG, WEBP)</div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.formGrid}>
                    {[
                      { label: 'Full Name', key: 'name', icon: '👤', type: 'text', placeholder: 'Your full name' },
                      { label: 'Phone', key: 'phone', icon: '📱', type: 'tel', placeholder: '+1 234 567 8900' },
                    ].map(field => (
                      <div key={field.key} style={styles.formGroup}>
                        <label style={styles.formLabel}>{field.label}</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem' }}>
                            {field.icon}
                          </span>
                          <input
                            type={field.type}
                            value={profileForm[field.key]}
                            onChange={e => setProfileForm({ ...profileForm, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            style={styles.formInput}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Address</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '1rem', top: '1rem', fontSize: '0.9rem' }}>📍</span>
                      <textarea
                        value={profileForm.address}
                        onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Your address"
                        rows={3}
                        style={{ ...styles.formInput, paddingTop: '0.85rem', resize: 'vertical', height: 'auto' }}
                      />
                    </div>
                  </div>

                  {profileMsg && (
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 10,
                      marginBottom: '1rem',
                      background: profileMsg.startsWith('✅') ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      border: `1px solid ${profileMsg.startsWith('✅') ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                      color: profileMsg.startsWith('✅') ? '#4ade80' : '#f87171',
                      fontSize: '0.875rem',
                    }}>
                      {profileMsg}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" style={styles.saveBtn} disabled={savingProfile}>
                      {savingProfile ? '⏳ Saving...' : '💾 Save Changes'}
                    </button>
                  </div>
                </form>

                <div style={styles.divider} />
                <div style={styles.accountInfo}>
                  <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>Account Info</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={styles.infoChip}>✉️ {user?.email}</div>
                    <div style={styles.infoChip}>🎭 {user?.role === 'admin' ? 'Administrator' : 'User'}</div>
                    <div style={styles.infoChip}>
                      📅 Joined {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{dashStyles}</style>
    </div>
  );
};

// Booking Card Component
const BookingCard = ({ booking }) => {
  const sc = statusColors[booking.status] || statusColors.pending;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: '1.25rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap',
      transition: 'all 0.2s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
          🔧
        </div>
        <div>
          <div style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 2 }}>{booking.service}</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            📍 {booking.city} · 📅 {new Date(booking.scheduledDate).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <span style={{ background: sc.bg, color: sc.color, padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
        <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.9rem' }}>₹{booking.amount?.toLocaleString()}</span>
      </div>
    </div>
  );
};

const styles = {
  page: { display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  sidebar: { width: 260, background: 'rgba(255,255,255,0.03)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '2rem 1rem', gap: '0.5rem', flexShrink: 0 },
  sidebarTop: { textAlign: 'center', padding: '1rem 0 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '1rem' },
  avatarWrap: { position: 'relative', width: 72, height: 72, margin: '0 auto 1rem' },
  avatar: { width: 72, height: 72, borderRadius: '50%', border: '2px solid rgba(139,92,246,0.4)', objectFit: 'cover' },
  avatarInitials: { width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: 'white', border: '2px solid rgba(139,92,246,0.4)' },
  onlineDot: { position: 'absolute', bottom: 4, right: 4, width: 12, height: 12, borderRadius: '50%', background: '#22c55e', border: '2px solid #0a0f1e' },
  userName: { color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', marginBottom: 4 },
  userEmail: { color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', wordBreak: 'break-all' },
  adminBadge: { display: 'inline-block', marginTop: '0.5rem', padding: '2px 10px', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 20, color: '#fbbf24', fontSize: '0.75rem', fontWeight: 600 },
  nav: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  navItem: { width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 12, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease', textAlign: 'left' },
  navItemActive: { background: 'rgba(99,102,241,0.15)', color: '#a78bfa', borderLeft: '3px solid #8b5cf6' },
  navIcon: { fontSize: '1.1rem', width: '1.5rem', textAlign: 'center' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 12, border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.05)', color: '#f87171', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease', marginTop: '1rem' },
  main: { flex: 1, overflow: 'auto' },
  mainInner: { maxWidth: 900, margin: '0 auto', padding: '2.5rem 2rem' },
  pageHeader: { marginBottom: '2rem' },
  pageTitle: { fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '-0.5px' },
  pageSubtitle: { color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', margin: '0.4rem 0 0' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' },
  statCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.5rem', textAlign: 'center', transition: 'all 0.2s ease' },
  statIcon: { width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', margin: '0 auto 0.75rem' },
  statValue: { fontSize: '2rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 },
  statLabel: { color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '0.4rem' },
  section: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '1.5rem' },
  sectionTitle: { color: '#f1f5f9', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' },
  bookingList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  emptyState: { textAlign: 'center', padding: '3rem 1rem' },
  ctaBtn: { padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: 12, color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit' },
  profileCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '2rem' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' },
  formLabel: { color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: 500 },
  formInput: { width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f1f5f9', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s' },
  saveBtn: { padding: '0.85rem 1.75rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: 12, color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' },
  divider: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '1.5rem 0' },
  accountInfo: {},
  infoChip: { padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' },
};

const dashStyles = `
  @media (max-width: 768px) {
    .dash-sidebar { display: none; }
  }
`;

export default UserDashboard;
