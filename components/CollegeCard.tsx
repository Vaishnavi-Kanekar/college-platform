'use client';
import Link from 'next/link';
import { College } from '@/lib/db';

interface Props {
  college: College;
  onCompareToggle?: (college: College) => void;
  isInCompare?: boolean;
  compareCount?: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} style={{
          color: star <= Math.floor(rating) ? '#f59e0b' :
            star === Math.ceil(rating) && rating % 1 >= 0.5 ? '#f59e0b' : 'var(--border)',
          fontSize: '0.7rem',
        }}>★</span>
      ))}
      <span style={{ marginLeft: '4px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const cls = type.toLowerCase();
  return (
    <span className={`badge badge-${cls}`}>{type}</span>
  );
}

export default function CollegeCard({ college, onCompareToggle, isInCompare, compareCount = 0 }: Props) {
  const canAddToCompare = !isInCompare && compareCount < 3;

  return (
    <div className="card" style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      border: isInCompare ? '1px solid rgba(34, 211, 238, 0.4)' : undefined,
      boxShadow: isInCompare ? '0 0 0 1px rgba(34, 211, 238, 0.1)' : undefined,
    }}>
      {/* Image */}
      <div style={{
        height: '160px',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--bg)',
      }}>
        <img
          src={college.image_url}
          alt={college.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?w=800';
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 30%, rgba(10,15,30,0.8) 100%)',
        }} />
        {/* NIRF badge */}
        {college.nirf_rank && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(99,102,241,0.4)',
            borderRadius: '8px',
            padding: '4px 10px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            color: '#818cf8',
          }}>
            NIRF #{college.nirf_rank}
          </div>
        )}
        {/* Type badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <TypeBadge type={college.type} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1rem',
          marginBottom: '0.375rem',
          color: 'var(--text)',
          lineHeight: 1.3,
        }}>
          {college.name}
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          marginBottom: '0.875rem',
        }}>
          <span>📍</span>
          <span>{college.location}</span>
        </div>

        <StarRating rating={college.rating} />

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.625rem',
          marginTop: '1rem',
          marginBottom: '1.25rem',
        }}>
          {[
            { label: 'Annual Fees', value: `₹${(college.total_fees / 100000).toFixed(1)}L` },
            { label: 'Placement', value: `${college.placement_percentage}%` },
            { label: 'Avg Package', value: `${college.avg_package} LPA` },
            { label: 'Est.', value: college.established.toString() },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.5rem 0.625rem',
            }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Exams */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
          {college.entrance_exams.slice(0, 3).map(exam => (
            <span key={exam} style={{
              fontSize: '0.7rem',
              padding: '0.2rem 0.5rem',
              background: 'rgba(99,102,241,0.1)',
              color: '#a5b4fc',
              borderRadius: '4px',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
            }}>
              {exam}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.625rem', marginTop: 'auto' }}>
          <Link
            href={`/colleges/${college.id}`}
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', textDecoration: 'none', fontSize: '0.825rem' }}
          >
            View Details
          </Link>
          {onCompareToggle && (
            <button
              onClick={() => onCompareToggle(college)}
              className="btn-secondary"
              style={{
                fontSize: '0.825rem',
                padding: '0.625rem 0.875rem',
                background: isInCompare ? 'rgba(34, 211, 238, 0.1)' : undefined,
                borderColor: isInCompare ? 'rgba(34, 211, 238, 0.4)' : undefined,
                color: isInCompare ? '#22d3ee' : undefined,
                opacity: (!canAddToCompare && !isInCompare) ? 0.4 : 1,
                cursor: (!canAddToCompare && !isInCompare) ? 'not-allowed' : 'pointer',
              }}
              disabled={!canAddToCompare && !isInCompare}
            >
              {isInCompare ? '✓ Added' : '⚖️'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}