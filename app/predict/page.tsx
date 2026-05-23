'use client';
import { useState } from 'react';
import Link from 'next/link';

interface PredictResult {
  college: {
    id: number;
    name: string;
    location: string;
    type: string;
    rating: number;
    total_fees: number;
    placement_percentage: number;
    avg_package: number;
    image_url: string;
    nirf_rank: number;
  };
  chance: 'High' | 'Medium' | 'Low';
  matchedCourse: {
    name: string;
    degree: string;
    fees: number;
    cutoff_rank: number;
    seats: number;
  };
}

const EXAMS = [
  { value: 'JEE Advanced', label: 'JEE Advanced (IITs)', desc: 'For Indian Institutes of Technology' },
  { value: 'JEE Main', label: 'JEE Main (NITs/IIITs)', desc: 'For NITs, IIITs, and State Engineering Colleges' },
  { value: 'BITSAT', label: 'BITSAT (BITS Pilani)', desc: 'For BITS Pilani, Goa, and Hyderabad' },
  { value: 'CAT', label: 'CAT (IIMs/MBA)', desc: 'For IIMs and top Business Schools' },
];

const CHANCE_CONFIG = {
  High: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', emoji: '🟢' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', emoji: '🟡' },
  Low: { color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', emoji: '🔴' },
};

export default function PredictPage() {
  const [exam, setExam] = useState('JEE Advanced');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState<PredictResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePredict() {
    if (!rank || isNaN(parseInt(rank)) || parseInt(rank) < 1) {
      setError('Please enter a valid rank');
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);

    const res = await fetch(`/api/predict?exam=${encodeURIComponent(exam)}&rank=${rank}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  }

  const grouped = results ? {
    High: results.filter(r => r.chance === 'High'),
    Medium: results.filter(r => r.chance === 'Medium'),
    Low: results.filter(r => r.chance === 'Low'),
  } : null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.5rem' }}>
          🧠 Rank Predictor
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Enter your entrance exam rank to see which colleges you can get into
        </p>
      </div>

      {/* Input card */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        {/* Exam selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: 'var(--text-dim)',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            Select Exam
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {EXAMS.map(e => (
              <button
                key={e.value}
                onClick={() => setExam(e.value)}
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  border: exam === e.value ? '2px solid var(--accent)' : '1px solid var(--border)',
                  background: exam === e.value ? 'rgba(99,102,241,0.1)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: exam === e.value ? 'var(--accent)' : 'var(--text)',
                  marginBottom: '0.25rem',
                }}>
                  {e.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{e.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Rank input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: 'var(--text-dim)',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            Your Rank
          </label>
          <input
            type="number"
            placeholder={exam === 'JEE Advanced' ? 'e.g. 500' : exam === 'JEE Main' ? 'e.g. 5000' : 'e.g. 2000'}
            value={rank}
            onChange={e => setRank(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handlePredict()}
            className="input-field"
            min="1"
            style={{ fontSize: '1.125rem', padding: '0.875rem 1.25rem' }}
          />
          {error && <p style={{ color: '#f87171', fontSize: '0.825rem', marginTop: '0.5rem' }}>{error}</p>}
        </div>

        {/* Range hints */}
        <div style={{
          background: 'rgba(99,102,241,0.05)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
        }}>
          <span style={{ color: '#a5b4fc', fontWeight: 700 }}>💡 Hint: </span>
          {exam === 'JEE Advanced' && 'JEE Advanced ranks typically range from 1 to ~15,000 for qualifying candidates.'}
          {exam === 'JEE Main' && 'JEE Main rank ranges from 1 to ~10 lakh. Most NIT cutoffs are below 50,000.'}
          {exam === 'BITSAT' && 'BITSAT scores range from 1–450. Enter your percentile rank for best results.'}
          {exam === 'CAT' && 'CAT ranks typically range from 1–2,50,000. IIM cutoffs are generally top 1000.'}
        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.875rem' }}
        >
          {loading ? '🔄 Analyzing...' : '🧠 Predict My Colleges'}
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</div>
          <p style={{ color: 'var(--text-muted)' }}>Analyzing your rank across all colleges...</p>
        </div>
      )}

      {results !== null && !loading && (
        <div>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', marginBottom: '0.5rem' }}>No matches found</h3>
              <p>Your rank may be outside the typical range for {exam}. Try adjusting your rank or switching exams.</p>
            </div>
          ) : (
            <div>
              {/* Summary */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                marginBottom: '2rem',
              }}>
                {(['High', 'Medium', 'Low'] as const).map(chance => {
                  const config = CHANCE_CONFIG[chance];
                  const count = grouped![chance].length;
                  return (
                    <div key={chance} style={{
                      background: config.bg,
                      border: `1px solid ${config.border}`,
                      borderRadius: '12px',
                      padding: '1.25rem',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.375rem' }}>{config.emoji}</div>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '2rem',
                        color: config.color,
                        marginBottom: '0.25rem',
                      }}>{count}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                        {chance} Chance
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* College cards by chance */}
              {(['High', 'Medium', 'Low'] as const).map(chance => {
                const config = CHANCE_CONFIG[chance];
                const group = grouped![chance];
                if (group.length === 0) return null;

                return (
                  <div key={chance} style={{ marginBottom: '2rem' }}>
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <span>{config.emoji}</span>
                      <span style={{ color: config.color }}>{chance} Chance</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({group.length} options)</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {group.map((result, i) => (
                        <div key={`${result.college.id}-${i}`} style={{
                          background: 'var(--bg-card)',
                          border: `1px solid ${config.border}`,
                          borderLeft: `3px solid ${config.color}`,
                          borderRadius: '12px',
                          padding: '1.25rem',
                          display: 'grid',
                          gridTemplateColumns: '1fr auto',
                          gap: '1rem',
                          alignItems: 'center',
                        }}>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '10px',
                              overflow: 'hidden',
                              flexShrink: 0,
                              background: 'var(--bg)',
                            }}>
                              <img
                                src={result.college.image_url}
                                alt={result.college.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'; }}
                              />
                            </div>
                            <div>
                              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                                {result.college.name}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                                {result.matchedCourse.name} ({result.matchedCourse.degree}) · Cutoff: ≤{result.matchedCourse.cutoff_rank.toLocaleString()}
                              </div>
                              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {result.college.nirf_rank && (
                                  <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(99,102,241,0.1)', color: '#818cf8', borderRadius: '4px', fontWeight: 700 }}>
                                    NIRF #{result.college.nirf_rank}
                                  </span>
                                )}
                                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(16,185,129,0.1)', color: '#34d399', borderRadius: '4px', fontWeight: 700 }}>
                                  {result.college.placement_percentage}% placed
                                </span>
                                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', background: 'rgba(245,158,11,0.1)', color: '#fbbf24', borderRadius: '4px', fontWeight: 700 }}>
                                  {result.college.avg_package} LPA avg
                                </span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                            <div style={{
                              padding: '0.375rem 0.875rem',
                              borderRadius: '8px',
                              background: config.bg,
                              border: `1px solid ${config.border}`,
                              color: config.color,
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                            }}>
                              {chance} Chance
                            </div>
                            <Link
                              href={`/colleges/${result.college.id}`}
                              style={{
                                fontSize: '0.8rem',
                                color: 'var(--accent)',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 600,
                              }}
                            >
                              Details →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}