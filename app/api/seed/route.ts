export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { collegesData } from '@/lib/db';
import { seedDatabase } from '@/lib/db-postgres';

// GET /api/seed — simple GET so you can just open it in the browser
export async function GET() {
  try {
    await seedDatabase(collegesData);
    return NextResponse.json({ success: true, seeded: collegesData.length });
  } catch (error) {
    console.error('Seed error:', error);
    // Return the ACTUAL error message so you can see what's wrong
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}