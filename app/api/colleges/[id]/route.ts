import { NextRequest, NextResponse } from 'next/server';
import { getCollegeById} from '@/lib/db-postgres';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const collegeId = parseInt(id);

  if (isNaN(collegeId)) {
    return NextResponse.json({ error: 'Invalid college ID' }, { status: 400 });
  }

  const college = await getCollegeById(collegeId);

  if (!college) {
    return NextResponse.json({ error: 'College not found' }, { status: 404 });
  }

  return NextResponse.json(college);
}