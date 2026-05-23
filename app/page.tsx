import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '6rem 1.5rem 4rem',
        textAlign: 'center',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 1rem',
            borderRadius: '100px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            background: 'rgba(99, 102, 241, 0.08)',
            marginBottom: '2rem',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              12 Top Colleges • 3 Features • Real-time Data
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Find Your{' '}
            <span style={{
              background: 'var(--gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Dream College
            </span>
            <br />
            With Confidence
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.125rem',
            maxWidth: '540px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
            fontWeight: 400,
          }}>
            Discover, compare, and predict your college admissions. From IITs to private universities — your complete guide to India&apos;s top institutions.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/colleges" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              🔍 Explore Colleges
            </Link>
            <Link href="/predict" className="btn-secondary" style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}>
              🧠 Predict Admission
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem 6rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {[
            {
              icon: '🔍',
              title: 'College Listing',
              desc: 'Browse 12+ top institutions with advanced search and filters by location, fees, type.',
              href: '/colleges',
              color: '#6366f1',
            },
            {
              icon: '⚖️',
              title: 'Compare Colleges',
              desc: 'Side-by-side comparison of fees, placements, ratings and more across any 2–3 colleges.',
              href: '/compare',
              color: '#22d3ee',
              highlight: true,
            },
            {
              icon: '🧠',
              title: 'Rank Predictor',
              desc: 'Enter your JEE rank and discover colleges where you have a high, medium, or low chance.',
              href: '/predict',
              color: '#f59e0b',
            },
          ].map(f => (
            <Link
              key={f.href}
              href={f.href}
              style={{ textDecoration: 'none' }}
            >
              <div className="card" style={{
                padding: '2rem',
                cursor: 'pointer',
                border: f.highlight ? `1px solid rgba(34, 211, 238, 0.3)` : undefined,
                background: f.highlight ? 'rgba(34, 211, 238, 0.03)' : undefined,
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: `${f.color}20`,
                  border: `1px solid ${f.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1.25rem',
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  marginBottom: '0.625rem',
                  color: 'var(--text)',
                }}>
                  {f.title}
                  {f.highlight && (
                    <span style={{
                      marginLeft: '0.5rem',
                      fontSize: '0.65rem',
                      padding: '0.2rem 0.5rem',
                      background: 'rgba(34, 211, 238, 0.15)',
                      color: '#22d3ee',
                      borderRadius: '4px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}>HOT</span>
                  )}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
                <div style={{
                  marginTop: '1.25rem',
                  color: f.color,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}>
                  Try it →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats row */}
        <div style={{
          marginTop: '4rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}>
          {[
            { value: '12+', label: 'Top Colleges' },
            { value: '5', label: 'College Types' },
            { value: '40+', label: 'Courses Listed' },
            { value: '₹1.5L–₹24L', label: 'Fee Range' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '2rem',
              background: 'var(--bg-card)',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.75rem',
                background: 'var(--gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.25rem',
              }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}