import { NextRequest, NextResponse } from 'next/server';
import { searchColleges, getUniqueStates, getUniqueTypes } from '@/lib/db-postgres';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('query') || '';
  const state = searchParams.get('state') || 'all';
  const type = searchParams.get('type') || 'all';
  const exam = searchParams.get('exam') || 'all';
  const maxFees = searchParams.get('maxFees') ? parseInt(searchParams.get('maxFees')!) : undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const limitParam = searchParams.get('limit');
  // limit=0 means all (for compare picker); default 9 for paginated listing
  const limit = limitParam === '0' ? 0 : 9;
  const metaOnly = searchParams.get('meta') === 'true';

  if (metaOnly) {
    // getUniqueStates/Types are sync in mock db, async in postgres — Promise.resolve handles both
    const [states, types] = await Promise.all([
      Promise.resolve(getUniqueStates()),
      Promise.resolve(getUniqueTypes()),
    ]);
    return NextResponse.json({
      states,
      types,
      exams: ['JEE Advanced', 'JEE Main', 'BITSAT', 'CAT', 'GATE'],
    });
  }

  try {
    const result = await searchColleges({ query, state, type, exam, maxFees, page, limit });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 });
  }
}