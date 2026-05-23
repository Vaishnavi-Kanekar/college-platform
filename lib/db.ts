// Mock database - simulates PostgreSQL data
// In production: replace with actual pg queries

export interface College {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  type: string;
  rating: number;
  total_fees: number;
  established: number;
  naac_grade: string;
  nirf_rank: number;
  placement_percentage: number;
  avg_package: number;
  highest_package: number;
  total_students: number;
  image_url: string;
  description: string;
  website: string;
  entrance_exams: string[];
  courses: Course[];
  reviews: Review[];
}

export interface Course {
  id: number;
  college_id: number;
  name: string;
  duration: number;
  degree: string;
  fees: number;
  seats: number;
  cutoff_rank: number;
}

export interface Review {
  id: number;
  college_id: number;
  reviewer_name: string;
  batch_year: number;
  rating: number;
  title: string;
  content: string;
  pros: string;
  cons: string;
}

export const collegesData: College[] = [
  {
    id: 1,
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    type: "IIT",
    rating: 4.8,
    total_fees: 250000,
    established: 1958,
    naac_grade: "A++",
    nirf_rank: 3,
    placement_percentage: 98,
    avg_package: 21,
    highest_package: 1800,
    total_students: 10000,
    image_url: "https://images.unsplash.com/photo-1620496009285-ac853df7b9b6?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Indian Institute of Technology Bombay is one of India's premier engineering institutions, consistently ranked among the top universities in Asia. Known for its cutting-edge research and strong industry connections.",
    website: "https://www.iitb.ac.in",
    entrance_exams: ["JEE Advanced", "GATE", "JAM"],
    courses: [
      { id: 1, college_id: 1, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 250000, seats: 60, cutoff_rank: 100 },
      { id: 2, college_id: 1, name: "Electrical Engineering", duration: 4, degree: "B.Tech", fees: 250000, seats: 80, cutoff_rank: 300 },
      { id: 3, college_id: 1, name: "Mechanical Engineering", duration: 4, degree: "B.Tech", fees: 250000, seats: 90, cutoff_rank: 500 },
      { id: 4, college_id: 1, name: "Chemical Engineering", duration: 4, degree: "B.Tech", fees: 250000, seats: 70, cutoff_rank: 800 },
      { id: 5, college_id: 1, name: "M.Tech CSE", duration: 2, degree: "M.Tech", fees: 50000, seats: 40, cutoff_rank: 100 },
    ],
    reviews: [
      { id: 1, college_id: 1, reviewer_name: "Arjun Sharma", batch_year: 2022, rating: 5, title: "Best decision of my life", content: "The academic environment at IIT Bombay is unparalleled. World-class faculty, amazing infrastructure, and incredible peers.", pros: "Top faculty, great placements, strong alumni network, research opportunities", cons: "Extremely competitive, high pressure environment, Mumbai cost of living", },
      { id: 2, college_id: 1, reviewer_name: "Priya Mehta", batch_year: 2021, rating: 5, title: "Transformative experience", content: "Four years at IIT Bombay completely transformed my perspective. The exposure to cutting-edge research and industry is amazing.", pros: "International collaborations, startup ecosystem, cultural fests", cons: "Hostel fees a bit high, some courses outdated", },
    ]
  },
  {
    id: 2,
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "IIT",
    rating: 4.7,
    total_fees: 230000,
    established: 1961,
    naac_grade: "A++",
    nirf_rank: 2,
    placement_percentage: 97,
    avg_package: 20,
    highest_package: 2000,
    total_students: 8500,
    image_url: "https://images.unsplash.com/photo-1760872646289-5da7cb893dd4?q=80&w=2429&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "IIT Delhi is one of India's foremost institutes of national importance. Located in the capital city, it offers unparalleled exposure to government, industry, and policy circles.",
    website: "https://home.iitd.ac.in",
    entrance_exams: ["JEE Advanced", "GATE", "JAM"],
    courses: [
      { id: 6, college_id: 2, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 230000, seats: 65, cutoff_rank: 80 },
      { id: 7, college_id: 2, name: "Electrical Engineering", duration: 4, degree: "B.Tech", fees: 230000, seats: 85, cutoff_rank: 250 },
      { id: 8, college_id: 2, name: "Civil Engineering", duration: 4, degree: "B.Tech", fees: 230000, seats: 75, cutoff_rank: 1200 },
      { id: 9, college_id: 2, name: "Mathematics & Computing", duration: 4, degree: "B.Tech", fees: 230000, seats: 50, cutoff_rank: 120 },
    ],
    reviews: [
      { id: 3, college_id: 2, reviewer_name: "Rahul Gupta", batch_year: 2023, rating: 5, title: "Capital advantage", content: "Being in Delhi gives IIT Delhi a unique edge. So many industry events, government collaborations, and startup opportunities.", pros: "Location advantage, great placements, strong CS department", cons: "Pollution in Delhi, intense competition", },
      { id: 4, college_id: 2, reviewer_name: "Sneha Agarwal", batch_year: 2020, rating: 4, title: "Excellent research culture", content: "The research facilities are top-notch. Got multiple paper publications during my B.Tech itself.", pros: "Research focus, international internships, diverse student body", cons: "Some bureaucratic hurdles, average hostel food", },
    ]
  },
  {
    id: 3,
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "IIT",
    rating: 4.8,
    total_fees: 220000,
    established: 1959,
    naac_grade: "A++",
    nirf_rank: 1,
    placement_percentage: 96,
    avg_package: 19,
    highest_package: 1500,
    total_students: 9000,
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    description: "IIT Madras is India's #1 ranked institution for engineering. Set in a lush campus in Chennai, it is renowned for deep research and innovation.",
    website: "https://www.iitm.ac.in",
    entrance_exams: ["JEE Advanced", "GATE"],
    courses: [
      { id: 10, college_id: 3, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 220000, seats: 70, cutoff_rank: 90 },
      { id: 11, college_id: 3, name: "Aerospace Engineering", duration: 4, degree: "B.Tech", fees: 220000, seats: 45, cutoff_rank: 600 },
      { id: 12, college_id: 3, name: "Ocean Engineering", duration: 4, degree: "B.Tech", fees: 220000, seats: 30, cutoff_rank: 2000 },
    ],
    reviews: [
      { id: 5, college_id: 3, reviewer_name: "Vikram Rajan", batch_year: 2022, rating: 5, title: "India's #1, and it shows", content: "The campus is beautiful, the faculty is legendary, and the research ecosystem is second to none in India.", pros: "Beautiful campus, great faculty, top NIRF rank, startup cell", cons: "Chennai weather can be challenging, Tamil language barrier initially", },
    ]
  },
  {
    id: 4,
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    type: "NIT",
    rating: 4.4,
    total_fees: 160000,
    established: 1964,
    naac_grade: "A++",
    nirf_rank: 8,
    placement_percentage: 92,
    avg_package: 14,
    highest_package: 800,
    total_students: 6500,
    image_url: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
    description: "NIT Trichy is consistently ranked as the top NIT in India. Known for its strong core engineering departments and excellent placement records.",
    website: "https://www.nitt.edu",
    entrance_exams: ["JEE Main", "GATE"],
    courses: [
      { id: 13, college_id: 4, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 160000, seats: 90, cutoff_rank: 2000 },
      { id: 14, college_id: 4, name: "Electronics & Communication", duration: 4, degree: "B.Tech", fees: 160000, seats: 100, cutoff_rank: 3500 },
      { id: 15, college_id: 4, name: "Mechanical Engineering", duration: 4, degree: "B.Tech", fees: 160000, seats: 120, cutoff_rank: 8000 },
      { id: 16, college_id: 4, name: "Production Engineering", duration: 4, degree: "B.Tech", fees: 160000, seats: 60, cutoff_rank: 15000 },
    ],
    reviews: [
      { id: 6, college_id: 4, reviewer_name: "Karthik S", batch_year: 2021, rating: 4, title: "Best NIT experience", content: "NIT Trichy lives up to its reputation. Solid academics, great placements, and amazing student life.", pros: "Top NIT, good placements, active student clubs", cons: "Small city, limited exposure to metro startup scene", },
    ]
  },
  {
    id: 5,
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    city: "Pilani",
    state: "Rajasthan",
    type: "Deemed",
    rating: 4.6,
    total_fees: 550000,
    established: 1964,
    naac_grade: "A",
    nirf_rank: 25,
    placement_percentage: 95,
    avg_package: 18,
    highest_package: 1200,
    total_students: 7000,
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    description: "BITS Pilani is one of India's top private universities, known for academic freedom, the practice school program, and strong alumni network in the tech industry.",
    website: "https://www.bits-pilani.ac.in",
    entrance_exams: ["BITSAT"],
    courses: [
      { id: 17, college_id: 5, name: "Computer Science", duration: 4, degree: "B.E.", fees: 550000, seats: 100, cutoff_rank: 200 },
      { id: 18, college_id: 5, name: "Electronics & Instrumentation", duration: 4, degree: "B.E.", fees: 550000, seats: 80, cutoff_rank: 800 },
      { id: 19, college_id: 5, name: "Chemical Engineering", duration: 4, degree: "B.E.", fees: 550000, seats: 60, cutoff_rank: 2000 },
      { id: 20, college_id: 5, name: "MBA", duration: 2, degree: "MBA", fees: 650000, seats: 40, cutoff_rank: 0 },
    ],
    reviews: [
      { id: 7, college_id: 5, reviewer_name: "Aman Joshi", batch_year: 2022, rating: 5, title: "Unmatched freedom and culture", content: "BITS is unique in its student-first approach. The dual degree flexibility, PS program, and alumni network are unbeatable.", pros: "Dual degree option, practice school, strong alumni, liberal grading", cons: "Very expensive, remote location, isolated campus", },
    ]
  },
  {
    id: 6,
    name: "VIT Vellore",
    location: "Vellore, Tamil Nadu",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Deemed",
    rating: 4.0,
    total_fees: 220000,
    established: 1984,
    naac_grade: "A++",
    nirf_rank: 11,
    placement_percentage: 88,
    avg_package: 8,
    highest_package: 450,
    total_students: 35000,
    image_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    description: "VIT Vellore is one of India's largest and most popular private engineering universities, known for its international tie-ups and industry collaborations.",
    website: "https://vit.ac.in",
    entrance_exams: ["VITEEE", "JEE Main"],
    courses: [
      { id: 21, college_id: 6, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 220000, seats: 500, cutoff_rank: 50000 },
      { id: 22, college_id: 6, name: "Electronics Engineering", duration: 4, degree: "B.Tech", fees: 220000, seats: 400, cutoff_rank: 80000 },
      { id: 23, college_id: 6, name: "Biomedical Engineering", duration: 4, degree: "B.Tech", fees: 220000, seats: 100, cutoff_rank: 200000 },
      { id: 24, college_id: 6, name: "MBA", duration: 2, degree: "MBA", fees: 180000, seats: 120, cutoff_rank: 0 },
    ],
    reviews: [
      { id: 8, college_id: 6, reviewer_name: "Divya K", batch_year: 2020, rating: 4, title: "Great for placements and exposure", content: "VIT gave me excellent industry exposure and a good placement package. The campus is huge and facilities are top-notch.", pros: "Large campus, 900+ companies for placements, international exposure", cons: "Too many students, attendance rules are strict", },
    ]
  },
  {
    id: 7,
    name: "Delhi Technological University",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "State",
    rating: 3.9,
    total_fees: 145000,
    established: 1941,
    naac_grade: "A",
    nirf_rank: 36,
    placement_percentage: 85,
    avg_package: 9,
    highest_package: 420,
    total_students: 8000,
    image_url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800",
    description: "Delhi Technological University (formerly DCE) is one of Delhi's top engineering colleges, known for producing excellent tech talent with strong ties to Delhi's startup ecosystem.",
    website: "https://www.dtu.ac.in",
    entrance_exams: ["JEE Main"],
    courses: [
      { id: 25, college_id: 7, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 145000, seats: 120, cutoff_rank: 8000 },
      { id: 26, college_id: 7, name: "Software Engineering", duration: 4, degree: "B.Tech", fees: 145000, seats: 60, cutoff_rank: 10000 },
      { id: 27, college_id: 7, name: "Electronics Engineering", duration: 4, degree: "B.Tech", fees: 145000, seats: 120, cutoff_rank: 15000 },
    ],
    reviews: [
      { id: 9, college_id: 7, reviewer_name: "Ankur Singh", batch_year: 2023, rating: 4, title: "Excellent value for money", content: "DTU offers excellent education at very affordable fees. Being in Delhi is a huge advantage for internships.", pros: "Affordable fees, Delhi location, good placements, reputed brand", cons: "Infrastructure not as good as IITs, some political issues", },
    ]
  },
  {
    id: 8,
    name: "IIIT Hyderabad",
    location: "Hyderabad, Telangana",
    city: "Hyderabad",
    state: "Telangana",
    type: "IIIT",
    rating: 4.5,
    total_fees: 380000,
    established: 1998,
    naac_grade: "A",
    nirf_rank: 31,
    placement_percentage: 96,
    avg_package: 22,
    highest_package: 1600,
    total_students: 2500,
    image_url: "https://images.unsplash.com/photo-1542404937-2132aa1fa6fc?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "IIIT Hyderabad is India's premier research university for IT. Known for its research-first approach and strong industry partnerships with FAANG companies.",
    website: "https://www.iiit.ac.in",
    entrance_exams: ["JEE Main", "UGEE"],
    courses: [
      { id: 28, college_id: 8, name: "Computer Science", duration: 4, degree: "B.Tech", fees: 380000, seats: 80, cutoff_rank: 5000 },
      { id: 29, college_id: 8, name: "Electronics & Communication", duration: 4, degree: "B.Tech", fees: 380000, seats: 40, cutoff_rank: 8000 },
      { id: 30, college_id: 8, name: "Dual Degree CSE", duration: 5, degree: "Dual Degree", fees: 380000, seats: 40, cutoff_rank: 3000 },
    ],
    reviews: [
      { id: 10, college_id: 8, reviewer_name: "Aditya R", batch_year: 2022, rating: 5, title: "Research paradise for CS students", content: "IIIT-H is heaven for CS research. The faculty are world-renowned and placements at top companies is almost guaranteed.", pros: "Top CS placements, research culture, Hyderabad tech hub", cons: "Small campus, limited branches, high fees for an IIIT", },
    ]
  },
  {
    id: 9,
    name: "IIM Ahmedabad",
    location: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    state: "Gujarat",
    type: "IIM",
    rating: 4.9,
    total_fees: 2400000,
    established: 1961,
    naac_grade: "A++",
    nirf_rank: 1,
    placement_percentage: 100,
    avg_package: 35,
    highest_package: 800,
    total_students: 1200,
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "IIM Ahmedabad is India's most prestigious business school. The iconic Louis Kahn campus houses some of India's brightest business minds.",
    website: "https://www.iima.ac.in",
    entrance_exams: ["CAT", "GMAT"],
    courses: [
      { id: 31, college_id: 9, name: "MBA (PGP)", duration: 2, degree: "MBA", fees: 2400000, seats: 390, cutoff_rank: 0 },
      { id: 32, college_id: 9, name: "MBA (PGPX)", duration: 1, degree: "MBA", fees: 2800000, seats: 60, cutoff_rank: 0 },
      { id: 33, college_id: 9, name: "PhD", duration: 5, degree: "PhD", fees: 50000, seats: 30, cutoff_rank: 0 },
    ],
    reviews: [
      { id: 11, college_id: 9, reviewer_name: "Neha Kapoor", batch_year: 2021, rating: 5, title: "Changed my career trajectory completely", content: "Two years at IIMA was transformative. The case-study method, peer quality, and alumni network are unbeatable anywhere in Asia.", pros: "100% placement, legendary alumni, Louis Kahn campus, global exposure", cons: "Extremely expensive, brutal workload, stressful environment", },
    ]
  },
  {
    id: 10,
    name: "IIT Kanpur",
    location: "Kanpur, Uttar Pradesh",
    city: "Kanpur",
    state: "Uttar Pradesh",
    type: "IIT",
    rating: 4.6,
    total_fees: 240000,
    established: 1959,
    naac_grade: "A++",
    nirf_rank: 4,
    placement_percentage: 95,
    avg_package: 17,
    highest_package: 1400,
    total_students: 7500,
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    description: "IIT Kanpur is renowned for its strong emphasis on science and research, particularly in Computer Science, which is considered one of the best in India.",
    website: "https://www.iitk.ac.in",
    entrance_exams: ["JEE Advanced", "GATE"],
    courses: [
      { id: 34, college_id: 10, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 240000, seats: 60, cutoff_rank: 150 },
      { id: 35, college_id: 10, name: "Aerospace Engineering", duration: 4, degree: "B.Tech", fees: 240000, seats: 40, cutoff_rank: 700 },
      { id: 36, college_id: 10, name: "Physics", duration: 4, degree: "BS", fees: 240000, seats: 30, cutoff_rank: 400 },
    ],
    reviews: [
      { id: 12, college_id: 10, reviewer_name: "Shubham T", batch_year: 2021, rating: 4, title: "Strong science culture", content: "IITK's emphasis on first principles and theory makes you an exceptional engineer. The CS department is legendary.", pros: "Top CS curriculum, physics research, good placements, large campus", cons: "Kanpur city not great, isolated feeling, conservative culture", },
    ]
  },
  {
    id: 11,
    name: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    city: "Manipal",
    state: "Karnataka",
    type: "Deemed",
    rating: 3.8,
    total_fees: 320000,
    established: 1957,
    naac_grade: "A++",
    nirf_rank: 52,
    placement_percentage: 82,
    avg_package: 7,
    highest_package: 350,
    total_students: 15000,
    image_url: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800",
    description: "MIT Manipal is a premier private engineering institution known for its cosmopolitan campus culture and strong connections across industries.",
    website: "https://manipal.edu/mit",
    entrance_exams: ["MET", "JEE Main"],
    courses: [
      { id: 37, college_id: 11, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 320000, seats: 300, cutoff_rank: 80000 },
      { id: 38, college_id: 11, name: "Mechatronics Engineering", duration: 4, degree: "B.Tech", fees: 320000, seats: 60, cutoff_rank: 150000 },
      { id: 39, college_id: 11, name: "Information Technology", duration: 4, degree: "B.Tech", fees: 320000, seats: 180, cutoff_rank: 100000 },
    ],
    reviews: [
      { id: 13, college_id: 11, reviewer_name: "Rohan D", batch_year: 2020, rating: 4, title: "Best college life experience", content: "Manipal is a college town — the campus life is extraordinary. Strong social scene and decent placements.", pros: "Campus culture, diverse student body, good infrastructure", cons: "Expensive, average academics, placement depends on your branch", },
    ]
  },
  {
    id: 12,
    name: "SRM Institute of Science and Technology",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Deemed",
    rating: 3.6,
    total_fees: 280000,
    established: 1985,
    naac_grade: "A++",
    nirf_rank: 39,
    placement_percentage: 80,
    avg_package: 6,
    highest_package: 300,
    total_students: 45000,
    image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
    description: "SRM is one of India's largest private universities with a strong global presence and industry tie-ups. Popular for its infrastructure and international programs.",
    website: "https://www.srmist.edu.in",
    entrance_exams: ["SRMJEEE", "JEE Main"],
    courses: [
      { id: 40, college_id: 12, name: "Computer Science Engineering", duration: 4, degree: "B.Tech", fees: 280000, seats: 800, cutoff_rank: 200000 },
      { id: 41, college_id: 12, name: "Data Science", duration: 4, degree: "B.Tech", fees: 300000, seats: 200, cutoff_rank: 250000 },
      { id: 42, college_id: 12, name: "Artificial Intelligence & ML", duration: 4, degree: "B.Tech", fees: 350000, seats: 150, cutoff_rank: 220000 },
    ],
    reviews: [
      { id: 14, college_id: 12, reviewer_name: "Meera V", batch_year: 2023, rating: 3, title: "Good for networking", content: "SRM has good infrastructure and many facilities but academics quality varies by faculty. Placements are decent.", pros: "Large campus, good labs, many student events, 1000+ company tie-ups", cons: "Too many students, inconsistent faculty quality, attendance policy", },
    ]
  },
];

