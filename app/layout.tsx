import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'CollegeCompass — Discover Your Perfect College',
  description: 'Search, compare, and predict college admissions across India\'s top institutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise">
        <Navbar />
        <main>
          {children}
        </main>
        <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontFamily: 'var(--font-display)' }}>
            © 2024 CollegeCompass. Built for students, by students. 🎓
          </p>
        </footer>
      </body>
    </html>
  );
}