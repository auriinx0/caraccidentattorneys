'use client';

import React, { useState, useEffect } from 'react';

// ── Icons (inline SVGs to avoid extra deps) ─────────────────────────
const IconLock = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const IconSettings = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconChart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
);
const IconGlobe = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
);
const IconLogOut = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
);
const IconSave = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" /><path d="M7 3v4a1 1 0 0 0 1 1h7" /></svg>
);

// ── Styles ───────────────────────────────────────────────────────────
const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #1a0a0a 100%)',
        color: '#e5e5e5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    loginWrap: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    loginCard: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '420px',
        backdropFilter: 'blur(20px)',
    },
    loginTitle: {
        fontSize: '28px',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '8px',
        background: 'linear-gradient(135deg, #fff, #999)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    loginSubtitle: {
        textAlign: 'center',
        color: '#666',
        fontSize: '14px',
        marginBottom: '32px',
    },
    label: {
        display: 'block',
        fontSize: '12px',
        fontWeight: '600',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '6px',
    },
    input: {
        width: '100%',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '15px',
        outline: 'none',
        marginBottom: '20px',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    },
    btnPrimary: {
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(135deg, #b91c1c, #991b1b)',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'transform 0.15s, box-shadow 0.15s',
    },
    error: {
        background: 'rgba(185,28,28,0.15)',
        border: '1px solid rgba(185,28,28,0.3)',
        color: '#fca5a5',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '13px',
        marginBottom: '16px',
        textAlign: 'center',
    },
    // Dashboard
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    },
    topBarTitle: {
        fontSize: '18px',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    logoutBtn: {
        padding: '8px 16px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        color: '#999',
        fontSize: '13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s',
    },
    dashboard: {
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '32px 24px',
        display: 'grid',
        gap: '24px',
    },
    card: {
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px',
        padding: '28px',
        transition: 'border-color 0.2s',
    },
    cardTitle: {
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#fff',
    },
    badge: {
        fontSize: '10px',
        fontWeight: '700',
        padding: '3px 8px',
        borderRadius: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    fieldGroup: {
        marginBottom: '18px',
    },
    textarea: {
        width: '100%',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        minHeight: '80px',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
    },
    saveBtn: {
        padding: '10px 24px',
        background: 'linear-gradient(135deg, #b91c1c, #991b1b)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'transform 0.15s',
    },
    link: {
        color: '#f87171',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500',
    },
    codeBlock: {
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px',
        padding: '16px',
        fontSize: '12px',
        fontFamily: '"SF Mono", "Fira Code", monospace',
        color: '#a3a3a3',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
        lineHeight: '1.6',
    },
    statGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '20px',
    },
    statCard: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
    },
    statValue: {
        fontSize: '28px',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #f87171, #b91c1c)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    statLabel: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginTop: '6px',
    },
    successMsg: {
        background: 'rgba(34,197,94,0.12)',
        border: '1px solid rgba(34,197,94,0.25)',
        color: '#86efac',
        padding: '10px 14px',
        borderRadius: '8px',
        fontSize: '13px',
        marginBottom: '16px',
        textAlign: 'center',
    },
};

// ── Login Screen ─────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();

            if (data.success) {
                onLogin();
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.loginWrap}>
            <form onSubmit={handleSubmit} style={styles.loginCard}>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #b91c1c, #7f1d1d)', borderRadius: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <IconLock />
                    </div>
                </div>
                <h1 style={styles.loginTitle}>Admin Dashboard</h1>
                <p style={styles.loginSubtitle}>Sign in to manage your site</p>

                {error && <div style={styles.error}>{error}</div>}

                <div>
                    <label style={styles.label}>Username</label>
                    <input
                        id="admin-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                        placeholder="Enter username"
                        autoComplete="username"
                    />
                </div>

                <div>
                    <label style={styles.label}>Password</label>
                    <input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        placeholder="Enter password"
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    style={{ ...styles.btnPrimary, opacity: loading ? 0.7 : 1 }}
                    disabled={loading}
                >
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}