// Simulate async DB calls
export async function getAllColleges(): Promise<College[]> {
  return Promise.resolve(collegesData);
}

export async function getCollegeById(id: number): Promise<College | null> {
  return Promise.resolve(collegesData.find(c => c.id === id) || null);
}

export async function searchColleges(params: {
  query?: string;
  state?: string;
  type?: string;
  minFees?: number;
  maxFees?: number;
  exam?: string;
  page?: number;
  limit?: number;
}): Promise<{ colleges: College[]; total: number; pages: number }> {
  let results = [...collegesData];

  if (params.query) {
    const q = params.query.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q)
    );
  }

  if (params.state && params.state !== 'all') {
    results = results.filter(c => c.state === params.state);
  }

  if (params.type && params.type !== 'all') {
    results = results.filter(c => c.type === params.type);
  }

  if (params.exam && params.exam !== 'all') {
    results = results.filter(c => c.entrance_exams.includes(params.exam!));
  }

  if (params.minFees) {
    results = results.filter(c => c.total_fees >= params.minFees!);
  }

  if (params.maxFees) {
    results = results.filter(c => c.total_fees <= params.maxFees!);
  }

  const total = results.length;
  // limit=0 means return all (used by compare picker)
  const limit = params.limit === 0 ? total : (params.limit || 9);
  const page = params.page || 1;
  const pages = Math.ceil(total / (limit || 1));
  const start = (page - 1) * limit;

  return Promise.resolve({
    colleges: results.slice(start, start + limit),
    total,
    pages,
  });
}

