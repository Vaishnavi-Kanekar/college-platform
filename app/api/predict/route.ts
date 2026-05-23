import { NextRequest, NextResponse } from 'next/server';
import { predictColleges } from '@/lib/db-postgres';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const exam = searchParams.get('exam');
  const rankParam = searchParams.get('rank');

  if (!exam || !rankParam) {
    return NextResponse.json({ error: 'exam and rank are required' }, { status: 400 });
  }

  const rank = parseInt(rankParam);

  if (isNaN(rank) || rank < 1) {
    return NextResponse.json({ error: 'Invalid rank' }, { status: 400 });
  }

  try {
    const results = await predictColleges(exam,rank);
    return NextResponse.json({ results, exam, rank });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Prediction failed' }, { status: 500 });
  }
}