// ── Dashboard ────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
    const [settings, setSettings] = useState(null);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('settings');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            if (res.ok) {
                const data = await res.json();
                setSettings(data);
            }
        } catch {
            console.error('Failed to fetch settings');
        }
    };

    const saveSettings = async () => {
        setSaving(true);
        setSuccess('');
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                setSuccess('Settings saved successfully!');
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch {
            console.error('Failed to save');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        onLogout();
    };

    const updateField = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const updateSchema = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            schemaData: { ...prev.schemaData, [key]: value },
        }));
    };

    const tabs = [
        { id: 'settings', label: 'Site Settings', icon: <IconSettings /> },
        { id: 'seo', label: 'SEO Overview', icon: <IconGlobe /> },
        { id: 'analytics', label: 'Analytics', icon: <IconChart /> },
    ];

    if (!settings) {
        return (
            <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <p style={{ color: '#666' }}>Loading dashboard…</p>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            {/* Top Bar */}
            <div style={styles.topBar}>
                <div style={styles.topBarTitle}>
                    <span style={{ color: '#b91c1c' }}>●</span>
                    Admin Dashboard
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Nav tabs */}
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                ...styles.logoutBtn,
                                color: activeTab === tab.id ? '#fff' : '#666',
                                borderColor: activeTab === tab.id ? 'rgba(185,28,28,0.5)' : 'rgba(255,255,255,0.1)',
                                background: activeTab === tab.id ? 'rgba(185,28,28,0.15)' : 'rgba(255,255,255,0.05)',
                            }}
                        >
                            {tab.icon}
                            <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>{tab.label}</span>
                        </button>
                    ))}
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <IconLogOut />
                        Logout
                    </button>
                </div>
            </div>

            <div style={styles.dashboard}>
                {success && <div style={styles.successMsg}>{success}</div>}

                {/* ── Settings Tab ── */}
                {activeTab === 'settings' && (
                    <>
                        {/* Site Info */}
                        <div style={styles.card}>
                            <h2 style={styles.cardTitle}>
                                <IconSettings />
                                Site Settings
                                <span style={{ ...styles.badge, background: 'rgba(185,28,28,0.2)', color: '#f87171' }}>Editable</span>
                            </h2>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Site Title</label>
                                <input
                                    id="settings-title"
                                    type="text"
                                    value={settings.siteTitle}
                                    onChange={(e) => updateField('siteTitle', e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Meta Description</label>
                                <textarea
                                    id="settings-description"
                                    value={settings.siteDescription}
                                    onChange={(e) => updateField('siteDescription', e.target.value)}
                                    style={styles.textarea}
                                />
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Site URL</label>
                                <input
                                    id="settings-url"
                                    type="text"
                                    value={settings.siteUrl}
                                    onChange={(e) => updateField('siteUrl', e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>GA4 Measurement ID</label>
                                <input
                                    id="settings-ga4"
                                    type="text"
                                    value={settings.ga4MeasurementId}
                                    onChange={(e) => updateField('ga4MeasurementId', e.target.value)}
                                    style={styles.input}
                                    placeholder="G-XXXXXXXXXX"
                                />
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Open Graph Image Path</label>
                                <input
                                    id="settings-og-image"
                                    type="text"
                                    value={settings.ogImage}
                                    onChange={(e) => updateField('ogImage', e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            <button onClick={saveSettings} style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>
                                <IconSave />
                                {saving ? 'Saving…' : 'Save Changes'}
                            </button>
                        </div>

                        {/* Schema Data */}
                        <div style={styles.card}>
                            <h2 style={styles.cardTitle}>
                                <IconGlobe />
                                Structured Data (Schema.org)
                                <span style={{ ...styles.badge, background: 'rgba(59,130,246,0.2)', color: '#93c5fd' }}>JSON-LD</span>
                            </h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>App Name</label>
                                    <input
                                        id="schema-name"
                                        type="text"
                                        value={settings.schemaData?.name || ''}
                                        onChange={(e) => updateSchema('name', e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Category</label>
                                    <input
                                        id="schema-category"
                                        type="text"
                                        value={settings.schemaData?.applicationCategory || ''}
                                        onChange={(e) => updateSchema('applicationCategory', e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Rating Value</label>
                                    <input
                                        id="schema-rating"
                                        type="text"
                                        value={settings.schemaData?.ratingValue || ''}
                                        onChange={(e) => updateSchema('ratingValue', e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Rating Count</label>
                                    <input
                                        id="schema-count"
                                        type="text"
                                        value={settings.schemaData?.ratingCount || ''}
                                        onChange={(e) => updateSchema('ratingCount', e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea
                                    id="schema-description"
                                    value={settings.schemaData?.description || ''}
                                    onChange={(e) => updateSchema('description', e.target.value)}
                                    style={styles.textarea}
                                />
                            </div>

                            <button onClick={saveSettings} style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>
                                <IconSave />
                                {saving ? 'Saving…' : 'Save Schema Data'}
                            </button>
                        </div>
                    </>
                )}

                {/* ── SEO Overview Tab ── */}
                {activeTab === 'seo' && (
                    <>
                        <div style={styles.card}>
                            <h2 style={styles.cardTitle}>
                                <IconGlobe />
                                SEO Configuration
                                <span style={{ ...styles.badge, background: 'rgba(34,197,94,0.2)', color: '#86efac' }}>Active</span>
                            </h2>

                            <div style={styles.statGrid}>
                                <div style={styles.statCard}>
                                    <div style={styles.statValue}>✓</div>
                                    <div style={styles.statLabel}>Robots.txt</div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statValue}>✓</div>
                                    <div style={styles.statLabel}>Sitemap.xml</div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statValue}>✓</div>
                                    <div style={styles.statLabel}>Open Graph</div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statValue}>✓</div>
                                    <div style={styles.statLabel}>JSON-LD</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Links</h3>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                    <a href="/robots.txt" target="_blank" rel="noopener noreferrer" style={styles.link}>→ robots.txt</a>
                                    <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={styles.link}>→ sitemap.xml</a>
                                </div>
                            </div>
                        </div>

                        <div style={styles.card}>
                            <h2 style={styles.cardTitle}>
                                JSON-LD Preview
                            </h2>
                            <div style={styles.codeBlock}>
                                {JSON.stringify({
                                    "@context": "https://schema.org",
                                    "@type": "SoftwareApplication",
                                    "name": settings.schemaData?.name,
                                    "description": settings.schemaData?.description,
                                    "applicationCategory": settings.schemaData?.applicationCategory,
                                    "aggregateRating": {
                                        "@type": "AggregateRating",
                                        "ratingValue": settings.schemaData?.ratingValue,
                                        "ratingCount": settings.schemaData?.ratingCount,
                                    }
                                }, null, 2)}
                            </div>
                        </div>

                        <div style={styles.card}>
                            <h2 style={styles.cardTitle}>
                                Robots.txt Preview
                            </h2>
                            <div style={styles.codeBlock}>
                                {`# Robots.txt for Car Accident Attorneys
User-agent: *
Allow: /

Sitemap: ${settings.siteUrl}/sitemap.xml`}
                            </div>
                        </div>
                    </>
                )}

                {/* ── Analytics Tab ── */}
                {activeTab === 'analytics' && (
                    <>
                        <div style={styles.card}>
                            <h2 style={styles.cardTitle}>
                                <IconChart />
                                Google Analytics 4
                                <span style={{
                                    ...styles.badge,
                                    background: settings.ga4MeasurementId && settings.ga4MeasurementId !== 'G-XXXXXXXXXX'
                                        ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)',
                                    color: settings.ga4MeasurementId && settings.ga4MeasurementId !== 'G-XXXXXXXXXX'
                                        ? '#86efac' : '#fde047',
                                }}>
                                    {settings.ga4MeasurementId && settings.ga4MeasurementId !== 'G-XXXXXXXXXX' ? 'Connected' : 'Pending Setup'}
                                </span>
                            </h2>

                            <div style={styles.statGrid}>
                                <div style={styles.statCard}>
                                    <div style={{ ...styles.statValue, fontSize: '16px' }}>{settings.ga4MeasurementId}</div>
                                    <div style={styles.statLabel}>Measurement ID</div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statValue}>24/7</div>
                                    <div style={styles.statLabel}>Tracking Active</div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statValue}>All</div>
                                    <div style={styles.statLabel}>Pages Tracked</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '12px' }}>
                                <a
                                    href="https://analytics.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        ...styles.saveBtn,
                                        textDecoration: 'none',
                                        background: 'linear-gradient(135deg, #1a73e8, #1557b0)',
                                    }}
                                >
                                    <IconChart />
                                    Open Google Analytics Dashboard →
                                </a>
                            </div>

                            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Setup Instructions</h3>
                                <ol style={{ color: '#777', fontSize: '13px', lineHeight: '2', paddingLeft: '20px', margin: 0 }}>
                                    <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#f87171' }}>analytics.google.com</a></li>
                                    <li>Create a new GA4 property for your domain</li>
                                    <li>Copy the Measurement ID (starts with <code style={{ color: '#f87171' }}>G-</code>)</li>
                                    <li>Paste it in <strong>Site Settings → GA4 Measurement ID</strong> above</li>
                                    <li>Or set the <code style={{ color: '#f87171' }}>NEXT_PUBLIC_GA4_ID</code> environment variable</li>
                                </ol>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// ── Main Admin Page ──────────────────────────────────────────────────
export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const res = await fetch('/api/admin/session');
            if (res.ok) {
                const data = await res.json();
                setAuthed(data.authenticated);
            }
        } catch {
            // Not authenticated
        } finally {
            setChecking(false);
        }
    };

    if (checking) {
        return (
            <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <p style={{ color: '#666' }}>Checking session…</p>
            </div>
        );
    }

    if (!authed) {
        return (
            <div style={styles.page}>
                <LoginScreen onLogin={() => setAuthed(true)} />
            </div>
        );
    }

    return <Dashboard onLogout={() => setAuthed(false)} />;
}
