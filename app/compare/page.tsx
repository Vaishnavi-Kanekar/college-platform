'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { College } from '@/lib/db-postgres';

function WinnerBadge() {
  return (
    <span style={{
      fontSize: '0.65rem',
      padding: '0.15rem 0.4rem',
      background: 'rgba(16,185,129,0.2)',
      color: '#34d399',
      borderRadius: '4px',
      fontWeight: 700,
      fontFamily: 'var(--font-display)',
      marginLeft: '0.375rem',
    }}>BEST</span>
  );
}

function CompareRow({ label, values, format, higherIsBetter = true, isText = false }: {
  label: string;
  values: (number | string)[];
  format?: (v: number | string) => string;
  higherIsBetter?: boolean;
  isText?: boolean;
}) {
  const numValues = values.filter(v => typeof v === 'number') as number[];
  const best = isText ? -1 : (higherIsBetter ? Math.max(...numValues) : Math.min(...numValues));

  return (
    <tr>
      <td style={{
        padding: '0.875rem 1.25rem',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-muted)',
        fontSize: '0.825rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
        background: 'rgba(255,255,255,0.02)',
      }}>
        {label}
      </td>
      {values.map((val, i) => (
        <td key={i} style={{
          padding: '0.875rem 1.25rem',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem',
          color: (!isText && val === best) ? '#34d399' : 'var(--text)',
          background: (!isText && val === best) ? 'rgba(16,185,129,0.04)' : 'transparent',
        }}>
          {format ? format(val) : String(val)}
          {!isText && val === best && <WinnerBadge />}
        </td>
      ))}
    </tr>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const idsParam = searchParams.get('ids');

  useEffect(() => {
    // Load all colleges for picker
    fetch('/api/colleges?page=1')
      .then(r => r.json())
      .then(data => setAllColleges(data.colleges || []));
  }, []);

  useEffect(() => {
    if (idsParam) {
      const ids = idsParam.split(',').map(Number).filter(Boolean);
      setSelectedIds(ids);

      if (ids.length >= 2) {
        setLoading(true);
        fetch(`/api/compare?ids=${ids.join(',')}`)
          .then(r => r.json())
          .then(data => {
            setColleges(data.colleges || []);
            setLoading(false);
          });
      }
    }
  }, [idsParam]);

  function toggleCollege(id: number) {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  function runCompare() {
    if (selectedIds.length >= 2) {
      router.push(`/compare?ids=${selectedIds.join(',')}`);
    }
  }

  const SECTIONS = [
    { label: 'NIRF Rank', values: colleges.map(c => c.nirf_rank || 999), format: (v: number | string) => v === 999 ? 'N/A' : `#${v}`, higherIsBetter: false },
    { label: 'Rating', values: colleges.map(c => c.rating), format: (v: number | string) => `${v}/5` },
    { label: 'Annual Fees', values: colleges.map(c => c.total_fees), format: (v: number | string) => `₹${((v as number)/100000).toFixed(1)}L`, higherIsBetter: false },
    { label: 'Placement %', values: colleges.map(c => c.placement_percentage), format: (v: number | string) => `${v}%` },
    { label: 'Avg Package', values: colleges.map(c => c.avg_package), format: (v: number | string) => `${v} LPA` },
    { label: 'Highest Package', values: colleges.map(c => c.highest_package), format: (v: number | string) => `${v} LPA` },
    { label: 'Total Students', values: colleges.map(c => c.total_students), format: (v: number | string) => (v as number).toLocaleString() },
    { label: 'NAAC Grade', values: colleges.map(c => c.naac_grade || 'N/A'), isText: true },
    { label: 'Location', values: colleges.map(c => c.city), isText: true },
    { label: 'Type', values: colleges.map(c => c.type), isText: true },
    { label: 'Est. Year', values: colleges.map(c => c.established), format: (v: number | string) => String(v), higherIsBetter: false },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.5rem' }}>
          Compare Colleges
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Select 2–3 colleges to see a detailed side-by-side comparison</p>
      </div>

      {/* Picker */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>
            Select Colleges
            <span style={{ marginLeft: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 400 }}>
              ({selectedIds.length}/3 selected)
            </span>
          </h2>
          <button
            onClick={runCompare}
            disabled={selectedIds.length < 2}
            className="btn-primary"
            style={{ opacity: selectedIds.length < 2 ? 0.5 : 1, fontSize: '0.875rem' }}
          >
            Compare {selectedIds.length > 0 ? `(${selectedIds.length})` : ''} →
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {allColleges.map(college => {
            const isSelected = selectedIds.includes(college.id);
            const canSelect = isSelected || selectedIds.length < 3;
            return (
              <button
                key={college.id}
                onClick={() => canSelect && toggleCollege(college.id)}
                style={{
                  padding: '0.5rem 0.875rem',
                  borderRadius: '8px',
                  border: isSelected ? '1px solid rgba(34,211,238,0.5)' : '1px solid var(--border)',
                  background: isSelected ? 'rgba(34,211,238,0.1)' : 'transparent',
                  color: isSelected ? '#22d3ee' : canSelect ? 'var(--text-dim)' : 'var(--text-muted)',
                  cursor: canSelect ? 'pointer' : 'not-allowed',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  opacity: (!canSelect) ? 0.5 : 1,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                }}
              >
                {isSelected && '✓ '}
                {college.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚖️</div>
          <p>Loading comparison...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && colleges.length === 0 && !idsParam && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚖️</div>
          <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem', color: 'var(--text)' }}>Ready to Compare</h3>
          <p>Select at least 2 colleges above and click Compare</p>
        </div>
      )}

      {/* Comparison table */}
      {!loading && colleges.length >= 2 && (
        <div>
          {/* College header cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)`,
            gap: '0',
            marginBottom: '0',
          }}>
            <div style={{ padding: '1rem' }} />
            {colleges.map(college => (
              <div key={college.id} className="card" style={{
                margin: '0 0.375rem',
                padding: '1.25rem',
                textAlign: 'center',
                borderBottom: 'none',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  margin: '0 auto 0.75rem',
                }}>
                  <img
                    src={college.image_url}
                    alt={college.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'; }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                  {college.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{college.city}</div>
                <Link
                  href={`/colleges/${college.id}`}
                  style={{ fontSize: '0.75rem', color: 'var(--accent)', textDecoration: 'none', display: 'inline-block', marginTop: '0.5rem' }}
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '0 0 16px 16px', overflow: 'hidden' }}>
              <tbody>
                {SECTIONS.map(section => (
                  <CompareRow
                    key={section.label}
                    label={section.label}
                    values={section.values}
                    format={section.format as ((v: number | string) => string) | undefined}
                    higherIsBetter={section.higherIsBetter !== false}
                    isText={section.isText}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Best for */}
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: `repeat(${colleges.length}, 1fr)`, gap: '1rem' }}>
            {colleges.map(college => (
              <div key={college.id} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text)' }}>
                  {college.name.split(' ').slice(0, 3).join(' ')}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {college.nirf_rank <= 5 && <div>🏆 Top 5 NIRF</div>}
                  {college.placement_percentage >= 95 && <div>💼 Excellent placements</div>}
                  {college.avg_package >= 18 && <div>💰 Premium salary range</div>}
                  {college.total_fees < 200000 && <div>💡 Best value for money</div>}
                  {college.type === 'IIM' && <div>🎓 Premier B-School</div>}
                  {college.entrance_exams.includes('JEE Advanced') && <div>🧠 IIT-level education</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}