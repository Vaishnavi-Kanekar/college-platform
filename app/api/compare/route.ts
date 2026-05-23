import { NextRequest, NextResponse } from 'next/server';
import { getCollegeById } from '@/lib/db-postgres';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  if (!idsParam) {
    return NextResponse.json({ error: 'No college IDs provided' }, { status: 400 });
  }

  const ids = idsParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

  if (ids.length < 2 || ids.length > 3) {
    return NextResponse.json({ error: 'Please provide 2-3 college IDs' }, { status: 400 });
  }

  try {
    const colleges = await Promise.all(ids.map(id => getCollegeById(id)));
    const validColleges = colleges.filter(Boolean);

    if (validColleges.length < 2) {
      return NextResponse.json({ error: 'Not enough valid colleges found' }, { status: 404 });
    }

    return NextResponse.json({ colleges: validColleges });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch comparison data' }, { status: 500 });
  }
}