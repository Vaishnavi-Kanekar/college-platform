'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/colleges', label: 'Explore', icon: '🔍' },
    { href: '/compare', label: 'Compare', icon: '⚖️' },
    { href: '/predict', label: 'Predictor', icon: '🧠' },
  ];

  return (
    <nav style={{
      background: 'rgba(10, 15, 30, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 1.5rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}>🧭</div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.125rem',
            background: 'var(--gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>CollegeCompass</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hidden md:flex">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: pathname.startsWith(link.href) ? 'white' : 'var(--text-muted)',
                background: pathname.startsWith(link.href) ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                border: pathname.startsWith(link.href) ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '1.25rem' }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div style={{
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          borderTop: '1px solid var(--border)',
        }} className="md:hidden">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.875rem',
                color: pathname.startsWith(link.href) ? 'white' : 'var(--text-muted)',
                background: pathname.startsWith(link.href) ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              }}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}