import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────
// Admin Panel — has its OWN password gate, no backend auth needed.
// Change this password to whatever you want.
// ─────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'homeease@admin2024';
const SESSION_KEY = 'homeease_admin_session';

const statusColors = {
  pending:     { bg: 'rgba(234,179,8,0.15)',  color: '#fbbf24' },
  confirmed:   { bg: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  'in-progress':{ bg: 'rgba(139,92,246,0.15)', color: '#a78bfa' },
  completed:   { bg: 'rgba(34,197,94,0.15)',  color: '#4ade80' },
  cancelled:   { bg: 'rgba(239,68,68,0.15)',  color: '#f87171' },
};

// ── Password Gate ─────────────────────────────────────────────
const AdminLogin = ({ onSuccess }) => {
  const [pwd, setPwd] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      onSuccess();
    } else {
      setError('Incorrect admin password. Try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={AL.page}>
      <div style={AL.bg}>
        <div style={{ ...AL.orb, width:500,height:500, background:'radial-gradient(circle,#6366f1,transparent)', top:-100, left:-100 }} />
        <div style={{ ...AL.orb, width:400,height:400, background:'radial-gradient(circle,#8b5cf6,transparent)', bottom:-80, right:-80 }} />
      </div>

      <div style={AL.container}>
        {/* Shield icon */}
        <div style={AL.iconWrap}>
          <div style={AL.shieldIcon}>🛡️</div>
          <div style={AL.glow} />
        </div>

        <h1 style={AL.title}>Admin Access</h1>
        <p style={AL.subtitle}>HomeEase Owner Portal — Restricted Area</p>

        <div style={{ ...AL.card, animation: shake ? 'shake 0.4s ease' : 'none' }}>
          {error && (
            <div style={AL.error}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={AL.label}>Admin Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>🔑</span>
                <input
                  id="admin-password-input"
                  type={show ? 'text' : 'password'}
                  value={pwd}
                  onChange={e => { setPwd(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  autoFocus
                  style={AL.input}
                />
                <button type="button" onClick={() => setShow(!show)} style={AL.eyeBtn}>
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button id="admin-login-submit" type="submit" style={AL.btn}>
              🛡️ Enter Admin Panel
            </button>
          </form>

          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem', textAlign: 'center', marginTop: '1.25rem' }}>
            This panel is for authorized personnel only.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-10px)}
          40%{transform:translateX(10px)}
          60%{transform:translateX(-8px)}
          80%{transform:translateX(8px)}
        }
        @keyframes pulse {
          0%,100%{opacity:0.15;transform:scale(1)}
          50%{opacity:0.25;transform:scale(1.05)}
        }
      `}</style>
    </div>
  );
};

const AL = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0f1e', position: 'relative', overflow: 'hidden', padding: '2rem 1rem', fontFamily: "'Inter','Segoe UI',sans-serif" },
  bg: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  orb: { position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 6s ease-in-out infinite' },
  container: { width: '100%', maxWidth: 420, position: 'relative', zIndex: 1, textAlign: 'center' },
  iconWrap: { position: 'relative', display: 'inline-block', marginBottom: '1.5rem' },
  shieldIcon: { fontSize: '4rem', filter: 'drop-shadow(0 0 24px rgba(139,92,246,0.7))', display: 'block' },
  glow: { position: 'absolute', inset: -20, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.2),transparent)', filter: 'blur(16px)' },
  title: { fontSize: '2rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.5rem', letterSpacing: '-0.5px' },
  subtitle: { color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '2rem' },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2rem', backdropFilter: 'blur(20px)', boxShadow: '0 25px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(139,92,246,0.1)' },
  error: { display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, color: '#fca5a5', fontSize: '0.875rem', marginBottom: '0.5rem' },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: 500, textAlign: 'left' },
  input: { width: '100%', padding: '0.85rem 3rem 0.85rem 2.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f1f5f9', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none', transition: 'all 0.2s' },
  eyeBtn: { position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'rgba(255,255,255,0.4)', padding: 0 },
  btn: { width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 12, color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(99,102,241,0.4)', transition: 'all 0.2s', letterSpacing: '0.3px' },
};

// ── Main Admin Panel ──────────────────────────────────────────
const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  );

  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState('');
  const [backendOnline, setBackendOnline] = useState(null);

  // Check backend connectivity
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/health`)
      .then(r => r.ok ? r.json() : null)
      .then(d => setBackendOnline(!!d?.status))
      .catch(() => setBackendOnline(false));
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const apiFetch = async (url, opts = {}) => {
    const fullUrl = url.startsWith('/api') ? `${import.meta.env.VITE_API_URL || ''}${url}` : url;
    const res = await fetch(fullUrl, { credentials: 'include', ...opts });
    return res.json();
  };

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/api/admin/stats');
      if (data.success) setStats(data.stats);
      else setStats(getMockStats());
    } catch { setStats(getMockStats()); }
    finally { setLoading(false); }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 50 });
      if (search) params.set('search', search);
      const data = await apiFetch(`/api/admin/users?${params}`);
      if (data.success) setUsers(data.users);
      else setUsers([]);
    } catch { setUsers([]); }
    finally { setLoading(false); }
  }, [search]);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 50 });
      if (statusFilter) params.set('status', statusFilter);
      const data = await apiFetch(`/api/admin/bookings?${params}`);
      if (data.success) setBookings(data.bookings);
      else setBookings([]);
    } catch { setBookings([]); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === 'dashboard') fetchStats();
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'bookings') fetchBookings();
  }, [activeTab, isAuthenticated, fetchStats, fetchUsers, fetchBookings]);

  const handleRoleChange = async (userId, newRole) => {
    const data = await apiFetch(`/api/admin/users/${userId}/role`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    if (data.success) { showToast(`✅ Role updated to ${newRole}`); fetchUsers(); }
    else showToast(`❌ ${data.message}`);
  };

  const handleToggleStatus = async (userId) => {
    const data = await apiFetch(`/api/admin/users/${userId}/toggle-status`, { method: 'PUT' });
    if (data.success) { showToast(`✅ ${data.message}`); fetchUsers(); }
    else showToast(`❌ ${data.message}`);
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Delete user "${userName}"? This cannot be undone.`)) return;
    const data = await apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    if (data.success) { showToast('✅ User deleted'); fetchUsers(); }
    else showToast(`❌ ${data.message}`);
  };

  const handleBookingStatus = async (bookingId, status) => {
    const data = await apiFetch(`/api/admin/bookings/${bookingId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (data.success) { showToast('✅ Booking status updated'); fetchBookings(); }
    else showToast(`❌ ${data.message}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={S.page}>
      {toast && <div style={S.toast}>{toast}</div>}

      {/* Backend status banner */}
      {backendOnline === false && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999, background: 'rgba(234,179,8,0.15)', borderBottom: '1px solid rgba(234,179,8,0.3)', padding: '0.5rem 1rem', textAlign: 'center', color: '#fbbf24', fontSize: '0.8rem', fontFamily: 'inherit' }}>
          ⚠️ Backend API offline — connect MongoDB to see live data. Running on: <strong>http://localhost:5000</strong>
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ ...S.sidebar, marginTop: backendOnline === false ? 40 : 0 }}>
        <div style={S.brand}>
          <span style={{ fontSize: '1.5rem' }}>🏠</span>
          <div>
            <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem' }}>HomeEase</div>
            <div style={{ color: '#8b5cf6', fontSize: '0.7rem', fontWeight: 600, letterSpacing: 1 }}>ADMIN PANEL</div>
          </div>
        </div>

        <div style={S.adminInfo}>
          <div style={S.adminAvatar}>👑</div>
          <div>
            <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.875rem' }}>Owner</div>
            <div style={{ color: '#fbbf24', fontSize: '0.7rem', fontWeight: 600 }}>Super Admin</div>
          </div>
        </div>

        {/* Backend status dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.875rem', borderRadius: 8, background: backendOnline ? 'rgba(34,197,94,0.08)' : 'rgba(234,179,8,0.08)', border: `1px solid ${backendOnline ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)'}` }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: backendOnline ? '#22c55e' : '#f59e0b', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ color: backendOnline ? '#4ade80' : '#fbbf24', fontSize: '0.75rem', fontWeight: 500 }}>
            API {backendOnline ? 'Online' : backendOnline === null ? 'Checking...' : 'Offline'}
          </span>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {[
            { id: 'dashboard', icon: '📊', label: 'Dashboard' },
            { id: 'users', icon: '👥', label: 'Users' },
            { id: 'bookings', icon: '📋', label: 'Bookings' },
            { id: 'services', icon: '🔧', label: 'Services' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ ...S.navItem, ...(activeTab === item.id ? S.navActive : {}) }}
            >
              <span style={{ fontSize: '1.1rem', width: '1.5rem', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button onClick={() => navigate('/')} style={S.navItem}>
            <span style={{ fontSize: '1.1rem', width: '1.5rem', textAlign: 'center' }}>🏠</span>
            View Site
          </button>
        </nav>

        <button onClick={handleLogout} style={S.logoutBtn}>
          <span>🔒</span> Lock Panel
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ ...S.main, marginTop: backendOnline === false ? 40 : 0 }}>
        <div style={S.mainInner}>

          {/* ── DASHBOARD ── */}
          {activeTab === 'dashboard' && (
            <DashboardTab stats={stats} loading={loading} backendOnline={backendOnline} />
          )}

          {/* ── USERS ── */}
          {activeTab === 'users' && (
            <UsersTab
              users={users} loading={loading} search={search} setSearch={setSearch}
              onRoleChange={handleRoleChange} onToggle={handleToggleStatus} onDelete={handleDeleteUser}
              backendOnline={backendOnline}
            />
          )}

          {/* ── BOOKINGS ── */}
          {activeTab === 'bookings' && (
            <BookingsTab
              bookings={bookings} loading={loading}
              statusFilter={statusFilter} setStatusFilter={setStatusFilter}
              onStatusChange={handleBookingStatus} backendOnline={backendOnline}
            />
          )}

          {/* ── SERVICES ── */}
          {activeTab === 'services' && <ServicesTab />}
        </div>
      </main>
    </div>
  );
};

// ── Dashboard Tab ─────────────────────────────────────────────
const DashboardTab = ({ stats, loading, backendOnline }) => {
  const s = stats || getMockStats();
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={S.pageTitle}>Admin Dashboard</h1>
          <p style={S.pageSubtitle}>
            {backendOnline ? 'Live platform data' : '⚠️ Connect MongoDB to see real data — showing mock preview'}
          </p>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {loading ? <Spinner /> : (
        <>
          <div style={S.statsGrid}>
            {[
              { label: 'Total Users', value: s.users.total, icon: '👥', color: '#6366f1', sub: `+${s.users.newThisMonth} this month` },
              { label: 'Total Bookings', value: s.bookings.total, icon: '📦', color: '#8b5cf6', sub: `${s.bookings.pending} pending` },
              { label: 'Completed Jobs', value: s.bookings.completed, icon: '✅', color: '#22c55e', sub: 'Successful services' },
              { label: 'Revenue', value: `₹${(s.revenue || 0).toLocaleString()}`, icon: '💰', color: '#f59e0b', sub: 'Total paid amount' },
            ].map((item, i) => (
              <div key={i} style={S.statCard}>
                <div style={{ ...S.statIcon, background: `${item.color}20`, color: item.color }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f8fafc', fontSize: '1.75rem', fontWeight: 800, lineHeight: 1 }}>{item.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: 4 }}>{item.label}</div>
                  <div style={{ color: item.color, fontSize: '0.75rem', marginTop: 2, fontWeight: 500 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={S.infoGrid}>
            <div style={S.infoCard}>
              <h3 style={S.cardTitle}>📋 Booking Breakdown</h3>
              {[
                { label: 'Pending',   val: s.bookings.pending,   color: '#fbbf24', pct: s.bookings.total ? Math.round(s.bookings.pending/s.bookings.total*100) : 0 },
                { label: 'Completed', val: s.bookings.completed, color: '#4ade80', pct: s.bookings.total ? Math.round(s.bookings.completed/s.bookings.total*100) : 0 },
                { label: 'Cancelled', val: s.bookings.cancelled, color: '#f87171', pct: s.bookings.total ? Math.round(s.bookings.cancelled/s.bookings.total*100) : 0 },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>{item.label}</span>
                    <span style={{ color: item.color, fontWeight: 700 }}>{item.val} <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontSize: '0.75rem' }}>({item.pct}%)</span></span>
                  </div>
                  <div style={{ height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{ height: '100%', borderRadius: 6, background: item.color, width: `${item.pct}%`, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={S.infoCard}>
              <h3 style={S.cardTitle}>👥 User Stats</h3>
              {[
                { label: 'Total Registered Users', val: s.users.total,        color: '#60a5fa', icon: '👤' },
                { label: 'Admin Accounts',          val: s.users.admins,       color: '#fbbf24', icon: '👑' },
                { label: 'New This Month',           val: s.users.newThisMonth, color: '#4ade80', icon: '🆕' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{item.icon}</span> {item.label}
                  </span>
                  <span style={{ color: item.color, fontWeight: 700, fontSize: '1.1rem' }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ── Users Tab ─────────────────────────────────────────────────
const UsersTab = ({ users, loading, search, setSearch, onRoleChange, onToggle, onDelete, backendOnline }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
      <div>
        <h1 style={S.pageTitle}>User Management</h1>
        <p style={S.pageSubtitle}>{backendOnline ? `${users.length} registered users` : '⚠️ Backend offline — connect MongoDB'}</p>
      </div>
      <input
        type="search" placeholder="🔍 Search by name or email..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={S.searchInput}
      />
    </div>

    {loading ? <Spinner /> : (
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>{['User', 'Email', 'Role', 'Status', 'Joined', 'Last Login', 'Actions'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={S.tr}>
                <td style={S.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {u.avatar
                      ? <img src={u.avatar} alt={u.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                      : <div style={S.tableAvatar}>{u.name?.[0]?.toUpperCase()}</div>
                    }
                    <span style={{ color: '#f1f5f9', fontWeight: 500, fontSize: '0.875rem' }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ ...S.td, color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{u.email}</td>
                <td style={S.td}>
                  <select value={u.role} onChange={e => onRoleChange(u._id, e.target.value)} style={S.roleSelect}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={S.td}>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: u.isActive ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: u.isActive ? '#4ade80' : '#f87171' }}>
                    {u.isActive ? '● Active' : '● Inactive'}
                  </span>
                </td>
                <td style={{ ...S.td, color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td style={{ ...S.td, color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : '—'}</td>
                <td style={S.td}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => onToggle(u._id)} style={{ ...S.actionBtn, background: u.isActive ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', color: u.isActive ? '#f87171' : '#4ade80' }}>
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => onDelete(u._id, u.name)} style={{ ...S.actionBtn, background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>👥</div>
            <div style={{ fontSize: '0.9rem' }}>
              {backendOnline ? 'No users found' : 'Connect MongoDB to view registered users'}
            </div>
            {!backendOnline && (
              <div style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
                Set MONGO_URI in backend/.env → restart backend → users will appear here
              </div>
            )}
          </div>
        )}
      </div>
    )}
  </div>
);

// ── Bookings Tab ──────────────────────────────────────────────
const BookingsTab = ({ bookings, loading, statusFilter, setStatusFilter, onStatusChange, backendOnline }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
      <div>
        <h1 style={S.pageTitle}>Booking Management</h1>
        <p style={S.pageSubtitle}>{backendOnline ? `${bookings.length} bookings` : '⚠️ Backend offline'}</p>
      </div>
      <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={S.searchInput}>
        <option value="">All Statuses</option>
        {['pending','confirmed','in-progress','completed','cancelled'].map(s => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
    </div>
    {loading ? <Spinner /> : (
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>{['Customer', 'Service', 'City', 'Date', 'Amount', 'Status', 'Update'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {bookings.map(b => {
              const sc = statusColors[b.status] || statusColors.pending;
              return (
                <tr key={b._id} style={S.tr}>
                  <td style={S.td}>
                    <div style={{ color: '#f1f5f9', fontWeight: 500, fontSize: '0.875rem' }}>{b.user?.name || '—'}</div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{b.user?.email}</div>
                  </td>
                  <td style={{ ...S.td, color: '#a78bfa', fontSize: '0.875rem' }}>{b.service}</td>
                  <td style={{ ...S.td, color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>{b.city}</td>
                  <td style={{ ...S.td, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{new Date(b.scheduledDate).toLocaleDateString()}</td>
                  <td style={{ ...S.td, color: '#fbbf24', fontWeight: 700, fontSize: '0.875rem' }}>₹{b.amount?.toLocaleString()}</td>
                  <td style={S.td}>
                    <span style={{ ...sc, padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </td>
                  <td style={S.td}>
                    <select value={b.status} onChange={e => onStatusChange(b._id, e.target.value)} style={S.roleSelect}>
                      {['pending','confirmed','in-progress','completed','cancelled'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</div>
            <div>{backendOnline ? 'No bookings found' : 'Connect MongoDB to view bookings'}</div>
          </div>
        )}
      </div>
    )}
  </div>
);

// ── Services Tab (view-only from site_data) ───────────────────
const ServicesTab = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    import('../site_data.json').then(d => {
      setServices(Object.values(d.default?.services || {}));
    });
  }, []);

  return (
    <div>
      <h1 style={S.pageTitle}>Services Overview</h1>
      <p style={S.pageSubtitle}>{services.length} services available on HomeEase</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
        {services.map((srv, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>🔧</div>
            <div>
              <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.9rem' }}>{srv.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: 2 }}>{srv.slug}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(139,92,246,0.2)', borderTopColor: '#8b5cf6', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

// Mock data shown when backend is offline
const getMockStats = () => ({
  users: { total: 0, admins: 1, newThisMonth: 0 },
  bookings: { total: 0, pending: 0, completed: 0, cancelled: 0 },
  revenue: 0,
});

const S = {
  page: { display: 'flex', minHeight: '100vh', background: '#0a0f1e', fontFamily: "'Inter','Segoe UI',sans-serif" },
  sidebar: { width: 240, background: 'rgba(0,0,0,0.3)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', gap: '0.75rem', flexShrink: 0 },
  brand: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  adminInfo: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(139,92,246,0.08)', borderRadius: 12, border: '1px solid rgba(139,92,246,0.15)' },
  adminAvatar: { width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 },
  navItem: { width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.875rem', borderRadius: 10, border: 'none', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s', textAlign: 'left' },
  navActive: { background: 'rgba(99,102,241,0.15)', color: '#a78bfa' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.875rem', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: 'auto', transition: 'all 0.2s' },
  main: { flex: 1, overflow: 'auto' },
  mainInner: { maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem' },
  pageTitle: { fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', margin: 0, letterSpacing: '-0.5px' },
  pageSubtitle: { color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', margin: '0.3rem 0 0' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' },
  statCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' },
  statIcon: { width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' },
  infoCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '1.5rem' },
  cardTitle: { color: '#f1f5f9', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem', margin: '0 0 1.25rem' },
  searchInput: { padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#f1f5f9', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', minWidth: 240 },
  tableWrap: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '0.875rem 1rem', textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)', whiteSpace: 'nowrap' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
  td: { padding: '1rem', color: '#e2e8f0', verticalAlign: 'middle' },
  tableAvatar: { width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 },
  roleSelect: { padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#f1f5f9', fontSize: '0.8rem', fontFamily: 'inherit', cursor: 'pointer', outline: 'none' },
  actionBtn: { padding: '0.35rem 0.75rem', border: 'none', borderRadius: 8, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' },
  toast: { position: 'fixed', top: '1.5rem', right: '1.5rem', padding: '0.75rem 1.5rem', background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#f1f5f9', fontSize: '0.875rem', fontWeight: 500, zIndex: 9999, backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' },
};

export default AdminPanel;
