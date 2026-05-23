import { Pool } from 'pg';

export interface College {
  id: number; name: string; location: string; city: string; state: string;
  type: string; rating: number; total_fees: number; established: number;
  naac_grade: string; nirf_rank: number; placement_percentage: number;
  avg_package: number; highest_package: number; total_students: number;
  image_url: string; description: string; website: string;
  entrance_exams: string[]; courses: Course[]; reviews: Review[];
}
export interface Course {
  id: number; college_id: number; name: string; duration: number;
  degree: string; fees: number; seats: number; cutoff_rank: number;
}
export interface Review {
  id: number; college_id: number; reviewer_name: string; batch_year: number;
  rating: number; title: string; content: string; pros: string; cons: string;
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

async function query<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows as T[];
  } finally {
    client.release();
  }
}


async function attachCoursesAndReviews(colleges: College[]): Promise<College[]> {
  if (colleges.length === 0) return [];
  const ids = colleges.map(c => c.id);

  const [courses, reviews] = await Promise.all([
    query<Course>(`SELECT * FROM courses WHERE college_id = ANY($1) ORDER BY degree, name`, [ids]),
    query<Review>(`SELECT * FROM reviews WHERE college_id = ANY($1) ORDER BY created_at DESC`, [ids]),
  ]);

  const courseMap = new Map<number, Course[]>();
  const reviewMap = new Map<number, Review[]>();
  for (const c of courses) {
    if (!courseMap.has(c.college_id)) courseMap.set(c.college_id, []);
    courseMap.get(c.college_id)!.push(c);
  }
  for (const r of reviews) {
    if (!reviewMap.has(r.college_id)) reviewMap.set(r.college_id, []);
    reviewMap.get(r.college_id)!.push(r);
  }
  return colleges.map(c => ({
    ...c,
    courses: courseMap.get(c.id) ?? [],
    reviews: reviewMap.get(c.id) ?? [],
  }));
}


export async function getAllColleges(): Promise<College[]> {
  const rows = await query<College>(`SELECT * FROM colleges ORDER BY nirf_rank ASC NULLS LAST`);
  return attachCoursesAndReviews(rows);
}

export async function getCollegeById(id: number): Promise<College | null> {
  const rows = await query<College>(`SELECT * FROM colleges WHERE id = $1`, [id]);
  if (rows.length === 0) return null;
  const [college] = await attachCoursesAndReviews(rows);
  return college;
}

export async function searchColleges(params: {
  query?: string; state?: string; type?: string; exam?: string;
  maxFees?: number; page?: number; limit?: number;
}): Promise<{ colleges: College[]; total: number; pages: number }> {
  const conditions: string[] = [];
  const values: unknown[] = [];
  let i = 1;

  if (params.query) {
    conditions.push(`(LOWER(name) LIKE $${i} OR LOWER(city) LIKE $${i} OR LOWER(state) LIKE $${i})`);
    values.push(`%${params.query.toLowerCase()}%`);
    i++;
  }
  if (params.state && params.state !== 'all') { conditions.push(`state = $${i}`);              values.push(params.state); i++; }
  if (params.type  && params.type  !== 'all') { conditions.push(`type = $${i}`);               values.push(params.type);  i++; }
  if (params.exam  && params.exam  !== 'all') { conditions.push(`$${i} = ANY(entrance_exams)`); values.push(params.exam);  i++; }
  if (params.maxFees)                          { conditions.push(`total_fees <= $${i}`);         values.push(params.maxFees); i++; }

  const WHERE = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const countRows = await query<{ count: string }>(`SELECT COUNT(*) FROM colleges ${WHERE}`, values);
  const total = parseInt(countRows[0].count, 10);

  const limit  = params.limit === 0 ? total : (params.limit ?? 9);
  const page   = params.page ?? 1;
  const offset = (page - 1) * (limit || 1);
  const pages  = limit > 0 ? Math.ceil(total / limit) : 1;

  const rows = await query<College>(
    `SELECT * FROM colleges ${WHERE} ORDER BY nirf_rank ASC NULLS LAST LIMIT $${i} OFFSET $${i + 1}`,
    [...values, limit || total, offset]
  );

  const colleges = await attachCoursesAndReviews(rows);
  return { colleges, total, pages };
}