// Degrees that use entrance-exam based rank/cutoff admissions
const RANK_BASED_DEGREES = new Set(['B.Tech', 'B.E.', 'BS', 'Dual Degree', 'B.Arch']);

export async function predictColleges(exam: string, rank: number): Promise<{
  college: College;
  chance: 'High' | 'Medium' | 'Low';
  matchedCourse: Course;
}[]> {
  const results: { college: College; chance: 'High' | 'Medium' | 'Low'; matchedCourse: Course }[] = [];

  for (const college of collegesData) {
    // College must accept this exam
    if (!college.entrance_exams.includes(exam)) continue;

    // Only rank-based UG degrees with a defined cutoff
    const relevantCourses = college.courses.filter(c =>
      RANK_BASED_DEGREES.has(c.degree) && c.cutoff_rank > 0
    );

    // Pick the best (most relevant) course per college to avoid duplicates flooding results
    // Best = closest cutoff to the student's rank (within range)
    let bestResult: { chance: 'High' | 'Medium' | 'Low'; course: Course } | null = null;

    for (const course of relevantCourses) {
      let chance: 'High' | 'Medium' | 'Low' | null = null;

      if (rank <= Math.floor(course.cutoff_rank * 0.75)) {
        // Well within cutoff — very safe
        chance = 'High';
      } else if (rank <= Math.floor(course.cutoff_rank * 1.15)) {
        // Near cutoff — uncertain but possible
        chance = 'Medium';
      } else if (rank <= Math.floor(course.cutoff_rank * 1.8)) {
        // Above cutoff but close — low chance (wait-list / spot admission)
        chance = 'Low';
      }

      if (!chance) continue;

      // Prefer High > Medium > Low; within same tier, prefer closer cutoff to rank
      if (!bestResult) {
        bestResult = { chance, course };
      } else {
        const tierOrder = { High: 0, Medium: 1, Low: 2 };
        const currentBetter = tierOrder[chance] < tierOrder[bestResult.chance];
        const sameTierCloser =
          chance === bestResult.chance &&
          Math.abs(rank - course.cutoff_rank) < Math.abs(rank - bestResult.course.cutoff_rank);

        if (currentBetter || sameTierCloser) {
          bestResult = { chance, course };
        }
      }
    }

    if (bestResult) {
      results.push({ college, chance: bestResult.chance, matchedCourse: bestResult.course });
    }
  }

  // Sort: High first, then Medium, then Low; within tier sort by NIRF rank (ascending = better)
  return Promise.resolve(
    results.sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2 };
      const tierDiff = order[a.chance] - order[b.chance];
      if (tierDiff !== 0) return tierDiff;
      return (a.college.nirf_rank || 999) - (b.college.nirf_rank || 999);
    })
  );
}

export function getUniqueStates(): string[] {
  return [...new Set(collegesData.map(c => c.state))].sort();
}

export function getUniqueTypes(): string[] {
  return [...new Set(collegesData.map(c => c.type))].sort();
}