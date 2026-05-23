'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CollegeCard from '@/components/CollegeCard';
import { College } from '@/lib/db-postgres';

interface SearchResult {
  colleges: College[];
  total: number;
  pages: number;
}

interface MetaData {
  states: string[];
  types: string[];
  exams: string[];
}

const FEE_OPTIONS = [
  { label: 'Any', value: '' },
  { label: 'Under ₹2L/yr', value: '200000' },
  { label: 'Under ₹5L/yr', value: '500000' },
  { label: 'Under ₹10L/yr', value: '1000000' },
  { label: 'Under ₹25L/yr', value: '2500000' },
];

export default function CollegesPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [state, setState] = useState('all');
  const [type, setType] = useState('all');
  const [exam, setExam] = useState('all');
  const [maxFees, setMaxFees] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<College[]>([]);

  // Load metadata
  useEffect(() => {
    fetch('/api/colleges?meta=true')
      .then(r => r.json())
      .then(setMeta);
  }, []);

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (state !== 'all') params.set('state', state);
    if (type !== 'all') params.set('type', type);
    if (exam !== 'all') params.set('exam', exam);
    if (maxFees) params.set('maxFees', maxFees);
    params.set('page', page.toString());

    const res = await fetch(`/api/colleges?${params.toString()}`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }, [query, state, type, exam, maxFees, page]);

  useEffect(() => {
    const timer = setTimeout(fetchColleges, query ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchColleges]);

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [query, state, type, exam, maxFees]);

  function toggleCompare(college: College) {
    setCompareList(prev => {
      const exists = prev.find(c => c.id === college.id);
      if (exists) return prev.filter(c => c.id !== college.id);
      if (prev.length >= 3) return prev;
      return [...prev, college];
    });
  }

  function goCompare() {
    if (compareList.length >= 2) {
      router.push(`/compare?ids=${compareList.map(c => c.id).join(',')}`);
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '2rem',
          marginBottom: '0.5rem',
        }}>
          Explore Colleges
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {result ? `${result.total} colleges found` : 'Loading...'}
        </p>
      </div>

      {/* Search + Filters */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
          }}>🔍</span>
          <input
            type="text"
            placeholder="Search by college name, city, or state..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* State filter */}
          <select
            value={state}
            onChange={e => setState(e.target.value)}
            className="input-field"
            style={{ flex: '1', minWidth: '160px' }}
          >
            <option value="all">All States</option>
            {meta?.states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="input-field"
            style={{ flex: '1', minWidth: '140px' }}
          >
            <option value="all">All Types</option>
            {meta?.types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Fees filter */}
          <select
            value={maxFees}
            onChange={e => setMaxFees(e.target.value)}
            className="input-field"
            style={{ flex: '1', minWidth: '160px' }}
          >
            {FEE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Exam filter */}
          <select
            value={exam}
            onChange={e => setExam(e.target.value)}
            className="input-field"
            style={{ flex: '1', minWidth: '160px' }}
          >
            <option value="all">All Exams</option>
            {meta?.exams.map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>

          {/* Clear */}
          {(query || state !== 'all' || type !== 'all' || exam !== 'all' || maxFees) && (
            <button
              onClick={() => { setQuery(''); setState('all'); setType('all'); setExam('all'); setMaxFees(''); }}
              className="btn-secondary"
              style={{ whiteSpace: 'nowrap' }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Compare bar */}
      {compareList.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg-card)',
          border: '1px solid rgba(34,211,238,0.3)',
          borderRadius: '100px',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 50,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: '#22d3ee', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '0.875rem' }}>
              ⚖️ Compare
            </span>
            {compareList.map(c => (
              <span key={c.id} style={{
                background: 'rgba(34,211,238,0.1)',
                border: '1px solid rgba(34,211,238,0.2)',
                borderRadius: '6px',
                padding: '0.25rem 0.625rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
              }}>
                {c.name.split(' ').slice(0, 2).join(' ')}
              </span>
            ))}
          </div>
          <button
            onClick={goCompare}
            disabled={compareList.length < 2}
            className="btn-primary"
            style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', borderRadius: '100px' }}
          >
            Compare Now →
          </button>
          <button
            onClick={() => setCompareList([])}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* College Grid */}
      {loading ? (
        <div className="college-grid">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div className="skeleton" style={{ height: '160px' }} />
              <div style={{ padding: '1.25rem', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="skeleton" style={{ height: '20px', width: '70%' }} />
                <div className="skeleton" style={{ height: '14px', width: '50%' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {[1,2,3,4].map(j => <div key={j} className="skeleton" style={{ height: '48px' }} />)}
                </div>
                <div className="skeleton" style={{ height: '38px', width: '100%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : result?.colleges.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>No colleges found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>
      ) : (
        <>
          <div className="college-grid">
            {result?.colleges.map(college => (
              <CollegeCard
                key={college.id}
                college={college}
                onCompareToggle={toggleCompare}
                isInCompare={compareList.some(c => c.id === college.id)}
                compareCount={compareList.length}
              />
            ))}
          </div>

          {/* Pagination */}
          {result && result.pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem', paddingBottom: '4rem' }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary"
                style={{ opacity: page === 1 ? 0.4 : 1 }}
              >
                ← Prev
              </button>
              {Array.from({ length: result.pages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: p === page ? '1px solid var(--accent)' : '1px solid var(--border)',
                    background: p === page ? 'var(--accent)' : 'transparent',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(result.pages, p + 1))}
                disabled={page === result.pages}
                className="btn-secondary"
                style={{ opacity: page === result.pages ? 0.4 : 1 }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}