const RANK_BASED = new Set(['B.Tech', 'B.E.', 'BS', 'Dual Degree', 'B.Arch']);

export async function predictColleges(exam: string, rank: number): Promise<{
  college: College; chance: 'High' | 'Medium' | 'Low'; matchedCourse: Course;
}[]> {
  const rows = await query<College>(
    `SELECT * FROM colleges WHERE $1 = ANY(entrance_exams) ORDER BY nirf_rank ASC NULLS LAST`,
    [exam]
  );
  const colleges = await attachCoursesAndReviews(rows);
  const results: { college: College; chance: 'High'|'Medium'|'Low'; matchedCourse: Course }[] = [];

  for (const college of colleges) {
    const eligible = college.courses.filter(c => RANK_BASED.has(c.degree) && c.cutoff_rank > 0);
    let best: { chance: 'High'|'Medium'|'Low'; course: Course } | null = null;

    for (const course of eligible) {
      let chance: 'High'|'Medium'|'Low'|null = null;
      if      (rank <= Math.floor(course.cutoff_rank * 0.75)) chance = 'High';
      else if (rank <= Math.floor(course.cutoff_rank * 1.15)) chance = 'Medium';
      else if (rank <= Math.floor(course.cutoff_rank * 1.8))  chance = 'Low';
      if (!chance) continue;

      const order = { High: 0, Medium: 1, Low: 2 };
      const closer = best && chance === best.chance &&
        Math.abs(rank - course.cutoff_rank) < Math.abs(rank - best.course.cutoff_rank);
      if (!best || order[chance] < order[best.chance] || closer) best = { chance, course };
    }
    if (best) results.push({ college, chance: best.chance, matchedCourse: best.course });
  }

  return results.sort((a, b) => {
    const o = { High: 0, Medium: 1, Low: 2 };
    return (o[a.chance] - o[b.chance]) || ((a.college.nirf_rank ?? 999) - (b.college.nirf_rank ?? 999));
  });
}

export async function getUniqueStates(): Promise<string[]> {
  const rows = await query<{ state: string }>(`SELECT DISTINCT state FROM colleges ORDER BY state`);
  return rows.map(r => r.state);
}

export async function getUniqueTypes(): Promise<string[]> {
  const rows = await query<{ type: string }>(`SELECT DISTINCT type FROM colleges ORDER BY type`);
  return rows.map(r => r.type);
}

export async function seedDatabase(colleges: College[]): Promise<void> {
  await query(`DELETE FROM reviews`);
  await query(`DELETE FROM courses`);
  await query(`DELETE FROM colleges`);

  for (const college of colleges) {
    const { courses, reviews, ...d } = college;
    const result = await query<{ id: number }>(
      `INSERT INTO colleges (name, location, city, state, type, rating, total_fees, established,
        naac_grade, nirf_rank, placement_percentage, avg_package, highest_package,
        total_students, image_url, description, website, entrance_exams)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING id`,
      [d.name, d.location, d.city, d.state, d.type, d.rating, d.total_fees, d.established,
       d.naac_grade, d.nirf_rank, d.placement_percentage, d.avg_package, d.highest_package,
       d.total_students, d.image_url, d.description, d.website, d.entrance_exams]
    );
    const collegeId = result[0].id;

    for (const c of courses) {
      await query(
        `INSERT INTO courses (college_id, name, duration, degree, fees, seats, cutoff_rank)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [collegeId, c.name, c.duration, c.degree, c.fees, c.seats, c.cutoff_rank]
      );
    }
    for (const r of reviews) {
      await query(
        `INSERT INTO reviews (college_id, reviewer_name, batch_year, rating, title, content, pros, cons)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [collegeId, r.reviewer_name, r.batch_year, r.rating, r.title, r.content, r.pros, r.cons]
      );
    }
  }
  console.log('✅ Seeded', colleges.length, 'colleges');
}