'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { College } from '@/lib/db';

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.25rem',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '1.625rem',
        background: 'var(--gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.25rem',
      }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      {sub && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{sub}</div>}
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= Math.round(rating) ? '#f59e0b' : 'var(--border)' }}>★</span>
      ))}
    </span>
  );
}

const TABS = ['Overview', 'Courses', 'Placements', 'Reviews'];

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (params.id) {
      fetch(`/api/colleges/${params.id}`)
        .then(r => {
          if (!r.ok) throw new Error('Not found');
          return r.json();
        })
        .then(data => {
          setCollege(data);
          setLoading(false);
        })
        .catch(() => {
          router.push('/colleges');
        });
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div className="skeleton" style={{ height: '300px', borderRadius: '16px', marginBottom: '2rem' }} />
        <div className="skeleton" style={{ height: '40px', width: '60%', marginBottom: '1rem' }} />
        <div className="skeleton" style={{ height: '100px' }} />
      </div>
    );
  }

  if (!college) return null;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <Link href="/colleges" style={{ color: 'var(--accent)', textDecoration: 'none' }}>← Back to Colleges</Link>
        <span>/</span>
        <span>{college.name}</span>
      </div>

      {/* Hero */}
      <div className="card" style={{ overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', height: '240px' }}>
          <img
            src={college.image_url}
            alt={college.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,15,30,0.3) 0%, rgba(10,15,30,0.95) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.625rem' }}>
                  <span className={`badge badge-${college.type.toLowerCase()}`}>{college.type}</span>
                  {college.naac_grade && (
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(16,185,129,0.15)', color: '#34d399', borderRadius: '6px', fontWeight: 700 }}>
                      NAAC {college.naac_grade}
                    </span>
                  )}
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'white', marginBottom: '0.375rem' }}>
                  {college.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>📍 {college.location}</span>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>🏛️ Est. {college.established}</span>
                  {college.nirf_rank && (
                    <span style={{ color: '#818cf8', fontSize: '0.875rem', fontWeight: 700 }}>NIRF #{college.nirf_rank}</span>
                  )}
                </div>
              </div>
              <Link
                href={`/compare?ids=${college.id}`}
                className="btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                ⚖️ Compare
              </Link>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          borderTop: '1px solid var(--border)',
        }}>
          {[
            { label: 'Rating', value: `${college.rating}/5` },
            { label: 'Annual Fees', value: `₹${(college.total_fees/100000).toFixed(1)}L` },
            { label: 'Placement', value: `${college.placement_percentage}%` },
            { label: 'Avg Package', value: `${college.avg_package} LPA` },
            { label: 'Highest Pkg', value: `${college.highest_package} LPA` },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', background: 'var(--bg-card)', borderRadius: '12px', padding: '0.375rem', border: '1px solid var(--border)' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '0.625rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.875rem',
              background: activeTab === tab ? 'var(--accent)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.875rem' }}>About</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '0.95rem' }}>{college.description}</p>
            {college.website && (
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', color: 'var(--accent)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 600 }}
              >
                🌐 Visit Official Website →
              </a>
            )}
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', marginBottom: '1rem' }}>Entrance Exams Accepted</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              {college.entrance_exams.map(exam => (
                <span key={exam} style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: '8px',
                  color: '#a5b4fc',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}>
                  {exam}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Courses' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} className="compare-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Degree</th>
                <th>Duration</th>
                <th>Annual Fees</th>
                <th>Seats</th>
                <th>Cutoff Rank</th>
              </tr>
            </thead>
            <tbody>
              {college.courses.map(course => (
                <tr key={course.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text)' }}>{course.name}</td>
                  <td>
                    <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                      {course.degree}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-dim)' }}>{course.duration} yrs</td>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>₹{(course.fees/100000).toFixed(1)}L</td>
                  <td style={{ color: 'var(--text-dim)' }}>{course.seats}</td>
                  <td style={{ color: course.cutoff_rank > 0 ? 'var(--text)' : 'var(--text-muted)', fontWeight: course.cutoff_rank > 0 ? 600 : 400 }}>
                    {course.cutoff_rank > 0 ? `≤ ${course.cutoff_rank.toLocaleString()}` : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Placements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <StatCard label="Placement Rate" value={`${college.placement_percentage}%`} />
            <StatCard label="Average Package" value={`₹${college.avg_package} LPA`} />
            <StatCard label="Highest Package" value={`₹${college.highest_package} LPA`} />
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', marginBottom: '1.5rem' }}>Placement Stats</h2>

            {[
              { label: 'Placement Rate', value: college.placement_percentage, max: 100, color: '#6366f1' },
              { label: `Avg Package vs National Avg (${Math.max(8, college.avg_package)} LPA vs 8 LPA)`, value: Math.min(100, (college.avg_package / 20) * 100), max: 100, color: '#22d3ee' },
              { label: 'Student Satisfaction (based on reviews)', value: college.rating * 20, max: 100, color: '#f59e0b' },
            ].map(stat => (
              <div key={stat.label} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-dim)' }}>{stat.label}</span>
                  <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{Math.round(stat.value)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${stat.value}%`, background: stat.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {college.reviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No reviews yet.</div>
          ) : (
            college.reviews.map(review => (
              <div key={review.id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.25rem' }}>{review.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {review.reviewer_name} · Batch of {review.batch_year}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Stars rating={review.rating} />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem' }}>{review.rating}/5</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1rem' }}>{review.content}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '8px', padding: '0.75rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#34d399', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.375rem' }}>👍 PROS</div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{review.pros}</p>
                  </div>
                  <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', padding: '0.75rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#f87171', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.375rem' }}>👎 CONS</div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{review.cons}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}